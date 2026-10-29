// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Beyin donması (2026-10-29-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  Heart,
  INK,
  NamePlate,
  Note,
  Person,
  place,
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
const ICE = "#bfe9ff";
const BLOOD = "#e0434b";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

// Külahta dondurma; (0,0) külahın tutulduğu yer
const IceCream: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <path d="M -22 -18 L 22 -18 L 0 34 Z" fill="#e3a957" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -14 -8 L 8 18 M 0 -18 L 14 0 M -8 4 L 4 -14" stroke="#b97d33" strokeWidth={3} />
    <circle cx={0} cy={-34} r={22} fill="#f7a8c4" stroke={OUTLINE} strokeWidth={4} />
    <circle cx={-12} cy={-58} r={18} fill="#fff4dc" stroke={OUTLINE} strokeWidth={4} />
    <circle cx={12} cy={-56} r={17} fill="#8fd3c7" stroke={OUTLINE} strokeWidth={4} />
    <circle cx={4} cy={-78} r={6} fill={RED} stroke={OUTLINE} strokeWidth={3} />
  </g>
);

// Dönen kar tanesi
const Snowflake: React.FC<{ x: number; y: number; size?: number; delay?: number }> = ({ x, y, size = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const fall = Math.sin((frame + delay * 7) / 18) * 6;
  return (
    <g transform={place(x, y + fall, size * appear, frame * 2 + delay * 10)} stroke="#4aa3d8" strokeWidth={5} strokeLinecap="round">
      {[0, 60, 120].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <line x1={-20} y1={0} x2={20} y2={0} />
          <path d="M 12 -7 L 16 0 L 12 7 M -12 -7 L -16 0 L -12 7" fill="none" strokeWidth={3} />
        </g>
      ))}
    </g>
  );
};

// Yanıp sönen kırmızı ağrı patlaması
const PainBurst: React.FC<{ x: number; y: number; size?: number; delay?: number }> = ({ x, y, size = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const pulse = 1 + 0.12 * Math.sin(frame / 2.5);
  const pts = Array.from({ length: 16 }, (_, i) => {
    const r = i % 2 ? 22 : 48;
    const a = (i / 16) * Math.PI * 2;
    return `${Math.cos(a) * r},${Math.sin(a) * r}`;
  }).join(" ");
  return (
    <g transform={place(x, y, size * appear * pulse)}>
      <polygon points={pts} fill={RED} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      <polygon points={pts} fill={YELLOW} transform="scale(0.45)" />
    </g>
  );
};

const IceCreamOuch: Visual = () => {
  const frame = useCurrentFrame();
  const shake = frame > 20 ? Math.sin(frame * 1.7) * 3 : 0;
  return (
    <g>
      <Paper />
      <g transform={`translate(${shake} 0)`}>
        <Person x={330} y={540} scale={1.35} shirt="#3fb4a0" presenting holding={<IceCream scale={1.1} />} />
      </g>
      <PainBurst x={395} y={240} size={0.9} delay={18} />
      <g transform={place(470, 190, useAppear(22))} stroke={RED} strokeWidth={7} strokeLinecap="round">
        <path d="M 0 0 L 40 -30 M 10 30 L 60 20 M 0 -40 L 20 -80" />
      </g>
      <Snowflake x={160} y={150} delay={4} />
      <Snowflake x={600} y={120} size={1.3} delay={10} />
      <Snowflake x={720} y={330} size={0.9} delay={16} />
      <Snowflake x={130} y={360} size={0.8} delay={20} />
      <BigText x={680} y={230} text="!" size={170} color={RED} delay={24} />
    </g>
  );
};

const NameReveal: Visual = () => {
  const shiver = useWave(4, 3);
  return (
    <g>
      <Paper />
      <Note x={450} y={150} width={620} title="BEYİN DONMASI" text="SOĞUK UYARAN BAŞ AĞRISI" delay={2} />
      <g transform={`translate(${shiver} 0)`}>
        <Brain x={450} y={420} scale={0.95} mood="confused" delay={10} />
      </g>
      <g transform={place(450, 330, useAppear(18))}>
        <path d="M -95 0 L -70 22 L -45 4 L -20 26 L 5 4 L 30 24 L 55 2 L 80 22 L 100 0 L 90 -12 L -90 -12 Z" fill={ICE} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      </g>
      <Snowflake x={220} y={400} delay={20} />
      <Snowflake x={690} y={380} size={1.2} delay={26} />
      <Snowflake x={640} y={510} size={0.8} delay={30} />
    </g>
  );
};

const PalateVessels: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  // Zamanlar anlatıma göre: "damağa" ≈ %48, "büzülüp" ≈ %74, "hızla genişliyor" ≈ %81
  const at = (f: number) => Math.round(durationInFrames * f);
  const mid = at(0.8);
  const rise = useProgress(at(0.3), at(0.48));
  // Önce büzülür (kalınlık 40 → 10), sonra genişler (10 → 80)
  const squeeze = useProgress(at(0.66), at(0.76));
  const widen = useProgress(mid, mid + 12);
  const thick = 40 - 30 * squeeze + 70 * widen;
  const flow = (frame * (2 + 6 * widen)) % 60;
  return (
    <g>
      <Paper />
      {/* Damar */}
      <rect x={110} y={210 - thick / 2} width={680} height={thick} rx={thick / 2} fill={BLOOD} stroke={OUTLINE} strokeWidth={5} />
      {Array.from({ length: 12 }).map((_, i) => {
        const cx = 120 + ((i * 60 + flow) % 660);
        return <circle key={i} cx={cx} cy={210} r={Math.max(3, thick * 0.18)} fill="#ffb3b8" />;
      })}
      {/* Damak */}
      <path d="M 90 330 Q 450 250 810 330 L 810 380 Q 450 300 90 380 Z" fill="#f59ab0" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <NamePlate x={180} y={300} text="DAMAK" delay={6} />
      {/* Yükselen dondurma topu */}
      <g transform={place(450, 520 - 150 * rise, 1)}>
        <circle r={62} fill="#fff4dc" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={-20} cy={-14} r={10} fill="#fff" />
      </g>
      <Snowflake x={330} y={440} size={0.8} delay={14} />
      <Snowflake x={575} y={440} size={0.8} delay={18} />
      {/* Durum etiketleri */}
      {frame < mid ? <Chip x={450} y={95} text="BÜZÜLÜR" dark delay={at(0.66)} /> : <Chip x={450} y={95} text="HIZLA GENİŞLER" delay={mid + 2} />}
    </g>
  );
};

const ReferredPain: Visual = () => {
  const nerve = useProgress(8, 34);
  const blink = useWave(30, 1);
  return (
    <g>
      <Paper />
      {/* Yandan büyük kafa (sağa bakar) */}
      <g transform="translate(400 300)">
        <rect x={-70} y={150} width={110} height={120} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -190 0 C -190 -140 -80 -210 30 -200 C 140 -190 200 -110 195 -20 L 225 40 L 195 55 C 200 110 180 150 120 165 L 40 175 C -80 190 -190 120 -190 0 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -190 0 C -200 -150 -70 -230 60 -205 C 120 -195 170 -160 185 -120 C 120 -150 40 -150 -20 -120 C -70 -95 -110 -40 -120 20 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={-110} cy={20} r={26} fill="#e8b07f" stroke={OUTLINE} strokeWidth={5} />
        <g transform={`translate(110 -40) scale(1 ${blink > 0.95 ? 0.15 : 1})`}>
          <circle r={14} fill={OUTLINE} />
        </g>
        <path d="M 70 -78 Q 110 -96 140 -80" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <path d="M 110 110 Q 150 98 180 110" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        {/* Ağızdan alına uzanan sinir */}
        <path
          d="M 150 80 C 60 70 20 20 40 -40 C 55 -90 110 -120 150 -130"
          fill="none"
          stroke={YELLOW}
          strokeWidth={14}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={`${nerve} 1`}
        />
        <path
          d="M 150 80 C 60 70 20 20 40 -40 C 55 -90 110 -120 150 -130"
          fill="none"
          stroke={OUTLINE}
          strokeWidth={3}
          strokeDasharray="10 12"
          opacity={nerve}
        />
        <circle cx={150} cy={80} r={14} fill={ICE} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <PainBurst x={560} y={160} size={0.85} delay={34} />
      <Chip x={750} y={90} text="ALIN" delay={38} />
      <Chip x={720} y={420} text="SİNİR" dark delay={20} />
      <Arrow from={[655, 400]} to={[470, 340]} progress={useProgress(22, 32)} color={INK} />
    </g>
  );
};

const BloodRush: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const spikeAt = Math.round(durationInFrames * 0.3);
  const draw = useProgress(4, durationInFrames - 10);
  const speed = frame > spikeAt ? 9 : 3;
  const pts: string[] = [];
  const n = 40;
  for (let i = 0; i <= Math.round(n * draw); i++) {
    const t = i / n;
    const base = 150 - (t > 0.35 ? Math.min(1, (t - 0.35) / 0.12) * 95 : 0);
    const beat = Math.sin(i * 1.3) * 10;
    pts.push(`${40 + t * 280},${base + beat}`);
  }
  return (
    <g>
      <Paper />
      {/* Beyne giden atardamar */}
      <path d="M 250 560 C 250 470 230 420 250 360" fill="none" stroke={OUTLINE} strokeWidth={42} strokeLinecap="round" />
      <path d="M 250 560 C 250 470 230 420 250 360" fill="none" stroke={BLOOD} strokeWidth={32} strokeLinecap="round" />
      {Array.from({ length: 5 }).map((_, i) => {
        const t = ((frame * speed + i * 40) % 200) / 200;
        return <circle key={i} cx={250 - Math.sin(t * 3) * 8} cy={560 - t * 200} r={9} fill="#ffb3b8" />;
      })}
      <Brain x={250} y={250} scale={1.05} mood={frame > spikeAt ? "confused" : "happy"} delay={2} />
      {/* Ölçüm ekranı */}
      <g transform={place(480, 110, useAppear(8))}>
        <rect x={0} y={0} width={360} height={240} rx={22} fill="#1f2b33" stroke={OUTLINE} strokeWidth={6} />
        <polyline points={pts.join(" ")} fill="none" stroke="#5ff0b4" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
        <rect x={140} y={250} width={80} height={30} fill="#1f2b33" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Chip x={660} y={445} text="KAN AKIŞI" delay={spikeAt} />
      <Arrow from={[800, 500]} to={[800, 390]} progress={useProgress(spikeAt + 4, spikeAt + 14)} color={RED} />
    </g>
  );
};

const KidScience: Visual = () => {
  const fast = useProgress(26, 46);
  const slow = useProgress(18, 34);
  const bar = (x: number, h: number, color: string, label: string, delay: number) => (
    <g>
      <rect x={x - 70} y={440 - h} width={140} height={h} rx={10} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <Chip x={x} y={490} text={label} delay={delay} />
    </g>
  );
  return (
    <g>
      <Paper />
      <line x1={330} y1={440} x2={860} y2={440} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {bar(480, 120 * slow, "#8fd3c7", "YAVAŞ", 16)}
      {bar(720, 240 * fast, RED, "HIZLI", 24)}
      <g transform={place(480, 440 - 120 * slow - 50, useAppear(30))}>
        <IceCream scale={0.8} />
      </g>
      <g transform={place(720, 440 - 240 * fast - 50, useAppear(44))}>
        <IceCream scale={0.8} />
      </g>
      <BigText x={600} y={110} text="×2" size={120} delay={48} />
      <Person x={170} y={470} scale={0.9} shirt="#f2b134" hat="cap" presenting delay={4} />
      <NamePlate x={170} y={515} text="8. SINIF" delay={10} />
      <Sparkles points={[[110, 200], [245, 175], [530, 90]]} />
    </g>
  );
};

// Yavaş yürüyen kaplumbağa; sırtında dondurma
const Turtle: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  const step = Math.sin(frame / 6) * 6;
  return (
    <g transform={place(x + frame * 0.6, y, 1)}>
      <ellipse cx={-50} cy={-6} rx={14} ry={22} fill="#7cc576" stroke={OUTLINE} strokeWidth={4} transform={`rotate(${step})`} />
      <ellipse cx={45} cy={-6} rx={14} ry={22} fill="#7cc576" stroke={OUTLINE} strokeWidth={4} transform={`rotate(${-step})`} />
      <circle cx={92} cy={-40} r={26} fill="#7cc576" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={100} cy={-46} r={5} fill={OUTLINE} />
      <path d="M 96 -30 Q 104 -26 110 -32" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
      <path d="M -80 -20 Q -78 -100 0 -100 Q 78 -100 80 -20 Z" fill="#3f9e5b" stroke={OUTLINE} strokeWidth={5} />
      <path d="M -40 -30 L -20 -75 L 20 -75 L 40 -30 Z" fill="none" stroke="#2c6d40" strokeWidth={4} />
      <g transform="translate(0 -96)">
        <IceCream scale={0.75} />
      </g>
    </g>
  );
};

const SlowDown: Visual = () => {
  const frame = useCurrentFrame();
  const watch = useAppear(4);
  const fade = useProgress(10, 50);
  return (
    <g>
      <Paper />
      <Person x={160} y={520} scale={1.15} shirt="#5b8def" presenting holding={<IceCream />} delay={2} />
      <g opacity={1 - fade}>
        <PainBurst x={200} y={250} size={0.55} />
      </g>
      <g opacity={fade}>
        <Heart x={200} y={230} size={0.6} beat />
      </g>
      <g transform={place(690, 165, watch)}>
        <rect x={-14} y={-112} width={28} height={22} rx={5} fill={OUTLINE} />
        <circle r={90} fill="#fff" stroke={OUTLINE} strokeWidth={7} />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={0} y1={-76} x2={0} y2={-64} stroke={OUTLINE} strokeWidth={5} transform={`rotate(${i * 30})`} />
        ))}
        <line x1={0} y1={0} x2={0} y2={-66} stroke={RED} strokeWidth={8} strokeLinecap="round" transform={`rotate(${frame * 6})`} />
        <circle r={9} fill={OUTLINE} />
      </g>
      <Chip x={690} y={300} text="SANİYELER" delay={12} />
      <Turtle x={420} y={500} />
      <Chip x={430} y={90} text="YAVAŞ YE" dark delay={24} />
    </g>
  );
};

// Buzlu içecek bardağı
const Cup: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={place(x, y, 1)}>
    <path d="M -30 -40 L 30 -40 L 22 40 L -22 40 Z" fill="#9fdcf5" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-16} y={-26} width={16} height={16} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
    <rect x={2} y={-12} width={16} height={16} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
    <path d="M 8 -40 L 18 -72 L 30 -72" fill="none" stroke={RED} strokeWidth={6} strokeLinecap="round" />
  </g>
);

const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const card = useAppear(8);
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Person x={200} y={530} scale={1.3} shirt="#3fb4a0" presenting holding={<IceCream />} />
      <g transform={place(610, 200, card)}>
        <rect x={-220} y={-110} width={440} height={220} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -160 106 L -190 160 L -110 106 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-150} y={100} width={44} height={12} fill="#fff" />
        <g transform="translate(-110 10)">
          <IceCream scale={0.9} />
        </g>
        <text x={0} y={22} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill={INK}>
          YA DA
        </text>
        <Cup x={110} y={20} />
      </g>
      <g transform={place(610, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={24} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  IceCreamOuch,
  NameReveal,
  PalateVessels,
  ReferredPain,
  BloodRush,
  KidScience,
  SlowDown,
  YourTurn,
};
