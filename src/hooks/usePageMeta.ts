import { useEffect } from "react";

const SITE_NAME = "Nasipit District Hospital";
const META_DESCRIPTION_SELECTOR = 'meta[name="description"]';

export function usePageMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    const meta = document.querySelector(META_DESCRIPTION_SELECTOR);
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);
}
