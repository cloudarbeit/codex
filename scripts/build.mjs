import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "assets"), { recursive: true });
await mkdir(path.join(dist, ".openai"), { recursive: true });
await cp(path.join(root, "index.html"), path.join(dist, "index.html"));
await cp(path.join(root, "src", "app.js"), path.join(dist, "assets", "app.js"));
await cp(path.join(root, "src", "styles.css"), path.join(dist, "assets", "styles.css"));
try { await cp(path.join(root, ".openai", "hosting.json"), path.join(dist, ".openai", "hosting.json")); } catch (error) { if (error.code !== "ENOENT") throw error; }
console.log(`Built static site in ${dist}`);
