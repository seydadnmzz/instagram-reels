import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame } from "remotion";
import { resolveSrc } from "../theme";

type Props = {
  image?: string;
  accent: string;
  bgFrom: string;
  bgTo: string;
  durationInFrames: number;
  // Sahneden sahneye kamera hareketinin yönünü değiştirir
  variant: number;
  darken?: number;
};

export const SceneBackground: React.FC<Props> = ({
  image,
  accent,
  bgFrom,
  bgTo,
  durationInFrames,
  variant,
  darken = 0.35,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 0, 0.67, 1),
  });
  const zoomIn = variant % 2 === 0;
  const drift = variant % 3 === 0 ? -40 : variant % 3 === 1 ? 40 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: bgTo }}>
      {image ? (
        <Img
          name="Background image"
          src={resolveSrc(image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: zoomIn ? 1.05 + progress * 0.17 : 1.22 - progress * 0.17,
            translate: `${drift * progress}px ${-30 * progress}px`,
            filter: "saturate(0.85) contrast(1.08)",
          }}
        />
      ) : (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at ${30 + progress * 40}% ${35 + progress * 20}%, ${bgFrom} 0%, ${bgTo} 70%)`,
          }}
        >
          <AbsoluteFill
            style={{
              background: `radial-gradient(circle at ${80 - progress * 50}% 75%, ${accent}22 0%, transparent 45%)`,
            }}
          />
        </AbsoluteFill>
      )}
      {/* Okunabilirlik için karartma, alt gradyan ve vinyet */}
      <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${darken})` }} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.82) 72%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
