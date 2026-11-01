// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Unutma eğrisi ve aralıklı tekrar (2026-11-01-aksam)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  INK,
  NamePlate,
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
const PAPER = "#f3efff";
const PURPLE = "#6a4cf5";
const MINT = "#3fcf9f";
const GREY = "#c9c4d8";
const PINK = "#f59ab0";

const Paper: React.FC<{ night?: boolean }> = ({ night = false }) => (
  <g>
    <rect width={900} height={560} fill={night ? "#2e2a5c" : PAPER} />
    <rect y={470} width={900} height={90} fill={night ? "#463f86" : "#e4dcff"} />
    <line x1={0} y1={470} x2={900} y2={470} stroke={night ? "#5b52a8" : "#cbbcff"} strokeWidth={4} />
  </g>
);

// Omuzlarıyla birlikte baş; (x, y) omuzların alt ortası
const Head: React.FC<{
  x: number;
  y: number;
  scale?: number;
  talk?: boolean;
  sad?: boolean;
  shirt?: string;
  hair?: string;
  delay?: number;
}> = ({ x, y, scale = 1, talk = false, sad = false, shirt = MINT, hair = "#4a2f1d", delay = 0 }) => {
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
        {sad ? (
          <g stroke={OUTLINE} strokeWidth={4} strokeLinecap="round">
            <line x1={-36} y1={-30} x2={-14} y2={-24} />
            <line x1={36} y1={-30} x2={14} y2={-24} />
          </g>
        ) : null}
        <circle cx={-44} cy={20} r={10} fill={PINK} opacity={0.7} />
        <circle cx={44} cy={20} r={10} fill={PINK} opacity={0.7} />
        {talk ? (
          <ellipse cx={0} cy={32} rx={16} ry={4 + 14 * mouth} fill="#7a2335" stroke={OUTLINE} strokeWidth={4} />
        ) : sad ? (
          <path d="M -16 38 Q 0 26 16 38" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        ) : (
          <path d="M -14 28 Q 0 40 14 28" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};

// Küçük bilgi kartı
const Card: React.FC<{ x: number; y: number; text: string; scale?: number; color?: string; opacity?: number; rotate?: number }> = ({
  x,
  y,
  text,
  scale = 1,
  color = "#fff",
  opacity = 1,
  rotate = 0,
}) => (
  <g transform={place(x, y, scale, rotate)} opacity={opacity}>
    <rect x={-70} y={-28} width={140} height={56} rx={12} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <text x={0} y={10} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
      {text}
    </text>
  </g>
);

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

// Unutma eğrisi yolu: (x0,y0) sol üst, w genişlik, h yükseklik
const curvePath = (x0: number, y0: number, w: number, h: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const v = 0.22 + 0.78 * Math.pow(1 + 18 * t, -0.55);
    pts.push(`${(x0 + t * w).toFixed(1)} ${(y0 + (1 - v) * h).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
};

// Kendini çizen eğri
const DrawnCurve: React.FC<{ d: string; progress: number; color?: string; width?: number }> = ({ d, progress, color = RED, width = 9 }) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    pathLength={1}
    strokeDasharray="1 1"
    strokeDashoffset={1 - progress}
    opacity={progress > 0 ? 1 : 0}
  />
);

// Mini grafik kartı (iki deneyi karşılaştırmak için)
const MiniGraph: React.FC<{ x: number; y: number; label: string; progress: number; scale?: number; delay?: number }> = ({
  x,
  y,
  label,
  progress,
  scale = 1,
  delay = 0,
}) => {
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, scale * appear)}>
      <rect x={-160} y={-150} width={320} height={300} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <line x1={-120} y1={-110} x2={-120} y2={100} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <line x1={-120} y1={100} x2={130} y2={100} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <DrawnCurve d={curvePath(-115, -100, 240, 190)} progress={progress} width={8} />
      <g transform="translate(0 -185)">
        <rect x={-80} y={-28} width={160} height={56} rx={14} fill={INK} />
        <text x={0} y={11} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill="#fff">
          {label}
        </text>
      </g>
    </g>
  );
};

// ---------------------------------------------------------------------------

const CramNight: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const fly = useProgress(at(0.45), at(0.9));
  const words = ["TARİH", "FORMÜL", "ŞİİR", "KELİME", "TANIM"];
  const lamp = 0.8 + 0.2 * Math.abs(Math.sin(frame / 9));
  return (
    <g>
      <Paper night />
      {/* Pencere ve ay */}
      <g transform="translate(640 60)">
        <rect width={200} height={150} rx={10} fill="#1d1a3d" stroke={OUTLINE} strokeWidth={6} />
        <circle cx={130} cy={60} r={30} fill="#fff6c8" />
        <circle cx={145} cy={50} r={26} fill="#1d1a3d" />
        <line x1={100} y1={0} x2={100} y2={150} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={40} cy={110} r={4} fill="#fff" />
        <circle cx={60} cy={30} r={3} fill="#fff" />
      </g>
      {/* Lamba ışığı */}
      <path d="M 120 140 L 30 470 L 420 470 Z" fill={YELLOW} opacity={0.18 * lamp} />
      <Head x={280} y={500} sad={fly > 0.3} shirt={MINT} />
      <rect x={100} y={470} width={420} height={26} rx={8} fill="#a77a4d" stroke={OUTLINE} strokeWidth={5} />
      <Book x={280} y={500} scale={0.7} />
      {/* Kafadaki bilgiler: önce birikiyor, sonra uçup gidiyor */}
      {words.map((w, i) => {
        const a = useAppear(4 + i * 5);
        const start: [number, number] = [150 + (i % 3) * 130, 70 + Math.floor(i / 3) * 70];
        const f = Math.max(0, Math.min(1, fly * 1.6 - i * 0.15));
        const x = start[0] + f * (620 - start[0]) + f * 120;
        const y = start[1] + f * 260 - f * f * 120;
        return <Card key={i} x={x} y={y} text={w} scale={0.8 * a * (1 - 0.4 * f)} opacity={1 - f} rotate={f * 40} />;
      })}
      <g opacity={fly > 0.05 ? 1 : 0}>
        <Chip x={690} y={330} text="1 HAFTA SONRA" delay={at(0.45)} />
      </g>
      <QuestionMark x={700} y={430} size={56} delay={at(0.7)} color={YELLOW} />
    </g>
  );
};

const ForgettingCurve: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const draw = useProgress(at(0.12), at(0.7));
  const ticks: [number, string][] = [
    [0.04, "20 DK"],
    [0.12, "1 SAAT"],
    [0.4, "1 GÜN"],
    [0.95, "1 AY"],
  ];
  const X0 = 150;
  const W = 600;
  return (
    <g>
      <Paper />
      <rect x={70} y={30} width={760} height={480} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <line x1={X0} y1={70} x2={X0} y2={420} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <line x1={X0} y1={420} x2={X0 + W + 30} y2={420} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <text x={X0 + 14} y={70} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={PURPLE}>
        AKILDA KALAN
      </text>
      <text x={X0 + W + 30} y={400} textAnchor="end" fontFamily={uiFont} fontWeight={800} fontSize={24} fill={PURPLE}>
        ZAMAN →
      </text>
      <DrawnCurve d={curvePath(X0 + 4, 90, W, 320)} progress={draw} width={11} />
      {ticks.map(([t, label], i) => (
        <g key={label} opacity={draw >= t ? 1 : 0}>
          <line x1={X0 + t * W} y1={412} x2={X0 + t * W} y2={428} stroke={OUTLINE} strokeWidth={4} />
          <text
            x={X0 + t * W}
            y={i % 2 ? 488 : 456}
            textAnchor="middle"
            fontFamily={uiFont}
            fontWeight={800}
            fontSize={22}
            fill={INK}
          >
            {label}
          </text>
        </g>
      ))}
      <Chip x={420} y={170} text="EN HIZLI DÜŞÜŞ" delay={at(0.35)} />
      <Arrow from={[330, 190]} to={[215, 245]} progress={useProgress(at(0.4), at(0.55))} color={RED} />
      <Brain x={700} y={190} scale={0.6} mood="confused" delay={at(0.6)} />
    </g>
  );
};

const Ebbinghaus: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const syll = ["ZEP", "KUV", "LÖF", "DAB", "MİK", "TOS"];
  const page = Math.floor(frame / 20) % 3;
  return (
    <g>
      <Paper />
      <Person x={230} y={470} scale={1.45} mustache glasses shirt="#4b6fd1" pants="#2f3f63" hair="#6b4a2e" presenting delay={2} />
      <NamePlate x={230} y={515} text="HERMANN EBBINGHAUS" delay={10} />
      {/* Hece kartları */}
      {syll.map((s, i) => {
        const a = useAppear(at(0.18) + i * 4);
        const bob = Math.sin((frame + i * 11) / 8) * 4;
        return (
          <g key={s} transform={place(500 + (i % 3) * 140, 120 + Math.floor(i / 3) * 90 + bob, a)}>
            <rect x={-58} y={-32} width={116} height={64} rx={12} fill={i % 2 ? "#fff" : "#efe9ff"} stroke={OUTLINE} strokeWidth={4} />
            <text x={0} y={12} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={PURPLE}>
              {s}
            </text>
          </g>
        );
      })}
      <Chip x={640} y={330} text="ANLAMSIZ HECE" dark delay={at(0.4)} />
      {/* Takvim yaprakları */}
      <g transform={place(640, 430, useAppear(at(0.55)))}>
        {[2, 1, 0].map((k) => (
          <rect key={k} x={-70 + k * 10} y={-44 - k * 6} width={140} height={90} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        ))}
        <rect x={-70} y={-44} width={140} height={26} rx={8} fill={RED} stroke={OUTLINE} strokeWidth={4} />
        <text x={0} y={30} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={34} fill={INK}>
          {["OCAK", "MART", "MAYIS"][page]}
        </text>
      </g>
      <Chip x={800} y={500} text="AYLARCA" delay={at(0.65)} />
    </g>
  );
};

const Replication: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const p1 = useProgress(at(0.08), at(0.4));
  const p2 = useProgress(at(0.4), at(0.72));
  return (
    <g>
      <Paper />
      <MiniGraph x={230} y={300} label="1885" progress={p1} scale={1.05} delay={2} />
      <MiniGraph x={670} y={300} label="2015" progress={p2} scale={1.05} delay={at(0.35)} />
      <BigText x={450} y={300} text="=" size={110} color={YELLOW} delay={at(0.72)} />
      <Sparkles points={[[450, 180], [380, 420], [520, 430]]} />
    </g>
  );
};

const SpacedCalendar: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const days = ["PZT", "SAL", "ÇAR", "PER", "CUM", "CMT", "PAZ"];
  const study = [0, 1, 3, 6];
  return (
    <g>
      <Paper />
      <rect x={60} y={80} width={780} height={300} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <rect x={60} y={80} width={780} height={60} rx={24} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
      <rect x={63} y={118} width={774} height={22} fill={PURPLE} />
      {days.map((d, i) => {
        const x = 115 + i * 112;
        const k = study.indexOf(i);
        const pop = k >= 0 ? useAppear(at(0.2) + k * at(0.13)) : 0;
        return (
          <g key={d}>
            <text x={x} y={122} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={26} fill="#fff">
              {d}
            </text>
            <rect x={x - 46} y={165} width={92} height={180} rx={14} fill={k >= 0 ? "#efe9ff" : "#f7f6fb"} stroke="#cbbcff" strokeWidth={4} />
            {k >= 0 ? (
              <g transform={place(x, 250 + Math.sin((frame + i * 7) / 7) * 3, pop)}>
                <rect x={-30} y={-40} width={60} height={80} rx={8} fill={MINT} stroke={OUTLINE} strokeWidth={4} />
                <rect x={-30} y={-40} width={14} height={80} rx={6} fill="#2fa57e" stroke={OUTLINE} strokeWidth={4} />
                <path d="M -8 0 L 4 14 L 22 -14" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ) : null}
          </g>
        );
      })}
      <Chip x={450} y={440} text="GÜNLERE YAY" delay={at(0.7)} />
    </g>
  );
};

const RepCompare: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const left = useProgress(at(0.05), at(0.45));
  const right = useProgress(at(0.35), at(0.7));
  const dot = (key: string, x: number, y: number, on: boolean, color: string) => (
    <circle key={key} cx={x} cy={y} r={on ? 11 : 0} fill={color} stroke={OUTLINE} strokeWidth={3} />
  );
  // 68 tekrar: 9 sütun × 8 satır (son satır kısmi)
  const leftDots = Array.from({ length: 68 }).map((_, i) =>
    dot(`l${i}`, 110 + (i % 9) * 30, 150 + Math.floor(i / 9) * 30, i < left * 68, GREY),
  );
  // 38 tekrar: üç güne bölünmüş (13 + 13 + 12)
  const groups = [13, 13, 12];
  let n = 0;
  const rightDots: React.ReactNode[] = [];
  groups.forEach((g, gi) => {
    for (let j = 0; j < g; j++) {
      rightDots.push(dot(`r${n}`, 560 + gi * 105 + (j % 3) * 26, 150 + Math.floor(j / 3) * 30, n < right * 38, MINT));
      n++;
    }
  });
  return (
    <g>
      <Paper />
      <rect x={80} y={95} width={300} height={290} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={520} y={95} width={330} height={290} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {leftDots}
      {rightDots}
      {[0, 1].map((k) => (
        <line key={k} x1={640 + k * 105} y1={130} x2={640 + k * 105} y2={300} stroke="#cbbcff" strokeWidth={4} strokeDasharray="8 8" />
      ))}
      <BigText x={230} y={430} text="68" size={70} color="#a59fbd" delay={at(0.4)} />
      <BigText x={685} y={430} text="38" size={70} color={MINT} delay={at(0.68)} />
      <Chip x={230} y={45} text="TEK GÜN" dark delay={2} />
      <Chip x={685} y={45} text="3 GÜN" delay={at(0.35)} />
      <BigText x={450} y={240} text="=" size={100} color={YELLOW} delay={at(0.75)} />
      <Chip x={450} y={510} text="AYNI ETKİ" delay={at(0.8)} />
    </g>
  );
};

const MetaStack: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const grow = useProgress(4, at(0.55));
  const sheets = Math.round(grow * 14);
  const lens = useAppear(at(0.45));
  const wob = Math.sin(frame / 8) * 6;
  return (
    <g>
      <Paper />
      {/* Makale yığınları */}
      {[180, 330].map((cx, s) =>
        Array.from({ length: sheets }).map((_, i) => (
          <g key={`${s}-${i}`} transform={`translate(${cx + ((i * 17 + s * 5) % 11) - 5} ${460 - i * 22})`}>
            <rect x={-90} y={-18} width={180} height={22} rx={4} fill={i % 2 ? "#fff" : "#f4f0ff"} stroke={OUTLINE} strokeWidth={3} />
          </g>
        )),
      )}
      {/* Büyüteç */}
      <g transform={place(260 + wob, 150, lens, -20)}>
        <circle r={62} fill="#dff5ff" fillOpacity={0.7} stroke={OUTLINE} strokeWidth={8} />
        <rect x={56} y={-12} width={90} height={24} rx={10} fill="#a77a4d" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <BigText x={650} y={170} text="317" size={150} color={YELLOW} delay={at(0.3)} />
      <Chip x={650} y={290} text="DENEY" dark delay={at(0.38)} />
      <Chip x={650} y={400} text="ARALIK KAZANIR" delay={at(0.65)} />
      <Sparkles points={[[540, 90], [780, 110], [790, 250]]} />
    </g>
  );
};

const Illusion: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const g = useProgress(at(0.08), at(0.35));
  const bubble = useAppear(at(0.5));
  return (
    <g>
      <Paper />
      {/* Gerçek sonuç */}
      <rect x={50} y={40} width={380} height={420} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <Chip x={240} y={40} text="GERÇEK" dark delay={2} />
      <line x1={90} y1={380} x2={390} y2={380} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <rect x={110} y={380 - 230 * g} width={110} height={230 * g} rx={10} fill={MINT} stroke={OUTLINE} strokeWidth={4} />
      <rect x={260} y={380 - 130 * g} width={110} height={130 * g} rx={10} fill={GREY} stroke={OUTLINE} strokeWidth={4} />
      <text x={165} y={420} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={24} fill={INK}>
        ARALIKLI
      </text>
      <text x={315} y={420} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={24} fill={INK}>
        YIĞARAK
      </text>
      <BigText x={165} y={110} text="%78" size={52} color={MINT} delay={at(0.3)} />
      {/* Sanılan */}
      <Head x={680} y={560} scale={0.75} shirt={PURPLE} delay={at(0.42)} />
      <g transform={place(670, 170, bubble)}>
        <circle cx={-60} cy={160} r={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-40} cy={130} r={18} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <ellipse rx={190} ry={110} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={-30} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
          YIĞARAK ÇALIŞMAK
        </text>
        <text x={0} y={14} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
          DAHA İYİ!
        </text>
        <BigText x={0} y={66} text="%78" size={46} color={RED} delay={at(0.6)} />
      </g>
      <Chip x={470} y={500} text="SANILAN" dark delay={at(0.55)} />
      <QuestionMark x={850} y={420} size={60} delay={at(0.7)} />
    </g>
  );
};

const FluencyTrap: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const fade = useProgress(at(0.25), at(0.45));
  const right = useAppear(at(0.5));
  const lift = Math.abs(useWave(24, 1));
  return (
    <g>
      <Paper />
      {/* Sol: arka arkaya aynı kart, kolay ama siliniyor */}
      <rect x={40} y={40} width={390} height={400} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {[0, 1, 2, 3].map((i) => (
        <Card key={i} x={235} y={110 + i * 70 + Math.sin((frame + i * 5) / 5) * 2} text="TEKRAR" scale={1.1} color="#efe9ff" opacity={1 - fade * 0.75} />
      ))}
      <Chip x={235} y={400} text="KOLAY HİS" dark delay={4} />
      <g opacity={fade} stroke={RED} strokeWidth={14} strokeLinecap="round">
        <line x1={130} y1={110} x2={340} y2={330} />
        <line x1={340} y1={110} x2={130} y2={330} />
      </g>
      {/* Sağ: biraz unut, yeniden hatırla → güçlen */}
      <g opacity={right}>
        <rect x={470} y={40} width={390} height={400} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <g transform={`translate(0 ${-20 * lift})`}>
          <rect x={540} y={110} width={250} height={16} rx={8} fill="#8c869a" stroke={OUTLINE} strokeWidth={4} />
          <rect x={520} y={88} width={30} height={60} rx={8} fill={INK} />
          <rect x={780} y={88} width={30} height={60} rx={8} fill={INK} />
        </g>
        <Brain x={665} y={270} scale={0.85} mood="happy" />
      </g>
      <Chip x={665} y={400} text="UNUT · HATIRLA" delay={at(0.55)} />
      <Chip x={450} y={500} text="DAHA KALICI" delay={at(0.75)} />
    </g>
  );
};

const TipSchedule: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const stops: [number, string][] = [
    [110, "BUGÜN"],
    [230, "YARIN"],
    [430, "3 GÜN"],
    [780, "1 HAFTA"],
  ];
  const Y = 360;
  return (
    <g>
      <Paper />
      <line x1={70} y1={Y} x2={840} y2={Y} stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
      {stops.map(([x, label], i) => {
        const a = useAppear(at(0.05) + i * at(0.15));
        return (
          <g key={label}>
            <circle cx={x} cy={Y} r={22 * a} fill={i === 0 ? PURPLE : MINT} stroke={OUTLINE} strokeWidth={5} />
            <text x={x} y={Y + 62} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={28} fill={INK} opacity={a}>
              {label}
            </text>
          </g>
        );
      })}
      {/* Gittikçe büyüyen sıçrama yayları */}
      {stops.slice(1).map(([x], i) => {
        const x0 = stops[i][0];
        const p = useProgress(at(0.12) + i * at(0.15), at(0.25) + i * at(0.15));
        const hgt = 70 + i * 70;
        return (
          <path
            key={x}
            d={`M ${x0} ${Y - 26} Q ${(x0 + x) / 2} ${Y - 26 - hgt * 2} ${x} ${Y - 26}`}
            fill="none"
            stroke={RED}
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray="1 1"
            pathLength={1}
            strokeDashoffset={1 - p}
            opacity={p > 0 ? 1 : 0}
          />
        );
      })}
      <Chip x={250} y={80} text="ARALARI AÇ" delay={at(0.65)} />
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
        <rect x={-240} y={-100} width={480} height={200} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -170 96 L -210 150 L -120 96 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-165} y={90} width={44} height={12} fill="#fff" />
        <text x={0} y={-12} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={42} fill={PURPLE}>
          SON GECE Mİ?
        </text>
        <text x={0} y={46} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={42} fill={INK}>
          GÜNLERE Mİ?
        </text>
      </g>
      <g transform={place(610, 430, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={20} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  CramNight,
  ForgettingCurve,
  Ebbinghaus,
  Replication,
  SpacedCalendar,
  RepCompare,
  MetaStack,
  Illusion,
  FluencyTrap,
  TipSchedule,
  YourTurn,
};
