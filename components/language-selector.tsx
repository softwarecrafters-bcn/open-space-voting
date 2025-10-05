"use client";

import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/lib/store/language-store";
import { useEffect } from "react";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    document.cookie = "NEXT_LOCALE=" + language;
  }, [language]);

  return (
    <div className="flex gap-2">
      <Button
        variant={language === "ca" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("ca")}
      >
        CAT
      </Button>
      <Button
        variant={language === "es" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("es")}
      >
        ES
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
}
