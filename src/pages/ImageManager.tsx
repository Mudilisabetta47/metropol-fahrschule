import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { invalidateSiteImages } from "@/hooks/useSiteImage";
import { ArrowLeft, Upload, Image as ImageIcon, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SiteImage {
  id: string;
  image_key: string;
  label: string;
  category: string;
  storage_path: string | null;
  alt_text: string | null;
}

const categoryLabels: Record<string, string> = {
  hero: "Hero-Bilder",
  klassen: "Führerscheinklassen",
  standorte: "Standorte",
  allgemein: "Allgemein",
};

const ImageManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || "zsothhtfripxdiphedsu";

  useEffect(() => {
    // Auth check
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate("/login");
    });
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase
      .from("site_images")
      .select("*")
      .order("category")
      .order("label");
    setImages((data as any[]) || []);
    setLoading(false);
  };

  const getPublicUrl = (path: string) =>
    `https://${projectId}.supabase.co/storage/v1/object/public/site-images/${path}`;

  const handleUpload = async (imageKey: string, file: File) => {
    setUploading(imageKey);
    try {
      const ext = file.name.split(".").pop();
      const storagePath = `${imageKey}.${ext}`;

      // Upload to storage (upsert)
      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(storagePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Update DB record
      const { error: dbError } = await supabase
        .from("site_images")
        .update({ storage_path: storagePath })
        .eq("image_key", imageKey);

      if (dbError) throw dbError;

      invalidateSiteImages();
      await fetchImages();
      toast({ title: "Bild aktualisiert", description: "Das Bild wurde erfolgreich hochgeladen." });
    } catch (err: any) {
      toast({ title: "Fehler", description: err.message, variant: "destructive" });
    } finally {
      setUploading(null);
    }
  };

  const handleAltText = async (imageKey: string, altText: string) => {
    await supabase
      .from("site_images")
      .update({ alt_text: altText })
      .eq("image_key", imageKey);
  };

  const grouped = images.reduce<Record<string, SiteImage[]>>((acc, img) => {
    const cat = img.category || "allgemein";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(img);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground font-display">Bildverwaltung</h1>
            <p className="text-sm text-muted-foreground">Bilder der Website austauschen – ohne Development.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          Object.entries(grouped).map(([category, imgs]) => (
            <div key={category} className="mb-10">
              <h2 className="text-lg font-bold text-foreground font-display mb-4 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                {categoryLabels[category] || category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {imgs.map((img) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-border bg-card p-4 shadow-card"
                  >
                    <div className="relative h-40 rounded-xl overflow-hidden bg-muted mb-3">
                      {img.storage_path ? (
                        <img
                          src={getPublicUrl(img.storage_path)}
                          alt={img.alt_text || img.label}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <ImageIcon className="h-10 w-10 opacity-30" />
                        </div>
                      )}
                      {img.storage_path && (
                        <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-foreground mb-1">{img.label}</p>
                    <p className="text-xs text-muted-foreground mb-3">Schlüssel: {img.image_key}</p>

                    <Input
                      placeholder="Alt-Text (SEO)"
                      defaultValue={img.alt_text || ""}
                      onBlur={(e) => handleAltText(img.image_key, e.target.value)}
                      className="mb-3 text-xs"
                    />

                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(img.image_key, file);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        disabled={uploading === img.image_key}
                        asChild
                      >
                        <span>
                          {uploading === img.image_key ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="mr-2 h-4 w-4" />
                          )}
                          {img.storage_path ? "Bild ersetzen" : "Bild hochladen"}
                        </span>
                      </Button>
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageManager;
