// Seslendirmeyi perdeyi bozmadan hızlandırır ve karakter zamanlamalarını aynı oranda ölçekler.
// Hız ayarlar.json > elevenlabs.speed değerinden (varsayılan 1) ya da 2. argümandan okunur.
// Özgün dosyalar narration.orig.* olarak saklanır; betik tekrar çalıştırılırsa onlardan başlar.
// Kullanım: node scripts/speed.mjs <id> [hız]
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";

const [id, arg] = process.argv.slice(2);
if (!id) throw new Error("Kullanım: node scripts/speed.mjs <id> [hız]");
const settings = JSON.parse(readFileSync("ayarlar.json", "utf8"));
const factor = Number(arg ?? settings.elevenlabs?.speed ?? 1);
const dir = `public/episodes/${id}`;
const mp3 = `${dir}/narration.mp3`;
const json = `${dir}/narration.json`;
const origMp3 = `${dir}/narration.orig.mp3`;
const origJson = `${dir}/narration.orig.json`;

if (!existsSync(origMp3)) copyFileSync(mp3, origMp3);
if (!existsSync(origJson)) copyFileSync(json, origJson);

if (factor === 1) {
  copyFileSync(origMp3, mp3);
  copyFileSync(origJson, json);
} else {
  execFileSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["remotion", "ffmpeg", "-y", "-loglevel", "error", "-i", origMp3, "-filter:a", `atempo=${factor}`, "-b:a", "128k", mp3],
    { stdio: "inherit", shell: process.platform === "win32" },
  );
  const a = JSON.parse(readFileSync(origJson, "utf8"));
  const scale = (t) => Math.round((t / factor) * 1000) / 1000;
  a.character_start_times_seconds = a.character_start_times_seconds.map(scale);
  a.character_end_times_seconds = a.character_end_times_seconds.map(scale);
  writeFileSync(json, JSON.stringify(a));
}
console.log(`Seslendirme hızı: ${factor}×`);
