import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <span className="eyebrow">404</span>
        <h1>This page skipped leg day.</h1>
        <p className="lead">The page you were looking for isn&apos;t here.</p>
        <div className="btn-row">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
