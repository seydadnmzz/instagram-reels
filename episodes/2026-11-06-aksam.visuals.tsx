// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: En iyi fikirler neden duşta gelir? Duş etkisi (2026-11-06-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import {
  Arrow,
  Brain,
  Chip,
  INK,
  NamePlate,
  Person,
  place,
  QuestionMark,
  RED,
  Sparkles,
  Table,
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
const SKIN = "#f2c79a";
const ORANGE = "#ff8a3d";
const DEEP = "#d9451c";
const TILE = "#d6f1f6";
const TILE_LINE = "#a9dbe6";
const WATER = "#5bc6e8";
const GREY = "#b9b2aa";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [90, 90, 36],
      [820, 70, 24],
      [800, 320, 16],
      [60, 330, 18],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#ffe0c7" />
    ))}
  </g>
);

const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; anchor?: "start" | "middle" | "end" }> = ({
  x,
  y,
  text,
  size = 26,
  color = INK,
  anchor = "middle",
}) => (
  <text x={x} y={y} fontFamily={uiFont} fontWeight={800} fontSize={size} textAnchor={anchor} fill={color}>
    {text}
  </text>
);

// Parlayan ampul; (0,0) ampulün merkezi
const Bulb: React.FC<{ x: number; y: number; scale?: number; delay?: number; on?: boolean }> = ({ x, y, scale = 1, delay = 0, on = true }) => {
  const appear = useAppear(delay);
  const glow = 0.5 + 0.5 * Math.abs(useWave(30, 1));
  return (
    <g transform={place(x, y, scale * appear)}>
      {on ? (
        <g>
          <circle r={95} fill={YELLOW} opacity={0.25 * glow} />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={0}
              y1={-78}
              x2={0}
              y2={-100}
              stroke={DEEP}
              strokeWidth={7}
              strokeLinecap="round"
              transform={`rotate(${i * 45 - 90 + 22.5})`}
            />
          ))}
        </g>
      ) : null}
      <path d="M -42 10 C -70 -30 -50 -70 0 -70 C 50 -70 70 -30 42 10 C 30 26 26 34 24 44 L -24 44 C -26 34 -30 26 -42 10 Z" fill={on ? YELLOW : "#eee"} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -14 40 L -8 6 L 0 20 L 8 6 L 14 40" fill="none" stroke={on ? DEEP : GREY} strokeWidth={4} strokeLinejoin="round" />
      <rect x={-26} y={44} width={52} height={14} rx={4} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-22} y={58} width={44} height={12} rx={4} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={5} />
      <path d="M -10 70 L 10 70 L 4 80 L -4 80 Z" fill={OUTLINE} />
      {on ? <path d="M -26 -40 Q -34 -20 -26 -4" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" /> : null}
    </g>
  );
};

// Düşen su damlaları (duş başlığından)
const Drops: React.FC<{ x: number; y: number; width: number; height: number; count?: number }> = ({ x, y, width, height, count = 9 }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const t = ((frame * 6 + i * 53) % height) / height;
        const dx = x + (i / (count - 1)) * width - width / 2 + Math.sin(i * 2.3) * 10;
        return (
          <path
            key={i}
            transform={place(dx + t * (i - count / 2) * 4, y + t * height, 1)}
            d="M 0 -12 C 6 -2 8 4 0 8 C -8 4 -6 -2 0 -12 Z"
            fill={WATER}
            stroke={OUTLINE}
            strokeWidth={2.5}
            opacity={1 - t * 0.5}
          />
        );
      })}
    </g>
  );
};

const ShowerHead: React.FC<{ x: number; y: number; scale?: number; pipe?: boolean }> = ({ x, y, scale = 1, pipe = true }) => (
  <g transform={place(x, y, scale)}>
    {pipe ? <path d="M 160 -200 L 160 -60 Q 160 -30 120 -30 L 40 -30" fill="none" stroke="#9aa3ad" strokeWidth={16} strokeLinecap="round" /> : null}
    {pipe ? <path d="M 160 -200 L 160 -60 Q 160 -30 120 -30 L 40 -30" fill="none" stroke={OUTLINE} strokeWidth={4} strokeOpacity={0.3} /> : null}
    <path d="M -50 0 Q 0 -50 50 0 Z" fill="#c4ccd4" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-54} y={-4} width={108} height={12} rx={6} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={4} />
  </g>
);

const TiledWall: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={TILE} />
    {Array.from({ length: 10 }).map((_, i) => (
      <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={560} stroke={TILE_LINE} strokeWidth={3} />
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={`h${i}`} x1={0} y1={i * 100} x2={900} y2={i * 100} stroke={TILE_LINE} strokeWidth={3} />
    ))}
  </g>
);

// Duştaki karakter (baş ve omuzlar); (0,0) boynun dibi. foam: köpük, eureka: gözler açık ve ağız "O"
const Showerer: React.FC<{ x: number; y: number; scale?: number; eureka?: boolean; scrub?: number }> = ({
  x,
  y,
  scale = 1,
  eureka = false,
  scrub = 0,
}) => (
  <g transform={place(x, y, scale)}>
    {/* omuzlar */}
    <path d="M -150 140 Q -150 30 -60 20 L 60 20 Q 150 30 150 140 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
    <rect x={-30} y={-20} width={60} height={50} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
    {/* kafa */}
    <circle cx={0} cy={-90} r={80} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
    {/* köpük */}
    <g transform={`translate(${scrub * 8} 0)`}>
      {[
        [-60, -150, 30],
        [-20, -170, 36],
        [30, -168, 34],
        [68, -140, 28],
        [-84, -112, 22],
        [86, -104, 20],
        [0, -140, 26],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      ))}
      <circle cx={-110} cy={-190} r={12} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
      <circle cx={110} cy={-180} r={9} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
    </g>
    {eureka ? (
      <g>
        <circle cx={-30} cy={-80} r={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={30} cy={-80} r={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-28} cy={-78} r={7} fill={OUTLINE} />
        <circle cx={32} cy={-78} r={7} fill={OUTLINE} />
        <ellipse cx={0} cy={-36} rx={14} ry={17} fill="#8a2430" stroke={OUTLINE} strokeWidth={4} />
      </g>
    ) : (
      <g>
        <path d="M -44 -80 Q -30 -70 -16 -80 M 16 -80 Q 30 -70 44 -80" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <path d="M -16 -44 Q 0 -32 16 -44" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      </g>
    )}
    <circle cx={-52} cy={-56} r={10} fill="#f59a8a" opacity={0.6} />
    <circle cx={52} cy={-56} r={10} fill="#f59a8a" opacity={0.6} />
  </g>
);

// 1) Duşta saçını köpürtürken fikir geliyor
const ShowerIdea: Visual = () => {
  const frame = useCurrentFrame();
  const scrub = Math.sin(frame / 3) * (frame < 45 ? 1 : 0);
  const eureka = frame >= 45;
  const shake = eureka ? Math.sin(frame / 2) * interpolate(frame, [45, 60], [6, 0], clamp) : 0;
  return (
    <g>
      <TiledWall />
      <ShowerHead x={330} y={70} />
      <Drops x={330} y={90} width={90} height={300} />
      <g transform={`translate(${shake} 0)`}>
        <Showerer x={330} y={410} scale={0.95} eureka={eureka} scrub={scrub} />
      </g>
      {/* perde */}
      <rect x={0} y={0} width={900} height={22} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={4} />
      <path d="M 40 22 Q 70 280 40 560 L 0 560 L 0 22 Z" fill={ORANGE} stroke={OUTLINE} strokeWidth={5} />
      <Bulb x={660} y={200} scale={1.25} delay={45} />
      <Chip x={660} y={420} text="BAM!" dark delay={52} />
      {eureka ? <Sparkles points={[[560, 90], [780, 110], [800, 300], [530, 300]]} /> : null}
    </g>
  );
};

// 2) Adı: duş etkisi — masada değil, duşta
const NameCard: Visual = () => {
  const card = useAppear(4);
  const pulse = 1 + useWave(24, 0.06);
  return (
    <g>
      <Paper />
      <g transform={place(450, 175, card)}>
        <rect x={-320} y={-110} width={640} height={220} rx={30} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Label x={0} y={-30} text="BUNUN ADI" size={34} color={DEEP} />
        <Label x={0} y={52} text="DUŞ ETKİSİ" size={78} />
      </g>
      {/* masa */}
      <g opacity={useAppear(26)}>
        <Table x={230} floorY={490} width={220}>
          <rect x={-60} y={-18} width={80} height={18} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
          <rect x={30} y={-40} width={14} height={40} fill={RED} stroke={OUTLINE} strokeWidth={3} />
        </Table>
        <Bulb x={230} y={355} scale={0.5} on={false} />
        <Label x={230} y={545} text="MASADA?" size={28} color="#7a6f66" />
      </g>
      {/* duş */}
      <g opacity={useAppear(40)}>
        <ShowerHead x={650} y={330} scale={0.6} pipe={false} />
        <Drops x={650} y={345} width={60} height={150} count={6} />
        <g transform={place(650, 380, pulse)}>
          <Bulb x={70} y={0} scale={0.55} delay={44} />
        </g>
        <Label x={650} y={545} text="DUŞTA!" size={30} color={DEEP} />
      </g>
    </g>
  );
};

// 3) Odaklanınca zihin aynı yollarda dönüyor
const FocusStuck: Visual = () => {
  const frame = useCurrentFrame();
  const a = (frame / 30) * Math.PI * 2 * 0.6;
  const ring = useAppear(10);
  return (
    <g>
      <Paper />
      <g transform={place(450, 270, ring)}>
        <ellipse cx={0} cy={0} rx={250} ry={170} fill="none" stroke={DEEP} strokeWidth={8} strokeDasharray="28 18" strokeDashoffset={-frame * 4} />
        <circle cx={Math.cos(a) * 250} cy={Math.sin(a) * 170} r={20} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={Math.cos(a - 0.5) * 250} cy={Math.sin(a - 0.5) * 170} r={12} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} opacity={0.5} />
      </g>
      <Brain x={450} y={270} scale={0.9} mood="confused" delay={0} />
      {/* dışarıda kalan sönük fikirler */}
      {[
        [90, 90, 20],
        [810, 100, 30],
        [80, 470, 40],
        [820, 460, 50],
      ].map(([x, y, d]) => (
        <g key={`${x}-${y}`} opacity={0.75}>
          <Bulb x={x} y={y} scale={0.38} on={false} delay={d} />
          <g opacity={useProgress(d + 10, d + 18)}>
            <path d={`M ${x - 24} ${y - 30} L ${x + 24} ${y + 18} M ${x + 24} ${y - 30} L ${x - 24} ${y + 18}`} stroke={RED} strokeWidth={8} strokeLinecap="round" />
          </g>
        </g>
      ))}
      <Chip x={450} y={510} text="HEP AYNI YOLLAR" dark delay={20} />
    </g>
  );
};

// 4) Duşta zihin serbestçe geziniyor, uzak fikirler bağlanıyor
const WanderMind: Visual = () => {
  const nodes: [number, number][] = [
    [120, 110],
    [300, 70],
    [770, 90],
    [820, 300],
    [640, 470],
    [140, 420],
    [470, 120],
  ];
  const links: [number, number][] = [
    [0, 3],
    [1, 4],
    [5, 2],
    [6, 4],
    [0, 2],
  ];
  return (
    <g>
      <Paper />
      {links.map(([i, j], k) => {
        const p = useProgress(14 + k * 12, 30 + k * 12);
        const [x1, y1] = nodes[i];
        const [x2, y2] = nodes[j];
        return (
          <line
            key={k}
            x1={x1}
            y1={y1}
            x2={x1 + (x2 - x1) * p}
            y2={y1 + (y2 - y1) * p}
            stroke={ORANGE}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray="2 14"
            opacity={p > 0 ? 1 : 0}
          />
        );
      })}
      {nodes.map(([x, y], i) => {
        const s = useAppear(4 + i * 4);
        const bob = useWave(50 + i * 7, 6, i * 10);
        return (
          <g key={i} transform={place(x, y + bob, s)}>
            <circle r={26} fill={i % 2 ? YELLOW : "#2ee6d6"} stroke={OUTLINE} strokeWidth={5} />
            <circle r={8} fill="#fff" cx={-8} cy={-8} />
          </g>
        );
      })}
      <Brain x={450} y={300} scale={0.85} mood="happy" />
      <Sparkles points={[[560, 220], [340, 210], [450, 160]]} />
      <Chip x={450} y={510} text="UZAK FİKİRLER BAĞLANIYOR" dark delay={40} />
    </g>
  );
};

// Tuğla
const Brick: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const s = useAppear(delay);
  const tilt = useWave(60, 4);
  return (
    <g transform={place(x, y, scale * s, tilt)}>
      <path d="M -110 -30 L -70 -60 L 130 -60 L 90 -30 Z" fill="#e0805a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 90 -30 L 130 -60 L 130 0 L 90 30 Z" fill="#a8482c" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-110} y={-30} width={200} height={60} fill="#c95f3a" stroke={OUTLINE} strokeWidth={5} />
      {[-60, 0, 50].map((cx) => (
        <ellipse key={cx} cx={cx} cy={-45} rx={16} ry={7} fill="#a8482c" stroke={OUTLINE} strokeWidth={3} />
      ))}
    </g>
  );
};

// 5) Deney: bir eşyanın sıra dışı kullanımları
const UsesTask: Visual = () => (
  <g>
    <Paper />
    <Person x={150} y={480} shirt={ORANGE} glasses presenting delay={0} />
    <ThoughtBubble x={250} y={170} r={62} delay={10}>
      <QuestionMark x={0} y={4} size={80} color="#fff" />
    </ThoughtBubble>
    <Brick x={560} y={270} scale={1.05} delay={6} />
    <Chip x={520} y={110} text="KAPI TAKOZU" delay={26} />
    <Chip x={720} y={170} text="ÇEKİÇ" delay={36} />
    <Chip x={720} y={390} text="SAKSI" delay={46} />
    <Chip x={460} y={420} text="AĞIRLIK" delay={56} />
    <NamePlate x={560} y={515} text="SIRA DIŞI KULLANIMLAR" delay={14} />
  </g>
);

// Zamanlayıcı saat
const Clock: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const s = useAppear(delay);
  return (
    <g transform={place(x, y, scale * s)}>
      <rect x={-14} y={-78} width={28} height={16} rx={4} fill={DEEP} stroke={OUTLINE} strokeWidth={4} />
      <circle r={62} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <path d={`M 0 0 L 0 -52 A 52 52 0 ${frame * 4 > 180 ? 1 : 0} 1 ${52 * Math.sin(Math.min(frame * 4, 359) * Math.PI / 180)} ${-52 * Math.cos(Math.min(frame * 4, 359) * Math.PI / 180)} Z`} fill="#ffd9bf" />
      <line x1={0} y1={0} x2={0} y2={-46} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" transform={`rotate(${frame * 4})`} />
      <circle r={6} fill={OUTLINE} />
    </g>
  );
};

const GroupCard: React.FC<{ x: number; title: string; delay: number; children: React.ReactNode }> = ({ x, title, delay, children }) => {
  const s = useAppear(delay);
  return (
    <g transform={place(x, 360, s)}>
      <rect x={-125} y={-130} width={250} height={240} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {children}
      <rect x={-105} y={58} width={210} height={40} rx={12} fill={INK} />
      <Label x={0} y={87} text={title} size={24} color="#fff" />
    </g>
  );
};

// 6) 12 dakikalık mola: zor iş, basit iş, dinlenme
const FourGroups: Visual = () => {
  const frame = useCurrentFrame();
  const flick = Math.floor(frame / 8) % 3;
  return (
    <g>
      <Paper />
      <Clock x={330} y={110} scale={0.85} delay={0} />
      <Chip x={520} y={110} text="12 DK MOLA" dark delay={6} />
      <GroupCard x={160} title="ZOR İŞ" delay={14}>
        <Label x={0} y={-40} text={["7 3 9", "2 8 5", "6 1 4"][flick]} size={52} color={DEEP} />
        <path d="M -60 -100 Q -66 -86 -60 -80 Q -54 -86 -60 -100 Z M 70 -96 Q 64 -82 70 -76 Q 76 -82 70 -96 Z" fill={WATER} stroke={OUTLINE} strokeWidth={3} />
        <Label x={0} y={30} text="ÇOK DİKKAT" size={20} color="#7a6f66" />
      </GroupCard>
      <GroupCard x={450} title="BASİT İŞ" delay={26}>
        <circle cx={0} cy={-50} r={46} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <Label x={0} y={-32} text={["4", "7", "2"][flick]} size={52} />
        <Label x={0} y={30} text="TEK SAYI MI?" size={20} color="#7a6f66" />
      </GroupCard>
      <GroupCard x={740} title="DİNLENME" delay={38}>
        <path d="M -70 0 L -70 -50 Q -70 -70 -50 -70 L 50 -70 Q 70 -70 70 -50 L 70 0 Z" fill="#7fc8a9" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-80} y={-20} width={160} height={30} rx={10} fill="#5fae8c" stroke={OUTLINE} strokeWidth={5} />
        <text
          x={40 + ((frame % 40) / 40) * 20}
          y={-80 - ((frame % 40) / 40) * 30}
          fontFamily={uiFont}
          fontWeight={800}
          fontSize={32}
          fill={DEEP}
          opacity={1 - (frame % 40) / 40}
        >
          Z
        </text>
        <Label x={0} y={42} text="SADECE OTUR" size={20} color="#7a6f66" />
      </GroupCard>
    </g>
  );
};

// 7) Kazanan: basit iş
const Winner: Visual = () => {
  const grow = useProgress(10, 40);
  const bars: { x: number; h: number; label: string; color: string }[] = [
    { x: 220, h: 50, label: "ZOR İŞ", color: GREY },
    { x: 450, h: 270, label: "BASİT İŞ", color: ORANGE },
    { x: 680, h: 50, label: "DİNLENME", color: GREY },
  ];
  return (
    <g>
      <Paper />
      <Label x={450} y={60} text="YARATICILIK ARTIŞI" size={32} color={DEEP} />
      <line x1={90} y1={450} x2={810} y2={450} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {bars.map((b) => (
        <g key={b.label}>
          <rect x={b.x - 70} y={450 - b.h * grow} width={140} height={b.h * grow} rx={10} fill={b.color} stroke={OUTLINE} strokeWidth={5} />
          <Label x={b.x} y={500} text={b.label} size={28} />
        </g>
      ))}
      <Bulb x={450} y={110} scale={0.6} delay={42} />
      <Chip x={700} y={380} text="İŞE YARAMADI" dark delay={56} />
      <Sparkles points={[[370, 170], [530, 170], [560, 300]]} />
    </g>
  );
};

// 8) Ne çok sıkıcı ne çok zor: orta kıvam göstergesi
const Dial: Visual = () => {
  const frame = useCurrentFrame();
  const swing = interpolate(frame, [8, 30, 46, 60], [-80, 70, -20, 0], clamp);
  const wave = useWave(30, 3);
  const wobble = frame > 60 ? wave : 0;
  const cx = 450;
  const cy = 400;
  const seg = (a0: number, a1: number) => {
    const r = 260;
    const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy - r * Math.sin((a * Math.PI) / 180)];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a1);
    return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`;
  };
  return (
    <g>
      <Paper />
      <g transform={place(0, 0, 1)} opacity={useAppear(0)}>
        <path d={seg(180, 120)} fill="#8ecae6" stroke={OUTLINE} strokeWidth={5} />
        <path d={seg(120, 60)} fill="#7fd99a" stroke={OUTLINE} strokeWidth={5} />
        <path d={seg(60, 0)} fill="#ff7a6b" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={cx} cy={cy} r={90} fill={PAPER} stroke={OUTLINE} strokeWidth={5} />
        <rect x={150} y={398} width={600} height={30} fill={PAPER} />
      </g>
      <Label x={225} y={330} text="SIKICI" size={26} />
      <Label x={450} y={128} text="ORTA" size={30} />
      <Label x={675} y={330} text="ÇOK ZOR" size={26} />
      <g transform={`rotate(${swing + wobble} ${cx} ${cy})`}>
        <path d={`M ${cx - 14} ${cy} L ${cx} ${cy - 230} L ${cx + 14} ${cy} Z`} fill={INK} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <circle cx={cx} cy={cy} r={22} fill={DEEP} stroke={OUTLINE} strokeWidth={5} />
      <Chip x={450} y={490} text="TAM KIVAM" dark delay={56} />
      <Bulb x={760} y={130} scale={0.45} delay={60} />
    </g>
  );
};

// Bulaşık: tabak ve köpük
const Dishes: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const rub = useWave(16, 10);
  return (
    <g transform={place(x, y, 1)}>
      <rect x={-90} y={10} width={180} height={50} rx={10} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${rub})`}>
        <ellipse cx={0} cy={-20} rx={70} ry={70} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <ellipse cx={0} cy={-20} rx={44} ry={44} fill="none" stroke={TILE_LINE} strokeWidth={5} />
      </g>
      {[
        [-60, -70, 16],
        [56, -80, 12],
        [70, -30, 10],
        [-74, -10, 12],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}`} cx={cx} cy={cy} r={r} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
      ))}
      <rect x={20 + rub} y={-40} width={50} height={30} rx={8} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

// 9) Duş, yürüyüş, bulaşık
const Activities: Visual = () => {
  const c1 = useAppear(4);
  const c2 = useAppear(16);
  const c3 = useAppear(28);
  const Card: React.FC<{ x: number; s: number; title: string; children: React.ReactNode }> = ({ x, s, title, children }) => (
    <g transform={place(x, 270, s)}>
      <rect x={-130} y={-170} width={260} height={320} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <g>{children}</g>
      <Label x={0} y={130} text={title} size={30} color={DEEP} />
    </g>
  );
  return (
    <g>
      <Paper />
      <Card x={160} s={c1} title="DUŞ">
        <ShowerHead x={0} y={-80} scale={0.7} />
        <Drops x={0} y={-70} width={70} height={140} count={6} />
      </Card>
      <Card x={450} s={c2} title="YÜRÜYÜŞ">
        <g transform="translate(-450 -270)">
          <Person x={450} y={355} scale={0.85} shirt={ORANGE} walking />
        </g>
      </Card>
      <Card x={740} s={c3} title="BULAŞIK">
        <Dishes x={0} y={-10} />
      </Card>
      <Chip x={450} y={505} text="MEKANİZMA HÂLÂ ARAŞTIRILIYOR" delay={50} />
    </g>
  );
};

// 10) İpucu: önce düşün, sonra yürü
const Tip: Visual = () => {
  const arrow = useProgress(30, 48);
  return (
    <g>
      <Paper />
      <Chip x={220} y={60} text="1. DÜŞÜN" dark delay={4} />
      <Table x={220} floorY={470} width={200}>
        <rect x={-50} y={-16} width={90} height={16} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
      </Table>
      <Person x={130} y={470} shirt={ORANGE} glasses delay={6} />
      <ThoughtBubble x={240} y={190} r={56} delay={14}>
        <QuestionMark x={0} y={4} size={72} color="#fff" />
      </ThoughtBubble>
      <Arrow from={[370, 300]} to={[520, 300]} progress={arrow} color={DEEP} />
      <Chip x={680} y={60} text="2. YÜRÜ" dark delay={44} />
      <g opacity={useAppear(48)}>
        <Person x={600} y={470} shirt={ORANGE} glasses walking walkSpeed={1.2} delay={48} />
      </g>
      <Bulb x={720} y={210} scale={0.7} delay={70} />
      <line x1={480} y1={472} x2={880} y2={472} stroke="#d8b9a0" strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = () => {
  const card = useAppear(8);
  const pulse = 1 + useWave(24, 0.05);
  return (
    <g>
      <TiledWall />
      <ShowerHead x={170} y={150} scale={0.8} />
      <Drops x={170} y={165} width={80} height={250} count={8} />
      <Bulb x={170} y={470} scale={0.6} delay={4} />
      <g transform={place(600, 220, card)}>
        <rect x={-210} y={-170} width={420} height={330} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Chip x={0} y={-95} text="DUŞTA?" delay={14} />
        <Chip x={0} y={-5} text="YOLDA?" delay={20} />
        <Chip x={0} y={85} text="YATAKTA?" delay={26} />
      </g>
      <g transform={place(600, 480, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={30} />
      </g>
      <Sparkles points={[[860, 60], [380, 60], [860, 380]]} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  ShowerIdea,
  NameCard,
  FocusStuck,
  WanderMind,
  UsesTask,
  FourGroups,
  Winner,
  Dial,
  Activities,
  Tip,
  YourTurn,
};
