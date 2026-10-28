// Renkli görünüm (mor / turkuaz / turuncu / pembe): degrade zemin, yüzen şekiller,
// beyaz yuvarlak kart, beyaz başlık etiketi, konturlu altyazı ve üstte ilerleme çubuğu.
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useAppear } from "../kit/anim";
import { splitHighlights, STAGE, toChunks } from "./parts";
import type { CaptionWord } from "./schema";
import { INK, POP_THEMES, uiFont } from "./theme";

type PopTheme = keyof typeof POP_THEMES;

const BLOBS = [
  { x: 120, y: 260, r: 150, speed: 0.6, shape: "circle" },
  { x: 940, y: 520, r: 110, speed: 0.9, shape: "ring" },
  { x: 860, y: 1250, r: 170, speed: 0.5, shape: "circle" },
  { x: 160, y: 1500, r: 90, speed: 1.1, shape: "ring" },
  { x: 540, y: 1780, r: 130, speed: 0.7, shape: "circle" },
  { x: 980, y: 1700, r: 60, speed: 1.3, shape: "ring" },
] as const;

export const PopBackground: React.FC<{ theme: PopTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const t = POP_THEMES[theme];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(165deg, ${t.top} 0%, ${t.bottom} 100%)` }}>
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 3px, transparent 3px)",
          backgroundSize: "54px 54px",
          backgroundPosition: `${(frame * 0.4) % 54}px ${(frame * 0.4) % 54}px`,
        }}
      />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {BLOBS.map((b, i) => {
          const dx = Math.sin((frame / 90) * b.speed + i) * 30;
          const dy = Math.cos((frame / 110) * b.speed + i * 2) * 40;
          return b.shape === "circle" ? (
            <circle key={i} cx={b.x + dx} cy={b.y + dy} r={b.r} fill="rgba(255,255,255,0.10)" />
          ) : (
            <circle key={i} cx={b.x + dx} cy={b.y + dy} r={b.r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={14} />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const ProgressBar: React.FC<{ theme: PopTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 130, left: 100, right: 100, height: 16, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.28)" }}>
      <div
        style={{
          width: `${(frame / (durationInFrames - 1)) * 100}%`,
          height: "100%",
          borderRadius: 8,
          backgroundColor: POP_THEMES[theme].accent,
          boxShadow: "0 0 18px rgba(255,255,255,0.5)",
        }}
      />
    </div>
  );
};

export const PopHeadline: React.FC<{ text: string; theme: PopTheme }> = ({ text, theme }) => {
  const appear = useAppear(0, 12);
  const t = POP_THEMES[theme];
  return (
    <div style={{ position: "absolute", top: 215, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 14,
          backgroundColor: "white",
          color: INK,
          padding: "18px 40px 22px",
          borderRadius: 30,
          boxShadow: "0 12px 0 rgba(0,0,0,0.18)",
          fontFamily: uiFont,
          fontWeight: 800,
          fontSize: 64,
          lineHeight: 1.15,
          rotate: "-2deg",
          scale: interpolate(appear, [0, 1], [0.6, 1]),
          opacity: Math.min(1, appear * 1.5),
        }}
      >
        {splitHighlights(text).map((p, i) => (
          <span key={i} style={{ whiteSpace: "nowrap" }}>
            <span
              style={
                p.highlight
                  ? { color: t.ink, backgroundImage: `linear-gradient(transparent 58%, ${t.accent} 58%)`, padding: "0 6px" }
                  : undefined
              }
            >
              {p.text.trim()}
            </span>
            {p.tail}
          </span>
        ))}
      </div>
    </div>
  );
};

export const PopTag: React.FC<{ text: string; theme: PopTheme }> = ({ text, theme }) => {
  const appear = useAppear(6, 14);
  return (
    <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          backgroundColor: INK,
          color: POP_THEMES[theme].accent,
          fontFamily: uiFont,
          fontWeight: 800,
          fontSize: 38,
          letterSpacing: 1,
          padding: "10px 30px",
          borderRadius: 999,
          rotate: "2deg",
          scale: appear,
          boxShadow: "0 8px 0 rgba(0,0,0,0.2)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

// Çizimin durduğu beyaz yuvarlak kart; sağdan kayarak gelir ve hafifçe süzülür
export const PopStage: React.FC<{ panel: boolean; children: React.ReactNode }> = ({ panel, children }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(0, 14);
  const float = Math.sin(frame / 25) * 6;
  const svg = (
    <svg viewBox="0 0 900 560" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ overflow: "visible" }}>
      {children}
    </svg>
  );
  return (
    <div
      style={{
        position: "absolute",
        ...STAGE,
        top: STAGE.top + 10,
        translate: `${interpolate(appear, [0, 1], [140, 0])}px ${float}px`,
        rotate: `${interpolate(appear, [0, 1], [4, 0])}deg`,
        opacity: Math.min(1, appear * 2),
      }}
    >
      {panel ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 48,
            border: "14px solid white",
            backgroundColor: "white",
            boxShadow: "0 30px 60px rgba(0,0,0,0.28)",
            overflow: "hidden",
          }}
        >
          {svg}
        </div>
      ) : (
        svg
      )}
    </div>
  );
};

const OUTLINE_SHADOW = [
  [6, 0],
  [-6, 0],
  [0, 6],
  [0, -6],
  [4, 4],
  [-4, 4],
  [4, -4],
  [-4, -4],
]
  .map(([x, y]) => `${x}px ${y}px 0 ${INK}`)
  .concat("0 10px 0 rgba(0,0,0,0.35)")
  .join(", ");

export const PopCaptions: React.FC<{ words: CaptionWord[]; theme: PopTheme }> = ({ words, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const chunks = toChunks(words);
  const index = chunks.findIndex((c, i) => t >= c.start && t < (chunks[i + 1]?.start ?? c.end + 0.6));
  if (index < 0) return null;
  const chunk = chunks[index];
  const local = (t - chunk.start) * fps;
  const pop = interpolate(local, [0, 5], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 1.6, 0.4, 1),
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 1290,
        left: 110,
        right: 110,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        columnGap: 20,
        fontFamily: uiFont,
        fontWeight: 800,
        fontSize: 78,
        lineHeight: 1.2,
        textAlign: "center",
        textTransform: "uppercase",
        scale: pop,
      }}
    >
      {chunk.words.map((w, i) => {
        return (
          <span
            key={i}
            style={{
              color: w.highlight ? POP_THEMES[theme].accent : "white",
              textShadow: OUTLINE_SHADOW,
              display: "inline-block",
              rotate: w.highlight ? "-3deg" : undefined,
            }}
          >
            {w.text.toLocaleUpperCase("tr-TR")}
          </span>
        );
      })}
    </div>
  );
};
