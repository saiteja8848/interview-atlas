import { mkdir, copyFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const source = resolve("scripts/sites-worker.mjs");
const target = resolve("dist/server/index.js");

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);
