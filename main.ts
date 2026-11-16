// ai-excited-01 entry: writes the judge-exciting image to the output directory.
//
// The image is a phoenix of living fire and molten gold bursting through
// embers, stored beside this file as entry.jpg. This program copies those
// exact bytes to <outputDir>/entry.png (the gate accepts JPEG content at
// the .png path). No network, no randomness, no dependencies — the output
// is byte-for-byte identical on every run.
//
// Usage:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Inside the grader container MAKEFUN_OUTPUT_DIR is unset and the image
// goes to /output/entry.png.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_NAME = 'entry.jpg';
const OUTPUT_NAME = 'entry.png';

// Gate limits for the entry image: at most 1 MiB, at most 1024x1024 px.
const MAX_BYTES = 1024 * 1024;

// JPEG files start with the SOI marker FF D8 FF.
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== '') {
    return fromEnv;
  }
  return '/output';
}

function loadSourceImage(sourcePath: string): Buffer {
  if (!existsSync(sourcePath)) {
    throw new Error(`source image not found: ${sourcePath}`);
  }

  const bytes = readFileSync(sourcePath);

  if (bytes.length === 0) {
    throw new Error(`source image is empty: ${sourcePath}`);
  }
  if (bytes.length > MAX_BYTES) {
    throw new Error(
      `source image is ${bytes.length} bytes, over the 1 MiB limit: ${sourcePath}`,
    );
  }
  if (!bytes.subarray(0, JPEG_MAGIC.length).equals(JPEG_MAGIC)) {
    throw new Error(`source image is not a JPEG (bad magic bytes): ${sourcePath}`);
  }

  return bytes;
}

function verifyWritten(outputPath: string, expected: Buffer): void {
  const written = readFileSync(outputPath);
  if (!written.equals(expected)) {
    throw new Error(`verification failed: ${outputPath} differs from the source image`);
  }
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(here, SOURCE_NAME);
  const outputDir = resolveOutputDir();
  const outputPath = join(outputDir, OUTPUT_NAME);

  const bytes = loadSourceImage(sourcePath);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, bytes);
  verifyWritten(outputPath, bytes);

  console.log(`wrote ${outputPath} (${bytes.length} bytes, verified byte-for-byte)`);
}

main();
