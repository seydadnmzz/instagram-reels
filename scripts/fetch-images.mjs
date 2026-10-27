// Bölüm JSON'undaki her sahne için Wikimedia Commons'tan görsel indirir.
// Kullanım: node scripts/fetch-images.mjs episodes/2026-10-28.json
// Çıktı: public/episodes/<id>/*.jpg ve out/<id>.props.json (+ görsel kaynakları)
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const USER_AGENT = "InstagramReelsBot/1.0 (daily educational reels; contact via repo owner)";
const API = "https://commons.wikimedia.org/w/api.php";

const stripHtml = (s = "") => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

async function searchCommons(query) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: "6",
    gsrlimit: "12",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: "1280",
  });
  const res = await fetch(`${API}?${params}`, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Commons API ${res.status}`);
  const data = await res.json();
  const pages = Object.values(data.query?.pages ?? {}).sort((a, b) => a.index - b.index);
  return pages
    .map((p) => ({ title: p.title, info: p.imageinfo?.[0] }))
    .filter(({ info }) => info && /image\/(jpeg|png)/.test(info.mime) && info.width >= 700 && info.height >= 500);
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`İndirme hatası ${res.status}: ${url}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function resolveImage(query, id, name, used) {
  if (!query) return null;
  try {
    const candidates = (await searchCommons(query)).filter((c) => !used.has(c.title));
    for (const c of candidates) {
      const rel = `episodes/${id}/${name}.jpg`;
      try {
        await download(c.info.thumburl ?? c.info.url, path.join("public", rel));
      } catch {
        continue;
      }
      used.add(c.title);
      const meta = c.info.extmetadata ?? {};
      return {
        path: rel,
        credit: {
          file: c.info.descriptionurl,
          author: stripHtml(meta.Artist?.value) || "Bilinmiyor",
          license: meta.LicenseShortName?.value ?? "",
        },
      };
    }
    console.warn(`Görsel bulunamadı: "${query}" (renkli arka plan kullanılacak)`);
  } catch (err) {
    console.warn(`Görsel aranamadı: "${query}": ${err.message}`);
  }
  return null;
}

const episodePath = process.argv[2];
if (!episodePath) {
  console.error("Kullanım: node scripts/fetch-images.mjs <bölüm.json>");
  process.exit(1);
}
const episode = JSON.parse(await readFile(episodePath, "utf8"));
const id = episode.id;
await mkdir(path.join("public", "episodes", id), { recursive: true });
await mkdir("out", { recursive: true });

const used = new Set();
const credits = [];
const hook = await resolveImage(episode.hookImageQuery, id, "hook", used);
if (hook) credits.push(hook.credit);
const scenes = [];
for (const [i, scene] of episode.scenes.entries()) {
  const img = scene.image ? { path: scene.image } : await resolveImage(scene.imageQuery, id, `scene-${i + 1}`, used);
  if (img?.credit) credits.push(img.credit);
  scenes.push({ text: scene.text, ...(img ? { image: img.path } : {}) });
}

const props = {
  category: episode.category,
  hook: episode.hook,
  ...(hook ? { hookImage: hook.path } : {}),
  scenes,
  question: episode.question,
  ...(episode.handle ? { handle: episode.handle } : {}),
};
await writeFile(path.join("out", `${id}.props.json`), JSON.stringify(props, null, 2));
await writeFile(path.join("out", `${id}.credits.json`), JSON.stringify(credits, null, 2));
console.log(`Hazır: out/${id}.props.json (${credits.length} görsel)`);
