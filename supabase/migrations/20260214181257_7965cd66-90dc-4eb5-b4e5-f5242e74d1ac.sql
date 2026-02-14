
-- Inquiries table for contact/registration requests
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  license_class TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'neu',
  assigned_to UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Public can insert inquiries (contact form submissions)
CREATE POLICY "Anyone can submit an inquiry"
ON public.inquiries
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view inquiries
CREATE POLICY "Authenticated users can view inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update inquiries
CREATE POLICY "Authenticated users can update inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_inquiries_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
