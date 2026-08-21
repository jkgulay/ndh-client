import { Link } from "react-router-dom";
import { Container } from "../components/common/Container";
import { useLanguage } from "../i18n/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFoundPage(): React.JSX.Element {
  const { t } = useLanguage();
  usePageMeta("Page Not Found", "The page you are looking for could not be found.");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-primary-900">{t("notFound.title")}</h1>
      <p className="max-w-md text-slate-600">{t("notFound.description")}</p>
      <Link to="/" className="rounded-full bg-primary-700 px-6 py-3 font-semibold text-white hover:bg-primary-800">
        {t("notFound.backHome")}
      </Link>
    </Container>
  );
}
