import { type Lang, translator } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Privacy({ lang }: { lang: Lang }) {
  const t = translator(lang);
  return (
    <section className="page-hero" data-lang={lang}>
      <div className="container narrow prose">
        <span className="eyebrow">{t("Privacy")}</span>
        <h1>{t("Your waitlist details.")}</h1>
        <h2>{t("What we collect")}</h2>
        <p>
          {t("Only what you type into the waitlist forms: your name, mobile number, city, and any optional details you choose to add, such as email, area, current gym or, for gym owners, your gym's name, fee and member count.")}
        </p>
        <h2>{t("Why we collect it")}</h2>
        <p>
          {t("To contact you about the JB Fitnet launch in your city and, for gym owners, about partner onboarding. We also look at sign-ups by city to plan where to open.")}
        </p>
        <h2>{t("What we don't do")}</h2>
        <p>{t("We do not sell your details or share them with advertisers.")}</p>
        <h2>{t("Removing your details")}</h2>
        <p>
          {t("You can ask us to delete your waitlist entry at any time by writing to")}{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </div>
    </section>
  );
}
