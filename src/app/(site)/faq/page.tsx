import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import { gymFaqs, memberFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How the JB Fitnet wallet, day rates and gym partnerships work.",
};

export default function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <span className="eyebrow">FAQ</span>
          <h1>Questions, answered.</h1>
        </div>
      </section>
      <section className="section">
        <div className="container narrow faq-groups">
          <div>
            <h2>For people who train</h2>
            <FaqList items={memberFaqs} />
          </div>
          <div>
            <h2>For gym owners</h2>
            <FaqList items={gymFaqs} />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
