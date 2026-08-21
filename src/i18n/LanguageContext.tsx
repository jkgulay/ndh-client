import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { translations, type Language } from "./translations";

// The dictionary is exactly two levels deep (namespace.key), so a single mapped type over it
// is enough — a fully recursive NestedKeyOf blows past TypeScript's instantiation depth limit
// at this many keys.
type TranslationTree = typeof translations.en;
export type TranslationKey = {
  [K in keyof TranslationTree]: `${K & string}.${keyof TranslationTree[K] & string}`;
}[keyof TranslationTree];
export type TranslateFn = (key: TranslationKey) => string;

const LANGUAGE_STORAGE_KEY = "ndh-language";
const DEFAULT_LANGUAGE: Language = "en";

function readValueAtPath(tree: TranslationTree, path: string): string {
  const value = path.split(".").reduce<unknown>((node, segment) => {
    if (node && typeof node === "object" && segment in node) {
      return (node as Record<string, unknown>)[segment];
    }
    return undefined;
  }, tree);
  return typeof value === "string" ? value : path;
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslateFn;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "en" || stored === "fil" ? stored : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  function setLanguage(next: Language): void {
    setLanguageState(next);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  }

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => readValueAtPath(translations[language], key),
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
