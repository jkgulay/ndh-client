import { useLanguage } from "../../i18n/LanguageContext";
import { LANGUAGE_LABELS, translations, type Language } from "../../i18n/translations";

const LANGUAGES = Object.keys(translations) as Language[];

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps): React.JSX.Element {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-0.5 rounded-full border border-slate-200 bg-slate-50 p-0.5 ${className}`}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
            language === lang ? "bg-primary-700 text-white" : "text-slate-500 hover:text-primary-700"
          }`}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </div>
  );
}
