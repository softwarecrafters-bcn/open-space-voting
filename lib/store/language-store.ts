import { create } from "zustand";
import { persist } from "zustand/middleware";
import { en } from "../i18n/locales/en";
import { es } from "../i18n/locales/es";
import { ca } from "../i18n/locales/ca";

type Language = "en" | "es" | "ca";

type LanguageStore = {
  language: Language;
  translations: typeof en | typeof es | typeof ca;
  setLanguage: (lang: Language) => void;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "es",
      translations: es,
      setLanguage: (lang) =>
        set({
          language: lang,
          translations: lang === "en" ? en : lang === "ca" ? ca : es,
        }),
    }),
    {
      name: "language-storage",
    }
  )
);
