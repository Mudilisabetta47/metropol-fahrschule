
-- Replace unconditional public INSERT with basic validation
DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.inquiries;

CREATE POLICY "Anyone can submit an inquiry"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND email LIKE '%_@_%.__%'
    AND length(location) BETWEEN 1 AND 100
    AND (message IS NULL OR length(message) <= 5000)
    AND (phone IS NULL OR length(phone) <= 50)
    AND (license_class IS NULL OR length(license_class) <= 50)
    AND status = 'neu'
    AND assigned_to IS NULL
    AND notes IS NULL
  );

-- Remove the broad SELECT policy that enables listing.
-- Public URLs continue to work because the bucket is public.
DROP POLICY IF EXISTS "site-images public read object" ON storage.objects;
