-- Run as the database owner after the queue migration and before enabling cron.
-- All synthetic messages, counters and outbox changes are rolled back.
begin;
do $$
declare
  first_id uuid := gen_random_uuid();
  extra_id uuid;
  result jsonb;
  found_count integer;
  current_attempt integer;
begin
  if has_function_privilege('anon', 'public.accept_website_contact(uuid,text,text,text,text,text,text)', 'EXECUTE')
     or has_function_privilege('authenticated', 'public.claim_website_contact_outbox(uuid)', 'EXECUTE')
     or has_table_privilege('anon', 'public.website_contact_outbox', 'SELECT') then
    raise exception 'Website contact privileges are too broad';
  end if;
  result := public.accept_website_contact(first_id, repeat('1',64), repeat('a',64), 'Website QA', 'website-audit@example.com', 'Rollback-only test', 'Synthetic transaction test; no email will be sent.');
  if (result->>'duplicate')::boolean then raise exception 'First request must be new'; end if;
  result := public.accept_website_contact(first_id, repeat('1',64), repeat('a',64), 'Website QA', 'website-audit@example.com', 'Rollback-only test', 'Synthetic transaction test; no email will be sent.');
  if not (result->>'duplicate')::boolean then raise exception 'Repeat request must be idempotent'; end if;
  select count(*) into found_count from public.website_contact_requests where request_id = first_id;
  if found_count <> 1 then raise exception 'Duplicate customer message created'; end if;
  begin
    perform public.accept_website_contact(first_id, repeat('1',64), repeat('b',64), 'Website QA', 'website-audit@example.com', 'Changed', 'Changed');
    raise exception 'Expected idempotency conflict';
  exception when sqlstate '22023' then
    if sqlerrm <> 'IDEMPOTENCY_CONFLICT' then raise; end if;
  end;
  for i in 2..5 loop
    perform public.accept_website_contact(gen_random_uuid(), repeat('1',64), repeat('a',64), 'Website QA', 'website-audit@example.com', 'Rollback-only test', 'Synthetic transaction test; no email will be sent.');
  end loop;
  begin
    perform public.accept_website_contact(gen_random_uuid(), repeat('1',64), repeat('a',64), 'Website QA', 'website-audit@example.com', 'Rollback-only test', 'Synthetic transaction test.');
    raise exception 'Expected durable rate limit';
  exception when sqlstate 'P0001' then
    if sqlerrm <> 'CONTACT_RATE_LIMITED' then raise; end if;
  end;
  select attempt into current_attempt from public.claim_website_contact_outbox(first_id);
  if current_attempt <> 1 then raise exception 'Initial claim failed'; end if;
  select count(*) into found_count from public.claim_website_contact_outbox(first_id);
  if found_count <> 0 then raise exception 'Leased job claimed twice'; end if;
  perform public.finish_website_contact_delivery(first_id, current_attempt, null);
  select count(*) into found_count from public.claim_website_contact_outbox(first_id);
  if found_count <> 0 then raise exception 'Retry backoff was ignored'; end if;
  update public.website_contact_outbox set available_at = now() where request_id = first_id;
  select attempt into current_attempt from public.claim_website_contact_outbox(first_id);
  if current_attempt <> 2 then raise exception 'Retry was not claimed'; end if;
  perform public.finish_website_contact_delivery(first_id, current_attempt, 'provider-test-id');
  if not exists (select 1 from public.website_contact_outbox where request_id = first_id and status = 'sent') then raise exception 'Delivery was not recorded'; end if;
  select count(*) into found_count from public.claim_website_contact_outbox(first_id);
  if found_count <> 0 then raise exception 'Sent job was claimed again'; end if;
  extra_id := gen_random_uuid();
  perform public.accept_website_contact(extra_id, repeat('2',64), repeat('a',64), 'Website QA', 'website-audit@example.com', 'Rollback-only test', 'Synthetic transaction test.');
  update public.website_contact_outbox set created_at = now() - interval '24 hours' where request_id = extra_id;
  select count(*) into found_count from public.claim_website_contact_outbox(extra_id);
  if found_count <> 0 then raise exception 'Unsafe retry beyond provider idempotency window'; end if;
  perform public.maintain_website_contact_queue();
  if not exists (select 1 from public.website_contact_outbox where request_id = extra_id and status = 'needs_review') then raise exception 'Expired job was not marked for review'; end if;
end;
$$;
rollback;
select 'Website contact database checks passed; all synthetic data rolled back.' as result;
