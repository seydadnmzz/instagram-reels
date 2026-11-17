// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Fotoğrafta kendini tuhaf bulmak / ayna görüntüsü ve yalın maruz kalma (2026-11-17-sabah)
import { useCurrentFrame } from "remotion";
import { Arrow, Chip, Heart, INK, place, QuestionMark, Sparkles, uiFont, useAppear, useProgress, useWave } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff0f4";
const SKIN = "#f2c79a";
const PINK = "#ff5c8a";
const PURPLE = "#8a6cf0";
const TEAL = "#17c3a5";
const ORANGE = "#ff9a3d";
const BLUE = "#3d8bfd";
const HAIR = "#4a2f1d";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

type Mood = "calm" | "happy" | "wow" | "meh" | "love";

// Yüz: (0,0) kafa merkezi, yarıçap 70. Saç ayrımı ve ben (mole) asimetrik → ayna çevirince yer değiştirir.
const Face: React.FC<{
  x: number;
  y: number;
  scale?: number;
  mood?: Mood;
  flip?: boolean;
  nose?: number;
  glow?: boolean;
  hair?: string;
  delay?: number;
}> = ({ x, y, scale = 1, mood = "calm", flip = false, nose = 1, glow = false, hair = HAIR, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const blink = frame % 90 > 85 ? 0.15 : 1;
  return (
    <g transform={`${place(x, y, scale * a)} scale(${flip ? -1 : 1} 1)`}>
      {glow ? <circle r={92} fill="#fff6a8" opacity={0.7} /> : null}
      <circle r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      {/* yana taranmış saç: sol tarafta kabarık */}
      <path
        d="M -72 -4 Q -80 -84 -6 -80 Q 64 -82 72 -14 Q 50 -50 10 -46 Q -20 -44 -34 -60 Q -46 -30 -72 -4 Z"
        fill={hair}
        stroke={OUTLINE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {/* kaşlar: sağ kaş biraz yukarıda */}
      <path d="M -40 -24 L -14 -26" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <path d="M 14 -32 L 40 -28" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      {mood === "wow" ? (
        <g>
          <circle cx={-26} cy={-6} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={26} cy={-6} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={-26} cy={-4} r={6} fill={OUTLINE} />
          <circle cx={26} cy={-4} r={6} fill={OUTLINE} />
        </g>
      ) : mood === "love" ? (
        <g>
          <Heart x={-26} y={-6} size={0.2} color={PINK} />
          <Heart x={26} y={-6} size={0.2} color={PINK} />
        </g>
      ) : (
        <g transform={`translate(0 ${-6 * (1 - blink)}) scale(1 ${blink})`}>
          <circle cx={-26} cy={-6} r={8} fill={OUTLINE} />
          <circle cx={26} cy={-6} r={8} fill={OUTLINE} />
        </g>
      )}
      {/* burun */}
      <g transform={`translate(0 14) scale(${nose} ${0.8 + nose * 0.2})`}>
        <path d="M -12 -4 Q -16 10 0 12 Q 16 10 12 -4" fill={nose > 1.05 ? "#eeb487" : "none"} stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      </g>
      {/* ağız (hafif çarpık) */}
      {mood === "happy" || mood === "love" ? (
        <path d="M -26 34 Q 2 62 28 30 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      ) : mood === "wow" ? (
        <ellipse cx={2} cy={42} rx={11} ry={14} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
      ) : mood === "meh" ? (
        <path d="M -20 44 Q 0 34 22 40" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      ) : (
        <path d="M -20 38 Q 2 50 22 34" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      )}
      {/* ben */}
      <circle cx={-40} cy={26} r={5} fill="#6b3f26" />
      <circle cx={-48} cy={14} r={9} fill="#f59ab0" opacity={0.6} />
      <circle cx={48} cy={14} r={9} fill="#f59ab0" opacity={0.6} />
    </g>
  );
};

// Gövde (omuzlar) + yüz; (x,y) gövdenin alt ortası
const Bust: React.FC<{ x: number; y: number; scale?: number; shirt?: string; mood?: Mood; hair?: string; flip?: boolean; delay?: number }> = ({
  x,
  y,
  scale = 1,
  shirt = PINK,
  mood = "calm",
  hair = HAIR,
  flip = false,
  delay = 0,
}) => {
  const a = useAppear(delay);
  const sway = useWave(70, 2);
  return (
    <g transform={place(x, y, scale * a, sway)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <Face x={0} y={-200} mood={mood} hair={hair} flip={flip} />
    </g>
  );
};

// Fotoğraf çerçevesi (polaroid) içinde yüz
const Photo: React.FC<{ x: number; y: number; label: string; flip?: boolean; mood?: Mood; scale?: number; delay?: number; check?: boolean; tilt?: number; hl?: string }> = ({
  x,
  y,
  label,
  flip = false,
  mood = "calm",
  scale = 1,
  delay = 0,
  check = false,
  tilt = 0,
  hl,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a, tilt)}>
      <rect x={-110} y={-130} width={220} height={260} rx={10} fill="#fff" stroke={hl ?? OUTLINE} strokeWidth={hl ? 10 : 6} />
      <rect x={-92} y={-112} width={184} height={176} fill="#ffd9e4" stroke={OUTLINE} strokeWidth={4} />
      <g transform="translate(0 -18)">
        <Face x={0} y={0} scale={0.95} flip={flip} mood={mood} />
      </g>
      <text y={106} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK}>
        {label}
      </text>
      {check ? (
        <g transform="translate(90 -120)">
          <circle r={30} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
          <path d="M -13 0 L -3 11 L 15 -11" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
};

// Telefon; (x,y) merkez, ekranda içerik
const Phone: React.FC<{ x: number; y: number; scale?: number; tilt?: number; children?: React.ReactNode }> = ({ x, y, scale = 1, tilt = 0, children }) => (
  <g transform={place(x, y, scale, tilt)}>
    <rect x={-80} y={-150} width={160} height={300} rx={24} fill="#333" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-66} y={-126} width={132} height={250} rx={10} fill="#ffe3ec" />
    <circle cx={0} cy={-138} r={5} fill="#777" />
    {children}
  </g>
);

const Mirror: React.FC<{ x: number; y: number; scale?: number; children?: React.ReactNode }> = ({ x, y, scale = 1, children }) => {
  const frame = useCurrentFrame();
  const shine = ((frame * 4) % 400) - 200;
  return (
    <g transform={place(x, y, scale)}>
      <ellipse rx={150} ry={200} fill="#c98a4b" stroke={OUTLINE} strokeWidth={7} />
      <clipPath id={`mclip-${x}-${y}`}>
        <ellipse rx={126} ry={176} />
      </clipPath>
      <ellipse rx={126} ry={176} fill="#d8f1ff" stroke={OUTLINE} strokeWidth={5} />
      <g clipPath={`url(#mclip-${x}-${y})`}>
        {children}
        <path d={`M ${shine - 40} -200 L ${shine} -200 L ${shine - 120} 200 L ${shine - 160} 200 Z`} fill="#fff" opacity={0.45} />
      </g>
    </g>
  );
};

// 1) Fotoğrafa bakıp şaşırmak
const SelfieShock: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const t = Math.round(durationInFrames * 0.35);
  const shocked = frame > t;
  const shake = shocked ? Math.sin(frame * 1.8) * 3 : 0;
  const pop = useAppear(t);
  return (
    <g>
      <Paper />
      <Bust x={300} y={560} scale={1.15} mood={shocked ? "wow" : "happy"} shirt={PURPLE} />
      <Phone x={640 + shake} y={290} scale={1} tilt={8}>
        <g transform="translate(0 -10)">
          <Face x={0} y={0} scale={0.75} mood="meh" flip nose={1.15} />
        </g>
        <circle cx={0} cy={100} r={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      </Phone>
      {shocked ? (
        <g>
          <text transform={place(470, 120, pop, -8)} fontFamily={uiFont} fontWeight={800} fontSize={90} textAnchor="middle" fill={PINK} stroke={OUTLINE} strokeWidth={5} paintOrder="stroke">
            ?!
          </text>
          <Chip x={640} y={500} text="BU BEN MİYİM?" dark delay={t + 6} />
        </g>
      ) : (
        <Chip x={640} y={500} text="ÇEK!" delay={4} />
      )}
      {frame < t && frame % 30 < 5 ? <rect width={900} height={560} fill="#fff" opacity={0.6} /> : null}
    </g>
  );
};

// 2) Aynada mutlu
const MirrorHappy: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.4);
  return (
    <g>
      <Paper />
      <rect y={470} width={900} height={90} fill="#ffd2df" stroke={OUTLINE} strokeWidth={5} />
      <Mirror x={600} y={270} scale={1.1}>
        <g transform="translate(0 190) scale(0.9)">
          <Bust x={0} y={0} mood="happy" shirt={PURPLE} flip />
        </g>
      </Mirror>
      <Bust x={220} y={560} scale={1} mood="happy" shirt={PURPLE} />
      <Heart x={790} y={110} size={0.55} color={PINK} beat delay={d} />
      <Heart x={420} y={90} size={0.4} color={PINK} beat delay={d + 8} />
      <Sparkles points={[[470, 200], [760, 420], [380, 380]]} />
      <QuestionMark x={420} y={250} size={70} delay={d + 14} />
    </g>
  );
};

// 3) Ayna ters gösterir: ben ve saç ayrımı yer değiştirir
const MirrorFlip: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const p = useProgress(d, d + 20);
  return (
    <g>
      <Paper />
      <Face x={220} y={230} scale={1.6} mood="calm" delay={2} />
      <Mirror x={680} y={240} scale={0.95}>
        <Face x={0} y={-10} scale={1.5} mood="calm" flip />
      </Mirror>
      <circle cx={220 - 40 * 1.6} cy={230 + 26 * 1.6} r={24} fill="none" stroke={PINK} strokeWidth={6} opacity={p} />
      <circle cx={680 + 40 * 1.5 * 0.95} cy={240 + (-10 + 26 * 1.5) * 0.95} r={24} fill="none" stroke={PINK} strokeWidth={6} opacity={p} />
      <Arrow from={[380, 170]} to={[520, 170]} progress={p} color={PURPLE} />
      <Arrow from={[520, 300]} to={[380, 300]} progress={p} color={PURPLE} />
      <Chip x={220} y={480} text="SEN" delay={4} />
      <Chip x={680} y={490} text="AYNADA: TERS" dark delay={d} />
    </g>
  );
};

// 4) Yüz simetrik değil; fotoğraf başkalarının gördüğü yüz
const Asymmetry: Visual = ({ durationInFrames }) => {
  const draw = useProgress(4, Math.round(durationInFrames * 0.35));
  const d = Math.round(durationInFrames * 0.45);
  return (
    <g>
      <Paper />
      <Face x={250} y={250} scale={2} mood="calm" delay={0} />
      <line x1={250} y1={90} x2={250} y2={90 + 320 * draw} stroke={PINK} strokeWidth={6} strokeDasharray="18 12" />
      <Chip x={250} y={490} text="TAM SİMETRİK DEĞİL" delay={Math.round(durationInFrames * 0.25)} />
      <Photo x={680} y={240} label="FOTOĞRAF" delay={d} tilt={4} />
      <g transform={place(680, 470, useAppear(d + 10))}>
        <Face x={-90} y={0} scale={0.42} mood="happy" hair="#1f1f24" />
        <Face x={0} y={0} scale={0.42} mood="happy" hair="#c9822f" />
        <Face x={90} y={0} scale={0.42} mood="happy" hair="#7a3b2a" />
      </g>
    </g>
  );
};

// 5) Yalın maruz kalma: çok gördükçe sevmek
const Exposure: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const p = useProgress(4, durationInFrames * 0.75);
  const count = Math.round(p * 1000);
  const hs = 0.5 + p * 1.1;
  return (
    <g>
      <Paper />
      {[0, 1, 2, 3, 4].map((i) => {
        const on = p * 5 > i;
        return (
          <g key={i} transform={place(110 + i * 85, 150 + Math.sin(frame / 10 + i) * 6, on ? 0.5 : 0.001)}>
            <Mirror x={0} y={0} scale={0.6}>
              <Face x={0} y={0} scale={1.4} mood="happy" flip />
            </Mirror>
          </g>
        );
      })}
      <g transform={place(260, 360)}>
        <rect x={-150} y={-50} width={300} height={100} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text y={18} fontFamily={uiFont} fontWeight={800} fontSize={52} textAnchor="middle" fill={PURPLE}>
          {count} KEZ
        </text>
      </g>
      <Arrow from={[440, 300]} to={[580, 300]} progress={useProgress(10, 28)} color={INK} />
      <Heart x={720} y={290} size={hs} color={PINK} beat />
      <Chip x={600} y={490} text="TANIDIK = SEVİMLİ" dark delay={Math.round(durationInFrames * 0.4)} />
    </g>
  );
};

// 6) İki fotoğraf: düz ve ayna
const TwoPhotos: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const w = useWave(60, 3);
  return (
    <g>
      <Paper />
      <Photo x={270} y={250} label="DÜZ" delay={4} tilt={-4 + w} />
      <Photo x={630} y={250} label="AYNA" flip delay={d} tilt={4 - w} />
      <QuestionMark x={450} y={240} size={90} delay={d + 10} color={PURPLE} />
      <Chip x={450} y={490} text="HANGİSİ DAHA GÜZEL?" delay={d + 16} />
    </g>
  );
};

// 7) Sonuç: sen aynayı, arkadaşın düzü seçti
const Choices: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  return (
    <g>
      <Paper />
      <Bust x={150} y={290} scale={0.62} mood="happy" shirt={PURPLE} delay={2} />
      <Photo x={385} y={150} label="DÜZ" scale={0.55} delay={4} />
      <Photo x={585} y={150} label="AYNA" flip scale={0.55} delay={6} check hl={TEAL} />
      <Chip x={775} y={150} text="SEN" dark delay={8} />
      <Bust x={150} y={560} scale={0.62} mood="happy" shirt={ORANGE} hair="#c9822f" delay={d} />
      <Photo x={385} y={420} label="DÜZ" scale={0.55} delay={d + 2} check hl={TEAL} />
      <Photo x={585} y={420} label="AYNA" flip scale={0.55} delay={d + 4} />
      <Chip x={775} y={420} text="ARKADAŞ" dark delay={d + 6} />
    </g>
  );
};

// 8) Yakın çekim selfie burnu büyütür
const SelfieNose: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const p = useProgress(6, Math.round(durationInFrames * 0.55));
  const nose = 1 + p * 0.6;
  const d = Math.round(durationInFrames * 0.4);
  return (
    <g>
      <Paper />
      <g transform={place(230, 250)}>
        <Face x={0} y={0} scale={1.5} mood="calm" />
        <g transform={place(170 - p * 40, 10, 0.55, -6)}>
          <Phone x={0} y={0} />
        </g>
      </g>
      <Arrow from={[150, 450]} to={[350 - p * 60, 450]} progress={1} color={PURPLE} />
      <Chip x={250} y={510} text="30 CM" dark delay={4} />
      <Phone x={650} y={265} scale={1.15}>
        <Face x={0} y={-6} scale={0.85 + p * 0.1} mood="wow" nose={nose} flip />
      </Phone>
      {frame > d ? <Chip x={650} y={500} text="BURUN %30 GENİŞ" delay={d} /> : null}
      <Sparkles points={[[790, 140], [520, 120]]} />
    </g>
  );
};

// 9) Güzelleştirilmiş yüzü kendin sanmak
const Morph: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.45);
  const pick = useAppear(d);
  return (
    <g>
      <Paper />
      <g transform="translate(0 -10)">
        <g transform={place(170, 190, 0.8)}>
          <Face x={0} y={0} scale={1.2} mood="meh" nose={1.1} delay={2} />
        </g>
        <g transform={place(450, 190, 0.8)}>
          <Face x={0} y={0} scale={1.2} mood="calm" delay={6} />
        </g>
        <g transform={place(730, 190, 0.8)}>
          <Face x={0} y={0} scale={1.2} mood="happy" glow nose={0.9} delay={10} />
        </g>
      </g>
      <Chip x={170} y={330} text="DAHA AZ" delay={12} />
      <Chip x={450} y={330} text="GERÇEK" delay={16} />
      <Chip x={730} y={330} text="GÜZELLEŞMİŞ" delay={20} />
      <Sparkles points={[[650, 90], [820, 110], [800, 260]]} />
      <g transform={place(730, 470, pick)}>
        <path d="M -150 -36 L 150 -36 L 150 36 L 20 36 L 0 60 L -20 36 L -150 36 Z" transform="scale(1 -1)" fill={PINK} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <text y={14} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill="#fff">
          BU BENİM!
        </text>
      </g>
      <Arrow from={[730, 420]} to={[730, 380]} progress={pick} color={PINK} />
    </g>
  );
};

// 10) Sevdiklerin bu yüzü tanıyor
const Friends: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.4);
  return (
    <g>
      <Paper />
      <Photo x={450} y={220} label="SEN" mood="happy" delay={2} />
      <Bust x={150} y={560} scale={0.9} mood="love" shirt={ORANGE} hair="#c9822f" delay={6} />
      <Bust x={750} y={560} scale={0.9} mood="love" shirt={BLUE} hair="#1f1f24" delay={10} />
      <Heart x={270} y={130} size={0.5} color={PINK} beat delay={d} />
      <Heart x={640} y={110} size={0.45} color={PINK} beat delay={d + 6} />
      <Chip x={450} y={470} text="EN TANIDIK YÜZ" dark delay={d + 10} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <Phone x={270} y={270} scale={1.2} tilt={-6}>
        <Face x={0} y={-30} scale={0.8} mood="happy" />
        {[0, 1].map((i) => (
          <rect key={i} x={-56} y={50 + i * 34} width={112 - i * 30} height={22} rx={11} fill="#fff" stroke={OUTLINE} strokeWidth={3} opacity={frame > d + i * 10 ? 1 : 0} />
        ))}
      </Phone>
      <g transform={place(640, 210, useAppear(d))}>
        <path d="M -190 -90 L 190 -90 Q 210 -90 210 -70 L 210 50 Q 210 70 190 70 L -100 70 L -150 120 L -140 70 L -190 70 Q -210 70 -210 50 L -210 -70 Q -210 -90 -190 -90 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <text y={-14} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill={PURPLE}>
          FOTOĞRAFTA
        </text>
        <text y={36} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill={PURPLE}>
          BEĞENİYOR MUSUN?
        </text>
      </g>
      <QuestionMark x={830} y={100} size={70} delay={d + 12} color={PINK} />
      <Chip x={640} y={470} text="YORUMLARA YAZ!" dark delay={d + 20} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  SelfieShock,
  MirrorHappy,
  MirrorFlip,
  Asymmetry,
  Exposure,
  TwoPhotos,
  Choices,
  SelfieNose,
  Morph,
  Friends,
  YourTurn,
};
