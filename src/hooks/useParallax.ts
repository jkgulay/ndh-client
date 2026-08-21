import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Nudges an element vertically as its section scrolls through the viewport,
 * giving flat photography a subtle sense of depth.
 */
export function useParallax<T extends HTMLElement>(distance: number = 60) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: distance,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => context.revert();
  }, [distance]);

  return ref;
}
