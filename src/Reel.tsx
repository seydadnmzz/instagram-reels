import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Fragment } from "react";
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ReelProps } from "./schema";
import { FactScene } from "./scenes/FactScene";
import { HookScene } from "./scenes/HookScene";
import { OutroScene } from "./scenes/OutroScene";
import { CATEGORY_THEME, fontFamily } from "./theme";
import { sequenceStarts, TRANSITION_FRAMES } from "./timing";

export const calculateReelMetadata: CalculateMetadataFunction<ReelProps> = ({ props }) => ({
  durationInFrames: sequenceStarts(props).total,
});

export const Reel: React.FC<ReelProps> = (props) => {
  const { category, hook, hookImage, scenes, question, handle } = props;
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { durations, starts } = sequenceStarts(props);
  const theme = CATEGORY_THEME[category];
  const outroIndex = scenes.length + 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "black", fontFamily }}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={durations[0]}>
          <HookScene category={category} hook={hook} image={hookImage} durationInFrames={durations[0]} />
        </TransitionSeries.Sequence>
        {scenes.map((scene, i) => (
          <Fragment key={i}>
            <TransitionSeries.Transition
              presentation={i % 2 === 0 ? slide({ direction: "from-right" }) : fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />
            <TransitionSeries.Sequence name={`Fact ${i + 1}`} durationInFrames={durations[i + 1]}>
              <FactScene
                category={category}
                text={scene.text}
                image={scene.image}
                index={i}
                durationInFrames={durations[i + 1]}
              />
            </TransitionSeries.Sequence>
          </Fragment>
        ))}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence name="Outro" durationInFrames={durations[outroIndex]}>
          <OutroScene
            category={category}
            question={question}
            handle={handle}
            image={hookImage}
            durationInFrames={durations[outroIndex]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Audio
        name="Music"
        src={staticFile("music/ambient.mp3")}
        loop
        loopVolumeCurveBehavior="extend"
        volume={(f) =>
          interpolate(f, [0, 10, durationInFrames - 30, durationInFrames], [0, 0.45, 0.45, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {starts.slice(1).map((start, i) => (
        <Sequence key={i} name={`Whoosh ${i + 1}`} from={start} layout="none">
          <Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} />
        </Sequence>
      ))}
      <Sequence name="Outro ding" from={starts[outroIndex] + 34} layout="none">
        <Audio src={staticFile("sfx/ding.wav")} volume={0.4} />
      </Sequence>

      {/* İzleyiciyi sona kadar tutmak için ilerleme çubuğu */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 10,
            width: `${(frame / (durationInFrames - 1)) * 100}%`,
            backgroundColor: theme.accent,
            boxShadow: `0 0 18px ${theme.accent}`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
