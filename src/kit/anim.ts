import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// 0'dan 1'e yaylı giriş (hafif taşmalı, "pop" hissi verir)
export const useAppear = (delay = 0, durationInFrames = 16) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, durationInFrames, config: { damping: 12, mass: 0.6 } });
};

// Belirli kare aralığında doğrusal 0→1 ilerleme
export const useProgress = (from: number, to: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], clamp);
};

// Sürekli salınım (yüzme, nefes alma, sallanma için)
export const useWave = (periodFrames = 60, amplitude = 1, phase = 0) => {
  const frame = useCurrentFrame();
  return Math.sin(((frame + phase) / periodFrames) * Math.PI * 2) * amplitude;
};

// SVG grubunu verilen merkez etrafında ölçekleyip konumlar
export const place = (x: number, y: number, scale = 1, rotate = 0) =>
  `translate(${x} ${y}) rotate(${rotate}) scale(${scale})`;
