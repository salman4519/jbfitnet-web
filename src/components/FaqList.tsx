import { type Lang, translator } from "@/lib/i18n";
import type { Faq } from "@/lib/site";

export default function FaqList({ items, lang }: { items: Faq[]; lang: Lang }) {
  const t = translator(lang);
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{t(item.q)}</summary>
          <p>{t(item.a)}</p>
        </details>
      ))}
    </div>
  );
}
