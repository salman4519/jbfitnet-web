import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileCta from "@/components/MobileCta";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileCta />
    </>
  );
}
