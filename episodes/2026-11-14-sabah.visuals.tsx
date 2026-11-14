// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Ayağa kalkınca gözlerin kararması / ortostatik hipotansiyon (2026-11-14-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  Brain,
  Chip,
  Heart,
  INK,
  NamePlate,
  place,
  Person,
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
const SKIN = "#f2c79a";
const TEAL = "#17c3a5";
const BLUE = "#0f8fb3";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff9a3d";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;
type Mood = "calm" | "squint" | "sneeze" | "closed" | "happy" | "wow" | "dizzy";

// Belden yukarı karakter; (0,0) gövdenin alt ortası, kafa merkezi (0,-200), yarıçap 70.
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  mood?: Mood;
  beard?: boolean;
  eeg?: boolean;
  delay?: number;
}> = ({ x, y, scale = 1, shirt = TEAL, hair = "#4a2f1d", mood = "calm", beard = false, eeg = false, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const tilt = mood === "squint" ? -6 : mood === "sneeze" ? 8 + Math.sin(frame * 1.5) * 2 : Math.sin(frame / 18) * 2;
  const blink = frame % 90 > 85 ? 0.15 : 1;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${tilt} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {beard ? (
          <path d="M -66 -196 Q -70 -120 0 -112 Q 70 -120 66 -196 Q 50 -150 0 -150 Q -50 -150 -66 -196 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        ) : null}
        {/* Gözler */}
        {mood === "calm" || mood === "happy" ? (
          <g transform={`translate(0 ${-206 * (1 - blink)}) scale(1 ${blink})`}>
            <circle cx={-26} cy={-206} r={8} fill={OUTLINE} />
            <circle cx={26} cy={-206} r={8} fill={OUTLINE} />
          </g>
        ) : null}
        {mood === "wow" ? (
          <g>
            <circle cx={-26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-26} cy={-204} r={6} fill={OUTLINE} />
            <circle cx={26} cy={-204} r={6} fill={OUTLINE} />
          </g>
        ) : null}
        {mood === "squint" || mood === "sneeze" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M -40 -214 L -18 -205 L -40 -196" />
            <path d="M 40 -214 L 18 -205 L 40 -196" />
          </g>
        ) : null}
        {mood === "closed" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round">
            <path d="M -38 -206 Q -26 -196 -14 -206" />
            <path d="M 14 -206 Q 26 -196 38 -206" />
          </g>
        ) : null}
        {mood === "dizzy" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round">
            {[-26, 26].map((cx) => (
              <path key={cx} transform={`rotate(${frame * 12} ${cx} -206)`} d={`M ${cx} -206 m 0 -2 a 3 3 0 1 1 -3 4 a 7 7 0 1 1 9 -7 a 11 11 0 1 1 -15 10`} />
            ))}
            <path d="M -22 -160 Q -11 -170 0 -160 Q 11 -150 22 -160" strokeWidth={5} />
          </g>
        ) : null}
        {/* Burun */}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mood === "squint" ? <circle cx={0} cy={-184} r={10} fill="#ff8a8a" opacity={0.6 + 0.3 * Math.sin(frame / 2)} /> : null}
        {/* Ağız */}
        {mood === "calm" ? <path d="M -20 -164 Q 0 -152 20 -164" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mood === "wow" || mood === "squint" ? <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} /> : null}
        {mood === "sneeze" ? <ellipse cx={0} cy={-158} rx={24} ry={20} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
        {mood === "closed" ? <path d="M -16 -162 L 16 -162" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        <circle cx={-46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
        {eeg ? (
          <g>
            <path d="M -72 -214 Q -70 -290 0 -286 Q 70 -290 72 -214" fill="none" stroke={OUTLINE} strokeWidth={5} />
            {[-60, -30, 0, 30, 60].map((dx, i) => (
              <circle key={i} cx={dx} cy={-262 + Math.abs(dx) * 0.45} r={9} fill={i % 2 ? PINK : BLUE} stroke={OUTLINE} strokeWidth={3} />
            ))}
            <path d="M 60 -235 Q 120 -260 150 -200" fill="none" stroke={OUTLINE} strokeWidth={4} />
          </g>
        ) : null}
      </g>
    </g>
  );
};

const RED_BLOOD = "#d93a4a";

// Kan damlası
const Drop: React.FC<{ x: number; y: number; s?: number; opacity?: number }> = ({ x, y, s = 1, opacity = 1 }) => (
  <path transform={place(x, y, s)} opacity={opacity} d="M 0 -18 Q 13 0 11 8 Q 8 18 0 18 Q -8 18 -11 8 Q -13 0 0 -18 Z" fill={RED_BLOOD} stroke={OUTLINE} strokeWidth={3} />
);

// Tansiyon göstergesi; value 0..1 (0 düşük, 1 yüksek)
const Gauge: React.FC<{ x: number; y: number; value: number; scale?: number; delay?: number; label?: string }> = ({ x, y, value, scale = 1, delay = 0, label }) => {
  const a = useAppear(delay);
  const ang = -90 + value * 180;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -120 0 A 120 120 0 0 1 120 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -100 0 A 100 100 0 0 1 -70.7 -70.7" fill="none" stroke={RED} strokeWidth={16} />
      <path d="M -70.7 -70.7 A 100 100 0 0 1 70.7 -70.7" fill="none" stroke={YELLOW} strokeWidth={16} />
      <path d="M 70.7 -70.7 A 100 100 0 0 1 100 0" fill="none" stroke={TEAL} strokeWidth={16} />
      <g transform={`rotate(${ang})`}>
        <path d="M -7 0 L 0 -92 L 7 0 Z" fill={OUTLINE} />
      </g>
      <circle r={13} fill={OUTLINE} />
      {label ? (
        <text y={50} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
          {label}
        </text>
      ) : null}
    </g>
  );
};

// Kanepe (önden); oturan karakterin bacaklarını gizler
const Sofa: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={place(x, y)}>
    <rect x={-190} y={-150} width={380} height={110} rx={30} fill="#5bb8d6" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-210} y={-60} width={420} height={90} rx={26} fill="#3f9fc2" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-235} y={-110} width={60} height={140} rx={26} fill="#5bb8d6" stroke={OUTLINE} strokeWidth={6} />
    <rect x={175} y={-110} width={60} height={140} rx={26} fill="#5bb8d6" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-190} y={30} width={22} height={26} fill={OUTLINE} />
    <rect x={168} y={30} width={22} height={26} fill={OUTLINE} />
  </g>
);

// Göz kararması: kenarlardan kapanan karanlık + yıldızlar
const Blackout: React.FC<{ amount: number; cx: number; cy: number }> = ({ amount, cx, cy }) => {
  const frame = useCurrentFrame();
  const r = 700 - amount * 520;
  return (
    <g pointerEvents="none">
      <defs>
        <mask id="blackoutMask">
          <rect width={900} height={560} fill="#fff" />
          <circle cx={cx} cy={cy} r={Math.max(60, r)} fill="#000" />
        </mask>
      </defs>
      <rect width={900} height={560} fill="#0b1418" opacity={0.92 * Math.min(1, amount * 1.4)} mask="url(#blackoutMask)" />
      {amount > 0.3
        ? [0, 1, 2, 3, 4].map((i) => {
            const ang = frame / 9 + (i * Math.PI * 2) / 5;
            return (
              <path
                key={i}
                transform={place(cx + Math.cos(ang) * 120, cy - 120 + Math.sin(ang) * 30, 0.9)}
                d="M 0 -18 L 5 -5 L 18 0 L 5 5 L 0 18 L -5 5 L -18 0 L -5 -5 Z"
                fill={YELLOW}
                stroke={OUTLINE}
                strokeWidth={3}
              />
            );
          })
        : null}
    </g>
  );
};

// 1) Oturuyordun… birden kalktın… karardı!
const StandUpBlackout: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const riseStart = Math.round(durationInFrames * 0.18);
  const riseEnd = riseStart + 10;
  const rise = useProgress(riseStart, riseEnd);
  const dark = useProgress(riseEnd + 4, riseEnd + Math.round(durationInFrames * 0.3));
  const by = 430 - rise * 120;
  const sway = frame > riseEnd ? Math.sin(frame / 7) * 5 * dark : 0;
  const mood: Mood = frame < riseStart ? "calm" : dark > 0.25 ? "dizzy" : "wow";
  return (
    <g>
      <Paper />
      <rect x={60} y={50} width={170} height={130} fill="#bfe9ff" stroke={OUTLINE} strokeWidth={6} />
      <line x1={145} y1={50} x2={145} y2={180} stroke={OUTLINE} strokeWidth={5} />
      <rect y={470} width={900} height={90} fill="#c8ebe5" stroke={OUTLINE} strokeWidth={5} />
      <Sofa x={450} y={470} />
      {/* Bacaklar */}
      <g transform={`rotate(${sway} 450 470)`}>
        <rect x={418} y={by - 8} width={28} height={478 - by} rx={10} fill="#2f3f63" stroke={OUTLINE} strokeWidth={5} />
        <rect x={454} y={by - 8} width={28} height={478 - by} rx={10} fill="#2f3f63" stroke={OUTLINE} strokeWidth={5} />
        <Bust x={450} y={by} scale={0.8} mood={mood} shirt={ORANGE} />
      </g>
      <Blackout amount={dark * 0.82} cx={450} cy={by - 160} />
      {frame > riseStart && frame < riseEnd + 12 ? <Sparkles points={[[330, by - 120], [570, by - 140]]} /> : null}
    </g>
  );
};

// 2) Adı: ortostatik hipotansiyon
const NameTag: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const drop = useProgress(d, d + 30);
  const back = useProgress(d + 50, d + 90);
  const v = 0.8 - drop * 0.6 + back * 0.5;
  return (
    <g>
      <Paper />
      <Gauge x={450} y={250} value={v} scale={1.25} delay={2} label="TANSİYON" />
      <Arrow from={[650, 90]} to={[650, 230]} progress={drop} color={RED} />
      <Chip x={240} y={420} text="ORTOSTATİK = AYAKTA" delay={d * 0.6} />
      <Chip x={600} y={500} text="HİPOTANSİYON = DÜŞÜK" dark delay={d + 10} />
    </g>
  );
};

// Basit gövde silüeti (önden); (0,0) ayak ortası, boy ~420
const BodyOutline: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <path
      d="M -60 -300 Q -60 -330 -30 -332 L 30 -332 Q 60 -330 60 -300 L 64 -170 L 44 -168 L 40 -10 L 6 -10 L 0 -150 L -6 -10 L -40 -10 L -44 -168 L -64 -170 Z"
      fill="#fff"
      stroke={OUTLINE}
      strokeWidth={6}
      strokeLinejoin="round"
    />
    <rect x={-12} y={-352} width={24} height={24} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
    <circle cx={0} cy={-392} r={46} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
    {/* Damarlar */}
    <path d="M -24 -340 L -24 -160 L -24 -20 M 24 -340 L 24 -160 L 24 -20" stroke="#f3b3bb" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);

// 3) Suçlu: yerçekimi
const GravityPull: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.15);
  const arrow = useProgress(d, d + 25);
  const fill = useProgress(d + 10, durationInFrames * 0.85);
  return (
    <g>
      <Paper />
      <rect y={500} width={900} height={60} fill="#c8ebe5" stroke={OUTLINE} strokeWidth={5} />
      <BodyOutline x={330} y={505} scale={1.08} />
      {/* Bacaklarda biriken kan */}
      <rect x={330 - 46} y={505 - 11 - fill * 140} width={40} height={fill * 140} fill={RED_BLOOD} opacity={0.75} />
      <rect x={330 + 6} y={505 - 11 - fill * 140} width={40} height={fill * 140} fill={RED_BLOOD} opacity={0.75} />
      {Array.from({ length: 8 }).map((_, i) => {
        const t = ((frame + i * 9) % 60) / 60;
        const side = i % 2 ? 26 : -26;
        return frame > d ? <Drop key={i} x={330 + side} y={170 + t * 260} s={0.6} opacity={1 - t * 0.6} /> : null;
      })}
      <Arrow from={[640, 120]} to={[640, 400]} progress={arrow} color={PURPLE} />
      <Chip x={680} y={460} text="YERÇEKİMİ" delay={d + 15} />
    </g>
  );
};

// 4) Ortalama 800 mililitre
const BloodBottles: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const fill = useProgress(d, d + Math.round(durationInFrames * 0.45));
  const ml = Math.round(fill * 800);
  const h = 300;
  return (
    <g>
      <Paper />
      <g transform={place(300, 470)}>
        <path d={`M -110 ${-h - 10} L 110 ${-h - 10} L 100 0 L -100 0 Z`} fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <clipPath id="jugClip">
          <path d={`M -110 ${-h - 10} L 110 ${-h - 10} L 100 0 L -100 0 Z`} />
        </clipPath>
        <rect x={-120} y={-fill * h} width={240} height={fill * h} fill={RED_BLOOD} clipPath="url(#jugClip)" />
        <path d={`M -110 ${-h - 10} L 110 ${-h - 10} L 100 0 L -100 0 Z`} fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        {[200, 400, 600, 800].map((m) => (
          <g key={m}>
            <line x1={60} y1={(-m / 800) * h} x2={100} y2={(-m / 800) * h} stroke={OUTLINE} strokeWidth={4} />
            <text x={128} y={(-m / 800) * h + 9} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={INK}>
              {m}
            </text>
          </g>
        ))}
        <path d={`M -110 ${-h + 20} Q -170 ${-h + 40} -150 ${-h + 120}`} fill="none" stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
      </g>
      <text x={660} y={220} fontFamily={uiFont} fontWeight={800} fontSize={110} textAnchor="middle" fill={RED_BLOOD} stroke={OUTLINE} strokeWidth={5} paintOrder="stroke">
        {ml}
      </text>
      <text x={660} y={290} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={INK}>
        MİLİLİTRE
      </text>
      <Chip x={660} y={420} text="BACAKLARDA" dark delay={d + 40} />
    </g>
  );
};

// 5) Kalpten beyne giden kan azalıyor
const BrainLowFlow: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const low = useProgress(d, d + 30);
  const count = 6 - Math.round(low * 4);
  return (
    <g>
      <Paper />
      <Heart x={170} y={380} size={2.2} delay={2} />
      <path d="M 220 330 Q 300 160 560 170" fill="none" stroke="#f3b3bb" strokeWidth={34} strokeLinecap="round" />
      <path d="M 220 330 Q 300 160 560 170" fill="none" stroke={OUTLINE} strokeWidth={4} strokeDasharray="1 0" opacity={0.25} />
      {Array.from({ length: count }).map((_, i) => {
        const t = ((frame * (1 - low * 0.6) + i * (60 / count)) % 60) / 60;
        const x = (1 - t) * (1 - t) * 220 + 2 * (1 - t) * t * 300 + t * t * 560;
        const y = (1 - t) * (1 - t) * 330 + 2 * (1 - t) * t * 160 + t * t * 170;
        return <Drop key={i} x={x} y={y} s={0.7} />;
      })}
      <Brain x={680} y={190} scale={1} mood={low > 0.5 ? "confused" : "happy"} delay={4} />
      <Gauge x={680} y={470} value={0.75 - low * 0.55} scale={0.6} delay={8} />
      {low > 0.5 ? <QuestionMark x={810} y={90} size={70} delay={d + 20} /> : null}
      <Chip x={380} y={500} text="AZ KAN = AZ OKSİJEN" delay={d + 25} />
    </g>
  );
};

// 6) En dip an: 8–15 saniye (grafik)
const DipTimer: Visual = ({ durationInFrames }) => {
  const draw = useProgress(6, durationInFrames * 0.7);
  const x0 = 120;
  const y0 = 180;
  const pts: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60; // 0..30 sn
    const s = t * 30;
    const dip = s < 2 ? 0 : s < 11 ? -Math.sin(((s - 2) / 9) * (Math.PI / 2)) : -Math.max(0, 1 - (s - 11) / 14);
    pts.push([x0 + t * 660, y0 - dip * 210]);
  }
  const n = Math.max(2, Math.round(draw * pts.length));
  const d = pts.slice(0, n).map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const head = pts[n - 1];
  return (
    <g>
      <Paper />
      <rect x={x0 + (8 / 30) * 660} y={120} width={(7 / 30) * 660} height={330} fill="#ffd6dc" opacity={draw > 0.3 ? 1 : 0} />
      <line x1={x0} y1={90} x2={x0} y2={460} stroke={OUTLINE} strokeWidth={5} />
      <line x1={x0} y1={460} x2={800} y2={460} stroke={OUTLINE} strokeWidth={5} />
      <line x1={x0} y1={y0} x2={800} y2={y0} stroke="#9fd9cf" strokeWidth={4} strokeDasharray="14 10" />
      <path d={d} fill="none" stroke={RED_BLOOD} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={head[0]} cy={head[1]} r={12} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      {[0, 10, 20, 30].map((s) => (
        <text key={s} x={x0 + (s / 30) * 660} y={496} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={INK}>
          {s} SN
        </text>
      ))}
      <text x={x0 + 10} y={80} fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
        TANSİYON
      </text>
      <Chip x={640} y={90} text="EN DİP: 8–15 SN" dark delay={Math.round(durationInFrames * 0.45)} />
    </g>
  );
};

// 7) Vücut alarmda: kalp hızlanır, damarlar daralır
const BodyAlarm: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.2);
  const narrow = useProgress(d + 20, d + 60);
  const fast = 1 + 0.18 * Math.max(0, Math.sin(frame / 2)) ** 6;
  const ok = useAppear(Math.round(durationInFrames * 0.7));
  return (
    <g>
      <Paper />
      {/* Alarm lambası */}
      <g transform={place(450, 70)}>
        <rect x={-40} y={10} width={80} height={20} rx={6} fill={OUTLINE} />
        <path d="M -32 12 Q -32 -40 0 -40 Q 32 -40 32 12 Z" fill={frame % 16 < 8 ? RED : "#ff9aa6"} stroke={OUTLINE} strokeWidth={5} />
      </g>
      <g transform={place(220, 280, fast)}>
        <Heart x={0} y={0} size={2.4} beat={false} />
      </g>
      <Chip x={220} y={440} text="HIZLANIYOR" delay={d} />
      {/* Damar daralıyor */}
      {[0, 1].map((i) => {
        const hh = 70 - narrow * 34;
        const yy = 220 + i * 120;
        return (
          <g key={i}>
            <rect x={470} y={yy - hh / 2} width={340} height={hh} rx={hh / 2} fill="#f3b3bb" stroke={OUTLINE} strokeWidth={5} />
            <Arrow from={[640, yy - 80]} to={[640, yy - hh / 2 - 6]} progress={narrow} color={PURPLE} />
          </g>
        );
      })}
      <Chip x={640} y={440} text="DARALIYOR" dark delay={d + 20} />
      <g transform={place(450, 515, ok)}>
        <rect x={-150} y={-28} width={300} height={56} rx={28} fill={TEAL} stroke={OUTLINE} strokeWidth={4} />
        <text y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#fff">
          ~30 SN'DE DÜZELİR
        </text>
      </g>
    </g>
  );
};

// 8) Gençlerin yarısı
const HalfTeens: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const shirts = [BLUE, PURPLE, ORANGE, PINK, TEAL, "#f2b134"];
  const hairs = ["#4a2f1d", "#1f1f24", "#c9822f", "#7a3b1d", "#1f1f24", "#4a2f1d"];
  return (
    <g>
      <Paper />
      {shirts.map((sh, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const dizzy = i % 2 === 0 && frame >= d;
        const x = 210 + col * 240;
        const y = 250 + row * 205;
        return (
          <g key={i}>
            <Bust x={x} y={y} scale={0.52} shirt={sh} hair={hairs[i]} mood={dizzy ? "dizzy" : "happy"} delay={3 + i * 4} />
            {dizzy ? <Sparkles points={[[x - 50, y - 160], [x + 50, y - 165]]} /> : null}
          </g>
        );
      })}
      <Chip x={450} y={520} text="GENÇLERİN ~YARISI" dark delay={d + 12} />
    </g>
  );
};

// 9) İpucu: yavaş kalk, bacak kaslarını sık
const MuscleTense: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.3);
  const squeeze = frame > d ? 1 + 0.12 * Math.max(0, Math.sin(frame / 5)) : 1;
  const better = useProgress(d + 20, d + 50);
  return (
    <g>
      <Paper />
      <rect y={500} width={900} height={60} fill="#c8ebe5" stroke={OUTLINE} strokeWidth={5} />
      <Person x={250} y={500} scale={1.9} shirt={ORANGE} />
      {frame > d ? (
        <rect x={250 - 44 * squeeze} y={330} width={88 * squeeze} height={172} rx={30} fill="none" stroke={YELLOW} strokeWidth={8} strokeDasharray="18 12" />
      ) : null}
      {frame > d ? <Sparkles points={[[150, 360], [355, 400], [330, 300]]} /> : null}
      <Chip x={630} y={110} text="1. YAVAŞ KALK" delay={4} />
      <Chip x={630} y={190} text="2. KASLARINI SIK" dark delay={d} />
      <Gauge x={630} y={420} value={0.3 + better * 0.4} scale={0.9} delay={d + 10} label="DÜŞÜŞ AZALIR" />
    </g>
  );
};

// 10) Sık oluyorsa doktora danış
const DoctorCheck: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  return (
    <g>
      <Paper />
      <rect y={470} width={900} height={90} fill="#c8ebe5" stroke={OUTLINE} strokeWidth={5} />
      <Person x={280} y={470} scale={1.6} shirt="#ffffff" pants="#5d7a99" glasses presenting delay={2} />
      <NamePlate x={280} y={515} text="DOKTOR" delay={8} />
      <Heart x={520} y={170} size={1.4} delay={d * 0.5} />
      <Chip x={680} y={300} text="ÇOK SIK MI?" delay={d} />
      <Chip x={680} y={390} text="BAYILMA VAR MI?" dark delay={d + 14} />
    </g>
  );
};

// 11) Sende ne zaman?
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const w = useWave(40, 4);
  const items = ["YATAKTAN KALKINCA", "DERS ARASINDA", "UZUN OYUNDAN SONRA"];
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={0.9} mood="happy" shirt={ORANGE} />
      {items.map((c, i) => (
        <g key={i} transform={place(610, 100 + i * 120, useAppear(d + i * 8), i % 2 ? w : -w)}>
          <rect x={-230} y={-42} width={460} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={[BLUE, PINK, PURPLE][i]}>
            {c}?
          </text>
        </g>
      ))}
      <QuestionMark x={330} y={250} size={80} delay={d + 26} />
      <Chip x={610} y={500} text="YORUMLARA YAZ!" dark delay={d + 32} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  StandUpBlackout,
  NameTag,
  GravityPull,
  BloodBottles,
  BrainLowFlow,
  DipTimer,
  BodyAlarm,
  HalfTeens,
  MuscleTense,
  DoctorCheck,
  YourTurn,
};
