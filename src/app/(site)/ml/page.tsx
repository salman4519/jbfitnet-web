import type { Metadata } from "next";
import Home from "@/views/Home";

export const metadata: Metadata = {
  title: { absolute: "JB Fitnet | ഒരു പാസ്. എല്ലാ ജിമ്മും." },
  description: "എല്ലാ JB Fitnet പാർട്ണർ ജിമ്മുകൾക്കും ഒറ്റ പാസ്. പരിശീലിച്ച ദിവസങ്ങൾക്ക് മാത്രം പണം. വെയ്റ്റ്‌ലിസ്റ്റിൽ ചേരൂ.",
};

export default function Page() {
  return <Home lang="ml" />;
}
