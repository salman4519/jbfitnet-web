import type { Metadata } from "next";
import Faq from "@/views/Faq";

export const metadata: Metadata = {
  title: "ചോദ്യങ്ങൾ",
  description: "JB Fitnet പാസ്, ദിവസ നിരക്ക്, ജിം പാർട്ണർഷിപ്പ് എന്നിവയെക്കുറിച്ച്.",
};

export default function Page() {
  return <Faq lang="ml" />;
}
