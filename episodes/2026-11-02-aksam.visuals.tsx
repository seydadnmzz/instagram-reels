// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Kafaya takılan şarkı — kulak kurdu (2026-11-02-aksam)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
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
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff1e6";
const SKIN = "#f2c79a";
const ORANGE = "#ff8a3d";
const PEACH = "#ffd2b0";
const PURPLE = "#6a4cf5";
const TEAL = "#16b5a5";
const BLUE = "#5b8def";
const PINK = "#f06292";
const GREEN = "#7cc85a";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

type Mood = "calm" | "happy" | "annoyed" | "think" | "chew";

const Face: React.FC<{ mood: Mood }> = ({ mood }) => {
  const frame = useCurrentFrame();
  const blink = frame % 80 > 75 ? 0.15 : 1;
  const eyes = (
    <g transform={`translate(0 ${-198 * (1 - blink)}) scale(1 ${blink})`}>
      <circle cx={-26} cy={-198} r={8} fill={OUTLINE} />
      <circle cx={26} cy={-198} r={8} fill={OUTLINE} />
    </g>
  );
  if (mood === "annoyed") {
    return (
      <g>
        <path d="M -44 -224 L -10 -214 M 10 -214 L 44 -224" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        {eyes}
        <path d="M -22 -160 Q -11 -170 0 -160 Q 11 -150 22 -160" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
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
  if (mood === "chew") {
    const c = Math.abs(Math.sin(frame / 4));
    return (
      <g>
        {eyes}
        <ellipse cx={4} cy={-162} rx={18} ry={4 + c * 8} fill="#7a3b3b" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={-46} cy={-174} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46 + c * 3} cy={-172} r={12 + c * 4} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
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
const Bust: React.FC<{ x: number; y: number; scale?: number; mood: Mood; shirt?: string; hair?: string; delay?: number; tilt?: number }> = ({
  x,
  y,
  scale = 1,
  mood,
  shirt = ORANGE,
  hair = "#4a2f1d",
  delay = 0,
  tilt = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${tilt} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <ellipse cx={-70} cy={-196} rx={10} ry={16} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={70} cy={-196} rx={10} ry={16} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
        <Face mood={mood} />
      </g>
    </g>
  );
};

// Nota işareti (sekizlik ya da çift nota)
const Note8: React.FC<{ x: number; y: number; scale?: number; color?: string; double?: boolean; rotate?: number; opacity?: number }> = ({
  x,
  y,
  scale = 1,
  color = PURPLE,
  double = false,
  rotate = 0,
  opacity = 1,
}) => (
  <g transform={place(x, y, scale, rotate)} opacity={opacity}>
    {double ? (
      <g>
        <path d="M -14 -60 L 34 -72 L 34 -58 L -14 -46 Z" fill={OUTLINE} />
        <line x1={-12} y1={-56} x2={-12} y2={0} stroke={OUTLINE} strokeWidth={6} />
        <line x1={32} y1={-68} x2={32} y2={-12} stroke={OUTLINE} strokeWidth={6} />
        <ellipse cx={-24} cy={2} rx={16} ry={12} transform="rotate(-20 -24 2)" fill={color} stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={20} cy={-10} rx={16} ry={12} transform="rotate(-20 20 -10)" fill={color} stroke={OUTLINE} strokeWidth={4} />
      </g>
    ) : (
      <g>
        <line x1={12} y1={-64} x2={12} y2={0} stroke={OUTLINE} strokeWidth={6} />
        <path d="M 12 -64 Q 34 -54 36 -30 Q 30 -44 12 -46 Z" fill={OUTLINE} />
        <ellipse cx={0} cy={2} rx={17} ry={13} transform="rotate(-20 0 2)" fill={color} stroke={OUTLINE} strokeWidth={4} />
      </g>
    )}
  </g>
);

// Başın etrafında dönen notalar
const NoteOrbit: React.FC<{ cx: number; cy: number; rx: number; ry: number; count?: number; speed?: number; delay?: number }> = ({
  cx,
  cy,
  rx,
  ry,
  count = 5,
  speed = 1,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const colors = [PURPLE, PINK, TEAL, BLUE, ORANGE];
  return (
    <g opacity={a}>
      {Array.from({ length: count }).map((_, i) => {
        const ang = (frame * 0.035 * speed + (i / count) * Math.PI * 2) % (Math.PI * 2);
        const x = cx + Math.cos(ang) * rx;
        const y = cy + Math.sin(ang) * ry;
        return <Note8 key={i} x={x} y={y} scale={0.75 * a} color={colors[i % colors.length]} double={i % 2 === 1} rotate={Math.sin(ang) * 15} />;
      })}
    </g>
  );
};

// Sevimli kurt (kulak kurdu maskotu); (0,0) gövde ortası
const Worm: React.FC<{ x: number; y: number; scale?: number; delay?: number; headphones?: boolean; mood?: "happy" | "sing" }> = ({
  x,
  y,
  scale = 1,
  delay = 0,
  headphones = true,
  mood = "sing",
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const segs = 6;
  const blink = frame % 70 > 65 ? 0.15 : 1;
  const parts = Array.from({ length: segs }).map((_, i) => {
    const px = -150 + i * 46;
    const py = Math.sin(frame / 7 - i * 0.9) * 16;
    return { px, py };
  });
  const head = parts[segs - 1];
  const mouth = mood === "sing" ? 6 + Math.abs(Math.sin(frame / 5)) * 10 : 0;
  return (
    <g transform={place(x, y, scale * a)}>
      {parts.slice(0, segs - 1).map((p, i) => (
        <circle key={i} cx={p.px} cy={p.py} r={34 - (segs - 1 - i) * 2} fill={i % 2 ? "#ffb15c" : "#ff9a3d"} stroke={OUTLINE} strokeWidth={5} />
      ))}
      <g transform={`translate(${head.px + 20} ${head.py - 20})`}>
        <circle r={56} fill="#ffb15c" stroke={OUTLINE} strokeWidth={6} />
        <g transform={`scale(1 ${blink})`}>
          <circle cx={-18} cy={-10} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={22} cy={-10} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={-15} cy={-8} r={6} fill={OUTLINE} />
          <circle cx={25} cy={-8} r={6} fill={OUTLINE} />
        </g>
        {mood === "sing" ? (
          <ellipse cx={4} cy={22} rx={12} ry={mouth} fill="#7a3b3b" stroke={OUTLINE} strokeWidth={4} />
        ) : (
          <path d="M -14 18 Q 4 34 22 18" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        )}
        <circle cx={-34} cy={12} r={8} fill="#f59ab0" opacity={0.8} />
        <circle cx={40} cy={12} r={8} fill="#f59ab0" opacity={0.8} />
        {headphones ? (
          <g>
            <path d="M -54 -6 Q -56 -78 4 -80 Q 64 -78 58 -6" fill="none" stroke={OUTLINE} strokeWidth={10} strokeLinecap="round" />
            <path d="M -54 -6 Q -56 -78 4 -80 Q 64 -78 58 -6" fill="none" stroke={PURPLE} strokeWidth={5} strokeLinecap="round" />
            <rect x={-70} y={-24} width={24} height={42} rx={10} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
            <rect x={50} y={-24} width={24} height={42} rx={10} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
          </g>
        ) : null}
      </g>
    </g>
  );
};

// Kulaklık
const Headphones: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -60 10 Q -64 -80 0 -82 Q 64 -80 60 10" fill="none" stroke={OUTLINE} strokeWidth={14} strokeLinecap="round" />
      <path d="M -60 10 Q -64 -80 0 -82 Q 64 -80 60 10" fill="none" stroke={TEAL} strokeWidth={7} strokeLinecap="round" />
      <rect x={-80} y={-10} width={32} height={56} rx={12} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
      <rect x={48} y={-10} width={32} height={56} rx={12} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
    </g>
  );
};

// Güneş ve ay ile gün geçişi
const SunMoon: React.FC<{ x: number; y: number; p: number }> = ({ x, y, p }) => {
  const sunX = x - 120 + p * 240;
  const sunY = y + 40 - Math.sin(p * Math.PI) * 70;
  return (
    <g>
      <g opacity={1 - p * 0.8}>
        <circle cx={sunX} cy={sunY} r={36} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      </g>
      <g opacity={p}>
        <path d={`M ${x + 140} ${y - 30} a 34 34 0 1 0 22 58 a 26 26 0 1 1 -22 -58 Z`} fill="#fff3b0" stroke={OUTLINE} strokeWidth={4} />
      </g>
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
      <Note8 x={-128} y={10} scale={0.35} color="#fff" />
      <text x={-90} y={11} fontFamily={uiFont} fontWeight={800} fontSize={28} fill={INK}>
        {text}
      </text>
    </g>
  );
};

// 1) Sabahtan akşama kafada çalan şarkı
const StuckSong: Visual = ({ durationInFrames }) => {
  const p = useProgress(0, durationInFrames * 0.85);
  const sky = p < 0.5 ? "#ffe2c7" : "#ffd0b0";
  return (
    <g>
      <Paper />
      <rect x={560} y={40} width={300} height={200} rx={24} fill={sky} stroke={OUTLINE} strokeWidth={5} opacity={0.9} />
      <SunMoon x={710} y={140} p={p} />
      <Chip x={710} y={290} text={p < 0.5 ? "SABAH" : "AKŞAM"} />
      <Bust x={290} y={560} scale={1.15} mood={p < 0.5 ? "happy" : "annoyed"} />
      <NoteOrbit cx={290} cy={190} rx={200} ry={50} count={5} speed={1.2} delay={4} />
      <QuestionMark x={710} y={430} size={90} delay={20} color={ORANGE} />
    </g>
  );
};

// 2) Adı: kulak kurdu
const EarWorm: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <circle cx={450} cy={300} r={210} fill={PEACH} />
      <Worm x={470} y={330} scale={1.25} delay={2} />
      <Note8 x={680} y={150 + Math.sin(frame / 9) * 12} scale={1} color={PINK} />
      <Note8 x={230} y={140 + Math.sin(frame / 8 + 1) * 12} scale={0.9} color={TEAL} double />
      <Note8 x={760} y={320 + Math.sin(frame / 10 + 2) * 12} scale={0.8} color={BLUE} double />
      <Sparkles points={[[150, 300], [740, 470], [320, 90]]} />
      <NamePlate x={450} y={510} text="KULAK KURDU" delay={10} />
    </g>
  );
};

// 3) Anket: 10 kişiden 9'u
const Survey: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      {Array.from({ length: 10 }).map((_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 150 + col * 150;
        const y = 220 + row * 200;
        const on = i < 9;
        const a = useAppearSafe(4 + i * 4, frame);
        return (
          <g key={i} transform={place(x, y, a)}>
            <circle cx={0} cy={-40} r={34} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
            <path d="M -46 40 Q -46 -4 0 -4 Q 46 -4 46 40 Z" fill={on ? ORANGE : "#cfcfcf"} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
            <circle cx={-10} cy={-44} r={4} fill={OUTLINE} />
            <circle cx={10} cy={-44} r={4} fill={OUTLINE} />
            {on ? (
              <g transform={`translate(30 -86) rotate(${Math.sin((frame + i * 7) / 6) * 12})`}>
                <Note8 x={0} y={0} scale={0.45} color={i % 2 ? PURPLE : PINK} />
              </g>
            ) : (
              <path d="M -8 -24 L 8 -24" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
            )}
          </g>
        );
      })}
      <Chip x={450} y={510} text="10 KİŞİDEN 9'U · HER HAFTA" delay={48} />
      <Chip x={450} y={60} text="12.000+ KİŞİ" dark delay={2} />
    </g>
  );
};

// useAppear'ı döngü içinde hook kuralını bozmadan kullanmak için basit yay
const useAppearSafe = (delay: number, frame: number) => {
  const t = Math.max(0, frame - delay);
  const x = Math.min(1, t / 10);
  return 1 - (1 - x) * (1 - x);
};

// 4) Şarkıda sessiz boşluk; beyin dolduruyor
const SilentGap: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const p = useProgress(6, durationInFrames * 0.8);
  const bars = 26;
  const gap0 = 10;
  const gap1 = 16;
  const cursor = 90 + p * 720;
  return (
    <g>
      <Paper />
      <rect x={70} y={70} width={760} height={190} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {Array.from({ length: bars }).map((_, i) => {
        const x = 100 + i * 27.5;
        const inGap = i >= gap0 && i < gap1;
        const h = 30 + Math.abs(Math.sin(i * 1.7 + frame / 6)) * 90;
        const brainFill = inGap && cursor > x;
        return inGap ? (
          brainFill ? (
            <rect key={i} x={x} y={165 - h / 2} width={16} height={h} rx={6} fill={PINK} opacity={0.55} stroke={PINK} strokeWidth={3} strokeDasharray="6 5" />
          ) : null
        ) : (
          <rect key={i} x={x} y={165 - h / 2} width={16} height={h} rx={6} fill={x < cursor ? ORANGE : "#ffd2b0"} stroke={OUTLINE} strokeWidth={3} />
        );
      })}
      <rect x={100 + gap0 * 27.5 - 6} y={84} width={(gap1 - gap0) * 27.5 - 4} height={162} rx={12} fill="none" stroke={OUTLINE} strokeWidth={4} strokeDasharray="12 10" />
      <Chip x={100 + ((gap0 + gap1) / 2) * 27.5 - 10} y={60} text="SESSİZ" dark delay={8} />
      <line x1={cursor} y1={80} x2={cursor} y2={250} stroke={RED} strokeWidth={6} strokeLinecap="round" />
      <Brain x={450} y={420} scale={0.9} delay={12} />
      <Arrow from={[450, 340]} to={[100 + 13 * 27.5, 260]} progress={useProgress(20, 40)} color={PINK} />
      <Headphones x={180} y={430} scale={0.9} delay={4} />
      <Sparkles points={[[620, 400], [700, 470], [560, 480]]} color={PINK} />
    </g>
  );
};

// 5) Beynin içindeki müzik çalar
const InnerPlayer: Visual = () => {
  const frame = useCurrentFrame();
  const a = useAppear(6);
  return (
    <g>
      <Paper />
      <Bust x={300} y={560} scale={1.2} mood="calm" shirt={TEAL} />
      {/* Başın içinde küçük kaset çalar */}
      <path d="M 300 236 L 300 196" stroke={OUTLINE} strokeWidth={5} strokeDasharray="8 8" opacity={a} />
      <g transform={place(300, 140, a * 1.1)}>
        <circle r={78} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-62} y={-36} width={124} height={72} rx={12} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-44} y={-22} width={88} height={34} rx={8} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        {[-22, 22].map((cx) => (
          <g key={cx} transform={`translate(${cx} -5) rotate(${frame * 8})`}>
            <circle r={11} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <rect x={-2} y={-11} width={4} height={22} fill={OUTLINE} />
          </g>
        ))}
        <circle cx={-40} cy={24} r={5} fill={RED} />
      </g>
      {/* Sessiz kulak işareti */}
      <g transform={place(640, 200, useAppear(14))}>
        <circle r={70} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -20 -30 Q 20 -50 30 -10 Q 34 20 6 30 Q -6 36 -4 50" fill="none" stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
        <path d="M -50 -50 L 50 50" stroke={RED} strokeWidth={10} strokeLinecap="round" />
      </g>
      <Chip x={640} y={330} text="SES YOK" delay={18} />
      <Note8 x={440 + Math.sin(frame / 8) * 10} y={150} scale={0.7} color={PINK} opacity={a} />
      <Note8 x={160 + Math.sin(frame / 9) * 10} y={150} scale={0.6} color={BLUE} double opacity={a} />
      <Chip x={640} y={430} text="AMA ŞARKI ÇALIYOR" dark delay={26} />
    </g>
  );
};

// 6) Gizem: tam neden bilinmiyor
const Mystery: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <Brain x={300} y={300} scale={1.2} mood="confused" delay={2} />
      <QuestionMark x={140} y={130} size={100} delay={6} color={ORANGE} />
      <QuestionMark x={460} y={110} size={80} delay={10} color={PURPLE} />
      {/* Çalma listesi */}
      <g transform={place(670, 290, useAppear(14))}>
        <rect x={-150} y={-170} width={300} height={340} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={-124} fontFamily={uiFont} fontWeight={800} fontSize={23} textAnchor="middle" fill={INK}>
          EN ÇOK TAKILANLAR
        </text>
        {[0, 1, 2, 3].map((i) => {
          const hl = Math.floor(frame / 12) % 4 === i;
          return (
            <g key={i} transform={`translate(0 ${-70 + i * 62})`}>
              <rect x={-128} y={-24} width={256} height={48} rx={12} fill={hl ? YELLOW : PEACH} stroke={OUTLINE} strokeWidth={3} />
              <Note8 x={-100} y={10} scale={0.35} color={[PINK, TEAL, PURPLE, BLUE][i]} />
              <rect x={-70} y={-6} width={150 - i * 20} height={12} rx={6} fill="#c9a28a" />
            </g>
          );
        })}
      </g>
    </g>
  );
};

// 7) Hızlı tempo ve popülerlik
const FastSongs: Visual = () => {
  const frame = useCurrentFrame();
  const beat = Math.max(0, Math.sin(frame / 3)) ** 6;
  return (
    <g>
      <Paper />
      {/* Metronom */}
      <g transform={place(230, 420, useAppear(2))}>
        <path d="M -90 0 L -50 -280 L 50 -280 L 90 0 Z" fill={ORANGE} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-60} y={-110} width={120} height={70} rx={8} fill={PEACH} stroke={OUTLINE} strokeWidth={4} />
        <g transform={`rotate(${Math.sin(frame / 5) * 30} 0 -40)`}>
          <line x1={0} y1={-40} x2={0} y2={-260} stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
          <rect x={-18} y={-210} width={36} height={28} rx={6} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
        </g>
        <rect x={-100} y={-10} width={200} height={24} rx={8} fill="#8a5a32" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Chip x={230} y={490} text="HIZLI TEMPO" delay={8} />
      {/* Hoparlör ve listeler */}
      <g transform={place(640, 220, useAppear(10) * (1 + beat * 0.06))}>
        <rect x={-110} y={-140} width={220} height={280} rx={24} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
        <circle cx={0} cy={-60} r={40} fill="#3a2a88" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={50} r={64} fill="#3a2a88" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={50} r={22 + beat * 6} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      </g>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 14) % 42) / 42;
        return <path key={i} d={`M ${770 + t * 60} ${150 + i * 40} q 20 -20 0 -40`} fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" opacity={1 - t} />;
      })}
      <Chip x={640} y={430} text="POPÜLER" dark delay={16} />
      <Chip x={640} y={500} text="3.000 KİŞİ" delay={22} />
    </g>
  );
};

// 8) Yükselip alçalan melodi + sıçrama
const MelodyShape: Visual = ({ durationInFrames }) => {
  const p = useProgress(4, durationInFrames * 0.7);
  const frame = useCurrentFrame();
  // Notaların y konumları: yükselip alçalan kavis, arada bir sıçrama
  const pts: [number, number][] = [
    [110, 400],
    [190, 350],
    [270, 300],
    [350, 260],
    [430, 240],
    [510, 120],
    [590, 280],
    [670, 330],
    [750, 380],
    [820, 420],
  ];
  const shown = Math.floor(p * pts.length + 0.001);
  const path = pts.slice(0, Math.max(1, shown)).map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
  return (
    <g>
      <Paper />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={60} y1={160 + i * 70} x2={860} y2={160 + i * 70} stroke="#e7c7ad" strokeWidth={4} />
      ))}
      <path d={path} fill="none" stroke={ORANGE} strokeWidth={8} strokeDasharray="14 10" strokeLinecap="round" />
      {pts.slice(0, shown).map(([x, y], i) => (
        <Note8 key={i} x={x} y={y + 20 + Math.sin((frame + i * 9) / 7) * 4} scale={0.7} color={i === 5 ? PINK : [PURPLE, TEAL, BLUE][i % 3]} />
      ))}
      {shown > 5 ? <Chip x={510} y={60} text="SÜRPRİZ SIÇRAMA!" dark /> : null}
      <Arrow from={[150, 500]} to={[400, 430]} progress={useProgress(10, 30)} color={TEAL} />
      <Arrow from={[620, 430]} to={[840, 500]} progress={useProgress(durationInFrames * 0.55, durationInFrames * 0.7)} color={PURPLE} />
      <Chip x={190} y={520} text="YÜKSEL" delay={16} />
      <Chip x={730} y={520} text="ALÇAL" delay={Math.round(durationInFrames * 0.6)} />
    </g>
  );
};

// 9) Sakız çiğnemek
const GumTip: Visual = () => {
  const frame = useCurrentFrame();
  const fade = 0.25 + 0.75 * Math.max(0, 1 - frame / 70);
  return (
    <g>
      <Paper />
      <Bust x={300} y={560} scale={1.15} mood="chew" shirt={PINK} />
      {/* Sakız paketi */}
      <g transform={place(620, 220, useAppear(6), -8)}>
        <rect x={-120} y={-60} width={240} height={120} rx={18} fill={GREEN} stroke={OUTLINE} strokeWidth={6} />
        <rect x={-120} y={-60} width={60} height={120} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={-40 + i * 52} y={-40} width={40} height={80} rx={8} fill="#c7f0a8" stroke={OUTLINE} strokeWidth={4} />
        ))}
      </g>
      {/* Sönen notalar */}
      <g opacity={fade}>
        <Note8 x={180} y={150} scale={0.8} color={PURPLE} />
        <Note8 x={420} y={140} scale={0.7} color={TEAL} double />
      </g>
      <BigText x={620} y={390} text="1/3 AZ" size={90} color={YELLOW} delay={20} />
      <Chip x={620} y={490} text="DAHA AZ ŞARKI" dark delay={26} />
    </g>
  );
};

// 10) Kelime bulmacası: kolay iyi, fazla zor ters
const PuzzleTip: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const half = durationInFrames * 0.4;
  const second = frame > half;
  const letters = ["Ş", "A", "R", "K", "I"];
  return (
    <g>
      <Paper />
      {/* Kolay bulmaca */}
      <g transform={place(240, 230, useAppear(2))}>
        <rect x={-170} y={-130} width={340} height={260} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={-80} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
          KOLAY
        </text>
        {letters.map((l, i) => (
          <g key={i} transform={`translate(${-128 + i * 64} ${-10 + Math.sin((frame + i * 6) / 8) * 4})`}>
            <rect x={-26} y={-26} width={52} height={52} rx={8} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
            <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={INK}>
              {l}
            </text>
          </g>
        ))}
        <path d="M -40 70 L -10 100 L 50 40" fill="none" stroke={GREEN} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Zor bulmaca */}
      <g transform={place(660, 230, useAppear(Math.round(half)))}>
        <rect x={-170} y={-130} width={340} height={260} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={-80} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={RED}>
          ÇOK ZOR
        </text>
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={-138 + (i % 6) * 46} y={-50 + Math.floor(i / 6) * 46} width={40} height={40} rx={6} fill={i % 4 === 0 ? "#ffd2b0" : "#f4f4f4"} stroke={OUTLINE} strokeWidth={3} />
        ))}
        <QuestionMark x={110} y={-90} size={60} color={ORANGE} />
      </g>
      {second ? (
        <g>
          <Note8 x={760 + Math.sin(frame / 6) * 10} y={510} scale={0.7} color={PINK} />
          <Note8 x={560 + Math.sin(frame / 7) * 10} y={515} scale={0.6} color={PURPLE} double />
          <Chip x={660} y={420} text="ŞARKI GERİ!" dark />
        </g>
      ) : null}
      <Chip x={240} y={430} text="ŞARKI SÖNER" delay={14} />
    </g>
  );
};

// 11) Kapanış: yorumlara yaz
const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={1.05} mood="think" shirt={ORANGE} />
      <NoteOrbit cx={200} cy={200} rx={150} ry={40} count={4} speed={0.8} delay={2} />
      <Comment x={640} y={110} text="SABAH ŞARKISI" delay={6} color={PINK} />
      <Comment x={640} y={215} text="REKLAM MÜZİĞİ" delay={14} color={TEAL} />
      <Comment x={640} y={320} text="DİZİ JENERİĞİ" delay={22} color={PURPLE} />
      <g transform={place(640, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={28} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  StuckSong,
  EarWorm,
  Survey,
  SilentGap,
  InnerPlayer,
  Mystery,
  FastSongs,
  MelodyShape,
  GumTip,
  PuzzleTip,
  YourTurn,
};
