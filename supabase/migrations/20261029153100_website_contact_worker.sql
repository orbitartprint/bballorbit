begin;

-- Generate inside Vault: the token never needs to appear in source, query output
-- or the agent workspace. It authorizes only this function's outbox worker.
do $$
begin
  if not exists (select 1 from vault.secrets where name = 'website_contact_worker_secret') then
    perform vault.create_secret(gen_random_uuid()::text || gen_random_uuid()::text,
      'website_contact_worker_secret', 'Scoped website contact outbox worker credential');
  end if;
end;
$$;

create function public.website_contact_worker_digest()
returns text language sql security definer set search_path = '' as $$
  select pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to(decrypted_secret, 'UTF8')), 'hex')
  from vault.decrypted_secrets where name = 'website_contact_worker_secret';
$$;
revoke all on function public.website_contact_worker_digest() from public, anon, authenticated;
grant execute on function public.website_contact_worker_digest() to service_role;
notify pgrst, 'reload schema';
commit;
