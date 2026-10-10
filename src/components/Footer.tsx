"use client";

import Link from "next/link";
import LangSwitch from "@/components/LangSwitch";
import Logo from "@/components/Logo";
import { localize, translator } from "@/lib/i18n";
import { site } from "@/lib/site";
import { useLang } from "@/lib/useLang";

export default function Footer() {
  const lang = useLang();
  const t = translator(lang);
  const to = (href: string) => localize(lang, href);
  return (
    <footer className="footer" data-lang={lang}>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo width={102} />
          <p>{t(site.tagline)}</p>
        </div>
        <div>
          <h2>{t("Train")}</h2>
          <Link href={to("/how-it-works")}>{t("How it works")}</Link>
          <Link href={to("/waitlist")}>{t("Join the waitlist")}</Link>
          <Link href={to("/faq")}>{t("FAQ")}</Link>
        </div>
        <div>
          <h2>{t("Gym owners")}</h2>
          <Link href={to("/for-gyms")}>{t("Partner with us")}</Link>
          <Link href={to("/waitlist/gym")}>{t("Add your gym")}</Link>
        </div>
        <div>
          <h2>{t("Company")}</h2>
          <Link href={to("/privacy")}>{t("Privacy")}</Link>
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          <LangSwitch />
        </div>
      </div>
      <div className="container footer-base">© 2026 JB Fitnet. {t("App coming soon.")}</div>
    </footer>
  );
}
