"use client";

import { useState } from "react";

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// Fixed order in which days light up, so the month looks like a real training pattern.
const DAY_ORDER = [
  0, 2, 4, 7, 9, 11, 14, 16, 18, 21, 23, 25, 28, 1, 8, 15, 22, 29, 5, 12, 19,
  26, 3, 10, 17, 24, 6, 13, 20, 27,
];

export default function Calculator() {
  const [fee, setFee] = useState(1500);
  const [days, setDays] = useState(12);

  const dayRate = fee / 30;
  const youPay = dayRate * days;
  const trained = new Set(DAY_ORDER.slice(0, days));

  return (
    <div className="calc">
      <div className="calc-head">
        <span className="eyebrow">Try it</span>
        <span className="calc-rate">
          {rupees(fee)} ÷ 30 = <strong>{rupees(dayRate)}</strong> a day
        </span>
      </div>

      <div className="calc-field">
        <label htmlFor="calc-fee">
          Gym&apos;s monthly fee <strong>{rupees(fee)}</strong>
        </label>
        <input
          id="calc-fee"
          type="range"
          min={600}
          max={6000}
          step={300}
          value={fee}
          onChange={(e) => setFee(Number(e.target.value))}
        />
      </div>

      <div className="calc-field">
        <label htmlFor="calc-days">
          Days you train this month <strong>{days}</strong>
        </label>
        <input
          id="calc-days"
          type="range"
          min={0}
          max={30}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        />
      </div>

      <div className="calc-month" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} className={trained.has(i) ? "on" : undefined}>
            {i + 1}
          </span>
        ))}
      </div>

      <dl className="calc-totals">
        <div>
          <dt>Monthly membership</dt>
          <dd className="strike">{rupees(fee)}</dd>
        </div>
        <div className="calc-pay">
          <dt>You pay with JB Fitnet</dt>
          <dd>{rupees(youPay)}</dd>
        </div>
        <div>
          <dt>Stays in your wallet</dt>
          <dd>{rupees(fee - youPay)}</dd>
        </div>
      </dl>
      <p className="calc-note">Example figures. Each partner gym&apos;s day rate comes from its own monthly fee.</p>
    </div>
  );
}
