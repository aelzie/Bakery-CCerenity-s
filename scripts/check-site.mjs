// Pre-launch check for the built site in _site/.
// Lists every [[PLACEHOLDER]] still showing, plus dead "#" links, example.com
// addresses and internal links that point to pages that don't exist.
// Exit code 1 means "not ready to launch".
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const OUT = "_site";

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith(".html")) yield p;
  }
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');

const placeholders = new Map(); // text -> Set(pages)
const problems = [];

try { await stat(OUT); } catch {
  console.error(`No ${OUT}/ folder. Run "npm run build" first.`);
  process.exit(1);
}

for await (const file of htmlFiles(OUT)) {
  const page = "/" + relative(OUT, file).replace(/index\.html$/, "");
  const html = await readFile(file, "utf8");

  for (const m of html.matchAll(/\[\[([^\]]+)\]\]/g)) {
    const key = decode(m[1]).trim();
    if (!placeholders.has(key)) placeholders.set(key, new Set());
    placeholders.get(key).add(page);
  }

  for (const m of html.matchAll(/href="([^"]*)"/g)) {
    const href = decode(m[1]);
    if (href === "#" || href === "") problems.push(`${page}: empty or "#" link`);
    if (/example\.(com|org)/i.test(href)) problems.push(`${page}: example address in link → ${href}`);
    if (href.startsWith("/") && !href.startsWith("//")) {
      const path = href.split("#")[0].split("?")[0];
      const target = path.endsWith("/") ? join(OUT, path, "index.html") : join(OUT, path);
      if (!(await exists(target))) problems.push(`${page}: broken internal link → ${href}`);
    }
  }
}

console.log("\nCCerenity's pre-launch check\n============================");
if (placeholders.size) {
  console.log(`\n${placeholders.size} placeholder(s) still on the site:\n`);
  for (const [text, pages] of [...placeholders].sort()) {
    console.log(`  • [[${text}]]\n      on ${[...pages].sort().join(", ")}`);
  }
} else {
  console.log("\n✓ No placeholders left.");
}

if (problems.length) {
  console.log(`\n${problems.length} link problem(s):\n`);
  [...new Set(problems)].forEach((p) => console.log("  • " + p));
} else {
  console.log("\n✓ No dead, example, or broken internal links.");
}

const ready = !placeholders.size && !problems.length;
console.log(ready ? "\nREADY TO LAUNCH ✓\n" : "\nNot ready to launch yet — fix the items above.\n");
process.exit(ready ? 0 : 1);
