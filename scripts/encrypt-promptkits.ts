/**
 * Encrypt every plaintext prompt kit to a .md.enc sibling.
 * Run after adding or editing a kit:  npx tsx scripts/encrypt-promptkits.ts
 * The .md stays local (gitignored); only the .md.enc is committed.
 */
import { promises as fs } from "fs";
import path from "path";
import { encryptContent, decryptContent } from "../lib/promptkit-crypto";

async function main() {
  const dir = path.join(process.cwd(), "content/promptkits");
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".md"));
  for (const f of files) {
    const plain = await fs.readFile(path.join(dir, f), "utf8");
    const enc = encryptContent(plain);
    // Round-trip before writing - never ship something that won't decrypt.
    if (decryptContent(enc) !== plain) throw new Error(`round-trip failed for ${f}`);
    await fs.writeFile(path.join(dir, `${f}.enc`), enc);
    console.log(`encrypted ${f} (${plain.length}b -> ${enc.length}b)`);
  }
  console.log(`\n${files.length} kits encrypted and round-trip verified.`);
}
main().catch((e) => { console.error(e); process.exit(1); });
