-- Isolated website intake. Existing app-support and withdrawal functions are unchanged.
begin;

create table public.website_contact_requests (
  request_id uuid primary key,
  message_id uuid not null unique references public.contact_messages(id) on delete cascade,
  fingerprint text not null check (length(fingerprint) = 64),
  created_at timestamptz not null default now()
);
create table public.website_contact_rate_limits (
  key_hash text primary key check (length(key_hash) = 64),
  window_start timestamptz not null,
  submissions integer not null check (submissions > 0)
);
create table public.website_contact_outbox (
  request_id uuid primary key references public.website_contact_requests(request_id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'processing', 'sent', 'needs_review')),
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  locked_until timestamptz,
  provider_message_id text,
  last_error text check (last_error in ('delivery_failed', 'retry_exhausted')),
  created_at timestamptz not null default now()
);
create index website_contact_outbox_due on public.website_contact_outbox(available_at) where status in ('pending', 'processing');
alter table public.website_contact_requests enable row level security;
alter table public.website_contact_rate_limits enable row level security;
alter table public.website_contact_outbox enable row level security;
revoke all on public.website_contact_requests, public.website_contact_rate_limits, public.website_contact_outbox from public, anon, authenticated;

create function public.accept_website_contact(
  p_request_id uuid, p_rate_key text, p_fingerprint text,
  p_name text, p_email text, p_subject text, p_message text
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  existing public.website_contact_requests%rowtype;
  message_id uuid;
  counter integer;
  key_value text;
begin
  if length(p_rate_key) <> 64 or length(p_fingerprint) <> 64
     or p_name is null or length(btrim(p_name)) not between 1 and 200
     or p_email is null or length(p_email) not between 3 and 255
     or p_subject is null or length(btrim(p_subject)) not between 1 and 500
     or p_message is null or length(btrim(p_message)) not between 1 and 10000 then
    raise exception using errcode = '22023', message = 'INVALID_CONTACT';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_request_id::text, 0));
  select * into existing from public.website_contact_requests r where r.request_id = p_request_id;
  if found then
    if existing.fingerprint <> p_fingerprint then
      raise exception using errcode = '22023', message = 'IDEMPOTENCY_CONFLICT';
    end if;
    return jsonb_build_object('message_id', existing.message_id, 'duplicate', true);
  end if;

  -- Lock the global bucket first for a consistent lock order across requests.
  foreach key_value in array array[repeat('0', 64), p_rate_key] loop
    insert into public.website_contact_rate_limits as limits(key_hash, window_start, submissions)
      values (key_value, now(), 1)
    on conflict (key_hash) do update set
      window_start = case when limits.window_start <= now() - interval '1 hour' then now() else limits.window_start end,
      submissions = case when limits.window_start <= now() - interval '1 hour' then 1 else limits.submissions + 1 end
    returning submissions into counter;
    if counter > (case when key_value = repeat('0', 64) then 100 else 5 end) then
      raise exception using errcode = 'P0001', message = 'CONTACT_RATE_LIMITED';
    end if;
  end loop;

  insert into public.contact_messages(name, email, subject, message)
    values (p_name, p_email, p_subject, p_message) returning id into message_id;
  insert into public.website_contact_requests(request_id, message_id, fingerprint) values (p_request_id, message_id, p_fingerprint);
  insert into public.website_contact_outbox(request_id) values (p_request_id);
  return jsonb_build_object('message_id', message_id, 'duplicate', false);
end;
$$;

create function public.claim_website_contact_outbox(p_request_id uuid default null)
returns table(request_id uuid, attempt integer, name text, email text, subject text, message text)
language sql security definer set search_path = '' as $$
  with due as (
    select o.request_id from public.website_contact_outbox o
    where (p_request_id is null or o.request_id = p_request_id)
      and o.created_at > now() - interval '23 hours' and o.attempts < 8
      and ((o.status = 'pending' and o.available_at <= now()) or (o.status = 'processing' and o.locked_until < now()))
    order by o.available_at for update skip locked limit 2
  ), claimed as (
    update public.website_contact_outbox o
    set status = 'processing', attempts = o.attempts + 1, locked_until = now() + interval '60 seconds'
    from due where o.request_id = due.request_id returning o.request_id, o.attempts
  )
  select c.request_id, c.attempts, m.name, m.email, m.subject, m.message
  from claimed c join public.website_contact_requests r on r.request_id = c.request_id
  join public.contact_messages m on m.id = r.message_id;
$$;

create function public.finish_website_contact_delivery(p_request_id uuid, p_attempt integer, p_provider_id text default null)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update public.website_contact_outbox o set
    status = case when p_provider_id is not null then 'sent' when o.attempts >= 8 or o.created_at < now() - interval '23 hours' then 'needs_review' else 'pending' end,
    available_at = now() + make_interval(secs => least(3600, 60 * (2 ^ least(o.attempts - 1, 6))::integer)),
    locked_until = null,
    provider_message_id = p_provider_id,
    last_error = case when p_provider_id is not null then null when o.attempts >= 8 then 'retry_exhausted' else 'delivery_failed' end
  where o.request_id = p_request_id and o.status = 'processing' and o.attempts = p_attempt;
end;
$$;

create function public.maintain_website_contact_queue()
returns void language plpgsql security definer set search_path = '' as $$
begin
  -- Only short-lived abuse counters are pruned; customer messages are retained.
  delete from public.website_contact_rate_limits where window_start < now() - interval '7 days';
  update public.website_contact_outbox set status = 'needs_review', last_error = 'retry_exhausted', locked_until = null
    where status in ('pending', 'processing') and (created_at <= now() - interval '23 hours' or (attempts >= 8 and coalesce(locked_until, now()) <= now()));
end;
$$;

revoke all on function public.accept_website_contact(uuid,text,text,text,text,text,text), public.claim_website_contact_outbox(uuid), public.finish_website_contact_delivery(uuid,integer,text), public.maintain_website_contact_queue() from public, anon, authenticated;
grant execute on function public.accept_website_contact(uuid,text,text,text,text,text,text), public.claim_website_contact_outbox(uuid), public.finish_website_contact_delivery(uuid,integer,text), public.maintain_website_contact_queue() to service_role;

comment on table public.website_contact_outbox is 'Website notification retries; provider idempotency expires after 24h, so automatic retries stop before 23h.';
notify pgrst, 'reload schema';
commit;
