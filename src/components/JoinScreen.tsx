import Link from "next/link";
import JoinWizard from "@/components/JoinWizard";

const side = {
  member: {
    headline: "Pay only for the days you train.",
    points: ["One wallet, any partner gym", "No visit, no charge", "Keep training when you travel"],
    other: { href: "/waitlist/gym", label: "Own a gym instead?" },
  },
  gym: {
    headline: "Every visit is already paid for.",
    points: ["Visits paid from prepaid wallets", "Day rate set by your own monthly fee", "Travellers and nearby users find your gym"],
    other: { href: "/waitlist/member", label: "Here to train instead?" },
  },
};

export default function JoinScreen({ kind }: { kind: "member" | "gym" }) {
  const s = side[kind];
  return (
    <div className="join-split">
      <aside className="join-side">
        <span className="eyebrow">{kind === "member" ? "Member waitlist" : "Partner waitlist"}</span>
        <p className="join-side-head">{s.headline}</p>
        <ul className="ticks">
          {s.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <Link href={s.other.href} className="join-switch">
          {s.other.label}
        </Link>
      </aside>
      <div className="join-panel">
        <JoinWizard kind={kind} />
      </div>
    </div>
  );
}
