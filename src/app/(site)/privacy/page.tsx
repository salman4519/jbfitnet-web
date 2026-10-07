import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What JB Fitnet collects through the waitlist and how it is used.",
};

export default function Privacy() {
  return (
    <section className="page-hero">
      <div className="container narrow prose">
        <span className="eyebrow">Privacy</span>
        <h1>Your waitlist details.</h1>
        <h2>What we collect</h2>
        <p>
          Only what you type into the waitlist forms: your name, mobile number, city, and any optional details you
          choose to add, such as email, area, current gym or, for gym owners, your gym&apos;s name, fee and member
          count.
        </p>
        <h2>Why we collect it</h2>
        <p>
          To contact you about the JB Fitnet launch in your city and, for gym owners, about partner onboarding. We
          also look at sign-ups by city to plan where to open.
        </p>
        <h2>What we don&apos;t do</h2>
        <p>We do not sell your details or share them with advertisers.</p>
        <h2>Removing your details</h2>
        <p>
          You can ask us to delete your waitlist entry at any time
          {site.contactEmail ? (
            <>
              {" "}by writing to <strong>{site.contactEmail}</strong>.
            </>
          ) : (
            "."
          )}
        </p>
      </div>
    </section>
  );
}
