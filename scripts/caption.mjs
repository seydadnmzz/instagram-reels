// Instagram açıklamasını bölüm JSON'u + görsel kaynaklarından oluşturur.
// Kullanım: node scripts/caption.mjs episodes/2026-10-28.json  ->  out/<id>.caption.txt
import { readFile, writeFile } from "node:fs/promises";

const MAX_CAPTION = 2200;
const MAX_HASHTAGS = 30;

const episode = JSON.parse(await readFile(process.argv[2], "utf8"));
const credits = JSON.parse(await readFile(`out/${episode.id}.credits.json`, "utf8").catch(() => "[]"));

const hashtags = [...new Set(episode.hashtags ?? [])]
  .slice(0, MAX_HASHTAGS)
  .map((t) => `#${t.replace(/^#/, "").replace(/\s+/g, "")}`)
  .join(" ");

const sources = (episode.sources ?? []).length
  ? `Kaynaklar: ${episode.sources.join(" · ")}`
  : "";

const shorten = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const imageCredits = credits.length
  ? `Görseller: Wikimedia Commons — ${credits
      .map((c) => `${shorten(c.author, 40)}${c.license ? ` (${c.license})` : ""}`)
      .join("; ")}`
  : "";

let caption = [episode.caption.trim(), hashtags, sources, imageCredits].filter(Boolean).join("\n\n");
if (caption.length > MAX_CAPTION) caption = `${caption.slice(0, MAX_CAPTION - 1)}…`;

await writeFile(`out/${episode.id}.caption.txt`, caption);
console.log(caption);
console.log(`\n(${caption.length}/${MAX_CAPTION} karakter)`);
