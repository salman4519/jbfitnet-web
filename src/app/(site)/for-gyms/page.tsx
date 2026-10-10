import type { Metadata } from "next";
import ForGyms from "@/views/ForGyms";

export const metadata: Metadata = {
  title: "For gym owners",
  description: "List your gym on JB Fitnet. Get traveller users, fill quiet hours, receive one simple payout and use the JB management system.",
};

export default function Page() {
  return <ForGyms lang="en" />;
}
