// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Üretim etkisi — sesli okuyunca daha iyi hatırlamak (2026-11-01-ogle)
import { useCurrentFrame } from "remotion";
import {
  BigText,
  Brain,
  Chip,
  INK,
  Note,
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
const PAPER = "#f3efff";
const PURPLE = "#6a4cf5";
const MINT = "#3fcf9f";
const GREY = "#c9c4d8";

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    <rect y={470} width={900} height={90} fill="#e4dcff" />
    <line x1={0} y1={470} x2={900} y2={470} stroke="#cbbcff" strokeWidth={4} />
  </g>
);

// Omuzlarıyla birlikte baş; (x, y) omuzların alt ortası, baş merkezi y - 110 - r
const Head: React.FC<{
  x: number;
  y: number;
  scale?: number;
  talk?: boolean;
  shirt?: string;
  hair?: string;
  delay?: number;
}> = ({ x, y, scale = 1, talk = false, shirt = MINT, hair = "#4a2f1d", delay = 0 }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const blink = frame % 80 > 75 ? 0.15 : 1;
  const r = 70;
  const mouth = talk ? 0.5 + 0.5 * Math.abs(Math.sin(frame / 3.2)) : 0;
  return (
    <g transform={place(x, y, scale * appear)}>
      <path d="M -95 0 C -95 -70 -60 -95 0 -95 C 60 -95 95 -70 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-18} y={-112} width={36} height={26} fill="#f2c79a" stroke={OUTLINE} strokeWidth={4} />
      <g transform={`translate(0 ${-110 - r})`}>
        <circle cx={-r} cy={6} r={14} fill="#f2c79a" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={r} cy={6} r={14} fill="#f2c79a" stroke={OUTLINE} strokeWidth={4} />
        <circle r={r} fill="#f2c79a" stroke={OUTLINE} strokeWidth={5} />
        <path
          d={`M ${-r} -4 C ${-r - 6} ${-r - 10} ${r + 6} ${-r - 10} ${r} -4 C ${r * 0.5} -40 ${-r * 0.4} -44 ${-r} -4 Z`}
          fill={hair}
          stroke={OUTLINE}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <g transform={`translate(0 ${-8 * (1 - blink)}) scale(1 ${blink})`}>
          <circle cx={-24} cy={-8} r={8} fill={OUTLINE} />
          <circle cx={24} cy={-8} r={8} fill={OUTLINE} />
        </g>
        <circle cx={-44} cy={20} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={44} cy={20} r={10} fill="#f59ab0" opacity={0.7} />
        {talk ? (
          <ellipse cx={0} cy={32} rx={16} ry={4 + 14 * mouth} fill="#7a2335" stroke={OUTLINE} strokeWidth={4} />
        ) : (
          <path d="M -14 28 Q 0 40 14 28" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};

// Ağızdan çıkan ses dalgaları; (x, y) dalgaların başladığı nokta
const SoundWaves: React.FC<{ x: number; y: number; scale?: number; color?: string; delay?: number }> = ({
  x,
  y,
  scale = 1,
  color = PURPLE,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, scale * appear)} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round">
      {[0, 1, 2].map((i) => {
        const p = ((frame + i * 8) % 24) / 24;
        return <path key={i} d={`M ${20 + i * 26} -${24 + i * 14} Q ${36 + i * 30} 0 ${20 + i * 26} ${24 + i * 14}`} opacity={0.4 + 0.6 * (1 - p)} />;
      })}
    </g>
  );
};

// Hoparlör simgesi
const Speaker: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = PURPLE }) => (
  <g transform={place(x, y, scale)}>
    <path d="M -18 -10 L -6 -10 L 8 -22 L 8 22 L -6 10 L -18 10 Z" fill={color} stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
    <path d="M 16 -10 Q 24 0 16 10" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
  </g>
);

// Kelime kartı
const Card: React.FC<{ x: number; y: number; text: string; lit?: boolean; scale?: number; delay?: number; speaker?: boolean }> = ({
  x,
  y,
  text,
  lit = false,
  scale = 1,
  delay = 0,
  speaker = false,
}) => {
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, scale * appear)}>
      {lit ? <rect x={-86} y={-40} width={172} height={80} rx={18} fill={YELLOW} opacity={0.55} /> : null}
      <rect x={-75} y={-30} width={150} height={60} rx={12} fill={lit ? "#fff" : "#f4f2f8"} stroke={lit ? PURPLE : "#8c869a"} strokeWidth={lit ? 6 : 4} />
      <text x={speaker ? -16 : 0} y={9} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={speaker ? 22 : 26} fill={lit ? INK : "#8c869a"}>
        {text}
      </text>
      {speaker ? <Speaker x={52} y={0} scale={0.7} /> : null}
    </g>
  );
};

// Açık kitap; (0,0) kitabın alt ortası
const Book: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <path d="M 0 -10 L -150 -30 L -150 -150 L 0 -130 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 0 -10 L 150 -30 L 150 -150 L 0 -130 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i} stroke="#b8b2c8" strokeWidth={5} strokeLinecap="round">
        <line x1={-130} y1={-120 + i * 24} x2={-20} y2={-106 + i * 24} />
        <line x1={20} y1={-106 + i * 24} x2={130} y2={-120 + i * 24} />
      </g>
    ))}
  </g>
);

const StudyAloud: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <Head x={300} y={500} talk shirt={MINT} />
      <SoundWaves x={330} y={280} delay={8} />
      {/* Masa ve kitap */}
      <rect x={140} y={470} width={420} height={26} rx={8} fill="#a77a4d" stroke={OUTLINE} strokeWidth={5} />
      <Book x={300} y={500} scale={0.75} />
      {/* Kafadaki ampul */}
      <g transform={place(660, 190, useAppear(26), Math.sin(frame / 10) * 5)}>
        <circle r={70} fill={YELLOW} opacity={0.35} />
        <path d="M -36 10 C -60 -30 -36 -78 0 -78 C 36 -78 60 -30 36 10 L 24 34 L -24 34 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-24} y={34} width={48} height={28} rx={6} fill={GREY} stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Chip x={660} y={360} text="AKILDA!" delay={34} />
      <Sparkles points={[[560, 120], [770, 110], [780, 280]]} />
    </g>
  );
};

const NameReveal: Visual = () => {
  return (
    <g>
      <Paper />
      <Note x={450} y={130} width={620} title="ÜRETİM ETKİSİ" rotate={-2} delay={2} />
      <Brain x={450} y={380} scale={0.95} mood="happy" delay={10} />
      <SoundWaves x={560} y={370} delay={18} />
      <g transform="scale(-1 1) translate(-900 0)">
        <SoundWaves x={560} y={370} delay={18} />
      </g>
    </g>
  );
};

const WordCards: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const g1 = useProgress(at(0.55), at(0.75));
  const words = ["ELMA", "KÖPRÜ", "BULUT"];
  return (
    <g>
      <Paper />
      <Chip x={225} y={60} text="SESLİ" delay={2} />
      <Chip x={675} y={60} text="SESSİZ" dark delay={8} />
      {words.map((w, i) => (
        <Card key={w} x={225} y={140 + i * 80} text={w} lit speaker delay={6 + i * 6} />
      ))}
      {["KALEM", "DENİZ", "KAPI"].map((w, i) => (
        <Card key={w} x={675} y={140 + i * 80} text={w} delay={12 + i * 6} />
      ))}
      <line x1={450} y1={90} x2={450} y2={440} stroke="#cbbcff" strokeWidth={5} strokeDasharray="14 12" />
      {/* Hatırlanma çubukları */}
      <rect x={130} y={455 - 0} width={190 * g1} height={36} rx={10} fill={MINT} stroke={OUTLINE} strokeWidth={4} opacity={g1 > 0 ? 1 : 0} />
      <rect x={580} y={455} width={110 * g1} height={36} rx={10} fill={GREY} stroke={OUTLINE} strokeWidth={4} opacity={g1 > 0 ? 1 : 0} />
      <BigText x={370} y={474} text="✓" size={60} color={MINT} delay={at(0.75)} />
    </g>
  );
};

const StandOut: Visual = () => {
  const frame = useCurrentFrame();
  const lift = useProgress(18, 34);
  const pulse = 1 + 0.04 * Math.sin(frame / 5);
  const xs = [110, 280, 450, 620, 790];
  return (
    <g>
      <Paper />
      {xs.map((x, i) =>
        i === 2 ? null : <Card key={x} x={x} y={330} text="•••" scale={0.85} delay={i * 3} />,
      )}
      <g transform={`translate(0 ${-90 * lift})`}>
        <Card x={450} y={330} text="BİLGİ" lit scale={(1 + 0.35 * lift) * pulse} delay={6} />
      </g>
      <Head x={450} y={560} talk scale={0.5} shirt={PURPLE} delay={4} />
      <SoundWaves x={470} y={440} scale={0.6} delay={10} />
      <Chip x={450} y={90} text="ÖNE ÇIKTI" delay={30} />
      <Sparkles points={[[330, 190], [580, 200], [450, 140]]} />
    </g>
  );
};

const VoiceRanking: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const p1 = useProgress(at(0.1), at(0.3));
  const p2 = useProgress(at(0.4), at(0.6));
  const p3 = useProgress(at(0.6), at(0.8));
  const step = (x: number, h: number, label: string, rank: string, prog: number, color: string) => (
    <g opacity={prog > 0 ? 1 : 0}>
      <rect x={x - 115} y={470 - h * prog} width={230} height={h * prog} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <text x={x} y={470 - h * prog + 52} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill="#fff" stroke={OUTLINE} strokeWidth={3} paintOrder="stroke">
        {rank}
      </text>
      <Chip x={x} y={512} text={label} />
    </g>
  );
  return (
    <g>
      <Paper />
      {step(450, 190, "SESLİ OKU", "1", p1, PURPLE)}
      {step(170, 130, "KENDİ KAYDIN", "2", p2, MINT)}
      {step(730, 80, "BAŞKASI", "3", p3, GREY)}
      {/* Kazanan: konuşan karakter */}
      <g opacity={p1}>
        <Head x={450} y={280} talk scale={0.55} shirt={PURPLE} />
        <SoundWaves x={470} y={170} scale={0.55} />
      </g>
      {/* Kendi kaydı: telefon */}
      <g transform={place(170, 340 - 130 * p2 + 130 - 40, p2)}>
        <rect x={-34} y={-60} width={68} height={120} rx={12} fill={OUTLINE} />
        <rect x={-26} y={-48} width={52} height={92} rx={6} fill="#bfe9ff" />
        <circle cx={0} cy={0} r={16} fill={RED} />
      </g>
      {/* Başkası: hoparlör */}
      <g opacity={p3}>
        <Speaker x={730} y={350} scale={1.6} color={GREY} />
      </g>
    </g>
  );
};

const AllAloud: Visual = () => {
  const frame = useCurrentFrame();
  const pos: [number, number][] = [
    [190, 170],
    [450, 170],
    [710, 170],
    [190, 290],
    [450, 290],
    [710, 290],
  ];
  return (
    <g>
      <Paper />
      {pos.map(([x, y], i) => (
        <Card key={i} x={x} y={y + Math.sin((frame + i * 9) / 6) * 3} text="SESLİ" lit speaker delay={i * 3} />
      ))}
      <BigText x={450} y={410} text="=" size={90} color={RED} delay={22} />
      <Chip x={450} y={500} text="FARK YOK" dark delay={26} />
      <QuestionMark x={810} y={410} size={70} delay={30} />
    </g>
  );
};

const HighlightTip: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const h1 = useProgress(6, 22);
  const h2 = useProgress(24, 40);
  const lips = Math.abs(useWave(16, 1));
  return (
    <g>
      <Paper />
      {/* Defter sayfası */}
      <g transform="translate(110 70)">
        <rect x={0} y={0} width={380} height={380} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={30} y1={50 + i * 46} x2={350 - (i % 3) * 50} y2={50 + i * 46} stroke="#b8b2c8" strokeWidth={6} strokeLinecap="round" />
        ))}
        <rect x={22} y={122} width={320 * h1} height={30} rx={6} fill={YELLOW} opacity={0.75} />
        <rect x={22} y={260} width={290 * h2} height={30} rx={6} fill={YELLOW} opacity={0.75} />
        <g opacity={h1}>
          <Speaker x={360} y={137} scale={0.8} />
        </g>
        <g opacity={h2}>
          <Speaker x={330} y={275} scale={0.8} />
        </g>
      </g>
      <Chip x={300} y={500} text="SADECE ÖNEMLİ" delay={10} />
      {/* Kütüphane: dudak oynatma */}
      <g transform={place(705, 220, useAppear(at(0.55)))}>
        <circle r={110} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <path d={`M -62 0 C -40 -40 -12 -36 0 -26 C 12 -36 40 -40 62 0 C 40 ${10 + 30 * lips} -40 ${10 + 30 * lips} -62 0 Z`} fill="#e0566e" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <path d={`M -54 0 Q 0 ${-4 + 24 * lips} 54 0`} fill="#7a2335" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Chip x={705} y={390} text="DUDAK OYNAT" dark delay={at(0.62)} />
    </g>
  );
};

const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const card = useAppear(10);
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Head x={210} y={540} talk scale={1.05} shirt={PURPLE} />
      <g transform={place(610, 200, card)}>
        <rect x={-230} y={-100} width={460} height={200} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -170 96 L -210 150 L -120 96 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-165} y={90} width={44} height={12} fill="#fff" />
        <text x={0} y={-12} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={46} fill={PURPLE}>
          SESLİ Mİ?
        </text>
        <text x={0} y={46} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={46} fill={INK}>
          SESSİZ Mİ?
        </text>
      </g>
      <g transform={place(610, 430, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={20} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  StudyAloud,
  NameReveal,
  WordCards,
  StandOut,
  VoiceRanking,
  AllAloud,
  HighlightTip,
  YourTurn,
};
