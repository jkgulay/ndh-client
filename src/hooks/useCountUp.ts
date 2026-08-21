import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEM_SELECTOR = "[data-countup]";

/**
 * Animates the numeric lead-in of each `data-countup` element's text (e.g. "25+", "24/7")
 * from 0 up to its target value as it scrolls into view, keeping any non-numeric suffix static.
 * Re-runs when `deps` change so it can pick up items that mount after an async fetch resolves.
 */
export function useCountUp<T extends HTMLElement>(
  itemSelector: string = DEFAULT_ITEM_SELECTOR,
  deps: readonly unknown[] = []
) {
  const containerRef = useRef<T>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const items = gsap.utils.toArray<HTMLElement>(itemSelector, containerRef.current);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      items.forEach((item) => {
        item.textContent = item.dataset.countup ?? item.textContent;
      });
      return;
    }

    const context = gsap.context(() => {
      items.forEach((item, index) => {
        const raw = item.dataset.countup ?? item.textContent ?? "";
        const match = raw.match(/^(\d+)(.*)$/);
        if (!match) return;
        const target = Number(match[1]);
        const suffix = match[2];
        const counter = { value: 0 };
        item.textContent = `0${suffix}`;

        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          delay: (index % 4) * 0.08,
          onUpdate: () => {
            item.textContent = `${Math.round(counter.value)}${suffix}`;
          },
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => context.revert();
  }, deps);

  return containerRef;
}
