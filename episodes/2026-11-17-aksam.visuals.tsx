// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Bebeklik amnezisi / ilk üç yılı neden hatırlamıyoruz (2026-11-17-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import { Arrow, Brain, Chip, Heart, INK, place, QuestionMark, Sparkles, ThoughtBubble, uiFont, useAppear, useProgress, useWave } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#f3efff";
const SKIN = "#f2c79a";
const PURPLE = "#8a6cf0";
const PINK = "#ff5c8a";
const TEAL = "#17c3a5";
const ORANGE = "#ff9a3d";
const BLUE = "#3d8bfd";
const YEL = "#ffd23f";
const HAIR = "#4a2f1d";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

type Mood = "calm" | "happy" | "wow" | "sleep" | "think";

// Yuvarlak yüz; (0,0) merkez, yarıçap r
const Face: React.FC<{ r?: number; mood?: Mood; hair?: string; baby?: boolean }> = ({ r = 60, mood = "calm", hair = HAIR, baby = false }) => {
  const frame = useCurrentFrame();
  const blink = frame % 96 > 90 ? 0.15 : 1;
  const k = r / 60;
  return (
    <g transform={`scale(${k})`}>
      <circle r={60} fill={SKIN} stroke={OUTLINE} strokeWidth={6 / k} />
      {baby ? (
        <path d="M -6 -60 Q 4 -78 16 -66 Q 8 -64 6 -56" fill="none" stroke={HAIR} strokeWidth={5} strokeLinecap="round" />
      ) : (
        <path d="M -62 -6 Q -66 -72 0 -70 Q 62 -70 62 -8 Q 40 -40 0 -40 Q -36 -40 -62 -6 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      )}
      {mood === "sleep" ? (
        <g>
          <path d="M -32 0 Q -22 8 -12 0" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          <path d="M 12 0 Q 22 8 32 0" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        </g>
      ) : mood === "wow" ? (
        <g>
          <circle cx={-22} cy={-2} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={22} cy={-2} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={-22} cy={0} r={5} fill={OUTLINE} />
          <circle cx={22} cy={0} r={5} fill={OUTLINE} />
        </g>
      ) : (
        <g transform={`translate(0 ${-2 * (1 - blink)}) scale(1 ${blink})`}>
          <circle cx={-22} cy={-2} r={baby ? 8 : 7} fill={OUTLINE} />
          <circle cx={22} cy={-2} r={baby ? 8 : 7} fill={OUTLINE} />
          {mood === "think" ? <circle cx={-18} cy={-6} r={2.5} fill="#fff" /> : null}
        </g>
      )}
      {mood === "happy" ? (
        <path d="M -20 22 Q 0 44 20 22 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      ) : mood === "wow" ? (
        <ellipse cx={0} cy={30} rx={9} ry={12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
      ) : mood === "think" ? (
        <path d="M -14 30 Q 0 24 16 30" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      ) : (
        <path d="M -14 26 Q 0 36 14 26" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      )}
      <circle cx={-38} cy={16} r={8} fill="#f59ab0" opacity={0.6} />
      <circle cx={38} cy={16} r={8} fill="#f59ab0" opacity={0.6} />
    </g>
  );
};

// Bebek: (x,y) alt orta; tulumlu gövde + büyük kafa
const Baby: React.FC<{ x: number; y: number; scale?: number; mood?: Mood; suit?: string; delay?: number; rock?: boolean }> = ({
  x,
  y,
  scale = 1,
  mood = "happy",
  suit = TEAL,
  delay = 0,
  rock = true,
}) => {
  const a = useAppear(delay);
  const sway = useWave(50, rock ? 4 : 0);
  return (
    <g transform={place(x, y, scale * a, sway)}>
      <ellipse cx={0} cy={0} rx={60} ry={8} fill="rgba(0,0,0,0.15)" />
      <ellipse cx={-26} cy={-16} rx={22} ry={16} fill={suit} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={26} cy={-16} rx={22} ry={16} fill={suit} stroke={OUTLINE} strokeWidth={5} />
      <path d="M -44 -20 Q -50 -90 0 -96 Q 50 -90 44 -20 Z" fill={suit} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={-50} cy={-62} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={50} cy={-62} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <g transform="translate(0 -150)">
        <Face r={58} mood={mood} baby />
      </g>
    </g>
  );
};

// Yetişkin/çocuk büstü; (x,y) gövdenin alt ortası
const Bust: React.FC<{ x: number; y: number; scale?: number; shirt?: string; mood?: Mood; hair?: string; delay?: number }> = ({
  x,
  y,
  scale = 1,
  shirt = PURPLE,
  mood = "calm",
  hair = HAIR,
  delay = 0,
}) => {
  const a = useAppear(delay);
  const sway = useWave(70, 2);
  return (
    <g transform={place(x, y, scale * a, sway)}>
      <path d="M -90 0 L -80 -76 Q -76 -112 -38 -116 L 38 -116 Q 76 -112 80 -76 L 90 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-13} y={-132} width={26} height={20} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform="translate(0 -190)">
        <Face r={64} mood={mood} hair={hair} />
      </g>
    </g>
  );
};

// Polaroid; içerik (0,-20) merkezli
const Polaroid: React.FC<{ x: number; y: number; scale?: number; tilt?: number; delay?: number; fade?: number; label?: string; children?: React.ReactNode }> = ({
  x,
  y,
  scale = 1,
  tilt = 0,
  delay = 0,
  fade = 1,
  label,
  children,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a, tilt)}>
      <rect x={-96} y={-116} width={192} height={226} rx={8} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-80} y={-100} width={160} height={150} fill="#d9ceff" stroke={OUTLINE} strokeWidth={3} />
      <g opacity={fade}>
        <g transform="translate(0 -25)">{children}</g>
      </g>
      {label ? (
        <text y={88} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={INK}>
          {label}
        </text>
      ) : null}
    </g>
  );
};

// Konuşma balonu (beyaz); metin satırları
const Speech: React.FC<{ x: number; y: number; w: number; lines: string[]; color?: string; delay?: number; size?: number; tailLeft?: boolean }> = ({
  x,
  y,
  w,
  lines,
  color = PURPLE,
  delay = 0,
  size = 36,
  tailLeft = true,
}) => {
  const a = useAppear(delay);
  const h = lines.length * (size + 10) + 34;
  const tail = tailLeft ? `M ${-w / 2 + 40} ${h / 2 - 2} L ${-w / 2 + 20} ${h / 2 + 40} L ${-w / 2 + 80} ${h / 2 - 2}` : `M ${w / 2 - 80} ${h / 2 - 2} L ${w / 2 - 20} ${h / 2 + 40} L ${w / 2 - 40} ${h / 2 - 2}`;
  return (
    <g transform={place(x, y, a)}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <path d={tail} fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-w / 2 + 3} y={h / 2 - 8} width={w - 6} height={6} fill="#fff" />
      {lines.map((t, i) => (
        <text key={i} y={-h / 2 + 17 + (i + 1) * (size + 10) - 10} fontFamily={uiFont} fontWeight={800} fontSize={size} textAnchor="middle" fill={color}>
          {t}
        </text>
      ))}
    </g>
  );
};

// Doğum günü pastası (yaş mumlarıyla)
const Cake: React.FC<{ x: number; y: number; candles: number; scale?: number; delay?: number }> = ({ x, y, candles, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  const flick = useWave(10, 0.12);
  return (
    <g transform={place(x, y, scale * a)}>
      <rect x={-60} y={-50} width={120} height={50} rx={8} fill="#ffb3c9" stroke={OUTLINE} strokeWidth={5} />
      <path d="M -60 -36 Q -45 -22 -30 -36 Q -15 -22 0 -36 Q 15 -22 30 -36 Q 45 -22 60 -36" fill="none" stroke="#fff" strokeWidth={6} />
      {Array.from({ length: candles }).map((_, i) => {
        const cx = (i - (candles - 1) / 2) * 22;
        return (
          <g key={i}>
            <rect x={cx - 5} y={-80} width={10} height={30} fill={BLUE} stroke={OUTLINE} strokeWidth={3} />
            <path transform={`translate(${cx} -84) scale(1 ${1 + flick})`} d="M 0 -16 Q 9 -4 0 2 Q -9 -4 0 -16 Z" fill={ORANGE} stroke={OUTLINE} strokeWidth={2.5} />
          </g>
        );
      })}
    </g>
  );
};

// Hipokampus (denizatı biçimli kıvrım)
const HippoShape: React.FC<{ glow: number }> = ({ glow }) => (
  <g>
    <circle r={60 + glow * 30} fill={YEL} opacity={0.35 * glow} />
    <path
      d="M -40 -40 Q -10 -70 20 -50 Q 50 -30 30 0 Q 10 30 30 50 Q 44 64 26 74 Q 6 80 -4 60 Q -16 30 0 6 Q 14 -18 -10 -26 Q -30 -30 -40 -40 Z"
      fill={glow > 0.5 ? YEL : "#c9b7ff"}
      stroke={OUTLINE}
      strokeWidth={5}
      strokeLinejoin="round"
    />
  </g>
);

// 1) İlk anın ne? — yetişkin düşünüyor, balonda boş bebeklik karesi
const FirstMemory: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const fade = interpolate(useCurrentFrame(), [d, d + 30], [1, 0.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <g>
      <Paper />
      <Bust x={210} y={560} scale={1.1} mood="think" shirt={PURPLE} delay={2} />
      <ThoughtBubble x={600} y={210} r={150} delay={8}>
        <g transform="scale(0.85)">
          <Polaroid x={0} y={10} tilt={-4} fade={fade} label="0–3 YAŞ">
            <Baby x={0} y={70} scale={0.55} rock={false} />
          </Polaroid>
        </g>
      </ThoughtBubble>
      <QuestionMark x={810} y={90} size={90} delay={d + 10} color={PINK} />
      <QuestionMark x={420} y={70} size={60} delay={d + 18} color={PURPLE} />
      <Chip x={600} y={500} text="HİÇ ANI YOK?" dark delay={d + 4} />
    </g>
  );
};

// 2) Her şeyi öğrendin — bebek yürüyor, kelimeler çıkıyor
const ToddlerLearns: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const walk = useProgress(0, durationInFrames * 0.6);
  const words = ["ANNE", "BABA", "SU", "TOP", "MAMA"];
  return (
    <g>
      <Paper />
      <rect y={460} width={900} height={100} fill="#d9ceff" />
      <line x1={0} y1={460} x2={900} y2={460} stroke={OUTLINE} strokeWidth={5} />
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx={140 + i * 110} cy={490} rx={16} ry={8} fill="#b9a6f5" opacity={walk * 4 > i ? 1 : 0} />
      ))}
      <g transform={`translate(${walk * 330} ${Math.abs(Math.sin(frame / 5)) * -8})`}>
        <Baby x={130} y={470} scale={0.9} mood="happy" suit={ORANGE} />
      </g>
      {words.map((w, i) => {
        const a = useAppear(10 + i * 10);
        return (
          <g key={w} transform={place(430 + ((i % 3) - 1) * 170 + (i > 2 ? 85 : 0), 80 + (i > 2 ? 110 : 0), a)}>
            <rect x={-70} y={-30} width={140} height={60} rx={30} fill={[YEL, TEAL, PINK, BLUE, PURPLE][i]} stroke={OUTLINE} strokeWidth={4} />
            <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={i === 0 ? INK : "#fff"}>
              {w}
            </text>
          </g>
        );
      })}
      <Chip x={720} y={380} text="İLK ADIM!" delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

// 3) Zaman çizgisi: 0–3 sis, 3'ten sonra anılar
const AgeLine: Visual = ({ durationInFrames }) => {
  const p = useProgress(4, durationInFrames * 0.3);
  const d = Math.round(durationInFrames * 0.25);
  return (
    <g>
      <Paper />
      <rect x={60} y={150} width={270} height={220} rx={20} fill="#c8c0dc" opacity={0.85} />
      <text x={195} y={200} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#6a6280">
        BOŞ
      </text>
      {[0, 1, 2].map((i) => (
        <text key={i} x={110 + i * 85} y={290} fontFamily={uiFont} fontWeight={800} fontSize={70} textAnchor="middle" fill="#9e95b8" opacity={0.7}>
          ?
        </text>
      ))}
      <line x1={60} y1={400} x2={60 + 780 * p} y2={400} stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5, 6].map((age) => {
        const x = 60 + age * 130;
        const show = p * 6 >= age ? 1 : 0;
        return (
          <g key={age} opacity={show}>
            <circle cx={x} cy={400} r={14} fill={age >= 3 ? PURPLE : "#bbb"} stroke={OUTLINE} strokeWidth={4} />
            <text x={x} y={460} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK}>
              {age}
            </text>
          </g>
        );
      })}
      <Polaroid x={480} y={240} scale={0.6} tilt={-6} delay={d}>
        <Cake x={0} y={40} candles={3} scale={0.8} />
      </Polaroid>
      <Polaroid x={640} y={220} scale={0.6} tilt={5} delay={d + 8}>
        <Heart x={0} y={0} size={1.1} color={PINK} />
      </Polaroid>
      <Polaroid x={800} y={240} scale={0.6} tilt={-3} delay={d + 16}>
        <circle r={40} fill={ORANGE} stroke={OUTLINE} strokeWidth={5} />
      </Polaroid>
      <Chip x={600} y={510} text="İLK ANI: 3 YAŞ" dark delay={d + 14} />
    </g>
  );
};

// 4) Üç yaşında röportaj, yıllar sonra tekrar
const Interview: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const later = useAppear(d);
  return (
    <g>
      <Paper />
      <Bust x={170} y={560} scale={0.95} shirt={BLUE} hair="#1f1f24" mood="happy" delay={2} />
      <g transform="translate(0 0)">
        <Baby x={420} y={520} scale={0.85} suit={TEAL} mood="happy" delay={6} />
      </g>
      <Speech x={300} y={110} w={300} lines={["HAYVANAT", "BAHÇESİ?"]} delay={10} size={34} color={BLUE} />
      <Chip x={420} y={320} text="3 YAŞ" delay={14} />
      <g opacity={later}>
        <line x1={560} y1={60} x2={560} y2={520} stroke={OUTLINE} strokeWidth={4} strokeDasharray="14 12" />
      </g>
      <g transform={place(730, 0, later)}>
        <Bust x={0} y={560} scale={0.9} shirt={TEAL} mood="think" />
        <Chip x={0} y={190} text="YILLAR SONRA" dark />
        <QuestionMark x={110} y={270} size={80} color={PINK} />
      </g>
      <Arrow from={[480, 250]} to={[620, 250]} progress={useProgress(d, d + 16)} color={PURPLE} />
    </g>
  );
};

// 5) Yedi yaş silgisi — çubuk grafik ve silgi
const Eraser: Visual = ({ durationInFrames }) => {
  const p1 = useProgress(4, 24);
  const d = Math.round(durationInFrames * 0.45);
  const p2 = useProgress(d, d + 20);
  const erase = useProgress(d, d + 30);
  const base = 440;
  return (
    <g>
      <Paper />
      <line x1={100} y1={base} x2={800} y2={base} stroke={OUTLINE} strokeWidth={6} />
      <rect x={180} y={base - 300 * 0.65 * p1} width={180} height={300 * 0.65 * p1} rx={8} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
      <rect x={540} y={base - 300 * 0.37 * p2} width={180} height={300 * 0.37 * p2} rx={8} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
      <rect x={540} y={base - 300 * 0.65} width={180} height={300 * 0.28} rx={8} fill="none" stroke="#9e95b8" strokeWidth={4} strokeDasharray="12 10" opacity={p2} />
      <text x={270} y={base + 50} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK}>
        5–7 YAŞ
      </text>
      <text x={630} y={base + 50} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK}>
        8–9 YAŞ
      </text>
      <Chip x={270} y={190} text="ÇOĞU VAR" delay={20} />
      <Chip x={630} y={180} text="ÇOĞU SİLİNDİ" dark delay={d + 24} />
      <g transform={place(560 + erase * 140, base - 300 * 0.55 + Math.sin(erase * 18) * 14, useAppear(d), -25)}>
        <rect x={-50} y={-26} width={100} height={52} rx={10} fill="#ff9fb8" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-50} y={-26} width={38} height={52} rx={8} fill={BLUE} stroke={OUTLINE} strokeWidth={5} />
      </g>
      <text x={450} y={70} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={PURPLE}>
        3 YAŞINDAKİ OLAYLARI HATIRLAMA
      </text>
    </g>
  );
};

// 6) Bebek beyni taranıyor
const BabyScan: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const scanY = 140 + ((frame * 4) % 260);
  const d = Math.round(durationInFrames * 0.3);
  return (
    <g>
      <Paper />
      {/* tarayıcı halkası */}
      <circle cx={300} cy={300} r={210} fill="#e6e0f7" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={300} cy={300} r={150} fill={PAPER} stroke={OUTLINE} strokeWidth={5} />
      <Baby x={300} y={420} scale={0.95} mood="wow" suit={PINK} rock={false} delay={2} />
      <rect x={160} y={scanY} width={280} height={8} fill={TEAL} opacity={0.6} />
      {/* ekran */}
      <g transform={place(700, 230, useAppear(d))}>
        <rect x={-140} y={-130} width={280} height={220} rx={16} fill="#2f2a45" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-120} y={-110} width={240} height={180} rx={8} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
        {[
          [PINK, 0],
          [TEAL, 1],
          [YEL, 2],
        ].map(([c, i]) => {
          const show = frame > d + 10 + (i as number) * 14;
          return (
            <g key={i as number} opacity={show ? 1 : 0} transform={`translate(${-75 + (i as number) * 75} -20)`}>
              {i === 0 ? <circle r={28} fill={c as string} stroke={OUTLINE} strokeWidth={4} /> : null}
              {i === 1 ? <rect x={-26} y={-26} width={52} height={52} rx={6} fill={c as string} stroke={OUTLINE} strokeWidth={4} /> : null}
              {i === 2 ? <path d="M 0 -30 L 30 26 L -30 26 Z" fill={c as string} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" /> : null}
            </g>
          );
        })}
        <rect x={-30} y={90} width={60} height={40} fill="#2f2a45" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Chip x={700} y={470} text="BEYİN TARAMASI" dark delay={d + 6} />
    </g>
  );
};

// 7) Hipokampus çalışıyor
const Hippocampus: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const glow = useProgress(d, d + 14);
  const pulse = 1 + 0.06 * Math.sin(useCurrentFrame() / 4) * glow;
  return (
    <g>
      <Paper />
      <Brain x={320} y={280} scale={1.6} delay={2} />
      <g transform={place(330, 375, pulse * 0.55)}>
        <HippoShape glow={glow} />
      </g>
      <Arrow from={[600, 210]} to={[420, 300]} progress={useProgress(d + 4, d + 20)} color={PURPLE} />
      <g transform={place(700, 170, useAppear(d + 10))}>
        <rect x={-150} y={-40} width={300} height={80} rx={40} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
        <text y={13} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill="#fff">
          HİPOKAMPUS
        </text>
      </g>
      <g transform={place(700, 330, useAppear(d + 22))}>
        <circle r={22} fill="#e63946" stroke={OUTLINE} strokeWidth={4} opacity={0.5 + 0.5 * Math.abs(Math.sin(useCurrentFrame() / 8))} />
        <text x={40} y={14} fontFamily={uiFont} fontWeight={800} fontSize={40} fill={INK}>
          KAYIT
        </text>
      </g>
      <Sparkles points={[[200, 120], [470, 140], [250, 450], [480, 420]]} />
      <Chip x={700} y={470} text="ANI KAYDI VAR!" dark delay={d + 20} />
    </g>
  );
};

// 8) Kilitli anı kutusu, anahtar uzaklaşıyor
const LockedBox: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.4);
  const drift = useProgress(d, durationInFrames);
  const bob = useWave(40, 6);
  return (
    <g>
      <Paper />
      {/* sandık */}
      <g transform={place(300, 330, useAppear(2))}>
        <rect x={-150} y={-60} width={300} height={170} rx={14} fill="#b07a46" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -150 -60 Q 0 -150 150 -60 Z" fill="#c68d55" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-150} y={-10} width={300} height={16} fill="#7d5430" />
        <rect x={-28} y={-30} width={56} height={66} rx={8} fill={YEL} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={-2} r={8} fill={OUTLINE} />
        <rect x={-3} y={0} width={6} height={20} fill={OUTLINE} />
        <text y={86} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill="#fff">
          BEBEKLİK ANILARI
        </text>
      </g>
      <Polaroid x={210} y={150} scale={0.4} tilt={-14} delay={6}>
        <Baby x={0} y={70} scale={0.55} rock={false} />
      </Polaroid>
      <Polaroid x={400} y={140} scale={0.4} tilt={12} delay={10}>
        <Cake x={0} y={40} candles={1} scale={0.9} />
      </Polaroid>
      {/* anahtar uzaklaşıyor, soluklaşıyor */}
      <g transform={place(640 + drift * 160, 220 + bob - drift * 60, 1, drift * 40)} opacity={1 - drift * 0.7}>
        <circle r={34} fill="none" stroke={YEL} strokeWidth={16} />
        <circle r={34} fill="none" stroke={OUTLINE} strokeWidth={4} />
        <rect x={30} y={-8} width={110} height={16} fill={YEL} stroke={OUTLINE} strokeWidth={4} />
        <rect x={110} y={6} width={14} height={24} fill={YEL} stroke={OUTLINE} strokeWidth={4} />
        <rect x={84} y={6} width={14} height={18} fill={YEL} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <path d="M 600 390 Q 700 340 820 380" fill="none" stroke={PURPLE} strokeWidth={8} strokeDasharray="18 16" strokeLinecap="round" opacity={1 - drift} />
      <Chip x={680} y={470} text="YOL KAYBOLUYOR" dark delay={d} />
    </g>
  );
};

// 9) Anket: 10 kişiden 4'ü
const Survey: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      {Array.from({ length: 10 }).map((_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 160 + col * 145;
        const y = 250 + row * 190;
        const a = useAppear(2 + i * 3);
        const hl = i < 4 && frame > d + i * 6;
        return (
          <g key={i} transform={place(x, y, a * 0.62)}>
            {hl ? <circle cy={-30} r={100} fill={YEL} opacity={0.65} /> : null}
            <path d="M -60 70 L -54 20 Q -50 -6 -24 -8 L 24 -8 Q 50 -6 54 20 L 60 70 Z" fill={hl ? PINK : "#b9a6f5"} stroke={OUTLINE} strokeWidth={6} />
            <g transform="translate(0 -60)">
              <Face r={50} mood={hl ? "happy" : "calm"} hair={["#4a2f1d", "#1f1f24", "#c9822f"][i % 3]} />
            </g>
            {hl ? (
              <g transform="translate(70 -120)">
                <rect x={-40} y={-26} width={80} height={52} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
                <Baby x={0} y={18} scale={0.22} rock={false} />
              </g>
            ) : null}
          </g>
        );
      })}
      <g transform={place(450, 60, useAppear(d + 22))}>
        <rect x={-330} y={-36} width={660} height={72} rx={36} fill={INK} />
        <text y={13} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill="#fff">
          10 KİŞİDEN 4'Ü: “HATIRLIYORUM!”
        </text>
      </g>
    </g>
  );
};

// 10) Anı mı, fotoğraf mı? — albüm + aile hikâyesi → sahte anı
const PhotoMemory: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.4);
  const merge = useProgress(d, d + 24);
  return (
    <g>
      <Paper />
      <g transform={`translate(${merge * 150} ${merge * 40})`} opacity={1 - merge * 0.6}>
        <Polaroid x={150} y={170} scale={0.75} tilt={-8} delay={2} label="FOTOĞRAF">
          <Baby x={0} y={70} scale={0.55} rock={false} suit={ORANGE} />
        </Polaroid>
      </g>
      <g transform={`translate(${merge * -150} ${merge * 40})`} opacity={1 - merge * 0.6}>
        <Bust x={740} y={420} scale={0.75} shirt={PINK} hair="#b3b3b3" mood="happy" delay={6} />
        <Speech x={720} y={80} w={300} lines={["SEN BEBEKKEN…"]} size={32} color={PINK} delay={10} tailLeft={false} />
      </g>
      <ThoughtBubble x={450} y={330} r={120} delay={d + 10}>
        <g transform="scale(0.7)">
          <Baby x={0} y={80} scale={0.6} suit={ORANGE} />
        </g>
      </ThoughtBubble>
      <g transform={place(450, 520, useAppear(d + 22))}>
        <rect x={-210} y={-32} width={420} height={64} rx={14} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
        <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill="#fff">
          KURGU ANI!
        </text>
      </g>
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  return (
    <g>
      <Paper />
      <Bust x={200} y={560} scale={1.05} shirt={PURPLE} mood="happy" delay={2} />
      <Speech x={600} y={180} w={460} lines={["EN ESKİ ANIN", "KAÇ YAŞINDAN?"]} size={42} delay={d} />
      <Cake x={560} y={420} candles={2} delay={d + 10} />
      <Cake x={720} y={420} candles={3} delay={d + 16} />
      <QuestionMark x={830} y={330} size={70} delay={d + 22} color={PINK} />
      <Chip x={640} y={500} text="YORUMLARA YAZ!" dark delay={d + 28} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  FirstMemory,
  ToddlerLearns,
  AgeLine,
  Interview,
  Eraser,
  BabyScan,
  Hippocampus,
  LockedBox,
  Survey,
  PhotoMemory,
  YourTurn,
};
