import Calculator from "@/components/Calculator";
import CtaBand from "@/components/CtaBand";
import { type Lang, translator } from "@/lib/i18n";

const steps = [
  {
    title: "Add money to your wallet",
    text: "Create your account in the JB Fitnet app and top up. That balance is yours to spend at any gym in the network.",
  },
  {
    title: "Choose where to train today",
    text: "The app shows partner gyms near you, at home or wherever you are travelling. Each listing shows its day rate and how many people are training there right now.",
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

export default function HowItWorks({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const cols = ["Gym's monthly fee", "Day rate", "Days trained", "You pay", "Stays in wallet"].map(t);

  return (
    <div data-lang={lang}>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t("How it works")}</span>
          <h1>{t("One pass. Charged by the day.")}</h1>
          <p className="lead">
            {t("One JB Fitnet pass works at every partner gym. A day costs that gym's monthly fee divided by 30, and you only pay on the days you train.")}
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
                  <h3>{t(step.title)}</h3>
                  <p>{t(step.text)}</p>
                </div>
              </li>
            ))}
          </ol>
          <Calculator lang={lang} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t("The maths")}</span>
            <h2>{t("Three months, three different gyms.")}</h2>
            <p>{t("Example figures to show how the day rate works. Real rates come from each partner gym.")}</p>
          </div>
          <div className="table-wrap">
            <table className="compare numeric">
              <thead>
                <tr>{cols.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
              </thead>
              <tbody>
                {examples.map(([fee, days]) => (
                  <tr key={fee}>
                    <th scope="row" data-label={cols[0]}>{rupees(fee)}</th>
                    <td data-label={cols[1]}>{rupees(fee / 30)}</td>
                    <td data-label={cols[2]}>{days}</td>
                    <td data-label={cols[3]}>{rupees((fee / 30) * days)}</td>
                    <td data-label={cols[4]}>{rupees(fee - (fee / 30) * days)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </div>
  );
}
