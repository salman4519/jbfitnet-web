import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "jb_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

const sha = (value: string) => createHash("sha256").update(value).digest();

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

// Signing key: a dedicated secret if set, otherwise derived from the password,
// so changing the password signs everyone out.
const key = () => sha(`jb-admin-session:${process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD}`);

const sign = (expires: string) => createHmac("sha256", key()).update(expires).digest("hex");

export function passwordMatches(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(sha(candidate), sha(expected));
}

export async function startSession() {
  const expires = String(Date.now() + MAX_AGE_SECONDS * 1000);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = Buffer.from(sign(expires));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
