-- Run only after the queue migrations, function deployment and provider checks.
select cron.schedule('website-contact-outbox', '* * * * *', $job$
  select net.http_post(
    url := 'https://oxavwwowalaepqxygzkt.supabase.co/functions/v1/website-contact',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'website_contact_worker_secret')
    ),
    body := '{"action":"drain"}'::jsonb,
    timeout_milliseconds := 45000
  );
$job$);
