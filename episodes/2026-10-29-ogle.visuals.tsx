// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Bulaşıcı esneme (2026-10-29-ogle)
import { interpolate, useCurrentFrame } from "remotion";
import {
  BigText,
  Bottle,
  Brain,
  Chip,
  Heart,
  INK,
  NamePlate,
  Note,
  place,
  QuestionMark,
  RED,
  Sparkles,
  uiFont,
  useAppear,
  useProgress,
  useWave,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff0f4";
const PINK = "#f06a9b";

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    <rect y={470} width={900} height={90} fill="#ffd9e5" />
    <line x1={0} y1={470} x2={900} y2={470} stroke="#f3b6c9" strokeWidth={4} />
  </g>
);

// Esneme eğrisi: start karesinde başlar, len kare sürer; 0 → 1 → 0
const useYawn = (start: number, len = 40) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + len * 0.35, start + len * 0.7, start + len], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

// Omuzlarıyla birlikte baş; (x, y) omuzların alt ortası. open: 0 kapalı ağız, 1 kocaman esneme
const Head: React.FC<{
  x: number;
  y: number;
  open: number;
  scale?: number;
  skin?: string;
  hair?: string;
  shirt?: string;
  delay?: number;
  child?: boolean;
  awake?: boolean;
}> = ({ x, y, open, scale = 1, skin = "#f2c79a", hair = "#4a2f1d", shirt = "#5b8def", delay = 0, child = false, awake = false }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const blink = frame % 80 > 75 ? 0.15 : 1;
  const tilt = -8 * open;
  const r = child ? 62 : 70;
  return (
    <g transform={place(x, y, scale * appear)}>
      {/* Omuzlar */}
      <path d="M -95 0 C -95 -70 -60 -95 0 -95 C 60 -95 95 -70 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-18} y={-112} width={36} height={26} fill={skin} stroke={OUTLINE} strokeWidth={4} />
      <g transform={`translate(0 ${-110 - r}) rotate(${tilt})`}>
        {/* Kulaklar */}
        <circle cx={-r} cy={6} r={14} fill={skin} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={r} cy={6} r={14} fill={skin} stroke={OUTLINE} strokeWidth={4} />
        <circle r={r} fill={skin} stroke={OUTLINE} strokeWidth={5} />
        {/* Saç */}
        {child ? (
          <path d="M -10 -60 Q 0 -86 14 -66" fill="none" stroke={hair} strokeWidth={8} strokeLinecap="round" />
        ) : (
          <path
            d={`M ${-r} -4 C ${-r - 6} ${-r - 10} ${r + 6} ${-r - 10} ${r} -4 C ${r * 0.5} -40 ${-r * 0.4} -44 ${-r} -4 Z`}
            fill={hair}
            stroke={OUTLINE}
            strokeWidth={4}
            strokeLinejoin="round"
          />
        )}
        {/* Gözler: esnerken kapanır */}
        {open > 0.35 && !awake ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round">
            <path d="M -36 -8 Q -24 -1 -12 -8" />
            <path d="M 12 -8 Q 24 -1 36 -8" />
          </g>
        ) : (
          <g transform={`scale(1 ${blink})`}>
            <circle cx={-24} cy={-8} r={awake ? 13 : 8} fill={awake ? "#fff" : OUTLINE} stroke={OUTLINE} strokeWidth={awake ? 4 : 0} />
            <circle cx={24} cy={-8} r={awake ? 13 : 8} fill={awake ? "#fff" : OUTLINE} stroke={OUTLINE} strokeWidth={awake ? 4 : 0} />
            {awake ? (
              <g fill={OUTLINE}>
                <circle cx={-22} cy={-6} r={6} />
                <circle cx={26} cy={-6} r={6} />
              </g>
            ) : null}
          </g>
        )}
        {/* Yanaklar */}
        <circle cx={-44} cy={20} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={44} cy={20} r={10} fill="#f59ab0" opacity={0.7} />
        {/* Ağız */}
        {open > 0.05 ? (
          <ellipse cx={0} cy={30} rx={14 + 10 * open} ry={6 + 26 * open} fill="#7a2335" stroke={OUTLINE} strokeWidth={4} />
        ) : awake ? (
          <circle cx={0} cy={30} r={7} fill="#7a2335" stroke={OUTLINE} strokeWidth={3} />
        ) : (
          <path d="M -14 28 Q 0 38 14 28" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        )}
      </g>
      {/* Esneme dalgaları */}
      {open > 0.5 ? (
        <g fill="none" stroke={PINK} strokeWidth={5} strokeLinecap="round" opacity={(open - 0.5) * 2}>
          <path d={`M ${r + 22} ${-150 - r} q 16 -10 30 0`} />
          <path d={`M ${r + 16} ${-120 - r} q 20 -8 38 4`} />
        </g>
      ) : null}
    </g>
  );
};

// Sahne boyunca yayılan halkalar ("bulaşma")
const Ripples: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  return (
    <g fill="none" stroke={PINK} strokeWidth={5}>
      {[0, 1, 2].map((i) => {
        const p = ((t + i * 20) % 60) / 60;
        return frame >= delay ? <circle key={i} cx={x} cy={y} r={60 + p * 200} opacity={1 - p} /> : null;
      })}
    </g>
  );
};

const YawnChain: Visual = () => {
  const a = useYawn(4, 42);
  const b = useYawn(32, 42);
  const c = useYawn(60, 46);
  return (
    <g>
      <Paper />
      <Head x={170} y={500} open={a} shirt="#f2b134" delay={0} />
      <Head x={450} y={500} open={b} shirt="#3fb4a0" hair="#2b2b2b" delay={4} />
      <Head x={730} y={500} open={c} shirt={PINK} hair="#8a4b22" delay={8} />
      <NamePlate x={730} y={520} text="SEN" delay={56} />
      <g opacity={a > 0.4 ? 1 : 0}>
        <Chip x={170} y={70} text="1" delay={10} />
      </g>
      <g opacity={b > 0.4 ? 1 : 0}>
        <Chip x={450} y={70} text="2" delay={38} />
      </g>
      <g opacity={c > 0.4 ? 1 : 0}>
        <Chip x={730} y={70} text="3" delay={66} />
      </g>
      <BigText x={310} y={250} text="→" size={90} color={PINK} delay={28} />
      <BigText x={590} y={250} text="→" size={90} color={PINK} delay={56} />
    </g>
  );
};

const NameReveal: Visual = () => {
  const open = useYawn(14, 60);
  return (
    <g>
      <Paper />
      <Ripples x={450} y={360} delay={18} />
      <Note x={450} y={120} width={640} title="BULAŞICI ESNEME" rotate={-2} delay={2} />
      <Head x={450} y={540} open={open} scale={1.05} shirt={PINK} delay={6} />
      <Sparkles points={[[150, 260], [760, 240], [700, 430]]} />
    </g>
  );
};

const VideoLab: Visual = ({ durationInFrames }) => {
  const screenYawn = useYawn(8, 50);
  const v1 = useYawn(34, 46);
  const v3 = useYawn(50, 46);
  const result = Math.round(durationInFrames * 0.55);
  return (
    <g>
      <Paper />
      {/* Ekran */}
      <g transform={place(450, 190, useAppear(0))}>
        <rect x={-210} y={-140} width={420} height={260} rx={22} fill="#1f2b33" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-188} y={-118} width={376} height={216} rx={12} fill="#ffe3ec" />
        <svg x={-188} y={-118} width={376} height={216} overflow="hidden">
          <Head x={188} y={250} open={screenYawn} scale={0.85} shirt="#f2b134" />
        </svg>
        <rect x={-40} y={120} width={80} height={24} fill="#1f2b33" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={170} cy={-100} r={9} fill={RED} />
      </g>
      {/* İzleyiciler (arkadan değil, bize dönük küçük figürler) */}
      <Head x={150} y={540} open={v1} scale={0.62} shirt="#3fb4a0" delay={6} />
      <Head x={350} y={540} open={0} scale={0.62} shirt="#5b8def" hair="#2b2b2b" delay={10} />
      <Head x={550} y={540} open={v3} scale={0.62} shirt={PINK} hair="#8a4b22" delay={14} />
      <Head x={750} y={540} open={0} scale={0.62} shirt="#9b7ede" delay={18} />
      <Chip x={760} y={70} text="ÜÇTE BİR – YARI" delay={result} />
    </g>
  );
};

const OxygenMyth: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const open = useYawn(at(0.55), 50);
  const bubble = useWave(30, 6);
  return (
    <g>
      <Paper />
      <Chip x={250} y={80} text="OKSİJEN EKSİKLİĞİ?" dark delay={2} />
      <BigText x={490} y={82} text="✗" size={110} color={RED} delay={at(0.22)} />
      <Bottle x={720} y={430} color="#8fd3f5" label="O2" scale={1.6} delay={6} />
      {/* Hortum: tüpten yüze */}
      <path
        d={`M 720 330 C 700 ${250 + bubble} 560 ${260 - bubble} 480 380`}
        fill="none"
        stroke={OUTLINE}
        strokeWidth={10}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={`${useProgress(10, 26)} 1`}
      />
      <Head x={400} y={540} open={open} scale={1.0} shirt="#3fb4a0" delay={2} />
      <Chip x={700} y={110} text="YİNE ESNEDİ" delay={at(0.62)} />
    </g>
  );
};

const CloseOnes: Visual = () => {
  const g1 = useProgress(14, 34);
  const g2 = useProgress(22, 42);
  const g3 = useProgress(30, 50);
  const bar = (x: number, h: number, color: string, label: string, delay: number) => (
    <g>
      <rect x={x - 80} y={430 - h} width={160} height={h} rx={12} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <Chip x={x} y={490} text={label} delay={delay} />
    </g>
  );
  return (
    <g>
      <Paper />
      <line x1={70} y1={430} x2={830} y2={430} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {bar(190, 260 * g1, PINK, "AİLE", 10)}
      {bar(450, 190 * g2, "#f2b134", "ARKADAŞ", 18)}
      {bar(710, 80 * g3, "#9fb0c4", "YABANCI", 26)}
      <Heart x={190} y={430 - 260 * g1 - 50} size={0.55} beat delay={36} />
      <Heart x={450} y={430 - 190 * g2 - 45} size={0.4} delay={44} />
      <QuestionMark x={710} y={430 - 80 * g3 - 60} size={70} delay={52} />
    </g>
  );
};

const KidsImmune: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const frame = useCurrentFrame();
  const adult = useYawn(6, 60);
  const ruler = useProgress(at(0.35), at(0.7));
  const wobble = Math.sin(frame / 8) * 4;
  return (
    <g>
      <Paper />
      <Head x={230} y={470} open={adult} scale={1.05} shirt="#5b8def" delay={0} />
      <g transform={`rotate(${wobble} 640 400)`}>
        <Head x={640} y={470} open={0} scale={0.85} shirt="#ffd166" skin="#f6d2ad" child awake delay={6} />
      </g>
      <QuestionMark x={760} y={150} size={70} delay={30} />
      <Chip x={640} y={80} text="KAPMIYOR" dark delay={26} />
      {/* Yaş cetveli */}
      <g transform="translate(160 520)">
        <rect x={0} y={-22} width={580} height={44} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <rect x={0} y={-22} width={580 * ruler} height={44} rx={22} fill={PINK} opacity={0.6} />
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <text
            key={n}
            x={45 + i * 98}
            y={11}
            textAnchor="middle"
            fontFamily={uiFont}
            fontWeight={800}
            fontSize={n === 4 ? 34 : 28}
            fill={n === 4 && ruler > 0.5 ? RED : INK}
          >
            {n}
          </text>
        ))}
      </g>
      <Chip x={780} y={430} text="4 YAŞ" delay={at(0.62)} />
    </g>
  );
};

const StillMystery: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const together = useYawn(at(0.45), 50);
  return (
    <g>
      <Paper />
      <Brain x={450} y={150} scale={0.75} mood="confused" delay={0} />
      <QuestionMark x={300} y={110} size={70} delay={6} />
      <QuestionMark x={610} y={100} size={60} delay={12} color={PINK} />
      <Head x={210} y={540} open={together} scale={0.75} shirt="#f2b134" delay={10} />
      <Head x={450} y={540} open={together} scale={0.75} shirt="#3fb4a0" hair="#2b2b2b" delay={14} />
      <Head x={690} y={540} open={together} scale={0.75} shirt={PINK} hair="#8a4b22" delay={18} />
      <Chip x={760} y={250} text="AYNI ANDA" delay={at(0.5)} />
      <Chip x={150} y={250} text="UYANIK" dark delay={at(0.62)} />
    </g>
  );
};

const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const open = useYawn(4, 50);
  const card = useAppear(10);
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Head x={210} y={540} open={open} scale={1.05} shirt={PINK} />
      <g transform={place(610, 200, card)}>
        <rect x={-230} y={-100} width={460} height={200} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -170 96 L -210 150 L -120 96 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-165} y={90} width={44} height={12} fill="#fff" />
        <text x={0} y={-12} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={46} fill={INK}>
          SEN DE
        </text>
        <text x={0} y={46} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={46} fill={RED}>
          ESNEDİN Mİ?
        </text>
      </g>
      <g transform={place(610, 430, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={20} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  YawnChain,
  NameReveal,
  VideoLab,
  OxygenMyth,
  CloseOnes,
  KidsImmune,
  StillMystery,
  YourTurn,
};
