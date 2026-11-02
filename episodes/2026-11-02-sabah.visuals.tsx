// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Uyku öğrendiklerini pekiştirir — akşam çalış, sabah hatırla (2026-11-02-sabah)
import { interpolateColors, useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  INK,
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
const PAPER = "#e8f8f6";
const WALL = "#d7f2ee";
const FLOOR = "#9fdcd3";
const NIGHT = "#2d3a6b";
const SKIN = "#f2c79a";
const TEAL = "#16b5a5";
const MINT = "#3fcf9f";
const ORANGE = "#ff9a3d";
const PURPLE = "#6a4cf5";
const BLUE = "#5b8def";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

type Mood = "calm" | "happy" | "think" | "tired";

const Face: React.FC<{ mood: Mood }> = ({ mood }) => {
  const frame = useCurrentFrame();
  const blink = frame % 80 > 75 ? 0.15 : 1;
  const eyes = (
    <g transform={`translate(0 ${-198 * (1 - blink)}) scale(1 ${blink})`}>
      <circle cx={-26} cy={-198} r={8} fill={OUTLINE} />
      <circle cx={26} cy={-198} r={8} fill={OUTLINE} />
    </g>
  );
  if (mood === "tired") {
    return (
      <g>
        <path d="M -40 -198 Q -26 -190 -12 -198 M 12 -198 Q 26 -190 40 -198" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <path d="M -40 -186 Q -26 -180 -14 -186 M 14 -186 Q 26 -180 40 -186" fill="none" stroke="#8a6fb3" strokeWidth={4} strokeLinecap="round" />
        <ellipse cx={0} cy={-160} rx={12} ry={16} fill="#7a3b3b" stroke={OUTLINE} strokeWidth={5} />
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

// Belden yukarı karakter; (0,0) gövdenin alt ortası. Kafa merkezi y=-200.
const Bust: React.FC<{ x: number; y: number; scale?: number; mood: Mood; shirt?: string; hair?: string; delay?: number }> = ({
  x,
  y,
  scale = 1,
  mood,
  shirt = TEAL,
  hair = "#4a2f1d",
  delay = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <Face mood={mood} />
    </g>
  );
};

// Açık kitap
const Book: React.FC<{ x: number; y: number; scale?: number; color?: string; flip?: number; delay?: number }> = ({
  x,
  y,
  scale = 1,
  color = TEAL,
  flip = 0,
  delay = 0,
}) => {
  const a = useAppear(delay);
  const pageW = 110 * Math.cos(flip * Math.PI);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -120 10 L 0 20 L 120 10 L 120 -110 L 0 -100 L -120 -110 Z" fill={color} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -110 0 L 0 8 L 0 -96 L -110 -104 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      <path d="M 0 8 L 110 0 L 110 -104 L 0 -96 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={-96} y1={-82 + i * 20} x2={-16} y2={-76 + i * 20} stroke="#a9d9d2" strokeWidth={5} strokeLinecap="round" />
          <line x1={14} y1={-76 + i * 20} x2={94} y2={-82 + i * 20} stroke="#a9d9d2" strokeWidth={5} strokeLinecap="round" />
        </g>
      ))}
      {flip > 0 && flip < 1 ? (
        <path d={`M 0 8 L ${pageW} ${4 - 30 * Math.sin(flip * Math.PI)} L ${pageW} ${-100 - 30 * Math.sin(flip * Math.PI)} L 0 -96 Z`} fill="#f2fbfa" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      ) : null}
    </g>
  );
};

const Moon: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  const w = useWave(60, 6);
  return (
    <g transform={place(x, y, scale * a, w)}>
      <path d="M 10 -50 A 50 50 0 1 0 50 10 A 38 38 0 1 1 10 -50 Z" fill="#ffe27a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    </g>
  );
};

const Sun: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <g transform={`rotate(${frame * 1.5})`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={-6} y={-78} width={12} height={24} rx={6} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} transform={`rotate(${i * 45})`} />
        ))}
      </g>
      <circle r={44} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      <path d="M -16 6 Q 0 20 16 6" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <circle cx={-14} cy={-8} r={5} fill={OUTLINE} />
      <circle cx={14} cy={-8} r={5} fill={OUTLINE} />
    </g>
  );
};

// Yükselip kaybolan "Z" harfleri
const Zzz: React.FC<{ x: number; y: number; color?: string }> = ({ x, y, color = "#fff" }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 20) % 60) / 60;
        return (
          <text
            key={i}
            x={x + t * 50 + i * 6}
            y={y - t * 90}
            opacity={1 - t}
            fontFamily={uiFont}
            fontWeight={800}
            fontSize={30 + i * 10}
            fill={color}
            stroke={OUTLINE}
            strokeWidth={3}
            paintOrder="stroke"
          >
            Z
          </text>
        );
      })}
    </g>
  );
};

// Yatakta uyuyan karakter; (0,0) yatağın alt ortası
const Bed: React.FC<{ x: number; y: number; scale?: number; blanket?: string; delay?: number; zColor?: string }> = ({
  x,
  y,
  scale = 1,
  blanket = TEAL,
  delay = 0,
  zColor,
}) => {
  const a = useAppear(delay);
  const breathe = useWave(70, 4);
  return (
    <g transform={place(x, y, scale * a)}>
      <rect x={-190} y={-150} width={26} height={150} rx={8} fill="#b9773f" stroke={OUTLINE} strokeWidth={5} />
      <rect x={164} y={-100} width={26} height={100} rx={8} fill="#b9773f" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-170} y={-70} width={340} height={40} rx={8} fill="#d89a5c" stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={-120} cy={-86} rx={46} ry={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <g transform="translate(-112 -112) rotate(-10)">
        <circle r={34} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -34 -6 Q -30 -44 4 -40 Q 32 -36 34 -8 Q 16 -24 -2 -22 Q -20 -22 -34 -6 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={4} />
        <path d="M -16 4 Q -10 9 -4 4 M 6 4 Q 12 9 18 4" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        <path d="M -4 18 Q 2 21 8 18" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      </g>
      <path d={`M -80 -70 Q -84 ${-118 - breathe} 0 ${-116 - breathe} L 160 ${-108 - breathe / 2} Q 176 -90 166 -70 Z`} fill={blanket} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M -40 ${-104 - breathe} L 150 ${-98 - breathe / 2}`} stroke="rgba(255,255,255,0.5)" strokeWidth={6} strokeLinecap="round" />
      <Zzz x={-80} y={-160} color={zColor} />
    </g>
  );
};

// Ayakta duran, gözleri açık karakter (uyanık)
const Awake: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => (
  <Bust x={x} y={y} scale={scale} mood="tired" shirt={ORANGE} delay={delay} />
);

// Basit fare; (0,0) gövde merkezi
const Rat: React.FC<{ x: number; y: number; scale?: number; asleep?: boolean; flip?: boolean }> = ({ x, y, scale = 1, asleep = false, flip = false }) => {
  const tail = useWave(30, 8);
  return (
    <g transform={`${place(x, y, scale)} scale(${flip ? -1 : 1} 1)`}>
      <path d={`M -50 10 Q -90 ${20 + tail} -110 ${-10 - tail}`} fill="none" stroke="#e79aa8" strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={0} cy={0} rx={56} ry={34} fill="#b8bcc6" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={40} cy={-30} r={16} fill="#f2b8c4" stroke={OUTLINE} strokeWidth={4} />
      <path d="M 40 -20 Q 70 -24 86 4 Q 66 22 40 16 Z" fill="#b8bcc6" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={88} cy={4} r={6} fill="#e7768a" stroke={OUTLINE} strokeWidth={3} />
      {asleep ? (
        <path d="M 54 -4 Q 60 2 66 -4" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      ) : (
        <circle cx={60} cy={-4} r={5} fill={OUTLINE} />
      )}
    </g>
  );
};

// Fare yolu (kıvrımlı)
const PATH_D = "M 80 420 C 160 300 260 460 320 340 C 370 240 240 200 300 130";
const pathPoint = (t: number): [number, number] => {
  // Kübik Bézier iki parça; t∈[0,1]
  const seg = t < 0.5 ? 0 : 1;
  const u = seg === 0 ? t * 2 : (t - 0.5) * 2;
  const P =
    seg === 0
      ? [
          [80, 420],
          [160, 300],
          [260, 460],
          [320, 340],
        ]
      : [
          [320, 340],
          [370, 240],
          [240, 200],
          [300, 130],
        ];
  const m = 1 - u;
  const x = m * m * m * P[0][0] + 3 * m * m * u * P[1][0] + 3 * m * u * u * P[2][0] + u * u * u * P[3][0];
  const y = m * m * m * P[0][1] + 3 * m * m * u * P[1][1] + 3 * m * u * u * P[2][1] + u * u * u * P[3][1];
  return [x, y];
};

// Beyin hücresi (nöron) ışığı
const Cell: React.FC<{ x: number; y: number; on: number; color?: string }> = ({ x, y, on, color = YELLOW }) => (
  <g transform={place(x, y, 1 + 0.3 * on)}>
    {on > 0.05 ? <circle r={26} fill={color} opacity={0.35 * on} /> : null}
    <circle r={14} fill={on > 0.5 ? color : "#fff"} stroke={OUTLINE} strokeWidth={4} />
  </g>
);

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

// Yatay ölçer
const Meter: React.FC<{ x: number; y: number; label: string; value: number; color: string; width?: number }> = ({
  x,
  y,
  label,
  value,
  color,
  width = 300,
}) => (
  <g>
    <text x={x} y={y - 14} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={INK}>
      {label}
    </text>
    <rect x={x} y={y} width={width} height={34} rx={17} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
    <rect x={x + 4} y={y + 4} width={Math.max(0, (width - 8) * value)} height={26} rx={13} fill={color} />
  </g>
);

// 1) Akşam çalıştın, sabah daha net
const NightStudy: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const switchAt = Math.round(durationInFrames * 0.45);
  const morning = frame > switchAt;
  const wall = interpolateColors(frame, [switchAt - 8, switchAt + 4], ["#3b4a82", WALL]);
  const flip = (frame % 26) / 26;
  return (
    <g>
      <rect width={900} height={560} fill={wall} />
      <rect y={430} width={900} height={130} fill={morning ? FLOOR : "#26305a"} stroke={OUTLINE} strokeWidth={5} />
      <rect x={560} y={60} width={260} height={200} rx={10} fill={morning ? "#bfeaff" : "#1c2550"} stroke={OUTLINE} strokeWidth={6} />
      <line x1={690} y1={60} x2={690} y2={260} stroke={OUTLINE} strokeWidth={5} />
      <line x1={560} y1={160} x2={820} y2={160} stroke={OUTLINE} strokeWidth={5} />
      {morning ? <Sun x={625} y={110} scale={0.6} delay={switchAt} /> : <Moon x={620} y={110} scale={0.8} />}
      {!morning ? <Sparkles points={[[740, 90], [780, 210], [600, 220]]} color="#ffe27a" /> : null}
      <rect x={40} y={420} width={480} height={40} rx={10} fill="#c98a52" stroke={OUTLINE} strokeWidth={6} />
      <Bust x={260} y={430} scale={1.1} mood={morning ? "happy" : "think"} />
      {!morning ? <Book x={260} y={420} scale={1.15} flip={flip} /> : null}
      {morning ? (
        <g>
          <Chip x={700} y={360} text="NET!" delay={switchAt + 6} />
          <Sparkles points={[[150, 120], [380, 110], [420, 260]]} />
        </g>
      ) : (
        <Chip x={690} y={360} text="AKŞAM" dark delay={4} />
      )}
    </g>
  );
};

// 2) Gizli kahraman: uyku; beyin mesaide
const SleepHero: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={900} height={560} fill={NIGHT} />
      <Moon x={110} y={90} scale={0.9} />
      <Sparkles points={[[220, 60], [800, 70], [700, 200], [330, 150]]} color="#ffe27a" />
      <rect y={470} width={900} height={90} fill="#3b4a82" stroke={OUTLINE} strokeWidth={5} />
      <Bed x={300} y={480} scale={1.15} delay={0} />
      <Brain x={680} y={260} scale={0.85} delay={10} />
      <g transform={place(680, 180, useAppear(16))}>
        <path d="M -70 0 Q -70 -56 0 -56 Q 70 -56 70 0 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-84} y={-6} width={168} height={16} rx={8} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      </g>
      <g transform={place(790, 360, useAppear(22), frame * 3)}>
        <circle r={26} fill="#cfd6e6" stroke={OUTLINE} strokeWidth={5} />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={-7} y={-38} width={14} height={14} fill="#cfd6e6" stroke={OUTLINE} strokeWidth={4} transform={`rotate(${i * 60})`} />
        ))}
        <circle r={8} fill={OUTLINE} />
      </g>
      <Chip x={680} y={480} text="MESAİDE" delay={26} />
    </g>
  );
};

// 3) 1924: uyuyan daha az unuttu
const SleepVsAwake: Visual = ({ durationInFrames }) => {
  const p = useProgress(durationInFrames * 0.2, durationInFrames * 0.8);
  return (
    <g>
      <Paper />
      <rect x={448} y={30} width={4} height={500} fill="#a9d9d2" />
      <rect x={30} y={30} width={400} height={230} rx={16} fill={NIGHT} stroke={OUTLINE} strokeWidth={5} />
      <Moon x={380} y={80} scale={0.5} />
      <Bed x={215} y={250} scale={0.75} />
      <rect x={470} y={30} width={400} height={230} rx={16} fill="#bfeaff" stroke={OUTLINE} strokeWidth={5} />
      <Sun x={820} y={80} scale={0.45} />
      <Awake x={670} y={262} scale={0.75} delay={6} />
      <Meter x={60} y={340} label="HATIRLANAN" value={0.85 - 0.15 * p} color={MINT} width={340} />
      <Meter x={500} y={340} label="HATIRLANAN" value={0.85 - 0.55 * p} color={ORANGE} width={340} />
      <Chip x={230} y={460} text="UYUDU" delay={4} />
      <Chip x={670} y={460} text="UYANIK" dark delay={10} />
      {p > 0.6 ? <QuestionMark x={860} y={400} size={60} color={RED} /> : null}
    </g>
  );
};

// 4) MIT: farenin gündüz yolu uykuda yeniden oynatılıyor
const RatReplay: Visual = ({ durationInFrames }) => {
  const half = Math.round(durationInFrames * 0.45);
  const frame = useCurrentFrame();
  const night = frame > half;
  const tDay = useProgress(4, half - 4);
  const tNight = useProgress(half + 8, durationInFrames - 10);
  const [rx, ry] = pathPoint(tDay);
  const [nx, ny] = pathPoint(tNight);
  const cells: [number, number, number][] = [
    [620, 180, 0.15],
    [700, 140, 0.35],
    [780, 190, 0.55],
    [700, 250, 0.75],
    [620, 300, 0.95],
  ];
  const t = night ? tNight : tDay;
  return (
    <g>
      <rect width={900} height={560} fill={night ? NIGHT : PAPER} />
      <path d={PATH_D} fill="none" stroke={night ? "#4c5b95" : "#a9d9d2"} strokeWidth={34} strokeLinecap="round" />
      <path d={PATH_D} fill="none" stroke={night ? "#7f8fd0" : "#fff"} strokeWidth={6} strokeDasharray="14 14" strokeLinecap="round" />
      {!night ? <Rat x={rx} y={ry - 20} scale={0.7} /> : null}
      {night ? (
        <g>
          <circle cx={nx} cy={ny} r={22} fill={YELLOW} opacity={0.8} stroke={OUTLINE} strokeWidth={4} />
          <Rat x={180} y={480} scale={0.6} asleep />
          <Zzz x={230} y={450} />
        </g>
      ) : null}
      <g transform="translate(0 0)">
        <rect x={540} y={70} width={320} height={300} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        {cells.map(([x, y], i) =>
          i < cells.length - 1 ? <line key={i} x1={x} y1={y} x2={cells[i + 1][0]} y2={cells[i + 1][1]} stroke="#cfd6e6" strokeWidth={5} /> : null,
        )}
        {cells.map(([x, y, k], i) => (
          <Cell key={i} x={x} y={y} on={Math.max(0, 1 - Math.abs(t - k) * 5)} />
        ))}
      </g>
      {night ? <Moon x={830} y={470} scale={0.6} /> : <Sun x={830} y={470} scale={0.5} />}
      <Chip x={700} y={420} text={night ? "UYKU: TEKRAR!" : "GÜNDÜZ"} dark={!night} delay={night ? half : 2} />
    </g>
  );
};

// Dosya kartı
const Card: React.FC<{ x: number; y: number; color: string; rotate?: number; scale?: number }> = ({ x, y, color, rotate = 0, scale = 1 }) => (
  <g transform={place(x, y, scale, rotate)}>
    <rect x={-34} y={-24} width={68} height={48} rx={6} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-34} y={-24} width={68} height={14} rx={6} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <line x1={-22} y1={6} x2={22} y2={6} stroke="#c4c4c4" strokeWidth={4} strokeLinecap="round" />
  </g>
);

// 5) Geçici depodan kalıcı depoya taşıma
const MemoryMove: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const colors = [MINT, ORANGE, PURPLE, BLUE, RED];
  const span = (durationInFrames - 20) / colors.length;
  return (
    <g>
      <rect width={900} height={560} fill={NIGHT} />
      <Moon x={450} y={80} scale={0.7} />
      <Sparkles points={[[300, 60], [600, 60], [450, 170]]} color="#ffe27a" />
      {/* geçici kutu */}
      <g transform={place(170, 360, useAppear(0))}>
        <rect x={-110} y={-90} width={220} height={150} rx={16} fill={YELLOW} stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={100} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill="#fff">
          GEÇİCİ
        </text>
      </g>
      {/* kalıcı dolap */}
      <g transform={place(720, 330, useAppear(6))}>
        <rect x={-120} y={-170} width={240} height={290} rx={12} fill={TEAL} stroke={OUTLINE} strokeWidth={6} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={-100} y={-150 + i * 90} width={200} height={74} rx={8} fill="#7fdcd0" stroke={OUTLINE} strokeWidth={5} />
            <rect x={-24} y={-120 + i * 90} width={48} height={12} rx={6} fill={OUTLINE} />
          </g>
        ))}
        <text x={0} y={160} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill="#fff">
          KALICI
        </text>
      </g>
      {colors.map((c, i) => {
        const start = 10 + i * span;
        const k = Math.max(0, Math.min(1, (frame - start) / (span * 0.9)));
        const x = 170 + (720 - 170) * k;
        const y = 330 - Math.sin(k * Math.PI) * 180 + k * -40;
        return k < 1 ? <Card key={i} x={x - 20 + i * 10} y={y} color={c} rotate={k * 360} /> : null;
      })}
      <Chip x={450} y={500} text="TEKRAR + TAŞIMA" delay={12} />
    </g>
  );
};

// Kelime kartı
const WordCard: React.FC<{ x: number; y: number; text: string; delay: number; color: string }> = ({ x, y, text, delay, color }) => {
  const a = useAppear(delay);
  const w = useWave(40, 5, delay * 3);
  return (
    <g transform={place(x, y + w, a, w)}>
      <rect x={-80} y={-30} width={160} height={60} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-80} y={-30} width={14} height={60} rx={6} fill={color} />
      <text x={8} y={10} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={24} fill={INK}>
        {text}
      </text>
    </g>
  );
};

// 6) Lyon: sabah grubu ve akşam + uyku grubu
const TwoTeams: Visual = ({ durationInFrames }) => {
  const right = Math.round(durationInFrames * 0.35);
  return (
    <g>
      <Paper />
      <WordCard x={330} y={60} text="KITABU" delay={2} color={ORANGE} />
      <WordCard x={570} y={60} text="SAFARI" delay={8} color={TEAL} />
      <rect x={30} y={110} width={410} height={420} rx={20} fill="#fff3d6" stroke={OUTLINE} strokeWidth={5} />
      <rect x={460} y={110} width={410} height={420} rx={20} fill={NIGHT} stroke={OUTLINE} strokeWidth={5} />
      <Sun x={370} y={180} scale={0.5} delay={6} />
      <Bust x={200} y={440} scale={0.95} mood="think" shirt={ORANGE} delay={4} />
      <Book x={200} y={430} scale={0.85} color={ORANGE} delay={8} />
      <Moon x={800} y={180} scale={0.6} delay={right} />
      <Bed x={665} y={430} scale={0.85} delay={right + 4} />
      <Chip x={235} y={490} text="SABAH" delay={10} />
      <Chip x={665} y={490} text="AKŞAM + UYKU" delay={right + 8} />
    </g>
  );
};

// Tekrar blokları
const Blocks: React.FC<{ x: number; count: number; color: string }> = ({ x, count, color }) => (
  <g>
    {Array.from({ length: count }).map((_, i) => (
      <g key={i} transform={place(x, 430 - i * 50, 1)}>
        <rect x={-70} y={-44} width={140} height={44} rx={8} fill={color} stroke={OUTLINE} strokeWidth={4} />
        <text x={0} y={-12} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={24} fill="#fff">
          TEKRAR
        </text>
      </g>
    ))}
  </g>
);

// 7) Uyuyanlar yarı tekrarla yeniden öğrendi
const HalfPractice: Visual = ({ durationInFrames }) => {
  const p = useProgress(10, durationInFrames * 0.6);
  const left = Math.round(6 * p);
  const right = Math.round(3 * p);
  return (
    <g>
      <Paper />
      <Chip x={450} y={60} text="12 SAAT SONRA" dark delay={0} />
      <Blocks x={250} count={left} color={ORANGE} />
      <Blocks x={650} count={right} color={TEAL} />
      <BigText x={400} y={300} text={`${left}`} size={90} color={ORANGE} />
      <BigText x={800} y={300} text={`${right}`} size={90} color={TEAL} />
      <text x={250} y={490} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
        UYANIK
      </text>
      <text x={650} y={490} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
        UYUYAN
      </text>
      <g transform={place(650, 200, useAppear(Math.round(durationInFrames * 0.65)))}>
        <rect x={-90} y={-30} width={180} height={60} rx={14} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
        <text x={0} y={11} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
          YARISI!
        </text>
      </g>
    </g>
  );
};

// Animasyonlu sayaçlı çubuk (16 üzerinden)
const ScoreBar: React.FC<{ x: number; label: string; color: string; value: number; p: number }> = ({ x, label, color, value, p }) => {
  const h = 300 * (value / 16) * p;
  return (
    <g>
      <rect x={x - 75} y={130} width={150} height={310} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={x - 69} y={434 - h} width={138} height={h} rx={12} fill={color} />
      <text x={x} y={Math.min(410, 420 - h)} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill={INK}>
        {Math.round(value * p)}/16
      </text>
      <text x={x} y={490} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
        {label}
      </text>
    </g>
  );
};

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

// 8) Bir hafta sonra 15'e 11
const WeekScore: Visual = ({ durationInFrames }) => {
  const p = useProgress(durationInFrames * 0.1, durationInFrames * 0.5);
  const win = useAppear(Math.round(durationInFrames * 0.55));
  return (
    <g>
      <Paper />
      <Calendar x={130} y={140} text="1 HAFTA" />
      <ScoreBar x={430} label="UYUYAN" color={TEAL} value={15} p={p} />
      <ScoreBar x={690} label="UYANIK" color={ORANGE} value={11} p={p} />
      <g transform={place(430, 80, win)}>
        <path d="M 0 -40 L 12 -12 L 42 -12 L 18 6 L 28 36 L 0 18 L -28 36 L -18 6 L -42 -12 L -12 -12 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      </g>
      <Sparkles points={[[340, 110], [520, 100], [130, 300]]} />
    </g>
  );
};

// Saat
const Clock: React.FC<{ x: number; y: number; hours: number; scale?: number }> = ({ x, y, hours, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <circle r={110} fill="#fff" stroke={OUTLINE} strokeWidth={7} />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={-4} y={-100} width={8} height={18} rx={4} fill={OUTLINE} transform={`rotate(${i * 30})`} />
    ))}
    <path d={`M 0 0 L 0 -90 A 90 90 0 ${hours > 6 ? 1 : 0} 1 ${90 * Math.sin((hours / 12) * 2 * Math.PI)} ${-90 * Math.cos((hours / 12) * 2 * Math.PI)} Z`} fill={MINT} opacity={0.5} />
    <line x1={0} y1={0} x2={0} y2={-56} stroke={OUTLINE} strokeWidth={9} strokeLinecap="round" transform={`rotate(${(hours / 12) * 360})`} />
    <line x1={0} y1={0} x2={0} y2={-84} stroke={RED} strokeWidth={6} strokeLinecap="round" transform={`rotate(${hours * 360})`} />
    <circle r={10} fill={OUTLINE} />
  </g>
);

// 9) Öğrendikten sonraki birkaç saat içinde uyumak
const Timing: Visual = ({ durationInFrames }) => {
  const h = useProgress(10, durationInFrames * 0.6) * 3;
  const arrow = useProgress(durationInFrames * 0.15, durationInFrames * 0.6);
  return (
    <g>
      <Paper />
      <Book x={140} y={330} scale={0.9} delay={0} />
      <Chip x={140} y={420} text="ÖĞREN" delay={4} />
      <Clock x={450} y={250} hours={h} />
      <Bed x={750} y={390} scale={0.6} delay={8} />
      <Chip x={760} y={440} text="UYU" delay={12} />
      <Arrow from={[250, 230]} to={[330, 230]} progress={Math.min(1, arrow * 2)} color={TEAL} />
      <Arrow from={[570, 230]} to={[650, 270]} progress={Math.max(0, arrow * 2 - 1)} color={TEAL} />
      <Chip x={450} y={460} text="BİRKAÇ SAAT" dark delay={Math.round(durationInFrames * 0.4)} />
    </g>
  );
};

// 10) İpucu: yatmadan önce çalış, uyu, sabah tekrar et
const BedtimeTip: Visual = ({ durationInFrames }) => {
  const s2 = Math.round(durationInFrames * 0.3);
  const s3 = Math.round(durationInFrames * 0.55);
  const frame = useCurrentFrame();
  const flip = (frame % 24) / 24;
  return (
    <g>
      <Paper />
      <rect x={20} y={40} width={270} height={360} rx={20} fill={NIGHT} stroke={OUTLINE} strokeWidth={5} />
      <Moon x={230} y={100} scale={0.5} />
      <Book x={155} y={300} scale={0.9} flip={flip} />
      <rect x={315} y={40} width={270} height={360} rx={20} fill="#3b4a82" stroke={OUTLINE} strokeWidth={5} opacity={useAppear(s2)} />
      <Bed x={450} y={330} scale={0.62} delay={s2} />
      <rect x={610} y={40} width={270} height={360} rx={20} fill="#fff3d6" stroke={OUTLINE} strokeWidth={5} opacity={useAppear(s3)} />
      <Sun x={820} y={100} scale={0.45} delay={s3} />
      <Brain x={745} y={270} scale={0.6} delay={s3 + 4} />
      <Chip x={155} y={460} text="1. ÇALIŞ" delay={4} />
      <Chip x={450} y={460} text="2. UYU" delay={s2 + 4} />
      <Chip x={745} y={460} text="3. TEKRAR" delay={s3 + 8} />
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
      <Bust x={200} y={540} scale={1.05} mood="think" shirt={TEAL} />
      <QuestionMark x={330} y={140} size={80} delay={4} color={TEAL} />
      <Comment x={640} y={110} text="UYURUM" delay={6} color={TEAL} />
      <Comment x={640} y={215} text="SABAHLARIM" delay={14} color={ORANGE} />
      <Comment x={640} y={320} text="DEĞİŞİR" delay={22} color={PURPLE} />
      <g transform={place(640, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={28} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  NightStudy,
  SleepHero,
  SleepVsAwake,
  RatReplay,
  MemoryMove,
  TwoTeams,
  HalfPractice,
  WeekScore,
  Timing,
  BedtimeTip,
  YourTurn,
};
