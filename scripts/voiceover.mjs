// Kanca, sahneler ve kapanış için Türkçe seslendirmeyi videoya bağlar.
//
// Rutin (ElevenLabs Composio üzerinden, anahtar Composio'da saklı):
//   node scripts/voiceover.mjs segments out/<id>.props.json
//     -> out/<id>.voice-segments.json: seslendirilecek metinler ve yazılacakları dosya yolları
//   (her parça ELEVENLABS_TEXT_TO_SPEECH ile seslendirilip ilgili dosyaya indirilir)
//   node scripts/voiceover.mjs apply out/<id>.props.json
//     -> ses sürelerini ölçer, props dosyasına ekler
//
// Yerel (ELEVENLABS_API_KEY ortam değişkeniyle doğrudan API):
//   node scripts/voiceover.mjs api out/<id>.props.json
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUTRO_SUFFIX = "Cevabını yorumlara yaz.";

const [mode, propsPath] = process.argv.slice(2);
if (!["segments", "apply", "api"].includes(mode) || !propsPath) {
  console.error("Kullanım: node scripts/voiceover.mjs <segments|apply|api> out/<id>.props.json");
  process.exit(1);
}
const id = path.basename(propsPath).replace(/\.props\.json$/, "");
const props = JSON.parse(await readFile(propsPath, "utf8"));
const settings = JSON.parse(await readFile("ayarlar.json", "utf8")).elevenlabs ?? {};

const clean = (text) => text.replace(/\*/g, "").replace(/\s+/g, " ").trim();
const segments = [
  { key: "hook", text: clean(props.hook) },
  ...props.scenes.map((s, i) => ({ key: `scene-${i + 1}`, text: clean(s.text) })),
  { key: "outro", text: `${clean(props.question)} ${OUTRO_SUFFIX}` },
].map((s) => ({ ...s, file: `public/episodes/${id}/vo-${s.key}.mp3` }));

const audioDuration = (file) =>
  Number(
    execFileSync(
      "npx",
      ["remotion", "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file],
      { encoding: "utf8", shell: process.platform === "win32" },
    ).trim(),
  );

async function apply() {
  const missing = segments.filter((s) => !existsSync(s.file));
  if (missing.length) {
    console.error(`Eksik ses dosyaları: ${missing.map((s) => s.file).join(", ")}`);
    process.exit(3);
  }
  const voices = {};
  for (const s of segments) {
    voices[s.key] = {
      src: s.file.replace(/^public\//, ""),
      durationInSeconds: Number(audioDuration(s.file).toFixed(2)),
    };
    console.log(`${s.key}: ${voices[s.key].durationInSeconds} sn`);
  }
  props.hookVoice = voices.hook;
  props.scenes = props.scenes.map((s, i) => ({ ...s, voice: voices[`scene-${i + 1}`] }));
  props.outroVoice = voices.outro;
  await writeFile(propsPath, JSON.stringify(props, null, 2));
  const chars = segments.reduce((n, s) => n + s.text.length, 0);
  console.log(`Seslendirme eklendi (${chars} karakter): ${propsPath}`);
}

async function synthesize(text) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey || !settings.voiceId) {
    console.error(!apiKey ? "ELEVENLABS_API_KEY tanımlı değil." : "ayarlar.json > elevenlabs.voiceId boş.");
    process.exit(2);
  }
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${settings.voiceId}?output_format=mp3_44100_128`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: settings.modelId ?? "eleven_multilingual_v2",
        voice_settings: settings.voiceSettings,
      }),
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    const detail = await res.text();
    if (res.status !== 429 && res.status < 500) throw new Error(`ElevenLabs ${res.status}: ${detail.slice(0, 300)}`);
    await new Promise((r) => setTimeout(r, 4000 * attempt));
  }
  throw new Error("ElevenLabs yanıt vermedi.");
}

await mkdir(path.join("public", "episodes", id), { recursive: true });
if (mode === "segments") {
  const out = path.join("out", `${id}.voice-segments.json`);
  const plan = {
    voice_id: settings.voiceId,
    model_id: settings.modelId ?? "eleven_multilingual_v2",
    voice_settings: settings.voiceSettings,
    segments,
  };
  await writeFile(out, JSON.stringify(plan, null, 2));
  console.log(JSON.stringify(plan, null, 2));
} else if (mode === "apply") {
  await apply();
} else {
  for (const s of segments) await writeFile(s.file, await synthesize(s.text));
  await apply();
}
