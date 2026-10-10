"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { langFromPath, otherLangPath } from "@/lib/i18n";

// Links to the same page in the other language. English is the default.
export default function LangSwitch({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  const toMalayalam = langFromPath(pathname) === "en";
  return (
    <Link
      href={otherLangPath(pathname)}
      className="lang-switch"
      lang={toMalayalam ? "ml" : "en"}
      aria-label={toMalayalam ? "മലയാളത്തിൽ കാണുക" : "View in English"}
      onClick={onClick}
    >
      {toMalayalam ? "മലയാളം" : "English"}
    </Link>
  );
}
