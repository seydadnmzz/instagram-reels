// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Kendini sınama etkisi — okudun ama hatırlamıyorsun (2026-11-01-sabah)
import { useCurrentFrame } from "remotion";
import {
  Brain,
  BigText,
  Chip,
  INK,
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
const WALL = "#e9e2ff";
const FLOOR = "#d9ccff";
const SKIN = "#f2c79a";
const PURPLE = "#6a4cf5";
const MINT = "#3fcf9f";
const ORANGE = "#ff9a3d";
const BLUE = "#5b8def";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

type Mood = "worried" | "calm" | "happy" | "think" | "smug";

// Belden yukarı karakter; (0,0) gövdenin alt ortası. Kafa merkezi y=-200.
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  mood: Mood;
  shirt?: string;
  hair?: string;
  delay?: number;
  glasses?: boolean;
}> = ({ x, y, scale = 1, mood, shirt = MINT, hair = "#4a2f1d", delay = 0, glasses = false }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <Face mood={mood} />
      {glasses ? (
        <g fill="none" stroke={OUTLINE} strokeWidth={5}>
          <circle cx={-26} cy={-198} r={18} />
          <circle cx={26} cy={-198} r={18} />
          <path d="M -8 -198 L 8 -198" />
        </g>
      ) : null}
    </g>
  );
};

const Face: React.FC<{ mood: Mood }> = ({ mood }) => {
  const frame = useCurrentFrame();
  const blink = frame % 80 > 75 ? 0.15 : 1;
  const eyes = (
    <g transform={`translate(0 ${-198 * (1 - blink)}) scale(1 ${blink})`}>
      <circle cx={-26} cy={-198} r={8} fill={OUTLINE} />
      <circle cx={26} cy={-198} r={8} fill={OUTLINE} />
    </g>
  );
  if (mood === "worried") {
    return (
      <g>
        <path d="M -44 -218 L -12 -228" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <path d="M 44 -218 L 12 -228" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        {eyes}
        <path d="M -24 -156 Q -12 -170 0 -158 Q 12 -146 24 -160" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <path d="M 60 -230 Q 70 -212 62 -204 Q 52 -212 60 -230 Z" fill="#8fd3ff" stroke={OUTLINE} strokeWidth={3} />
      </g>
    );
  }
  if (mood === "think") {
    return (
      <g>
        <path d="M -42 -222 Q -26 -232 -10 -222" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <path d="M 12 -226 Q 28 -236 44 -226" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        {eyes}
        <path d="M -18 -162 L 18 -166" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      </g>
    );
  }
  if (mood === "smug") {
    return (
      <g>
        <path d="M -42 -206 Q -26 -194 -10 -206" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <path d="M 10 -206 Q 26 -194 42 -206" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <path d="M -28 -166 Q 0 -150 30 -172" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g>
      {eyes}
      {mood === "happy" ? (
        <path d="M -32 -168 Q 0 -136 32 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      ) : (
        <path d="M -24 -166 Q 0 -150 24 -166" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      )}
      <circle cx={-46} cy={-174} r={10} fill="#f59ab0" opacity={0.7} />
      <circle cx={46} cy={-174} r={10} fill="#f59ab0" opacity={0.7} />
    </g>
  );
};

// Açık kitap; flip: sayfa çevirme açısı (0..1 döngü)
const Book: React.FC<{ x: number; y: number; scale?: number; color?: string; flip?: number; closed?: number; delay?: number }> = ({
  x,
  y,
  scale = 1,
  color = PURPLE,
  flip = 0,
  closed = 0,
  delay = 0,
}) => {
  const a = useAppear(delay);
  const pageW = 110 * Math.cos(flip * Math.PI);
  const rightW = 110 * (1 - closed);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d={`M -120 10 L 0 20 L ${120 - 120 * closed} 10 L ${120 - 120 * closed} -110 L 0 -100 L -120 -110 Z`} fill={color} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -110 0 L 0 8 L 0 -96 L -110 -104 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      {rightW > 4 ? <path d={`M 0 8 L ${rightW} 0 L ${rightW} -104 L 0 -96 Z`} fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" /> : null}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={-96} y1={-82 + i * 20} x2={-16} y2={-76 + i * 20} stroke="#b9b2d6" strokeWidth={5} strokeLinecap="round" />
          {rightW > 60 ? <line x1={14} y1={-76 + i * 20} x2={rightW - 16} y2={-82 + i * 20} stroke="#b9b2d6" strokeWidth={5} strokeLinecap="round" /> : null}
        </g>
      ))}
      {flip > 0 && flip < 1 && closed === 0 ? (
        <path d={`M 0 8 L ${pageW} ${4 - 30 * Math.sin(flip * Math.PI)} L ${pageW} ${-100 - 30 * Math.sin(flip * Math.PI)} L 0 -96 Z`} fill="#f4f1ff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      ) : null}
    </g>
  );
};

// Sınav kâğıdı; lines: yazılmış satır oranı (0..1), checks: tik sayısı
const TestPaper: React.FC<{ x: number; y: number; scale?: number; title?: string; lines?: number; checks?: number; blank?: boolean; rotate?: number; delay?: number }> = ({
  x,
  y,
  scale = 1,
  title = "TEST",
  lines = 0,
  checks = 0,
  blank = false,
  rotate = 0,
  delay = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a, rotate)}>
      <rect x={-100} y={-130} width={200} height={260} rx={8} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <text x={0} y={-90} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
        {title}
      </text>
      {[0, 1, 2, 3, 4].map((i) => {
        const w = Math.max(0, Math.min(1, lines * 5 - i)) * 120;
        return (
          <g key={i}>
            <text x={-82} y={-46 + i * 38} fontFamily={uiFont} fontWeight={800} fontSize={20} fill={INK}>
              {i + 1}.
            </text>
            {blank ? (
              <line x1={-56} y1={-52 + i * 38} x2={64} y2={-52 + i * 38} stroke="#d6d6d6" strokeWidth={4} strokeDasharray="8 8" />
            ) : (
              <line x1={-56} y1={-52 + i * 38} x2={-56 + w} y2={-52 + i * 38} stroke={BLUE} strokeWidth={5} strokeLinecap="round" />
            )}
            {i < checks ? <path d={`M 70 ${-56 + i * 38} L 78 ${-46 + i * 38} L 94 ${-66 + i * 38}`} fill="none" stroke={MINT} strokeWidth={6} strokeLinecap="round" /> : null}
          </g>
        );
      })}
    </g>
  );
};

const Pencil: React.FC<{ x: number; y: number; rotate?: number }> = ({ x, y, rotate = 30 }) => (
  <g transform={place(x, y, 1, rotate)}>
    <rect x={-8} y={-90} width={16} height={80} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
    <rect x={-8} y={-102} width={16} height={14} rx={3} fill="#f28a9a" stroke={OUTLINE} strokeWidth={4} />
    <path d="M -8 -10 L 0 12 L 8 -10 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

const Desk: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={WALL} />
    <rect y={430} width={900} height={130} fill={FLOOR} stroke={OUTLINE} strokeWidth={5} />
    <rect x={40} y={420} width={820} height={40} rx={10} fill="#c98a52" stroke={OUTLINE} strokeWidth={6} />
  </g>
);

// 1) Defalarca okudun, sınavda bomboş
const ReadAgain: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const flip = (frame % 24) / 24;
  const exam = Math.round(durationInFrames * 0.45);
  const examOn = frame > exam;
  return (
    <g>
      <Desk />
      <Bust x={260} y={430} scale={1.1} mood={examOn ? "worried" : "think"} />
      {!examOn ? <Book x={260} y={420} scale={1.2} flip={flip} /> : null}
      {!examOn ? <BigText x={460} y={150} text={`${Math.min(9, 1 + Math.floor(frame / 12))}×`} size={80} color={YELLOW} /> : null}
      {examOn ? <TestPaper x={640} y={300} scale={1.1} title="SINAV" blank delay={exam} rotate={-4} /> : null}
      {examOn ? (
        <ThoughtBubble x={470} y={110} r={60} delay={exam + 6}>
          <text x={0} y={18} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={54} fill={INK}>
            ?
          </text>
        </ThoughtBubble>
      ) : null}
    </g>
  );
};

// 2) Tanıdık gelmesi = bilmek değil
const FamiliarTrap: Visual = ({ durationInFrames }) => {
  const second = Math.round(durationInFrames * 0.4);
  return (
    <g>
      <Paper />
      <Book x={210} y={360} scale={1.3} delay={2} />
      <Chip x={210} y={110} text="TANIDIK" delay={8} />
      <g transform={place(345, 108, useAppear(12))}>
        <circle r={26} fill={MINT} stroke={OUTLINE} strokeWidth={4} />
        <path d="M -12 0 L -3 10 L 14 -10" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
      </g>
      <BigText x={450} y={300} text="≠" size={130} color={RED} delay={second - 6} />
      <Brain x={680} y={330} scale={0.95} mood="confused" delay={second} />
      <Chip x={680} y={110} text="BİLİYORUM?" dark delay={second + 6} />
      <QuestionMark x={830} y={230} size={70} delay={second + 12} color={RED} />
    </g>
  );
};

// 3) İki grup: oku ya da sına
const TwoGroups: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const flip = (frame % 20) / 20;
  const right = Math.round(durationInFrames * 0.3);
  const lines = useProgress(right + 10, durationInFrames * 0.9);
  return (
    <g>
      <Paper />
      <rect x={448} y={40} width={4} height={480} fill="#c9bff2" />
      <Bust x={220} y={540} scale={0.9} mood="think" shirt={ORANGE} />
      <Book x={220} y={500} scale={1.05} flip={flip} color={ORANGE} />
      <Chip x={220} y={80} text="OKU, OKU, OKU" delay={4} />
      <Bust x={640} y={540} scale={0.9} mood="calm" shirt={MINT} hair="#2c2c2c" delay={right} />
      <TestPaper x={790} y={300} scale={0.8} lines={lines} delay={right + 4} />
      <Chip x={640} y={80} text="KENDİNİ SINA" dark delay={right + 6} />
    </g>
  );
};

// Animasyonlu sayaçlı çubuk
const ScoreBar: React.FC<{ x: number; label: string; color: string; value: number; p: number }> = ({ x, label, color, value, p }) => {
  const h = 320 * (value / 100) * p;
  return (
    <g>
      <rect x={x - 75} y={110} width={150} height={330} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={x - 69} y={434 - h} width={138} height={h} rx={12} fill={color} />
      <text x={x} y={410 - h} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={46} fill={INK}>
        %{Math.round(value * p)}
      </text>
      <text x={x} y={490} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
        {label}
      </text>
    </g>
  );
};

// Takvim yaprağı
const Calendar: React.FC<{ x: number; y: number; text: string; delay?: number }> = ({ x, y, text, delay = 0 }) => {
  const a = useAppear(delay);
  const w = useWave(30, 3);
  return (
    <g transform={place(x, y, a, w)}>
      <rect x={-80} y={-70} width={160} height={140} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-80} y={-70} width={160} height={40} rx={14} fill={RED} stroke={OUTLINE} strokeWidth={5} />
      <text x={0} y={38} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={34} fill={INK}>
        {text}
      </text>
    </g>
  );
};

// 4) Bir hafta sonra: yüzde 40 ve yüzde 61
const WeekLater: Visual = ({ durationInFrames }) => {
  const p = useProgress(durationInFrames * 0.08, durationInFrames * 0.35);
  const win = useAppear(Math.round(durationInFrames * 0.4));
  return (
    <g>
      <Paper />
      <Calendar x={130} y={140} text="1 HAFTA" delay={0} />
      <ScoreBar x={420} label="OKUYAN" color={ORANGE} value={40} p={p} />
      <ScoreBar x={680} label="SINAYAN" color={MINT} value={61} p={p} />
      <g transform={place(800, 120, win)}>
        <path d="M 0 -40 L 12 -12 L 42 -12 L 18 6 L 28 36 L 0 18 L -28 36 L -18 6 L -42 -12 L -12 -12 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      </g>
      <Sparkles points={[[760, 200], [600, 90], [840, 260]]} />
    </g>
  );
};

// Kitap yığını sayacı
const Stack: React.FC<{ x: number; count: number; color: string }> = ({ x, count, color }) => (
  <g>
    {Array.from({ length: count }).map((_, i) => (
      <rect key={i} x={x - 70 + (i % 2) * 8} y={440 - (i + 1) * 22} width={140} height={20} rx={4} fill={i % 2 ? color : "#fff"} stroke={OUTLINE} strokeWidth={4} />
    ))}
  </g>
);

// 5) 14 kez okuma ve üç kez kadar
const ReadCount: Visual = ({ durationInFrames }) => {
  const p = useProgress(6, durationInFrames * 0.35);
  const left = Math.round(14 * p);
  const right = Math.round(3 * p);
  return (
    <g>
      <Paper />
      <Stack x={260} count={left} color={ORANGE} />
      <Stack x={640} count={right} color={MINT} />
      <BigText x={260} y={80} text={`${left}×`} size={90} color={ORANGE} />
      <BigText x={640} y={80} text={`${right}×`} size={90} color={MINT} />
      <text x={260} y={500} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
        OKUYAN
      </text>
      <text x={640} y={500} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
        SINAYAN
      </text>
    </g>
  );
};

// Yatay ölçer
const Meter: React.FC<{ x: number; y: number; label: string; value: number; color: string }> = ({ x, y, label, value, color }) => (
  <g>
    <text x={x} y={y - 16} fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
      {label}
    </text>
    <rect x={x} y={y} width={320} height={36} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
    <rect x={x + 4} y={y + 4} width={312 * value} height={28} rx={14} fill={color} />
  </g>
);

// 6) Sadece okuyanlar daha emindi
const Overconfident: Visual = ({ durationInFrames }) => {
  const p = useProgress(8, durationInFrames * 0.6);
  return (
    <g>
      <Paper />
      <Bust x={210} y={540} scale={1.05} mood="smug" shirt={ORANGE} glasses />
      <Chip x={210} y={90} text="EMİNİM!" delay={6} />
      <Meter x={480} y={200} label="GÜVEN" value={0.2 + 0.75 * p} color={ORANGE} />
      <Meter x={480} y={330} label="HATIRLANAN" value={0.7 - 0.3 * p} color={MINT} />
      <QuestionMark x={830} y={440} size={70} delay={Math.round(durationInFrames * 0.5)} color={RED} />
    </g>
  );
};

// 7) Kitabı kapat, yaz, kontrol et
const CloseBook: Visual = ({ durationInFrames }) => {
  const closed = useProgress(4, 20);
  const lines = useProgress(22, durationInFrames * 0.6);
  const checks = Math.floor(useProgress(durationInFrames * 0.6, durationInFrames * 0.85) * 5);
  const frame = useCurrentFrame();
  const px = 520 + ((lines * 5) % 1) * 120 - 60;
  const py = 230 + Math.min(4, Math.floor(lines * 5)) * 38 + Math.sin(frame / 2) * 3;
  return (
    <g>
      <Paper />
      <Book x={200} y={360} scale={1.3} closed={closed} />
      <Chip x={200} y={110} text="1. KAPAT" delay={2} />
      <TestPaper x={560} y={300} scale={1.05} title="HATIRLA" lines={lines} checks={checks} delay={14} />
      {checks < 5 ? <Pencil x={px + 40} y={py} /> : null}
      <Chip x={790} y={110} text="2. YAZ" dark delay={22} />
      <Chip x={790} y={480} text="3. KONTROL" delay={Math.round(durationInFrames * 0.6)} />
    </g>
  );
};

// Yorum balonu
const Comment: React.FC<{ x: number; y: number; text: string; delay: number; color: string }> = ({ x, y, text, delay, color }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-170} y={-40} width={340} height={80} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-125} cy={0} r={22} fill={color} stroke={OUTLINE} strokeWidth={4} />
      <text x={-90} y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
        {text}
      </text>
    </g>
  );
};

// 8) Kapanış
const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={1.05} mood="think" shirt={PURPLE} />
      <QuestionMark x={330} y={140} size={80} delay={4} color={PURPLE} />
      <Comment x={640} y={110} text="OKUYARAK" delay={6} color={ORANGE} />
      <Comment x={640} y={215} text="SINAYARAK" delay={14} color={MINT} />
      <Comment x={640} y={320} text="İKİSİ DE!" delay={22} color={PURPLE} />
      <g transform={place(640, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={28} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  ReadAgain,
  FamiliarTrap,
  TwoGroups,
  WeekLater,
  ReadCount,
  Overconfident,
  CloseBook,
  YourTurn,
};
