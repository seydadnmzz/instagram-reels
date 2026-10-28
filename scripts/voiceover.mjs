// Kanca, sahneler ve kapanış için ElevenLabs ile Türkçe seslendirme üretir ve
// out/<id>.props.json dosyasına ses dosyalarını + sürelerini ekler.
// Kullanım: ELEVENLABS_API_KEY=... node scripts/voiceover.mjs out/2026-10-29-sabah.props.json
// Ses ve model ayarları ayarlar.json > elevenlabs altından okunur.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUTRO_SUFFIX = "Cevabını yorumlara yaz.";

const propsPath = process.argv[2];
if (!propsPath) {
  console.error("Kullanım: node scripts/voiceover.mjs out/<id>.props.json");
  process.exit(1);
}
const id = path.basename(propsPath).replace(/\.props\.json$/, "");
const props = JSON.parse(await readFile(propsPath, "utf8"));
const settings = JSON.parse(await readFile("ayarlar.json", "utf8")).elevenlabs ?? {};
const apiKey = process.env.ELEVENLABS_API_KEY;

if (!apiKey || !settings.voiceId) {
  console.error(
    !apiKey
      ? "ELEVENLABS_API_KEY ortam değişkeni tanımlı değil."
      : "ayarlar.json içinde elevenlabs.voiceId tanımlı değil.",
  );
  process.exit(2);
}

const clean = (text) => text.replace(/\*/g, "").replace(/\s+/g, " ").trim();
const segments = [
  { key: "hook", text: clean(props.hook) },
  ...props.scenes.map((s, i) => ({ key: `scene-${i + 1}`, text: clean(s.text) })),
  { key: "outro", text: `${clean(props.question)} ${OUTRO_SUFFIX}` },
];

async function synthesize(text, previousText, nextText) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${settings.voiceId}/with-timestamps?output_format=mp3_44100_128`;
  const body = JSON.stringify({
    text,
    model_id: settings.modelId ?? "eleven_multilingual_v2",
    language_code: "tr",
    voice_settings: settings.voiceSettings ?? { stability: 0.45, similarity_boost: 0.8, style: 0.35 },
    ...(previousText ? { previous_text: previousText } : {}),
    ...(nextText ? { next_text: nextText } : {}),
  });
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
      body,
    });
    if (res.ok) return res.json();
    const detail = await res.text();
    if (res.status !== 429 && res.status < 500) {
      throw new Error(`ElevenLabs ${res.status}: ${detail.slice(0, 300)}`);
    }
    console.warn(`ElevenLabs ${res.status}, ${attempt}. deneme başarısız; bekleniyor...`);
    await new Promise((r) => setTimeout(r, 4000 * attempt));
  }
  throw new Error("ElevenLabs yanıt vermedi.");
}

await mkdir(path.join("public", "episodes", id), { recursive: true });
const voices = {};
let totalChars = 0;
for (const [i, seg] of segments.entries()) {
  const data = await synthesize(seg.text, segments[i - 1]?.text, segments[i + 1]?.text);
  const rel = `episodes/${id}/vo-${seg.key}.mp3`;
  await writeFile(path.join("public", rel), Buffer.from(data.audio_base64, "base64"));
  const ends = (data.alignment ?? data.normalized_alignment)?.character_end_times_seconds ?? [];
  const durationInSeconds = Number(((ends.at(-1) ?? 0) + 0.15).toFixed(2));
  voices[seg.key] = { src: rel, durationInSeconds };
  totalChars += seg.text.length;
  console.log(`${seg.key}: ${durationInSeconds} sn`);
}

props.hookVoice = voices.hook;
props.scenes = props.scenes.map((s, i) => ({ ...s, voice: voices[`scene-${i + 1}`] }));
props.outroVoice = voices.outro;
await writeFile(propsPath, JSON.stringify(props, null, 2));
console.log(`Seslendirme hazır (${totalChars} karakter): ${propsPath}`);
