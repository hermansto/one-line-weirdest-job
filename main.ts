// One-line entry: the weirdest job title, written out exactly as judged.
// The harness gives us an output folder; we only ever write inside it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const title = "Senior Vice President of Vibes";

// The competition caps the title at 60 characters; ours is well inside.
if (title.length > 60 || title.length === 0) {
  throw new Error(`title must be 1-60 characters, got ${title.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
// No trailing newline on purpose: the file must be exactly the title.
writeFileSync(target, title, "utf8");

// Read it back and make sure nothing extra slipped in.
const written = readFileSync(target, "utf8");
if (written !== title || written.endsWith("\n")) {
  throw new Error("entry.txt does not match the title exactly");
}

console.log(`Wrote ${written.length}-character title to ${target}`);
