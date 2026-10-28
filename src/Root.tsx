import { Composition } from "remotion";
import { Cover, coverSchema } from "./explainer/Cover";
import { calculateExplainerMetadata, Explainer } from "./explainer/Explainer";
import { explainerSchema } from "./explainer/schema";
import { calculateReelMetadata, Reel } from "./Reel";
import { reelSchema } from "./schema";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Günlük rutinin kullandığı animasyonlu anlatım şablonu */}
      <Composition
        id="Explainer"
        component={Explainer}
        schema={explainerSchema}
        calculateMetadata={calculateExplainerMetadata}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          theme: "lab",
          scenes: [{ headline: "Üç *kalp*", visual: "OctopusHearts", startFrame: 0, durationInFrames: 300 }],
          words: [],
          durationInFrames: 300,
        }}
      />
      {/* Reels/Shorts kapağı: npx remotion still Cover ... --frame=80 */}
      <Composition
        id="Cover"
        component={Cover}
        schema={coverSchema}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ theme: "mor", kicker: "BENDE DE OLUYOR!", title: "Dilimin *ucunda*!", question: "NEDEN?", visual: "StuckWord" }}
      />
      {/* İlk sürümdeki fotoğraflı şablon */}
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
    </>
  );
};
