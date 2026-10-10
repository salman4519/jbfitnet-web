import Link from "next/link";
import FaqList from "@/components/FaqList";
import { type Lang, localize, translator } from "@/lib/i18n";
import { gymFaqs } from "@/lib/site";

const benefits = [
  {
    title: "Traveller users",
    text: "People visiting your area open the app, see your gym nearby and walk in. These are members you would never reach on your own.",
  },
  {
    title: "Quiet time becomes valuable",
    text: "Your floor and equipment are already paid for. Day visitors turn the empty hours into income.",
  },
  {
    title: "One payout, no headache",
    text: "Every visit is recorded when a member checks in, and your earnings are credited to you in one payment. Everything runs through the system.",
  },
  {
    title: "JB management system",
    text: "Partner gyms get the JB management system, so check-ins and payments are handled in one place.",
  },
  {
    title: "Free trial for the first 10 gyms",
    text: "The first 10 gyms to join JB Fitnet get a free trial. Add your gym now to be one of them.",
  },
  {
    title: "Upfront payment for selected gyms",
    text: "Selected partner gyms receive payment up front. This is offered to chosen gyms, not to every partner. Ask us about it when we contact you.",
  },
];

const steps = [
  { title: "Add your gym", text: "Join the partner waitlist with your gym's details and monthly fee." },
  { title: "Get onboarded", text: "Our team contacts you, sets up your listing and the JB management system." },
  { title: "Members check in", text: "JB Fitnet users, including travellers, find your gym in the app and scan your QR code at the door." },
  { title: "Get paid", text: "Your earnings are credited to you in one payment through the system." },
];

const qrSteps = [
  {
    title: "Get your gym's QR code",
    text: "Every partner gym gets its own QR code in the JB management system. Download it and print it.",
  },
  {
    title: "Put it at the entrance",
    text: "Stick it at the front desk or the door, anywhere a member can point their phone at it.",
  },
  {
    title: "Members scan to check in",
    text: "The member opens the JB Fitnet app and scans your code. The system checks it and records the visit straight away. Your staff type nothing.",
  },
  {
    title: "They check out when they leave",
    text: "The app records when the visit ended. Each visit shows up in your system and counts towards your payout.",
  },
];

// Decorative pattern for the sample poster. It is not a working QR code.
const qrPattern = [
  "111111101011101111111",
  "100000100110101000001",
  "101110101001001011101",
  "101110100111001011101",
  "101110101100101011101",
  "100000101011001000001",
  "111111101010101111111",
  "000000001101100000000",
  "110101111010011011010",
  "011010010111100101101",
  "101101101001011010011",
  "010011010110100101100",
  "111010111011011101011",
  "000000001010110010110",
  "111111100111011011001",
  "100000101100100110110",
  "101110101011011001011",
  "101110100110110110100",
  "101110101101001011011",
  "100000100010110100110",
  "111111101101011011001",
];

export default function ForGyms({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const to = (href: string) => localize(lang, href);

  return (
    <div data-lang={lang}>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t("For gym owners")}</span>
          <h1>
            {t("New members.")} <mark>{t("No headache.")}</mark>
          </h1>
          <p className="lead">
            {t("JB Fitnet shows your gym to people training nearby, including travellers who are away from their own gym. You get new users in your quiet hours, one simple payout, and our management system. The first 10 gyms get a free trial.")}
          </p>
          <div className="btn-row">
            <Link href={to("/waitlist/gym")} className="btn btn-primary">
              {t("Add your gym")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards cards-3">
            {benefits.map((b) => (
              <article key={b.title} className="card">
                <h3>{t(b.title)}</h3>
                <p>{t(b.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="qr">
        <div className="container split">
          <div>
            <span className="eyebrow">{t("QR check-in")}</span>
            <h2>{t("One QR code at your door does the work.")}</h2>
            <p className="lead">
              {t("No card machines, no registers, no extra staff. Members check themselves in with their phone.")}
            </p>
            <ol className="timeline">
              {qrSteps.map((step, i) => (
                <li key={step.title}>
                  <span className="step-num">{i + 1}</span>
                  <div>
                    <h3>{t(step.title)}</h3>
                    <p>{t(step.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="qr-side">
            <div className="qr-poster" aria-hidden="true">
              <span className="qr-poster-top">{t("JB Fitnet partner gym")}</span>
              <div className="qr-code">
                {qrPattern.flatMap((row, y) =>
                  row.split("").map((cell, x) => <i key={`${y}-${x}`} className={cell === "1" ? "on" : undefined} />),
                )}
              </div>
              <strong>{t("Scan to check in")}</strong>
              <span>{t("Sample poster")}</span>
            </div>
            <ul className="ticks">
              <li><strong>{t("Only valid codes work.")}</strong> {t("The system rejects a code that is wrong or switched off.")}</li>
              <li><strong>{t("One gym at a time.")}</strong> {t("A member must check out before checking in somewhere else.")}</li>
              <li><strong>{t("Replace it any time.")}</strong> {t("Generate a new code and the old one stops working.")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t("Becoming a partner")}</span>
            <h2>{t("From sign-up to first check-in.")}</h2>
          </div>
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="step-num">{i + 1}</span>
                <h3>{t(step.title)}</h3>
                <p>{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container narrow">
          <div className="section-head">
            <span className="eyebrow">{t("Questions from owners")}</span>
            <h2>{t("Before you sign up.")}</h2>
          </div>
          <FaqList items={gymFaqs} lang={lang} />
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <h2>{t("Be one of the first 10 gyms. Get a free trial.")}</h2>
          <div className="btn-row">
            <Link href={to("/waitlist/gym")} className="btn btn-dark">
              {t("Add your gym")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
