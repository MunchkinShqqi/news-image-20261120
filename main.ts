// News-image entry for Friday 20 November 2026 (news-image-20261120):
// it writes the entry image to /output/entry.png. The program only copies
// the image this repository holds, so the output is byte-identical to it
// on every run. No network, no randomness, no arguments.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const REPO_DIR = dirname(fileURLToPath(import.meta.url));

mkdirSync(OUTPUT_DIR, { recursive: true });
const source = join(REPO_DIR, 'entry.png');
const dest = join(OUTPUT_DIR, 'entry.png');
copyFileSync(source, dest);
// Verify the copy is complete: a partial write must fail loudly, not
// silently ship a truncated image.
if (statSync(dest).size !== statSync(source).size) {
  throw new Error(`entry.png copy incomplete: ${statSync(dest).size} of ${statSync(source).size} bytes`);
}
