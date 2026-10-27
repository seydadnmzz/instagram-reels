import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Word = { word: string; highlight: boolean };

// "*vurgulu kısım*" işaretlerini kelime listesine çevirir
const parseWords = (text: string): Word[] => {
  const words: Word[] = [];
  for (const match of text.matchAll(/\*([^*]+)\*|([^*]+)/g)) {
    const highlight = match[1] !== undefined;
    for (const word of (match[1] ?? match[2]).split(/\s+/)) {
      if (word) words.push({ word, highlight });
    }
  }
  return words;
};

type Props = {
  text: string;
  accent: string;
  fontSize: number;
  fontWeight?: number;
  delay?: number;
  stagger?: number;
  align?: "left" | "center";
};

export const AnimatedText: React.FC<Props> = ({
  text,
  accent,
  fontSize,
  fontWeight = 800,
  delay = 0,
  stagger = 2,
  align = "left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        columnGap: fontSize * 0.26,
        rowGap: fontSize * 0.08,
        fontSize,
        fontWeight,
        lineHeight: 1.12,
        letterSpacing: "-0.01em",
      }}
    >
      {parseWords(text).map((w, i) => {
        const start = delay + i * stagger;
        const appear = spring({
          frame: frame - start,
          fps,
          config: { damping: 200 },
          durationInFrames: 14,
        });
        const marker = interpolate(frame, [start + 10, start + 22], [0, 100], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: appear,
              translate: `0px ${(1 - appear) * fontSize * 0.45}px`,
              color: w.highlight ? accent : "white",
              textShadow: "0 4px 28px rgba(0,0,0,0.65)",
              backgroundImage: w.highlight
                ? `linear-gradient(${accent}40, ${accent}40)`
                : undefined,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 92%",
              backgroundSize: `${marker}% 30%`,
              padding: w.highlight ? "0 6px" : undefined,
              margin: w.highlight ? "0 -6px" : undefined,
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
};
