# JB Fitnet website

Marketing site and waitlist for JB Fitnet. Next.js (App Router), MongoDB Atlas, deployed on Vercel.

## Pages

| Route | What it is |
|---|---|
| `/` | Home, with the day-rate calculator |
| `/how-it-works` | Step-by-step walkthrough and example figures |
| `/for-gyms` | Pitch for gym owners |
| `/waitlist` | Waitlist entry: choose member or gym owner |
| `/waitlist/member` | Three-step sign-up for people who train |
| `/waitlist/gym` | Three-step sign-up for gyms |
| `/faq`, `/privacy` | Questions and privacy note |
| `/admin` | Password-protected panel: sign-ups, search, filters, reports, CSV download |

The waitlist routes live in `src/app/(join)` and use their own full-screen layout without the site header and footer.

Sign-ups are stored in two collections: `waitlist_members` and `waitlist_gyms`. Each allows one entry per mobile number.

## Run locally

```bash
cp .env.example .env.local   # then fill in MONGODB_URI
npm install
npm run dev
```

## Sample data for local testing

```bash
npm run seed         # add sample members and gyms to the local database
npm run seed:clear   # remove them
```

The seed script only runs against a local MongoDB (`mongodb://127.0.0.1` or `localhost`) and marks every entry `is_sample: true`.

## Environment variables

| Name | Required | Purpose |
|---|---|---|
| `MONGODB_URI` | Yes | Atlas connection string |
| `MONGODB_DB` | No | Database name, defaults to `jbfitnet` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Shown in the footer and on the privacy page |
| `ADMIN_PASSWORD` | For `/admin` | Password for the admin panel. Use a long random value. Without it the panel stays locked. |
| `ADMIN_SESSION_SECRET` | No | Separate key for signing admin sessions |

## MongoDB Atlas setup

1. Create a cluster at cloud.mongodb.com (the free M0 tier is enough for a waitlist).
2. Database Access: add a database user with read and write access.
3. Network Access: allow `0.0.0.0/0`. Vercel functions do not have fixed IP addresses.
4. Connect > Drivers: copy the connection string and put your user's password in it. That is `MONGODB_URI`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose Add New > Project and import the repository. If the repository holds more than this folder, set Root Directory to `jb-web`.
3. Add `MONGODB_URI` (and the optional variables) under Environment Variables.
4. Deploy, then add your domain under Settings > Domains.

## Editing content

- Copy, navigation and FAQs: `src/lib/site.ts` and the page files in `src/app`.
- Colours and type: the tokens at the top of `src/app/globals.css`, which follow `../brand-kit`.
