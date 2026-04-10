import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  ogImage?: string;
  keywords?: string;
}

const SEO = ({ title, description, canonical, jsonLd, ogImage, keywords }: SEOProps) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.title = title;

    const currentLanguage = i18n.language || 'de';
    const localeMap: Record<string, string> = {
      'de': 'de_DE',
      'en': 'en_US',
      'tr': 'tr_TR',
      'ar': 'ar_SA'
    };

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "Fahrschule Metropol", "property");
    setMeta("og:locale", localeMap[currentLanguage], "property");
    if (ogImage) setMeta("og:image", ogImage, "property");
    if (canonical) setMeta("og:url", canonical, "property");

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // hreflang tags
    const existingHreflangs = document.querySelectorAll('link[hreflang]');
    existingHreflangs.forEach(el => el.remove());

    if (canonical) {
      const baseUrl = canonical.split('?')[0]; // Remove existing params
      const hreflangs = [
        { lang: 'de', url: baseUrl },
        { lang: 'en', url: `${baseUrl}?lang=en` },
        { lang: 'tr', url: `${baseUrl}?lang=tr` },
        { lang: 'ar', url: `${baseUrl}?lang=ar` },
        { lang: 'x-default', url: baseUrl }
      ];

      hreflangs.forEach(({ lang, url }) => {
        const hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', lang);
        hreflangLink.setAttribute('href', url);
        document.head.appendChild(hreflangLink);
      });
    }

    // JSON-LD
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld]');
    existingScripts.forEach((s) => s.remove());

    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((item) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }

    return () => {
      const scripts = document.querySelectorAll('script[data-seo-jsonld]');
      scripts.forEach((s) => s.remove());
      const hreflangs = document.querySelectorAll('link[hreflang]');
      hreflangs.forEach((s) => s.remove());
    };
  }, [title, description, canonical, jsonLd, ogImage, i18n.language]);

  return null;
};

export default SEO;
