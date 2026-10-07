import { MongoServerError } from "mongodb";
import { DatabaseNotConfiguredError, getDb } from "./mongodb";

type Body = Record<string, unknown>;

export class ValidationError extends Error {}

const text = (body: Body, key: string, max = 120) => {
  const v = body[key];
  if (typeof v !== "string") return null;
  const trimmed = v.trim().slice(0, max);
  return trimmed || null;
};

const required = (body: Body, key: string, label: string) => {
  const v = text(body, key);
  if (!v) throw new ValidationError(`${label} is required.`);
  return v;
};

const phone = (body: Body) => {
  let digits = String(body.phone ?? "").replace(/\D/g, "");
  // Store Indian numbers as 10 digits so +91 and 0 prefixes don't create duplicates.
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length < 8 || digits.length > 15) {
    throw new ValidationError("Enter a valid mobile number.");
  }
  return digits;
};

const email = (body: Body) => {
  const v = text(body, "email", 200);
  if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    throw new ValidationError("Enter a valid email address.");
  }
  return v?.toLowerCase() ?? null;
};

const wholeNumber = (body: Body, key: string) => {
  const n = parseInt(String(body[key] ?? ""), 10);
  return Number.isFinite(n) && n >= 0 && n < 10_000_000 ? n : null;
};

export function parseMember(body: Body) {
  return {
    full_name: required(body, "full_name", "Your name"),
    phone: phone(body),
    email: email(body),
    city: required(body, "city", "City"),
    area: text(body, "area"),
    current_gym: text(body, "current_gym"),
    workout_frequency: text(body, "workout_frequency", 40),
    monthly_spend: text(body, "monthly_spend", 40),
  };
}

export function parseGym(body: Body) {
  return {
    contact_name: required(body, "contact_name", "Your name"),
    gym_name: required(body, "gym_name", "Gym name"),
    phone: phone(body),
    email: email(body),
    city: required(body, "city", "City"),
    area: text(body, "area"),
    monthly_fee: wholeNumber(body, "monthly_fee"),
    active_members: wholeNumber(body, "active_members"),
    message: text(body, "message", 1000),
  };
}

// Shared POST handler for both lists.
export async function handleSignup(
  request: Request,
  collection: "waitlist_members" | "waitlist_gyms",
  parse: (body: Body) => Record<string, unknown>,
) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website) {
    return Response.json({ ok: true, position: 1 });
  }

  try {
    const doc = parse(body);
    const db = await getDb();
    const col = db.collection(collection);
    await col.insertOne({ ...doc, created_at: new Date() });
    const position = await col.countDocuments();
    return Response.json({ ok: true, position });
  } catch (err) {
    if (err instanceof ValidationError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      return Response.json(
        { error: "This mobile number is already on the list. We'll be in touch." },
        { status: 409 },
      );
    }
    if (err instanceof DatabaseNotConfiguredError) {
      return Response.json(
        { error: "The waitlist isn't connected yet. Please try again soon." },
        { status: 503 },
      );
    }
    console.error("Waitlist signup failed:", err);
    return Response.json(
      { error: "Something went wrong on our side. Please try again." },
      { status: 500 },
    );
  }
}
