#!/usr/bin/env node
// Pull a ReForge engine release into ./vendor so this game runs with no build step.
//
//   node scripts/update-engine.mjs v0.1.0
//   node scripts/update-engine.mjs latest
//
// Requires Node 18+ (global fetch). Assets come from the public GitHub Release of Reforge-Dev/ReForge-Engine.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = "Reforge-Dev/ReForge-Engine";
const ASSETS = ["reforge-engine.js", "reforge-engine.css", "behaviors.manifest.json", "game.schema.json"];

const tag = process.argv[2];
if (!tag) {
  console.error("usage: node scripts/update-engine.mjs <tag|latest>   e.g. v0.1.0");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const vendor = join(root, "vendor");
const base =
  tag === "latest"
    ? `https://github.com/${REPO}/releases/latest/download`
    : `https://github.com/${REPO}/releases/download/${tag}`;

await mkdir(vendor, { recursive: true });

let failed = false;
for (const name of ASSETS) {
  const url = `${base}/${name}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    console.error(`FAIL ${name}: HTTP ${res.status} (${url})`);
    failed = true;
    continue;
  }
  await writeFile(join(vendor, name), Buffer.from(await res.arrayBuffer()));
  console.log(`ok   vendor/${name}`);
}

if (failed) {
  console.error("\nSome assets could not be downloaded. Does that release exist yet?");
  process.exit(1);
}
await writeFile(join(vendor, "VERSION"), `${tag}\n`);
console.log(`\nEngine ${tag} vendored into ./vendor`);
