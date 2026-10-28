import { Audio } from "@remotion/media";
import { AbsoluteFill, CalculateMetadataFunction, interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import { visuals } from "../episodes/current";
import { BigText } from "../kit/Objects";
import { Background, Captions, Headline, Stage, Tag } from "./parts";
import { PopBackground, PopCaptions, PopHeadline, PopStage, PopTag, ProgressBar } from "./pop";
import type { ExplainerProps } from "./schema";
import { isPop } from "./theme";

export const calculateExplainerMetadata: CalculateMetadataFunction<ExplainerProps> = ({ props }) => ({
  durationInFrames: props.durationInFrames,
});

const MissingVisual: React.FC<{ name: string }> = ({ name }) => (
  <>
    <BigText x={450} y={250} text="?" size={200} />
    <text x={450} y={430} textAnchor="middle" fontSize={28} fill="#888">
      {name}
    </text>
  </>
);

export const Explainer: React.FC<ExplainerProps> = ({ theme, scenes, words, narration }) => {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill>
      {isPop(theme) ? <PopBackground theme={theme} /> : <Background theme={theme} />}
      {isPop(theme) ? <ProgressBar theme={theme} /> : null}
      {scenes.map((scene, i) => {
        const Visual = visuals[scene.visual];
        const drawing = Visual ? <Visual durationInFrames={scene.durationInFrames} /> : <MissingVisual name={scene.visual} />;
        return (
          <Sequence key={i} name={`Sahne ${i + 1}: ${scene.visual}`} from={scene.startFrame} durationInFrames={scene.durationInFrames}>
            {isPop(theme) ? (
              <>
                <PopStage panel={scene.panel ?? true}>{drawing}</PopStage>
                <PopHeadline text={scene.headline} theme={theme} />
                {scene.tag ? <PopTag text={scene.tag} theme={theme} /> : null}
              </>
            ) : (
              <>
                <Headline text={scene.headline} />
                {scene.tag ? <Tag text={scene.tag} /> : null}
                <Stage theme={theme} panel={scene.panel ?? true}>
                  {drawing}
                </Stage>
              </>
            )}
          </Sequence>
        );
      })}
      {isPop(theme) ? <PopCaptions words={words} theme={theme} /> : <Captions words={words} />}

      {narration ? <Audio name="Seslendirme" src={staticFile(narration)} /> : null}
      <Audio
        name="Müzik"
        src={staticFile("music/ambient.mp3")}
        loop
        loopVolumeCurveBehavior="extend"
        volume={(f) =>
          interpolate(f, [0, 10, durationInFrames - 30, durationInFrames], [0, 0.1, 0.1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {scenes.slice(1).map((scene, i) => (
        <Sequence key={i} name={`Geçiş ${i + 1}`} from={scene.startFrame} layout="none">
          <Audio src={staticFile("sfx/whoosh.wav")} volume={0.18} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
