// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Spot ışığı etkisi — herkes sana bakıyor sanmak (2026-11-13-sabah)
import { interpolate, useCurrentFrame } from "remotion";
import {
  Arrow,
  Chip,
  Door,
  INK,
  NamePlate,
  place,
  QuestionMark,
  RED,
  Room,
  Sparkles,
  ThoughtBubble,
  uiFont,
  useAppear,
  useProgress,
  useWave,
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff0f4";
const PINK = "#ff5c93";
const SKIN = "#f2c79a";
const BLUE = "#4fb6e8";
const GREEN = "#5cc27a";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff9a3d";
const STAGE = "#2a1238";
const COFFEE = "#7a4a2a";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

const PinkRoom: React.FC<{ window?: "day" | "night" | false; picture?: boolean }> = ({ window = "day", picture = true }) => (
  <Room wall="#fff0f4" stripe="#ffe1ea" floor="#d99a6a" window={window} picture={picture} />
);

type Mood = "panic" | "blush" | "happy" | "calm" | "cool" | "shock" | "angry";

// Önden görünen karakter; (x, y) ayakların ortası, figür ~245 birim boyunda
const Kid: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  skin?: string;
  print?: "face" | "star" | "none";
  stain?: number;
  mood?: Mood;
  look?: number;
  phone?: boolean;
  wave?: boolean;
  delay?: number;
  blushAmount?: number;
}> = ({
  x,
  y,
  scale = 1,
  shirt = BLUE,
  hair = "#4a2f1d",
  skin = SKIN,
  print = "none",
  stain = 0,
  mood = "calm",
  look = 0,
  phone = false,
  wave = false,
  delay = 0,
  blushAmount,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const breathe = Math.sin(frame / 14) * 1.5;
  const armL = wave ? -150 + Math.sin(frame / 5) * 18 : phone ? -40 : 8;
  const armR = phone ? 40 : -8;
  const px = look * 5;
  const py = phone ? 5 : 0;
  const blush = blushAmount ?? (mood === "blush" || mood === "panic" ? 1 : 0);
  return (
    <g transform={place(x, y, scale * a)}>
      <ellipse cx={0} cy={2} rx={46} ry={8} fill="rgba(0,0,0,0.16)" />
      {/* Bacaklar */}
      <rect x={-26} y={-70} width={22} height={70} rx={8} fill="#2f3f63" stroke={OUTLINE} strokeWidth={4} />
      <rect x={4} y={-70} width={22} height={70} rx={8} fill="#2f3f63" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-34} y={-8} width={30} height={12} rx={6} fill={OUTLINE} />
      <rect x={4} y={-8} width={30} height={12} rx={6} fill={OUTLINE} />
      {/* Kollar */}
      <g transform={`rotate(${armL} -40 -146)`}>
        <rect x={-54} y={-150} width={18} height={74} rx={9} fill={shirt} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-45} cy={-74} r={10} fill={skin} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <g transform={`rotate(${armR} 40 -146)`}>
        <rect x={36} y={-150} width={18} height={74} rx={9} fill={shirt} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={45} cy={-74} r={10} fill={skin} stroke={OUTLINE} strokeWidth={4} />
      </g>
      {/* Gövde */}
      <g transform={`translate(0 ${breathe * 0.4})`}>
        <rect x={-42} y={-158} width={84} height={96} rx={20} fill={shirt} stroke={OUTLINE} strokeWidth={5} />
        {print === "face" ? (
          <g transform="translate(0 -112)">
            <path d="M 0 22 C -40 -2 -30 -36 -8 -30 Q 0 -28 0 -18 Q 0 -28 8 -30 C 30 -36 40 -2 0 22 Z" fill="#ff8fb5" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={0} cy={-6} r={14} fill="#ffe08a" stroke={OUTLINE} strokeWidth={3} />
            <path d="M -14 -10 Q -12 -26 0 -24 Q 12 -26 14 -10 Q 6 -18 0 -16 Q -6 -18 -14 -10 Z" fill="#a0522d" stroke={OUTLINE} strokeWidth={2} />
            <path d="M -6 0 Q 0 6 6 0" fill="none" stroke={OUTLINE} strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={-5} cy={-6} r={2} fill={OUTLINE} />
            <circle cx={5} cy={-6} r={2} fill={OUTLINE} />
          </g>
        ) : null}
        {print === "star" ? (
          <path
            transform="translate(0 -110)"
            d="M 0 -26 L 8 -8 L 27 -8 L 12 4 L 18 23 L 0 12 L -18 23 L -12 4 L -27 -8 L -8 -8 Z"
            fill={YELLOW}
            stroke={OUTLINE}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        ) : null}
        {stain > 0 ? (
          <path
            transform={`translate(6 -112) scale(${stain})`}
            d="M -24 -10 Q -30 -30 -6 -26 Q 10 -40 22 -22 Q 38 -14 26 4 Q 34 24 12 22 Q 2 40 -12 24 Q -34 26 -28 6 Q -40 -2 -24 -10 Z"
            fill={COFFEE}
            opacity={0.9}
          />
        ) : null}
        {/* Boyun + kafa */}
        <rect x={-9} y={-170} width={18} height={14} fill={skin} />
        <circle cx={0} cy={-205} r={42} fill={skin} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -42 -208 Q -42 -252 0 -250 Q 42 -252 42 -210 Q 26 -228 4 -226 Q -20 -232 -42 -208 Z" fill={hair} stroke={OUTLINE} strokeWidth={4} />
        {/* Gözler */}
        {mood === "cool" ? (
          <g>
            <rect x={-32} y={-214} width={28} height={18} rx={6} fill={INK} stroke={OUTLINE} strokeWidth={3} />
            <rect x={4} y={-214} width={28} height={18} rx={6} fill={INK} stroke={OUTLINE} strokeWidth={3} />
            <path d="M -4 -208 L 4 -208" stroke={OUTLINE} strokeWidth={4} />
            <path d="M -26 -210 L -18 -210" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
          </g>
        ) : mood === "panic" || mood === "shock" ? (
          <g>
            <circle cx={-15} cy={-208} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={15} cy={-208} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={-15 + px} cy={-208 + py} r={4.5} fill={OUTLINE} />
            <circle cx={15 + px} cy={-208 + py} r={4.5} fill={OUTLINE} />
          </g>
        ) : mood === "happy" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round">
            <path d="M -22 -206 Q -15 -214 -8 -206" />
            <path d="M 8 -206 Q 15 -214 22 -206" />
          </g>
        ) : (
          <g>
            <circle cx={-15 + px} cy={-208 + py} r={5} fill={OUTLINE} />
            <circle cx={15 + px} cy={-208 + py} r={5} fill={OUTLINE} />
          </g>
        )}
        {mood === "angry" ? (
          <path d="M -26 -226 L -6 -218 M 26 -226 L 6 -218" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : null}
        {/* Yanaklar */}
        <ellipse cx={-26} cy={-190} rx={10} ry={6} fill="#ff6b8b" opacity={0.75 * blush} />
        <ellipse cx={26} cy={-190} rx={10} ry={6} fill="#ff6b8b" opacity={0.75 * blush} />
        {/* Ağız */}
        {mood === "panic" ? (
          <path d="M -12 -180 Q -6 -186 0 -180 Q 6 -174 12 -180" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : mood === "shock" ? (
          <ellipse cx={0} cy={-180} rx={7} ry={9} fill={OUTLINE} />
        ) : mood === "blush" ? (
          <path d="M -9 -180 L 9 -180" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : mood === "angry" ? (
          <path d="M -12 -176 Q 0 -188 12 -176" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : (
          <path d="M -12 -184 Q 0 -172 12 -184" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        )}
        {/* Ter damlası */}
        {mood === "panic" || mood === "blush" ? (
          <path
            transform={`translate(44 ${-232 + ((frame % 40) / 40) * 22})`}
            d="M 0 -12 Q 9 2 0 8 Q -9 2 0 -12 Z"
            fill="#9fdcff"
            stroke={OUTLINE}
            strokeWidth={3}
          />
        ) : null}
      </g>
      {/* Telefon */}
      {phone ? (
        <g transform="translate(0 -96)">
          <rect x={-18} y={-28} width={36} height={52} rx={6} fill={INK} stroke={OUTLINE} strokeWidth={3} />
          <rect x={-13} y={-22} width={26} height={38} rx={3} fill="#9fd3f2" opacity={0.7 + 0.3 * Math.sin(frame / 6)} />
        </g>
      ) : null}
    </g>
  );
};

// Hayali "bakan göz" simgesi
const Eye: React.FC<{ x: number; y: number; size?: number; delay?: number; look?: number }> = ({ x, y, size = 1, delay = 0, look = 0 }) => {
  const a = useAppear(delay);
  const frame = useCurrentFrame();
  const blink = (frame + delay * 7) % 70 > 66 ? 0.15 : 1;
  return (
    <g transform={place(x, y, size * a)}>
      <g transform={`scale(1 ${blink})`}>
        <path d="M -40 0 Q 0 -34 40 0 Q 0 34 -40 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={look * 10} cy={0} r={14} fill="#5a8be0" stroke={OUTLINE} strokeWidth={3} />
        <circle cx={look * 10} cy={0} r={6} fill={OUTLINE} />
        <circle cx={look * 10 + 5} cy={-5} r={3} fill="#fff" />
      </g>
    </g>
  );
};

// Tepeden inen ışık konisi
const Cone: React.FC<{ x: number; floorY: number; top?: number; width?: number; sway?: number; color?: string; opacity?: number }> = ({
  x,
  floorY,
  top = -10,
  width = 170,
  sway = 0,
  color = "#fff6a8",
  opacity = 0.45,
}) => (
  <g transform={`rotate(${sway} ${x} ${top})`}>
    <path d={`M ${x - 22} ${top} L ${x + 22} ${top} L ${x + width} ${floorY} L ${x - width} ${floorY} Z`} fill={color} opacity={opacity} />
    <ellipse cx={x} cy={floorY} rx={width} ry={22} fill={color} opacity={opacity + 0.15} />
  </g>
);

const Stage: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={STAGE} />
    <rect x={0} y={470} width={900} height={90} fill="#5a2d4a" stroke={OUTLINE} strokeWidth={5} />
    <path d="M 0 0 L 110 0 Q 90 200 120 470 L 0 470 Z" fill="#c7264a" stroke={OUTLINE} strokeWidth={5} />
    <path d="M 900 0 L 790 0 Q 810 200 780 470 L 900 470 Z" fill="#c7264a" stroke={OUTLINE} strokeWidth={5} />
    <path d="M 30 0 Q 20 230 40 470 M 70 0 Q 60 230 80 470 M 870 0 Q 880 230 860 470 M 830 0 Q 840 230 820 470" fill="none" stroke="#9c1a38" strokeWidth={5} />
  </g>
);

// Projektör
const Projector: React.FC<{ x: number; y: number; sway?: number }> = ({ x, y, sway = 0 }) => (
  <g transform={place(x, y, 1, sway)}>
    <rect x={-6} y={-40} width={12} height={30} fill="#555" />
    <rect x={-34} y={-14} width={68} height={40} rx={8} fill="#3a3f4b" stroke={OUTLINE} strokeWidth={5} />
    <ellipse cx={0} cy={28} rx={26} ry={8} fill="#fff6a8" stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// Konuşma balonu (beyaz kutu + kuyruk aşağıda)
const Speech: React.FC<{ x: number; y: number; w: number; text: string; color?: string; delay?: number; tail?: number }> = ({
  x,
  y,
  w,
  text,
  color = INK,
  delay = 0,
  tail = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <path d={`M ${tail - 18} 34 L ${tail + 6} 70 L ${tail + 22} 34 Z`} fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-w / 2} y={-38} width={w} height={76} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={tail - 16} y={26} width={36} height={10} fill="#fff" />
      <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={color}>
        {text}
      </text>
    </g>
  );
};

// Küçük insan simgesi (grafikler için)
const MiniPerson: React.FC<{ x: number; y: number; on: number; color?: string }> = ({ x, y, on, color = RED }) => (
  <g transform={place(x, y, 1 + on * 0.12)}>
    <circle cx={0} cy={-22} r={14} fill={on > 0.5 ? color : "#e6dde2"} stroke={OUTLINE} strokeWidth={4} />
    <path d="M -22 22 Q -22 -4 0 -4 Q 22 -4 22 22 Z" fill={on > 0.5 ? color : "#e6dde2"} stroke={OUTLINE} strokeWidth={4} />
    {on > 0.5 ? (
      <g>
        <circle cx={-5} cy={-23} r={2.5} fill="#fff" />
        <circle cx={5} cy={-23} r={2.5} fill="#fff" />
      </g>
    ) : null}
  </g>
);

const Cup: React.FC<{ x: number; y: number; rotate?: number }> = ({ x, y, rotate = 0 }) => (
  <g transform={place(x, y, 1, rotate)}>
    <path d="M -20 -26 L 20 -26 L 15 24 L -15 24 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-22} y={-34} width={44} height={10} rx={4} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
    <rect x={-17} y={-6} width={34} height={12} fill={PINK} />
  </g>
);

// 1) Kahveyi döktün, herkes bakıyor (sanıyorsun)
const SpillPanic: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const fall = useProgress(6, 22);
  const stain = useProgress(14, 34);
  const d = Math.round(durationInFrames * 0.2);
  const eyes: [number, number][] = [
    [90, 80],
    [820, 300],
    [250, 250],
    [660, 230],
    [120, 330],
    [860, 210],
  ];
  return (
    <g>
      <PinkRoom />
      <Kid x={150} y={520} scale={0.72} shirt={GREEN} hair="#2a1d14" look={1} mood="calm" delay={2} />
      <Kid x={760} y={520} scale={0.72} shirt={PURPLE} hair="#7a3b1d" look={-1} mood="calm" delay={4} />
      <Kid x={450} y={520} scale={1.05} print="none" stain={stain} mood={frame > 18 ? "panic" : "calm"} look={0} />
      {fall < 1 ? <Cup x={500 + fall * 40} y={340 + fall * 170} rotate={fall * 140} /> : <Cup x={540} y={505} rotate={95} />}
      {eyes.map(([ex, ey], i) => (
        <Eye key={i} x={ex} y={ey} size={0.9} delay={d + i * 6} look={ex < 450 ? 1 : -1} />
      ))}
      <Chip x={450} y={48} text="HERKES BAKIYOR!" dark delay={d + 20} />
    </g>
  );
};

// 2) Spot ışığı: sahnede tek başına
const Spotlight: Visual = ({ durationInFrames }) => {
  const sway = useWave(90, 4);
  const d = Math.round(durationInFrames * 0.35);
  return (
    <g>
      <Stage />
      <Cone x={450} floorY={460} top={40} width={190} sway={sway} />
      <Projector x={450} y={40} sway={sway} />
      <Kid x={450 + sway * 6} y={460} scale={1} shirt={BLUE} mood="blush" />
      <Sparkles points={[[300, 140], [610, 120], [250, 320], [660, 300]]} />
      <Chip x={450} y={515} text="SPOT IŞIĞI ETKİSİ" delay={d} />
    </g>
  );
};

// 3) Cornell deneyi: utanç verici tişörtle odaya gir
const ShirtRoom: Visual = ({ durationInFrames }) => {
  const walk = useProgress(10, Math.round(durationInFrames * 0.45));
  const d = Math.round(durationInFrames * 0.5);
  const gx = 140 + walk * 200;
  return (
    <g>
      <PinkRoom picture={false} />
      <Door x={40} floorY={520} openFrom={0} openTo={10} />
      <Kid x={560} y={520} scale={0.72} shirt={GREEN} hair="#2a1d14" mood="calm" look={-1} delay={2} />
      <Kid x={670} y={520} scale={0.72} shirt={ORANGE} hair="#1d1d1d" mood="happy" look={1} delay={4} />
      <Kid x={790} y={520} scale={0.72} shirt={PURPLE} hair="#7a3b1d" mood="calm" phone delay={6} />
      <Kid x={gx} y={520} scale={0.95} shirt="#fff7d6" print="face" mood="blush" look={1} />
      <NamePlate x={460} y={80} text="UTANÇ VERİCİ TİŞÖRT" delay={d} />
      <Arrow from={[460, 108]} to={[gx + 40, 400]} progress={useProgress(d + 6, d + 20)} color={RED} />
    </g>
  );
};

// 4) Tahmin: odanın yarısı fark etti
const GuessHalf: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.18);
  const step = Math.max(4, Math.round(durationInFrames * 0.06));
  return (
    <g>
      <Paper />
      <Kid x={170} y={540} scale={1} shirt="#fff7d6" print="face" mood="blush" look={1} />
      <Chip x={170} y={70} text="TAHMİN" dark delay={4} />
      <ThoughtBubble x={590} y={240} r={175} delay={d - 6}>
        {Array.from({ length: 10 }).map((_, i) => (
          <MiniPerson key={i} x={-136 + (i % 5) * 68} y={i < 5 ? -70 : 10} on={i < 5 && frame > d + i * step ? 1 : 0} />
        ))}
        <text y={105} fontFamily={uiFont} fontWeight={800} fontSize={46} textAnchor="middle" fill={RED} opacity={frame > d + 5 * step ? 1 : 0}>
          ≈ YARISI!
        </text>
      </ThoughtBubble>
    </g>
  );
};

// 5) Gerçek: dörtte birden az
const RealityQuarter: Visual = ({ durationInFrames }) => {
  const g1 = useProgress(6, 26);
  const g2 = useProgress(Math.round(durationInFrames * 0.3), Math.round(durationInFrames * 0.3) + 22);
  const base = 450;
  const h1 = 300 * g1;
  const h2 = 138 * g2;
  const d = Math.round(durationInFrames * 0.3) + 24;
  return (
    <g>
      <Paper />
      <line x1={120} y1={base} x2={780} y2={base} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <line x1={140} y1={base - 300} x2={760} y2={base - 300} stroke="#c9a9b6" strokeWidth={4} strokeDasharray="14 12" />
      <rect x={210} y={base - h1} width={170} height={h1} rx={10} fill="#ffb3cb" stroke={OUTLINE} strokeWidth={5} />
      <rect x={520} y={base - h2} width={170} height={h2} rx={10} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
      <text x={295} y={base - h1 - 18} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK} opacity={g1}>
        YARISI
      </text>
      <text x={605} y={base - h2 - 18} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={RED} opacity={g2}>
        DÖRTTE BİRDEN AZ
      </text>
      <text x={295} y={base + 48} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={INK}>
        TAHMİN
      </text>
      <text x={605} y={base + 48} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={INK}>
        GERÇEK
      </text>
      <Kid x={820} y={548} scale={0.5} shirt="#fff7d6" print="face" mood="shock" look={-1} delay={d} />
      <Sparkles points={[[700, 230], [780, 200]]} color={RED} />
    </g>
  );
};

// Utanç göstergesi
const Meter: React.FC<{ x: number; y: number; level: number }> = ({ x, y, level }) => (
  <g transform={place(x, y, 1)}>
    <rect x={-26} y={-200} width={52} height={220} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-16} y={10 - 200 * level} width={32} height={200 * level} rx={16} fill={RED} />
    <text y={56} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={INK}>
      UTANÇ
    </text>
  </g>
);

// 6) Neden: kendi hissini herkese yansıtmak
const SelfAnchor: Visual = ({ durationInFrames }) => {
  const level = useProgress(4, 30);
  const d = Math.round(durationInFrames * 0.35);
  const shake = useWave(6, level > 0.9 ? 2 : 0);
  return (
    <g>
      <Paper />
      <Meter x={70} y={300} level={level} />
      <g transform={`translate(${shake} 0)`}>
        <Kid x={230} y={530} scale={0.95} shirt="#fff7d6" print="face" mood="blush" look={1} />
      </g>
      <Arrow from={[330, 240]} to={[470, 240]} progress={useProgress(d - 14, d)} color={RED} />
      <Kid x={560} y={530} scale={0.7} shirt={GREEN} hair="#2a1d14" phone mood="calm" delay={6} />
      <Kid x={690} y={530} scale={0.7} shirt={ORANGE} hair="#1d1d1d" mood="happy" delay={8} />
      <Kid x={820} y={530} scale={0.7} shirt={PURPLE} hair="#7a3b1d" mood="calm" look={-1} delay={10} />
      <ThoughtBubble x={600} y={210} r={44} delay={d}>
        <g>
          <rect x={-14} y={-24} width={28} height={46} rx={5} fill={INK} />
          <rect x={-10} y={-19} width={20} height={32} rx={2} fill="#9fd3f2" />
        </g>
      </ThoughtBubble>
      <ThoughtBubble x={720} y={150} r={44} delay={d + 8}>
        <g strokeLinejoin="round">
          <path d="M -22 -18 L 22 -18 L 0 26 Z" fill="#ffd36b" stroke={OUTLINE} strokeWidth={4} />
          <rect x={-24} y={-24} width={48} height={10} rx={5} fill="#d98a3d" stroke={OUTLINE} strokeWidth={3} />
          <circle cx={-6} cy={-6} r={4} fill={RED} />
          <circle cx={6} cy={4} r={4} fill={RED} />
        </g>
      </ThoughtBubble>
      <ThoughtBubble x={835} y={215} r={44} delay={d + 16}>
        <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={INK}>
          SINAV
        </text>
      </ThoughtBubble>
      <Chip x={450} y={50} text="HERKES FARK ETTİ Mİ?" dark delay={d + 24} />
    </g>
  );
};

// 7) Utanç vermeyen tişört de aynı
const CoolShirt: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  return (
    <g>
      <PinkRoom window="day" />
      <Kid x={300} y={520} scale={1} shirt="#ffffff" print="star" mood="cool" />
      <Sparkles points={[[250, 360], [350, 330], [300, 300]]} />
      <ThoughtBubble x={500} y={175} r={80} delay={d}>
        <g transform="translate(-34 -6) scale(0.55)">
          <path d="M -40 0 Q 0 -34 40 0 Q 0 34 -40 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} />
          <circle r={14} fill={OUTLINE} />
        </g>
        <g transform="translate(30 -6) scale(0.55)">
          <path d="M -40 0 Q 0 -34 40 0 Q 0 34 -40 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} />
          <circle r={14} fill={OUTLINE} />
        </g>
        <text y={50} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={RED}>
          HERKES!
        </text>
      </ThoughtBubble>
      <Kid x={640} y={520} scale={0.72} shirt={GREEN} hair="#2a1d14" phone mood="calm" delay={4} />
      <Kid x={790} y={520} scale={0.72} shirt={ORANGE} hair="#1d1d1d" mood="happy" look={1} delay={6} />
      <Chip x={600} y={48} text="UTANÇ YOK, YİNE DE!" delay={d + 20} />
    </g>
  );
};

// 8) 15 dakika bekleyince alışmak
const WaitClock: Visual = ({ durationInFrames }) => {
  const p = useProgress(6, Math.round(durationInFrames * 0.7));
  const ang = p * 90;
  const cx = 620;
  const cy = 250;
  const r = 170;
  const rad = ((ang - 90) * Math.PI) / 180;
  const ex = cx + Math.cos(rad) * r * 0.92;
  const ey = cy + Math.sin(rad) * r * 0.92;
  const blush = interpolate(p, [0.4, 0.9], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <g>
      <Paper />
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={OUTLINE} strokeWidth={8} />
      {p > 0 ? <path d={`M ${cx} ${cy} L ${cx} ${cy - r * 0.92} A ${r * 0.92} ${r * 0.92} 0 0 1 ${ex} ${ey} Z`} fill="#ffc2d6" /> : null}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * (r - 14)}
            y1={cy + Math.sin(a) * (r - 14)}
            x2={cx + Math.cos(a) * (r - 34)}
            y2={cy + Math.sin(a) * (r - 34)}
            stroke={OUTLINE}
            strokeWidth={i % 3 === 0 ? 8 : 4}
            strokeLinecap="round"
          />
        );
      })}
      <line x1={cx} y1={cy} x2={cx + Math.cos(rad) * r * 0.75} y2={cy + Math.sin(rad) * r * 0.75} stroke={RED} strokeWidth={10} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx} y2={cy - r * 0.45} stroke={OUTLINE} strokeWidth={12} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={12} fill={OUTLINE} />
      <Kid x={210} y={530} scale={1} shirt="#fff7d6" print="face" mood={p > 0.7 ? "happy" : "blush"} blushAmount={blush} />
      <Chip x={cx} y={490} text="15 DAKİKA" dark delay={10} />
      {p > 0.85 ? <Chip x={210} y={60} text="ALIŞTIM!" delay={Math.round(durationInFrames * 0.6)} /> : null}
    </g>
  );
};

// 9) Hatalarımız sandığımız kadar sert yargılanmıyor
const MildJudge: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  return (
    <g>
      <rect width={450} height={560} fill="#ffe1e6" />
      <rect x={450} width={450} height={560} fill="#e6f7ea" />
      <line x1={450} y1={20} x2={450} y2={540} stroke={OUTLINE} strokeWidth={6} strokeDasharray="18 14" />
      <NamePlate x={225} y={44} text="SANDIĞIN" delay={2} />
      <NamePlate x={675} y={44} text="GERÇEK" delay={d} />
      <Kid x={225} y={530} scale={0.85} shirt={PURPLE} hair="#7a3b1d" mood="angry" delay={4} />
      <Speech x={225} y={170} w={300} text="REZİL OLDU!" color={RED} delay={10} tail={-10} />
      <Kid x={675} y={530} scale={0.85} shirt={GREEN} hair="#2a1d14" mood="happy" delay={d} />
      <Speech x={675} y={170} w={300} text="OLUR ÖYLE!" color="#1f8a4c" delay={d + 8} tail={-10} />
    </g>
  );
};

// 10) Herkes kendi spot ışığında
const EveryoneSpot: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const xs = [150, 350, 550, 750];
  const shirts = [GREEN, ORANGE, PURPLE, BLUE];
  const hairs = ["#2a1d14", "#1d1d1d", "#7a3b1d", "#4a2f1d"];
  const moods: Mood[] = ["blush", "panic", "calm", "blush"];
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={900} height={560} fill={STAGE} />
      <rect x={0} y={460} width={900} height={100} fill="#5a2d4a" />
      {xs.map((x, i) => (
        <Cone key={`c${i}`} x={x} floorY={450} top={-10} width={95} sway={Math.sin((frame + i * 20) / 18) * 3} opacity={0.4} />
      ))}
      {xs.map((x, i) => (
        <Kid key={`k${i}`} x={x} y={450} scale={0.72} shirt={shirts[i]} hair={hairs[i]} mood={moods[i]} phone={i === 2} delay={4 + i * 6} />
      ))}
      <Chip x={450} y={515} text="HERKES KENDİ IŞIĞINDA" delay={d} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const w = useWave(40, 3);
  const items = ["KAHVE DÖKÜNCE", "TÖKEZLEYİNCE", "SUNUM YAPARKEN"];
  const colors = [COFFEE, PINK, PURPLE];
  return (
    <g>
      <Paper />
      <Kid x={170} y={540} scale={1} shirt={BLUE} mood="happy" wave />
      <QuestionMark x={330} y={120} size={80} delay={d + 30} />
      {items.map((c, i) => (
        <g key={i} transform={place(620, 100 + i * 120, useAppear(d + i * 10), i % 2 ? w : -w)}>
          <rect x={-200} y={-42} width={400} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <circle cx={-158} cy={0} r={18} fill={colors[i]} stroke={OUTLINE} strokeWidth={4} />
          <text x={22} y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
            {c}?
          </text>
        </g>
      ))}
      <Chip x={620} y={480} text="YORUMLARA YAZ!" dark delay={d + 36} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  SpillPanic,
  Spotlight,
  ShirtRoom,
  GuessHalf,
  RealityQuarter,
  SelfAnchor,
  CoolShirt,
  WaitClock,
  MildJudge,
  EveryoneSpot,
  YourTurn,
};
