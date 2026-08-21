import { ArrowRight, CalendarCheck, ChevronRight, Clock3, HeartPulse, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  hospitalName: string;
  tagline: string;
}

export function HeroSection({ hospitalName, tagline }: HeroSectionProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

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
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-10 pt-12 sm:px-6 sm:pb-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="relative z-10">
          <p className="hero-reveal mb-5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-primary-600">
            <span className="h-2 w-2 rounded-full bg-cyan-500" /> Welcome to {hospitalName}
          </p>
          <h1 className="hero-reveal max-w-xl text-5xl font-bold leading-[0.98] text-primary-950 sm:text-6xl lg:text-7xl">
            Expert care.
            <span className="block text-cyan-500">Every time.</span>
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
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-600" /> Trusted professionals</span>
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-cyan-600" /> Open 24/7 for emergencies</span>
          </div>
        </div>
        <div className="hero-photo relative min-h-[360px] overflow-hidden rounded-[2rem] bg-primary-200 shadow-2xl shadow-primary-900/15 sm:min-h-[480px]">
          <img src="/components/images%20(2).jpg" alt="Nasipit District Hospital staff and facility" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-950/70 via-primary-900/10 to-transparent" />
          <div className="hero-reveal absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/20 bg-white/90 p-4 shadow-xl backdrop-blur sm:bottom-7 sm:left-7 sm:right-7">
            <div><p className="text-xs font-bold uppercase tracking-wider text-cyan-600">Your health, our priority</p><p className="mt-1 text-sm font-extrabold text-primary-950">Care that feels personal</p></div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white"><MapPin className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </div>
      </div>
      <div className="border-y border-primary-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-primary-100 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[['25+', 'Years of care'], ['50+', 'Expert doctors'], ['12', 'Departments'], ['24/7', 'Emergency support']].map(([value, label]) => <div key={label} className="px-3 py-5 text-center sm:py-6"><p className="text-xl font-extrabold text-primary-800 sm:text-2xl">{value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">{label}</p></div>)}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          [Stethoscope, "Expert doctors", "Experienced professionals who listen first."],
          [HeartPulse, "Advanced care", "Modern facilities for confident treatment."],
          [Clock3, "24/7 services", "Emergency support whenever you need it."],
          [ShieldCheck, "Patient-first", "Thoughtful care for every family."],
        ].map(([Icon, title, description]) => {
          const FeatureIcon = Icon as typeof Stethoscope;
          return (
            <div key={title as string} className="hero-reveal flex items-start gap-3 rounded-2xl border border-primary-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><FeatureIcon className="h-5 w-5" aria-hidden="true" /></span>
              <div><p className="text-sm font-extrabold text-primary-900">{title as string}</p><p className="mt-1 text-xs leading-5 text-slate-500">{description as string}</p></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
