import Link from "next/link";

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <h2>Stop paying for days you don&apos;t train.</h2>
        <div className="btn-row">
          <Link href="/waitlist" className="btn btn-dark">
            Join the waitlist
          </Link>
          <Link href="/waitlist/gym" className="btn btn-outline-dark">
            Add your gym
          </Link>
        </div>
      </div>
    </section>
  );
}
