import Link from "next/link";
import Calculator from "@/components/Calculator";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import { type Lang, localize, translator } from "@/lib/i18n";
import { memberFaqs } from "@/lib/site";

const benefits = [
  {
    title: "One pass, all gyms",
    text: "No separate memberships. Your JB Fitnet pass works at every partner gym.",
  },
  {
    title: "Pay only for days you train",
    text: "Trained 10 days? Pay for 10. Skipped a day? Pay nothing for it.",
  },
  {
    title: "Never miss the gym when you travel",
    text: "Different city, same pass. Find a partner gym nearby and walk in.",
  },
  {
    title: "See how busy a gym is",
    text: "The app shows how many people are training right now, so you can pick the gym that suits you.",
  },
];

const steps = [
  { title: "Get your pass", text: "Sign up in the app and add money to your JB Fitnet wallet." },
  { title: "Pick a gym", text: "See partner gyms near you, each one's day rate, and how many people are training there now." },
  { title: "Check in and train", text: "Check in at the gym with the app and get on with your workout." },
  { title: "Pay for that day", text: "You are charged that gym's monthly fee divided by 30. Nothing more." },
];

// Example week: day rates are monthly fees of ₹1,500, ₹1,800 and ₹1,200 divided by 30.
const week = [
  { day: "Mon", place: "Your usual gym, near home", rate: 50 },
  { day: "Wed", place: "A partner gym near the office", rate: 60 },
  { day: "Fri", place: "A partner gym in the city you're visiting", rate: 40 },
  { day: "Sat", place: "Same trip, same gym", rate: 40 },
];

const compare = [
  ["What you pay", "The full month, up front", "Only the days you train"],
  ["Miss a day", "The money is gone", "Nothing is charged"],
  ["Where you train", "One gym", "Every partner gym"],
  ["When you travel", "Pay again for day passes", "Same pass, new gym"],
  ["How busy is it?", "You find out when you arrive", "See it live in the app"],
  ["Commitment", "Monthly or yearly plan", "None"],
];

export default function Home({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const to = (href: string) => localize(lang, href);

  return (
    <div data-lang={lang}>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{t("App coming soon")}</span>
            <h1>
              {t("One pass.")} <mark>{t("All gyms.")}</mark>
            </h1>
            <p className="lead">
              {t("Train at any JB Fitnet partner gym with a single pass, and pay only for the days you actually train.")}
            </p>
            <div className="btn-row">
              <Link href={to("/waitlist")} className="btn btn-primary">
                {t("Join the waitlist")}
              </Link>
              <Link href={to("/for-gyms")} className="btn btn-ghost">
                {t("I own a gym")}
              </Link>
            </div>
          </div>
          <Calculator lang={lang} />
        </div>
      </section>

      <section className="section benefits">
        <div className="container">
          <div className="cards">
            {benefits.map((b) => (
              <article key={b.title} className="card">
                <span className="eyebrow" aria-hidden="true" />
                <h3>{t(b.title)}</h3>
                <p>{t(b.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t("Why it's different")}</span>
            <h2>{t("A membership charges you for days you never train.")}</h2>
            <p>{t("Pay for thirty days, train on twelve, and the other eighteen are simply gone. JB Fitnet turns that around.")}</p>
          </div>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">{t("Topic")}</span></th>
                  <th scope="col">{t("Gym membership")}</th>
                  <th scope="col">JB Fitnet</th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([topic, old, jb]) => (
                  <tr key={topic}>
                    <th scope="row">{t(topic)}</th>
                    <td data-label={t("Gym membership")}>{t(old)}</td>
                    <td data-label="JB Fitnet">{t(jb)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div>
            <span className="eyebrow">{t("Train anywhere")}</span>
            <h2>{t("Travelling? Your gym comes with you.")}</h2>
            <p className="lead">
              {t("Open the app wherever you are and it shows the JB Fitnet partner gyms nearby. Check in, train, and pay that gym's day rate with the same pass. A work trip or a week away no longer breaks your routine.")}
            </p>
            <ul className="ticks">
              <li><strong>{t("Nearby gyms, wherever you are.")}</strong> {t("At home, near the office or in another city.")}</li>
              <li><strong>{t("No day passes.")}</strong> {t("You never pay a second gym on top of your own.")}</li>
              <li><strong>{t("Good for gyms too.")}</strong> {t("Visitors to the area become paying members for the day.")}</li>
            </ul>
          </div>
          <div className="statement">
            <div className="statement-head">
              <span className="eyebrow">{t("One week, three gyms")}</span>
              <span>{t("Example")}</span>
            </div>
            <ul>
              {week.map((v, i) => (
                <li key={i}>
                  <span className="statement-day">{t(v.day)}</span>
                  <span className="statement-place">{t(v.place)}</span>
                  <strong>−₹{v.rate}</strong>
                </li>
              ))}
            </ul>
            <div className="statement-total">
              <span>{t("Debited this week")}</span>
              <strong>₹{week.reduce((sum, v) => sum + v.rate, 0)}</strong>
            </div>
            <p className="calc-note">{t("Tue, Thu and Sun: no check-in, no charge.")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t("How it works")}</span>
            <h2>{t("Four steps from sign-up to workout.")}</h2>
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
          <Link href={to("/how-it-works")} className="text-link">
            {t("See the full walkthrough")}
          </Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div>
            <span className="eyebrow">{t("For gym owners")}</span>
            <h2>{t("New members. One payout. No headache.")}</h2>
            <p className="lead">
              {t("JB Fitnet sends travellers and nearby users to your gym, fills your quiet hours, and handles the payments for you. The first 10 gyms get a free trial.")}
            </p>
            <div className="btn-row">
              <Link href={to("/for-gyms")} className="btn btn-primary">
                {t("Partner with JB Fitnet")}
              </Link>
            </div>
          </div>
          <ul className="ticks">
            <li><strong>{t("Traveller users.")}</strong> {t("People visiting your area find your gym in the app.")}</li>
            <li><strong>{t("Quiet hours that earn.")}</strong> {t("Day visitors fill the slots that sit empty.")}</li>
            <li><strong>{t("One payout.")}</strong> {t("Your earnings are credited in one go, all through the system.")}</li>
            <li><strong>{t("JB management system.")}</strong> {t("Included for partner gyms.")}</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="section-head">
            <span className="eyebrow">{t("Questions")}</span>
            <h2>{t("Asked before every sign-up.")}</h2>
          </div>
          <FaqList items={memberFaqs.slice(0, 4)} lang={lang} />
          <Link href={to("/faq")} className="text-link">
            {t("All questions")}
          </Link>
        </div>
      </section>

      <CtaBand lang={lang} />
    </div>
  );
}
