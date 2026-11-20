// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Parmak çıtlatınca çıkan ses (2026-11-20-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  NamePlate,
  Person,
  place,
  QuestionMark,
  RED,
  Sparkles,
  uiFont,
  useAppear,
  useProgress,
  useWave,
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#e8f8f6";
const SKIN = "#f2c79a";
const SKIN_DARK = "#d9a877";
const TEAL = "#17c3a5";
const BLUE = "#0f8fb3";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff9a3d";
const GREEN = "#3cc46b";
const BONE = "#fbf3df";
const FLUID = "#bfe9ff";
const GAS = "#ffffff";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

type Mood = "calm" | "happy" | "wow" | "squint";

// Belden yukarı karakter; (0,0) gövdenin alt ortası, kafa merkezi (0,-200), yarıçap 70.
const Bust: React.FC<{ x: number; y: number; scale?: number; shirt?: string; hair?: string; mood?: Mood; delay?: number; shake?: number }> = ({
  x,
  y,
  scale = 1,
  shirt = TEAL,
  hair = "#4a2f1d",
  mood = "calm",
  delay = 0,
  shake = 0,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const tilt = Math.sin(frame / 18) * 2 + shake;
  const blink = frame % 90 > 85 ? 0.15 : 1;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${tilt} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {mood === "calm" || mood === "happy" ? (
          <g transform={`translate(0 ${-206 * (1 - blink)}) scale(1 ${blink})`}>
            <circle cx={-26} cy={-206} r={8} fill={OUTLINE} />
            <circle cx={26} cy={-206} r={8} fill={OUTLINE} />
          </g>
        ) : null}
        {mood === "wow" ? (
          <g>
            <circle cx={-26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-26} cy={-204} r={6} fill={OUTLINE} />
            <circle cx={26} cy={-204} r={6} fill={OUTLINE} />
          </g>
        ) : null}
        {mood === "squint" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M -40 -214 L -18 -205 L -40 -196" />
            <path d="M 40 -214 L 18 -205 L 40 -196" />
          </g>
        ) : null}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mood === "calm" ? <path d="M -20 -164 Q 0 -152 20 -164" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mood === "wow" || mood === "squint" ? <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} /> : null}
        <circle cx={-46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
      </g>
    </g>
  );
};

// Patlama balonu ("ÇAT!")
const Burst: React.FC<{ x: number; y: number; text?: string; size?: number; delay?: number; color?: string }> = ({
  x,
  y,
  text = "ÇAT!",
  size = 1,
  delay = 0,
  color = YELLOW,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay, 10);
  const pts = Array.from({ length: 24 }).map((_, i) => {
    const r = i % 2 ? 62 : 100;
    const ang = (i / 24) * Math.PI * 2;
    return `${Math.cos(ang) * r * 1.25},${Math.sin(ang) * r}`;
  });
  const wob = frame >= delay ? Math.sin(frame / 2) * 3 : 0;
  return (
    <g transform={place(x, y, size * a, wob)} opacity={frame >= delay ? 1 : 0}>
      <polygon points={pts.join(" ")} fill={color} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <text x={0} y={16} fontFamily={uiFont} fontWeight={800} fontSize={50} textAnchor="middle" fill={RED} stroke={OUTLINE} strokeWidth={2}>
        {text}
      </text>
    </g>
  );
};

// Kenetlenmiş iki el, öne doğru itilmiş (önden görünüş); (0,0) merkez. ~300×150
const ClaspedHands: React.FC<{ x: number; y: number; scale?: number; push?: number; delay?: number }> = ({ x, y, scale = 1, push = 0, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      {/* Kollar */}
      <path d="M -260 120 L -150 30" stroke={TEAL} strokeWidth={60} strokeLinecap="round" />
      <path d="M 260 120 L 150 30" stroke={TEAL} strokeWidth={60} strokeLinecap="round" />
      <path d="M -260 120 L -150 30" stroke={OUTLINE} strokeWidth={66} strokeLinecap="round" opacity={0} />
      {/* Avuçlar */}
      <ellipse cx={-110} cy={10} rx={62} ry={58} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <ellipse cx={110} cy={10} rx={62} ry={58} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      {/* Geçmeli parmaklar */}
      {Array.from({ length: 8 }).map((_, i) => {
        const fx = -84 + i * 24;
        const up = i % 2 === 0;
        return (
          <rect
            key={i}
            x={fx - 13}
            y={-48 - push * 10 + (up ? 0 : 6)}
            width={26}
            height={86}
            rx={13}
            fill={up ? SKIN : SKIN_DARK}
            stroke={OUTLINE}
            strokeWidth={5}
          />
        );
      })}
      {/* Eklem çizgileri */}
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M ${-92 + i * 24} ${-18 - push * 10} q 8 4 16 0`} fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
      ))}
    </g>
  );
};

// Eklem kesiti: solda kemik başı, sağda yuva; etrafında kapsül ve sıvı.
// gap: 0…1 (kemikler ayrılıyor), cavity: 0…1 (gaz boşluğu), (0,0) merkez. ~520×260
const JointSection: React.FC<{ x: number; y: number; scale?: number; gap?: number; cavity?: number; flash?: number; delay?: number; dots?: boolean }> = ({
  x,
  y,
  scale = 1,
  gap = 0,
  cavity = 0,
  flash = 0,
  delay = 0,
  dots = true,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const g = gap * 60;
  return (
    <g transform={place(x, y, scale * a)}>
      {/* Kapsül */}
      <rect x={-150 - g} y={-110 - gap * -14} width={300 + 2 * g} height={220 - gap * 28} rx={100 - gap * 10} fill={FLUID} stroke={PURPLE} strokeWidth={7} strokeDasharray="0" />
      {/* Sol kemik (yuvarlak baş) */}
      <g transform={`translate(${-g} 0)`}>
        <path d="M -260 -60 L -60 -60 Q -6 -60 -6 0 Q -6 60 -60 60 L -260 60 Z" fill={BONE} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -230 -30 L -110 -30" stroke="#e6d6b0" strokeWidth={6} strokeLinecap="round" />
      </g>
      {/* Sağ kemik (çukur yuva) */}
      <g transform={`translate(${g} 0)`}>
        <path d="M 260 -60 L 22 -60 Q 2 -60 0 -44 Q 34 0 0 44 Q 2 60 22 60 L 260 60 Z" fill={BONE} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 230 30 L 110 30" stroke="#e6d6b0" strokeWidth={6} strokeLinecap="round" />
      </g>
      {/* Çözünmüş gaz noktaları */}
      {dots
        ? [
            [-90, -80],
            [-40, -88],
            [40, -84],
            [92, -78],
            [-86, 82],
            [-30, 86],
            [36, 84],
            [96, 80],
          ].map(([px, py], i) => (
            <circle
              key={i}
              cx={px * (1 + gap * 0.35) + Math.sin(frame / 9 + i) * 4}
              cy={py * (1 - gap * 0.1) + Math.cos(frame / 11 + i) * 4}
              r={5}
              fill={GAS}
              stroke={BLUE}
              strokeWidth={2.5}
              opacity={1 - cavity * 0.7}
            />
          ))
        : null}
      {/* Gaz boşluğu */}
      {cavity > 0 ? (
        <g>
          <circle cx={0} cy={0} r={cavity * 46 + (frame % 6 < 3 ? 1 : 0)} fill={GAS} stroke={BLUE} strokeWidth={5} />
          <circle cx={-cavity * 14} cy={-cavity * 14} r={cavity * 10} fill="#e8f7ff" />
        </g>
      ) : null}
      {flash > 0 ? <circle cx={0} cy={0} r={90} fill="#fff" opacity={flash * 0.85} /> : null}
    </g>
  );
};

// Basınç göstergesi; value 1 (yüksek) … 0 (düşük)
const Gauge: React.FC<{ x: number; y: number; value: number; delay?: number }> = ({ x, y, value, delay = 0 }) => {
  const a = useAppear(delay);
  const ang = -150 + value * 120;
  return (
    <g transform={place(x, y, a)}>
      <circle r={78} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <path d="M -60 20 A 64 64 0 0 1 60 20" fill="none" stroke={GREEN} strokeWidth={10} />
      <path d="M -60 20 A 64 64 0 0 1 -40 -44" fill="none" stroke={RED} strokeWidth={10} />
      <line x1={0} y1={0} x2={Math.cos((ang * Math.PI) / 180) * 58} y2={Math.sin((ang * Math.PI) / 180) * 58} stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" />
      <circle r={10} fill={OUTLINE} />
      <text x={0} y={56} fontFamily={uiFont} fontWeight={800} fontSize={20} textAnchor="middle" fill={OUTLINE}>
        BASINÇ
      </text>
    </g>
  );
};

// Tek parmak (yandan), (0,0) parmak kökü; sağa uzanır. ~260×60
const Finger: React.FC<{ x: number; y: number; scale?: number; stretch?: number; rotate?: number }> = ({ x, y, scale = 1, stretch = 0, rotate = 0 }) => (
  <g transform={place(x, y, scale, rotate)}>
    <rect x={0} y={-30} width={110} height={60} rx={28} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
    <rect x={110 + stretch * 20} y={-28} width={90} height={56} rx={26} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
    <rect x={170 + stretch * 20} y={-26} width={70} height={52} rx={24} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
    <path d={`M ${212 + stretch * 20} -20 q 20 0 22 20`} fill="#fff4ea" stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// 1) Kanca: parmakları itip çıtlatmak
const CrackHook: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const hit = Math.round(durationInFrames * 0.35);
  const push = useProgress(hit - 14, hit);
  const shake = frame >= hit && frame < hit + 10 ? Math.sin(frame * 3) * 4 : 0;
  return (
    <g>
      <Paper />
      <Bust x={450} y={600} scale={1.05} mood={frame >= hit ? "wow" : "squint"} shirt={TEAL} shake={shake} />
      <ClaspedHands x={450} y={500 - push * 30 + shake} scale={0.95} push={push} delay={4} />
      <Burst x={180} y={150} delay={hit} size={0.9} />
      <Burst x={730} y={170} text="ÇIT!" delay={hit + 6} size={0.7} color="#fff" />
      <Sparkles points={[[330, 290], [580, 280], [450, 250]]} />
    </g>
  );
};

// Kemik çizimi (yatay), (0,0) merkez
const BoneIcon: React.FC<{ x: number; y: number; scale?: number; rotate?: number; delay?: number }> = ({ x, y, scale = 1, rotate = 0, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a, rotate)}>
      <path
        d="M -110 -22 L 110 -22 A 30 30 0 1 1 132 0 A 30 30 0 1 1 110 22 L -110 22 A 30 30 0 1 1 -132 0 A 30 30 0 1 1 -110 -22 Z"
        fill={BONE}
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
    </g>
  );
};

const Drop: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  const w = useWave(40, 6);
  return (
    <g transform={place(x, y + w, scale * a)}>
      <path d="M 0 -110 Q 80 -10 80 30 A 80 80 0 0 1 -80 30 Q -80 -10 0 -110 Z" fill={FLUID} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-26} cy={20} r={9} fill={OUTLINE} />
      <circle cx={26} cy={20} r={9} fill={OUTLINE} />
      <path d="M -20 50 Q 0 64 20 50" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <circle cx={-34} cy={-30} r={12} fill="#fff" opacity={0.8} />
    </g>
  );
};

// 2) Kemik değil, sıvı
const NotBone: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const x = useAppear(d, 10);
  return (
    <g>
      <Paper />
      <BoneIcon x={240} y={240} scale={1} rotate={-12} delay={2} />
      {/* Kırmızı çarpı */}
      <g transform={place(240, 240, x)} opacity={x > 0.02 ? 1 : 0}>
        <path d="M -110 -110 L 110 110 M 110 -110 L -110 110" stroke={RED} strokeWidth={22} strokeLinecap="round" />
      </g>
      <Chip x={240} y={440} text="KIRILMIYOR" dark delay={d + 4} />
      <Drop x={660} y={250} scale={1.1} delay={d + 10} />
      <Chip x={660} y={440} text="SUÇLU: SIVI!" delay={d + 18} />
      <QuestionMark x={450} y={150} size={70} delay={6} />
    </g>
  );
};

// 3) Eklemin içi
const JointInside: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const z = useAppear(10);
  return (
    <g>
      <Paper />
      {/* Parmak ve büyüteç halkası */}
      <Finger x={40} y={120} scale={0.9} />
      <circle cx={146} cy={120} r={44} fill="none" stroke={RED} strokeWidth={6} />
      <path d="M 180 150 L 330 230" stroke={RED} strokeWidth={5} strokeDasharray="12 10" opacity={z} />
      <g transform={place(560, 300, z)}>
        <circle r={240} fill="#fff" stroke={RED} strokeWidth={8} />
      </g>
      <JointSection x={560} y={300} scale={0.82} delay={12} />
      <Chip x={250} y={470} text="EKLEM SIVISI" delay={d} />
      <Chip x={720} y={80} text="ÇÖZÜNMÜŞ GAZ" dark delay={d + 12} />
      <Arrow from={[720, 110]} to={[640, 215]} progress={useProgress(d + 16, d + 30)} color={OUTLINE} />
    </g>
  );
};

// 4) Çekince basınç düşer
const PullApart: Visual = ({ durationInFrames }) => {
  const pull = useProgress(durationInFrames * 0.15, durationInFrames * 0.6);
  const d = Math.round(durationInFrames * 0.55);
  return (
    <g>
      <Paper />
      <JointSection x={400} y={300} scale={0.95} gap={pull} />
      <Arrow from={[120, 450]} to={[20, 450]} progress={useProgress(10, 26)} color={BLUE} />
      <Arrow from={[680, 450]} to={[780, 450]} progress={useProgress(10, 26)} color={BLUE} />
      <Chip x={400} y={470} text="ÇEK!" delay={8} />
      <Gauge x={790} y={150} value={1 - pull} delay={6} />
      <Chip x={720} y={300} text="DÜŞÜYOR!" dark delay={d} />
    </g>
  );
};

// MR cihazı (önden), (0,0) merkez
const Mri: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <rect x={-190} y={-190} width={380} height={380} rx={60} fill="#f4f7fb" stroke={OUTLINE} strokeWidth={7} />
      <circle r={110} fill="#2f3f63" stroke={OUTLINE} strokeWidth={7} />
      <circle r={86} fill="#1d2840" />
      <rect x={-260} y={150} width={520} height={34} rx={12} fill="#cfd8e3" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-150} y={-170} width={300} height={22} rx={11} fill={TEAL} stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

// 5) MR'da parmak çekme deneyi
const MriPull: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const pull = useProgress(durationInFrames * 0.25, durationInFrames * 0.75);
  const d = Math.round(durationInFrames * 0.2);
  const scan = (frame % 40) / 40;
  return (
    <g>
      <Paper />
      <Mri x={300} y={270} scale={0.95} delay={2} />
      {/* MR halkasının içindeki parmak + kablo */}
      <g opacity={useAppear(8)}>
        <Finger x={190} y={262} scale={0.7} stretch={pull} />
        <path d={`M ${350 + pull * 14} 262 L 520 262`} stroke={OUTLINE} strokeWidth={6} />
        <rect x={330 + pull * 14} y={248} width={24} height={28} rx={6} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <rect x={210} y={180 + scan * 170} width={180} height={6} fill={TEAL} opacity={0.6} />
      {/* Ekran */}
      <g transform={place(700, 200, useAppear(d))}>
        <rect x={-150} y={-110} width={300} height={200} rx={16} fill="#1d2840" stroke={OUTLINE} strokeWidth={6} />
        <text x={-130} y={-78} fontFamily={uiFont} fontWeight={800} fontSize={20} fill={RED}>
          ● CANLI
        </text>
        <JointSection x={0} y={10} scale={0.42} gap={pull} cavity={pull > 0.8 ? (pull - 0.8) * 5 : 0} dots={false} />
        <rect x={-14} y={90} width={28} height={40} fill={OUTLINE} />
      </g>
      <NamePlate x={700} y={400} text="ALBERTA ÜNİVERSİTESİ" delay={d + 10} />
      <Chip x={700} y={480} text="KANADA" dark delay={d + 18} />
    </g>
  );
};

// 6) Boşluk doğuyor
const CavityBorn: Visual = ({ durationInFrames }) => {
  const hit = Math.round(durationInFrames * 0.35);
  const gap = useProgress(0, hit);
  const cav = useAppear(hit, 10);
  const flash = useProgress(hit - 4, hit) * (1 - useProgress(hit, hit + 8));
  return (
    <g>
      <Paper />
      <JointSection x={450} y={280} scale={1.05} gap={0.4 + gap * 0.5} cavity={cav} flash={flash} />
      <Burst x={150} y={110} delay={hit} size={0.75} />
      <Chip x={450} y={490} text="GAZ BOŞLUĞU!" delay={hit + 10} />
      <Arrow from={[640, 80]} to={[490, 230]} progress={useProgress(hit + 12, hit + 26)} color={RED} />
      <Sparkles points={[[360, 150], [560, 140], [450, 420]]} />
    </g>
  );
};

// 7) Tartışma sürüyor
const BubbleDebate: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const grow = useProgress(4, 30);
  const shrink = useProgress(d + 10, d + 50);
  const w = useWave(30, 3);
  const panel = (cx: number, label: string, r: number, color: string, delay: number) => (
    <g transform={place(cx, 250, useAppear(delay))}>
      <rect x={-170} y={-150} width={340} height={280} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-150} y={-60} width={300} height={120} rx={50} fill={FLUID} stroke={PURPLE} strokeWidth={5} />
      <circle cx={0} cy={0} r={r} fill={GAS} stroke={BLUE} strokeWidth={5} />
      <text x={0} y={-100} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={color}>
        {label}
      </text>
    </g>
  );
  return (
    <g>
      <Paper />
      {panel(230, "OLUŞUYOR", 8 + grow * 42, BLUE, 2)}
      {panel(670, "SÖNÜYOR", 50 - shrink * 22, PINK, d)}
      <BigText x={450} y={250} text="?" size={110} color={YELLOW} delay={d + 6} />
      <g transform={`rotate(${w} 450 470)`}>
        <Chip x={450} y={470} text="İKİSİ DE OLABİLİR" dark delay={d + 20} />
      </g>
    </g>
  );
};

// 8) Yirmi dakika bekleme
const WaitTimer: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const sweep = useProgress(durationInFrames * 0.1, durationInFrames * 0.85);
  const d = Math.round(durationInFrames * 0.3);
  const ang = sweep * (20 / 60) * 360;
  const rad = (ang * Math.PI) / 180;
  const ex = Math.sin(rad) * 120;
  const ey = -Math.cos(rad) * 120;
  return (
    <g>
      <Paper />
      <Bust x={200} y={600} scale={0.95} mood="squint" shirt={ORANGE} />
      <ClaspedHands x={200} y={530} scale={0.55} push={Math.abs(Math.sin(frame / 6))} delay={2} />
      <BigText x={330} y={160} text="..." size={80} color="#fff" delay={8} />
      {/* Saat */}
      <g transform={place(640, 250, useAppear(4))}>
        <circle r={150} fill="#fff" stroke={OUTLINE} strokeWidth={8} />
        {sweep > 0 ? <path d={`M 0 0 L 0 -120 A 120 120 0 ${ang > 180 ? 1 : 0} 1 ${ex} ${ey} Z`} fill={TEAL} opacity={0.6} /> : null}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={0} y1={-132} x2={0} y2={-116} stroke={OUTLINE} strokeWidth={6} transform={`rotate(${i * 30})`} />
        ))}
        <line x1={0} y1={0} x2={ex * 0.9} y2={ey * 0.9} stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
        <circle r={12} fill={OUTLINE} />
      </g>
      <Chip x={640} y={470} text="≈ 20 DAKİKA" delay={d} />
    </g>
  );
};

// Açık el (avuç, önden); (0,0) avuç merkezi
const OpenHand: React.FC<{ x: number; y: number; scale?: number; delay?: number; rotate?: number; flip?: boolean }> = ({ x, y, scale = 1, delay = 0, rotate = 0, flip = false }) => {
  const a = useAppear(delay);
  return (
    <g transform={`${place(x, y, scale * a, rotate)} scale(${flip ? -1 : 1} 1)`}>
      {[-48, -16, 16, 48].map((fx, i) => (
        <rect key={i} x={fx - 15} y={-140 + Math.abs(i - 1.5) * 12} width={30} height={110} rx={15} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      ))}
      <rect x={-72} y={-20} width={60} height={30} rx={15} fill={SKIN} stroke={OUTLINE} strokeWidth={5} transform="rotate(-40 -60 0)" />
      <rect x={-66} y={-60} width={132} height={120} rx={44} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-40} y={56} width={80} height={50} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
    </g>
  );
};

// 9) Tek elle deney yapan doktor
const OneHandDoctor: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const cracking = frame > d && frame % 24 < 8;
  return (
    <g>
      <Paper />
      <Person x={450} y={500} scale={1.5} shirt="#fff" pants="#2f3f63" glasses mustache hair="#bdbdbd" delay={2} />
      <OpenHand x={200} y={260} scale={0.9} rotate={-10} delay={6} />
      <OpenHand x={700} y={260} scale={0.9} rotate={10} flip delay={10} />
      <Chip x={200} y={430} text="SOL: ÇIT ÇIT" delay={d} />
      <Chip x={700} y={430} text="SAĞ: HİÇ" dark delay={d + 8} />
      {cracking ? <Burst x={200} y={110} text="ÇIT!" size={0.5} delay={0} /> : null}
      {/* Yıl takvimi */}
      <g transform={place(450, 80, useAppear(d + 14))}>
        <rect x={-130} y={-36} width={260} height={72} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={14} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={PURPLE}>
          ONLARCA YIL
        </text>
      </g>
      <NamePlate x={450} y={530} text="DR. DONALD UNGER" delay={d + 20} />
    </g>
  );
};

// Röntgen el, (0,0) merkez
const XrayHand: React.FC<{ x: number; y: number; label: string; delay?: number }> = ({ x, y, label, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-120} y={-160} width={240} height={300} rx={18} fill="#1d2840" stroke={OUTLINE} strokeWidth={6} />
      {[-54, -18, 18, 54].map((fx, i) => (
        <g key={i}>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={fx - 8} y={-120 + k * 42 + Math.abs(i - 1.5) * 8} width={16} height={34} rx={8} fill="#e8f1ff" opacity={0.9} />
          ))}
        </g>
      ))}
      <rect x={-60} y={10} width={120} height={80} rx={20} fill="#e8f1ff" opacity={0.35} />
      <text x={0} y={122} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill="#fff">
        {label}
      </text>
    </g>
  );
};

const Check: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={42} fill={GREEN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -20 0 L -5 16 L 22 -16" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

// 10) Kireçlenme yok, 215 kişi
const NoArthritis: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const crowd = Array.from({ length: 18 });
  return (
    <g>
      <Paper />
      <XrayHand x={150} y={220} label="SOL" delay={2} />
      <XrayHand x={420} y={220} label="SAĞ" delay={6} />
      <Check x={230} y={80} delay={14} />
      <Check x={500} y={80} delay={18} />
      {/* Kalabalık */}
      {crowd.map((_, i) => {
        const cx = 640 + (i % 6) * 40;
        const cy = 140 + Math.floor(i / 6) * 70;
        const colors = [TEAL, PINK, ORANGE, PURPLE, BLUE];
        return (
          <g key={i} transform={place(cx, cy, useAppear(d + i * 1.5))}>
            <circle cx={0} cy={-14} r={13} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
            <path d="M -18 22 Q -18 0 0 0 Q 18 0 18 22 Z" fill={colors[i % 5]} stroke={OUTLINE} strokeWidth={3} />
          </g>
        );
      })}
      <Chip x={740} y={370} text="215 KİŞİ" dark delay={d + 10} />
      <Chip x={450} y={480} text="BAĞLANTI YOK!" delay={d + 22} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const w = useWave(40, 4);
  const items = ["GÜNDE 1?", "GÜNDE 10?", "HİÇ?"];
  return (
    <g>
      <Paper />
      <Bust x={190} y={540} scale={0.9} mood="happy" shirt={TEAL} />
      {items.map((c, i) => (
        <g key={i} transform={place(610, 90 + i * 115, useAppear(d + i * 8), i % 2 ? w : -w)}>
          <rect x={-200} y={-42} width={400} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={[BLUE, PINK, PURPLE][i]}>
            {c}
          </text>
        </g>
      ))}
      <Brain x={360} y={150} scale={0.45} delay={d + 26} mood="confused" />
      <Chip x={610} y={480} text="YORUMLARA YAZ!" dark delay={d + 32} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  CrackHook,
  NotBone,
  JointInside,
  PullApart,
  MriPull,
  CavityBorn,
  BubbleDebate,
  WaitTimer,
  OneHandDoctor,
  NoArthritis,
  YourTurn,
};
