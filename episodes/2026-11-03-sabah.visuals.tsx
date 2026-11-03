// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Öğreterek öğrenmek — birine anlatınca neden daha iyi öğreniyoruz? (2026-11-03-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  Brain,
  Chip,
  INK,
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
const PAPER = "#fff0f4";
const WALL = "#ffe1ea";
const FLOOR = "#f7b6c8";
const SKIN = "#f2c79a";
const PINK = "#ff5c8a";
const TEAL = "#16b5a5";
const ORANGE = "#ff9a3d";
const PURPLE = "#6a4cf5";
const BLUE = "#5b8def";
const GREEN = "#3fcf6f";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

const RoomBg: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={WALL} />
    <rect y={440} width={900} height={120} fill={FLOOR} stroke={OUTLINE} strokeWidth={5} />
  </g>
);

type Mood = "calm" | "happy" | "think" | "talk" | "wow";

const Face: React.FC<{ mood: Mood }> = ({ mood }) => {
  const frame = useCurrentFrame();
  const blink = frame % 80 > 75 ? 0.15 : 1;
  const eyes = (
    <g transform={`translate(0 ${-198 * (1 - blink)}) scale(1 ${blink})`}>
      <circle cx={-26} cy={-198} r={8} fill={OUTLINE} />
      <circle cx={26} cy={-198} r={8} fill={OUTLINE} />
    </g>
  );
  const cheeks = (
    <g>
      <circle cx={-46} cy={-174} r={10} fill="#f59ab0" opacity={0.7} />
      <circle cx={46} cy={-174} r={10} fill="#f59ab0" opacity={0.7} />
    </g>
  );
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
  if (mood === "talk") {
    const open = 6 + Math.abs(Math.sin(frame / 3)) * 12;
    return (
      <g>
        {eyes}
        <ellipse cx={0} cy={-162} rx={18} ry={open} fill="#7a3b3b" stroke={OUTLINE} strokeWidth={5} />
        {cheeks}
      </g>
    );
  }
  if (mood === "wow") {
    return (
      <g>
        <circle cx={-26} cy={-198} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={26} cy={-198} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-26} cy={-198} r={5} fill={OUTLINE} />
        <circle cx={26} cy={-198} r={5} fill={OUTLINE} />
        <ellipse cx={0} cy={-158} rx={12} ry={16} fill="#7a3b3b" stroke={OUTLINE} strokeWidth={5} />
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
      {cheeks}
    </g>
  );
};

// Belden yukarı karakter; (0,0) gövdenin alt ortası. Kafa merkezi y=-200.
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  mood: Mood;
  shirt?: string;
  hair?: string;
  long?: boolean;
  delay?: number;
}> = ({ x, y, scale = 1, mood, shirt = PINK, hair = "#4a2f1d", long = false, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      {long ? (
        <path d="M -78 -200 Q -86 -100 -60 -110 L 60 -110 Q 86 -100 78 -200 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} />
      ) : null}
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <Face mood={mood} />
    </g>
  );
};

// Açık ya da kapanan kitap; (0,0) alt orta. close: 0 açık → 1 kapalı
const Book: React.FC<{ x: number; y: number; scale?: number; color?: string; close?: number; delay?: number }> = ({
  x,
  y,
  scale = 1,
  color = PINK,
  close = 0,
  delay = 0,
}) => {
  const a = useAppear(delay);
  const w = 110 * (1 - close);
  return (
    <g transform={place(x, y, scale * a)}>
      {close < 0.98 ? (
        <g>
          <path d={`M ${-w - 10} 10 L 0 20 L 120 10 L 120 -110 L 0 -100 L ${-w - 10} -110 Z`} fill={color} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <path d={`M ${-w} 0 L 0 8 L 0 -96 L ${-w} -104 Z`} fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
          <path d="M 0 8 L 110 0 L 110 -104 L 0 -96 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={14} y1={-76 + i * 20} x2={94} y2={-82 + i * 20} stroke="#f4b6c6" strokeWidth={5} strokeLinecap="round" />
          ))}
        </g>
      ) : (
        <g>
          <rect x={0} y={-112} width={122} height={124} rx={6} fill={color} stroke={OUTLINE} strokeWidth={5} />
          <rect x={22} y={-80} width={78} height={20} rx={4} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
        </g>
      )}
    </g>
  );
};

// Konuşma balonu; içerik (0,0) merkezde
const Speech: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  tail?: "left" | "right";
  delay?: number;
  children?: React.ReactNode;
}> = ({ x, y, w, h, tail = "left", delay = 0, children }) => {
  const a = useAppear(delay);
  const tx = tail === "left" ? -w / 2 + 40 : w / 2 - 40;
  const tdx = tail === "left" ? -40 : 40;
  return (
    <g transform={place(x, y, a)}>
      <path d={`M ${tx - 18} ${h / 2 - 4} L ${tx + tdx} ${h / 2 + 46} L ${tx + 18} ${h / 2 - 4} Z`} fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={30} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={tx - 15} y={h / 2 - 8} width={30} height={10} fill="#fff" />
      {children}
    </g>
  );
};

// Ampul
const Bulb: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  const glow = 0.4 + 0.25 * Math.sin(useCurrentFrame() / 4);
  return (
    <g transform={place(x, y, scale * a)}>
      <circle r={70} fill={YELLOW} opacity={glow} />
      <circle cy={-6} r={40} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-18} y={30} width={36} height={26} rx={5} fill="#c9c9c9" stroke={OUTLINE} strokeWidth={5} />
      <path d="M -12 -2 L -4 14 L 4 -2 L 12 14" fill="none" stroke={ORANGE} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

// Masa
const Desk: React.FC<{ x: number; y: number; width: number }> = ({ x, y, width }) => (
  <g>
    <rect x={x - width / 2} y={y} width={width} height={34} rx={8} fill="#c98a52" stroke={OUTLINE} strokeWidth={6} />
    <rect x={x - width / 2 + 30} y={y + 34} width={22} height={90} fill="#a96f3c" stroke={OUTLINE} strokeWidth={5} />
    <rect x={x + width / 2 - 52} y={y + 34} width={22} height={90} fill="#a96f3c" stroke={OUTLINE} strokeWidth={5} />
  </g>
);

// Kâğıt (sınav / metin); (0,0) merkez
const Sheet: React.FC<{ x: number; y: number; scale?: number; rotate?: number; title?: string; marks?: boolean; delay?: number }> = ({
  x,
  y,
  scale = 1,
  rotate = 0,
  title,
  marks = false,
  delay = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a, rotate)}>
      <rect x={-70} y={-90} width={140} height={180} rx={6} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {title ? (
        <text x={0} y={-52} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={RED}>
          {title}
        </text>
      ) : null}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          {marks ? <rect x={-52} y={-26 + i * 28} width={14} height={14} rx={3} fill="none" stroke={OUTLINE} strokeWidth={3} /> : null}
          <line x1={marks ? -30 : -50} y1={-19 + i * 28} x2={50 - (i % 2) * 20} y2={-19 + i * 28} stroke="#c7c7c7" strokeWidth={5} strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
};

// Yazı tahtası; (0,0) üst orta
const Board: React.FC<{ x: number; y: number; w: number; h: number; children?: React.ReactNode; delay?: number }> = ({
  x,
  y,
  w,
  h,
  children,
  delay = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-w / 2 - 12} y={-12} width={w + 24} height={h + 24} rx={10} fill="#b9773f" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-w / 2} y={0} width={w} height={h} rx={4} fill="#2f6b55" stroke={OUTLINE} strokeWidth={4} />
      {children}
    </g>
  );
};

// Kamera (tripod üstünde); (0,0) ayakların ortası
const Camera: React.FC<{ x: number; y: number; scale?: number; delay?: number; facing?: "left" | "right" }> = ({
  x,
  y,
  scale = 1,
  delay = 0,
  facing = "left",
}) => {
  const a = useAppear(delay);
  const rec = Math.floor(useCurrentFrame() / 15) % 2 === 0;
  return (
    <g transform={`${place(x, y, scale * a)} scale(${facing === "left" ? 1 : -1} 1)`}>
      <path d="M 0 -150 L -50 0 M 0 -150 L 50 0 M 0 -150 L 0 0" stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
      <rect x={-40} y={-220} width={110} height={74} rx={12} fill="#55607a" stroke={OUTLINE} strokeWidth={5} />
      <path d="M -40 -200 L -80 -214 L -80 -152 L -40 -166 Z" fill="#3c4458" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={46} cy={-204} r={9} fill={rec ? RED : "#7a2b2b"} stroke={OUTLINE} strokeWidth={3} />
    </g>
  );
};

// Oyuncak ayı; (0,0) oturduğu yer
const Teddy: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  const tilt = useWave(50, 4);
  const fur = "#c98a52";
  return (
    <g transform={place(x, y, scale * a, tilt)}>
      <ellipse cx={-40} cy={-14} rx={26} ry={18} fill={fur} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={40} cy={-14} rx={26} ry={18} fill={fur} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={0} cy={-70} rx={58} ry={62} fill={fur} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={0} cy={-62} rx={32} ry={34} fill="#f0c99a" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={-44} cy={-196} r={20} fill={fur} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={44} cy={-196} r={20} fill={fur} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={-160} r={52} fill={fur} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={0} cy={-146} rx={22} ry={16} fill="#f0c99a" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={0} cy={-152} r={6} fill={OUTLINE} />
      <circle cx={-20} cy={-172} r={6} fill={OUTLINE} />
      <circle cx={20} cy={-172} r={6} fill={OUTLINE} />
      <path d="M -8 -140 Q 0 -134 8 -140" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
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

const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; delay?: number }> = ({
  x,
  y,
  text,
  size = 28,
  color = INK,
  delay = 0,
}) => {
  const a = useAppear(delay);
  return (
    <text transform={place(x, y, a)} fontFamily={uiFont} fontWeight={800} fontSize={size} textAnchor="middle" fill={color}>
      {text}
    </text>
  );
};

// Büyük kırmızı çarpı; p: 0→1 çizim ilerlemesi
const Cross: React.FC<{ x: number; y: number; size?: number; p: number }> = ({ x, y, size = 80, p }) => {
  const p1 = Math.min(1, p * 2);
  const p2 = Math.max(0, p * 2 - 1);
  return (
    <g transform={place(x, y, 1)} opacity={p > 0 ? 1 : 0}>
      <line x1={-size} y1={-size} x2={-size + 2 * size * p1} y2={-size + 2 * size * p1} stroke={RED} strokeWidth={18} strokeLinecap="round" />
      {p2 > 0 ? <line x1={size} y1={-size} x2={size - 2 * size * p2} y2={-size + 2 * size * p2} stroke={RED} strokeWidth={18} strokeLinecap="round" /> : null}
    </g>
  );
};

const Check: React.FC<{ x: number; y: number; size?: number; delay?: number }> = ({ x, y, size = 1, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, size * a)}>
      <circle r={44} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
      <path d="M -20 0 L -6 16 L 22 -16" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

// 1) Arkadaşına anlatırken netleşti
const ExplainFriend: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const sw = Math.round(durationInFrames * 0.45);
  const tidy = useProgress(sw - 6, sw + 10);
  return (
    <g>
      <RoomBg />
      <Desk x={450} y={420} width={760} />
      <Bust x={220} y={420} mood="talk" shirt={PINK} />
      <Bust x={690} y={420} mood={frame > sw ? "wow" : "think"} shirt={TEAL} hair="#2b2b2b" long />
      <Book x={450} y={415} scale={0.75} delay={2} />
      <Speech x={430} y={115} w={300} h={150} tail="left" delay={4}>
        {tidy < 1 ? (
          <path
            d="M -100 10 C -60 -60 -20 60 10 -20 C 40 -80 70 50 100 -10 C 60 30 -40 -40 -80 30"
            fill="none"
            stroke={PURPLE}
            strokeWidth={8}
            strokeLinecap="round"
            opacity={1 - tidy}
            transform={`rotate(${frame * 3})`}
          />
        ) : null}
        <g opacity={tidy}>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(-90 ${-40 + i * 40})`}>
              <circle r={12} fill={GREEN} stroke={OUTLINE} strokeWidth={3} />
              <rect x={24} y={-6} width={130 - i * 20} height={12} rx={6} fill="#c7c7c7" />
            </g>
          ))}
        </g>
      </Speech>
      {frame > sw ? <Bulb x={220} y={100} scale={0.8} delay={sw} /> : null}
      {frame > sw ? <Sparkles points={[[120, 70], [320, 60], [600, 80]]} /> : null}
    </g>
  );
};

// 2) Adı: öğreterek öğrenmek
const TeachTitle: Visual = () => {
  const frame = useCurrentFrame();
  const swing = Math.sin(frame / 6) * 10;
  return (
    <g>
      <Paper />
      <Board x={560} y={70} w={420} h={260} delay={2}>
        <text x={0} y={95} fontFamily={uiFont} fontWeight={800} fontSize={48} textAnchor="middle" fill="#fff">
          ÖĞRET
        </text>
        <text x={0} y={150} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={YELLOW}>
          =
        </text>
        <text x={0} y={210} fontFamily={uiFont} fontWeight={800} fontSize={48} textAnchor="middle" fill="#fff">
          ÖĞREN
        </text>
      </Board>
      <Brain x={200} y={280} scale={1.1} delay={0} />
      <g transform={place(300, 260, 1, -30 + swing)}>
        <line x1={0} y1={0} x2={150} y2={0} stroke="#8a5a32" strokeWidth={10} strokeLinecap="round" />
      </g>
      <Chip x={450} y={475} text="ÖĞRETEREK ÖĞRENMEK" delay={12} />
      <Sparkles points={[[90, 120], [330, 110], [820, 380]]} />
    </g>
  );
};

// 3) İki grup, aynı metin
const TwoGroups: Visual = ({ durationInFrames }) => {
  const s2 = Math.round(durationInFrames * 0.2);
  return (
    <g>
      <Paper />
      <rect x={445} y={40} width={10} height={480} rx={5} fill="#f4b6c6" />
      <Bust x={225} y={540} scale={0.95} mood="calm" shirt={BLUE} />
      <Bust x={675} y={540} scale={0.95} mood="calm" shirt={PINK} hair="#2b2b2b" long />
      <Book x={225} y={540} scale={0.9} color={BLUE} />
      <Book x={675} y={540} scale={0.9} color={PINK} />
      <Sheet x={120} y={205} scale={0.65} rotate={-6} title="SINAV" marks delay={s2} />
      <Chip x={260} y={70} text="SINAV VAR" dark delay={s2 + 4} />
      <Board x={720} y={70} w={170} h={110} delay={s2 + 10}>
        <path d="M -50 40 L 50 40 M -50 70 L 30 70" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
      </Board>
      <Chip x={670} y={225} text="ANLATACAKSIN" delay={s2 + 14} />
      <Label x={450} y={30} text="AYNI METİN" size={24} delay={2} />
    </g>
  );
};

// 4) Kimse anlatmadı, herkese sınav
const SurpriseTest: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const crossP = useProgress(6, 22);
  const drop = Math.round(durationInFrames * 0.4);
  const fall = useProgress(drop, drop + 14);
  return (
    <g>
      <RoomBg />
      <Board x={450} y={50} w={300} h={170}>
        <text x={0} y={100} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill="#fff">
          DERS ANLAT
        </text>
      </Board>
      <Cross x={450} y={135} size={90} p={crossP} />
      <Desk x={450} y={440} width={820} />
      <Bust x={220} y={440} mood={frame > drop + 10 ? "wow" : "calm"} shirt={BLUE} />
      <Bust x={680} y={440} mood={frame > drop + 10 ? "wow" : "calm"} shirt={PINK} hair="#2b2b2b" long />
      {frame > drop ? (
        <g>
          <Sheet x={330} y={-100 + fall * 470} rotate={-8 + fall * 4} scale={0.75} title="SINAV" marks />
          <Sheet x={570} y={-100 + fall * 470} rotate={8 - fall * 4} scale={0.75} title="SINAV" marks />
        </g>
      ) : null}
      {frame > drop + 14 ? <Chip x={450} y={510} text="HERKESE SINAV!" delay={drop + 14} /> : null}
    </g>
  );
};

// 5) Daha fazla, daha düzenli
const RecallBars: Visual = ({ durationInFrames }) => {
  const g = useProgress(6, Math.round(durationInFrames * 0.5));
  const base = 430;
  const h1 = 170 * g;
  const h2 = 290 * g;
  return (
    <g>
      <Paper />
      <line x1={80} y1={base} x2={560} y2={base} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <rect x={130} y={base - h1} width={140} height={h1} rx={10} fill={BLUE} stroke={OUTLINE} strokeWidth={5} />
      <rect x={360} y={base - h2} width={140} height={h2} rx={10} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
      <Label x={200} y={475} text="SINAVA" size={26} />
      <Label x={200} y={505} text="HAZIRLANAN" size={26} />
      <Label x={430} y={475} text="ANLATACAĞINI" size={26} />
      <Label x={430} y={505} text="SANAN" size={26} />
      {g > 0.95 ? <Sparkles points={[[400, 110], [500, 90], [540, 160]]} /> : null}
      {/* düzenli / dağınık kartlar */}
      <g transform="translate(720 0)">
        <Chip x={0} y={70} text="DAHA DÜZENLİ" delay={Math.round(durationInFrames * 0.45)} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <SortCard x={-40 + i * 6} y={160 + i * 72} color={[PINK, ORANGE, TEAL, PURPLE][i]} delay={Math.round(durationInFrames * 0.5) + i * 5} />
          </g>
        ))}
      </g>
    </g>
  );
};

const SortCard: React.FC<{ x: number; y: number; color: string; delay?: number; n?: number }> = ({ x, y, color, delay = 0, n }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-70} y={-28} width={180} height={56} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-70} y={-28} width={40} height={56} rx={10} fill={color} stroke={OUTLINE} strokeWidth={4} />
      {n !== undefined ? (
        <text x={-50} y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#fff">
          {n}
        </text>
      ) : null}
      <rect x={-16} y={-6} width={100} height={12} rx={6} fill="#c7c7c7" />
    </g>
  );
};

// 6) Öğretmen gibi: ana fikirleri seçip sırala
const SortIdeas: Visual = ({ durationInFrames }) => {
  const p = useProgress(10, Math.round(durationInFrames * 0.7));
  const colors = [PINK, ORANGE, TEAL, PURPLE];
  const start: [number, number][] = [
    [120, 140],
    [250, 330],
    [110, 420],
    [280, 190],
  ];
  const rot = [-20, 15, 10, -12];
  return (
    <g>
      <Paper />
      <Board x={640} y={50} w={380} h={400} />
      <Label x={640} y={110} text="ANA FİKİRLER" size={32} color={YELLOW} />
      {colors.map((c, i) => {
        const q = Math.min(1, Math.max(0, p * 4 - i * 0.8));
        const tx = 560;
        const ty = 170 + i * 72;
        const x = start[i][0] + (tx - start[i][0]) * q;
        const y = start[i][1] + (ty - start[i][1]) * q;
        return (
          <g key={i} transform={`rotate(${rot[i] * (1 - q)} ${x} ${y})`}>
            <SortCard x={x} y={y} color={c} n={q > 0.9 ? i + 1 : undefined} />
          </g>
        );
      })}
      <Arrow from={[330, 300]} to={[420, 300]} progress={useProgress(4, 16)} color={PINK} />
      <Brain x={180} y={250} scale={0.55} delay={0} />
    </g>
  );
};

// 7) Singapur: kameraya notsuz anlatım, bir hafta sonra
const CameraTeach: Visual = ({ durationInFrames }) => {
  const s2 = Math.round(durationInFrames * 0.5);
  const frame = useCurrentFrame();
  const cal = useAppear(s2);
  return (
    <g>
      <RoomBg />
      <Board x={230} y={60} w={300} h={180}>
        <path d="M -110 90 Q -80 40 -50 90 T 10 90 T 70 90 T 120 90" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
      </Board>
      <Person x={300} y={470} scale={1.2} shirt={PINK} presenting facing="right" />
      <Camera x={620} y={470} scale={1.1} delay={4} />
      <Chip x={240} y={515} text="NOTSUZ" delay={10} />
      {frame > s2 ? (
        <g>
          <g transform={place(770, 150, cal)}>
            <rect x={-80} y={-70} width={160} height={150} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
            <rect x={-80} y={-70} width={160} height={44} rx={12} fill={RED} stroke={OUTLINE} strokeWidth={5} />
            <text x={0} y={50} fontFamily={uiFont} fontWeight={800} fontSize={60} textAnchor="middle" fill={INK}>
              +7
            </text>
          </g>
          <Label x={770} y={262} text="GÜN SONRA" size={26} delay={s2 + 2} />
          <Check x={770} y={340} size={0.9} delay={s2 + 10} />
        </g>
      ) : null}
    </g>
  );
};

// 8) Metinden okuyarak anlatmak yetmedi
const ScriptReader: Visual = ({ durationInFrames }) => {
  const crossAt = Math.round(durationInFrames * 0.45);
  const p = useProgress(crossAt, crossAt + 14);
  const bob = useWave(40, 4);
  return (
    <g>
      <RoomBg />
      <Bust x={300} y={470} mood="calm" shirt={BLUE} />
      <g transform={`translate(0 ${bob})`}>
        <Sheet x={300} y={300} scale={1.1} title="METİN" delay={2} />
      </g>
      <Camera x={690} y={470} scale={1.1} delay={6} />
      <Cross x={300} y={300} size={110} p={p} />
      <Chip x={450} y={520} text="OKUYARAK ANLATMAK" dark delay={10} />
    </g>
  );
};

// 9) Hafızadan çekip çıkarmak
const PullMemory: Visual = ({ durationInFrames }) => {
  const pull = useProgress(8, Math.round(durationInFrames * 0.3));
  const s2 = Math.round(durationInFrames * 0.4);
  const frame = useCurrentFrame();
  const cx = 300 + pull * 300;
  const cy = 250 - pull * 40;
  return (
    <g>
      <Paper />
      <Brain x={250} y={270} scale={1.3} />
      <path d={`M 340 260 Q ${(340 + cx) / 2} ${cy + 60} ${cx - 90} ${cy}`} fill="none" stroke={OUTLINE} strokeWidth={6} strokeDasharray="12 12" opacity={pull > 0.05 ? 1 : 0} />
      <SortCard x={cx} y={cy} color={YELLOW} delay={6} />
      {pull > 0.98 ? <Sparkles points={[[560, 160], [740, 170], [700, 290]]} /> : null}
      {frame > s2 ? (
        <g>
          <QuestionMark x={780} y={300} size={120} delay={s2} color={PURPLE} />
          <Chip x={500} y={480} text="TAM NEDENİ TARTIŞILIYOR" dark delay={s2 + 4} />
        </g>
      ) : null}
    </g>
  );
};

// 10) İpucu: kitabı kapat, hayali arkadaşa sesli anlat
const TeddyTip: Visual = ({ durationInFrames }) => {
  const close = useProgress(4, 18);
  const s2 = Math.round(durationInFrames * 0.35);
  const frame = useCurrentFrame();
  return (
    <g>
      <RoomBg />
      <Desk x={450} y={440} width={820} />
      <Book x={140} y={438} scale={0.7} close={close} />
      <Bust x={330} y={440} mood={frame > s2 ? "talk" : "calm"} shirt={PINK} />
      <Teddy x={680} y={440} scale={1.05} delay={6} />
      {frame > s2 ? (
        <Speech x={520} y={95} w={230} h={110} tail="left" delay={s2}>
          <path d="M -70 -10 L 70 -10 M -70 20 L 40 20" stroke="#c7c7c7" strokeWidth={10} strokeLinecap="round" />
        </Speech>
      ) : null}
      <Chip x={450} y={515} text="KAPAT · SESLİ ANLAT" delay={10} />
    </g>
  );
};

// 11) Kapanış
const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={1.05} mood="think" shirt={PINK} />
      <QuestionMark x={330} y={140} size={80} delay={4} color={PINK} />
      <Comment x={640} y={110} text="ARKADAŞIMA" delay={6} color={PINK} />
      <Comment x={640} y={215} text="AYNAYA" delay={14} color={TEAL} />
      <Comment x={640} y={320} text="KEDİME" delay={22} color={ORANGE} />
      <g transform={place(640, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={28} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  ExplainFriend,
  TeachTitle,
  TwoGroups,
  SurpriseTest,
  RecallBars,
  SortIdeas,
  CameraTeach,
  ScriptReader,
  PullMemory,
  TeddyTip,
  YourTurn,
};
