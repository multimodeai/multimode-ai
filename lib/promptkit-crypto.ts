import crypto from "crypto";

/**
 * Prompt-kit content is encrypted at rest.
 *
 * Why: the route reads kit markdown off the filesystem at runtime, so the files
 * have to ship in the deploy bundle - which means they have to be committed.
 * This repo is PUBLIC. Committing plaintext made every paid kit readable at
 * raw.githubusercontent.com, bypassing the JWT gate entirely (confirmed
 * 2026-09-14: HTTP 200, full plaintext, 12 kits).
 *
 * The JWT middleware was never the weak part - it verifies properly. The weak
 * part was publishing the content it was protecting.
 *
 * The key is derived from PROMPTKIT_TOKEN_SECRET, which is already set in the
 * deploy environment for JWT verification, so this needs no new env var and no
 * dashboard change.
 */

const ALGO = "aes-256-gcm";

function key(): Buffer {
  const secret = process.env.PROMPTKIT_TOKEN_SECRET;
  if (!secret) throw new Error("PROMPTKIT_TOKEN_SECRET is not set");
  // Domain-separated so the content key is never the raw signing secret.
  return crypto.createHash("sha256").update(`promptkit-content:${secret}`).digest();
}

/** iv(12) . tag(16) . ciphertext, base64 */
export function encryptContent(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), enc]).toString("base64");
}

export function decryptContent(payload: string): string {
  const buf = Buffer.from(payload, "base64");
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const decipher = crypto.createDecipheriv(ALGO, key(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]).toString("utf8");
}
