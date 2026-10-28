import type { ReelProps, Voice } from "./schema";

export const FPS = 30;
export const TRANSITION_FRAMES = 12;
export const OUTRO_FRAMES = 4 * FPS;
// Seslendirme, sahneye geçiş bittikten kısa süre sonra başlar
export const VOICE_DELAY_FRAMES = 8;
// Ses bittikten sonra bir sonraki geçişle çakışmaması için bırakılan pay
const VOICE_TAIL_FRAMES = TRANSITION_FRAMES + 8;

const countWords = (text: string) =>
  text.replace(/\*/g, "").trim().split(/\s+/).length;

// Kelime başına ~0.32 sn okuma süresi + giriş animasyonu payı
const readingFrames = (text: string, minSec: number, maxSec: number) =>
  Math.round(Math.min(maxSec, Math.max(minSec, 1.6 + countWords(text) * 0.32)) * FPS);

// Seslendirme varsa sahne süresini ses belirler, yoksa okuma süresi
const fitVoice = (fallbackFrames: number, voice: Voice | undefined, minFrames: number) =>
  voice
    ? Math.max(minFrames, VOICE_DELAY_FRAMES + Math.ceil(voice.durationInSeconds * FPS) + VOICE_TAIL_FRAMES)
    : fallbackFrames;

export const hookFrames = (hook: string, voice?: Voice) =>
  fitVoice(readingFrames(hook, 3, 4.5), voice, 2.5 * FPS);
export const sceneFrames = (text: string, voice?: Voice) =>
  fitVoice(readingFrames(text, 3.5, 7.5), voice, 2.5 * FPS);
export const outroFrames = (voice?: Voice) => fitVoice(OUTRO_FRAMES, voice, OUTRO_FRAMES);

// Her sekansın timeline'daki başlangıç karesi (geçişler sahneleri üst üste bindirir)
export const sequenceStarts = (props: ReelProps) => {
  const voices = [props.hookVoice, ...props.scenes.map((s) => s.voice), props.outroVoice];
  const durations = [
    hookFrames(props.hook, props.hookVoice),
    ...props.scenes.map((s) => sceneFrames(s.text, s.voice)),
    outroFrames(props.outroVoice),
  ];
  const starts: number[] = [];
  let cursor = 0;
  for (const d of durations) {
    starts.push(cursor);
    cursor += d - TRANSITION_FRAMES;
  }
  return { durations, starts, voices, total: cursor + TRANSITION_FRAMES };
};
