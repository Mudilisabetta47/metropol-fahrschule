import { useEffect, useRef, useCallback } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAACl0itmnIxz-PGR4";

interface CloudflareTurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

const CloudflareTurnstile = ({ onVerify, onExpire }: CloudflareTurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !(window as any).turnstile) return;
    // Clear previous widget
    if (widgetIdRef.current !== null) {
      (window as any).turnstile.remove(widgetIdRef.current);
    }
    widgetIdRef.current = (window as any).turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: onVerify,
      "expired-callback": onExpire,
      theme: "auto",
    });
  }, [onVerify, onExpire]);

  useEffect(() => {
    // Check if script already loaded
    if ((window as any).turnstile) {
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = renderWidget;
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current !== null && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current);
      }
    };
  }, [renderWidget]);

  return <div ref={containerRef} className="mt-1" />;
};

export default CloudflareTurnstile;
