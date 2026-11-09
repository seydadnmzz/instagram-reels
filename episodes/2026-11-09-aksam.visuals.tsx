// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Durmuş saat yanılsaması / kronostaz (2026-11-09-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import {
  Arrow,
  Brain,
  Chip,
  NamePlate,
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
const WALL = "#e6dcff";
const SKIN = "#f2c79a";
const PURPLE = "#8b5cf6";
const LILAC = "#c4b5fd";
const TEAL = "#3fb4a0";
const BLUE = "#5b8def";
const ORANGE = "#f59e42";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Paper: React.FC<{ color?: string }> = ({ color = PAPER }) => <rect width={900} height={560} fill={color} />;

// Duvar saati. secondAngle: saniye ibresinin açısı (derece, 0 = yukarı)
const Clock: React.FC<{
  x: number;
  y: number;
  r?: number;
  secondAngle: number;
  frozen?: boolean;
  delay?: number;
  color?: string;
}> = ({ x, y, r = 110, secondAngle, frozen = false, delay = 0, color = PURPLE }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={r + 14} fill={color} stroke={OUTLINE} strokeWidth={6} />
      <circle r={r} fill={frozen ? "#dff4ff" : "#fff"} stroke={OUTLINE} strokeWidth={5} />
      {Array.from({ length: 12 }).map((_, i) => {
        const ang = (i * 30 * Math.PI) / 180;
        const big = i % 3 === 0;
        const r1 = r - (big ? 22 : 14);
        return (
          <line
            key={i}
            x1={Math.sin(ang) * r1}
            y1={-Math.cos(ang) * r1}
            x2={Math.sin(ang) * (r - 6)}
            y2={-Math.cos(ang) * (r - 6)}
            stroke={OUTLINE}
            strokeWidth={big ? 6 : 4}
            strokeLinecap="round"
          />
        );
      })}
      {/* Akrep ve yelkovan */}
      <line x1={0} y1={0} x2={r * 0.42} y2={-r * 0.2} stroke={OUTLINE} strokeWidth={9} strokeLinecap="round" />
      <line x1={0} y1={0} x2={-r * 0.1} y2={-r * 0.66} stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" />
      {/* Saniye ibresi */}
      <g transform={`rotate(${secondAngle})`}>
        <line x1={0} y1={r * 0.15} x2={0} y2={-r * 0.82} stroke={RED} strokeWidth={4} strokeLinecap="round" />
        <circle cy={-r * 0.6} r={6} fill={RED} />
      </g>
      <circle r={9} fill={RED} stroke={OUTLINE} strokeWidth={3} />
      {frozen ? (
        <g opacity={0.9}>
          {[
            [-r * 0.75, -r * 0.55],
            [r * 0.7, r * 0.5],
            [r * 0.65, -r * 0.65],
          ].map(([sx, sy], i) => (
            <Snowflake key={i} x={sx} y={sy} s={r / 110} />
          ))}
        </g>
      ) : null}
    </g>
  );
};

const Snowflake: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={place(x, y, s)} stroke="#4aa8e0" strokeWidth={4} strokeLinecap="round">
    <line x1={-14} y1={0} x2={14} y2={0} />
    <line x1={-7} y1={-12} x2={7} y2={12} />
    <line x1={-7} y1={12} x2={7} y2={-12} />
  </g>
);

// Kesik kesik ilerleyen saniye ibresi: her 30 karede bir tık. holdFrom..holdTo arasında tık atlanır.
const tickAngle = (frame: number, start = 0, extraHold = 0, holdAt = -1) => {
  let f = frame - start;
  if (holdAt >= 0 && f > holdAt) f = Math.max(holdAt, f - extraHold);
  const ticks = Math.floor(Math.max(0, f) / 30);
  return ticks * 6;
};

// Büyük göz; look: -1..1 göz bebeğinin yatay konumu, lookY dikey
const Eye: React.FC<{ x: number; y: number; scale?: number; look: number; lookY?: number; blur?: number; delay?: number }> = ({
  x,
  y,
  scale = 1,
  look,
  lookY = 0,
  blur = 0,
  delay = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -150 0 Q 0 -120 150 0 Q 0 120 -150 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={7} strokeLinejoin="round" />
      <g transform={`translate(${look * 70} ${lookY * 25})`}>
        {blur > 0.05
          ? [-1, -0.5, 0.5, 1].map((k) => (
              <circle key={k} cx={-k * blur * 40} r={42} fill={BLUE} opacity={0.18} />
            ))
          : null}
        <circle r={42} fill={BLUE} stroke={OUTLINE} strokeWidth={5} />
        <circle r={20} fill={OUTLINE} />
        <circle cx={-12} cy={-12} r={8} fill="#fff" />
      </g>
      <path d="M -150 0 Q 0 -120 150 0" fill="none" stroke={OUTLINE} strokeWidth={9} strokeLinecap="round" />
      {[-90, -45, 0, 45, 90].map((dx) => (
        <line key={dx} x1={dx} y1={-62 - (Math.abs(dx) < 50 ? 6 : 0)} x2={dx * 1.15} y2={-92} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      ))}
    </g>
  );
};

// Belden yukarı karakter; (0,0) gövdenin alt ortası, kafa merkezi y=-200.
// look: göz bebeklerinin yatay kayması (-1 sol, 1 sağ)
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  look?: number;
  surprised?: boolean;
  shirt?: string;
  hair?: string;
  delay?: number;
}> = ({ x, y, scale = 1, look = 0, surprised = false, shirt = TEAL, hair = "#4a2f1d", delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const blink = frame % 90 > 85 ? 0.15 : 1;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <g transform={`translate(0 ${-196 * (1 - blink)}) scale(1 ${blink})`}>
        <circle cx={-26} cy={-196} r={15} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={26} cy={-196} r={15} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-26 + look * 7} cy={-196 - Math.abs(look) * 3} r={7} fill={OUTLINE} />
        <circle cx={26 + look * 7} cy={-196 - Math.abs(look) * 3} r={7} fill={OUTLINE} />
      </g>
      {surprised ? (
        <ellipse cx={0} cy={-158} rx={12} ry={15} fill="#7a2e2e" stroke={OUTLINE} strokeWidth={5} />
      ) : (
        <path d="M -22 -164 Q 0 -150 22 -164" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      )}
      <path d="M -44 -226 Q -28 -236 -12 -228" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" transform={surprised ? "translate(0 -8)" : undefined} />
      <path d="M 12 -228 Q 28 -236 44 -226" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" transform={surprised ? "translate(0 -8)" : undefined} />
      <circle cx={-48} cy={-172} r={10} fill="#f59ab0" opacity={0.6} />
      <circle cx={48} cy={-172} r={10} fill="#f59ab0" opacity={0.6} />
    </g>
  );
};

// 1) Saate bir bakış: ibre bir an takılıyor
const ClockGlance: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const glance = Math.round(durationInFrames * 0.3);
  const look = interpolate(frame, [glance - 4, glance + 2], [-0.3, 1], clamp);
  // Bakıştan sonra ilk tık 25 kare gecikiyor
  const angle = tickAngle(frame, 0, 25, glance + 2);
  const frozenNow = frame > glance && frame < glance + 32;
  return (
    <g>
      <Paper color={WALL} />
      <rect y={440} width={900} height={120} fill="#b9a6e8" />
      <line x1={0} y1={440} x2={900} y2={440} stroke={OUTLINE} strokeWidth={5} />
      <Bust x={230} y={560} scale={1.05} look={look} surprised={frozenNow} delay={0} />
      <Clock x={640} y={210} r={120} secondAngle={angle} frozen={frozenNow} delay={4} />
      {/* Bakış çizgisi */}
      <Arrow from={[300, 330]} to={[500, 240]} progress={useProgress(glance - 6, glance)} color={PURPLE} />
      {frozenNow ? <Chip x={640} y={400} text="DONDU?!" delay={glance + 2} /> : null}
      {frame > glance + 34 ? <QuestionMark x={350} y={150} size={70} delay={glance + 34} /> : null}
    </g>
  );
};

// 2) Saat bozuk değil: kronostaz
const StoppedClock: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const shake = Math.sin(frame / 3) * 2;
  return (
    <g>
      <Paper />
      <Clock x={300 + shake} y={270} r={170} secondAngle={90} frozen delay={0} />
      <g transform={place(660, 180, useAppear(8))}>
        <rect x={-150} y={-46} width={300} height={92} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={16} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill={OUTLINE}>
          BOZUK?
        </text>
        <line x1={-120} y1={-30} x2={120} y2={30} stroke={RED} strokeWidth={10} strokeLinecap="round" opacity={useProgress(d - 8, d)} />
      </g>
      <Chip x={660} y={320} text="KRONOSTAZ" delay={d} />
      <NamePlate x={660} y={400} text="DURMUŞ SAAT YANILSAMASI" delay={d + 8} />
      <Sparkles points={[[540, 260], [800, 270], [780, 360]]} />
    </g>
  );
};

// 3) Göz saniyede ~3 kez sıçrar
const EyeJumps: Visual = () => {
  const frame = useCurrentFrame();
  const targets: [number, number][] = [
    [-1, -0.6],
    [0.9, -0.4],
    [0, 0.8],
  ];
  const step = Math.floor(frame / 10) % 3;
  const prev = (step + 2) % 3;
  const t = interpolate(frame % 10, [0, 2], [0, 1], clamp);
  const lx = targets[prev][0] + (targets[step][0] - targets[prev][0]) * t;
  const ly = targets[prev][1] + (targets[step][1] - targets[prev][1]) * t;
  const dotPos: [number, number][] = [
    [150, 110],
    [760, 130],
    [450, 500],
  ];
  return (
    <g>
      <Paper />
      {dotPos.map(([x, y], i) => (
        <g key={i} transform={place(x, y, useAppear(i * 4) * (step === i ? 1.25 : 1))}>
          <circle r={26} fill={step === i ? YELLOW : LILAC} stroke={OUTLINE} strokeWidth={5} />
        </g>
      ))}
      <Eye x={450} y={280} scale={1.25} look={lx} lookY={ly} blur={t < 1 ? 1 - t : 0} delay={0} />
      <g transform={place(770, 420, useAppear(14))}>
        <rect x={-110} y={-50} width={220} height={100} rx={20} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={16} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill="#fff">
          3 / SN
        </text>
      </g>
      <Chip x={150} y={430} text="ZIP!" delay={18} />
    </g>
  );
};

// Küçük kare: içinde saat görüntüsü (bulanık ya da net)
const Frame: React.FC<{ x: number; y: number; kind: "clock" | "room" | "blur" | "gap"; delay?: number; label?: string }> = ({
  x,
  y,
  kind,
  delay = 0,
  label,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-95} y={-80} width={190} height={160} rx={14} fill={kind === "gap" ? "#2f2a44" : "#fff"} stroke={OUTLINE} strokeWidth={5} />
      {kind === "clock" ? (
        <g>
          <circle r={52} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <line x1={0} y1={0} x2={0} y2={-40} stroke={RED} strokeWidth={4} strokeLinecap="round" />
          <circle r={6} fill={RED} />
        </g>
      ) : null}
      {kind === "room" ? (
        <g>
          <rect x={-60} y={-40} width={70} height={60} fill="#9fd3f2" stroke={OUTLINE} strokeWidth={4} />
          <rect x={25} y={-10} width={40} height={60} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
        </g>
      ) : null}
      {kind === "blur" ? (
        <g opacity={0.55}>
          {[-30, -15, 0, 15, 30].map((dx) => (
            <path key={dx} d={`M ${-70 + dx} ${-30} L ${50 + dx} ${-30} M ${-60 + dx} 0 L ${60 + dx} 0 M ${-50 + dx} 30 L ${70 + dx} 30`} stroke={PURPLE} strokeWidth={10} strokeLinecap="round" opacity={0.4} />
          ))}
        </g>
      ) : null}
      {kind === "gap" ? (
        <text x={0} y={22} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={70} fill="#fff">
          ?
        </text>
      ) : null}
      {label ? (
        <text x={0} y={118} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={28} fill={OUTLINE}>
          {label}
        </text>
      ) : null}
    </g>
  );
};

// 4) Sıçrama anında bulanıklık, beyin onu yok sayıyor
const BlurGap: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const cross = useProgress(d, d + 10);
  return (
    <g>
      <Paper />
      <Frame x={150} y={190} kind="room" label="ÖNCE" delay={0} />
      <Arrow from={[255, 190]} to={[335, 190]} progress={useProgress(6, 14)} />
      <g>
        <Frame x={450} y={190} kind="blur" label="SIÇRAMA" delay={10} />
        <g opacity={cross}>
          <line x1={370} y1={120} x2={530} y2={260} stroke={RED} strokeWidth={14} strokeLinecap="round" />
          <line x1={530} y1={120} x2={370} y2={260} stroke={RED} strokeWidth={14} strokeLinecap="round" />
        </g>
      </g>
      <Arrow from={[555, 190]} to={[635, 190]} progress={useProgress(16, 24)} />
      <Frame x={750} y={190} kind="clock" label="SONRA" delay={20} />
      <Brain x={260} y={440} scale={0.75} delay={d - 6} mood="confused" />
      <Chip x={560} y={450} text="GÖRMEZDEN GEL!" delay={d + 4} />
    </g>
  );
};

// 5) Beyin boşluğu yeni görüntüyle dolduruyor
const Backfill: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const fill = useProgress(d, d + 18);
  const pulse = 1 + 0.04 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Frame x={150} y={190} kind="room" label="ÖNCE" delay={0} />
      <g>
        <Frame x={450} y={190} kind="gap" label="BOŞLUK" delay={4} />
        <g opacity={fill} transform={place(450, 190, 0.7 + fill * 0.3)}>
          <rect x={-95} y={-80} width={190} height={160} rx={14} fill="#fff" stroke={PURPLE} strokeWidth={7} strokeDasharray="14 10" />
          <circle r={52} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <line x1={0} y1={0} x2={0} y2={-40} stroke={RED} strokeWidth={4} strokeLinecap="round" />
          <circle r={6} fill={RED} />
        </g>
      </g>
      <Frame x={750} y={190} kind="clock" label="SONRA" delay={8} />
      {/* Geriye doğru kopyalama oku */}
      <path d="M 740 300 Q 600 380 470 300" fill="none" stroke={PURPLE} strokeWidth={8} strokeLinecap="round" strokeDasharray="600" strokeDashoffset={600 * (1 - useProgress(d - 14, d))} />
      <g transform={place(470, 300, useProgress(d - 2, d), 200)}>
        <path d="M 0 0 L -22 -14 L -22 14 Z" fill={PURPLE} />
      </g>
      <g transform={place(450, 470, useAppear(d + 10) * pulse)}>
        <Chip x={0} y={0} text="BAŞTAN BERİ SAAT!" />
      </g>
    </g>
  );
};

// Bilgisayar ekranında sayaç
const Monitor: React.FC<{ x: number; y: number; digit: string; delay?: number; scale?: number }> = ({ x, y, digit, delay = 0, scale = 1 }) => (
  <g transform={place(x, y, scale * useAppear(delay))}>
    <rect x={-150} y={-110} width={300} height={210} rx={18} fill="#3b3557" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-128} y={-90} width={256} height={170} rx={8} fill="#fff" />
    <text x={0} y={30} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={120} fill={PURPLE}>
      {digit}
    </text>
    <rect x={-20} y={100} width={40} height={40} fill="#3b3557" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-80} y={136} width={160} height={18} rx={8} fill="#3b3557" stroke={OUTLINE} strokeWidth={5} />
  </g>
);

// 6) Londra deneyi: gözünü sayaca çeviren kişi
const CounterTest: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const glance = Math.round(durationInFrames * 0.25);
  const look = interpolate(frame, [glance - 3, glance + 2], [-0.6, 1], clamp);
  const elapsed = frame - glance;
  const digit = elapsed < 0 ? "0" : String(1 + Math.floor(Math.max(0, elapsed - 10) / 30));
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={0.95} look={look} shirt={ORANGE} hair="#2c1d14" delay={0} />
      <Monitor x={640} y={240} digit={digit} delay={4} />
      <Arrow from={[260, 320]} to={[470, 250]} progress={useProgress(glance - 6, glance)} color={PURPLE} />
      <NamePlate x={640} y={460} text="LONDRA · 2001" delay={8} />
      {elapsed > 6 && elapsed < 40 ? <Chip x={640} y={80} text="İLK RAKAM UZUN!" /> : null}
    </g>
  );
};

// Zaman çubuğu
const Bar: React.FC<{ y: number; label: string; value: string; width: number; color: string; progress: number }> = ({
  y,
  label,
  value,
  width,
  color,
  progress,
}) => (
  <g>
    <text x={90} y={y - 22} fontFamily={uiFont} fontWeight={800} fontSize={32} fill={OUTLINE}>
      {label}
    </text>
    <rect x={90} y={y} width={720} height={70} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <rect x={95} y={y + 5} width={Math.max(0, (width - 10) * progress)} height={60} rx={12} fill={color} />
    <text x={110 + Math.max(0, (width - 10) * progress) - 20} y={y + 48} textAnchor="end" fontFamily={uiFont} fontWeight={800} fontSize={34} fill="#fff" opacity={progress > 0.6 ? 1 : 0}>
      {value}
    </text>
  </g>
);

// 7) 0,88 saniye ama 1 saniye gibi
const Stopwatch: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.4);
  const p1 = useProgress(4, 24);
  const p2 = useProgress(d, d + 20);
  return (
    <g>
      <Paper />
      <Bar y={140} label="EKRANDA KALDI" value="≈ 0,9 SN" width={634} color={BLUE} progress={p1} />
      <Bar y={320} label="SANA GELEN" value="1 SN" width={720} color={PURPLE} progress={p2} />
      <line x1={810} y1={110} x2={810} y2={420} stroke={RED} strokeWidth={5} strokeDasharray="12 10" opacity={useProgress(d, d + 6)} />
      <Chip x={450} y={490} text="BEYİN EKLEDİ!" delay={d + 22} />
    </g>
  );
};

// 8) Uzun sıçrama → uzun donma
const LongerJump: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.22);
  const s1 = useProgress(4, 12);
  const s2 = useProgress(d, d + 14);
  const iceShort = useProgress(14, 24);
  const iceLong = useProgress(d + 16, d + 34);
  return (
    <g>
      <Paper />
      {/* Kısa sıçrama */}
      <circle cx={110} cy={150} r={22} fill={LILAC} stroke={OUTLINE} strokeWidth={5} />
      <Arrow from={[140, 150]} to={[300, 150]} progress={s1} color={PURPLE} />
      <Clock x={380} y={150} r={60} secondAngle={0} frozen={iceShort > 0.5} delay={0} />
      <rect x={480} y={130} width={360} height={40} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <rect x={484} y={134} width={150 * iceShort} height={32} rx={10} fill="#7cc4ef" />
      <Chip x={660} y={80} text="KISA" delay={2} />
      {/* Uzun sıçrama */}
      <circle cx={110} cy={390} r={22} fill={LILAC} stroke={OUTLINE} strokeWidth={5} />
      <Arrow from={[140, 390]} to={[300, 390]} progress={s2} color={RED} />
      <Clock x={380} y={390} r={60} secondAngle={0} frozen={iceLong > 0.5} delay={d - 6} />
      <rect x={480} y={370} width={360} height={40} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <rect x={484} y={374} width={300 * iceLong} height={32} rx={10} fill="#4aa8e0" />
      <Chip x={450} y={500} text="UZUN = DAHA ÇOK DONMA" delay={d + 20} />
    </g>
  );
};

// 9) Her göz hareketinde oluyor, ama saat olunca fark ediliyor
const Everywhere: Visual = () => {
  const frame = useCurrentFrame();
  const spots: [number, number][] = [
    [160, 160],
    [450, 120],
    [720, 180],
    [300, 380],
    [620, 400],
  ];
  const idx = Math.floor(frame / 14) % spots.length;
  const [gx, gy] = spots[idx];
  const swing = useWave(40, 6);
  return (
    <g>
      <Paper color={WALL} />
      {/* Kitap */}
      <g transform={place(160, 160, useAppear(0))}>
        <rect x={-60} y={-40} width={120} height={80} rx={6} fill={ORANGE} stroke={OUTLINE} strokeWidth={5} />
        <line x1={0} y1={-40} x2={0} y2={40} stroke={OUTLINE} strokeWidth={4} />
      </g>
      {/* Bitki */}
      <g transform={place(450, 120, useAppear(3), swing)}>
        <path d="M 0 30 Q -40 -20 -10 -50 M 0 30 Q 40 -20 14 -54 M 0 30 L 0 -40" stroke="#2f9b5f" strokeWidth={10} fill="none" strokeLinecap="round" />
        <rect x={-30} y={26} width={60} height={40} rx={6} fill="#c27a3f" stroke={OUTLINE} strokeWidth={5} />
      </g>
      {/* Pencere */}
      <g transform={place(720, 180, useAppear(6))}>
        <rect x={-70} y={-55} width={140} height={110} fill="#9fd3f2" stroke={OUTLINE} strokeWidth={5} />
        <path d="M 0 -55 L 0 55 M -70 0 L 70 0" stroke={OUTLINE} strokeWidth={4} />
      </g>
      {/* Kupa */}
      <g transform={place(300, 380, useAppear(9))}>
        <rect x={-36} y={-40} width={72} height={80} rx={10} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
        <path d="M 36 -20 Q 66 -20 60 10 Q 54 30 36 24" fill="none" stroke={OUTLINE} strokeWidth={6} />
      </g>
      {/* Saat (vurgulu) */}
      <Clock x={620} y={400} r={70} secondAngle={idx === 4 ? 30 : 36} frozen={idx === 4} delay={12} />
      {/* Bakış halkası */}
      <circle cx={gx} cy={gy} r={92} fill="none" stroke={RED} strokeWidth={6} strokeDasharray="16 10" />
      <Chip x={620} y={520} text="SAAT = ÖLÇÜ" delay={16} />
      <Eye x={160} y={480} scale={0.35} look={(gx - 450) / 400} lookY={(gy - 280) / 200} delay={4} />
    </g>
  );
};

// Kafa (yandan değil, önden) iki kulakla
const Head: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const blink = frame % 90 > 85 ? 0.15 : 1;
  return (
    <g transform={place(x, y, scale * useAppear(delay))}>
      <ellipse cx={-118} cy={10} rx={26} ry={40} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <ellipse cx={118} cy={10} rx={26} ry={40} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <circle r={120} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -120 -10 Q -118 -140 0 -134 Q 118 -140 120 -12 Q 70 -70 0 -66 Q -70 -70 -120 -10 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <g transform={`translate(0 ${4 * (1 - blink)}) scale(1 ${blink})`}>
        <circle cx={-40} cy={4} r={10} fill={OUTLINE} />
        <circle cx={40} cy={4} r={10} fill={OUTLINE} />
      </g>
      <path d="M -26 56 Q 0 70 26 56" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

// Ses dalgaları
const Waves: React.FC<{ x: number; y: number; dir: 1 | -1; on: boolean; color: string }> = ({ x, y, dir, on, color }) => {
  const frame = useCurrentFrame();
  if (!on) return null;
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 8) % 24) / 24;
        const r = 20 + t * 60;
        return (
          <path
            key={i}
            d={`M ${x + dir * r * 0.5} ${y - r * 0.8} Q ${x + dir * r * 1.1} ${y} ${x + dir * r * 0.5} ${y + r * 0.8}`}
            fill="none"
            stroke={color}
            strokeWidth={7}
            strokeLinecap="round"
            opacity={1 - t}
          />
        );
      })}
    </g>
  );
};

// 10) Kulaklar arasında dikkat değişince ilk sessizlik uzun geliyor
const EarSwitch: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const sw = Math.round(durationInFrames * 0.4);
  const leftOn = frame < sw && frame % 30 < 14;
  const rightOn = frame > sw + 30 && (frame - sw) % 30 < 14;
  const silence = frame >= sw && frame <= sw + 30;
  return (
    <g>
      <Paper />
      <Head x={450} y={300} scale={1.05} delay={0} />
      <Waves x={300} y={310} dir={-1} on={leftOn} color={PURPLE} />
      <Waves x={600} y={310} dir={1} on={rightOn} color={ORANGE} />
      <Arrow from={[330, 120]} to={[570, 120]} progress={useProgress(sw - 10, sw)} color={RED} />
      <Chip x={450} y={60} text="DİKKAT GEÇTİ" delay={sw - 10} />
      {silence ? <Chip x={450} y={500} text="SESSİZLİK UZADI…" dark /> : null}
      {frame > sw + 30 ? <Chip x={450} y={500} text="KULAKTA DA VAR!" delay={sw + 30} /> : null}
    </g>
  );
};

// 11) Kapanış: nerede fark ediyorsun?
const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const angle = tickAngle(frame);
  return (
    <g>
      <Paper />
      <Clock x={220} y={230} r={120} secondAngle={angle} delay={0} />
      {/* Telefon */}
      <g transform={place(680, 230, useAppear(6), useWave(50, 4))}>
        <rect x={-80} y={-150} width={160} height={300} rx={26} fill="#3b3557" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-64} y={-124} width={128} height={240} rx={12} fill="#fff" />
        <text x={0} y={10} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill={PURPLE}>
          19:{String(15 + (Math.floor(frame / 30) % 40)).padStart(2, "0")}
        </text>
      </g>
      <QuestionMark x={450} y={170} size={110} delay={10} />
      <Chip x={450} y={470} text="YORUMLARA YAZ!" delay={16} />
      <Sparkles points={[[360, 80], [560, 330], [100, 420]]} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  ClockGlance,
  StoppedClock,
  EyeJumps,
  BlurGap,
  Backfill,
  CounterTest,
  Stopwatch,
  LongerJump,
  Everywhere,
  EarSwitch,
  YourTurn,
};
