// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: İlk gece etkisi / yeni bir yerde ilk gece uyuyamamak (2026-11-20-aksam)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Chip,
  NamePlate,
  Person,
  place,
  QuestionMark,
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
const NIGHT = "#2c2f5e";
const NIGHT_DARK = "#1d1f45";
const SKIN = "#f2c79a";
const TEAL = "#17c3a5";
const BLUE = "#3a8fe0";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff8a2b";
const BRAIN = "#f59ac0";
const BRAIN_DIM = "#b9a3c9";
const GREY = "#b9b2aa";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Gece odası zemini: koyu duvar, yıldızlı pencere, zemin
const NightRoom: React.FC<{ windowX?: number }> = ({ windowX = 640 }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={900} height={560} fill={NIGHT} />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={i * 92 + 30} y={0} width={30} height={500} fill={NIGHT_DARK} opacity={0.35} />
      ))}
      <rect x={0} y={500} width={900} height={60} fill="#5b4a7a" stroke={OUTLINE} strokeWidth={4} />
      <g transform={`translate(${windowX} 60)`}>
        <rect x={0} y={0} width={180} height={150} rx={8} fill="#121436" stroke={OUTLINE} strokeWidth={6} />
        <circle cx={120} cy={50} r={26} fill="#ffe38a" />
        <circle cx={132} cy={42} r={22} fill="#121436" />
        {[
          [30, 30],
          [60, 100],
          [150, 120],
          [90, 40],
        ].map(([sx, sy], i) => (
          <circle key={i} cx={sx} cy={sy} r={3 + ((frame + i * 13) % 40 < 20 ? 1.5 : 0)} fill="#fff" />
        ))}
        <rect x={86} y={0} width={8} height={150} fill={OUTLINE} />
        <rect x={0} y={71} width={180} height={8} fill={OUTLINE} />
      </g>
    </g>
  );
};

// Uçuşan "Z" harfleri
const Zzz: React.FC<{ x: number; y: number; scale?: number; color?: string; delay?: number }> = ({ x, y, scale = 1, color = "#fff", delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      {[0, 1, 2].map((i) => {
        const t = ((frame - delay + i * 20) % 60) / 60;
        return (
          <text
            key={i}
            x={i * 26 + t * 20}
            y={-i * 30 - t * 30}
            fontFamily={uiFont}
            fontWeight={800}
            fontSize={30 + i * 8}
            fill={color}
            stroke={OUTLINE}
            strokeWidth={3}
            paintOrder="stroke"
            opacity={1 - t * 0.6}
          >
            Z
          </text>
        );
      })}
    </g>
  );
};

type Eyes = "open" | "closed" | "wide";

// Yatakta yatan kişi; (x,y) yatağın alt ortası
const Bed: React.FC<{
  x: number;
  y: number;
  scale?: number;
  eyes?: Eyes;
  blanket?: string;
  delay?: number;
  toss?: boolean;
  cap?: boolean;
}> = ({ x, y, scale = 1, eyes = "closed", blanket = ORANGE, delay = 0, toss = false, cap = false }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const roll = toss ? Math.sin(frame / 7) * 5 : 0;
  const breath = Math.sin(frame / 20) * 3;
  return (
    <g transform={place(x, y, scale * a)}>
      {/* Ayaklar ve çerçeve */}
      <rect x={-230} y={-40} width={16} height={40} fill="#8a5a32" stroke={OUTLINE} strokeWidth={4} />
      <rect x={214} y={-40} width={16} height={40} fill="#8a5a32" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-250} y={-190} width={36} height={170} rx={10} fill="#a8683a" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-230} y={-96} width={460} height={60} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {/* Yastık */}
      <ellipse cx={-150} cy={-110} rx={62} ry={28} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {/* Kafa */}
      <g transform={`rotate(${roll} -150 -140)`}>
        <circle cx={-150} cy={-140} r={42} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        {cap ? (
          <path d="M -192 -146 Q -190 -196 -140 -190 Q -100 -186 -108 -150 Q -150 -170 -192 -146 Z" fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
        ) : (
          <path d="M -192 -146 Q -186 -190 -146 -184 Q -112 -182 -108 -150 Q -140 -166 -192 -146 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={4} />
        )}
        {eyes === "closed" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round">
            <path d="M -170 -136 Q -162 -128 -154 -136" />
            <path d="M -142 -136 Q -134 -128 -126 -136" />
          </g>
        ) : (
          <g>
            <circle cx={-162} cy={-136} r={eyes === "wide" ? 11 : 8} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={-134} cy={-136} r={eyes === "wide" ? 11 : 8} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={-160 + Math.sin(frame / 15) * 3} cy={-135} r={4} fill={OUTLINE} />
            <circle cx={-132 + Math.sin(frame / 15) * 3} cy={-135} r={4} fill={OUTLINE} />
          </g>
        )}
        {eyes === "closed" ? (
          <path d="M -158 -114 Q -148 -108 -138 -114" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : (
          <path d="M -160 -112 Q -148 -118 -136 -112" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        )}
      </g>
      {/* Yorgan */}
      <path
        d={`M -120 ${-100 + breath} Q 0 ${-150 + breath + roll} 200 ${-110 + breath} L 222 -40 L -110 -40 Z`}
        fill={blanket}
        stroke={OUTLINE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path d={`M -100 ${-80 + breath} Q 40 ${-118 + breath} 200 ${-86 + breath}`} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={6} />
    </g>
  );
};

// Duvar saati
const Clock: React.FC<{ x: number; y: number; r?: number; speed?: number; delay?: number }> = ({ x, y, r = 50, speed = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const m = frame * 6 * speed;
  return (
    <g transform={place(x, y, a)}>
      <circle r={r} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-2} y={-r + 6} width={4} height={8} fill={OUTLINE} transform={`rotate(${i * 30})`} />
      ))}
      <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" transform={`rotate(${90 + m / 12})`} />
      <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke={PINK} strokeWidth={4} strokeLinecap="round" transform={`rotate(${m})`} />
      <circle r={5} fill={OUTLINE} />
    </g>
  );
};

// Üstten görünen beyin: sol ve sağ yarı ayrı ayrı uyanık/uykulu
const BrainTop: React.FC<{
  x: number;
  y: number;
  scale?: number;
  left: "awake" | "asleep";
  right: "awake" | "asleep";
  delay?: number;
  glow?: number;
}> = ({ x, y, scale = 1, left, right, delay = 0, glow = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const float = useWave(70, 5);
  const blink = frame % 80 > 75 ? 0.15 : 1;
  const half = (side: -1 | 1, state: "awake" | "asleep") => {
    const fill = state === "awake" ? BRAIN : BRAIN_DIM;
    const ex = side * 70;
    return (
      <g>
        {state === "awake" && glow > 0 ? (
          <path
            d={`M ${side * 8} -150 C ${side * 120} -170 ${side * 190} -90 ${side * 180} 0 C ${side * 190} 100 ${side * 120} 160 ${side * 8} 150 Z`}
            fill={YELLOW}
            opacity={0.45 * glow}
            transform={`scale(${1.12 + Math.sin(frame / 6) * 0.03})`}
          />
        ) : null}
        <path
          d={`M ${side * 8} -150 C ${side * 120} -170 ${side * 190} -90 ${side * 180} 0 C ${side * 190} 100 ${side * 120} 160 ${side * 8} 150 Z`}
          fill={fill}
          stroke={OUTLINE}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <path
          d={`M ${side * 40} -110 Q ${side * 90} -90 ${side * 70} -60 M ${side * 130} -60 Q ${side * 110} -30 ${side * 150} -10 M ${side * 40} 70 Q ${side * 90} 60 ${side * 80} 110 M ${side * 140} 50 Q ${side * 120} 70 ${side * 150} 90`}
          fill="none"
          stroke={state === "awake" ? "#d96b98" : "#9a86ad"}
          strokeWidth={6}
          strokeLinecap="round"
        />
        {state === "awake" ? (
          <g transform={`translate(${ex} 0) scale(1 ${blink})`}>
            <circle r={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
            <circle cx={Math.sin(frame / 10) * 8} cy={0} r={10} fill={OUTLINE} />
          </g>
        ) : (
          <path d={`M ${ex - 20} 0 Q ${ex} 16 ${ex + 20} 0`} fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        )}
      </g>
    );
  };
  return (
    <g transform={place(x, y + float, scale * a)}>
      {half(-1, left)}
      {half(1, right)}
    </g>
  );
};

// Kafa arkadan (kulaklar görünür); (x,y) kafa merkezi
const HeadBack: React.FC<{ x: number; y: number; scale?: number; delay?: number; jolt?: number }> = ({ x, y, scale = 1, delay = 0, jolt = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y - jolt * 20, scale * a)}>
      <path d="M -120 220 L -110 150 Q -100 110 -50 106 L 50 106 Q 100 110 110 150 L 120 220 Z" fill={TEAL} stroke={OUTLINE} strokeWidth={6} />
      <rect x={-22} y={70} width={44} height={44} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={-102} cy={0} rx={20} ry={32} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={102} cy={0} rx={20} ry={32} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <circle r={100} fill="#4a2f1d" stroke={OUTLINE} strokeWidth={6} />
      <path d="M 0 -96 L 0 96" stroke="#2f1d12" strokeWidth={6} strokeDasharray="14 10" />
    </g>
  );
};

// Ses dalgaları (sağa doğru açılan yaylar)
const SoundWaves: React.FC<{ x: number; y: number; flip?: boolean; delay?: number; color?: string }> = ({ x, y, flip = false, delay = 0, color = ORANGE }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={`${place(x, y, a)} scale(${flip ? -1 : 1} 1)`}>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 10) % 30) / 30;
        return (
          <path
            key={i}
            d={`M ${20 + i * 26} -${30 + i * 16} Q ${44 + i * 32} 0 ${20 + i * 26} ${30 + i * 16}`}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            opacity={0.4 + 0.6 * (1 - t)}
          />
        );
      })}
    </g>
  );
};

// Takvim yaprağı
const CalendarPage: React.FC<{ x: number; y: number; text: string; color?: string; delay?: number; scale?: number }> = ({ x, y, text, color = PINK, delay = 0, scale = 1 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <rect x={-80} y={-80} width={160} height={170} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-80} y={-80} width={160} height={50} rx={14} fill={color} stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-40} cy={-80} r={8} fill={OUTLINE} />
      <circle cx={40} cy={-80} r={8} fill={OUTLINE} />
      <text x={0} y={-45} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill="#fff">
        GECE
      </text>
      <text x={0} y={60} fontFamily={uiFont} fontWeight={800} fontSize={90} textAnchor="middle" fill={OUTLINE}>
        {text}
      </text>
    </g>
  );
};

// Yunus; (x,y) gövde merkezi, sağa bakar
const Dolphin: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const swim = Math.sin(frame / 12) * 6;
  return (
    <g transform={place(x, y + swim, scale * a, swim * 0.6)}>
      <path d="M -160 10 Q -200 -30 -230 -10 Q -205 10 -230 40 Q -195 40 -160 20 Z" fill="#5a8fb8" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path
        d="M -170 15 Q -100 -70 40 -60 Q 130 -55 170 -10 Q 210 0 215 15 Q 180 25 150 25 Q 60 70 -60 50 Q -140 40 -170 15 Z"
        fill="#7fb3d5"
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <path d="M -60 50 Q 40 64 150 25" fill="none" stroke="#dfeef8" strokeWidth={10} strokeLinecap="round" />
      <path d="M 0 -58 Q 10 -110 50 -110 Q 40 -80 50 -56 Z" fill="#5a8fb8" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 20 30 Q 10 70 -20 80 Q 0 50 -10 30 Z" fill="#5a8fb8" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={130} cy={-20} r={10} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
      <circle cx={133} cy={-20} r={5} fill={OUTLINE} />
      <path d="M 165 12 Q 185 18 205 14" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
};

// Ördek; (x,y) gövde merkezi; facing: gaga yönü; eye: görünen gözün durumu
const Duck: React.FC<{ x: number; y: number; scale?: number; facing?: "left" | "right"; eye?: "open" | "closed"; delay?: number }> = ({
  x,
  y,
  scale = 1,
  facing = "right",
  eye = "closed",
  delay = 0,
}) => {
  const a = useAppear(delay);
  const bob = useWave(50, 3, x);
  const flip = facing === "left" ? -1 : 1;
  return (
    <g transform={`${place(x, y + bob, scale * a)} scale(${flip} 1)`}>
      <path d="M -70 0 Q -80 -50 -20 -40 L 30 -36 Q 70 -30 60 10 Q 50 40 -10 40 Q -70 40 -70 0 Z" fill="#c9a06a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -40 -10 Q 0 -20 30 0" fill="none" stroke="#8a6a3e" strokeWidth={5} strokeLinecap="round" />
      <circle cx={45} cy={-60} r={30} fill="#2e8b57" stroke={OUTLINE} strokeWidth={5} />
      <path d="M 70 -62 L 102 -56 L 70 -46 Z" fill="#f6b23c" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      <rect x={24} y={-34} width={36} height={8} fill="#fff" stroke={OUTLINE} strokeWidth={2} />
      {eye === "open" ? (
        <g>
          <circle cx={56} cy={-68} r={9} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
          <circle cx={58} cy={-68} r={4.5} fill={OUTLINE} />
        </g>
      ) : (
        <path d="M 48 -68 Q 56 -62 64 -68" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      )}
    </g>
  );
};

// ---------------- Sahneler ----------------

const HotelNight: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  return (
    <g>
      <NightRoom windowX={660} />
      <Clock x={420} y={130} r={50} speed={3} delay={2} />
      {/* Bavul */}
      <g transform={place(760, 470, useAppear(4))}>
        <rect x={-60} y={-80} width={120} height={110} rx={14} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-24} y={-100} width={48} height={24} rx={8} fill="none" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-60} y={-40} width={120} height={10} fill="#d94c6c" />
      </g>
      <Bed x={330} y={500} scale={1} eyes="wide" toss />
      <QuestionMark x={140} y={160} size={70} delay={d} color={YELLOW} />
      <Chip x={560} y={260} text="UYKU YOK!" delay={d + 10} />
    </g>
  );
};

const FirstNightName: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <circle cx={250} cy={260} r={150} fill={NIGHT} stroke={OUTLINE} strokeWidth={6} />
      <g transform={place(250, 260, useAppear(2), Math.sin(frame / 20) * 5)}>
        <circle cx={0} cy={0} r={90} fill="#ffe38a" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={36} cy={-24} r={78} fill={NIGHT} />
      </g>
      <BigText x={270} y={280} text="1." size={130} delay={d} />
      <Sparkles points={[[110, 140], [390, 150], [380, 380]]} />
      <g transform={place(640, 200, useAppear(d + 8))}>
        <text x={0} y={0} fontFamily={uiFont} fontWeight={800} fontSize={64} textAnchor="middle" fill={ORANGE} stroke={OUTLINE} strokeWidth={4} paintOrder="stroke">
          İLK GECE
        </text>
        <text x={0} y={80} fontFamily={uiFont} fontWeight={800} fontSize={64} textAnchor="middle" fill={OUTLINE}>
          ETKİSİ
        </text>
      </g>
      <Chip x={640} y={400} text="HAFİF UYKU" dark delay={d + 20} />
    </g>
  );
};

const SleepLab: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const cross = useProgress(d + 10, d + 26);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper fill="#f3f6fb" />
      <rect x={0} y={470} width={900} height={90} fill="#c9d3e0" stroke={OUTLINE} strokeWidth={4} />
      {/* Monitör */}
      <g transform={place(150, 230, useAppear(2))}>
        <rect x={-110} y={-90} width={220} height={150} rx={12} fill="#22324a" stroke={OUTLINE} strokeWidth={6} />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M -90 ${-50 + i * 40} ${Array.from({ length: 12 })
              .map((_, k) => `L ${-90 + k * 16} ${-50 + i * 40 + Math.sin(k * 1.7 + i + frame / 4) * 10}`)
              .join(" ")}`}
            fill="none"
            stroke={[TEAL, PINK, YELLOW][i]}
            strokeWidth={4}
          />
        ))}
        <rect x={-10} y={60} width={20} height={60} fill={GREY} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Bed x={560} y={470} scale={0.8} eyes="open" blanket={BLUE} cap />
      <g transform={place(560, 110, useAppear(d))}>
        <rect x={-150} y={-40} width={300} height={80} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={14} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={OUTLINE}>
          1. GECE
        </text>
        <line x1={-130} y1={0} x2={-130 + 260 * cross} y2={0} stroke={PINK} strokeWidth={10} strokeLinecap="round" />
      </g>
      <Chip x={560} y={210} text="ALIŞMA GECESİ" delay={d + 28} />
    </g>
  );
};

const EegNights: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  return (
    <g>
      <NightRoom windowX={700} />
      <CalendarPage x={120} y={160} text="1" delay={2} scale={0.75} />
      <CalendarPage x={290} y={160} text="2" color={TEAL} delay={10} scale={0.75} />
      <Bed x={420} y={500} scale={0.95} eyes="closed" blanket={ORANGE} cap />
      <Zzz x={330} y={300} delay={d} />
      <NamePlate x={600} y={250} text="BROWN ÜNİVERSİTESİ" delay={d + 6} />
      <Chip x={660} y={330} text="35 GÖNÜLLÜ" delay={d + 16} />
    </g>
  );
};

const HalfAwake: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const glow = useProgress(d, d + 12);
  return (
    <g>
      <Paper fill={NIGHT} />
      <Sparkles points={[[80, 80], [820, 90], [100, 470], [810, 460]]} color="#fff" />
      <BrainTop x={450} y={280} scale={1.25} left="awake" right="asleep" delay={2} glow={glow} />
      <Zzz x={600} y={150} delay={d} />
      <Chip x={180} y={500} text="SOL: TETİKTE" delay={d + 6} />
      <Chip x={720} y={500} text="SAĞ: UYKUDA" dark delay={d + 14} />
    </g>
  );
};

const BeepEar: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const frame = useCurrentFrame();
  const arrow = useProgress(d + 4, d + 18);
  const jolt = frame > d + 18 ? Math.max(0, Math.sin((frame - d - 18) / 3)) : 0;
  return (
    <g>
      <Paper />
      <HeadBack x={420} y={280} scale={1.1} delay={2} jolt={jolt} />
      {/* Bip kaynağı: hoparlör (sağ tarafta) */}
      <g transform={place(800, 280, useAppear(6))}>
        <rect x={-30} y={-50} width={60} height={100} rx={10} fill={GREY} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={0} r={20} fill={OUTLINE} />
      </g>
      <SoundWaves x={630} y={280} flip delay={d - 6} />
      <text x={700} y={170} fontFamily={uiFont} fontWeight={800} fontSize={48} textAnchor="middle" fill={ORANGE} stroke={OUTLINE} strokeWidth={4} paintOrder="stroke" opacity={useAppear(d)}>
        BİP!
      </text>
      <Arrow from={[520, 240]} to={[340, 230]} progress={arrow} color={PINK} />
      <Chip x={150} y={100} text="SOL YARI" delay={d + 10} />
      <BigText x={420} y={80} text="!" size={110} color={PINK} delay={d + 20} />
      <Chip x={420} y={505} text="DAHA HIZLI UYANDI" dark delay={d + 26} />
    </g>
  );
};

const NightWatch: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const frame = useCurrentFrame();
  const beam = Math.sin(frame / 10) * 18;
  return (
    <g>
      <Paper fill={NIGHT} />
      {/* Fener ışığı */}
      <path transform={`rotate(${beam} 250 230)`} d="M 250 230 L 30 120 L 30 340 Z" fill="#ffe38a" opacity={0.7 * useAppear(d)} />
      <BrainTop x={450} y={300} scale={1.05} left="awake" right="asleep" delay={2} />
      {/* Sol yarıda bekçi şapkası ve fener */}
      <g transform={place(370, 140, useAppear(d))}>
        <path d="M -70 20 L 70 20 L 60 -10 Q 0 -40 -60 -10 Z" fill={BLUE} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <rect x={-80} y={14} width={160} height={14} rx={7} fill={OUTLINE} />
        <circle cx={0} cy={-10} r={10} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
      </g>
      <g transform={place(250, 230, useAppear(d + 4), beam)}>
        <rect x={0} y={-16} width={60} height={32} rx={6} fill={GREY} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-14} y={-24} width={18} height={48} rx={4} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      </g>
      {/* Sağ yarıda uyku başlığı */}
      <g transform={place(540, 150, useAppear(d + 8), 20)}>
        <path d="M -70 20 Q 0 -100 70 20 Z" fill={PINK} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={0} cy={-56} r={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Zzz x={640} y={190} delay={d + 8} />
      <Chip x={450} y={510} text="GECE NÖBETİ" delay={d + 16} />
    </g>
  );
};

const SecondNight: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  return (
    <g>
      <NightRoom windowX={680} />
      <CalendarPage x={140} y={160} text="2" color={TEAL} delay={2} scale={0.85} />
      <Bed x={430} y={500} scale={0.95} eyes="closed" blanket={TEAL} />
      <Zzz x={330} y={300} delay={d} />
      <BrainTop x={520} y={170} scale={0.4} left="asleep" right="asleep" delay={d + 6} />
      <Chip x={720} y={330} text="FARK YOK!" delay={d + 16} />
    </g>
  );
};

const DolphinSleep: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={900} height={560} fill="#cfeefa" />
      <rect y={190} width={900} height={370} fill="#3a9bd0" />
      <path d={`M 0 190 ${Array.from({ length: 19 }).map((_, i) => `Q ${i * 50 + 25} ${180 + Math.sin(frame / 8 + i) * 6} ${i * 50 + 50} 190`).join(" ")} L 900 190`} fill="none" stroke="#fff" strokeWidth={6} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={120 + i * 200} cy={500 - ((frame * 2 + i * 70) % 260)} r={8} fill="none" stroke="#dff4ff" strokeWidth={3} />
      ))}
      <Dolphin x={360} y={330} scale={1} delay={2} />
      <BrainTop x={680} y={100} scale={0.38} left="awake" right="asleep" delay={d} />
      <Chip x={680} y={470} text="YARIM BEYİN UYKUSU" dark delay={d + 10} />
    </g>
  );
};

const DuckRow: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const frame = useCurrentFrame();
  const scan = useProgress(d + 10, d + 22);
  return (
    <g>
      <rect width={900} height={560} fill="#fff1e6" />
      <rect y={340} width={900} height={220} fill="#7fc6e0" />
      <path d={`M 0 340 ${Array.from({ length: 10 }).map((_, i) => `Q ${i * 90 + 45} ${332 + Math.sin(frame / 10 + i) * 5} ${i * 90 + 90} 340`).join(" ")}`} fill="none" stroke="#fff" strokeWidth={5} />
      <Duck x={130} y={330} scale={1} facing="left" eye="open" delay={2} />
      <Duck x={330} y={330} scale={1} facing="left" eye="closed" delay={6} />
      <Duck x={570} y={330} scale={1} facing="right" eye="closed" delay={10} />
      <Duck x={770} y={330} scale={1} facing="right" eye="open" delay={14} />
      <Zzz x={300} y={210} scale={0.7} color="#fff" delay={d} />
      <Zzz x={560} y={210} scale={0.7} color="#fff" delay={d + 4} />
      <Arrow from={[110, 200]} to={[20, 160]} progress={scan} color={PINK} />
      <Arrow from={[790, 200]} to={[880, 160]} progress={scan} color={PINK} />
      <Chip x={450} y={90} text="KENARDA: BİR GÖZ AÇIK" delay={d + 24} />
    </g>
  );
};

const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const w = useWave(40, 4);
  const items = ["OTELDE?", "MİSAFİRLİKTE?", "KAMPTA?"];
  return (
    <g>
      <Paper />
      <Person x={200} y={500} scale={1.3} shirt={ORANGE} presenting delay={2} />
      <QuestionMark x={330} y={170} size={80} delay={d + 26} />
      {items.map((c, i) => (
        <g key={i} transform={place(620, 90 + i * 115, useAppear(d + i * 8), i % 2 ? w : -w)}>
          <rect x={-200} y={-42} width={400} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={[ORANGE, PINK, PURPLE][i]}>
            {c}
          </text>
        </g>
      ))}
      <Chip x={620} y={480} text="YORUMLARA YAZ!" dark delay={d + 32} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  HotelNight,
  FirstNightName,
  SleepLab,
  EegNights,
  HalfAwake,
  BeepEar,
  NightWatch,
  SecondNight,
  DolphinSleep,
  DuckRow,
  YourTurn,
};
