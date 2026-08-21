import { ArrowRight, CalendarCheck, ChevronRight, Clock3, Maximize2, MapPin, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface HeroSectionProps {
  hospitalName: string;
  tagline: string;
}

const STATS = [
  ["25+", "Years of care"],
  ["50+", "Expert doctors"],
  ["12", "Departments"],
  ["24/7", "Emergency support"],
] as const;

export function HeroSection({ hospitalName, tagline }: HeroSectionProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const belowFoldRef = useScrollReveal<HTMLDivElement>();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".hero-reveal", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
      gsap.from(".hero-photo", { scale: 1.08, opacity: 0, duration: 1.2, ease: "power3.out" });
    }, sectionRef);
    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#eef7ff]">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 px-4 pb-8 pt-12 sm:px-8 sm:pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12 lg:pb-12 lg:pt-20">
        <div className="relative z-10">
          <p className="hero-reveal mb-5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-accent-600">
            <span className="h-2 w-2 rounded-full bg-accent-500" /> Welcome to {hospitalName}
          </p>
          <h1 className="hero-reveal max-w-xl text-5xl font-bold leading-[0.98] text-primary-950 sm:text-6xl lg:text-7xl">
            Expert care.
            <span className="block text-accent-500">Every time.</span>
          </h1>
          <p className="hero-reveal mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">{tagline}. Compassionate care, advanced facilities, and a team that puts your wellbeing first.</p>
          <div className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-primary-700/20 transition hover:-translate-y-0.5 hover:bg-primary-800"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Book an appointment
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-200 bg-white px-5 py-3.5 text-sm font-extrabold text-primary-800 transition hover:border-primary-400"
          >
            Explore services <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          </div>
          <div className="hero-reveal mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent-600" /> Trusted professionals</span>
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-accent-600" /> Open 24/7 for emergencies</span>
          </div>
        </div>
        <div className="hero-photo relative min-h-[360px] overflow-hidden rounded-[2rem] bg-primary-200 shadow-2xl shadow-primary-900/15 sm:min-h-[480px]">
          <img src="/components/nasipitpics.png" alt="Nasipit District Hospital staff and facility" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-950/70 via-primary-900/10 to-transparent" />
          <span
            aria-hidden="true"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-sm sm:right-7 sm:top-7"
          >
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="hero-reveal absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/20 bg-white/90 p-4 shadow-xl backdrop-blur sm:bottom-7 sm:left-7 sm:right-7">
            <div><p className="text-xs font-bold uppercase tracking-wider text-accent-600">Your health, our priority</p><p className="mt-1 text-sm font-extrabold text-primary-950">Care that feels personal</p></div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white"><MapPin className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </div>
      </div>

      <div ref={belowFoldRef} className="relative z-20 mx-auto -mt-10 max-w-[1400px] px-4 sm:-mt-14 sm:px-8 lg:-mt-16 lg:px-12">
        <div className="reveal-item grid grid-cols-2 divide-x divide-primary-100 overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-2xl shadow-primary-900/10 sm:grid-cols-4">
          {STATS.map(([value, label]) => (
            <div key={label} className="px-3 py-6 text-center sm:py-8">
              <p className="text-xl font-extrabold text-primary-800 sm:text-2xl">{value}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8 sm:h-10 lg:h-12" aria-hidden="true" />
    </section>
  );
}
