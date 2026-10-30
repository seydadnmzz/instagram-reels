// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Hafıza sarayı (loci yöntemi) (2026-10-30-ogle)
import { useCurrentFrame } from "remotion";
import {
  BigText,
  Bottle,
  Brain,
  Chip,
  INK,
  NamePlate,
  Person,
  place,
  QuestionMark,
  RED,
  Shelf,
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
const PURPLE = "#8b6cf2";
const WALL = "#fffaf0";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

// Ev: (x, y) gövdenin sol üst köşesi; 2×2 oda. Oda merkezleri ROOMS ile hesaplanır
const HW = 440;
const HH = 300;
const roomCenter = (x: number, y: number, i: number): [number, number] => [
  x + (i % 2 === 0 ? HW * 0.25 : HW * 0.75),
  y + (i < 2 ? HH * 0.25 : HH * 0.75),
];
const ROOM_NAMES = ["SALON", "MUTFAK", "YATAK", "BANYO"];
const ROOM_COLORS = ["#ffe3b3", "#d7f2e6", "#e6defd", "#d6ecff"];

const House: React.FC<{ x: number; y: number; delay?: number; labels?: boolean; children?: React.ReactNode }> = ({
  x,
  y,
  delay = 0,
  labels = true,
  children,
}) => {
  const appear = useAppear(delay);
  return (
    <g transform={`translate(${x + HW / 2} ${y + HH / 2}) scale(${appear}) translate(${-x - HW / 2} ${-y - HH / 2})`}>
      <path d={`M ${x - 30} ${y} L ${x + HW / 2} ${y - 120} L ${x + HW + 30} ${y} Z`} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={x} y={y} width={HW} height={HH} fill={WALL} stroke={OUTLINE} strokeWidth={6} />
      {[0, 1, 2, 3].map((i) => {
        const rx = x + (i % 2) * (HW / 2);
        const ry = y + Math.floor(i / 2) * (HH / 2);
        return <rect key={i} x={rx + 8} y={ry + 8} width={HW / 2 - 16} height={HH / 2 - 16} rx={8} fill={ROOM_COLORS[i]} />;
      })}
      <line x1={x + HW / 2} y1={y} x2={x + HW / 2} y2={y + HH} stroke={OUTLINE} strokeWidth={6} />
      <line x1={x} y1={y + HH / 2} x2={x + HW} y2={y + HH / 2} stroke={OUTLINE} strokeWidth={6} />
      {labels
        ? ROOM_NAMES.map((n, i) => {
            const [cx, cy] = roomCenter(x, y, i);
            return (
              <text key={n} x={cx} y={cy - HH * 0.25 + 34} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={20} fill="#6b6178">
                {n}
              </text>
            );
          })
        : null}
      {children}
    </g>
  );
};

// Hafıza nesneleri: süt, dev ekmek, yumurta, muz. (0,0) nesnenin ortası
const Bread: React.FC = () => (
  <g>
    <path d="M -50 20 L -50 -10 Q -50 -40 0 -40 Q 50 -40 50 -10 L 50 20 Z" fill="#e0a45a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -25 -30 L -15 -10 M 0 -32 L 8 -12 M 25 -30 L 32 -10" stroke="#a9692c" strokeWidth={5} strokeLinecap="round" />
  </g>
);
const Eggs: React.FC = () => (
  <g>
    {[-26, 0, 26].map((dx, i) => (
      <ellipse key={i} cx={dx} cy={i === 1 ? -8 : 4} rx={16} ry={21} fill="#fffdf4" stroke={OUTLINE} strokeWidth={4} />
    ))}
  </g>
);
const Banana: React.FC = () => (
  <path d="M -45 -20 Q -30 30 40 20 Q 50 16 46 8 Q -10 14 -30 -24 Z" fill="#ffd43b" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
);
const Milk: React.FC = () => (
  <g transform="translate(0 40) scale(0.85)">
    <Bottle x={0} y={0} color="#ffffff" label="SÜT" />
  </g>
);
const ITEMS = [<Bread key="b" />, <Milk key="m" />, <Banana key="n" />, <Eggs key="e" />];
const ITEM_NAMES = ["EKMEK", "SÜT", "MUZ", "YUMURTA"];

const Check: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={22} fill="#3fb47a" stroke={OUTLINE} strokeWidth={4} />
      <path d="M -10 0 L -2 9 L 12 -9" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

const ForgotList: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const fly = useProgress(at(0.15), at(0.45));
  const spin = fly * 220;
  return (
    <g>
      <Paper />
      <Shelf x={460} y={210} width={380} />
      <Shelf x={460} y={360} width={380} />
      <Bottle x={510} y={210} color="#ff9f9f" />
      <Bottle x={580} y={210} color="#9fd3ff" />
      <Bottle x={650} y={210} color="#b6f0a8" />
      <Bottle x={760} y={360} color="#ffd59f" />
      <Bottle x={690} y={360} color="#d7c4ff" />
      <rect x={0} y={500} width={900} height={60} fill="#ddd3fb" />
      <Person x={290} y={530} scale={1.25} shirt={PURPLE} facing="right" />
      {/* Uçup giden liste */}
      <g transform={place(400 - fly * 380, 300 - fly * 260, 1 - fly * 0.4, spin)} opacity={1 - fly * 0.6}>
        <rect x={-44} y={-58} width={88} height={116} rx={6} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-30} y={-38 + i * 24} width={60 - i * 8} height={6} fill="#9a9a9a" />
        ))}
      </g>
      <ThoughtBubble x={380} y={115} r={60} delay={at(0.45)}>
        <text x={0} y={22} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={60} fill={INK}>
          ?
        </text>
      </ThoughtBubble>
      <QuestionMark x={150} y={170} size={90} delay={at(0.55)} color={RED} />
    </g>
  );
};

const PalaceReveal: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  return (
    <g>
      <Paper />
      <House x={70} y={200} delay={0} />
      <Brain x={720} y={250} scale={0.9} delay={at(0.15)} />
      <Sparkles points={[[290, 50], [140, 120], [440, 120], [640, 120], [800, 140]]} />
      <Chip x={720} y={440} text="2000+ YIL" dark delay={at(0.45)} />
    </g>
  );
};

const PlaceItems: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const hx = 400;
  const hy = 200;
  return (
    <g>
      <Paper />
      <House x={hx} y={hy} labels={false} />
      {ITEMS.map((item, i) => {
        const p = useProgress(at(0.1 + i * 0.16), at(0.24 + i * 0.16));
        const [tx, ty] = roomCenter(hx, hy, i);
        const sx = 150;
        const sy = 130 + i * 100;
        const x = sx + (tx - sx) * p;
        const y = sy + (ty - sy) * p - Math.sin(p * Math.PI) * 80;
        const s = 0.8 + p * 0.5;
        return (
          <g key={i}>
            <text x={60} y={sy + 8} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={p > 0 ? "#b3abc4" : INK}>
              {ITEM_NAMES[i]}
            </text>
            <g transform={place(x, y + 10, s, p * 360 * (i % 2 ? -1 : 1) * (p < 1 ? 1 : 0))}>{item}</g>
          </g>
        );
      })}
      <Chip x={620} y={530} text="TUHAF RESİMLER" delay={at(0.75)} />
    </g>
  );
};

const WalkThrough: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const hx = 230;
  const hy = 200;
  const order = [0, 1, 3, 2];
  const seg = durationInFrames / 5;
  const t = Math.min(order.length - 1, Math.max(0, (frame - 6) / seg));
  const i0 = Math.floor(t);
  const i1 = Math.min(order.length - 1, i0 + 1);
  const k = t - i0;
  const [ax, ay] = roomCenter(hx, hy, order[i0]);
  const [bx, by] = roomCenter(hx, hy, order[i1]);
  const px = ax + (bx - ax) * k;
  const py = ay + (by - ay) * k;
  const bob = Math.abs(Math.sin(frame / 4)) * -5;
  return (
    <g>
      <Paper />
      <House x={hx} y={hy} labels={false}>
        {ITEMS.map((item, i) => {
          const [cx, cy] = roomCenter(hx, hy, i);
          return (
            <g key={i} transform={place(cx + 50, cy + 20, 0.75)}>
              {item}
            </g>
          );
        })}
      </House>
      {/* Zihinde gezen küçük sen */}
      <g transform={`translate(${px - 40} ${py + 60 + bob})`}>
        <Person x={0} y={0} scale={0.45} shirt={YELLOW} />
      </g>
      {order.map((room, n) => {
        const [cx, cy] = roomCenter(hx, hy, room);
        return <Check key={room} x={cx + 80} y={cy - 40} delay={Math.round(6 + n * seg + seg * 0.4)} />;
      })}
      <Chip x={450} y={40} text="SIRAYLA" dark delay={4} />
    </g>
  );
};

const Banquet: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const fall = useProgress(at(0.2), at(0.4));
  const shake = fall > 0 && fall < 1 ? Math.sin(frame * 2) * 4 : 0;
  const guests = ["#ef6b6b", "#5b8def", "#7fc36b", "#f6c343", "#c38bf2"];
  return (
    <g>
      <Paper />
      <g transform={`translate(${shake} 0)`}>
        {/* Salon */}
        <rect x={40} y={110} width={480} height={400} fill="#efe6d4" stroke={OUTLINE} strokeWidth={6} />
        {[100, 220, 340, 460].map((cx) => (
          <rect key={cx} x={cx - 14} y={110} width={28} height={400} fill="#e2d4b8" stroke={OUTLINE} strokeWidth={4} />
        ))}
        <rect x={90} y={380} width={380} height={30} rx={8} fill="#8a5a32" stroke={OUTLINE} strokeWidth={5} />
        {guests.map((c, i) => (
          <g key={i} opacity={1 - fall * 0.85}>
            <circle cx={120 + i * 80} cy={350} r={24} fill="#f2c79a" stroke={OUTLINE} strokeWidth={4} />
            <rect x={100 + i * 80} y={372} width={40} height={14} fill={c} stroke={OUTLINE} strokeWidth={3} />
          </g>
        ))}
        {/* Çöken tavan kirişleri */}
        <g transform={`translate(0 ${fall * 230}) rotate(${fall * 14} 160 120)`}>
          <rect x={50} y={100} width={240} height={30} fill="#7a5233" stroke={OUTLINE} strokeWidth={5} />
        </g>
        <g transform={`translate(0 ${fall * 210}) rotate(${-fall * 12} 400 120)`}>
          <rect x={280} y={100} width={240} height={30} fill="#7a5233" stroke={OUTLINE} strokeWidth={5} />
        </g>
      </g>
      <Person x={700} y={530} scale={1.1} shirt="#f2f2f2" hair="#9a9a9a" facing="left" delay={2} />
      <NamePlate x={600} y={480} text="SİMONİDES" delay={at(0.1)} />
      <ThoughtBubble x={740} y={140} r={95} delay={at(0.5)}>
        <rect x={-70} y={4} width={140} height={14} rx={4} fill="#8a5a32" />
        {guests.map((c, i) => (
          <circle key={i} cx={-60 + i * 30} cy={-14} r={11} fill={c} stroke={OUTLINE} strokeWidth={3} />
        ))}
        <text x={0} y={-40} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={20} fill={INK}>
          KİM NEREDE?
        </text>
      </ThoughtBubble>
    </g>
  );
};

const WordJump: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const g1 = useProgress(at(0.05), at(0.3));
  const g2 = useProgress(at(0.35), at(0.7));
  const base = 440;
  const scale = 330 / 72;
  const n2 = Math.round(26 + (62 - 26) * g2);
  const bars = [
    { x: 230, v: 26 * g1, label: "ÖNCE", num: Math.round(26 * g1), color: "#c9c4cc", dark: false },
    { x: 520, v: g2 > 0 ? 26 + (62 - 26) * g2 : 0, label: "6 HAFTA SONRA", num: n2, color: PURPLE, dark: true },
  ];
  return (
    <g>
      <Paper />
      <line x1={80} y1={base - 72 * scale} x2={700} y2={base - 72 * scale} stroke="#b3abc4" strokeWidth={4} strokeDasharray="14 12" />
      <text x={710} y={base - 72 * scale + 8} fontFamily={uiFont} fontWeight={800} fontSize={24} fill="#8a809c">
        72 KELİME
      </text>
      <line x1={80} y1={base} x2={700} y2={base} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {bars.map((b) => {
        const h = b.v * scale;
        return (
          <g key={b.label}>
            <rect x={b.x - 80} y={base - h} width={160} height={h} rx={12} fill={b.color} stroke={OUTLINE} strokeWidth={5} opacity={h > 0 ? 1 : 0} />
            {h > 0 ? (
              <text x={b.x} y={base - h - 16} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={56} fill={INK}>
                {b.num}
              </text>
            ) : null}
            <Chip x={b.x} y={base + 52} text={b.label} dark={b.dark} delay={b.dark ? at(0.35) : at(0.05)} />
          </g>
        );
      })}
      {g2 >= 1 ? <Sparkles points={[[600, 80], [450, 110], [640, 170]]} /> : null}
      <g opacity={frame > at(0.7) ? 1 : 0}>
        <BigText x={790} y={300} text="×2+" size={90} delay={at(0.72)} />
      </g>
    </g>
  );
};

const Champions: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const bob = useWave(40, 6);
  return (
    <g>
      <Paper />
      <Brain x={220} y={260} scale={0.95} delay={0} />
      <Brain x={680} y={260} scale={0.95} delay={6} />
      <BigText x={450} y={260} text="=" size={130} delay={at(0.2)} />
      <NamePlate x={220} y={420} text="ŞAMPİYON" delay={at(0.1)} />
      <NamePlate x={680} y={420} text="SEN" delay={at(0.15)} />
      {/* Şampiyonun farkı: aklındaki ev */}
      <g transform={place(220, 90 + bob, useAppear(at(0.45)) * 0.5)}>
        <path d="M -110 0 L 0 -80 L 110 0 Z" fill={PURPLE} stroke={OUTLINE} strokeWidth={8} strokeLinejoin="round" />
        <rect x={-90} y={0} width={180} height={120} fill={WALL} stroke={OUTLINE} strokeWidth={8} />
        <line x1={0} y1={0} x2={0} y2={120} stroke={OUTLINE} strokeWidth={8} />
        <line x1={-90} y1={60} x2={90} y2={60} stroke={OUTLINE} strokeWidth={8} />
      </g>
      <Chip x={450} y={505} text="FARK: YÖNTEM" dark delay={at(0.55)} />
    </g>
  );
};

const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const card = useAppear(8);
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Person x={200} y={530} scale={1.3} shirt={PURPLE} presenting />
      <g transform={place(610, 200, card)}>
        <rect x={-230} y={-110} width={460} height={220} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -160 106 L -190 160 L -110 106 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-150} y={100} width={44} height={12} fill="#fff" />
        <text x={0} y={-8} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={46} fill={INK}>
          İLK NEYİ
        </text>
        <text x={0} y={52} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={46} fill={RED}>
          KOYARDIN?
        </text>
      </g>
      <g transform={place(610, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={24} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  ForgotList,
  PalaceReveal,
  PlaceItems,
  WalkThrough,
  Banquet,
  WordJump,
  Champions,
  YourTurn,
};
