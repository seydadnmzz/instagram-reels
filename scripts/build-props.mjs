// Animasyonlu anlatım bölümünü (episodes/<id>.json) Remotion props'una çevirir.
// Kullanım: node scripts/build-props.mjs episodes/<id>.json
// Çıktılar:
//   out/<id>.narration.txt  -> seslendirilecek düz metin (tüm sahneler tek parça)
//   out/<id>.props.json     -> Explainer kompozisyonunun props'u
// public/episodes/<id>/narration.mp3 + narration.json (ElevenLabs karakter zamanlamaları)
// varsa sahne süreleri ve altyazılar sese göre, yoksa tahmini okuma hızına göre ayarlanır.
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const FPS = 30;
const TAIL_SECONDS = 0.8;
const SCENE_LEAD_FRAMES = 3;

const episodePath = process.argv[2];
if (!episodePath) {
  console.error("Kullanım: node scripts/build-props.mjs episodes/<id>.json");
  process.exit(1);
}
const episode = JSON.parse(await readFile(episodePath, "utf8"));
const { id } = episode;

// Her sahnenin anlatımını vurgulu/vurgusuz kelimelere böl
const sceneWords = episode.scenes.map((scene) => {
  const words = [];
  for (const m of scene.narration.matchAll(/\*([^*]+)\*|([^*]+)/g)) {
    const highlight = m[1] !== undefined;
    const raw = m[1] ?? m[2];
    // "*duruyor*." -> noktalama boşluksuz önceki kelimeye yapışır
    const glued = !highlight && words.length && /^[.,!?:;…]/.test(raw);
    raw.split(/\s+/).forEach((w, i) => {
      if (!w) return;
      if (glued && i === 0) words[words.length - 1].text += w;
      else words.push({ text: w, highlight });
    });
  }
  return words;
});
const allWords = sceneWords.flat();
const fullText = allWords.map((w) => w.text).join(" ");

await mkdir("out", { recursive: true });
await writeFile(path.join("out", `${id}.narration.txt`), fullText);

const audioRel = `episodes/${id}/narration.mp3`;
const alignmentPath = path.join("public", "episodes", id, "narration.json");
let timed = null;
if (existsSync(alignmentPath) && existsSync(path.join("public", audioRel))) {
  const al = JSON.parse(await readFile(alignmentPath, "utf8"));
  const chars = al.characters.join("");
  if (chars === fullText) {
    let cursor = 0;
    timed = allWords.map((w) => {
      const i0 = fullText.indexOf(w.text, cursor);
      const i1 = i0 + w.text.length - 1;
      cursor = i1 + 1;
      return { ...w, start: al.character_start_times_seconds[i0], end: al.character_end_times_seconds[i1] };
    });
  } else {
    console.warn("Uyarı: narration.json metni anlatımla eşleşmiyor; tahmini zamanlama kullanılıyor.");
  }
}
if (!timed) {
  // Tahmini: kelime başına ~0.36 sn, noktalamada ek duraklama
  let t = 0.2;
  timed = allWords.map((w) => {
    const start = t;
    const end = start + 0.18 + w.text.length * 0.045;
    t = end + (/[.!?]$/.test(w.text) ? 0.45 : /[,:;]$/.test(w.text) ? 0.22 : 0.08);
    return { ...w, start, end };
  });
}

const totalFrames = Math.ceil((timed[timed.length - 1].end + TAIL_SECONDS) * FPS);
let wordIndex = 0;
const starts = sceneWords.map((words, i) => {
  const first = timed[wordIndex];
  wordIndex += words.length;
  return i === 0 ? 0 : Math.max(0, Math.round(first.start * FPS) - SCENE_LEAD_FRAMES);
});
const scenes = episode.scenes.map((s, i) => ({
  headline: s.headline,
  ...(s.tag ? { tag: s.tag } : {}),
  visual: s.visual,
  ...(s.panel === false ? { panel: false } : {}),
  startFrame: starts[i],
  durationInFrames: (starts[i + 1] ?? totalFrames) - starts[i],
}));

const props = {
  theme: episode.theme ?? "lab",
  scenes,
  words: timed.map((w) => ({ ...w, start: Number(w.start.toFixed(3)), end: Number(w.end.toFixed(3)) })),
  ...(existsSync(path.join("public", audioRel)) ? { narration: audioRel } : {}),
  durationInFrames: totalFrames,
};
await writeFile(path.join("out", `${id}.props.json`), JSON.stringify(props, null, 2));
console.log(
  `Hazır: out/${id}.props.json — ${(totalFrames / FPS).toFixed(1)} sn, ${scenes.length} sahne, ` +
    `${props.narration ? "seslendirmeli" : "SESLENDİRMESİZ (tahmini zamanlama)"}, ${fullText.length} karakter`,
);
