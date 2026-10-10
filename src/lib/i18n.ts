import { ml } from "./ml";

export type Lang = "en" | "ml";

// English text is the key. Anything without a Malayalam entry falls back to English.
export const translator = (lang: Lang) => (text: string) => (lang === "ml" ? (ml[text] ?? text) : text);

// Malayalam pages live under /ml; English stays at the root.
export const localize = (lang: Lang, href: string) => (lang === "ml" ? (href === "/" ? "/ml" : `/ml${href}`) : href);

export const langFromPath = (pathname: string | null): Lang =>
  pathname === "/ml" || pathname?.startsWith("/ml/") ? "ml" : "en";

// The same page in the other language.
export const otherLangPath = (pathname: string | null) => {
  const path = pathname || "/";
  if (langFromPath(path) === "ml") return path.slice(3) || "/";
  return path === "/" ? "/ml" : `/ml${path}`;
};
