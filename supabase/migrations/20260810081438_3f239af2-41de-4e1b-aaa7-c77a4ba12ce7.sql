CREATE TABLE public.login_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  ip_address text,
  user_agent text,
  aal text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX login_events_created_at_idx ON public.login_events (created_at DESC);
CREATE INDEX login_events_user_idx ON public.login_events (user_id);

GRANT SELECT ON public.login_events TO authenticated;
GRANT ALL ON public.login_events TO service_role;

ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all login events"
ON public.login_events FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own login events"
ON public.login_events FOR SELECT TO authenticated
USING (auth.uid() = user_id);