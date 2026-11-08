// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Alarmdan hemen önce neden uyanıyoruz? (2026-11-08-aksam)
import { interpolate, useCurrentFrame } from "remotion";
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
  ThoughtBubble,
  uiFont,
  useAppear,
  useProgress,
  useWave,
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff1e6";
const DOT = "#ffe0c7";
const SKIN = "#f2c79a";
const ORANGE = "#ff7a3d";
const DEEP = "#d9451c";
const BLUE = "#5b8def";
const PURPLE = "#7a5cc9";
const GREEN = "#3fb46a";
const BLANKET = "#ff9f5a";
const BROWN = "#8a5a32";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [90, 90, 36],
      [820, 70, 24],
      [800, 300, 16],
      [60, 330, 18],
      [470, 40, 14],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={DOT} />
    ))}
  </g>
);

// Şafak vakti yatak odası
const DawnRoom: React.FC<{ windowX?: number; light?: number }> = ({ windowX = 620, light = 0 }) => (
  <g>
    <rect width={900} height={560} fill="#ffe3c7" />
    {Array.from({ length: 20 }).map((_, i) => (
      <rect key={i} x={i * 46 + 18} y={0} width={14} height={470} fill="#ffd6ae" opacity={0.6} />
    ))}
    <rect x={0} y={470} width={900} height={90} fill="#c98f55" stroke={OUTLINE} strokeWidth={4} />
    <g transform={`translate(${windowX} 60)`}>
      <rect x={0} y={0} width={190} height={140} fill="#ffb26b" stroke={BROWN} strokeWidth={8} />
      <rect x={4} y={4} width={182} height={70} fill="#7fa8e0" opacity={1 - light * 0.6} />
      <circle cx={95} cy={140 - 30 - light * 30} r={28} fill="#ffe066" />
      <path d="M 95 0 L 95 140 M 0 70 L 190 70" stroke={BROWN} strokeWidth={6} />
      <rect x={-10} y={140} width={210} height={10} fill={BROWN} />
    </g>
  </g>
);

// Masa saati: zil, ayak ve yüzünde yazı. ring: titreme açık mı
const AlarmClock: React.FC<{
  x: number;
  y: number;
  scale?: number;
  text?: string;
  ring?: boolean;
  color?: string;
  delay?: number;
}> = ({ x, y, scale = 1, text = "07:00", ring = false, color = RED, delay = 0 }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const shake = ring ? Math.sin(frame * 1.7) * 7 : 0;
  return (
    <g transform={place(x, y, scale * appear, shake)}>
      {/* ayaklar */}
      <path d="M -50 60 L -66 92 M 50 60 L 66 92" stroke={OUTLINE} strokeWidth={10} strokeLinecap="round" />
      {/* ziller */}
      <path d="M -88 -46 A 34 34 0 0 1 -30 -96 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      <path d="M 88 -46 A 34 34 0 0 0 30 -96 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-6} y={-104} width={12} height={20} fill={OUTLINE} />
      <circle cx={0} cy={0} r={88} fill={color} stroke={OUTLINE} strokeWidth={6} />
      <circle cx={0} cy={0} r={68} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {[0, 1].map((i) => (
        <rect key={i} x={-3} y={-62} width={6} height={12} fill={OUTLINE} transform={`rotate(${i * 180})`} />
      ))}
      <text x={0} y={13} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill={INK}>
        {text}
      </text>
      {ring ? (
        <g stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" opacity={0.8 + 0.2 * Math.sin(frame)}>
          <path d="M -120 -90 L -140 -110 M -128 -50 L -156 -56 M 120 -90 L 140 -110 M 128 -50 L 156 -56" />
        </g>
      ) : null}
    </g>
  );
};

// Yatakta yatan karakter; (0,0) yatağın orta tabanı. eyes: 0 kapalı → 1 açık
const Bed: React.FC<{ eyes?: number; sit?: number; scale?: number; x: number; y: number; dizzy?: boolean }> = ({
  eyes = 0,
  sit = 0,
  scale = 1,
  x,
  y,
  dizzy = false,
}) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, scale)}>
      <rect x={-300} y={-150} width={34} height={150} rx={8} fill={BROWN} stroke={OUTLINE} strokeWidth={5} />
      <rect x={266} y={-110} width={34} height={110} rx={8} fill={BROWN} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-280} y={-80} width={560} height={50} rx={10} fill="#fff7ee" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-262} y={-118} width={130} height={46} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <g transform={`translate(${24 * sit} ${-30 * sit}) rotate(${12 * sit} -190 -100)`}>
        <circle cx={-190} cy={-120} r={46} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path
          d="M -236 -126 Q -232 -176 -186 -170 Q -146 -168 -146 -136 Q -170 -150 -196 -146 Q -222 -150 -236 -126 Z"
          fill="#4a2f1d"
          stroke={OUTLINE}
          strokeWidth={4}
        />
        {eyes > 0.5 ? (
          <g>
            <circle cx={-205} cy={-118} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-170} cy={-118} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            {dizzy ? (
              <path
                d="M -210 -118 a 5 5 0 1 1 5 5 M -175 -118 a 5 5 0 1 1 5 5"
                fill="none"
                stroke={OUTLINE}
                strokeWidth={3}
                transform={`rotate(${frame * 12} -188 -118)`}
              />
            ) : (
              <g>
                <circle cx={-205} cy={-117} r={5} fill={OUTLINE} />
                <circle cx={-170} cy={-117} r={5} fill={OUTLINE} />
              </g>
            )}
            {dizzy ? (
              <path d="M -200 -92 Q -188 -100 -176 -90" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
            ) : (
              <ellipse cx={-188} cy={-92} rx={8} ry={9} fill="#8a2430" stroke={OUTLINE} strokeWidth={3} />
            )}
          </g>
        ) : (
          <g>
            <path
              d="M -214 -116 Q -205 -108 -196 -116 M -180 -116 Q -171 -108 -162 -116"
              fill="none"
              stroke={OUTLINE}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <path d="M -196 -94 Q -188 -88 -180 -94" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
          </g>
        )}
      </g>
      <path d="M -150 -40 L -150 -112 Q -40 -140 120 -118 Q 250 -110 262 -80 L 262 -40 Z" fill={BLANKET} stroke={OUTLINE} strokeWidth={5} />
      <path d="M -60 -126 L -60 -40 M 60 -124 L 60 -40 M 170 -116 L 170 -40" stroke="#e57f33" strokeWidth={4} />
      <rect x={-270} y={-30} width={20} height={30} fill={BROWN} stroke={OUTLINE} strokeWidth={4} />
      <rect x={250} y={-30} width={20} height={30} fill={BROWN} stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

const Zzz: React.FC<{ x: number; y: number; color?: string }> = ({ x, y, color = "#fff" }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 20) % 60) / 60;
        return (
          <text
            key={i}
            x={x + t * 50 + i * 8}
            y={y - t * 80}
            fontFamily={uiFont}
            fontWeight={800}
            fontSize={26 + i * 8}
            fill={color}
            stroke={OUTLINE}
            strokeWidth={3}
            paintOrder="stroke"
            opacity={1 - t}
          >
            Z
          </text>
        );
      })}
    </g>
  );
};

const Nightstand: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} 470)`}>
    <rect x={-70} y={-110} width={140} height={110} rx={6} fill="#b97a45" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-56} y={-90} width={112} height={34} rx={4} fill="#a0663a" stroke={OUTLINE} strokeWidth={3} />
    <circle cx={0} cy={-73} r={5} fill={YELLOW} stroke={OUTLINE} strokeWidth={2} />
  </g>
);

// 1) Alarm çalmadan gözler açılıyor
const AlarmBeat: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = Math.min(50, Math.round(durationInFrames * 0.3));
  const awake = frame >= at;
  const pop = useAppear(at + 4);
  const light = useProgress(0, durationInFrames);
  return (
    <g>
      <DawnRoom windowX={360} light={light} />
      <Bed x={330} y={500} eyes={awake ? 1 : 0} />
      {!awake ? <Zzz x={170} y={300} /> : null}
      <Nightstand x={770} />
      <AlarmClock x={770} y={260} scale={0.85} text={awake ? "06:58" : "06:57"} />
      <g transform={place(770, 120, useAppear(6))}>
        <rect x={-108} y={-26} width={216} height={52} rx={12} fill={INK} />
        <text x={0} y={10} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill="#fff">
          ALARM 07:00
        </text>
      </g>
      {awake ? (
        <g transform={place(150, 230, pop)}>
          <BigText x={0} y={0} text="!" size={130} color={YELLOW} />
        </g>
      ) : null}
    </g>
  );
};

// 2) Beynin derinlerindeki ana saat
const MasterClock: Visual = () => {
  const frame = useCurrentFrame();
  const head = useAppear(4);
  const clock = useAppear(18);
  const glow = 1 + useWave(24, 0.12);
  return (
    <g>
      <Paper />
      <g transform={place(380, 300, head)}>
        {/* yan profil kafa */}
        <path
          d="M -170 160 L -170 60 Q -230 -40 -170 -150 Q -90 -250 60 -220 Q 190 -190 200 -60 L 240 10 Q 248 26 226 30 L 210 32 L 214 80 Q 214 112 180 112 L 120 112 L 120 160 Z"
          fill={SKIN}
          stroke={OUTLINE}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <path d="M -170 60 Q -230 -40 -170 -150 Q -90 -250 60 -220 Q 190 -190 200 -80 Q 120 -140 20 -130 Q -90 -120 -150 -20 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={150} cy={-30} r={9} fill={OUTLINE} />
        {/* beyin silueti */}
        <path
          d="M -110 -20 C -130 -80 -60 -120 -10 -105 C 30 -130 110 -110 115 -60 C 150 -40 135 20 100 30 C 80 60 20 60 0 45 C -40 70 -110 50 -110 -20 Z"
          fill="#f59ac0"
          stroke={OUTLINE}
          strokeWidth={5}
          opacity={0.92}
        />
        {/* ana saat */}
        <g transform={place(10, -10, clock * glow)}>
          <circle r={36} fill={YELLOW} opacity={0.5} />
          <circle r={26} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <line x1={0} y1={0} x2={0} y2={-18} stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" transform={`rotate(${frame * 6})`} />
          <line x1={0} y1={0} x2={12} y2={0} stroke={RED} strokeWidth={4} strokeLinecap="round" transform={`rotate(${frame * 0.5})`} />
        </g>
      </g>
      <Arrow from={[690, 170]} to={[430, 285]} progress={useProgress(26, 42)} color={DEEP} />
      <NamePlate x={720} y={140} text="ANA SAAT" delay={30} />
      <Chip x={450} y={510} text="SUPRAKİAZMATİK ÇEKİRDEK" dark delay={44} />
    </g>
  );
};

const IconCard: React.FC<{ x: number; y: number; label: string; delay: number; children: React.ReactNode }> = ({
  x,
  y,
  label,
  delay,
  children,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-90} y={-80} width={180} height={160} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <g transform="translate(0 -14)">{children}</g>
      <text x={0} y={62} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK}>
        {label}
      </text>
    </g>
  );
};

const Moon: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <path transform={place(x, y, s)} d="M 8 -30 A 30 30 0 1 0 30 12 A 24 24 0 1 1 8 -30 Z" fill="#f6e7a1" stroke={OUTLINE} strokeWidth={4} />
);

const Thermo: React.FC<{ level: number }> = ({ level }) => (
  <g>
    <rect x={-14} y={-50} width={28} height={80} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-7} y={30 - 70 * level} width={14} height={70 * level} fill={RED} />
    <circle cx={0} cy={40} r={20} fill={RED} stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// 3) 24 saatlik ritim: güneş ve ay kadranda dönüyor
const Rhythm: Visual = () => {
  const frame = useCurrentFrame();
  const dial = useAppear(2);
  const rot = frame * 2.2;
  return (
    <g>
      <Paper />
      <g transform={place(250, 280, dial)}>
        <circle r={170} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -170 0 A 170 170 0 0 1 170 0 Z" fill="#ffe7a8" opacity={0.6} />
        <path d="M -170 0 A 170 170 0 0 0 170 0 Z" fill="#3e4c86" opacity={0.35} />
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x={-3} y={-166} width={6} height={i % 6 === 0 ? 22 : 12} fill={OUTLINE} transform={`rotate(${i * 15})`} />
        ))}
        <g transform={`rotate(${rot})`}>
          <circle cx={0} cy={-115} r={30} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
          <Moon x={0} y={115} s={0.9} />
          <line x1={0} y1={-80} x2={0} y2={80} stroke={OUTLINE} strokeWidth={6} />
        </g>
        <circle r={14} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
        <text x={0} y={-190} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={DEEP}>
          24 SAAT
        </text>
      </g>
      <IconCard x={600} y={110} label="UYKU" delay={18}>
        <Moon x={-8} y={0} s={1.1} />
      </IconCard>
      <IconCard x={790} y={280} label="ISI" delay={28}>
        <Thermo level={0.4 + 0.3 * (0.5 + 0.5 * Math.sin(frame / 15))} />
      </IconCard>
      <IconCard x={600} y={450} label="AÇLIK" delay={38}>
        <ellipse cx={0} cy={10} rx={46} ry={20} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <path d="M -60 -30 L -60 30 M 60 -30 L 60 30 M 54 -30 L 54 -10 M 66 -30 L 66 -10" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <circle cx={0} cy={0} r={14} fill={ORANGE} stroke={OUTLINE} strokeWidth={3} />
      </IconCard>
    </g>
  );
};

// Küçük uyuyan kafa (yastıkta)
const SleepHead: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={10} width={140} height={40} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
    <circle cx={0} cy={0} r={36} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
    <path d="M -36 -4 Q -32 -46 0 -40 Q 30 -40 34 -10 Q 14 -24 -6 -20 Q -26 -22 -36 -4 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={3} />
    <path d="M -18 4 Q -11 10 -4 4 M 6 4 Q 13 10 20 4" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
    <path d="M -46 40 L 46 40 L 60 70 L -60 70 Z" fill={BLANKET} stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// 4) Lübeck deneyi: 6'da mı 9'da mı?
const Experiment: Visual = () => {
  const left = useAppear(10);
  const right = useAppear(22);
  return (
    <g>
      <Paper />
      {[
        { x: 230, a: left, t: "06:00", label: "ERKEN", c: RED },
        { x: 670, a: right, t: "09:00", label: "GEÇ", c: BLUE },
      ].map((g) => (
        <g key={g.x} transform={place(g.x, 230, g.a)}>
          <rect x={-170} y={-170} width={340} height={300} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
          <SleepHead x={-60} y={40} />
          <g transform="translate(90 -60) scale(0.6)">
            <AlarmClock x={0} y={0} text={g.t} color={g.c} />
          </g>
          <text x={0} y={-130} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={g.c}>
            {g.label}
          </text>
        </g>
      ))}
      <QuestionMark x={450} y={230} size={100} delay={30} color={YELLOW} />
      <Person x={450} y={540} scale={0.62} glasses shirt="#fff" pants="#2f3f63" presenting delay={34} />
      <Chip x={170} y={470} text="15 GÖNÜLLÜ" delay={40} />
      <Chip x={730} y={470} text="3 GECE" delay={46} />
    </g>
  );
};

// 5) ACTH grafiği: uyanmadan bir saat önce yükseliş
const HormoneRise: Visual = () => {
  const axes = useAppear(2);
  const draw = useProgress(10, 50);
  const bracket = useAppear(52);
  const x0 = 110;
  const x1 = 760;
  const yBase = 420;
  // 03:00 → 06:00; 05:00 = x0 + (x1-x0)*2/3
  const xRise = x0 + ((x1 - x0) * 2) / 3;
  const path = `M ${x0} ${yBase - 40} L ${xRise} ${yBase - 46} Q ${xRise + 90} ${yBase - 70} ${x1} ${yBase - 220}`;
  return (
    <g>
      <Paper />
      <g opacity={axes}>
        <rect x={60} y={50} width={800} height={430} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <line x1={x0} y1={yBase} x2={x1 + 40} y2={yBase} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <line x1={x0} y1={yBase} x2={x0} y2={90} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        {["03:00", "04:00", "05:00", "06:00"].map((t, i) => (
          <text key={t} x={x0 + ((x1 - x0) * i) / 3} y={yBase + 40} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={INK}>
            {t}
          </text>
        ))}
        <text x={x0 + 20} y={110} fontFamily={uiFont} fontWeight={800} fontSize={34} fill={DEEP}>
          ACTH
        </text>
      </g>
      <path d={path} fill="none" stroke={DEEP} strokeWidth={10} strokeLinecap="round" strokeDasharray={1200} strokeDashoffset={1200 * (1 - draw)} />
      <line x1={x1} y1={yBase} x2={x1} y2={170} stroke={OUTLINE} strokeWidth={4} strokeDasharray="10 10" opacity={axes} />
      <g transform={place(xRise + (x1 - xRise) / 2, yBase - 14, bracket)}>
        <path d={`M ${-(x1 - xRise) / 2} 0 L ${-(x1 - xRise) / 2} -14 L ${(x1 - xRise) / 2} -14 L ${(x1 - xRise) / 2} 0`} fill="none" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Chip x={360} y={230} text="1 SAAT ÖNCE" delay={56} />
      <Arrow from={[440, 265]} to={[xRise - 10, yBase - 60]} progress={useProgress(60, 72)} color={DEEP} />
      <g transform={`translate(${x1} 112) scale(0.42)`}>
        <AlarmClock x={0} y={0} text="06:00" ring={draw > 0.95} delay={44} />
      </g>
    </g>
  );
};

// 6) Uyurken bile beklenti: rüya balonunda saat
const Expectation: Visual = () => {
  const frame = useCurrentFrame();
  const tick = Math.floor(frame / 10) % 2 === 0;
  return (
    <g>
      <rect width={900} height={560} fill="#3e4c86" />
      {Array.from({ length: 14 }).map((_, i) => (
        <circle key={i} cx={(i * 137) % 900} cy={(i * 71) % 260 + 20} r={3} fill="#f6e7a1" />
      ))}
      <rect x={0} y={470} width={900} height={90} fill="#5a4a7a" stroke={OUTLINE} strokeWidth={4} />
      <Bed x={360} y={500} scale={0.9} />
      <Zzz x={150} y={330} />
      <ThoughtBubble x={560} y={160} r={110} delay={10}>
        <g transform="scale(0.62)">
          <AlarmClock x={0} y={10} text="06:00" />
        </g>
      </ThoughtBubble>
      <g transform={place(800, 330, useAppear(30))}>
        <Brain x={0} y={0} scale={0.45} />
      </g>
      <text x={800} y={240} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={YELLOW} opacity={tick ? 1 : 0.4}>
        TİK TAK
      </text>
      <Chip x={600} y={515} text="BEKLENTİ = İÇ ALARM" delay={40} />
    </g>
  );
};

// Dikey gösterge çubuğu
const Gauge: React.FC<{ x: number; label: string; color: string; from: number; to: number; delay: number; up: boolean }> = ({
  x,
  label,
  color,
  from,
  to,
  delay,
  up,
}) => {
  const a = useAppear(delay);
  const p = useProgress(delay + 8, delay + 40);
  const level = from + (to - from) * p;
  return (
    <g transform={place(x, 290, a)}>
      <rect x={-110} y={-220} width={220} height={400} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-40} y={-170} width={80} height={250} rx={14} fill="#f1e6dc" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-34} y={74 - 238 * level} width={68} height={238 * level} rx={10} fill={color} />
      <text x={0} y={140} fontFamily={uiFont} fontWeight={800} fontSize={label.length > 8 ? 24 : 28} textAnchor="middle" fill={INK}>
        {label}
      </text>
      <text x={72} y={-120} fontFamily={uiFont} fontWeight={800} fontSize={56} textAnchor="middle" fill={up ? RED : BLUE} opacity={p}>
        {up ? "↑" : "↓"}
      </text>
    </g>
  );
};

// 7) Uyanmadan önce beden hazırlanıyor
const WarmUp: Visual = () => (
  <g>
    <Paper />
    <Gauge x={180} label="VÜCUT ISISI" color={RED} from={0.35} to={0.8} delay={4} up />
    <Gauge x={450} label="MELATONİN" color={PURPLE} from={0.85} to={0.2} delay={16} up={false} />
    <Gauge x={720} label="KORTİZOL" color={ORANGE} from={0.25} to={0.85} delay={28} up />
  </g>
);

// 8) Derin uykuda çalan alarm: sersemlik
const DeepSleep: Visual = ({ durationInFrames }) => {
  const draw = useProgress(4, 40);
  const ringAt = Math.min(46, Math.round(durationInFrames * 0.4));
  const frame = useCurrentFrame();
  const ring = frame >= ringAt;
  const dizzy = useAppear(ringAt + 8);
  // Hipnogram: yüzeysel → derin
  const pts = "M 60 140 L 140 140 L 160 210 L 230 210 L 250 300 L 400 300";
  return (
    <g>
      <Paper />
      <g>
        <rect x={30} y={60} width={420} height={330} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={60} y={110} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={INK}>
          HAFİF
        </text>
        <text x={60} y={360} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={PURPLE}>
          DERİN UYKU
        </text>
        <path d={pts} fill="none" stroke={PURPLE} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={700} strokeDashoffset={700 * (1 - draw)} />
        {ring ? <circle cx={400} cy={300} r={14 + 4 * Math.sin(frame / 3)} fill={RED} stroke={OUTLINE} strokeWidth={4} /> : null}
      </g>
      <Arrow from={[420, 290]} to={[560, 200]} progress={interpolate(frame, [ringAt, ringAt + 10], [0, 1], clamp)} color={RED} />
      <AlarmClock x={680} y={170} scale={0.9} text="07:00" ring={ring} delay={2} />
      <g transform={place(250, 470, 1)}>
        <Chip x={0} y={0} text="ALARM DERİN UYKUDA" dark delay={ringAt} />
      </g>
      <g transform={place(680, 420, dizzy)}>
        <SleepHead x={0} y={0} />
        <g transform={`rotate(${frame * 8} 0 -60)`}>
          {[0, 1, 2].map((i) => (
            <path key={i} transform={`rotate(${i * 120} 0 -60)`} d="M 0 -60 m 40 0 l 10 -8 l 2 12 z" fill={YELLOW} stroke={OUTLINE} strokeWidth={2} />
          ))}
        </g>
      </g>
      <Chip x={680} y={530} text="SERSEMLİK" delay={ringAt + 10} />
    </g>
  );
};

// 9) Her gün aynı saat: haftalık takvim
const Routine: Visual = () => {
  const days = ["PZT", "SAL", "ÇAR", "PER", "CUM", "CMT", "PAZ"];
  return (
    <g>
      <Paper />
      {days.map((d, i) => {
        const x = 90 + i * 120;
        return <DayCard key={d} x={x} day={d} delay={4 + i * 6} />;
      })}
      <Chip x={450} y={440} text="HER GÜN AYNI SAAT" dark delay={50} />
      <Sparkles points={[[120, 90], [800, 90], [460, 500]]} />
    </g>
  );
};

const DayCard: React.FC<{ x: number; day: string; delay: number }> = ({ x, day, delay }) => {
  const a = useAppear(delay);
  const check = useProgress(delay + 6, delay + 16);
  return (
    <g transform={place(x, 230, a)}>
      <rect x={-54} y={-100} width={108} height={200} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-54} y={-100} width={108} height={44} rx={14} fill={ORANGE} stroke={OUTLINE} strokeWidth={5} />
      <text x={0} y={-68} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill="#fff">
        {day}
      </text>
      <text x={0} y={-10} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK}>
        07:00
      </text>
      <path
        d="M -24 40 L -6 58 L 28 20"
        fill="none"
        stroke={GREEN}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={90}
        strokeDashoffset={90 * (1 - check)}
      />
    </g>
  );
};

// 10) Erken uyanıp yorgun: pil boş
const Tired: Visual = () => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 12) % 2 === 0;
  const bat = useAppear(14);
  return (
    <g>
      <DawnRoom windowX={640} light={0.5} />
      <Bed x={330} y={500} eyes={1} sit={0.6} dizzy />
      <g transform={place(720, 330, bat)}>
        <rect x={-90} y={-46} width={170} height={92} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={80} y={-18} width={16} height={36} rx={4} fill={OUTLINE} />
        <rect x={-78} y={-34} width={36} height={68} rx={6} fill={RED} opacity={blink ? 1 : 0.3} />
      </g>
      <Chip x={600} y={520} text="UYKU KALİTESİZ OLABİLİR" dark delay={28} />
    </g>
  );
};

// 11) Kapanış sorusu
const YourTurn: Visual = () => {
  const card = useAppear(8);
  const pulse = 1 + useWave(24, 0.05);
  return (
    <g>
      <Paper />
      <AlarmClock x={220} y={250} scale={1.1} text="06:5?" ring delay={2} />
      <g transform={place(620, 220, card)}>
        <rect x={-230} y={-170} width={460} height={340} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Chip x={0} y={-95} text="1 DAKİKA ÖNCE?" delay={14} />
        <Chip x={0} y={0} text="10 DAKİKA ÖNCE?" delay={20} />
        <Chip x={0} y={95} text="ALARM MI? HİÇ!" delay={26} />
      </g>
      <g transform={place(620, 480, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={30} />
      </g>
      <Sparkles points={[[860, 50], [400, 60], [100, 470]]} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  AlarmBeat,
  MasterClock,
  Rhythm,
  Experiment,
  HormoneRise,
  Expectation,
  WarmUp,
  DeepSleep,
  Routine,
  Tired,
  YourTurn,
};
