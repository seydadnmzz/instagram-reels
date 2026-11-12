// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Soğan doğrarken gözlerin yaşarması (2026-11-12-aksam)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  Chip,
  INK,
  NamePlate,
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
const PAPER = "#fff1e6";
const KITCHEN = "#ffe6cf";
const SKIN = "#f2c79a";
const ORANGE = "#ff9a3d";
const ONION = "#e9b65c";
const ONION_DARK = "#c98a2e";
const ONION_IN = "#fbf3dc";
const PURPLE = "#8a6cf0";
const BLUE = "#4fb6e8";
const TEAR = "#bfe9ff";
const GREEN = "#7cc26a";
const GAS = "#d4ef8a";
const BOARD = "#d9a066";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Mutfak zemini: duvar fayansları + tezgâh
const Kitchen: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={KITCHEN} />
    {Array.from({ length: 10 }).map((_, i) => (
      <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={420} stroke="#f6d3b2" strokeWidth={4} />
    ))}
    {Array.from({ length: 5 }).map((_, i) => (
      <line key={`h${i}`} x1={0} y1={i * 100} x2={900} y2={i * 100} stroke="#f6d3b2" strokeWidth={4} />
    ))}
    <rect x={-10} y={420} width={920} height={150} fill="#b98a5e" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-10} y={420} width={920} height={22} fill="#d6a878" stroke={OUTLINE} strokeWidth={5} />
  </g>
);

// Bütün soğan; (0,0) merkez, yarıçap ~70
const Onion: React.FC<{ x: number; y: number; scale?: number; delay?: number; rotate?: number; face?: "none" | "smug" | "sad" }> = ({
  x,
  y,
  scale = 1,
  delay = 0,
  rotate = 0,
  face = "none",
}) => {
  const a = useAppear(delay);
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, scale * a, rotate)}>
      <path d="M -6 -66 Q -14 -100 -2 -118 M 4 -66 Q 12 -96 24 -108" fill="none" stroke={GREEN} strokeWidth={8} strokeLinecap="round" />
      <path d="M 0 -72 Q 70 -60 74 6 Q 70 70 0 72 Q -70 70 -74 6 Q -70 -60 0 -72 Z" fill={ONION} stroke={OUTLINE} strokeWidth={6} />
      <path d="M 0 -70 Q 34 -30 30 70 M 0 -70 Q -34 -30 -30 70 M 0 -70 L 0 72" fill="none" stroke={ONION_DARK} strokeWidth={4} />
      <path d="M -10 72 L 0 86 L 10 72" fill="none" stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={-34} cy={-22} rx={10} ry={18} fill="#f7d58d" />
      {face === "smug" ? (
        <g>
          <path d="M -30 0 Q -20 -8 -10 0 M 10 0 Q 20 -8 30 0" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          <path d="M -18 22 Q 0 34 22 18" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          <circle cx={-40} cy={18} r={8} fill="#f59ab0" opacity={0.6 + 0.2 * Math.sin(frame / 8)} />
          <circle cx={40} cy={18} r={8} fill="#f59ab0" opacity={0.6} />
        </g>
      ) : null}
      {face === "sad" ? (
        <g>
          <circle cx={-20} cy={-2} r={6} fill={OUTLINE} />
          <circle cx={20} cy={-2} r={6} fill={OUTLINE} />
          <path d="M -16 30 Q 0 18 16 30" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
};

// Yarım soğan (kesit, halkalar görünür)
const HalfOnion: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -80 0 Q -80 -78 0 -80 Q 80 -78 80 0 Z" fill={ONION} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      {[66, 50, 34, 18].map((r, i) => (
        <path key={i} d={`M ${-r} 0 Q ${-r} ${-r} 0 ${-r} Q ${r} ${-r} ${r} 0`} fill={i % 2 ? ONION_IN : "#f5e6be"} stroke={ONION_DARK} strokeWidth={4} />
      ))}
      <line x1={-84} y1={0} x2={84} y2={0} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

// Bıçak; (0,0) bıçak ucu değil, sap ile ağzın birleştiği yer. Ağız sola uzanır.
const Knife: React.FC<{ x: number; y: number; scale?: number; rotate?: number; dull?: boolean; shine?: boolean }> = ({
  x,
  y,
  scale = 1,
  rotate = 0,
  dull = false,
  shine = false,
}) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, scale, rotate)}>
      <path
        d={dull ? "M 0 -22 L -230 -22 Q -250 -10 -236 16 L 0 26 Z" : "M 0 -22 L -200 -22 Q -250 -18 -262 26 L 0 26 Z"}
        fill={dull ? "#a7a9ac" : "#e3e8ee"}
        stroke={OUTLINE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {dull ? (
        <path d="M -40 26 l 8 -8 l 8 8 l 10 -10 l 8 10 M -120 24 l 8 -8 l 8 8 l 10 -10 l 8 10 M -190 21 l 8 -8 l 8 8" fill="none" stroke={OUTLINE} strokeWidth={3} />
      ) : (
        <path d="M -20 14 L -200 14" stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
      )}
      <rect x={0} y={-24} width={130} height={52} rx={14} fill="#7a4a2a" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={40} cy={2} r={6} fill="#e3e8ee" stroke={OUTLINE} strokeWidth={2} />
      <circle cx={90} cy={2} r={6} fill="#e3e8ee" stroke={OUTLINE} strokeWidth={2} />
      {shine ? (
        <g transform={place(-150 + ((frame * 6) % 140), -30, 0.8)}>
          <path d="M 0 -22 L 6 -6 L 22 0 L 6 6 L 0 22 L -6 6 L -22 0 L -6 -6 Z" fill="#fff" stroke={OUTLINE} strokeWidth={3} />
        </g>
      ) : null}
    </g>
  );
};

type Mood = "calm" | "cry" | "happy" | "wow" | "sting";

// Belden yukarı karakter; (0,0) gövdenin alt ortası, kafa merkezi (0,-200)
const Bust: React.FC<{ x: number; y: number; scale?: number; shirt?: string; hair?: string; mood?: Mood; delay?: number }> = ({
  x,
  y,
  scale = 1,
  shirt = ORANGE,
  hair = "#4a2f1d",
  mood = "calm",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const tilt = mood === "cry" ? Math.sin(frame / 3) * 3 : Math.sin(frame / 18) * 2;
  const blink = frame % 90 > 85 ? 0.15 : 1;
  const tearY = (frame * 4) % 120;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      {/* Önlük */}
      <path d="M -50 0 L -46 -100 L 46 -100 L 50 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
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
        {mood === "sting" || mood === "cry" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M -42 -214 L -18 -205 L -42 -196" />
            <path d="M 42 -214 L 18 -205 L 42 -196" />
            <circle cx={-30} cy={-205} r={20} stroke="#ff8a8a" strokeWidth={4} opacity={0.6} />
            <circle cx={30} cy={-205} r={20} stroke="#ff8a8a" strokeWidth={4} opacity={0.6} />
          </g>
        ) : null}
        {mood === "cry" ? (
          <g>
            <path d={`M -34 -192 Q -40 ${-192 + tearY * 0.5} -36 ${-170 + tearY * 0.6}`} fill="none" stroke={BLUE} strokeWidth={8} strokeLinecap="round" opacity={0.8} />
            <path d={`M 34 -192 Q 40 ${-192 + tearY * 0.5} 36 ${-170 + tearY * 0.6}`} fill="none" stroke={BLUE} strokeWidth={8} strokeLinecap="round" opacity={0.8} />
            <path d={`M -36 ${-150 + tearY} q -8 12 0 18 q 8 -6 0 -18 Z`} fill={TEAR} stroke={OUTLINE} strokeWidth={3} />
            <path d={`M 36 ${-140 + ((tearY + 50) % 120)} q -8 12 0 18 q 8 -6 0 -18 Z`} fill={TEAR} stroke={OUTLINE} strokeWidth={3} />
          </g>
        ) : null}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mood === "calm" ? <path d="M -20 -164 Q 0 -152 20 -164" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mood === "wow" ? <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} /> : null}
        {mood === "cry" || mood === "sting" ? <path d="M -24 -156 Q -12 -170 0 -158 Q 12 -170 24 -156" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        <circle cx={-46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
      </g>
    </g>
  );
};

// Kesme tahtası
const Board: React.FC<{ x: number; y: number; w?: number }> = ({ x, y, w = 360 }) => (
  <g>
    <rect x={x - w / 2 + 8} y={y + 8} width={w} height={34} rx={12} fill="rgba(0,0,0,0.18)" />
    <rect x={x - w / 2} y={y} width={w} height={34} rx={12} fill={BOARD} stroke={OUTLINE} strokeWidth={5} />
    <circle cx={x + w / 2 - 24} cy={y + 17} r={7} fill={KITCHEN} stroke={OUTLINE} strokeWidth={3} />
  </g>
);

// Yükselen gaz bulutçukları
const GasWisps: React.FC<{ x: number; y: number; height?: number; count?: number; spread?: number; color?: string }> = ({
  x,
  y,
  height = 260,
  count = 6,
  spread = 90,
  color = GAS,
}) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const t = ((frame * 1.6 + i * (height / count)) % height) / height;
        const cx = x + Math.sin(frame / 14 + i * 1.7) * 18 + ((i % 3) - 1) * spread * 0.4 * t;
        const cy = y - t * height;
        const r = 14 + t * 22;
        return <circle key={i} cx={cx} cy={cy} r={r} fill={color} stroke={OUTLINE} strokeWidth={3} opacity={Math.max(0, 0.9 - t * 0.8)} />;
      })}
    </g>
  );
};

// Fışkıran damlacıklar; progress 0..1
const Spray: React.FC<{ x: number; y: number; progress: number; count?: number; height?: number }> = ({ x, y, progress, count = 10, height = 200 }) => {
  if (progress <= 0) return null;
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const ang = ((-90 + (i - (count - 1) / 2) * (110 / count)) * Math.PI) / 180;
        const sp = height * (0.6 + ((i * 37) % 10) / 25);
        const px = x + Math.cos(ang) * sp * progress;
        const py = y + Math.sin(ang) * sp * progress + 120 * progress * progress;
        return <circle key={i} cx={px} cy={py} r={5 + (i % 3) * 2} fill={GAS} stroke={OUTLINE} strokeWidth={2.5} opacity={1 - progress * 0.5} />;
      })}
    </g>
  );
};

// Kırmızı çarpı
const Cross: React.FC<{ x: number; y: number; size?: number; delay?: number }> = ({ x, y, size = 60, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)} stroke={RED} strokeWidth={16} strokeLinecap="round">
      <line x1={-size} y1={-size} x2={size} y2={size} />
      <line x1={size} y1={-size} x2={-size} y2={size} />
    </g>
  );
};

// Yeşil tik
const Check: React.FC<{ x: number; y: number; size?: number; delay?: number }> = ({ x, y, size = 50, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={size} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
      <path d={`M ${-size * 0.45} 0 L ${-size * 0.1} ${size * 0.35} L ${size * 0.5} ${-size * 0.35}`} fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

// Doğrama hareketi (aşağı yukarı)
const useChop = (period = 14, depth = 40) => {
  const frame = useCurrentFrame();
  const t = (frame % period) / period;
  return t < 0.5 ? t * 2 * depth : (1 - t) * 2 * depth;
};

// 1) Soğan doğruyorsun… gözlerin yaşarıyor
const OnionCry: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const cryAt = Math.round(durationInFrames * 0.35);
  const chop = useChop(12, 34);
  const mood: Mood = frame > cryAt ? "cry" : "calm";
  return (
    <g>
      <Kitchen />
      <Bust x={240} y={440} scale={1.05} mood={mood} />
      <Board x={600} y={400} />
      <HalfOnion x={560} y={400} scale={0.9} />
      {[680, 712, 744].map((x, i) => (
        <path key={i} d={`M ${x} 400 q 10 -40 0 -60`} fill="none" stroke={ONION_DARK} strokeWidth={8} strokeLinecap="round" />
      ))}
      <Knife x={790} y={300 + chop} rotate={-8} scale={0.9} />
      {frame > cryAt * 0.6 ? <GasWisps x={520} y={330} height={230} count={5} /> : null}
      <QuestionMark x={120} y={110} size={90} delay={cryAt + 10} />
    </g>
  );
};

// 2) Bıçak hücreleri patlatır
const CutCells: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const cutStart = Math.round(durationInFrames * 0.25);
  const cut = useProgress(cutStart, cutStart + 30);
  const cells = Array.from({ length: 18 }).map((_, i) => ({ cx: 230 + (i % 6) * 88, cy: 180 + Math.floor(i / 6) * 100 }));
  const knifeX = 180 + cut * 560;
  return (
    <g>
      <Paper />
      <rect x={180} y={120} width={540} height={320} rx={40} fill={ONION_IN} stroke={OUTLINE} strokeWidth={6} />
      {cells.map((c, i) => {
        const burst = c.cx < knifeX && Math.floor(i / 6) === 1;
        const wob = Math.sin((frame + i * 9) / 10) * 2;
        return (
          <g key={i}>
            <rect
              x={c.cx - 38}
              y={c.cy - 40 + wob}
              width={76}
              height={80}
              rx={22}
              fill={burst ? "#fff" : "#f5e6be"}
              stroke={burst ? RED : ONION_DARK}
              strokeWidth={5}
              strokeDasharray={burst ? "10 8" : undefined}
            />
            {!burst ? <circle cx={c.cx} cy={c.cy + wob} r={10} fill={ONION} stroke={ONION_DARK} strokeWidth={3} /> : null}
            {burst ? <Sparkles points={[[c.cx - 20, c.cy - 30], [c.cx + 24, c.cy + 20]]} color={GAS} /> : null}
          </g>
        );
      })}
      <g opacity={cut > 0 && cut < 1 ? 1 : cut >= 1 ? 0.9 : 0}>
        <Knife x={knifeX + 120} y={280} scale={0.75} />
      </g>
      <Chip x={450} y={500} text="HÜCRE PATLADI!" delay={cutStart + 24} />
      <NamePlate x={450} y={70} text="SOĞAN HÜCRELERİ (YAKINDAN)" />
    </g>
  );
};

// Hücrede ayrı duran iki madde
const Blob: React.FC<{ x: number; y: number; color: string; label: string; scale?: number }> = ({ x, y, color, label, scale = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, scale, Math.sin(frame / 10) * 6)}>
      <path d="M -50 -10 Q -46 -52 0 -50 Q 52 -48 50 -4 Q 52 46 0 48 Q -54 46 -50 -10 Z" fill={color} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-16} cy={-8} r={6} fill={OUTLINE} />
      <circle cx={16} cy={-8} r={6} fill={OUTLINE} />
      <path d="M -12 14 Q 0 22 12 14" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      <text y={86} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK}>
        {label}
      </text>
    </g>
  );
};

// 3) Ayrı duran maddeler karışıyor, enzim işe koyuluyor
const MixTrap: Visual = ({ durationInFrames }) => {
  const mixAt = Math.round(durationInFrames * 0.35);
  const m = useProgress(mixAt, mixAt + 26);
  const wallA = 1 - m;
  const pop = useAppear(mixAt + 26);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <rect x={110} y={90} width={680} height={330} rx={40} fill={ONION_IN} stroke={OUTLINE} strokeWidth={6} />
      {/* Ara duvar */}
      <g opacity={wallA}>
        <rect x={438} y={100} width={24} height={310} fill={ONION_DARK} stroke={OUTLINE} strokeWidth={4} />
      </g>
      {m > 0 && m < 1 ? <Sparkles points={[[450, 160], [450, 330]]} color={RED} /> : null}
      <Blob x={240 + m * 140} y={230} color="#ffd36b" label="KÜKÜRT" scale={1} />
      <Blob x={660 - m * 140} y={230} color="#9fd8ff" label="ENZİM" scale={1} />
      {m >= 1 ? (
        <g transform={place(450, 150, pop, Math.sin(frame / 3) * 4)}>
          <path d="M -60 0 L -30 -36 L 0 -10 L 30 -40 L 60 0 L 30 30 L 0 10 L -30 34 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <text y={10} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={RED}>
            ÇAT!
          </text>
        </g>
      ) : null}
      <Chip x={450} y={490} text="KARIŞINCA TEPKİME BAŞLAR" delay={mixAt + 30} />
    </g>
  );
};

// 4) 2002: gözyaşı faktörü sentazı
const EnzymeFound: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const frame = useCurrentFrame();
  const scan = useWave(50, 30);
  return (
    <g>
      <Paper />
      {/* Dergi */}
      <g transform={place(230, 270, useAppear(2), -5)}>
        <rect x={-130} y={-170} width={260} height={340} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-130} y={-170} width={260} height={70} rx={10} fill={RED} stroke={OUTLINE} strokeWidth={6} />
        <text y={-122} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill="#fff">
          NATURE
        </text>
        <text y={-60} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
          2002
        </text>
        <Onion x={0} y={40} scale={0.85} face="smug" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={-100} y={120 + i * 16} width={200 - i * 50} height={6} fill="#c8c8c8" />
        ))}
      </g>
      {/* Büyüteç altında enzim */}
      <g transform={place(620, 250 + scan * 0.2, useAppear(d))}>
        <circle r={120} fill="#e8f6ff" stroke={OUTLINE} strokeWidth={8} />
        <rect x={80} y={80} width={36} height={130} rx={14} fill="#7a4a2a" stroke={OUTLINE} strokeWidth={6} transform="rotate(-45 98 145)" />
        <g transform={`rotate(${frame * 2})`}>
          {[0, 60, 120, 180, 240, 300].map((a, i) => (
            <circle key={i} cx={Math.cos((a * Math.PI) / 180) * 46} cy={Math.sin((a * Math.PI) / 180) * 46} r={22} fill={i % 2 ? "#9fd8ff" : PURPLE} stroke={OUTLINE} strokeWidth={4} />
          ))}
        </g>
        <circle r={24} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Chip x={600} y={470} text="GÖZYAŞI FAKTÖRÜ SENTAZI" dark delay={d + 16} />
      <Arrow from={[400, 200]} to={[480, 230]} progress={useProgress(d + 4, d + 20)} color={RED} />
    </g>
  );
};

// 5) Gaz havaya karışıp gözlere süzülüyor
const GasRise: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const reach = useProgress(d, d + 40);
  return (
    <g>
      <Kitchen />
      <Board x={300} y={400} w={300} />
      <HalfOnion x={300} y={400} scale={0.9} />
      <GasWisps x={300} y={340} height={240} count={7} />
      <Bust x={680} y={440} scale={1} mood={reach > 0.8 ? "sting" : "calm"} />
      <path
        d={`M 330 150 Q 480 ${60 - reach * 10} ${330 + reach * 300} ${150 + reach * 90}`}
        fill="none"
        stroke={OUTLINE}
        strokeWidth={6}
        strokeDasharray="14 12"
        opacity={reach > 0 ? 1 : 0}
      />
      {reach > 0 ? <circle cx={330 + reach * 300} cy={150 + reach * 90} r={20} fill={GAS} stroke={OUTLINE} strokeWidth={4} /> : null}
      <Chip x={300} y={60} text="UÇUCU GAZ" delay={6} />
    </g>
  );
};

// 6) Göz sinirleri uyarılıyor → gözyaşı
const EyeAlarm: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.3);
  const tears = useProgress(d + 10, d + 40);
  const flash = frame > d && Math.floor(frame / 6) % 2 === 0;
  return (
    <g>
      <Paper />
      <GasWisps x={150} y={520} height={360} count={6} spread={60} />
      {/* Büyük göz */}
      <g transform={place(470, 260, useAppear(2))}>
        <path d="M -230 0 Q 0 -190 230 0 Q 0 190 -230 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={8} />
        <circle r={86} fill="#7a5233" stroke={OUTLINE} strokeWidth={6} />
        <circle r={40} fill={OUTLINE} />
        <circle cx={-24} cy={-26} r={16} fill="#fff" />
        {/* Kızaran damarlar */}
        <g stroke="#ff6b6b" strokeWidth={4} fill="none" opacity={Math.min(1, tears * 2)}>
          <path d="M -200 0 q 30 -10 60 4 q 10 -12 20 -6" />
          <path d="M 200 4 q -30 -12 -60 6 q -10 -10 -20 -4" />
        </g>
        {/* Sinir uçları */}
        {[-150, -110, 110, 150].map((x, i) => (
          <g key={i} opacity={frame > d ? 1 : 0.35}>
            <path d={`M ${x} -60 l 8 -16 l -10 -8 l 10 -16`} fill="none" stroke={flash ? YELLOW : ORANGE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
        {/* Gözyaşı damlaları */}
        {[-120, 0, 120].map((x, i) => {
          const ty = 80 + ((tears * 160 + i * 40) % 160);
          return tears > 0 ? (
            <path key={i} d={`M ${x} ${ty} q -16 26 0 36 q 16 -10 0 -36 Z`} fill={TEAR} stroke={OUTLINE} strokeWidth={4} />
          ) : null;
        })}
      </g>
      <g transform={place(790, 90, useAppear(d))}>
        <rect x={-90} y={-36} width={180} height={72} rx={16} fill={RED} stroke={OUTLINE} strokeWidth={5} />
        <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill="#fff">
          ALARM!
        </text>
      </g>
      <Chip x={470} y={510} text="YIKA VE AT!" dark delay={d + 20} />
    </g>
  );
};

// Kamera ikonu
const Camera: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const rec = Math.floor(frame / 15) % 2 === 0;
  return (
    <g transform={place(x, y, scale * a)}>
      <rect x={-90} y={-60} width={180} height={120} rx={18} fill="#3b4250" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-50} y={-82} width={70} height={26} rx={8} fill="#3b4250" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-110} cy={0} r={44} fill="#5c6575" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-110} cy={0} r={24} fill="#1d2a3a" stroke="#9fd8ff" strokeWidth={4} />
      <circle cx={60} cy={-34} r={10} fill={rec ? RED : "#7a2b2b"} />
      <text x={20} y={30} fontFamily={uiFont} fontWeight={800} fontSize={24} fill="#fff" textAnchor="middle">
        REC
      </text>
    </g>
  );
};

// 7) Cornell: yüksek hızlı kamera
const HighSpeedCam: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const drop = useProgress(d, d + 20);
  const spray = useProgress(d + 18, d + 50);
  return (
    <g>
      <Paper />
      {/* Giyotin düzeneği */}
      <rect x={180} y={60} width={24} height={380} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={5} />
      <rect x={396} y={60} width={24} height={380} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={5} />
      <rect x={170} y={48} width={260} height={26} rx={8} fill="#6d7680" stroke={OUTLINE} strokeWidth={5} />
      <g transform={`translate(0 ${drop * 160})`}>
        <path d="M 204 120 L 396 120 L 396 160 L 204 190 Z" fill="#e3e8ee" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      </g>
      <rect x={150} y={440} width={300} height={30} rx={8} fill={BOARD} stroke={OUTLINE} strokeWidth={5} />
      <Onion x={300} y={370} scale={0.85} />
      <Spray x={300} y={320} progress={spray} count={12} height={220} />
      <Camera x={720} y={300} scale={1} delay={4} />
      <Arrow from={[600, 300]} to={[440, 300]} progress={useProgress(8, 22)} color={RED} />
      <NamePlate x={700} y={160} text="CORNELL ÜNİVERSİTESİ" delay={10} />
      <Chip x={640} y={430} text="YÜKSEK HIZLI ÇEKİM" delay={d} />
    </g>
  );
};

// 8) Kör bıçak + hızlı kesiş = çok damlacık
const DullKnife: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.2);
  const cycle = 22;
  const local = Math.max(0, frame - d);
  const p = (local % cycle) / cycle;
  const chopY = p < 0.3 ? p / 0.3 : 1 - (p - 0.3) / 0.7;
  return (
    <g>
      <Kitchen />
      <Board x={450} y={400} w={420} />
      <Onion x={420} y={330} scale={0.95} face="sad" />
      <Knife x={600} y={150 + chopY * 130} rotate={-6} dull scale={0.95} />
      {frame > d ? <Spray x={430} y={290} progress={(local % 30) / 30} count={16} height={260} /> : null}
      {frame > d ? <Spray x={410} y={290} progress={((local + 15) % 30) / 30} count={12} height={220} /> : null}
      <g transform={place(150, 120, useAppear(d))}>
        <rect x={-110} y={-40} width={220} height={80} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text y={14} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill={RED}>
          KÖR BIÇAK
        </text>
      </g>
      <Chip x={760} y={80} text="HIZLI KESİŞ" dark delay={d + 10} />
      <Sparkles points={[[740, 150], [820, 140]]} color={RED} />
    </g>
  );
};

// Buzdolabı
const Fridge: React.FC<{ x: number; y: number; open: number }> = ({ x, y, open }) => (
  <g transform={place(x, y, 1)}>
    <rect x={-110} y={-200} width={220} height={400} rx={18} fill="#eaf4fb" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-100} y={-190} width={200} height={380} rx={10} fill="#cfeaf8" />
    {[-90, 10, 100].map((yy, i) => (
      <rect key={i} x={-100} y={yy} width={200} height={10} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
    ))}
    {/* Kapak */}
    <g transform={`translate(-110 0) scale(${1 - open * 0.85} 1) translate(110 0)`}>
      <rect x={-110} y={-200} width={220} height={400} rx={18} fill="#f5fbff" stroke={OUTLINE} strokeWidth={6} />
      <line x1={-110} y1={-60} x2={110} y2={-60} stroke={OUTLINE} strokeWidth={5} />
      <rect x={70} y={-150} width={16} height={60} rx={8} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={3} />
      <rect x={70} y={-30} width={16} height={90} rx={8} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={3} />
    </g>
  </g>
);

// 9) Buzdolabı efsanesi: soğutmak işe yaramadı
const FridgeMyth: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const open = useProgress(4, 20);
  const move = useProgress(18, Math.round(durationInFrames * 0.35));
  const d = Math.round(durationInFrames * 0.4);
  const ox = 210 + move * 330;
  const oy = 300 + move * 40;
  return (
    <g>
      <Kitchen />
      <Fridge x={210} y={250} open={open} />
      <Board x={600} y={400} w={320} />
      <Onion x={ox} y={oy} scale={0.75} face={frame > d ? "smug" : "none"} />
      {/* Kar taneleri */}
      {move > 0
        ? [0, 1, 2].map((i) => (
            <text key={i} x={ox - 70 + i * 60} y={oy - 90 + Math.sin(frame / 8 + i) * 8} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={BLUE}>
              ❄
            </text>
          ))
        : null}
      {frame > d ? <Spray x={ox} y={oy - 40} progress={((frame - d) % 30) / 30} count={14} height={240} /> : null}
      <g transform={place(720, 110, useAppear(d))}>
        <rect x={-150} y={-44} width={300} height={88} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text y={-4} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={RED}>
          İŞE YARAMADI!
        </text>
        <text y={30} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={INK}>
          DAHA ÇOK DAMLACIK
        </text>
      </g>
      <Cross x={210} y={80} size={34} delay={d + 8} />
    </g>
  );
};

// 10) Keskin bıçak + yavaş kes
const SharpSlow: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.15);
  const slow = (Math.sin(frame / 22) + 1) / 2;
  return (
    <g>
      <Kitchen />
      <Bust x={170} y={440} scale={0.9} mood="happy" />
      <Board x={560} y={400} w={380} />
      <HalfOnion x={520} y={400} scale={0.85} />
      <Knife x={760} y={260 + slow * 90} rotate={-6} shine scale={0.9} />
      <Chip x={520} y={70} text="KESKİN BIÇAK" delay={d} />
      <Chip x={790} y={150} text="YAVAŞ" dark delay={d + 12} />
      <Check x={360} y={90} size={40} delay={d + 24} />
      <g transform={place(700, 500, useAppear(d + 30))}>
        <text fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#fff" stroke={OUTLINE} strokeWidth={5} paintOrder="stroke">
          = DAHA AZ GÖZYAŞI
        </text>
      </g>
    </g>
  );
};

// 11) Sıra sende: hangi yemekte?
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const w = useWave(40, 4);
  const items = ["MENEMEN", "KURU FASULYE", "SALATA"];
  const colors = [RED, ORANGE, GREEN];
  return (
    <g>
      <Paper />
      <Bust x={220} y={540} scale={0.95} mood="cry" />
      <Onion x={420} y={470} scale={0.6} face="smug" delay={4} />
      {items.map((c, i) => (
        <g key={i} transform={place(680, 110 + i * 120, useAppear(d + i * 10), i % 2 ? w : -w)}>
          <rect x={-190} y={-42} width={380} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <path d="M -150 36 L -170 64 L -120 40 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <circle cx={-150} cy={0} r={18} fill={colors[i]} stroke={OUTLINE} strokeWidth={4} />
          <text x={25} y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
            {c}?
          </text>
        </g>
      ))}
      <QuestionMark x={430} y={130} size={90} delay={d + 30} />
      <Chip x={680} y={500} text="YORUMLARA YAZ!" dark delay={d + 36} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  OnionCry,
  CutCells,
  MixTrap,
  EnzymeFound,
  GasRise,
  EyeAlarm,
  HighSpeedCam,
  DullKnife,
  FridgeMyth,
  SharpSlow,
  YourTurn,
};
