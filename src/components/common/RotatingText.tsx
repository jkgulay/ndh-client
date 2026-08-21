import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";

export interface RotatingTextItem {
  icon: LucideIcon;
  label: string;
}

interface RotatingTextProps {
  items: readonly RotatingTextItem[];
  intervalSeconds?: number;
}

/**
 * Loops through `items` in place, crossfading icon + label. Falls back to a static
 * first item (via the default opacity classes below) when motion is reduced.
 */
export function RotatingText({ items, intervalSeconds = 2.2 }: RotatingTextProps): React.JSX.Element {
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const longest = items.reduce((a, b) => (b.label.length > a.label.length ? b : a));
  const LongestIcon = longest.icon;

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = itemRefs.current.filter((el): el is HTMLSpanElement => el !== null);
    if (elements.length < 2) return;

    gsap.set(elements, { opacity: 0, y: 10 });
    gsap.set(elements[0], { opacity: 1, y: 0 });

    const timeline = gsap.timeline({ repeat: -1 });
    elements.forEach((el, index) => {
      const next = elements[(index + 1) % elements.length];
      timeline
        .to(el, { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" }, `+=${intervalSeconds}`)
        .fromTo(next, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "<");
    });

    return () => {
      timeline.kill();
    };
  }, [items, intervalSeconds]);

  return (
    <span className="relative inline-flex h-6 items-center overflow-hidden align-middle" aria-hidden="true">
      <span className="invisible flex items-center gap-2 whitespace-nowrap">
        <LongestIcon className="h-4 w-4" aria-hidden="true" />
        {longest.label}
      </span>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <span
            key={item.label}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`absolute inset-y-0 left-0 flex items-center gap-2 whitespace-nowrap text-primary-800 ${
              index === 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
            {item.label}
          </span>
        );
      })}
    </span>
  );
}
