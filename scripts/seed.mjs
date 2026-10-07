// Fills the LOCAL database with sample waitlist entries for testing the admin panel.
//   npm run seed         add sample entries
//   npm run seed:clear   remove them again
// Every sample entry is marked is_sample: true. Refuses to run against anything but localhost.
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "";
if (!/^mongodb:\/\/(127\.0\.0\.1|localhost)(:\d+)?(\/|$)/.test(uri)) {
  console.error("Refusing to seed: MONGODB_URI is not a local database.");
  process.exit(1);
}

const client = await MongoClient.connect(uri);
const db = client.db(process.env.MONGODB_DB || "jbfitnet");
const members = db.collection("waitlist_members");
const gyms = db.collection("waitlist_gyms");

await members.deleteMany({ is_sample: true });
await gyms.deleteMany({ is_sample: true });

if (!process.argv.includes("--clear")) {
  const cities = ["Kochi", "Kochi", "Kochi", "Bengaluru", "Bengaluru", "Chennai", "Hyderabad", "Mumbai"];
  const areas = ["Central", "North", "South", "East", "West", null];
  const frequency = ["1–2 days a week", "3–4 days a week", "5+ days a week", "Not training yet", null];
  const spend = ["Not paying for a gym", "Under ₹1,000", "₹1,000–₹2,000", "₹2,000–₹4,000", "Over ₹4,000", null];
  const daysAgo = (n) => new Date(Date.now() - n * 86_400_000 - (n * 37 % 24) * 3_600_000);
  const pad = (n) => String(n).padStart(2, "0");

  await members.insertMany(
    Array.from({ length: 28 }, (_, i) => ({
      full_name: `Sample Member ${pad(i + 1)}`,
      phone: `90000001${pad(i)}`,
      email: i % 3 === 0 ? null : `member${pad(i + 1)}@example.com`,
      city: cities[i % cities.length],
      area: areas[i % areas.length],
      current_gym: i % 4 === 0 ? `Sample Gym ${pad((i % 9) + 1)}` : null,
      workout_frequency: frequency[i % frequency.length],
      monthly_spend: spend[(i * 2) % spend.length],
      created_at: daysAgo(i % 14),
      is_sample: true,
    })),
  );

  await gyms.insertMany(
    Array.from({ length: 9 }, (_, i) => ({
      contact_name: `Sample Owner ${pad(i + 1)}`,
      gym_name: `Sample Gym ${pad(i + 1)}`,
      phone: `90000002${pad(i)}`,
      email: i % 2 === 0 ? `owner${pad(i + 1)}@example.com` : null,
      city: cities[(i * 3) % cities.length],
      area: areas[(i + 2) % areas.length],
      monthly_fee: [900, 1200, 1500, 1800, 2400, 3000, null][i % 7],
      active_members: [80, 150, 220, 400, null][i % 5],
      message: i % 4 === 0 ? "Sample note: interested in onboarding early." : null,
      created_at: daysAgo((i * 2) % 14),
      is_sample: true,
    })),
  );
}

console.log(`members: ${await members.countDocuments()}  gyms: ${await gyms.countDocuments()}`);
await client.close();
