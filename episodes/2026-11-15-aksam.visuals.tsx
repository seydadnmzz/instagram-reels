// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Planlama yanılgısı — her iş neden düşündüğünden uzun sürüyor? (2026-11-15-aksam)
import { useCurrentFrame } from "remotion";
import {
  BigText,
  Brain,
  Chip,
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
const PAPER = "#f3efff";
const SKIN = "#f2c79a";
const BLUE = "#4fb6e8";
const GREEN = "#5cc27a";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff9a3d";
const PINK = "#ff5c93";
const COFFEE = "#7a4a2a";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

const PurpleRoom: React.FC<{ window?: "day" | "night" | false; picture?: boolean }> = ({ window = "day", picture = true }) => (
  <Room wall="#f3efff" stripe="#e6ddff" floor="#c9a27a" window={window} picture={picture} />
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

// Duvar saati; speed: minute hand turns per second (30 fps)
const WallClock: React.FC<{ x: number; y: number; r?: number; speed?: number; delay?: number; face?: string }> = ({
  x,
  y,
  r = 90,
  speed = 0.2,
  delay = 0,
  face = "#fff",
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const t = Math.max(0, frame - delay);
  const minute = (t / 30) * speed * 360;
  const hour = 300 + minute / 12;
  return (
    <g transform={place(x, y, a)}>
      <circle r={r + 10} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
      <circle r={r} fill={face} stroke={OUTLINE} strokeWidth={4} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-3} y={-r + 8} width={6} height={i % 3 === 0 ? 18 : 10} fill={OUTLINE} transform={`rotate(${i * 30})`} />
      ))}
      <rect x={-5} y={-r * 0.5} width={10} height={r * 0.55} rx={5} fill={OUTLINE} transform={`rotate(${hour})`} />
      <rect x={-3.5} y={-r * 0.8} width={7} height={r * 0.85} rx={4} fill={RED} transform={`rotate(${minute})`} />
      <circle r={9} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
    </g>
  );
};

// Yatay çubuk (etiket + büyüyen bar + sayı)
const Bar: React.FC<{
  y: number;
  label: string;
  value: number;
  max: number;
  color: string;
  from: number;
  to: number;
  x0?: number;
  width?: number;
  unit?: string;
}> = ({ y, label, value, max, color, from, to, x0 = 270, width = 560, unit = " GÜN" }) => {
  const p = useProgress(from, to);
  const a = useAppear(from - 6);
  const w = (value / max) * width * p;
  return (
    <g opacity={a > 0.02 ? 1 : 0}>
      <text x={x0 - 20} y={y + 12} fontFamily={uiFont} fontWeight={900} fontSize={34} textAnchor="end" fill={INK}>
        {label}
      </text>
      <rect x={x0} y={y - 30} width={width} height={60} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <rect x={x0} y={y - 30} width={Math.max(0, w)} height={60} rx={14} fill={color} stroke={OUTLINE} strokeWidth={4} />
      <text
        x={x0 + Math.max(w, 70) - 14}
        y={y + 13}
        fontFamily={uiFont}
        fontWeight={900}
        fontSize={34}
        textAnchor="end"
        fill="#fff"
        stroke={OUTLINE}
        strokeWidth={5}
        paintOrder="stroke"
      >
        {Math.round(value * p)}
        {p > 0.98 ? unit : ""}
      </text>
    </g>
  );
};

// Takvim yaprağı
const CalendarPage: React.FC<{ x: number; y: number; text: string; scale?: number; rot?: number; delay?: number; stamp?: string; opacity?: number }> = ({
  x,
  y,
  text,
  scale = 1,
  rot = 0,
  delay = 0,
  stamp,
  opacity = 1,
}) => {
  const a = useAppear(delay);
  const s = useAppear(delay + 14);
  return (
    <g transform={place(x, y, scale * a, rot)} opacity={opacity}>
      <rect x={-70} y={-80} width={140} height={160} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-70} y={-80} width={140} height={44} rx={14} fill={RED} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-36} cy={-82} r={7} fill={OUTLINE} />
      <circle cx={36} cy={-82} r={7} fill={OUTLINE} />
      <text y={text.length > 2 ? 8 : 36} fontFamily={uiFont} fontWeight={900} fontSize={text.length > 2 ? 32 : 58} textAnchor="middle" fill={INK}>
        {text}
      </text>
      {stamp ? (
        <g transform={`translate(0 50) rotate(-6) scale(${0.8 * s})`}>
          <rect x={-78} y={-22} width={156} height={44} rx={8} fill="rgba(255,255,255,0.85)" stroke={RED} strokeWidth={5} />
          <text y={11} fontFamily={uiFont} fontWeight={900} fontSize={28} textAnchor="middle" fill={RED}>
            {stamp}
          </text>
        </g>
      ) : null}
    </g>
  );
};

// Yeşil tik
const Tick: React.FC<{ x: number; y: number; delay?: number; color?: string }> = ({ x, y, delay = 0, color = GREEN }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={22} fill={color} stroke={OUTLINE} strokeWidth={4} />
      <path d="M -10 0 L -2 9 L 12 -9" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

// 1) "Yarım saat sürer" — saat hızla dönüyor
const ClockRuns: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const late = frame > durationInFrames * 0.5;
  return (
    <g>
      <PurpleRoom window={false} picture={false} />
      <WallClock x={640} y={200} r={95} speed={late ? 1.6 : 0.6} />
      <Kid x={280} y={520} shirt={ORANGE} mood={late ? "panic" : "happy"} look={1} />
      <Speech x={290} y={130} w={300} text={late ? "AKŞAM OLDU!" : "30 DAKİKA!"} color={late ? RED : INK} delay={4} tail={-20} />
      {late ? <Chip x={640} y={380} text="3 SAAT GEÇTİ" delay={Math.round(durationInFrames * 0.5)} /> : null}
    </g>
  );
};

// 2) Planlama yanılgısı — beyin
const FallacyName: Visual = ({ durationInFrames }) => {
  return (
    <g>
      <Paper />
      <Chip x={450} y={80} text="PLANLAMA YANILGISI" dark delay={4} />
      <Brain x={450} y={330} scale={1.25} mood="confused" delay={10} />
      <QuestionMark x={210} y={250} size={110} delay={20} />
      <QuestionMark x={700} y={230} size={90} delay={28} color={PURPLE} />
      <WallClock x={720} y={430} r={55} speed={1.2} delay={Math.round(durationInFrames * 0.3)} />
      <CalendarPage x={180} y={440} text="?" scale={0.7} rot={-10} delay={Math.round(durationInFrames * 0.35)} />
    </g>
  );
};

// 3) İki psikolog adını koyuyor
const Psychologists: Visual = ({ durationInFrames }) => {
  const sway = useWave(50, 3);
  return (
    <g>
      <Paper />
      <g transform={`rotate(${sway} 450 120)`}>
        <rect x={210} y={45} width={480} height={150} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={450} y={110} fontFamily={uiFont} fontWeight={900} fontSize={44} textAnchor="middle" fill={PURPLE}>
          PLANLAMA
        </text>
        <text x={450} y={164} fontFamily={uiFont} fontWeight={900} fontSize={44} textAnchor="middle" fill={RED}>
          YANILGISI
        </text>
      </g>
      <Kid x={250} y={480} scale={0.85} shirt={PURPLE} hair="#777" mood="happy" delay={8} />
      <Kid x={650} y={480} scale={0.85} shirt={GREEN} hair="#3a2a1a" mood="calm" look={-1} delay={16} />
      <NamePlate x={250} y={520} text="KAHNEMAN" delay={Math.round(durationInFrames * 0.3)} />
      <NamePlate x={650} y={520} text="TVERSKY" delay={Math.round(durationInFrames * 0.4)} />
      <Sparkles points={[[190, 60], [720, 70], [450, 225]]} />
    </g>
  );
};

// 4) Öğrencilere soruyorlar
const AskStudents: Visual = ({ durationInFrames }) => {
  const d = durationInFrames;
  return (
    <g>
      <PurpleRoom window={false} picture={false} />
      <rect x={30} y={40} width={300} height={170} rx={10} fill="#2f5d50" stroke={OUTLINE} strokeWidth={6} />
      <text x={180} y={115} fontFamily={uiFont} fontWeight={900} fontSize={40} textAnchor="middle" fill="#fff">
        TEZ
      </text>
      <text x={180} y={170} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={YELLOW}>
        KAÇ GÜN?
      </text>
      <Kid x={180} y={520} scale={0.85} shirt={PURPLE} mood="calm" look={1} />
      <Kid x={470} y={520} scale={0.72} shirt={BLUE} mood="happy" delay={6} />
      <Kid x={620} y={520} scale={0.72} shirt={PINK} hair="#2a1a10" mood="happy" delay={10} />
      <Kid x={770} y={520} scale={0.72} shirt={GREEN} hair="#c27a2c" mood="happy" delay={14} />
      <Chip x={470} y={300} text="30 GÜN!" delay={Math.round(d * 0.4)} />
      <Chip x={620} y={230} text="BİR AY!" delay={Math.round(d * 0.5)} />
      <Chip x={770} y={300} text="35 GÜN!" delay={Math.round(d * 0.6)} />
      <QuestionMark x={420} y={120} size={80} delay={8} />
    </g>
  );
};

// 5) 34 gün tahmin, 56 gün gerçek
const CalendarRace: Visual = ({ durationInFrames }) => {
  const d = durationInFrames;
  return (
    <g>
      <Paper />
      <Bar y={180} label="TAHMİN" value={34} max={56} color={GREEN} from={6} to={Math.round(d * 0.35)} />
      <Bar y={330} label="GERÇEK" value={56} max={56} color={RED} from={Math.round(d * 0.4)} to={Math.round(d * 0.8)} />
      <CalendarPage x={140} y={460} text="56" scale={0.6} rot={-8} delay={Math.round(d * 0.8)} />
      <Chip x={520} y={470} text="NEREDEYSE 2 KAT!" delay={Math.round(d * 0.85)} />
    </g>
  );
};

// 6) En kötü senaryo bile aşıldı
const WorstCase: Visual = ({ durationInFrames }) => {
  const d = durationInFrames;
  const x0 = 300;
  const width = 520;
  const lineX = x0 + (49 / 56) * width;
  const lp = useProgress(Math.round(d * 0.3), Math.round(d * 0.4));
  return (
    <g>
      <Paper />
      <Bar y={90} label="EN İYİ" value={27} max={56} color={GREEN} from={4} to={Math.round(d * 0.15)} x0={x0} width={width} />
      <Bar y={200} label="EN KÖTÜ" value={49} max={56} color={ORANGE} from={Math.round(d * 0.15)} to={Math.round(d * 0.3)} x0={x0} width={width} />
      <line x1={lineX} y1={150} x2={lineX} y2={150 + 220 * lp} stroke={RED} strokeWidth={6} strokeDasharray="14 10" />
      <Bar y={310} label="GERÇEK" value={56} max={56} color={RED} from={Math.round(d * 0.4)} to={Math.round(d * 0.6)} x0={x0} width={width} />
      <BigText x={lineX + 40} y={250} text="!" size={80} color={RED} delay={Math.round(d * 0.6)} />
      <Chip x={450} y={460} text="ZAMANINDA: YÜZDE 30" dark delay={Math.round(d * 0.7)} />
    </g>
  );
};

// 7) Pembe senaryo — her şey yolunda
const RosyPlan: Visual = ({ durationInFrames }) => {
  const d = durationInFrames;
  const rows = ["BAŞLA", "BİTİR", "TESLİM ET"];
  return (
    <g>
      <PurpleRoom window={false} picture={false} />
      <Kid x={200} y={520} shirt={ORANGE} mood="happy" />
      <ThoughtBubble x={590} y={230} r={170} delay={6}>
        {rows.map((t, i) => (
          <g key={t}>
            <text x={-90} y={-60 + i * 66} fontFamily={uiFont} fontWeight={900} fontSize={36} fill={INK}>
              {t}
            </text>
            <Tick x={-125} y={-72 + i * 66} delay={Math.round(d * (0.2 + i * 0.15))} />
          </g>
        ))}
      </ThoughtBubble>
      <Sparkles points={[[430, 90], [780, 100], [760, 380]]} />
      <Chip x={600} y={480} text="HER ŞEY YOLUNDA!" delay={Math.round(d * 0.7)} />
    </g>
  );
};

// 8) Geçmiş gecikmeler görmezden geliniyor
const PastIgnored: Visual = ({ durationInFrames }) => {
  const d = durationInFrames;
  const fade = 1 - 0.55 * useProgress(Math.round(d * 0.55), Math.round(d * 0.85));
  return (
    <g>
      <Paper />
      <CalendarPage x={140} y={170} text="OCAK" scale={0.8} rot={-8} delay={4} stamp="GECİKTİ" opacity={fade} />
      <CalendarPage x={300} y={260} text="MART" scale={0.8} rot={6} delay={12} stamp="GECİKTİ" opacity={fade} />
      <CalendarPage x={150} y={400} text="MAYIS" scale={0.8} rot={-4} delay={20} stamp="GECİKTİ" opacity={fade} />
      <Kid x={640} y={520} shirt={BLUE} mood="cool" look={1} />
      <Speech x={640} y={110} w={380} text="BU SEFER FARKLI!" delay={Math.round(d * 0.45)} tail={-10} />
    </g>
  );
};

// 9) Başkasının işi için temkinliyiz
const Observer: Visual = ({ durationInFrames }) => {
  const d = durationInFrames;
  return (
    <g>
      <PurpleRoom window={false} picture={false} />
      <Kid x={230} y={500} scale={0.85} shirt={ORANGE} mood="happy" />
      <Kid x={670} y={500} scale={0.85} shirt={PURPLE} hair="#2a1a10" mood="calm" look={-1} delay={6} />
      <Speech x={230} y={110} w={330} text="BANA 1 SAAT!" delay={8} />
      <Speech x={670} y={110} w={330} text="SANA 3 SAAT!" color={RED} delay={Math.round(d * 0.45)} />
      <NamePlate x={230} y={535} text="KENDİ İŞİN" delay={14} />
      <NamePlate x={670} y={535} text="BAŞKASININ İŞİ" delay={Math.round(d * 0.45)} />
    </g>
  );
};

// 10) İşi adımlara böl, geçmişe bak
const SplitTask: Visual = ({ durationInFrames }) => {
  const d = durationInFrames;
  const sp = useProgress(Math.round(d * 0.15), Math.round(d * 0.45));
  const colors = [PURPLE, BLUE, GREEN, ORANGE, PINK];
  return (
    <g>
      <Paper />
      {colors.map((c, i) => {
        const tx = 450 + (i - 2) * 100 * sp + (i - 2) * 30 * sp;
        const ty = 250 - i * 40 * sp + 40 * sp;
        const w = 300 - 200 * sp;
        return (
          <g key={c} transform={`translate(${tx} ${ty})`}>
            <rect x={-w / 2} y={-50} width={w} height={100} rx={14} fill={c} stroke={OUTLINE} strokeWidth={5} opacity={sp > 0.02 || i === 2 ? 1 : 0} />
            {sp > 0.6 ? (
              <text y={16} fontFamily={uiFont} fontWeight={900} fontSize={44} textAnchor="middle" fill="#fff" stroke={OUTLINE} strokeWidth={4} paintOrder="stroke">
                {i + 1}
              </text>
            ) : null}
          </g>
        );
      })}
      {sp < 0.05 ? (
        <text x={450} y={266} fontFamily={uiFont} fontWeight={900} fontSize={48} textAnchor="middle" fill="#fff" stroke={OUTLINE} strokeWidth={5} paintOrder="stroke">
          BÜYÜK İŞ
        </text>
      ) : null}
      <CalendarPage x={140} y={450} text="?" scale={0.6} rot={-6} delay={Math.round(d * 0.6)} />
      <Chip x={510} y={460} text="GEÇEN SEFER NE SÜRDÜ?" delay={Math.round(d * 0.65)} />
    </g>
  );
};

// 11) Kapanış
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = durationInFrames;
  return (
    <g>
      <Paper />
      <Speech x={450} y={95} w={460} text="SENDE NE ZAMAN?" delay={4} />
      <Brain x={450} y={340} scale={1.1} mood="happy" delay={8} />
      <WallClock x={170} y={330} r={70} speed={1} delay={14} />
      <CalendarPage x={730} y={330} text="?" scale={0.8} rot={8} delay={20} />
      <Chip x={450} y={500} text="YORUMLARA YAZ!" dark delay={Math.round(d * 0.45)} />
      <Sparkles points={[[280, 200], [620, 200], [800, 470]]} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  ClockRuns,
  FallacyName,
  Psychologists,
  AskStudents,
  CalendarRace,
  WorstCase,
  RosyPlan,
  PastIgnored,
  Observer,
  SplitTask,
  YourTurn,
};
