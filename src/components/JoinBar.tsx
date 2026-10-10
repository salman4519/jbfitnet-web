"use client";

import Link from "next/link";
import LangSwitch from "@/components/LangSwitch";
import Logo from "@/components/Logo";
import { localize, translator } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";

// Same width, height and logo position as the main site header.
export default function JoinBar() {
  const lang = useLang();
  return (
    <header className="join-bar">
      <div className="container header-inner">
        <Link href={localize(lang, "/")} className="logo" aria-label="JB Fitnet home">
          <Logo priority />
        </Link>
        <div className="join-bar-tools">
          <LangSwitch />
          <Link href={localize(lang, "/")} className="join-exit" aria-label={translator(lang)("Back to site")}>
            {translator(lang)("Back to site")}
          </Link>
        </div>
      </div>
    </header>
  );
}
