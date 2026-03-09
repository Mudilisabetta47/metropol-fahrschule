import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import de from "./locales/de.json";
import en from "./locales/en.json";
import tr from "./locales/tr.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { de: { translation: de }, en: { translation: en }, tr: { translation: tr }, ar: { translation: ar } },
    fallbackLng: "de",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

// Set dir attribute for RTL languages and update URL
i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
  
  // Update URL with language parameter (but avoid infinite loops)
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    const currentLangParam = url.searchParams.get('lang');
    
    if (lng === 'de') {
      // Remove lang parameter for German (default)
      url.searchParams.delete('lang');
    } else {
      // Set lang parameter for other languages
      url.searchParams.set('lang', lng);
    }
    
    // Only update if the URL actually changed
    const newUrl = url.toString();
    if (newUrl !== window.location.href && !url.searchParams.has('__lovable_token')) {
      window.history.replaceState({}, '', newUrl);
    }
  }
});

export default i18n;
