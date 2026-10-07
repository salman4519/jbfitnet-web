import Logo from "@/components/Logo";
import Link from "next/link";

// The waitlist is its own focused flow: no site navigation or footer.
export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="join">
      {/* Same width, height and logo position as the main site header. */}
      <header className="join-bar">
        <div className="container header-inner">
          <Link href="/" className="logo" aria-label="JB Fitnet home">
            <Logo priority />
          </Link>
          <Link href="/" className="join-exit">
            Back to site
          </Link>
        </div>
      </header>
      <main id="main" className="join-main">
        {children}
      </main>
    </div>
  );
}
