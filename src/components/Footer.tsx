import Logo from "@/components/Logo";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo width={102} />
          <p>{site.tagline}</p>
        </div>
        <div>
          <h2>Train</h2>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/waitlist">Join the waitlist</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div>
          <h2>Gym owners</h2>
          <Link href="/for-gyms">Partner with us</Link>
          <Link href="/waitlist/gym">Add your gym</Link>
        </div>
        <div>
          <h2>Company</h2>
          <Link href="/privacy">Privacy</Link>
          {site.contactEmail && <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>}
        </div>
      </div>
      <div className="container footer-base">© 2026 JB Fitnet. App coming soon.</div>
    </footer>
  );
}
