import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteImageEntry {
  url: string | null;
  alt: string | null;
}

type SiteImageMap = Record<string, SiteImageEntry>;

let cache: SiteImageMap | null = null;
let loading = false;
let listeners: Array<(data: SiteImageMap) => void> = [];

const fetchImages = async (): Promise<SiteImageMap> => {
  if (cache) return cache;
  if (loading) {
    return new Promise<SiteImageMap>((resolve) => {
      listeners.push(resolve);
    });
  }
  loading = true;

  const { data } = await supabase.from("site_images").select("image_key, storage_path, alt_text");

  const map: SiteImageMap = {};
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || "zsothhtfripxdiphedsu";

  (data || []).forEach((row: any) => {
    const url = row.storage_path
      ? `https://${projectId}.supabase.co/storage/v1/object/public/site-images/${row.storage_path}`
      : null;
    map[row.image_key] = { url, alt: row.alt_text };
  });

  cache = map;
  loading = false;
  listeners.forEach((fn) => fn(map));
  listeners = [];
  return map;
};

/** Invalidate cache after an upload */
export const invalidateSiteImages = () => {
  cache = null;
};

/**
 * Hook that returns a lookup function for admin-managed images.
 * Each image falls back to a static import if no custom image is set.
 */
export function useSiteImages(fallbacks: Record<string, string>) {
  const [data, setData] = useState<SiteImageMap | null>(cache);

  useEffect(() => {
    if (!data) {
      fetchImages().then(setData);
    }
  }, [data]);

  return (key: string): string => {
    if (data && data[key]?.url) {
      return data[key].url!;
    }
    return fallbacks[key] || "";
  };
}

/**
 * Single image hook.
 */
export function useSiteImage(key: string, fallback: string): string {
  const [data, setData] = useState<SiteImageMap | null>(cache);

  useEffect(() => {
    if (!data) {
      fetchImages().then(setData);
    }
  }, [data]);

  if (data && data[key]?.url) {
    return data[key].url!;
  }
  return fallback;
}
