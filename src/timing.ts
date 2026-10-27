import type { ReelProps } from "./schema";

export const FPS = 30;
export const TRANSITION_FRAMES = 12;
export const OUTRO_FRAMES = 4 * FPS;

const countWords = (text: string) =>
  text.replace(/\*/g, "").trim().split(/\s+/).length;

// Kelime başına ~0.32 sn okuma süresi + giriş animasyonu payı
const readingFrames = (text: string, minSec: number, maxSec: number) =>
  Math.round(Math.min(maxSec, Math.max(minSec, 1.6 + countWords(text) * 0.32)) * FPS);

export const hookFrames = (hook: string) => readingFrames(hook, 3, 4.5);
export const sceneFrames = (text: string) => readingFrames(text, 3.5, 7.5);

// Her sekansın timeline'daki başlangıç karesi (geçişler sahneleri üst üste bindirir)
export const sequenceStarts = (props: ReelProps) => {
  const durations = [
    hookFrames(props.hook),
    ...props.scenes.map((s) => sceneFrames(s.text)),
    OUTRO_FRAMES,
  ];
  const starts: number[] = [];
  let cursor = 0;
  for (const d of durations) {
    starts.push(cursor);
    cursor += d - TRANSITION_FRAMES;
  }
  return { durations, starts, total: cursor + TRANSITION_FRAMES };
};
