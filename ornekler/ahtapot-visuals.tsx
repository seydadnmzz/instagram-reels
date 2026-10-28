// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Ahtapotun üç kalbi (örnek)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Chip,
  Heart,
  INK,
  place,
  QuestionMark,
  Sparkles,
  uiFont,
  useAppear,
  useProgress,
  useWave,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const SKIN = "#ef7f8b";

const Ocean: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <defs>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd6f2" />
          <stop offset="1" stopColor="#2f78a8" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={900} height={560} fill="url(#sea)" />
      <path d="M 0 500 Q 150 470 300 495 T 600 490 T 900 495 L 900 560 L 0 560 Z" fill="#e9cf8f" stroke={OUTLINE} strokeWidth={4} />
      {[80, 230, 520, 700, 840].map((x, i) => {
        const y = 520 - ((frame * (1.2 + i * 0.3) + i * 90) % 520);
        return <circle key={i} cx={x + Math.sin((frame + i * 20) / 15) * 8} cy={y} r={6 + (i % 3) * 3} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={3} />;
      })}
    </g>
  );
};

// Kafası kubbe, 8 dalgalı kolu olan ahtapot; (x, y) kolların başladığı nokta
const Octopus: React.FC<{ x: number; y: number; scale?: number; swim?: number; delay?: number; children?: React.ReactNode }> = ({
  x,
  y,
  scale = 1,
  swim = 0,
  delay = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, scale * appear)}>
      {Array.from({ length: 8 }).map((_, i) => {
        const sx = -60 + i * 17;
        const spread = (i - 3.5) * (22 + swim * -14);
        const w = Math.sin((frame + i * 9) / 9) * 14;
        const len = 120 + swim * 40;
        const ex = sx + spread * 1.6;
        const ey = len;
        return (
          <path
            key={i}
            d={`M ${sx} -10 C ${sx + spread * 0.4 + w} ${len * 0.35}, ${ex - w} ${len * 0.7}, ${ex} ${ey} q ${-spread * 0.15 - 10} 14 ${-spread * 0.1 - 18} -2`}
            fill="none"
            stroke={OUTLINE}
            strokeWidth={26}
            strokeLinecap="round"
          />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const sx = -60 + i * 17;
        const spread = (i - 3.5) * (22 + swim * -14);
        const w = Math.sin((frame + i * 9) / 9) * 14;
        const len = 120 + swim * 40;
        const ex = sx + spread * 1.6;
        return (
          <path
            key={i}
            d={`M ${sx} -10 C ${sx + spread * 0.4 + w} ${len * 0.35}, ${ex - w} ${len * 0.7}, ${ex} ${len} q ${-spread * 0.15 - 10} 14 ${-spread * 0.1 - 18} -2`}
            fill="none"
            stroke={SKIN}
            strokeWidth={18}
            strokeLinecap="round"
          />
        );
      })}
      <path d="M -95 0 C -110 -150 110 -150 95 0 Q 0 30 -95 0 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <ellipse cx={-50} cy={-95} rx={16} ry={10} fill="rgba(255,255,255,0.35)" />
      <circle cx={-32} cy={-30} r={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={32} cy={-30} r={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={-28} cy={-28} r={7} fill={OUTLINE} />
      <circle cx={36} cy={-28} r={7} fill={OUTLINE} />
      <path d="M -12 -4 Q 0 6 12 -4" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      {children}
    </g>
  );
};

const Drop: React.FC<{ x: number; y: number; color: string; scale?: number; delay?: number }> = ({ x, y, color, scale = 1, delay = 0 }) => {
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, scale * appear)}>
      <path d="M 0 -90 C 30 -40 60 -10 60 25 A 60 60 0 0 1 -60 25 C -60 -10 -30 -40 0 -90 Z" fill={color} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -30 10 Q -34 34 -18 50" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={8} strokeLinecap="round" />
    </g>
  );
};

const Gill: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const appear = useAppear(delay);
  const sway = useWave(40, 4);
  return (
    <g transform={place(x, y, appear, sway)}>
      {[-40, -20, 0, 20, 40].map((dy) => (
        <ellipse key={dy} cx={0} cy={dy} rx={46 - Math.abs(dy) * 0.5} ry={10} fill="#f4a6b0" stroke={OUTLINE} strokeWidth={4} />
      ))}
      <rect x={-4} y={-52} width={8} height={104} rx={4} fill="#c95f6e" />
    </g>
  );
};

const OctopusHearts: Visual = () => (
  <g>
    <Ocean />
    <Octopus x={450} y={330} scale={1.25}>
      <Heart x={-38} y={-85} size={0.42} delay={14} />
      <Heart x={38} y={-85} size={0.42} delay={22} />
      <Heart x={0} y={-45} size={0.5} delay={30} />
    </Octopus>
    <BigText x={760} y={140} text="×3" size={110} delay={36} />
    <Sparkles points={[[150, 120], [230, 300], [690, 300], [800, 420]]} />
  </g>
);

const GillHearts: Visual = () => {
  const arrow = useProgress(24, 44);
  return (
    <g>
      <rect width={900} height={560} fill="#f3ead8" />
      <g transform="translate(-20 0)">
        <Heart x={330} y={230} size={2} delay={2} />
        <g transform="translate(150 230) scale(1.7)">
          <Gill x={0} y={0} delay={16} />
        </g>
        <Arrow from={[255, 230]} to={[215, 230]} progress={arrow} color={INK} />
        <Chip x={330} y={400} text="KALP 1" delay={10} />
      </g>
      <g transform="translate(20 0)">
        <Heart x={570} y={230} size={2} delay={8} />
        <g transform="translate(750 230) scale(1.7)">
          <Gill x={0} y={0} delay={20} />
        </g>
        <Arrow from={[645, 230]} to={[685, 230]} progress={arrow} color={INK} />
        <Chip x={570} y={400} text="KALP 2" delay={14} />
      </g>
      <Chip x={450} y={495} text="SOLUNGAÇLARA" dark delay={40} />
    </g>
  );
};

const BodyHeart: Visual = () => {
  const p = useProgress(14, 40);
  const targets: [number, number][] = [
    [450, 70],
    [210, 200],
    [690, 200],
    [250, 450],
    [650, 450],
  ];
  return (
    <g>
      <rect width={900} height={560} fill="#f3ead8" />
      <g opacity={0.25}>
        <Octopus x={450} y={300} scale={1.35} />
      </g>
      {targets.map((t, i) => (
        <Arrow key={i} from={[450, 280]} to={t} progress={p} color="#c0392b" />
      ))}
      <Heart x={450} y={280} size={1.3} delay={2} />
      <Chip x={450} y={520} text="TÜM VÜCUT" delay={36} />
    </g>
  );
};

const HeartStops: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const stopAt = Math.round(durationInFrames * 0.45);
  const stopped = frame >= stopAt;
  const draw = useProgress(0, durationInFrames - 10);
  // EKG: önce atımlar, durma anından sonra düz çizgi
  const points: string[] = [];
  for (let x = 40; x <= 860; x += 10) {
    const beatZone = x < 40 + 820 * 0.45;
    const phase = (x - 40) % 120;
    const y = beatZone && phase > 50 && phase < 80 ? (phase < 60 ? 470 - (phase - 50) * 9 : phase < 70 ? 380 + (phase - 60) * 16 : 540 - (phase - 70) * 7) : 470;
    points.push(`${x},${y}`);
  }
  const visible = points.slice(0, Math.max(2, Math.round(points.length * draw)));
  return (
    <g>
      <Ocean />
      <Octopus x={250} y={200 - useWave(30, 10)} scale={0.95} swim={1} />
      <Heart x={640} y={200} size={1.2} beat={!stopped} color={stopped ? "#9a9a9a" : "#e03a3e"} />
      {stopped ? <Chip x={640} y={330} text="DURDU" dark delay={stopAt} /> : null}
      <rect x={30} y={400} width={840} height={140} rx={16} fill="rgba(10,25,40,0.75)" />
      <polyline points={visible.join(" ")} fill="none" stroke={stopped ? "#ff6b6b" : "#5df2a8"} strokeWidth={6} strokeLinejoin="round" />
    </g>
  );
};

const Crawling: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const x = 160 + (frame / durationInFrames) * 560;
  return (
    <g>
      <Ocean />
      <Octopus x={x} y={360} scale={0.85} />
      <Chip x={450} y={90} text="YÜZMEK YERİNE SÜRÜNMEK" delay={10} />
    </g>
  );
};

const BlueBlood: Visual = () => {
  const fade = useProgress(30, 45);
  return (
    <g>
      <rect width={900} height={560} fill="#f3ead8" />
      <g opacity={1 - fade * 0.6}>
        <Drop x={250} y={250} color="#d63a3f" delay={2} />
        <Chip x={250} y={420} text="DEMİR · İNSAN" dark delay={8} />
      </g>
      <Drop x={650} y={250} color="#2f6fd6" scale={1 + fade * 0.15} delay={14} />
      <Chip x={650} y={420} text="BAKIR · AHTAPOT" delay={20} />
      <text x={650} y={290} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={54} fill="#fff">
        Cu
      </text>
      <text x={250} y={290} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={54} fill="#fff" opacity={1 - fade * 0.6}>
        Fe
      </text>
    </g>
  );
};

const WhichOne: Visual = () => {
  const cards: { x: number; label: string; icon: React.ReactNode }[] = [
    { x: 170, label: "3 KALP", icon: <Heart x={0} y={-20} size={0.8} /> },
    { x: 450, label: "DURAN KALP", icon: <Heart x={0} y={-20} size={0.8} beat={false} color="#9a9a9a" /> },
    { x: 730, label: "MAVİ KAN", icon: <Drop x={0} y={-10} color="#2f6fd6" scale={0.6} /> },
  ];
  return (
    <g>
      <rect width={900} height={560} fill="#f3ead8" />
      {cards.map((c, i) => (
        <Card key={i} x={c.x} delay={6 + i * 8} label={c.label} index={i + 1}>
          {c.icon}
        </Card>
      ))}
      <QuestionMark x={450} y={70} size={100} delay={30} />
    </g>
  );
};

const Card: React.FC<{ x: number; delay: number; label: string; index: number; children: React.ReactNode }> = ({
  x,
  delay,
  label,
  index,
  children,
}) => {
  const appear = useAppear(delay);
  return (
    <g transform={place(x, 310, appear)}>
      <rect x={-120} y={-150} width={240} height={300} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-90} cy={-120} r={22} fill={INK} />
      <text x={-90} y={-112} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={24} fill="#fff">
        {index}
      </text>
      {children}
      <text x={0} y={110} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={28} fill={INK}>
        {label}
      </text>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  OctopusHearts,
  GillHearts,
  BodyHeart,
  HeartStops,
  Crawling,
  BlueBlood,
  WhichOne,
};
