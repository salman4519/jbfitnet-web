import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import { gymFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "For gym owners",
  description: "List your gym on JB Fitnet. Members pay from prepaid wallets at a day rate set by your own monthly fee.",
};

const benefits = [
  {
    title: "Prepaid funds",
    text: "Members top up before they visit. Every check-in is paid from money that is already in the system, so there are no dues to chase.",
  },
  {
    title: "Travellers find you",
    text: "Anyone using JB Fitnet near your gym sees it in the app: people on work trips, visitors, locals away from their usual gym. They would never buy a full month, but they will pay for today.",
  },
  {
    title: "Your pricing, untouched",
    text: "The day rate is your own monthly fee divided by 30. Charge ₹1,500 a month and a JB Fitnet visit is ₹50.",
  },
  {
    title: "Fill the quiet hours",
    text: "Your floor and equipment are already paid for. Day visitors turn empty slots into income.",
  },
];

const steps = [
  { title: "Add your gym", text: "Join the partner waitlist with your gym's details and monthly fee." },
  { title: "Get onboarded", text: "Our team contacts you, confirms your listing and shares the commercial terms." },
  { title: "Members check in", text: "JB Fitnet members find your gym in the app and check in when they arrive." },
  { title: "Get paid", text: "Each visit is paid at your day rate from the member's prepaid wallet." },
];

export default function ForGyms() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">For gym owners</span>
          <h1>
            Every visit is <mark>already paid for.</mark>
          </h1>
          <p className="lead">
            JB Fitnet shows your gym to people training nearby, including travellers who are away from their own
            gym. They pay by the day from a prepaid wallet. You keep your regular memberships and add new visitors on
            top.
          </p>
          <div className="btn-row">
            <Link href="/waitlist/gym" className="btn btn-primary">
              Add your gym
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards">
            {benefits.map((b) => (
              <article key={b.title} className="card">
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Becoming a partner</span>
            <h2>From sign-up to first check-in.</h2>
          </div>
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="step-num">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="section-head">
            <span className="eyebrow">Questions from owners</span>
            <h2>Before you sign up.</h2>
          </div>
          <FaqList items={gymFaqs} />
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <h2>Put your gym on the map before launch.</h2>
          <div className="btn-row">
            <Link href="/waitlist/gym" className="btn btn-dark">
              Add your gym
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
