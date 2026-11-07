// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Prizde neden yüz görüyorsun? Yüz paredolisi (2026-11-07-sabah)
import { interpolate, useCurrentFrame } from "remotion";
import { Arrow, Brain, Chip, INK, NamePlate, Person, place, Sparkles, uiFont, useAppear, useProgress, useWave, YELLOW } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff0f4";
const PINK = "#ff5c8a";
const DEEP = "#d6336c";
const SOFT = "#ffd6e2";
const GREY = "#8c8590";
const BLUE = "#5aa9e6";
const GREEN = "#3fb47a";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type Mood = "plug" | "happy" | "surprised" | "angry";

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [90, 80, 34],
      [820, 70, 24],
      [810, 330, 16],
      [60, 340, 18],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={SOFT} />
    ))}
  </g>
);

// Çizgili duvar kâğıdı + süpürgelik
const Wall: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={i} x={i * 100 + 30} y={0} width={40} height={480} fill={SOFT} opacity={0.6} />
    ))}
    <rect x={0} y={480} width={900} height={80} fill="#e7b9c7" />
    <rect x={0} y={472} width={900} height={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
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

// Priz; (0,0) merkez. İki yuva "göz", topraklama deliği "ağız" gibi durur.
const Outlet: React.FC<{
  x: number;
  y: number;
  scale?: number;
  delay?: number;
  mood?: Mood;
  mustache?: boolean;
  bow?: boolean;
  blink?: boolean;
  rotate?: number;
}> = ({ x, y, scale = 1, delay = 0, mood = "plug", mustache = false, bow = false, blink = true, rotate = 0 }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const eyeScale = blink && frame % 80 > 74 ? 0.15 : 1;
  return (
    <g transform={place(x, y, scale * appear, rotate)}>
      <rect x={-110} y={-140} width={220} height={280} rx={28} fill="rgba(0,0,0,0.12)" transform="translate(8 10)" />
      <rect x={-110} y={-140} width={220} height={280} rx={28} fill="#fdfbf7" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-80} y={-108} width={160} height={216} rx={70} fill="#f4efe8" stroke={OUTLINE} strokeWidth={4} />
      <g transform={`translate(0 -30) scale(1 ${eyeScale}) translate(0 30)`}>
        <rect x={-50} y={-62} width={22} height={60} rx={6} fill={OUTLINE} />
        <rect x={28} y={-62} width={22} height={60} rx={6} fill={OUTLINE} />
      </g>
      {mood === "plug" || mood === "surprised" ? (
        <path d="M -18 70 L -18 48 A 18 18 0 0 1 18 48 L 18 70 Z" fill={OUTLINE} />
      ) : mood === "happy" ? (
        <path d="M -40 40 Q 0 86 40 40 Q 0 60 -40 40 Z" fill={OUTLINE} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      ) : (
        <path d="M -34 70 Q 0 40 34 70" fill="none" stroke={OUTLINE} strokeWidth={10} strokeLinecap="round" />
      )}
      {mood === "angry" ? (
        <path d="M -64 -86 L -22 -70 M 64 -86 L 22 -70" stroke={OUTLINE} strokeWidth={9} strokeLinecap="round" />
      ) : null}
      {mustache ? (
        <path d="M 0 26 C -20 10 -60 14 -70 34 C -50 30 -30 38 0 34 C 30 38 50 30 70 34 C 60 14 20 10 0 26 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={3} />
      ) : null}
      {bow ? (
        <g transform="translate(70 -128)">
          <path d="M 0 0 L -40 -24 L -40 24 Z M 0 0 L 40 -24 L 40 24 Z" fill={PINK} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
          <circle r={10} fill={DEEP} stroke={OUTLINE} strokeWidth={4} />
        </g>
      ) : null}
    </g>
  );
};

// Basit yüz ifadesi; (0,0) yüzün merkezi
const Face: React.FC<{ mood: Mood; size?: number; color?: string }> = ({ mood, size = 1, color = OUTLINE }) => (
  <g transform={`scale(${size})`}>
    <circle cx={-26} cy={-10} r={10} fill={color} />
    <circle cx={26} cy={-10} r={10} fill={color} />
    {mood === "happy" ? (
      <path d="M -26 18 Q 0 42 26 18" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />
    ) : mood === "angry" ? (
      <path d="M -22 32 Q 0 16 22 32" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />
    ) : (
      <ellipse cx={0} cy={26} rx={11} ry={14} fill={color} />
    )}
  </g>
);

// Önden araba: farlar göz, ızgara ağız
const CarFront: React.FC<{ x: number; y: number; scale?: number; delay?: number; mood?: Mood }> = ({ x, y, scale = 1, delay = 0, mood = "happy" }) => {
  const appear = useAppear(delay);
  const bob = useWave(40, 3);
  return (
    <g transform={place(x, y + bob, scale * appear)}>
      <path d="M -90 -40 L -60 -100 L 60 -100 L 90 -40 Z" fill="#bfe3f5" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-130} y={-44} width={260} height={110} rx={30} fill={PINK} stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-72} cy={-4} r={26} fill="#fff8c4" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={72} cy={-4} r={26} fill="#fff8c4" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-68} cy={-2} r={10} fill={OUTLINE} />
      <circle cx={76} cy={-2} r={10} fill={OUTLINE} />
      {mood === "surprised" ? (
        <ellipse cx={0} cy={36} rx={22} ry={18} fill={OUTLINE} />
      ) : (
        <path d="M -50 26 Q 0 64 50 26 Z" fill="#555" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      )}
      <rect x={-118} y={60} width={44} height={30} rx={8} fill={OUTLINE} />
      <rect x={74} y={60} width={44} height={30} rx={8} fill={OUTLINE} />
    </g>
  );
};

const Cloud: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const appear = useAppear(delay);
  const drift = useWave(80, 6);
  return (
    <g transform={place(x + drift, y, scale * appear)}>
      <path
        d="M -110 40 C -150 40 -150 -20 -100 -20 C -100 -70 -30 -80 -10 -40 C 10 -90 100 -80 95 -20 C 150 -25 150 40 110 40 Z"
        fill="#fff"
        stroke={OUTLINE}
        strokeWidth={6}
      />
      <g opacity={0.9} transform="translate(0 0)">
        <Face mood="surprised" size={0.9} color="#7aa3c0" />
      </g>
    </g>
  );
};

const Coffee: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const appear = useAppear(delay);
  const steam = useWave(30, 5);
  return (
    <g transform={place(x, y, scale * appear)}>
      <path d={`M -30 -110 Q ${-40 + steam} -135 -30 -160 M 10 -110 Q ${steam} -135 10 -160`} fill="none" stroke={GREY} strokeWidth={5} strokeLinecap="round" />
      <path d="M 100 -50 C 150 -50 150 20 95 20" fill="none" stroke={OUTLINE} strokeWidth={14} />
      <path d="M 100 -50 C 150 -50 150 20 95 20" fill="none" stroke="#fff" strokeWidth={6} />
      <path d="M -110 -80 L 110 -80 L 90 60 Q 0 80 -90 60 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <ellipse cx={0} cy={-80} rx={110} ry={28} fill="#a0663a" stroke={OUTLINE} strokeWidth={6} />
      <ellipse cx={0} cy={-80} rx={84} ry={18} fill="#f3dcc0" />
      <g transform="translate(0 -82) scale(1 0.35)">
        <Face mood="happy" size={1.2} color="#a0663a" />
      </g>
    </g>
  );
};

const Toast: React.FC<{ x: number; y: number; scale?: number; delay?: number; mood?: Mood }> = ({ x, y, scale = 1, delay = 0, mood = "surprised" }) => {
  const appear = useAppear(delay);
  const tilt = useWave(50, 3);
  return (
    <g transform={place(x, y, scale * appear, tilt)}>
      <path
        d="M -90 90 L -90 -30 C -130 -40 -130 -110 -60 -110 L 60 -110 C 130 -110 130 -40 90 -30 L 90 90 Z"
        fill="#c98a45"
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <path
        d="M -72 74 L -72 -40 C -100 -50 -100 -94 -54 -94 L 54 -94 C 100 -94 100 -50 72 -40 L 72 74 Z"
        fill="#f5d9a6"
      />
      <g transform="translate(0 0)">
        <Face mood={mood} size={1.1} color="#8a5428" />
      </g>
    </g>
  );
};

const Monkey: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const blink = frame % 90 > 85 ? 0.15 : 1;
  const bob = useWave(60, 4);
  return (
    <g transform={place(x, y + bob, scale * appear)}>
      <path d="M -120 220 Q -120 90 0 90 Q 120 90 120 220 Z" fill="#8a5a3c" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-110} cy={-10} r={40} fill="#8a5a3c" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={110} cy={-10} r={40} fill="#8a5a3c" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-110} cy={-10} r={20} fill="#e8b48f" />
      <circle cx={110} cy={-10} r={20} fill="#e8b48f" />
      <circle cx={0} cy={0} r={105} fill="#8a5a3c" stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 -10 C -70 -60 -10 -60 0 -30 C 10 -60 70 -60 70 -10 C 90 50 40 90 0 90 C -40 90 -90 50 -70 -10 Z" fill="#e8b48f" stroke={OUTLINE} strokeWidth={5} />
      <g transform={`translate(0 -18) scale(1 ${blink}) translate(0 18)`}>
        <circle cx={-32} cy={-18} r={15} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={32} cy={-18} r={15} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-24} cy={-16} r={7} fill={OUTLINE} />
        <circle cx={40} cy={-16} r={7} fill={OUTLINE} />
      </g>
      <circle cx={-10} cy={30} r={5} fill={OUTLINE} />
      <circle cx={10} cy={30} r={5} fill={OUTLINE} />
      <path d="M -26 56 Q 0 72 26 56" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
    </g>
  );
};

// Ekran/monitör; içerik (0,0) merkezde
const Monitor: React.FC<{ x: number; y: number; delay?: number; children?: React.ReactNode }> = ({ x, y, delay = 0, children }) => {
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, appear)}>
      <rect x={-40} y={150} width={80} height={50} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-110} y={196} width={220} height={22} rx={10} fill="#9aa3ad" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-210} y={-170} width={420} height={330} rx={22} fill="#3a3f4b" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-188} y={-148} width={376} height={286} rx={12} fill="#eaf6ff" />
      {children}
    </g>
  );
};

// Yüz algılama köşeli çerçevesi
const FaceBox: React.FC<{ w: number; h: number; color: string; opacity?: number }> = ({ w, h, color, opacity = 1 }) => {
  const c = 34;
  const x = -w / 2;
  const y = -h / 2;
  return (
    <g opacity={opacity} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round">
      <path d={`M ${x} ${y + c} L ${x} ${y} L ${x + c} ${y}`} />
      <path d={`M ${-x - c} ${y} L ${-x} ${y} L ${-x} ${y + c}`} />
      <path d={`M ${x} ${-y - c} L ${x} ${-y} L ${x + c} ${-y}`} />
      <path d={`M ${-x - c} ${-y} L ${-x} ${-y} L ${-x} ${-y - c}`} />
    </g>
  );
};

const Check: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={30} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
      <path d="M -14 0 L -4 12 L 16 -12" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

const Cross: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={30} fill={DEEP} stroke={OUTLINE} strokeWidth={5} />
      <path d="M -12 -12 L 12 12 M 12 -12 L -12 12" stroke="#fff" strokeWidth={8} strokeLinecap="round" />
    </g>
  );
};

// 1) Duvardaki priz sana bakıyor
const PlugFace: Visual = () => {
  const frame = useCurrentFrame();
  const stop = useProgress(0, 40);
  const px = interpolate(stop, [0, 1], [-60, 230]);
  const shock = useAppear(44);
  const lean = interpolate(frame, [44, 56], [0, -4], clamp);
  return (
    <g>
      <Wall />
      <Outlet x={600} y={250} scale={1.05} rotate={lean} />
      <Person x={px} y={470} scale={1.35} walking={frame < 40} shirt={PINK} />
      <g transform={place(230, 150, shock)}>
        <circle r={38} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <Label x={0} y={16} text="!" size={52} />
      </g>
      <g opacity={shock}>
        <path d="M 330 230 Q 410 200 470 230" fill="none" stroke={DEEP} strokeWidth={5} strokeDasharray="10 10" strokeLinecap="round" />
      </g>
      <Sparkles points={[[760, 80], [800, 400]]} color={PINK} />
    </g>
  );
};

// 2) Bunun adı: yüz paredolisi
const NameCard: Visual = () => {
  const card = useAppear(4);
  const arrow = useProgress(30, 46);
  return (
    <g>
      <Paper />
      <g transform={place(450, 150, card)}>
        <rect x={-340} y={-105} width={680} height={210} rx={30} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Label x={0} y={-28} text="BUNUN ADI" size={34} color={DEEP} />
        <Label x={0} y={52} text="YÜZ PAREDOLİSİ" size={66} />
      </g>
      <Outlet x={250} y={410} scale={0.48} delay={18} />
      <Arrow from={[350, 410]} to={[520, 410]} progress={arrow} color={DEEP} />
      <g transform={place(640, 410, useAppear(48))}>
        <circle r={78} fill={YELLOW} stroke={OUTLINE} strokeWidth={6} />
        <Face mood="surprised" size={1.3} />
      </g>
      <Label x={640} y={535} text="OLMAYAN YÜZ" size={28} color={DEEP} />
    </g>
  );
};

// 3) Yüzler her yerde
const Everywhere: Visual = () => {
  const items: { x: number; y: number; label: string; delay: number; node: React.ReactNode }[] = [
    { x: 225, y: 140, label: "ARABA", delay: 4, node: <CarFront x={0} y={10} scale={0.62} /> },
    { x: 675, y: 140, label: "BULUT", delay: 16, node: <Cloud x={0} y={10} scale={0.72} /> },
    { x: 225, y: 410, label: "KAHVE", delay: 28, node: <Coffee x={0} y={40} scale={0.58} /> },
    { x: 675, y: 410, label: "EKMEK", delay: 40, node: <Toast x={0} y={0} scale={0.62} /> },
  ];
  return (
    <g>
      <Paper />
      {items.map((it) => (
        <Tile key={it.label} {...it} />
      ))}
    </g>
  );
};

const Tile: React.FC<{ x: number; y: number; label: string; delay: number; node: React.ReactNode }> = ({ x, y, label, delay, node }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-200} y={-120} width={400} height={240} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <g transform="translate(-40 0)">{node}</g>
      <g transform="translate(130 70)">
        <rect x={-62} y={-22} width={124} height={44} rx={10} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
        <Label x={0} y={9} text={label} size={24} />
      </g>
    </g>
  );
};

// 4) Beyindeki yüz dedektörü — aceleci
const Detector: Visual = () => {
  const frame = useCurrentFrame();
  const sweep = (frame * 4) % 360;
  return (
    <g>
      <Paper />
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 25) % 75) / 75;
        return <circle key={i} cx={450} cy={270} r={110 + t * 230} fill="none" stroke={PINK} strokeWidth={5} opacity={1 - t} />;
      })}
      <g transform={`translate(450 270) rotate(${sweep})`} opacity={useAppear(10)}>
        <path d="M 0 0 L 300 -40 A 302 302 0 0 1 300 40 Z" fill={PINK} opacity={0.18} />
      </g>
      <Brain x={450} y={270} scale={1.05} />
      <g transform={place(450, 70, useAppear(14))}>
        <rect x={-150} y={-26} width={300} height={52} rx={26} fill={INK} />
        <Label x={0} y={10} text="YÜZ DEDEKTÖRÜ" size={28} color="#fff" />
      </g>
      <Outlet x={130} y={140} scale={0.32} delay={24} />
      <g transform="translate(770 140)">
        <CarFront x={0} y={0} scale={0.4} delay={32} />
      </g>
      <Toast x={140} y={430} scale={0.42} delay={40} />
      <Cloud x={760} y={440} scale={0.45} delay={48} />
      <Chip x={450} y={500} text="ÇOK ACELECİ!" delay={56} />
    </g>
  );
};

// 5) Beyin taraması: ilk anda gerçek yüz gibi
const FastScan: Visual = () => {
  const frame = useCurrentFrame();
  const box = useAppear(22);
  const flash = frame > 22 ? 0.6 + 0.4 * Math.abs(Math.sin(frame / 5)) : 0;
  return (
    <g>
      <Paper />
      <Monitor x={330} y={250}>
        <Outlet x={0} y={0} scale={0.68} blink={false} />
        <g transform={`scale(${0.6 + 0.4 * box})`}>
          <FaceBox w={210} h={250} color={GREEN} opacity={box * flash} />
        </g>
      </Monitor>
      <Brain x={720} y={200} scale={0.75} delay={6} />
      <g transform={place(720, 390, useAppear(30))}>
        <rect x={-120} y={-40} width={240} height={80} rx={18} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
        <Label x={0} y={14} text="YÜZ!" size={44} color="#fff" />
      </g>
      <Check x={830} y={350} delay={38} />
    </g>
  );
};

// 6) Saniyenin dörtte biri geçmeden düzeltiyor: priz!
const Correction: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const flip = Math.round(durationInFrames * 0.45);
  const bar = interpolate(frame, [6, flip], [0, 1], clamp);
  const fixed = frame >= flip;
  const pop = useAppear(flip);
  return (
    <g>
      <Paper />
      <Monitor x={330} y={230}>
        <Outlet x={0} y={0} scale={0.68} blink={false} />
        <FaceBox w={210} h={250} color={fixed ? GREY : GREEN} opacity={fixed ? 0.35 : 1} />
      </Monitor>
      {/* zaman çubuğu */}
      <g transform="translate(150 500)">
        <rect x={0} y={-16} width={360} height={32} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <rect x={4} y={-12} width={352 * bar} height={24} rx={12} fill={PINK} />
        <Label x={0} y={-30} text="0" size={24} anchor="start" />
        <Label x={360} y={-30} text="1/4 SANİYE" size={24} anchor="end" />
      </g>
      {!fixed ? (
        <g transform="translate(720 230)">
          <rect x={-120} y={-40} width={240} height={80} rx={18} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
          <Label x={0} y={14} text="YÜZ?" size={44} color="#fff" />
        </g>
      ) : (
        <g transform={place(720, 230, pop)}>
          <rect x={-120} y={-40} width={240} height={80} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <Label x={0} y={14} text="YÜZ" size={44} color={GREY} />
          <line x1={-70} y1={0} x2={70} y2={0} stroke={DEEP} strokeWidth={8} strokeLinecap="round" />
          <g transform="translate(0 120)">
            <rect x={-130} y={-44} width={260} height={88} rx={18} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
            <Label x={0} y={16} text="PRİZ!" size={50} />
          </g>
        </g>
      )}
    </g>
  );
};

// 7) Kaçırmaktansa yanlış alarm
const Alarm: Visual = () => {
  const frame = useCurrentFrame();
  const ring = Math.sin(frame / 2) * 10;
  const lightOn = Math.floor(frame / 8) % 2 === 0;
  return (
    <g>
      <Paper />
      {/* alarm lambası */}
      <g transform={place(450, 110, useAppear(2))}>
        <circle r={95} fill={PINK} opacity={lightOn ? 0.25 : 0.08} />
        <g transform={`rotate(${ring})`}>
          <path d="M -50 30 L -50 -10 A 50 50 0 0 1 50 -10 L 50 30 Z" fill={lightOn ? "#ff3b5c" : "#c2455d"} stroke={OUTLINE} strokeWidth={6} />
          <rect x={-66} y={28} width={132} height={22} rx={6} fill="#555" stroke={OUTLINE} strokeWidth={5} />
        </g>
      </g>
      {/* sol kart */}
      <g transform={place(230, 360, useAppear(14))}>
        <rect x={-190} y={-110} width={380} height={230} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Outlet x={-90} y={10} scale={0.42} />
        <Label x={70} y={-40} text="YANLIŞ" size={34} />
        <Label x={70} y={2} text="ALARM" size={34} />
        <Label x={70} y={60} text="ZARARSIZ" size={24} color={GREEN} />
      </g>
      <Check x={400} y={260} delay={24} />
      {/* sağ kart */}
      <g transform={place(670, 360, useAppear(30))}>
        <rect x={-190} y={-110} width={380} height={230} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <g transform="translate(-90 10)">
          <circle r={62} fill="#f2c79a" stroke={OUTLINE} strokeWidth={5} />
          <Face mood="happy" size={0.9} />
          <path d="M -80 -80 L 80 80" stroke={DEEP} strokeWidth={9} strokeLinecap="round" />
        </g>
        <Label x={70} y={-40} text="YÜZÜ" size={34} />
        <Label x={70} y={2} text="KAÇIRMAK" size={34} />
        <Label x={70} y={60} text="RİSKLİ" size={24} color={DEEP} />
      </g>
      <Cross x={840} y={260} delay={40} />
    </g>
  );
};

// 8) Maymunlar da yüzlü eşyaya daha uzun baktı
const Monkey8: Visual = () => {
  const a = useProgress(20, 70);
  const b = useProgress(20, 40);
  const gaze = useAppear(10);
  return (
    <g>
      <Paper />
      <Monkey x={170} y={250} scale={0.95} />
      <g opacity={gaze}>
        <path d="M 230 200 Q 330 150 420 160" fill="none" stroke={DEEP} strokeWidth={5} strokeDasharray="10 10" strokeLinecap="round" />
      </g>
      <Outlet x={500} y={160} scale={0.4} delay={4} mood="surprised" />
      <g transform="translate(500 330)" opacity={useAppear(8)}>
        <rect x={-55} y={-55} width={110} height={110} rx={18} fill="#fdfbf7" stroke={OUTLINE} strokeWidth={5} />
        <circle r={14} fill="#ccc" stroke={OUTLINE} strokeWidth={4} />
      </g>
      {/* süre çubukları */}
      <g transform="translate(600 160)">
        <rect x={0} y={-22} width={250 * a} height={44} rx={12} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
        <Label x={0} y={-36} text="YÜZLÜ EŞYA" size={22} anchor="start" />
      </g>
      <g transform="translate(600 330)">
        <rect x={0} y={-22} width={100 * b} height={44} rx={12} fill={GREY} stroke={OUTLINE} strokeWidth={4} />
        <Label x={0} y={-36} text="SIRADAN EŞYA" size={22} anchor="start" />
      </g>
      <Chip x={680} y={480} text="DAHA UZUN BAKTI" delay={60} />
      <NamePlate x={170} y={520} text="REZUS MAYMUNU" delay={14} />
    </g>
  );
};

// 9) Hayalî yüzlerin çoğu erkek sanıldı
const MaleBias: Visual = () => {
  const m = useProgress(24, 60);
  const f = useProgress(24, 34);
  return (
    <g>
      <Paper />
      <Outlet x={200} y={250} scale={0.95} mustache delay={2} />
      <Label x={200} y={530} text="BAY PRİZ?" size={30} color={DEEP} />
      <g transform={place(620, 260, useAppear(12))}>
        <rect x={-230} y={-200} width={460} height={400} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Label x={0} y={-140} text="BU YÜZ KİM?" size={34} />
        <g transform="translate(-180 -40)">
          <Label x={0} y={-16} text="ERKEK" size={28} anchor="start" />
          <rect x={0} y={0} width={360} height={46} rx={12} fill="#f1e8ec" />
          <rect x={0} y={0} width={360 * 0.9 * m} height={46} rx={12} fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
        </g>
        <g transform="translate(-180 80)">
          <Label x={0} y={-16} text="KADIN" size={28} anchor="start" />
          <rect x={0} y={0} width={360} height={46} rx={12} fill="#f1e8ec" />
          <rect x={0} y={0} width={Math.max(4, 360 * 0.09 * f)} height={46} rx={12} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
        </g>
      </g>
      <NamePlate x={620} y={510} text="BİNLERCE KİŞİ OYLADI" delay={40} />
    </g>
  );
};

// 10) Duygu bile yüklüyoruz: mutlu ya da şaşkın
const Moods: Visual = () => {
  const pulse = 1 + useWave(24, 0.05);
  return (
    <g>
      <Paper />
      <g transform={place(240, 230, pulse)}>
        <Outlet x={0} y={0} scale={0.8} mood="happy" delay={4} />
      </g>
      <Chip x={240} y={480} text="MUTLU" delay={14} />
      <CarFront x={660} y={240} scale={1.1} mood="surprised" delay={20} />
      <Chip x={660} y={480} text="ŞAŞKIN" delay={30} />
      <Sparkles points={[[90, 80], [400, 70], [820, 80], [450, 380]]} color={PINK} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = () => {
  const card = useAppear(8);
  const pulse = 1 + useWave(24, 0.05);
  return (
    <g>
      <Wall />
      <Outlet x={190} y={250} scale={0.95} mood="happy" />
      <g transform={place(610, 210, card)}>
        <rect x={-210} y={-170} width={420} height={330} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Chip x={0} y={-95} text="PRİZDE?" delay={14} />
        <Chip x={0} y={-5} text="BULUTTA?" delay={20} />
        <Chip x={0} y={85} text="ARABADA?" delay={26} />
      </g>
      <g transform={place(610, 440, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={30} />
      </g>
      <Sparkles points={[[860, 60], [380, 50], [860, 380]]} color={PINK} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  PlugFace,
  NameCard,
  Everywhere,
  Detector,
  FastScan,
  Correction,
  Alarm,
  Monkey: Monkey8,
  MaleBias,
  Moods,
  YourTurn,
};
