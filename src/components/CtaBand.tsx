import Link from "next/link";
import { type Lang, localize, translator } from "@/lib/i18n";

export default function CtaBand({ lang }: { lang: Lang }) {
  const t = translator(lang);
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <h2>{t("Stop paying for days you don't train.")}</h2>
        <div className="btn-row">
          <Link href={localize(lang, "/waitlist")} className="btn btn-dark">
            {t("Join the waitlist")}
          </Link>
          <Link href={localize(lang, "/waitlist/gym")} className="btn btn-outline-dark">
            {t("Add your gym")}
          </Link>
        </div>
      </div>
    </section>
  );
}
