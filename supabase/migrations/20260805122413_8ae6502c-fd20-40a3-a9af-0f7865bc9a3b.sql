ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS tracking_code text,
  ADD COLUMN IF NOT EXISTS outbound_message_id text,
  ADD COLUMN IF NOT EXISTS replied_at timestamptz,
  ADD COLUMN IF NOT EXISTS response_time_minutes integer,
  ADD COLUMN IF NOT EXISTS ai_category text,
  ADD COLUMN IF NOT EXISTS ai_summary text,
  ADD COLUMN IF NOT EXISTS ai_recommendation text,
  ADD COLUMN IF NOT EXISTS ai_confidence numeric,
  ADD COLUMN IF NOT EXISTS auto_replied_at timestamptz,
  ADD COLUMN IF NOT EXISTS is_irrelevant boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS escalated_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS inquiries_tracking_code_key ON public.inquiries (tracking_code) WHERE tracking_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS inquiries_outbound_message_id_idx ON public.inquiries (outbound_message_id);

CREATE TABLE IF NOT EXISTS public.inquiry_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  direction text NOT NULL CHECK (direction IN ('outbound','inbound')),
  from_email text,
  to_email text,
  subject text,
  body_text text,
  message_id text,
  in_reply_to text,
  email_references text,
  ai_category text,
  is_auto_generated boolean NOT NULL DEFAULT false,
  received_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiry_messages_inquiry_id_idx ON public.inquiry_messages (inquiry_id, received_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS inquiry_messages_message_id_key ON public.inquiry_messages (message_id) WHERE message_id IS NOT NULL;

GRANT SELECT ON public.inquiry_messages TO authenticated;
GRANT DELETE ON public.inquiry_messages TO authenticated;
GRANT ALL ON public.inquiry_messages TO service_role;
ALTER TABLE public.inquiry_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view inquiry messages" ON public.inquiry_messages
  FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Admins can delete inquiry messages" ON public.inquiry_messages
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE IF NOT EXISTS public.email_inbox_state (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  last_uid bigint NOT NULL DEFAULT 0,
  last_run_at timestamptz,
  last_error text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.email_inbox_state (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

GRANT ALL ON public.email_inbox_state TO service_role;
ALTER TABLE public.email_inbox_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages inbox state" ON public.email_inbox_state
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

CREATE TRIGGER update_inquiry_messages_updated_at
  BEFORE UPDATE ON public.email_inbox_state
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();