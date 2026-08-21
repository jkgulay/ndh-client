import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEM_SELECTOR = ".reveal-item";

/**
 * Fades + slides matching descendants into view as the container scrolls into the viewport.
 * Re-runs when `deps` change so it can pick up items that mount after an async fetch resolves.
 */
export function useScrollReveal<T extends HTMLElement>(
  itemSelector: string = DEFAULT_ITEM_SELECTOR,
  deps: readonly unknown[] = []
) {
  const containerRef = useRef<T>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(itemSelector);
      items.forEach((item, index) => {
        gsap.from(item, {
          y: 36,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (index % 3) * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => context.revert();
  }, deps);

  return containerRef;
}
