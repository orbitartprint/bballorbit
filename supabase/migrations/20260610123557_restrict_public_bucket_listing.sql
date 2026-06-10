-- Public buckets can serve files through public URLs without broad SELECT
-- policies on storage.objects. Removing these policies prevents clients from
-- listing every object in the buckets while keeping existing public URLs intact.
DROP POLICY IF EXISTS "Profile avatars public read"
ON storage.objects;

DROP POLICY IF EXISTS "Drill media public read"
ON storage.objects;
