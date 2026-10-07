import Link from "next/link";
import Calculator from "@/components/Calculator";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import { memberFaqs } from "@/lib/site";

const steps = [
  { title: "Top up", text: "Sign up in the app and add money to your JB Fitnet wallet." },
  { title: "Pick a gym", text: "Browse partner gyms near you and see each one's day rate before you go." },
  { title: "Check in and train", text: "Check in at the gym with the app and get on with your workout." },
  { title: "Pay for that day", text: "Your wallet is debited the gym's monthly fee divided by 30. Nothing more." },
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
  ["Where you train", "One gym", "Any partner gym"],
  ["When you travel", "Pay again for day passes", "Same wallet, new gym"],
  ["Commitment", "Monthly or yearly plan", "None"],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">One wallet · Many gyms</span>
            <h1>
              Pay only for the <mark>days you train.</mark>
            </h1>
            <p className="lead">
              Top up your JB Fitnet wallet and walk into any partner gym. You pay that gym&apos;s day rate only on
              the days you check in.
            </p>
            <div className="btn-row">
              <Link href="/waitlist" className="btn btn-primary">
                Join the waitlist
              </Link>
              <Link href="/for-gyms" className="btn btn-ghost">
                I own a gym
              </Link>
            </div>
          </div>
          <Calculator />
        </div>
      </section>

      <section className="facts">
        <div className="container facts-grid">
          <div>
            <strong>No membership</strong>
            <span>A wallet you top up, not a plan you are locked into.</span>
          </div>
          <div>
            <strong>No wasted days</strong>
            <span>No visit, no charge. Your balance waits for you.</span>
          </div>
          <div>
            <strong>No missed sessions</strong>
            <span>Find the nearest partner gym at home, at work or on a trip.</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why it&apos;s different</span>
            <h2>A membership charges you for days you never train.</h2>
            <p>Pay for thirty days, train on twelve, and the other eighteen are simply gone. JB Fitnet turns that around.</p>
          </div>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Topic</span></th>
                  <th scope="col">Gym membership</th>
                  <th scope="col">JB Fitnet</th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([topic, old, jb]) => (
                  <tr key={topic}>
                    <th scope="row">{topic}</th>
                    <td data-label="Gym membership">{old}</td>
                    <td data-label="JB Fitnet">{jb}</td>
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
            <span className="eyebrow">Train anywhere</span>
            <h2>Travelling? Your gym comes with you.</h2>
            <p className="lead">
              Open the app wherever you are and it shows the JB Fitnet partner gyms nearby. Check in, train, and pay
              that gym&apos;s day rate from the same wallet. A work trip or a week away no longer breaks your routine.
            </p>
            <ul className="ticks">
              <li><strong>Nearby gyms, wherever you are.</strong> At home, near the office or in another city.</li>
              <li><strong>No day passes.</strong> You never pay a second gym on top of your own.</li>
              <li><strong>Good for gyms too.</strong> Visitors to the area become paying members for the day.</li>
            </ul>
          </div>
          <div className="statement">
            <div className="statement-head">
              <span className="eyebrow">One week, three gyms</span>
              <span>Example</span>
            </div>
            <ul>
              {week.map((v) => (
                <li key={v.day}>
                  <span className="statement-day">{v.day}</span>
                  <span className="statement-place">{v.place}</span>
                  <strong>−₹{v.rate}</strong>
                </li>
              ))}
            </ul>
            <div className="statement-total">
              <span>Debited this week</span>
              <strong>₹{week.reduce((sum, v) => sum + v.rate, 0)}</strong>
            </div>
            <p className="calc-note">Tue, Thu and Sun: no check-in, no charge.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>It works like a wallet, not a membership.</h2>
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
          <Link href="/how-it-works" className="text-link">
            See the full walkthrough
          </Link>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div>
            <span className="eyebrow">For gym owners</span>
            <h2>Every visit is already paid for.</h2>
            <p className="lead">
              Members load their wallet before they walk in, so your gym works with prepaid money. You keep your own
              pricing and reach people who would never buy a full month.
            </p>
            <div className="btn-row">
              <Link href="/for-gyms" className="btn btn-primary">
                Partner with JB Fitnet
              </Link>
            </div>
          </div>
          <ul className="ticks">
            <li><strong>Prepaid funds.</strong> No dues to chase at the front desk.</li>
            <li><strong>New faces.</strong> Travellers and visitors nearby find your gym in the app.</li>
            <li><strong>Your price.</strong> The day rate is your monthly fee divided by 30.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="section-head">
            <span className="eyebrow">Questions</span>
            <h2>Asked before every sign-up.</h2>
          </div>
          <FaqList items={memberFaqs.slice(0, 4)} />
          <Link href="/faq" className="text-link">
            All questions
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
