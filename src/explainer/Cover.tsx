// Reels/Shorts kapağı. Önemli her şey ortadaki 1080×1440 alanda durur (profil ızgarası 3:4 kırpar).
// Çizim animasyonlu olduğundan kapak, öğelerin yerleştiği bir karede alınır (--frame=80).
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { visuals } from "../episodes/current";
import { PopBackground } from "./pop";
import { splitHighlights, STAGE } from "./parts";
import { themeSchema } from "./schema";
import { INK, isPop, POP_THEMES, uiFont } from "./theme";

export const coverSchema = z.object({
  theme: themeSchema,
  kicker: z.string(),
  title: z.string(),
  question: z.string(),
  visual: z.string(),
});

export const Cover: React.FC<z.infer<typeof coverSchema>> = ({ theme, kicker, title, question, visual }) => {
  const pop = isPop(theme) ? theme : "mor";
  const t = POP_THEMES[pop];
  const Visual = visuals[visual];
  return (
    <AbsoluteFill>
      <PopBackground theme={pop} />
      <div style={{ position: "absolute", top: 290, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundColor: INK,
            color: t.accent,
            fontFamily: uiFont,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: 2,
            padding: "12px 36px",
            borderRadius: 999,
            rotate: "-3deg",
          }}
        >
          {kicker}
        </div>
      </div>
      <div style={{ position: "absolute", top: 390, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: 22,
            backgroundColor: "white",
            color: INK,
            padding: "22px 44px 28px",
            borderRadius: 36,
            boxShadow: "0 14px 0 rgba(0,0,0,0.18)",
            fontFamily: uiFont,
            fontWeight: 800,
            fontSize: 104,
            lineHeight: 1.1,
            textAlign: "center",
            rotate: "-2deg",
          }}
        >
          {splitHighlights(title).map((p, i) => (
            <span key={i} style={{ whiteSpace: "nowrap" }}>
              <span
                style={
                  p.highlight
                    ? { color: t.ink, backgroundImage: `linear-gradient(transparent 58%, ${t.accent} 58%)`, padding: "0 8px" }
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
      <div
        style={{
          position: "absolute",
          ...STAGE,
          top: 700,
          borderRadius: 48,
          border: "14px solid white",
          backgroundColor: "white",
          boxShadow: "0 30px 60px rgba(0,0,0,0.28)",
          overflow: "hidden",
        }}
      >
        <svg viewBox="0 0 900 560" width="100%" height="100%">
          {Visual ? <Visual durationInFrames={90} /> : null}
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1325,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: uiFont,
          fontWeight: 800,
          fontSize: 170,
          color: t.accent,
          rotate: "-4deg",
          textShadow: `8px 0 0 ${INK}, -8px 0 0 ${INK}, 0 8px 0 ${INK}, 0 -8px 0 ${INK}, 6px 6px 0 ${INK}, -6px 6px 0 ${INK}, 6px -6px 0 ${INK}, -6px -6px 0 ${INK}, 0 16px 0 rgba(0,0,0,0.35)`,
        }}
      >
        {question}
      </div>
    </AbsoluteFill>
  );
};
