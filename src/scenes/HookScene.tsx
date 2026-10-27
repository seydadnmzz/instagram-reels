import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { SceneBackground } from "../components/SceneBackground";
import type { Category } from "../schema";
import { CATEGORY_THEME } from "../theme";

type Props = {
  category: Category;
  hook: string;
  image?: string;
  durationInFrames: number;
};

export const HookScene: React.FC<Props> = ({ category, hook, image, durationInFrames }) => {
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
        variant={0}
        darken={0.45}
      />
      {/* Açılıştaki beyaz flaş, ilk karede dikkat çeker */}
      <AbsoluteFill
        style={{
          backgroundColor: "white",
          opacity: interpolate(frame, [0, 6], [0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: "0 150px 0 80px",
          gap: 44,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            backgroundColor: theme.accent,
            color: "#0b0b0b",
            fontSize: 40,
            fontWeight: 900,
            letterSpacing: "0.14em",
            padding: "14px 30px",
            borderRadius: 999,
            opacity: interpolate(frame, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [0, 12], ["-60px 0px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          {theme.label}
        </div>
        <div
          style={{
            scale: interpolate(frame, [0, 18], [1.12, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            transformOrigin: "left center",
          }}
        >
          <AnimatedText text={hook} accent={theme.accent} fontSize={104} fontWeight={900} delay={3} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
