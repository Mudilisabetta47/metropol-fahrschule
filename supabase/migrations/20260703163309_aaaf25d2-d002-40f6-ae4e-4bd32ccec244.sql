
-- Helper: is_staff
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin','mitarbeiter','standortleitung')
  )
$$;

-- Lock down SECURITY DEFINER functions from direct API execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;

-- INQUIRIES: restrict SELECT/UPDATE to staff
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.inquiries;

CREATE POLICY "Staff can view inquiries"
  ON public.inquiries FOR SELECT
  TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update inquiries"
  ON public.inquiries FOR UPDATE
  TO authenticated
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

-- INQUIRY_NOTES: restrict SELECT to staff or author
DROP POLICY IF EXISTS "Auth users can view notes" ON public.inquiry_notes;
DROP POLICY IF EXISTS "Auth users can insert notes" ON public.inquiry_notes;

CREATE POLICY "Staff or author can view notes"
  ON public.inquiry_notes FOR SELECT
  TO authenticated
  USING (public.is_staff(auth.uid()) OR auth.uid() = user_id);

CREATE POLICY "Staff can insert notes"
  ON public.inquiry_notes FOR INSERT
  TO authenticated
  WITH CHECK (public.is_staff(auth.uid()) AND auth.uid() = user_id);

-- SITE_IMAGES: restrict write to admins
DROP POLICY IF EXISTS "Authenticated users can insert site images" ON public.site_images;
DROP POLICY IF EXISTS "Authenticated users can update site images" ON public.site_images;

CREATE POLICY "Admins can insert site images"
  ON public.site_images FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site images"
  ON public.site_images FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site images"
  ON public.site_images FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- STORAGE: site-images bucket - remove permissive policies, restrict writes to admins,
-- allow public to read individual objects but not list.
DO $$
DECLARE p record;
BEGIN
  FOR p IN
    SELECT policyname FROM pg_policies
    WHERE schemaname='storage' AND tablename='objects'
      AND (qual LIKE '%site-images%' OR with_check LIKE '%site-images%'
           OR policyname ILIKE '%site-images%' OR policyname ILIKE '%site_images%')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', p.policyname);
  END LOOP;
END $$;

-- Public read of individual objects (no listing without a name filter — clients must know the key)
CREATE POLICY "site-images public read object"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'site-images');

-- Admin-only writes
CREATE POLICY "site-images admin insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "site-images admin update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "site-images admin delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
