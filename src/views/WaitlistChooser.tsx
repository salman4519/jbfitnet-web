import Link from "next/link";
import { type Lang, localize, translator } from "@/lib/i18n";

export default function WaitlistChooser({ lang }: { lang: Lang }) {
  const t = translator(lang);
  return (
    <div className="join-choose" data-lang={lang}>
      <span className="eyebrow">{t("Waitlist")}</span>
      <h1>{t("Who's joining?")}</h1>
      <p className="lead">{t("Three quick steps, about a minute.")}</p>
      <div className="join-options">
        <Link href={localize(lang, "/waitlist/member")} className="join-option">
          <strong>{t("I want to train")}</strong>
          <span>{t("One pass for every partner gym. Pay only for the days you train.")}</span>
          <em>{t("Join the waitlist")}</em>
        </Link>
        <Link href={localize(lang, "/waitlist/gym")} className="join-option">
          <strong>{t("I own a gym")}</strong>
          <span>{t("Get traveller users, one simple payout and our management system.")}</span>
          <em>{t("Add your gym")}</em>
        </Link>
      </div>
    </div>
  );
}
