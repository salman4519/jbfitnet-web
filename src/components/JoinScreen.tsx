import Link from "next/link";
import JoinWizard from "@/components/JoinWizard";
import { type Lang, localize, translator } from "@/lib/i18n";

const side = {
  member: {
    label: "Member waitlist",
    headline: "One pass. All gyms.",
    points: ["Pay only for the days you train", "Keep training when you travel", "See how busy a gym is before you go"],
    other: { href: "/waitlist/gym", label: "Own a gym instead?" },
  },
  gym: {
    label: "Partner waitlist",
    headline: "New members. No headache.",
    points: ["Travellers and nearby users find your gym", "One payout, with our management system", "First 10 gyms get a free trial"],
    other: { href: "/waitlist/member", label: "Here to train instead?" },
  },
};

export default function JoinScreen({ kind, lang }: { kind: "member" | "gym"; lang: Lang }) {
  const t = translator(lang);
  const s = side[kind];
  return (
    <div className="join-split" data-lang={lang}>
      <aside className="join-side">
        <span className="eyebrow">{t(s.label)}</span>
        <p className="join-side-head">{t(s.headline)}</p>
        <ul className="ticks">
          {s.points.map((p) => (
            <li key={p}>{t(p)}</li>
          ))}
        </ul>
        <Link href={localize(lang, s.other.href)} className="join-switch">
          {t(s.other.label)}
        </Link>
      </aside>
      <div className="join-panel">
        <JoinWizard kind={kind} lang={lang} />
      </div>
    </div>
  );
}
