import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { SceneBackground } from "../components/SceneBackground";
import type { Category } from "../schema";
import { CATEGORY_THEME } from "../theme";

type Props = {
  category: Category;
  question: string;
  handle?: string;
  image?: string;
  durationInFrames: number;
};

export const OutroScene: React.FC<Props> = ({ category, question, handle, image, durationInFrames }) => {
  const frame = useCurrentFrame();
  const theme = CATEGORY_THEME[category];

  return (
    <AbsoluteFill>
      <SceneBackground
        image={image}
        accent={theme.accent}
        bgFrom={theme.bgFrom}
        bgTo={theme.bgTo}
        durationInFrames={durationInFrames}
        variant={7}
        darken={0.6}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 110px",
          gap: 56,
          textAlign: "center",
        }}
      >
        <AnimatedText text={question} accent={theme.accent} fontSize={88} fontWeight={900} align="center" delay={4} />
        <div
          style={{
            fontSize: 46,
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            opacity: interpolate(frame, [22, 34], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Cevabını yorumlara yaz
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
            opacity: interpolate(frame, [34, 46], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [34, 50], ["0px 40px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <div
            style={{
              backgroundColor: theme.accent,
              color: "#0b0b0b",
              fontSize: 52,
              fontWeight: 900,
              letterSpacing: "0.08em",
              padding: "24px 64px",
              borderRadius: 999,
              boxShadow: `0 0 60px ${theme.accent}66`,
              scale: 1 + 0.04 * Math.sin(Math.max(0, frame - 50) / 5),
            }}
          >
            TAKİP ET
          </div>
          <div style={{ fontSize: 44, fontWeight: 600, color: "white" }}>
            Her gün 1 şaşırtıcı gerçek
          </div>
          {handle ? (
            <div style={{ fontSize: 44, fontWeight: 800, color: theme.accent }}>@{handle}</div>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
