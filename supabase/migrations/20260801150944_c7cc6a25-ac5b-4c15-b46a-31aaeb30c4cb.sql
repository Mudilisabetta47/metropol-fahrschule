-- 1) Rollen-Prüffunktionen gegen Ausspähen fremder Rollen absichern
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT CASE
    WHEN _user_id IS NULL THEN false
    WHEN auth.uid() IS NULL OR auth.uid() <> _user_id THEN false
    ELSE EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
  END
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT CASE
    WHEN _user_id IS NULL THEN false
    WHEN auth.uid() IS NULL OR auth.uid() <> _user_id THEN false
    ELSE EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = _user_id
        AND role IN ('admin','mitarbeiter','standortleitung')
    )
  END
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO authenticated, service_role;

-- 2) Least privilege: alle Grants zurücksetzen und gezielt neu setzen
REVOKE ALL ON public.inquiries, public.inquiry_notes, public.profiles,
  public.site_images, public.user_roles, public.email_send_log,
  public.email_send_state, public.email_unsubscribe_tokens,
  public.suppressed_emails FROM anon, authenticated;

-- Anfragen: anonym nur absenden
GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;

-- Notizen: nur angemeldete Mitarbeiter
GRANT SELECT, INSERT ON public.inquiry_notes TO authenticated;
GRANT ALL ON public.inquiry_notes TO service_role;

-- Profile: nur eigenes Profil (RLS)
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Website-Bilder: öffentlich lesbar, Änderungen nur Admin (RLS)
GRANT SELECT ON public.site_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_images TO authenticated;
GRANT ALL ON public.site_images TO service_role;

-- Rollen: lesen eigene, verwalten nur Admin (RLS)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- E-Mail-Infrastruktur: ausschließlich serverseitig
GRANT ALL ON public.email_send_log TO service_role;
GRANT ALL ON public.email_send_state TO service_role;
GRANT ALL ON public.email_unsubscribe_tokens TO service_role;
GRANT ALL ON public.suppressed_emails TO service_role;
