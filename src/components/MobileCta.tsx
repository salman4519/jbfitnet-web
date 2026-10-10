"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { localize, translator } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";

// Phone-only bar that keeps the main action within thumb reach once the
// page's own first call to action has scrolled away.
export default function MobileCta() {
  const lang = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={show ? "mobile-cta show" : "mobile-cta"} aria-hidden={!show}>
      <Link href={localize(lang, "/waitlist")} className="btn btn-primary btn-block" tabIndex={show ? undefined : -1}>
        {translator(lang)("Join the waitlist")}
      </Link>
    </div>
  );
}
