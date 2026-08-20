import { Link } from "react-router-dom";
import { Container } from "../components/common/Container";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFoundPage(): React.JSX.Element {
  usePageMeta("Page Not Found", "The page you are looking for could not be found.");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-primary-900">Page Not Found</h1>
      <p className="max-w-md text-slate-600">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="rounded-full bg-primary-700 px-6 py-3 font-semibold text-white hover:bg-primary-800">
        Back to Home
      </Link>
    </Container>
  );
}
