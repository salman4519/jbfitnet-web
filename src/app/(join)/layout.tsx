import JoinBar from "@/components/JoinBar";

// The waitlist is its own focused flow: no site navigation or footer.
export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="join">
      <JoinBar />
      <main id="main" className="join-main">
        {children}
      </main>
    </div>
  );
}
