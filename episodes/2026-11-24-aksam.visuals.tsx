// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Kapı kolu neden çarpıyor? Statik elektrik (2026-11-24-aksam)
import { useCurrentFrame } from "remotion";
import { BigText, Chip, Person, place, ThoughtBubble, uiFont, useAppear, useProgress, useWave } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff1e6";
const SKIN = "#f2c79a";
const ORANGE = "#ff8a2b";
const DEEP = "#e0662a";
const BLUE = "#3a8fe0";
const LIGHTBLUE = "#bfe3ff";
const RED = "#e8434b";
const YELLOWC = "#ffd23f";
const WOOD = "#c27a3f";
const METAL = "#c9d4da";
const GREEN = "#4caf50";
const PURPLE = "#7b5cd6";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Sözde rastgele (kareye göre titreyen kıvılcım için)
const rnd = (a: number) => {
  const s = Math.sin(a * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

// Zikzak kıvılcım; from → to
const Spark: React.FC<{ from: [number, number]; to: [number, number]; width?: number }> = ({ from, to, width = 8 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2);
  const [x1, y1] = from;
  const [x2, y2] = to;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  const n = 6;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const off = i === 0 || i === n ? 0 : (rnd(seed * 7 + i) - 0.5) * Math.min(60, len * 0.5);
    pts.push(`${x1 + (x2 - x1) * t + nx * off},${y1 + (y2 - y1) * t + ny * off}`);
  }
  const d = `M ${pts.join(" L ")}`;
  return (
    <g>
      <path d={d} fill="none" stroke={YELLOWC} strokeWidth={width * 3} strokeLinejoin="round" strokeLinecap="round" opacity={0.35} />
      <path d={d} fill="none" stroke={OUTLINE} strokeWidth={width + 6} strokeLinejoin="round" strokeLinecap="round" />
      <path d={d} fill="none" stroke={YELLOWC} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#fff" strokeWidth={width * 0.35} strokeLinejoin="round" strokeLinecap="round" />
    </g>
  );
};

// Patlama ışığı (ışınlar)
const Flash: React.FC<{ x: number; y: number; size?: number; amount: number }> = ({ x, y, size = 1, amount }) => {
  if (amount <= 0) return null;
  return (
    <g transform={place(x, y, size * (0.6 + amount * 0.6))} opacity={Math.min(1, amount * 1.4)}>
      <circle r={60} fill={YELLOWC} opacity={0.35} />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={Math.cos(a) * 40}
            y1={Math.sin(a) * 40}
            x2={Math.cos(a) * 85}
            y2={Math.sin(a) * 85}
            stroke={ORANGE}
            strokeWidth={8}
            strokeLinecap="round"
          />
        );
      })}
      <circle r={30} fill="#fff" stroke={YELLOWC} strokeWidth={8} />
    </g>
  );
};

// Elektron: mavi daire içinde eksi işareti
const Electron: React.FC<{ x: number; y: number; scale?: number; opacity?: number }> = ({ x, y, scale = 1, opacity = 1 }) => (
  <g transform={place(x, y, scale)} opacity={opacity}>
    <circle r={18} fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
    <line x1={-8} y1={0} x2={8} y2={0} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
  </g>
);

// Kapı ve kolu; kol plakasının merkezi (hx, hy) döner
const DOOR = { x: 90, w: 330, top: 30, hx: 390, hy: 300 };
const BigDoor: React.FC<{ glow?: number }> = ({ glow = 0 }) => (
  <g>
    <rect x={DOOR.x - 18} y={DOOR.top - 18} width={DOOR.w + 36} height={600} fill="#e8d3b5" stroke={OUTLINE} strokeWidth={5} />
    <rect x={DOOR.x} y={DOOR.top} width={DOOR.w} height={600} fill={WOOD} stroke={OUTLINE} strokeWidth={5} />
    <rect x={DOOR.x + 40} y={DOOR.top + 40} width={DOOR.w - 80} height={180} rx={8} fill="#b06c35" stroke={OUTLINE} strokeWidth={4} />
    <rect x={DOOR.x + 40} y={DOOR.top + 300} width={DOOR.w - 80} height={240} rx={8} fill="#b06c35" stroke={OUTLINE} strokeWidth={4} />
    {glow > 0 ? <circle cx={DOOR.hx} cy={DOOR.hy} r={50 + glow * 30} fill={YELLOWC} opacity={0.35 * glow} /> : null}
    <rect x={DOOR.hx - 16} y={DOOR.hy - 50} width={32} height={100} rx={14} fill={METAL} stroke={OUTLINE} strokeWidth={5} />
    <rect x={DOOR.hx - 110} y={DOOR.hy - 14} width={120} height={28} rx={14} fill={METAL} stroke={OUTLINE} strokeWidth={5} />
    <circle cx={DOOR.hx} cy={DOOR.hy} r={12} fill="#9aa8b0" stroke={OUTLINE} strokeWidth={4} />
    <path d={`M ${DOOR.hx - 96} ${DOOR.hy - 6} L ${DOOR.hx - 20} ${DOOR.hy - 6}`} stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity={0.7} />
  </g>
);

// Sağdan uzanan el; işaret parmağının ucu (0,0)
const Hand: React.FC<{ x: number; y: number; scale?: number; sleeve?: string; children?: React.ReactNode }> = ({
  x,
  y,
  scale = 1,
  sleeve = PURPLE,
  children,
}) => (
  <g transform={place(x, y, scale)}>
    {children}
    <path d="M 150 -46 L 700 -60 L 700 70 L 150 56 Z" fill={sleeve} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
    <rect x={140} y={-52} width={34} height={114} rx={10} fill="#5c43b0" stroke={OUTLINE} strokeWidth={5} />
    <path
      d="M 145 -40 C 110 -44 86 -30 70 -24 L 14 -24 C -6 -24 -6 2 14 2 L 64 4 C 60 34 100 56 145 50 Z"
      fill={SKIN}
      stroke={OUTLINE}
      strokeWidth={6}
      strokeLinejoin="round"
    />
    <path d="M 66 6 C 52 14 56 30 76 30 M 80 30 C 66 40 72 52 94 48 M 98 48 C 88 56 98 66 116 60" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
    <path d="M 6 -20 Q 0 -11 6 -2" fill="none" stroke="#e6a98a" strokeWidth={4} strokeLinecap="round" />
  </g>
);

// Anahtar; (0,0) ucu, sap sağa uzanır
const Key: React.FC<{ x: number; y: number; scale?: number; rotate?: number }> = ({ x, y, scale = 1, rotate = 0 }) => (
  <g transform={place(x, y, scale, rotate)}>
    <path d="M 0 -8 L 110 -8 L 110 8 L 30 8 L 30 22 L 18 22 L 18 8 L 0 8 Z" fill={YELLOWC} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={150} cy={0} r={40} fill={YELLOWC} stroke={OUTLINE} strokeWidth={6} />
    <circle cx={162} cy={0} r={13} fill={PAPER} stroke={OUTLINE} strokeWidth={5} />
  </g>
);

// Yarım boy karakter
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  mood?: "calm" | "happy" | "wow" | "talk" | "ouch";
  spiky?: number;
  delay?: number;
}> = ({ x, y, scale = 1, shirt = PURPLE, mood = "calm", spiky = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const shake = mood === "ouch" ? Math.sin(frame * 1.7) * 3 : Math.sin(frame / 18) * 2;
  const hair = "#4a2f1d";
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${shake} 0 -140)`}>
        {spiky > 0
          ? Array.from({ length: 9 }).map((_, i) => {
              const ang = -160 + i * 17.5;
              const r = (ang * Math.PI) / 180;
              const wob = Math.sin(frame / 3 + i) * 4;
              const L = 70 + spiky * (40 + wob);
              return (
                <line
                  key={i}
                  x1={Math.cos(r) * 50}
                  y1={-200 + Math.sin(r) * 50}
                  x2={Math.cos(r) * L}
                  y2={-200 + Math.sin(r) * L}
                  stroke={hair}
                  strokeWidth={14}
                  strokeLinecap="round"
                />
              );
            })
          : null}
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        {spiky > 0 ? null : (
          <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        )}
        {mood === "wow" || mood === "ouch" ? (
          <g>
            <circle cx={-26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-26} cy={-204} r={6} fill={OUTLINE} />
            <circle cx={26} cy={-204} r={6} fill={OUTLINE} />
            {mood === "ouch" ? (
              <path d="M -24 -162 L -12 -170 L 0 -162 L 12 -170 L 24 -162" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
            ) : (
              <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
            )}
          </g>
        ) : (
          <g>
            <circle cx={-26} cy={-206} r={8} fill={OUTLINE} />
            <circle cx={26} cy={-206} r={8} fill={OUTLINE} />
            {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
            {mood === "talk" ? <ellipse cx={0} cy={-162} rx={18} ry={6 + Math.abs(Math.sin(frame / 3)) * 12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
            {mood === "calm" ? <path d="M -20 -160 Q 0 -166 20 -160" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
          </g>
        )}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        <circle cx={-46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
      </g>
    </g>
  );
};

// Kar tanesi
const Snowflake: React.FC<{ x: number; y: number; size?: number; color?: string }> = ({ x, y, size = 1, color = "#fff" }) => (
  <g transform={place(x, y, size)} stroke={color} strokeWidth={4} strokeLinecap="round">
    {[0, 60, 120].map((r) => (
      <line key={r} x1={-12} y1={0} x2={12} y2={0} transform={`rotate(${r})`} />
    ))}
  </g>
);

// Düşen kar
const Snowfall: React.FC<{ x: number; y: number; w: number; h: number; count?: number }> = ({ x, y, w, h, count = 12 }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const sx = x + rnd(i + 1) * w + Math.sin((frame + i * 20) / 15) * 8;
        const sy = y + ((rnd(i + 50) * h + frame * (1.2 + rnd(i + 9))) % h);
        return <Snowflake key={i} x={sx} y={sy} size={0.6 + rnd(i + 3) * 0.6} />;
      })}
    </g>
  );
};

// Su damlası
const Drop: React.FC<{ x: number; y: number; scale?: number; opacity?: number }> = ({ x, y, scale = 1, opacity = 1 }) => (
  <g transform={place(x, y, scale)} opacity={opacity}>
    <path d="M 0 -30 C 14 -10 22 2 22 12 C 22 26 12 34 0 34 C -12 34 -22 26 -22 12 C -22 2 -14 -10 0 -30 Z" fill={LIGHTBLUE} stroke={OUTLINE} strokeWidth={4} />
    <path d="M -10 10 Q -10 20 -2 24" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
  </g>
);

// Kalorifer peteği
const Radiator: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, scale)}>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${-50 + i * 50} -150 q 14 -20 0 -40 q -14 -20 0 -40`}
          fill="none"
          stroke={ORANGE}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.5 + 0.5 * Math.sin(frame / 6 + i)}
          transform={`translate(0 ${-((frame + i * 10) % 30) / 3})`}
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={-110 + i * 37} y={-130} width={32} height={130} rx={12} fill="#f4f4f4" stroke={OUTLINE} strokeWidth={5} />
      ))}
      <rect x={-118} y={-116} width={236} height={14} rx={6} fill="#e0e0e0" stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

// Kar yağan pencere
const SnowWindow: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 240, h = 200 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="#8fb8dc" stroke="#8a5a32" strokeWidth={10} />
    <clipPath id={`win-${x}-${y}`}>
      <rect x={x} y={y} width={w} height={h} />
    </clipPath>
    <g clipPath={`url(#win-${x}-${y})`}>
      <Snowfall x={x} y={y} w={w} h={h} count={14} />
      <path d={`M ${x} ${y + h} L ${x} ${y + h - 30} Q ${x + w / 2} ${y + h - 50} ${x + w} ${y + h - 30} L ${x + w} ${y + h} Z`} fill="#fff" />
    </g>
    <path d={`M ${x + w / 2} ${y} L ${x + w / 2} ${y + h} M ${x} ${y + h / 2} L ${x + w} ${y + h / 2}`} stroke="#8a5a32" strokeWidth={7} />
  </g>
);

// Halı (desenli)
const Carpet: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={8} fill={RED} stroke={OUTLINE} strokeWidth={5} />
    <rect x={x + 14} y={y + 12} width={w - 28} height={h - 24} rx={6} fill="none" stroke={YELLOWC} strokeWidth={5} strokeDasharray="18 10" />
    {Array.from({ length: Math.floor(w / 80) }).map((_, i) => (
      <path key={i} d={`M ${x + 50 + i * 80} ${y + h / 2} l 18 -14 l 18 14 l -18 14 Z`} fill={ORANGE} stroke={OUTLINE} strokeWidth={3} />
    ))}
  </g>
);

// 1) Kanca: el kapı koluna uzanıyor, ÇIT!
const ZapHook: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const reach = useProgress(0, d(0.35));
  const zapAt = d(0.35);
  const zapped = frame >= zapAt;
  const flash = zapped ? Math.max(0, 1 - (frame - zapAt) / 14) : 0;
  const recoil = zapped ? Math.min(1, (frame - zapAt) / 6) : 0;
  const tipX = DOOR.hx + 26 + (1 - reach) * 280 + recoil * 90;
  const tipY = DOOR.hy + 10 - recoil * 30;
  const sparkOn = zapped && frame - zapAt < 10;
  return (
    <g>
      <Paper />
      <BigDoor glow={flash} />
      {sparkOn ? <Spark from={[tipX, tipY - 10]} to={[DOOR.hx + 14, DOOR.hy]} width={9} /> : null}
      <Flash x={DOOR.hx + 20} y={DOOR.hy} amount={flash} size={1.1} />
      <Hand x={tipX} y={tipY} scale={1} />
      {zapped ? <BigText x={680} y={150} text="ÇIT!" size={130} delay={zapAt} /> : null}
      {zapped ? (
        <g opacity={Math.min(1, (frame - zapAt) / 6)}>
          <path d="M 590 250 l 20 -30 M 620 270 l 34 -14 M 620 300 l 36 6" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
};

// 2) Kışın daha sık: yaz ↔ kış
const WinterMore: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const sun = useWave(80, 6);
  const sparksWinter = [
    [600, 230],
    [740, 300],
    [650, 380],
    [790, 200],
    [700, 450],
  ];
  return (
    <g>
      <Paper />
      <rect x={30} y={30} width={400} height={500} rx={24} fill="#fff6c9" stroke={OUTLINE} strokeWidth={5} />
      <rect x={470} y={30} width={400} height={500} rx={24} fill="#cfe6fb" stroke={OUTLINE} strokeWidth={5} />
      <g transform={place(230, 240, 1, sun)}>
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={0} y1={-80} x2={0} y2={-110} stroke={ORANGE} strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 30})`} />
        ))}
        <circle r={66} fill={YELLOWC} stroke={OUTLINE} strokeWidth={6} />
      </g>
      <clipPath id="winter-clip">
        <rect x={470} y={30} width={400} height={500} rx={24} />
      </clipPath>
      <g clipPath="url(#winter-clip)">
        <Snowfall x={470} y={30} w={400} h={500} count={20} />
      </g>
      {frame > d(0.2) && Math.floor(frame / 6) % 4 === 0 ? <Spark from={[200, 400]} to={[250, 440]} width={6} /> : null}
      {sparksWinter.map(([sx, sy], i) => {
        const on = frame > d(0.1 + i * 0.1) && Math.floor((frame + i * 3) / 4) % 2 === 0;
        return on ? <Spark key={i} from={[sx - 30, sy - 30]} to={[sx + 30, sy + 30]} width={7} /> : null;
      })}
      <Chip x={230} y={490} text="YAZ: AZ" delay={d(0.1)} />
      <Chip x={670} y={490} text="KIŞ: ÇOK!" delay={d(0.4)} />
    </g>
  );
};

// 3) Adı: statik elektrik — saçları diken diken karakter
const StaticName: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const spiky = useProgress(d(0.05), d(0.3));
  const arrow = useProgress(d(0.55), d(0.8));
  return (
    <g>
      <Paper />
      <Bust x={260} y={470} scale={1.05} mood="wow" spiky={spiky} />
      {[0, 1, 2, 3].map((i) =>
        Math.floor((frame + i * 5) / 5) % 3 === 0 && frame > d(0.2) ? (
          <Spark key={i} from={[150 + i * 70, 90 + (i % 2) * 30]} to={[180 + i * 70, 40 + (i % 2) * 30]} width={5} />
        ) : null,
      )}
      <rect x={0} y={470} width={900} height={90} fill="#d99a63" stroke={OUTLINE} strokeWidth={5} />
      <Carpet x={120} y={490} w={300} h={56} />
      <BigText x={640} y={140} text="STATİK" size={80} delay={d(0.15)} />
      <BigText x={640} y={235} text="ELEKTRİK" size={80} delay={d(0.25)} />
      {arrow > 0 ? (
        <path
          d={`M 640 290 Q 640 ${290 + 150 * arrow} ${640 - 200 * arrow} ${290 + 190 * arrow}`}
          fill="none"
          stroke={OUTLINE}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray="16 14"
        />
      ) : null}
      <BigText x={700} y={420} text="?" size={110} delay={d(0.8)} />
    </g>
  );
};

// 4) Ayakkabı halıya değip ayrılıyor, elektronlar geçiyor
const CarpetElectrons: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const step = (Math.sin(frame / 9) + 1) / 2; // 0: değiyor, 1: havada
  const lift = step * 70;
  const label = step < 0.3 ? "DEĞ" : step > 0.7 ? "AYRIL" : "";
  return (
    <g>
      <Paper />
      <rect x={0} y={400} width={900} height={160} fill="#fbd7c0" />
      <Carpet x={40} y={400} w={820} h={140} />
      {/* ayakkabı (yandan, büyük) */}
      <g transform={`translate(0 ${-lift})`}>
        <rect x={360} y={90} width={110} height={170} fill="#2f3f63" stroke={OUTLINE} strokeWidth={6} />
        <path d="M 330 250 L 480 250 Q 640 260 650 340 L 650 360 L 330 360 Z" fill="#7a4a2a" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={320} y={360} width={340} height={36} rx={14} fill="#3b3b3b" stroke={OUTLINE} strokeWidth={6} />
        <path d="M 470 270 L 520 270 M 480 290 L 540 290" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
        {/* tabana geçmiş elektronlar */}
        {Array.from({ length: Math.min(6, Math.floor(frame / 14)) }).map((_, i) => (
          <Electron key={i} x={350 + i * 52} y={378} scale={0.7} />
        ))}
      </g>
      {/* halıdan zıplayan elektronlar */}
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 9) % 28) / 28;
        const show = step < 0.45;
        return show ? <Electron key={i} x={400 + i * 90} y={440 - t * 40} scale={0.8} opacity={1 - t * 0.5} /> : null;
      })}
      {label ? <Chip x={160} y={110} text={label} delay={0} /> : null}
      <Chip x={740} y={110} text="ELEKTRON" dark delay={d(0.3)} />
    </g>
  );
};

// 5) Yürürken yük birikiyor — sayaç dolar
const ChargeBuild: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const fill = useProgress(d(0.05), d(0.85));
  const speed = 2.6;
  const px = 110 + Math.min(frame, d(0.95)) * speed;
  const count = Math.floor(fill * 10);
  const around = Array.from({ length: count }).map((_, i) => {
    const a = (i / 10) * Math.PI * 2 + frame / 30;
    return [px + Math.cos(a) * 85, 300 + Math.sin(a) * 110];
  });
  return (
    <g>
      <Paper />
      <rect x={0} y={460} width={900} height={100} fill="#d99a63" />
      <Carpet x={20} y={440} w={700} h={60} />
      <Person x={110} y={450} scale={1.35} walking walkSpeed={speed} shirt={PURPLE} facing="right" />
      {around.map(([ex, ey], i) => (
        <Electron key={i} x={ex} y={ey} scale={0.75} />
      ))}
      {/* yük sayacı */}
      <g transform="translate(800 80)">
        <rect x={-40} y={0} width={80} height={330} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-28} y={12 + (1 - fill) * 306} width={56} height={fill * 306} rx={14} fill={BLUE} />
        <text x={0} y={-16} fontFamily={uiFont} fontWeight={900} fontSize={34} textAnchor="middle" fill={OUTLINE}>
          YÜK
        </text>
      </g>
      <ThoughtBubble x={px < 500 ? 470 : 300} y={110} r={56} delay={d(0.55)}>
        <text x={0} y={14} fontFamily={uiFont} fontWeight={900} fontSize={34} textAnchor="middle" fill={OUTLINE}>
          HİÇ?
        </text>
      </ThoughtBubble>
    </g>
  );
};

// 6) Kıvılcım atlıyor — yakın plan parmak ve kol
const SparkJump: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const reach = useProgress(0, d(0.4));
  const zapAt = d(0.4);
  const zapped = frame >= zapAt;
  const flash = zapped ? Math.max(0, 1 - (frame - zapAt) / 16) : 0;
  const tipX = 330 + (1 - reach) * 220;
  const tipY = 280;
  return (
    <g>
      <Paper />
      {/* yakın plan kapı kolu */}
      <rect x={0} y={0} width={260} height={560} fill={WOOD} stroke={OUTLINE} strokeWidth={5} />
      <rect x={140} y={150} width={60} height={260} rx={26} fill={METAL} stroke={OUTLINE} strokeWidth={6} />
      <rect x={-20} y={252} width={250} height={56} rx={28} fill={METAL} stroke={OUTLINE} strokeWidth={6} />
      <circle cx={170} cy={280} r={22} fill="#9aa8b0" stroke={OUTLINE} strokeWidth={5} />
      <Hand x={tipX} y={tipY} scale={1.3} />
      {/* parmaktaki elektronlar parmak ucuna toplanıyor */}
      {!zapped
        ? [0, 1, 2, 3, 4].map((i) => (
            <Electron key={i} x={tipX + 40 + i * 50 - reach * i * 30} y={tipY - 70 - (i % 2) * 30} scale={0.75} />
          ))
        : null}
      {zapped && frame - zapAt < 14 ? <Spark from={[tipX, tipY - 14]} to={[232, 280]} width={10} /> : null}
      <Flash x={250} y={280} amount={flash} size={1.2} />
      {zapped ? <BigText x={640} y={110} text="ÇIT!" size={120} delay={zapAt} /> : null}
      {zapped ? <Chip x={640} y={470} text="YÜK BOŞALDI" delay={zapAt + 10} /> : null}
    </g>
  );
};

// 7) Voltmetre: 35.000 volt
const VoltMeter: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const p = useProgress(d(0.1), d(0.6));
  const jitter = p >= 1 ? Math.sin(frame / 2) * 2 : 0;
  const angle = -80 + p * 160 + jitter;
  const value = Math.round((p * 35000) / 500) * 500;
  const fmt = value.toLocaleString("de-DE");
  return (
    <g>
      <Paper />
      <g transform="translate(450 330)">
        <path d="M -260 0 A 260 260 0 0 1 260 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={7} />
        <path d="M -220 0 A 220 220 0 0 1 -110 -190" fill="none" stroke={GREEN} strokeWidth={26} />
        <path d="M -110 -190 A 220 220 0 0 1 110 -190" fill="none" stroke={YELLOWC} strokeWidth={26} />
        <path d="M 110 -190 A 220 220 0 0 1 220 0" fill="none" stroke={RED} strokeWidth={26} />
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={0} y1={-200} x2={0} y2={-176} stroke={OUTLINE} strokeWidth={5} transform={`rotate(${-80 + i * 20})`} />
        ))}
        <g transform={`rotate(${angle})`}>
          <path d="M -10 0 L 0 -200 L 10 0 Z" fill={OUTLINE} />
        </g>
        <circle r={22} fill={OUTLINE} />
        <rect x={-300} y={0} width={600} height={30} rx={10} fill={DEEP} stroke={OUTLINE} strokeWidth={5} />
      </g>
      <text
        x={450}
        y={470}
        fontFamily={uiFont}
        fontWeight={900}
        fontSize={78}
        textAnchor="middle"
        fill={YELLOWC}
        stroke={OUTLINE}
        strokeWidth={5}
        paintOrder="stroke"
      >
        {`${fmt} VOLT`}
      </text>
      <Chip x={450} y={530} text="KURU HAVA + HALI" dark delay={d(0.3)} />
      {p >= 1 && Math.floor(frame / 5) % 2 === 0 ? <Spark from={[730, 120]} to={[800, 60]} width={6} /> : null}
      {p >= 1 && Math.floor(frame / 5) % 2 === 1 ? <Spark from={[170, 120]} to={[100, 60]} width={6} /> : null}
    </g>
  );
};

// 8) Kuru hava: kar yağan pencere, kalorifer, nem göstergesi düşüyor
const DryAir: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const dry = useProgress(d(0.35), d(0.85));
  return (
    <g>
      <Paper fill="#fde6d2" />
      <rect x={0} y={470} width={900} height={90} fill="#d99a63" stroke={OUTLINE} strokeWidth={4} />
      <SnowWindow x={60} y={60} w={260} h={220} />
      <Chip x={190} y={330} text="SOĞUK = AZ NEM" delay={d(0.1)} />
      <Radiator x={470} y={470} scale={0.95} />
      {/* havadaki damlalar buharlaşıp kayboluyor */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const vanish = Math.min(1, Math.max(0, dry * 6 - i));
        return (
          <Drop
            key={i}
            x={380 + (i % 3) * 90 + Math.sin((frame + i * 13) / 14) * 10}
            y={90 + Math.floor(i / 3) * 90 - vanish * 30}
            scale={0.9 * (1 - vanish * 0.7)}
            opacity={1 - vanish}
          />
        );
      })}
      {/* nem göstergesi */}
      <g transform="translate(760 100)">
        <rect x={-70} y={0} width={140} height={330} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-40} y={60 + dry * 200} width={80} height={240 - dry * 200} rx={14} fill={BLUE} />
        <Drop x={0} y={-30} scale={0.9} />
        <text x={0} y={40} fontFamily={uiFont} fontWeight={900} fontSize={30} textAnchor="middle" fill={OUTLINE}>
          NEM
        </text>
      </g>
      <Chip x={700} y={510} text="KALORİFER KURUTUR" dark delay={d(0.45)} />
    </g>
  );
};

// 9) Nemli hava: yük dağılıyor; karşılaştırma çubukları
const HumidAir: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const b1 = useProgress(d(0.05), d(0.35));
  const b2 = useProgress(d(0.4), d(0.6));
  const maxH = 330;
  return (
    <g>
      <Paper />
      {/* sol: nemli havada elektronlar dağılıyor */}
      <rect x={30} y={40} width={380} height={480} rx={24} fill="#e3f2ff" stroke={OUTLINE} strokeWidth={5} />
      {Array.from({ length: 7 }).map((_, i) => (
        <Drop key={i} x={70 + (i % 4) * 95 + (i > 3 ? 45 : 0)} y={90 + Math.floor(i / 4) * 80 + Math.sin((frame + i * 9) / 12) * 8} scale={0.7} />
      ))}
      <Person x={220} y={500} scale={1.05} shirt={PURPLE} />
      {[0, 1, 2, 3].map((i) => {
        const t = ((frame + i * 15) % 60) / 60;
        const a = (i / 4) * Math.PI * 2 + 0.6;
        return <Electron key={i} x={220 + Math.cos(a) * (50 + t * 160)} y={380 + Math.sin(a) * (50 + t * 120)} scale={0.7} opacity={1 - t} />;
      })}
      {/* sağ: çubuk grafik */}
      <line x1={470} y1={460} x2={870} y2={460} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <rect x={500} y={460 - maxH * b1} width={140} height={maxH * b1} rx={10} fill={RED} stroke={OUTLINE} strokeWidth={5} />
      <rect x={700} y={460 - maxH * (1500 / 35000) * b2 - 4} width={140} height={maxH * (1500 / 35000) * b2 + 4} rx={6} fill={BLUE} stroke={OUTLINE} strokeWidth={5} />
      <text x={570} y={450 - maxH * b1} fontFamily={uiFont} fontWeight={900} fontSize={30} textAnchor="middle" fill={OUTLINE} opacity={b1}>
        35.000 V
      </text>
      <text x={770} y={420} fontFamily={uiFont} fontWeight={900} fontSize={30} textAnchor="middle" fill={OUTLINE} opacity={b2}>
        1.500 V
      </text>
      <text x={570} y={500} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={OUTLINE}>
        KURU
      </text>
      <text x={770} y={500} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={OUTLINE}>
        NEMLİ
      </text>
      <Chip x={220} y={80} text="YÜK DAĞILIR" dark delay={d(0.15)} />
    </g>
  );
};

// 10) Anahtar taktiği
const KeyTrick: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const reach = useProgress(0, d(0.4));
  const zapAt = d(0.4);
  const zapped = frame >= zapAt;
  const flash = zapped ? Math.max(0, 1 - (frame - zapAt) / 16) : 0;
  const tipX = DOOR.hx + 30 + (1 - reach) * 260;
  const tipY = DOOR.hy;
  const ok = useAppear(zapAt + 8);
  return (
    <g>
      <Paper />
      <BigDoor glow={flash} />
      {zapped && frame - zapAt < 12 ? <Spark from={[tipX - 2, tipY]} to={[DOOR.hx + 14, DOOR.hy]} width={7} /> : null}
      <Flash x={DOOR.hx + 20} y={DOOR.hy} amount={flash * 0.7} size={0.8} />
      <Hand x={tipX + 150} y={tipY + 4} scale={1}>
        <Key x={-150} y={-4} scale={0.9} />
      </Hand>
      {zapped ? (
        <g transform={place(720, 140, ok)}>
          <circle r={64} fill={GREEN} stroke={OUTLINE} strokeWidth={6} />
          <path d="M -28 2 L -6 24 L 32 -22" fill="none" stroke="#fff" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
      <Chip x={640} y={480} text="ÖNCE ANAHTAR!" delay={d(0.15)} />
    </g>
  );
};

// 11) Kapanış: sana en çok nerede çarpıyor?
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const options = ["KAPI KOLU", "ARABA KAPISI", "KAZAK ÇIKARIRKEN"];
  const a = [useAppear(d(0.15)), useAppear(d(0.3)), useAppear(d(0.45))];
  return (
    <g>
      <Paper />
      <Bust x={190} y={540} scale={1} mood="talk" />
      <ThoughtBubble x={230} y={110} r={60} delay={4}>
        <text x={0} y={18} fontFamily={uiFont} fontWeight={900} fontSize={54} textAnchor="middle" fill={OUTLINE}>
          ?
        </text>
      </ThoughtBubble>
      {options.map((b, i) => (
        <g key={b} transform={place(610, 110 + i * 115, a[i])}>
          <rect x={-230} y={-40} width={460} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={i === 2 ? DEEP : OUTLINE}>
            {b}
          </text>
        </g>
      ))}
      <Chip x={610} y={490} text="@ETİKETLE" delay={d(0.6)} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  ZapHook,
  WinterMore,
  StaticName,
  CarpetElectrons,
  ChargeBuild,
  SparkJump,
  VoltMeter,
  DryAir,
  HumidAir,
  KeyTrick,
  YourTurn,
};
