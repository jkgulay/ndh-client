import { Link } from "react-router-dom";

interface HeroSectionProps {
  hospitalName: string;
  tagline: string;
}

export function HeroSection({ hospitalName, tagline }: HeroSectionProps): React.JSX.Element {
  return (
    <section className="bg-gradient-to-b from-primary-800 to-primary-700 py-20 text-white sm:py-28">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold sm:text-5xl">{hospitalName}</h1>
        <p className="mt-4 max-w-2xl text-lg text-primary-100">{tagline}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="rounded-full bg-accent-500 px-6 py-3 font-semibold text-primary-900 transition-colors hover:bg-accent-400"
          >
            Contact Us
          </Link>
          <Link
            to="/services"
            className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
