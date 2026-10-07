import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "How it works",
  description: "Top up a wallet, check in at any partner gym, and pay that gym's monthly fee divided by 30 for the day.",
};

const steps = [
  {
    title: "Add money to your wallet",
    text: "Create your account in the JB Fitnet app and top up. That balance is yours to spend at any gym in the network.",
  },
  {
    title: "Choose where to train today",
    text: "The app shows partner gyms near you, at home or wherever you are travelling. Every listing shows its day rate up front, so you know the cost before you go.",
  },
  {
    title: "Check in at the gym",
    text: "Use the app to check in when you arrive. That check-in is what counts as a training day.",
  },
  {
    title: "Pay for that day only",
    text: "The gym's day rate is debited from your wallet. On days you don't check in, nothing moves.",
  },
];

const examples = [
  [900, 8],
  [1500, 12],
  [3000, 15],
];

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function HowItWorks() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">How it works</span>
          <h1>One wallet. Charged by the day.</h1>
          <p className="lead">
            JB Fitnet replaces the monthly membership with a simple rule: a day at any partner gym costs that
            gym&apos;s monthly fee divided by 30, and you only pay when you go.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <ol className="timeline">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="step-num">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Calculator />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The maths</span>
            <h2>Three months, three different gyms.</h2>
            <p>Example figures to show how the day rate works. Real rates come from each partner gym.</p>
          </div>
          <div className="table-wrap">
            <table className="compare numeric">
              <thead>
                <tr>
                  <th scope="col">Gym&apos;s monthly fee</th>
                  <th scope="col">Day rate</th>
                  <th scope="col">Days trained</th>
                  <th scope="col">You pay</th>
                  <th scope="col">Stays in wallet</th>
                </tr>
              </thead>
              <tbody>
                {examples.map(([fee, days]) => (
                  <tr key={fee}>
                    <th scope="row" data-label="Gym's monthly fee">{rupees(fee)}</th>
                    <td data-label="Day rate">{rupees(fee / 30)}</td>
                    <td data-label="Days trained">{days}</td>
                    <td data-label="You pay">{rupees((fee / 30) * days)}</td>
                    <td data-label="Stays in wallet">{rupees(fee - (fee / 30) * days)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
