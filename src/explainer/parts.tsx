import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useAppear } from "../kit/anim";
import type { CaptionWord, Theme } from "./schema";
import { INK, RED, THEMES, uiFont, YELLOW } from "./theme";

// "*vurgulu*" işaretlerini parçalara ayırır; vurgudan sonra gelen noktalama
// ("*duruyor*?") ayrı bir parça olarak boşlukla ayrılmasın diye öncekine eklenir
const splitHighlights = (text: string) => {
  const parts: { text: string; highlight: boolean; tail: string }[] = [];
  for (const m of text.matchAll(/\*([^*]+)\*|([^*]+)/g)) {
    const raw = m[1] ?? m[2];
    const punct = raw.match(/^[.,!?:;…]+/);
    if (punct && parts.length && m[1] === undefined) {
      parts[parts.length - 1].tail += punct[0];
      const rest = raw.slice(punct[0].length);
      if (rest.trim()) parts.push({ text: rest, highlight: false, tail: "" });
    } else {
      parts.push({ text: raw, highlight: m[1] !== undefined, tail: "" });
    }
  }
  return parts;
};

export const Background: React.FC<{ theme: Theme }> = ({ theme }) => (
  <AbsoluteFill style={{ backgroundColor: THEMES[theme].bg }}>
    {theme === "lab" ? (
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.045) 2px, transparent 2px)",
          backgroundSize: "64px 64px",
        }}
      />
    ) : (
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 6px, rgba(0,0,0,0.06) 6px, rgba(0,0,0,0.06) 14px)",
        }}
      />
    )}
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)" }} />
  </AbsoluteFill>
);

export const Headline: React.FC<{ text: string }> = ({ text }) => {
  const appear = useAppear(0, 12);
  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 70,
        right: 70,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 14,
        fontFamily: uiFont,
        fontWeight: 800,
        fontSize: 66,
        lineHeight: 1.15,
        color: "white",
        scale: interpolate(appear, [0, 1], [0.85, 1]),
        opacity: Math.min(1, appear * 1.4),
      }}
    >
      {splitHighlights(text).map((p, i) =>
        p.highlight ? (
          <span key={i} style={{ whiteSpace: "nowrap" }}>
            <span
              style={{ backgroundColor: YELLOW, color: INK, padding: "0 16px", borderRadius: 12, boxShadow: "0 6px 0 rgba(0,0,0,0.25)" }}
            >
              {p.text.trim()}
            </span>
            {p.tail}
          </span>
        ) : (
          <span key={i} style={{ textShadow: "0 4px 18px rgba(0,0,0,0.5)" }}>
            {p.text.trim()}
            {p.tail}
          </span>
        ),
      )}
    </div>
  );
};

export const Tag: React.FC<{ text: string }> = ({ text }) => {
  const appear = useAppear(6, 14);
  return (
    <div style={{ position: "absolute", top: 410, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          backgroundColor: RED,
          color: "white",
          fontFamily: uiFont,
          fontWeight: 800,
          fontSize: 40,
          padding: "10px 30px",
          borderRadius: 16,
          border: "4px solid #8e1d22",
          rotate: "-3deg",
          scale: appear,
          boxShadow: "0 8px 0 rgba(0,0,0,0.3)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const STAGE = { top: 520, left: 60, width: 960, height: 598 };

// Çizimin durduğu çerçeveli kart; panel=false ise yalnızca SVG alanı
export const Stage: React.FC<{ theme: Theme; panel: boolean; children: React.ReactNode }> = ({ theme, panel, children }) => {
  const t = THEMES[theme];
  const appear = useAppear(0, 10);
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
        opacity: Math.min(1, appear * 2),
        scale: interpolate(appear, [0, 1], [0.96, 1]),
      }}
    >
      {panel ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: t.panelFill,
            border: `16px solid ${t.panelBorder}`,
            borderRadius: theme === "lab" ? 8 : 18,
            boxShadow: `inset 0 0 0 4px ${t.panelInner}, 0 24px 50px rgba(0,0,0,0.45)`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {theme === "parchment" ? (
            <div style={{ position: "absolute", inset: 14, border: `3px solid ${t.panelInner}`, borderRadius: 8, pointerEvents: "none" }} />
          ) : null}
          {svg}
        </div>
      ) : (
        svg
      )}
    </div>
  );
};

type Chunk = { words: CaptionWord[]; start: number; end: number };

// Kelimeleri 1–3 kelimelik, noktalamada bölünen altyazı parçalarına ayırır
const toChunks = (words: CaptionWord[]): Chunk[] => {
  const chunks: Chunk[] = [];
  let current: CaptionWord[] = [];
  const flush = () => {
    if (current.length) chunks.push({ words: current, start: current[0].start, end: current[current.length - 1].end });
    current = [];
  };
  for (const w of words) {
    current.push(w);
    if (current.length >= 3 || /[.,!?:;]$/.test(w.text)) flush();
  }
  flush();
  return chunks;
};

export const Captions: React.FC<{ words: CaptionWord[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const chunks = toChunks(words);
  const index = chunks.findIndex((c, i) => t >= c.start && t < (chunks[i + 1]?.start ?? c.end + 0.6));
  if (index < 0) return null;
  const chunk = chunks[index];
  const local = (t - chunk.start) * fps;
  const pop = interpolate(local, [0, 6], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 1.4, 0.4, 1),
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 1300,
        left: 130,
        right: 130,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        columnGap: 18,
        fontFamily: uiFont,
        fontWeight: 800,
        fontSize: 70,
        lineHeight: 1.15,
        textAlign: "center",
        scale: pop,
      }}
    >
      {chunk.words.map((w, i) => (
        <span
          key={i}
          style={{
            color: w.highlight ? YELLOW : "white",
            textShadow: "0 0 26px rgba(0,0,0,0.9), 0 4px 0 rgba(0,0,0,0.35)",
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
};
