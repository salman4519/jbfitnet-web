"use client";

import LangSwitch from "@/components/LangSwitch";
import Logo from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { langFromPath, localize, translator } from "@/lib/i18n";
import { nav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const lang = langFromPath(pathname);
  const t = translator(lang);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // While the drawer is open: lock page scroll and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = nav.map((item) => (
    <Link
      key={item.href}
      href={localize(lang, item.href)}
      onClick={close}
      aria-current={pathname === localize(lang, item.href) ? "page" : undefined}
    >
      {t(item.label)}
    </Link>
  ));

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link href={localize(lang, "/")} className="logo" aria-label="JB Fitnet home">
            <Logo priority />
          </Link>

          <nav className="nav" aria-label="Main">
            {links}
            <LangSwitch />
            <Link href={localize(lang, "/waitlist")} className="btn btn-primary btn-sm">
              {t("Join the waitlist")}
            </Link>
          </nav>

          <div className="header-tools">
            <LangSwitch />
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-drawer"
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          </div>
        </div>
      </header>

      {/* Phone menu: a drawer that slides in from the right. It sits outside
          the header because the header's blur would trap a fixed element. */}
      <div className={open ? "drawer-backdrop open" : "drawer-backdrop"} onClick={close} aria-hidden="true" />
      <aside id="site-drawer" className={open ? "drawer open" : "drawer"} inert={!open} aria-label="Menu">
        <button type="button" className="menu-toggle drawer-close" aria-label="Close menu" onClick={close}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <nav className="drawer-nav" aria-label="Main">
          {links}
          <LangSwitch onClick={close} />
        </nav>
        <Link href={localize(lang, "/waitlist")} className="btn btn-primary btn-block" onClick={close}>
          {t("Join the waitlist")}
        </Link>
      </aside>
    </>
  );
}
