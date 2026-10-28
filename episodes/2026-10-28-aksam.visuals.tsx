// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Kelime dilinin ucunda (2026-10-28-aksam)
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
  QuestionMark,
  RED,
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
const PAPER = "#f3efff";
const SKIN = "#f2c79a";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

// Harf kutucukları; boş olanlar sırayla zıplayan "?" gösterir
const Tiles: React.FC<{ letters: (string | null)[]; size?: number; gap?: number; reveal?: number }> = ({
  letters,
  size = 34,
  gap = 8,
  reveal = 0,
}) => {
  const frame = useCurrentFrame();
  const total = letters.length * size + (letters.length - 1) * gap;
  return (
    <g>
      {letters.map((l, i) => {
        const x = -total / 2 + i * (size + gap);
        const hop = l ? 0 : Math.max(0, Math.sin((frame - i * 5) / 6)) * -size * 0.18;
        const known = l !== null && reveal > 0;
        return (
          <g key={i} transform={`translate(${x} ${hop})`}>
            <rect
              x={0}
              y={-size * 0.65}
              width={size}
              height={size * 1.3}
              rx={size * 0.18}
              fill={known ? YELLOW : "#fff"}
              stroke={OUTLINE}
              strokeWidth={Math.max(3, size * 0.09)}
            />
            <text
              x={size / 2}
              y={size * 0.3}
              transform={known ? `translate(${size / 2} 0) scale(${reveal} 1) translate(${-size / 2} 0)` : undefined}
              textAnchor="middle"
              fontFamily={uiFont}
              fontWeight={800}
              fontSize={size * 0.8}
              fill={l ? INK : "#9a9a9a"}
            >
              {known ? l : "?"}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// Kafanın etrafında titreyen "zorlanma" çizgileri
const Strain: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const jitter = Math.sin(frame / 2) * 3;
  return (
    <g transform={place(x, y, appear)} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" fill="none">
      <path d={`M -62 ${-20 + jitter} L -80 ${-34 + jitter}`} />
      <path d={`M -66 ${8 - jitter} L -88 ${6 - jitter}`} />
      <path d={`M 62 ${-20 - jitter} L 80 ${-34 - jitter}`} />
      <path d={`M 66 ${8 + jitter} L 88 ${6 + jitter}`} />
    </g>
  );
};

const SweatDrop: React.FC<{ x: number; y: number; phase: number }> = ({ x, y, phase }) => {
  const frame = useCurrentFrame();
  const t = ((frame + phase) % 30) / 30;
  return (
    <path
      transform={place(x + t * 10, y + t * 40, 1)}
      opacity={1 - t}
      d="M 0 -14 C 6 -4 10 2 10 7 A 10 10 0 0 1 -10 7 C -10 2 -6 -4 0 -14 Z"
      fill="#7cc6ee"
      stroke={OUTLINE}
      strokeWidth={3}
    />
  );
};

const StuckWord: Visual = () => (
  <g>
    <Paper />
    <Person x={300} y={530} scale={1.3} shirt="#3fb4a0" />
    <Strain x={300} y={283} delay={18} />
    <ThoughtBubble x={630} y={185} r={125} delay={6}>
      <Tiles letters={[null, null, null, null]} size={46} gap={10} />
    </ThoughtBubble>
    <QuestionMark x={150} y={170} size={70} delay={24} />
    <QuestionMark x={830} y={420} size={60} delay={30} />
  </g>
);

const NameReveal: Visual = () => {
  const people = [
    { x: 120, shirt: "#e07a5f", hair: "#2b1d14", hat: "none" as const, glasses: false },
    { x: 285, shirt: "#5b8def", hair: "#b0b0b0", hat: "none" as const, glasses: true },
    { x: 450, shirt: "#f2b134", hair: "#4a2f1d", hat: "cap" as const, glasses: false },
    { x: 615, shirt: "#8e6bbf", hair: "#7a4a22", hat: "none" as const, glasses: false },
    { x: 780, shirt: "#3fb4a0", hair: "#1f1f1f", hat: "none" as const, glasses: true },
  ];
  return (
    <g>
      <Paper />
      {people.map((p, i) => (
        <g key={i}>
          <Person x={p.x} y={540} scale={0.85} shirt={p.shirt} hair={p.hair} hat={p.hat} glasses={p.glasses} facing={i % 2 ? "left" : "right"} delay={14 + i * 5} />
          <QuestionMark x={p.x} y={312} size={46} delay={26 + i * 4} />
        </g>
      ))}
      <Note x={450} y={145} width={540} title="DİLİN UCUNDA" text="OLMA HALİ" delay={2} />
    </g>
  );
};

const FirstLetter: Visual = () => {
  const reveal = useAppear(18, 14);
  const arrow = useProgress(30, 42);
  return (
    <g>
      <Paper />
      <rect x={120} y={110} width={660} height={200} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <g transform="translate(450 215)">
        <Tiles letters={["K", null, null, null, null, null]} size={80} gap={18} reveal={reveal} />
      </g>
      <Arrow from={[211, 410]} to={[211, 300]} progress={arrow} color={RED} />
      <Chip x={211} y={450} text="İLK HARF" delay={38} />
      <Person x={690} y={548} scale={0.8} shirt="#ffffff" glasses presenting delay={6} />
      <Sparkles points={[[175, 125], [250, 330], [100, 250]]} />
    </g>
  );
};

const MeaningSound: Visual = () => {
  const frame = useCurrentFrame();
  const toMeaning = useProgress(6, 22);
  const lineIn = useProgress(24, 36);
  const flicker = frame % 10 < 5 ? 1 : 0.25;
  const meaning = useAppear(14);
  const sound = useAppear(26);
  const cross = useAppear(40);
  const shake = useWave(8, 4);
  return (
    <g>
      <Paper />
      <Brain x={190} y={300} scale={1.15} mood="confused" />
      <Arrow from={[300, 245]} to={[470, 160]} progress={toMeaning} color="#2f9e5b" />
      <g transform={place(640, 140, meaning)}>
        <rect x={-150} y={-55} width={300} height={110} rx={22} fill="#7fd18b" stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={16} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={48} fill={INK}>
          ANLAM
        </text>
      </g>
      <line
        x1={640}
        y1={200}
        x2={640}
        y2={200 + 160 * lineIn}
        stroke={OUTLINE}
        strokeWidth={10}
        strokeDasharray="22 18"
        strokeLinecap="round"
        opacity={lineIn > 0 ? flicker : 0}
      />
      <g transform={place(640, 420, sound)}>
        <rect x={-150} y={-55} width={300} height={110} rx={22} fill="#cfcfcf" stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={16} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={48} fill="#6b6b6b">
          SES ?
        </text>
      </g>
      <g transform={place(640 + shake, 285, cross)} stroke={RED} strokeWidth={14} strokeLinecap="round">
        <path d="M -32 -32 L 32 32 M 32 -32 L -32 32" />
      </g>
    </g>
  );
};

const AgePopUp: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const half = Math.round(durationInFrames * 0.45);
  return (
    <g>
      <Paper />
      <Person x={170} y={495} scale={1.05} shirt="#5b8def" delay={2} />
      <QuestionMark x={170} y={225} size={56} delay={10} />
      <NamePlate x={170} y={530} text="20 YAŞ" delay={6} />
      <Person x={430} y={495} scale={1.05} shirt="#c97b4a" hair="#c8c8c8" glasses mustache delay={6} />
      <QuestionMark x={385} y={235} size={56} delay={14} />
      <QuestionMark x={435} y={205} size={64} delay={18} />
      <QuestionMark x={485} y={235} size={56} delay={22} />
      <NamePlate x={430} y={530} text="70 YAŞ" delay={10} />
      <ThoughtBubble x={690} y={170} r={110} delay={half}>
        <BigText x={0} y={4} text="!" size={150} color={RED} delay={half + 6} />
      </ThoughtBubble>
      {frame >= half ? <Sparkles points={[[580, 70], [810, 90], [820, 290], [570, 300]]} /> : null}
      <Chip x={700} y={420} text="SONRA GELİR" dark delay={half + 10} />
    </g>
  );
};

// Bileği (0,0) olan, yukarı bakan el
const Hand: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => {
  const frame = useCurrentFrame();
  const sway = useWave(45, 6);
  const glow = 26 + Math.abs(Math.sin(frame / 6)) * 12;
  const fingers = [
    { x: -66, h: 120 },
    { x: 6, h: 138 },
    { x: 42, h: 108 },
  ];
  return (
    <g transform={place(x, y, scale, sway)}>
      <rect x={-84} y={-10} width={168} height={110} rx={10} fill="#3fb4a0" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-30} y={-110} width={34} height={100} rx={17} fill={SKIN} stroke={OUTLINE} strokeWidth={6} transform="translate(-60 -10) rotate(-45)" />
      {fingers.map((f, i) => (
        <rect key={i} x={f.x} y={-150 - f.h + 40} width={32} height={f.h} rx={16} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      ))}
      <rect x={-76} y={-150} width={152} height={150} rx={46} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-14} cy={-245} r={glow} fill={YELLOW} opacity={0.55} />
      <rect x={-30} y={-260} width={32} height={150} rx={16} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <QuestionMark x={-14} y={-320} size={70} delay={20} />
    </g>
  );
};

const FingerTip: Visual = () => (
  <g>
    <Paper />
    <Hand x={300} y={470} scale={1.05} />
    <ThoughtBubble x={680} y={180} r={110} delay={10}>
      <Tiles letters={[null, null, null, null]} size={44} gap={10} />
    </ThoughtBubble>
    <Chip x={680} y={430} text="PARMAK UCUNDA" delay={28} />
  </g>
);

const DontForce: Visual = () => {
  const frame = useCurrentFrame();
  const arrow = useProgress(22, 36);
  const clock = useAppear(8);
  return (
    <g>
      <Paper />
      <Person x={160} y={520} scale={1.15} shirt="#e07a5f" />
      <Strain x={160} y={302} delay={4} />
      <SweatDrop x={210} y={270} phase={0} />
      <SweatDrop x={110} y={280} phase={14} />
      <g transform={place(440, 220, clock)}>
        <circle r={95} fill="#fff" stroke={OUTLINE} strokeWidth={7} />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={0} y1={-80} x2={0} y2={-68} stroke={OUTLINE} strokeWidth={5} transform={`rotate(${i * 30})`} />
        ))}
        <line x1={0} y1={0} x2={0} y2={-70} stroke={RED} strokeWidth={8} strokeLinecap="round" transform={`rotate(${frame * 10})`} />
        <circle r={9} fill={OUTLINE} />
      </g>
      <Chip x={440} y={375} text="UZUN SÜRE" delay={14} />
      <Arrow from={[555, 220]} to={[640, 220]} progress={arrow} color={INK} />
      <BigText x={745} y={225} text="×2" size={150} delay={36} />
      <Chip x={700} y={470} text="TEKRAR TAKILMA" dark delay={44} />
    </g>
  );
};

const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const card = useAppear(8);
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Person x={210} y={530} scale={1.3} shirt="#3fb4a0" presenting />
      <g transform={place(610, 200, card)}>
        <rect x={-220} y={-110} width={440} height={220} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -160 106 L -190 160 L -110 106 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-150} y={100} width={44} height={12} fill="#fff" />
        <circle cx={-150} cy={-40} r={36} fill="#f2b134" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-90} y={-62} width={220} height={18} rx={9} fill="#d9d9d9" />
        <rect x={-90} y={-26} width={160} height={18} rx={9} fill="#e6e6e6" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={-40 + i * 40} cy={50 + Math.min(0, Math.sin((frame - i * 5) / 4)) * 12} r={13} fill={INK} />
        ))}
        <Heart x={160} y={50} size={0.7} delay={20} />
      </g>
      <g transform={place(610, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={24} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  StuckWord,
  NameReveal,
  FirstLetter,
  MeaningSound,
  AgePopUp,
  FingerTip,
  DontForce,
  YourTurn,
};
