// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Bulaşıcı gülme — biri gülünce neden sen de gülüyorsun? (2026-11-15-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  Brain,
  BigText,
  Chip,
  Heart,
  INK,
  NamePlate,
  place,
  QuestionMark,
  RED,
  Room,
  Sparkles,
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

type Mood = "panic" | "blush" | "happy" | "calm" | "cool" | "shock" | "angry" | "laugh";

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
  const breathe = mood === "laugh" ? Math.sin(frame / 2.2) * 5 : Math.sin(frame / 14) * 1.5;
  const armL = wave ? -150 + Math.sin(frame / 5) * 18 : phone ? -40 : 8;
  const armR = phone ? 40 : -8;
  const px = look * 5;
  const py = phone ? 5 : 0;
  const blush = blushAmount ?? (mood === "blush" || mood === "panic" || mood === "laugh" ? 1 : 0);
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
        ) : mood === "happy" || mood === "laugh" ? (
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
        {mood === "laugh" ? (
          <g>
            <path d="M -18 -192 Q 0 -194 18 -192 Q 16 -168 0 -168 Q -16 -168 -18 -192 Z" fill="#8a1f3d" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
            <path d="M -15 -191 L 15 -191 L 13 -185 L -13 -185 Z" fill="#fff" />
            <ellipse cx={0} cy={-173} rx={8} ry={3.5} fill="#ff7d9c" />
          </g>
        ) : mood === "panic" ? (
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

// Uçuşan "HA" yazısı
const Ha: React.FC<{ x: number; y: number; delay?: number; size?: number; color?: string; text?: string; rot?: number }> = ({
  x,
  y,
  delay = 0,
  size = 46,
  color = YELLOW,
  text = "HA",
  rot = 0,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay, 12);
  const t = Math.max(0, frame - delay);
  const rise = -((t % 45) / 45) * 26;
  const wob = Math.sin(t / 5) * 6;
  return (
    <text
      transform={place(x, y + rise * (frame > delay ? 1 : 0), a, rot + wob)}
      fontFamily={uiFont}
      fontWeight={900}
      fontSize={size}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={color}
      stroke={OUTLINE}
      strokeWidth={size * 0.09}
      paintOrder="stroke"
    >
      {text}
    </text>
  );
};

// Kanepe
const Couch: React.FC<{ x: number; y: number; w?: number; color?: string }> = ({ x, y, w = 520, color = "#6fc3c9" }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-170} width={w} height={110} rx={30} fill={color} stroke={OUTLINE} strokeWidth={5} />
    <rect x={-w / 2 - 20} y={-90} width={w + 40} height={70} rx={24} fill={color} stroke={OUTLINE} strokeWidth={5} />
    <rect x={-w / 2 - 34} y={-130} width={50} height={110} rx={20} fill="#58aab0" stroke={OUTLINE} strokeWidth={5} />
    <rect x={w / 2 - 16} y={-130} width={50} height={110} rx={20} fill="#58aab0" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-w / 2} y={-20} width={16} height={20} fill={OUTLINE} />
    <rect x={w / 2 - 16} y={-20} width={16} height={20} fill={OUTLINE} />
  </g>
);

// Ses dalgaları
const Waves: React.FC<{ x: number; y: number; dir?: 1 | -1; color?: string; n?: number }> = ({ x, y, dir = 1, color = PINK, n = 3 }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const ph = ((frame / 20 + i / n) % 1);
        const r = 20 + ph * 70;
        return (
          <path
            key={i}
            d={`M ${x + dir * r * 0.5} ${y - r} Q ${x + dir * r * 1.1} ${y} ${x + dir * r * 0.5} ${y + r}`}
            fill="none"
            stroke={color}
            strokeWidth={7}
            strokeLinecap="round"
            opacity={1 - ph}
          />
        );
      })}
    </g>
  );
};

// 1) Arkadaşın gülüyor, sen de gülmeye başlıyorsun
const FriendLaughs: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const sw = Math.round(durationInFrames * 0.45);
  const me: Mood = frame < sw ? (frame < sw * 0.6 ? "calm" : "shock") : "laugh";
  return (
    <g>
      <PinkRoom />
      <Couch x={450} y={500} />
      <Kid x={320} y={470} scale={0.95} shirt={ORANGE} hair="#1d1d1d" mood="laugh" />
      <Kid x={590} y={470} scale={0.95} shirt={BLUE} mood={me} look={-1} />
      <Ha x={210} y={150} delay={6} />
      <Ha x={300} y={95} delay={14} size={56} rot={-10} />
      <Ha x={400} y={150} delay={22} size={40} rot={8} />
      {frame < sw ? <QuestionMark x={700} y={130} size={70} delay={20} /> : null}
      {frame >= sw ? <Ha x={690} y={120} delay={sw} size={58} color={PINK} rot={10} /> : null}
      {frame >= sw ? <Ha x={790} y={170} delay={sw + 8} size={42} color={PINK} rot={-8} /> : null}
    </g>
  );
};

// 2) Gülme yayılıyor
const ContagionWave: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const xs = [110, 280, 450, 620, 790];
  const shirts = [ORANGE, GREEN, PURPLE, BLUE, PINK];
  const hairs = ["#1d1d1d", "#7a3b1d", "#2a1d14", "#4a2f1d", "#c9852e"];
  const step = Math.max(12, Math.round(durationInFrames * 0.11));
  return (
    <g>
      <Paper />
      <rect x={0} y={430} width={900} height={130} fill="#ffd3e1" />
      {xs.map((x, i) => {
        const on = frame >= 4 + i * step;
        return (
          <g key={i}>
            <Kid x={x} y={460} scale={0.68} shirt={shirts[i]} hair={hairs[i]} mood={on ? "laugh" : "calm"} look={-1} delay={i * 3} />
            {on ? <Ha x={x} y={235} delay={4 + i * step} size={40} rot={i % 2 ? 10 : -10} /> : null}
          </g>
        );
      })}
      <Arrow from={[90, 120]} to={[810, 120]} progress={useProgress(4, 4 + step * 4)} color={PINK} />
      <Chip x={450} y={510} text="BULAŞICI GÜLME" dark delay={4 + step * 4} />
    </g>
  );
};

// 3) Beyin tarayıcısında kahkaha dinlemek
const BrainScan: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const slide = useProgress(0, 24);
  return (
    <g>
      <Paper fill="#eef3fb" />
      <rect x={0} y={440} width={900} height={120} fill="#cfd9e8" />
      {/* Yatak */}
      <g transform={`translate(${-80 + slide * 80} 0)`}>
        <rect x={90} y={350} width={430} height={34} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={140} y={384} width={20} height={70} fill="#9aa7bb" stroke={OUTLINE} strokeWidth={4} />
        {/* Uzanan kişi */}
        <rect x={170} y={310} width={250} height={44} rx={20} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
        <rect x={110} y={318} width={70} height={30} rx={12} fill="#2f3f63" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={455} cy={318} r={36} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M 470 290 Q 495 300 490 330 Q 480 312 462 310 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={3} />
        <path d="M 432 300 Q 455 270 480 298" fill="none" stroke={INK} strokeWidth={7} />
        <rect x={420} y={300} width={18} height={30} rx={6} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
        <path d="M 445 330 Q 455 338 465 330" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      </g>
      {/* Tarayıcı */}
      <g>
        <rect x={470} y={120} width={330} height={330} rx={60} fill="#e9edf3" stroke={OUTLINE} strokeWidth={6} />
        <circle cx={600} cy={300} r={95} fill="#3b4558" stroke={OUTLINE} strokeWidth={6} />
        <circle cx={600} cy={300} r={70} fill="#5c6a82" />
        <rect x={690} y={150} width={80} height={18} rx={9} fill={PINK} opacity={0.6 + 0.4 * Math.sin(useCurrentFrame() / 5)} />
      </g>
      <Waves x={420} y={200} dir={-1} />
      <Ha x={250} y={190} delay={d} size={50} color={YELLOW} />
      <Ha x={330} y={120} delay={d + 10} size={40} color={YELLOW} rot={-10} />
      <NamePlate x={200} y={500} text="UCL · LONDRA" delay={8} />
      <Chip x={650} y={500} text="BEYİN TARAMASI" delay={d + 16} />
    </g>
  );
};

// Büyük yüz (gülümseme oranı 0..1)
const BigFace: React.FC<{ x: number; y: number; smile: number; scale?: number }> = ({ x, y, smile, scale = 1 }) => {
  const curve = 6 + smile * 40;
  const open = smile > 0.7;
  return (
    <g transform={place(x, y, scale)}>
      <circle r={120} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -120 -20 Q -120 -132 0 -128 Q 120 -132 120 -20 Q 80 -80 10 -76 Q -60 -86 -120 -20 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={5} />
      {smile > 0.6 ? (
        <g fill="none" stroke={OUTLINE} strokeWidth={7} strokeLinecap="round">
          <path d="M -60 -6 Q -42 -26 -24 -6" />
          <path d="M 24 -6 Q 42 -26 60 -6" />
        </g>
      ) : (
        <g>
          <circle cx={-42} cy={-10} r={11} fill={OUTLINE} />
          <circle cx={42} cy={-10} r={11} fill={OUTLINE} />
        </g>
      )}
      <ellipse cx={-70} cy={34} rx={20} ry={12} fill="#ff6b8b" opacity={0.7 * smile} />
      <ellipse cx={70} cy={34} rx={20} ry={12} fill="#ff6b8b" opacity={0.7 * smile} />
      {open ? (
        <path d="M -50 40 Q 0 44 50 40 Q 44 100 0 100 Q -44 100 -50 40 Z" fill="#8a1f3d" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      ) : (
        <path d={`M -46 50 Q 0 ${50 + curve} 46 50`} fill="none" stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" />
      )}
      {open ? <path d="M -42 42 L 42 42 L 38 56 L -38 56 Z" fill="#fff" /> : null}
    </g>
  );
};

// 4) Beynin yüz kaslarını hazırlayan bölgesi çalışıyor
const FaceMuscles: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.2);
  const glow = useProgress(d, d + 20);
  const arrow = useProgress(d + 20, d + 45);
  const smile = useProgress(d + 30, d + 55);
  const pulse = 1 + Math.sin(frame / 4) * 0.12;
  return (
    <g>
      <Paper />
      <Brain x={220} y={270} scale={1.25} delay={2} />
      <circle cx={190} cy={160} r={44 * pulse * glow} fill={YELLOW} opacity={0.75} stroke={OUTLINE} strokeWidth={4 * glow} />
      <Sparkles points={glow > 0.5 ? [[130, 120], [250, 110], [150, 210]] : []} />
      <Arrow from={[360, 270]} to={[520, 270]} progress={arrow} color={PINK} />
      <BigFace x={680} y={270} smile={smile} scale={1.05} />
      <Chip x={220} y={480} text="HAREKET BÖLGESİ" delay={d} />
      <Chip x={680} y={480} text="GÜLMEYE HAZIR!" dark delay={d + 45} />
    </g>
  );
};

// Hoparlör
const Speaker: React.FC<{ x: number; y: number; color?: string; delay?: number }> = ({ x, y, color = "#3a3f4b", delay = 0 }) => {
  const a = useAppear(delay);
  const frame = useCurrentFrame();
  const thump = 1 + Math.abs(Math.sin(frame / 4)) * 0.06;
  return (
    <g transform={place(x, y, a)}>
      <rect x={-60} y={-90} width={120} height={180} rx={18} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={30} r={38 * thump} fill="#1f232b" stroke="#888" strokeWidth={5} />
      <circle cx={0} cy={-50} r={18} fill="#1f232b" stroke="#888" strokeWidth={4} />
    </g>
  );
};

// 5) Neşeli ses daha güçlü tepki
const SoundCompare: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const g1 = useProgress(d, d + 35);
  const g2 = useProgress(d, d + 35);
  const hL = 260 * g1;
  const hR = 140 * g2;
  return (
    <g>
      <Paper />
      <rect x={0} y={450} width={900} height={110} fill="#ffd3e1" />
      {/* Sol: neşeli */}
      <Speaker x={140} y={330} delay={2} />
      <Ha x={150} y={170} delay={6} size={54} />
      <Ha x={230} y={120} delay={14} size={40} rot={10} />
      <rect x={260} y={440 - hL} width={90} height={hL} rx={10} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
      <Sparkles points={g1 > 0.9 ? [[250, 150], [360, 160]] : []} />
      {/* Sağ: çığlık */}
      <Speaker x={570} y={330} color="#5a5f6b" delay={8} />
      <Ha x={580} y={170} delay={12} size={44} text="AAA!" color="#c9c3d6" />
      <rect x={690} y={440 - hR} width={90} height={hR} rx={10} fill="#a59bb8" stroke={OUTLINE} strokeWidth={5} />
      <line x1={230} y1={440} x2={820} y2={440} stroke={OUTLINE} strokeWidth={5} />
      <Chip x={210} y={505} text="NEŞELİ" delay={d} />
      <Chip x={640} y={505} text="ÇIĞLIK" dark delay={d + 6} />
    </g>
  );
};

// 6) Yalnızken az, birlikteyken 30 kat
const AloneVsTogether: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  return (
    <g>
      <Paper />
      <rect x={0} y={0} width={330} height={560} fill="#e9e3f2" />
      <line x1={330} y1={0} x2={330} y2={560} stroke={OUTLINE} strokeWidth={5} strokeDasharray="16 12" />
      <Kid x={165} y={430} scale={0.85} shirt={PURPLE} mood="calm" delay={2} />
      <Ha x={235} y={150} delay={12} size={34} text="ha" color="#c9c3d6" />
      <Chip x={165} y={495} text="YALNIZ" dark delay={6} />
      <Kid x={480} y={430} scale={0.78} shirt={ORANGE} hair="#1d1d1d" mood="laugh" delay={8} />
      <Kid x={620} y={430} scale={0.78} shirt={GREEN} hair="#7a3b1d" mood="laugh" delay={12} />
      <Kid x={760} y={430} scale={0.78} shirt={BLUE} mood="laugh" delay={16} />
      <Ha x={520} y={150} delay={14} size={44} />
      <Ha x={700} y={130} delay={20} size={50} rot={10} />
      <BigText x={620} y={70} text="× 30" size={90} color={PINK} delay={d} />
      <Chip x={620} y={495} text="BİRLİKTE" delay={10} />
    </g>
  );
};

// 7) Espri değil, sıradan cümle
const BanalRemark: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const laughing = frame >= d + 14;
  const cross = useProgress(10, 26);
  return (
    <g>
      <PinkRoom window={false} />
      <Kid x={300} y={500} scale={0.95} shirt={GREEN} hair="#7a3b1d" mood={laughing ? "laugh" : "happy"} />
      <Kid x={600} y={500} scale={0.95} shirt={PINK} hair="#1d1d1d" mood={laughing ? "laugh" : "calm"} look={-1} />
      {/* Üstü çizili "ESPRİ" kartı */}
      <g transform={place(720, 90, useAppear(2), 6)}>
        <rect x={-95} y={-36} width={190} height={72} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={INK}>
          ESPRİ
        </text>
        <line x1={-80} y1={-24} x2={-80 + 160 * cross} y2={-24 + 48 * cross} stroke={RED} strokeWidth={9} strokeLinecap="round" />
      </g>
      <Speech x={300} y={130} w={280} text="EMİN MİSİN?" delay={d} tail={0} />
      {laughing ? <Ha x={470} y={200} delay={d + 14} size={52} /> : null}
      {laughing ? <Ha x={560} y={150} delay={d + 22} size={40} rot={10} /> : null}
    </g>
  );
};

// Komiklik göstergesi 1–7
const Meter: React.FC<{ x: number; y: number; value: number; delay?: number }> = ({ x, y, value, delay = 0 }) => {
  const a = useAppear(delay);
  const w = 300;
  const px = -w / 2 + ((value - 1) / 6) * w;
  return (
    <g transform={place(x, y, a)}>
      <rect x={-w / 2 - 20} y={-60} width={w + 40} height={110} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <text y={-28} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={INK}>
        KOMİKLİK
      </text>
      <rect x={-w / 2} y={-6} width={w} height={22} rx={11} fill="#ffe1ea" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-w / 2} y={-6} width={px + w / 2} height={22} rx={11} fill={PINK} />
      <circle cx={px} cy={5} r={17} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <text x={-w / 2} y={44} fontFamily={uiFont} fontWeight={800} fontSize={20} textAnchor="middle" fill={INK}>
        1
      </text>
      <text x={w / 2} y={44} fontFamily={uiFont} fontWeight={800} fontSize={20} textAnchor="middle" fill={INK}>
        7
      </text>
    </g>
  );
};

// 8) Kötü espriye kahkaha eklemek
const DadJoke: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const val = 2 + useProgress(d + 10, d + 50) * 3;
  return (
    <g>
      <rect width={900} height={560} fill={STAGE} />
      <rect x={0} y={460} width={900} height={100} fill="#5a2d4a" stroke={OUTLINE} strokeWidth={5} />
      <path d="M 210 -10 L 250 -10 L 400 460 L 60 460 Z" fill="#fff6a8" opacity={0.35} />
      <Kid x={230} y={460} scale={0.9} shirt={YELLOW} hair="#4a2f1d" mood={frame >= d + 10 ? "happy" : "blush"} />
      {/* Mikrofon */}
      <line x1={300} y1={460} x2={300} y2={300} stroke="#999" strokeWidth={6} />
      <rect x={290} y={278} width={20} height={34} rx={9} fill="#444" stroke={OUTLINE} strokeWidth={3} />
      <Speech x={230} y={110} w={280} text="KÖTÜ ESPRİ…" delay={4} tail={0} />
      <Speaker x={780} y={370} delay={d - 4} />
      {frame >= d ? <Waves x={710} y={330} dir={-1} color={YELLOW} /> : null}
      {frame >= d ? <Ha x={600} y={250} delay={d} size={50} text="HA HA!" /> : null}
      <Meter x={620} y={110} value={val} delay={d + 4} />
    </g>
  );
};

// 9) Gerçek kahkaha yapmacıktan etkili
const RealVsFake: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const w = useWave(30, 4);
  return (
    <g>
      <Paper />
      <rect x={0} y={450} width={900} height={110} fill="#ffd3e1" />
      <Kid x={250} y={440} scale={1} shirt={PINK} hair="#1d1d1d" mood="laugh" delay={2} />
      <Sparkles points={[[140, 150], [360, 140], [380, 260]]} />
      <Ha x={360} y={110} delay={10} size={46} />
      <Kid x={650} y={440} scale={1} shirt="#9aa7bb" hair="#4a2f1d" mood="blush" blushAmount={0} delay={6} />
      <Ha x={760} y={120} delay={14} size={34} text="ha. ha." color="#dcd6e6" />
      {/* Madalya */}
      <g transform={place(250, 80 + w, useAppear(d))}>
        <path d="M -20 -40 L 0 0 L 20 -40" fill="none" stroke={RED} strokeWidth={10} />
        <circle cy={20} r={30} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <text y={31} fontFamily={uiFont} fontWeight={900} fontSize={30} textAnchor="middle" fill={INK}>
          1
        </text>
      </g>
      <Chip x={250} y={505} text="İÇTEN" delay={d} />
      <Chip x={650} y={505} text="YAPMACIK" dark delay={d + 6} />
    </g>
  );
};

// 10) Gülmek bağ kurar
const Bonding: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const xs = [170, 360, 550, 740];
  const shirts = [ORANGE, GREEN, PURPLE, BLUE];
  const hairs = ["#1d1d1d", "#7a3b1d", "#2a1d14", "#4a2f1d"];
  const links = [0, 1, 2].map((i) => useProgress(d + i * 10, d + i * 10 + 18));
  return (
    <g>
      <PinkRoom window={false} picture={false} />
      {xs.map((x, i) => (
        <Kid key={i} x={x} y={500} scale={0.72} shirt={shirts[i]} hair={hairs[i]} mood="laugh" delay={i * 4} />
      ))}
      {links.map((p, i) => {
        const x1 = xs[i] + 30;
        const x2 = xs[i + 1] - 30;
        const mid = (x1 + x2) / 2;
        return (
          <g key={`l${i}`} opacity={p > 0 ? 1 : 0}>
            <path
              d={`M ${x1} 380 Q ${mid} ${330} ${x1 + (x2 - x1) * p} 380`}
              fill="none"
              stroke={PINK}
              strokeWidth={10}
              strokeLinecap="round"
            />
            {p > 0.95 ? <Heart x={mid} y={330} size={0.55} beat delay={d + i * 10 + 18} /> : null}
          </g>
        );
      })}
      <Ha x={260} y={140} delay={6} size={40} />
      <Ha x={640} y={130} delay={12} size={44} rot={10} />
      <Chip x={450} y={80} text="SOSYAL YAPIŞTIRICI" dark delay={d + 34} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const w = useWave(40, 3);
  const items = ["EN YAKIN ARKADAŞIN", "KARDEŞİN", "SINIF ARKADAŞIN"];
  const colors = [PINK, ORANGE, PURPLE];
  return (
    <g>
      <Paper />
      <Kid x={170} y={540} scale={1} shirt={BLUE} mood="laugh" wave />
      <QuestionMark x={330} y={120} size={80} delay={d + 30} />
      {items.map((c, i) => (
        <g key={i} transform={place(620, 100 + i * 120, useAppear(d + i * 10), i % 2 ? w : -w)}>
          <rect x={-215} y={-42} width={430} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <circle cx={-172} cy={0} r={18} fill={colors[i]} stroke={OUTLINE} strokeWidth={4} />
          <text x={22} y={11} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={INK}>
            {c}?
          </text>
        </g>
      ))}
      <Chip x={620} y={480} text="ETİKETLE!" dark delay={d + 36} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  FriendLaughs,
  ContagionWave,
  BrainScan,
  FaceMuscles,
  SoundCompare,
  AloneVsTogether,
  BanalRemark,
  DadJoke,
  RealVsFake,
  Bonding,
  YourTurn,
};
