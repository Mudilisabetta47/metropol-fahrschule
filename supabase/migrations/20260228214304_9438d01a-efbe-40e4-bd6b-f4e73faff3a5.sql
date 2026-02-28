
-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage policies: anyone can view, only authenticated can upload/update/delete
CREATE POLICY "Public read access for site images"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can upload site images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update site images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete site images"
ON storage.objects FOR DELETE
USING (bucket_id = 'site-images' AND auth.role() = 'authenticated');

-- Create site_images table to track image assignments
CREATE TABLE public.site_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'allgemein',
  storage_path TEXT,
  alt_text TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- Everyone can read (needed to display images on frontend)
CREATE POLICY "Anyone can view site images"
ON public.site_images FOR SELECT
USING (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update site images"
ON public.site_images FOR UPDATE
USING (auth.role() = 'authenticated');

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert site images"
ON public.site_images FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Trigger for updated_at
CREATE TRIGGER update_site_images_updated_at
BEFORE UPDATE ON public.site_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with all image slots
INSERT INTO public.site_images (image_key, label, category) VALUES
  ('hero-index', 'Hero Startseite (Video-Fallback)', 'hero'),
  ('hero-klassen', 'Hero Führerscheinklassen', 'hero'),
  ('hero-kontakt', 'Hero Kontakt', 'hero'),
  ('hero-erste-hilfe', 'Hero Erste Hilfe', 'hero'),
  ('hero-aufbauseminar', 'Hero Aufbauseminar', 'hero'),
  ('hero-preise', 'Hero Preise', 'hero'),
  ('class-pkw', 'Führerschein PKW / Klasse B', 'klassen'),
  ('class-motorrad', 'Führerschein Motorrad / Klasse A', 'klassen'),
  ('class-lkw', 'Führerschein LKW / Klasse C', 'klassen'),
  ('class-bus', 'Führerschein Bus / Klasse D', 'klassen'),
  ('location-hannover', 'Standort Hannover', 'standorte'),
  ('location-garbsen', 'Standort Garbsen', 'standorte'),
  ('location-bremen', 'Standort Bremen', 'standorte');
