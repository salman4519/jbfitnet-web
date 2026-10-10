import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import { type Lang, translator } from "@/lib/i18n";
import { gymFaqs, memberFaqs } from "@/lib/site";

export default function Faq({ lang }: { lang: Lang }) {
  const t = translator(lang);
  return (
    <div data-lang={lang}>
      <section className="page-hero">
        <div className="container narrow">
          <span className="eyebrow">{t("FAQ")}</span>
          <h1>{t("Questions, answered.")}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container narrow faq-groups">
          <div>
            <h2>{t("For people who train")}</h2>
            <FaqList items={memberFaqs} lang={lang} />
          </div>
          <div>
            <h2>{t("For gym owners")}</h2>
            <FaqList items={gymFaqs} lang={lang} />
          </div>
        </div>
      </section>
      <CtaBand lang={lang} />
    </div>
  );
}
