"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Kind = "member" | "gym";
type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "error"; message: string }
  | { state: "done"; position: number };

const stepTitles: Record<Kind, { title: string; hint: string }[]> = {
  member: [
    { title: "First, tell us about you.", hint: "So we know who to message when we launch." },
    { title: "Where do you live?", hint: "We're opening one city at a time. Tell us yours." },
    { title: "How do you train now?", hint: "Optional, and no wrong answers. It helps us choose the right gyms." },
  ],
  gym: [
    { title: "You and your gym.", hint: "Who should our team speak to?" },
    { title: "Where is it?", hint: "We onboard partners city by city." },
    { title: "A little about the gym.", hint: "Optional, but it speeds up onboarding." },
  ],
};

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function JoinWizard({ kind }: { kind: Kind }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [fee, setFee] = useState("");
  const [copied, setCopied] = useState(false);

  const steps = stepTitles[kind];
  const last = step === steps.length - 1;

  // Only the visible step is validated before moving on.
  function stepIsValid() {
    const fields = formRef.current?.querySelectorAll<HTMLInputElement>(
      `[data-step="${step}"] input, [data-step="${step}"] textarea`,
    );
    for (const field of fields ?? []) {
      if (!field.reportValidity()) return false;
    }
    return true;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepIsValid()) return;
    if (!last) {
      setStep(step + 1);
      return;
    }

    setStatus({ state: "sending" });
    const body = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch(`/api/waitlist/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) setStatus({ state: "done", position: data.position });
      else setStatus({ state: "error", message: data.error ?? "Could not join the waitlist." });
    } catch {
      setStatus({ state: "error", message: "No connection. Check your internet and try again." });
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
    } catch {
      // Clipboard unavailable: leave the button as it is.
    }
  }

  if (status.state === "done") {
    return (
      <div className="join-done" role="status">
        <span className="eyebrow">You&apos;re in</span>
        <p className="join-pos">#{status.position}</p>
        <h1>{kind === "member" ? "on the waitlist." : "on the partner list."}</h1>
        <ol className="join-next">
          {kind === "member" ? (
            <>
              <li>We sign up gyms in your city.</li>
              <li>You get a message the day we open there.</li>
              <li>Top up, check in, and pay only for the days you show up.</li>
            </>
          ) : (
            <>
              <li>Our team contacts you when onboarding begins in your city.</li>
              <li>We confirm your listing and share the commercial terms.</li>
              <li>Members start checking in, paid from prepaid wallets.</li>
            </>
          )}
        </ol>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={copyLink}>
            {copied
              ? kind === "member" ? "Link copied. Now send it to them." : "Link copied"
              : kind === "member" ? "Copy link for a gym buddy" : "Copy link for another owner"}
          </button>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const sending = status.state === "sending";
  const feeNumber = Number(fee);

  return (
    <form ref={formRef} className="join-form" onSubmit={onSubmit} noValidate>
      <div className="join-progress" aria-hidden="true">
        {steps.map((_, i) => (
          <span key={i} className={i <= step ? "on" : undefined} />
        ))}
      </div>
      <p className="join-count">
        Step {step + 1} of {steps.length}
      </p>
      <h1>{steps[step].title}</h1>
      <p className="join-hint">{steps[step].hint}</p>

      {/* Honeypot, hidden from people */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <fieldset data-step="0" hidden={step !== 0}>
        {kind === "member" ? (
          <Field label="Your name" name="full_name" required autoComplete="name" />
        ) : (
          <>
            <Field label="Your name" name="contact_name" required autoComplete="name" />
            <Field label="Gym name" name="gym_name" required />
          </>
        )}
        <Field label="Mobile number" name="phone" type="tel" required autoComplete="tel" inputMode="tel"
          pattern="[0-9+\(\) \-]{8,20}" />
        <Field label="Email" name="email" type="email" autoComplete="email" optional />
      </fieldset>

      <fieldset data-step="1" hidden={step !== 1}>
        <Field label="City" name="city" required autoComplete="address-level2" />
        <Field label="Area / locality" name="area" optional />
        {kind === "member" && <Field label="Current gym" name="current_gym" optional />}
      </fieldset>

      <fieldset data-step="2" hidden={step !== 2}>
        {kind === "member" ? (
          <>
            <Chips label="How often do you train?" name="workout_frequency"
              options={["1–2 days a week", "3–4 days a week", "5+ days a week", "Haven't started yet"]} />
            <Chips label="What do you pay per month now?" name="monthly_spend"
              options={["Not paying for a gym", "Under ₹1,000", "₹1,000–₹2,000", "₹2,000–₹4,000", "Over ₹4,000"]} />
          </>
        ) : (
          <>
            <Field label="Monthly membership fee (₹)" name="monthly_fee" type="number" inputMode="numeric" min={0}
              optional value={fee} onChange={(e) => setFee(e.target.value)} />
            {feeNumber >= 30 && (
              <p className="join-rate">
                A JB Fitnet visit to your gym would be about <strong>{rupees(Math.round(feeNumber / 30))}</strong>.
              </p>
            )}
            <Field label="Active members" name="active_members" type="number" inputMode="numeric" min={0} optional />
            <div className="field">
              <label htmlFor="f-message">Anything we should know? <span>Optional</span></label>
              <textarea id="f-message" name="message" rows={3} maxLength={1000} />
            </div>
          </>
        )}
      </fieldset>

      {status.state === "error" && (
        <p className="form-error" role="alert">{status.message}</p>
      )}

      <div className="join-actions">
        {step > 0 && (
          <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)} disabled={sending}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? "Joining…" : last ? (kind === "member" ? "Join the waitlist" : "Add my gym") : "Next"}
        </button>
      </div>
      {last && (
        <p className="form-note">
          We only use these details to contact you about JB Fitnet. See our <Link href="/privacy">privacy note</Link>.
        </p>
      )}
    </form>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  optional?: boolean;
};

function Field({ label, name, optional, ...rest }: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={`f-${name}`}>
        {label} {optional && <span>Optional</span>}
      </label>
      <input id={`f-${name}`} name={name} type="text" maxLength={200} {...rest} />
    </div>
  );
}

function Chips({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div className="field" role="radiogroup" aria-label={label}>
      <span className="chips-label">{label}</span>
      <div className="chips">
        {options.map((o) => (
          <label key={o}>
            <input type="radio" name={name} value={o} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
