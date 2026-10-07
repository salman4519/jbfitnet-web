import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "Join the JB Fitnet waitlist as someone who trains or as a gym owner.",
};

export default function WaitlistChooser() {
  return (
    <div className="join-choose">
      <span className="eyebrow">Waitlist</span>
      <h1>Who&apos;s joining?</h1>
      <p className="lead">Three quick steps, about a minute.</p>
      <div className="join-options">
        <Link href="/waitlist/member" className="join-option">
          <strong>I want to train</strong>
          <span>Pay by the day at any partner gym, at home or when you travel.</span>
          <em>Join the waitlist</em>
        </Link>
        <Link href="/waitlist/gym" className="join-option">
          <strong>I own a gym</strong>
          <span>Get nearby users and travellers, paid from prepaid wallets.</span>
          <em>Add your gym</em>
        </Link>
      </div>
    </div>
  );
}
