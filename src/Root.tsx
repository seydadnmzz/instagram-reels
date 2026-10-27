import { Composition } from "remotion";
import { calculateReelMetadata, Reel } from "./Reel";
import { reelSchema } from "./schema";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Reel"
      component={Reel}
      schema={reelSchema}
      calculateMetadata={calculateReelMetadata}
      durationInFrames={600}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        category: "bilim",
        hook: "Bal *binlerce yıl* bozulmadan kalabilir.",
        scenes: [
          { text: "Arkeologlar Mısır mezarlarında *3000 yıllık* bal buldu." },
          { text: "Ve bal hâlâ *yenilebilir* durumdaydı." },
        ],
        question: "Sen bunu biliyor muydun?",
      }}
    />
  );
};
