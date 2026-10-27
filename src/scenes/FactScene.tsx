import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { SceneBackground } from "../components/SceneBackground";
import type { Category } from "../schema";
import { CATEGORY_THEME } from "../theme";

type Props = {
  category: Category;
  text: string;
  image?: string;
  index: number;
  durationInFrames: number;
};

export const FactScene: React.FC<Props> = ({ category, text, image, index, durationInFrames }) => {
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
        variant={index + 1}
      />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: "0 150px 430px 80px",
          gap: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: interpolate(frame, [4, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: theme.accent,
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 3,
              backgroundColor: theme.accent,
              width: interpolate(frame, [6, 24], [0, 140], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          />
        </div>
        <AnimatedText text={text} accent={theme.accent} fontSize={74} delay={8} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
