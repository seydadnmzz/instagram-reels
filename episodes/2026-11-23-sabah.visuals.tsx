// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Konuşurken el kol sallamak / jestler (2026-11-23-sabah)
import { useCurrentFrame } from "remotion";
import { Arrow, BigText, Brain, Chip, NamePlate, place, Sparkles, ThoughtBubble, uiFont, useAppear, useProgress, useWave } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff0f4";
const SKIN = "#f2c79a";
const PINK = "#ff5c8a";
const DEEPPINK = "#d63a6e";
const BLUE = "#3a8fe0";
const TEAL = "#17b3a0";
const ORANGE = "#ff8a2b";
const PURPLE = "#8a6cf0";
const YELLOWC = "#ffd23f";
const GREY = "#b9b2aa";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// İki parçalı kol: omuzdan dirseğe (kumaş), dirsekten ele (ten)
const Arm: React.FC<{ sx: number; sy: number; a1: number; a2: number; shirt: string; l1?: number; l2?: number; children?: React.ReactNode }> = ({
  sx,
  sy,
  a1,
  a2,
  shirt,
  l1 = 72,
  l2 = 66,
  children,
}) => {
  const r1 = (a1 * Math.PI) / 180;
  const ex = sx + Math.cos(r1) * l1;
  const ey = sy + Math.sin(r1) * l1;
  const r2 = ((a1 + a2) * Math.PI) / 180;
  const hx = ex + Math.cos(r2) * l2;
  const hy = ey + Math.sin(r2) * l2;
  return (
    <g>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={OUTLINE} strokeWidth={34} strokeLinecap="round" />
      <line x1={ex} y1={ey} x2={hx} y2={hy} stroke={OUTLINE} strokeWidth={26} strokeLinecap="round" />
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={shirt} strokeWidth={24} strokeLinecap="round" />
      <line x1={ex} y1={ey} x2={hx} y2={hy} stroke={SKIN} strokeWidth={16} strokeLinecap="round" />
      <circle cx={hx} cy={hy} r={19} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      {children ? <g transform={`translate(${hx} ${hy})`}>{children}</g> : null}
    </g>
  );
};

const Phone: React.FC = () => (
  <g transform="rotate(-15)">
    <rect x={-16} y={-34} width={32} height={62} rx={8} fill="#3b3b4f" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-10} y={-26} width={20} height={42} rx={3} fill="#8fd3ff" />
  </g>
);

// Belden yukarı konuşan karakter; (0,0) gövdenin alt ortası, kafa merkezi (0,-200)
const Talker: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  phone?: boolean;
  gesture?: number; // 0: hareketsiz, 1: kocaman hareketler
  eyesClosed?: boolean;
  mood?: "talk" | "happy" | "calm";
  flip?: boolean;
  delay?: number;
  phase?: number;
}> = ({ x, y, scale = 1, shirt = PINK, hair = "#4a2f1d", phone = false, gesture = 1, eyesClosed = false, mood = "talk", flip = false, delay = 0, phase = 0 }) => {
  const frame = useCurrentFrame() + phase;
  const a = useAppear(delay);
  const g = gesture;
  const sway = Math.sin(frame / 18) * 2;
  const blink = frame % 90 > 85 ? 0.15 : 1;
  // Serbest kol (izleyiciye göre sol): g büyüdükçe kol havaya kalkar
  const gb = Math.min(1, g);
  const la1 = 110 + gb * 95 + Math.sin(frame / 7) * 35 * g;
  const la2 = 35 * gb + Math.sin(frame / 5 + 1) * 35 * g;
  // Diğer kol: telefon kulakta ya da o da hareket ediyor
  const ra1 = phone ? -40 : 70 - gb * 95 - Math.sin(frame / 6 + 2) * 35 * g;
  const ra2 = phone ? -125 : -35 * gb - Math.sin(frame / 4.5) * 35 * g;
  return (
    <g transform={`${place(x, y, scale * a)} scale(${flip ? -1 : 1} 1)`}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${sway} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {eyesClosed ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round">
            <path d="M -38 -204 Q -26 -196 -14 -204" />
            <path d="M 14 -204 Q 26 -196 38 -204" />
          </g>
        ) : (
          <g transform={`translate(0 ${-206 * (1 - blink)}) scale(1 ${blink})`}>
            <circle cx={-26} cy={-206} r={8} fill={OUTLINE} />
            <circle cx={26} cy={-206} r={8} fill={OUTLINE} />
          </g>
        )}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mood === "talk" ? <ellipse cx={0} cy={-160} rx={18} ry={5 + Math.abs(Math.sin(frame / 3)) * 11} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
        {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mood === "calm" ? <path d="M -20 -162 Q 0 -150 20 -162" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        <circle cx={-46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
      </g>
      <Arm sx={-72} sy={-100} a1={la1} a2={la2} shirt={shirt} />
      <Arm sx={72} sy={-100} a1={ra1} a2={ra2} shirt={shirt}>
        {phone ? <Phone /> : null}
      </Arm>
    </g>
  );
};

// Hareket çizgileri (el sallanırken)
const Swoosh: React.FC<{ x: number; y: number; flip?: boolean }> = ({ x, y, flip = false }) => {
  const w = useWave(20, 1);
  return (
    <g transform={`${place(x, y)} scale(${flip ? -1 : 1} 1)`} opacity={0.5 + w * 0.4} fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round">
      <path d="M 0 -30 Q -24 0 0 30" />
      <path d="M -22 -40 Q -52 0 -22 40" />
    </g>
  );
};

const Card: React.FC<{ x: number; y: number; w: number; h: number; fill?: string }> = ({ x, y, w, h, fill = "#fff" }) => (
  <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={22} fill={fill} stroke={OUTLINE} strokeWidth={5} />
);

const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string }> = ({ x, y, text, size = 30, color = OUTLINE }) => (
  <text x={x} y={y} fontFamily={uiFont} fontWeight={900} fontSize={size} textAnchor="middle" fill={color}>
    {text}
  </text>
);

// Çarpı işaretli göz (görmüyor)
const NoEye: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -60 0 Q 0 -50 60 0 Q 0 50 -60 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={0} cy={0} r={18} fill={OUTLINE} />
      <line x1={-55} y1={-45} x2={55} y2={45} stroke={DEEPPINK} strokeWidth={12} strokeLinecap="round" />
    </g>
  );
};

// 1) Kanca: telefonla konuşurken eller havada
const PhoneHands: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  return (
    <g>
      <Paper />
      <circle cx={430} cy={300} r={240} fill="#ffd6e3" />
      <Talker x={430} y={560} scale={1.35} phone gesture={1.1} />
      <Swoosh x={180} y={250} />
      <Sparkles points={[[150, 150], [700, 140], [760, 330]]} />
      <BigText x={740} y={210} text="?!" size={90} color={PINK} delay={d(0.2)} />
      <NoEye x={730} y={450} scale={0.9} delay={d(0.55)} />
    </g>
  );
};

// 2) Kimin için? Karşındaki + senin beynin
const WhoFor: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const a1 = useProgress(d(0.05), d(0.2));
  const a2 = useProgress(d(0.3), d(0.45));
  return (
    <g>
      <Paper />
      <Talker x={210} y={560} scale={1.05} gesture={1} />
      <Card x={680} y={130} w={360} h={110} />
      <Label x={680} y={142} text="KARŞINDAKİ İÇİN" size={32} />
      <Arrow from={[340, 230]} to={[490, 150]} progress={a1} color={BLUE} />
      <g opacity={a2 > 0 ? 1 : 0}>
        <Brain x={660} y={360} scale={0.85} delay={d(0.3)} />
      </g>
      <Arrow from={[340, 330]} to={[540, 360]} progress={a2} color={DEEPPINK} />
      <Chip x={660} y={500} text="SENİN İÇİN DE!" delay={d(0.42)} />
    </g>
  );
};

// Sıklık çubuğu
const Bar: React.FC<{ x: number; y: number; h: number; p: number; color: string; label: string }> = ({ x, y, h, p, color, label }) => (
  <g>
    <rect x={x - 40} y={y - h} width={80} height={h} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
    <rect x={x - 40} y={y - h * p} width={80} height={h * p} rx={10} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <Label x={x} y={y + 36} text={label} size={24} />
  </g>
);

// 3) Telefon deneyi: yüz yüze = telefon
const PhoneTest: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const p = useProgress(d(0.35), d(0.75));
  return (
    <g>
      <Paper />
      <Card x={235} y={180} w={420} h={300} fill="#ffe3ec" />
      <Card x={665} y={180} w={420} h={300} fill="#e8f1ff" />
      <Label x={235} y={70} text="YÜZ YÜZE" size={30} />
      <Label x={665} y={70} text="TELEFONDA" size={30} />
      <Talker x={150} y={325} scale={0.6} gesture={1} />
      <Talker x={320} y={325} scale={0.6} gesture={0.8} flip shirt={TEAL} mood="calm" phase={20} />
      <Talker x={590} y={325} scale={0.6} gesture={1} phone />
      <rect x={658} y={90} width={14} height={236} fill={GREY} stroke={OUTLINE} strokeWidth={4} />
      <Talker x={750} y={325} scale={0.6} gesture={0.8} phone flip shirt={TEAL} mood="calm" phase={20} />
      <Bar x={235} y={500} h={110} p={0.8 * p} color={PINK} label="" />
      <Bar x={665} y={500} h={110} p={0.8 * p} color={BLUE} label="" />
      <BigText x={450} y={450} text="=" size={110} color={YELLOWC} delay={d(0.7)} />
    </g>
  );
};

// Kayıt cihazı (dönen makaralar)
const Recorder: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => {
  const frame = useCurrentFrame();
  const rot = frame * 6;
  return (
    <g transform={place(x, y, scale)}>
      <rect x={-130} y={-80} width={260} height={160} rx={18} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
      <rect x={-100} y={-55} width={200} height={70} rx={10} fill="#f6f1ff" stroke={OUTLINE} strokeWidth={4} />
      {[-50, 50].map((cx) => (
        <g key={cx} transform={`translate(${cx} -20) rotate(${rot})`}>
          <circle r={24} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          {[0, 120, 240].map((r) => (
            <rect key={r} x={-4} y={-22} width={8} height={14} fill={OUTLINE} transform={`rotate(${r})`} />
          ))}
        </g>
      ))}
      <circle cx={-80} cy={50} r={12} fill="#e8434b" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-50} y={40} width={130} height={18} rx={9} fill="#5b48b8" stroke={OUTLINE} strokeWidth={3} />
    </g>
  );
};

// 4) Kayıt cihazına konuşunca küçücük hareketler
const TapeRecorder: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  return (
    <g>
      <Paper />
      <rect x={0} y={470} width={900} height={90} fill="#f7c6d6" stroke={OUTLINE} strokeWidth={5} />
      <Talker x={260} y={560} scale={1.15} gesture={0.12} shirt={ORANGE} />
      <Recorder x={650} y={390} scale={1.1} />
      <Chip x={650} y={190} text="KÜÇÜCÜK!" delay={d(0.4)} />
      <Label x={650} y={110} text="TEK BAŞINA" size={34} color={DEEPPINK} />
    </g>
  );
};

// 5) Doğuştan görme engelli konuşmacı da el kullanıyor
const BlindSpeakers: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  return (
    <g>
      <Paper />
      <circle cx={450} cy={300} r={230} fill="#ffd6e3" />
      <Talker x={450} y={540} scale={1.25} gesture={1} eyesClosed shirt={PURPLE} />
      <Swoosh x={230} y={260} />
      <Swoosh x={680} y={300} flip />
      <NamePlate x={450} y={60} text="DOĞUŞTAN GÖRME ENGELLİ" delay={d(0.15)} />
      <Sparkles points={[[200, 140], [720, 150]]} />
    </g>
  );
};

// 6) Dinleyici de görmüyor: kimseden öğrenmedik
const NoModel: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  return (
    <g>
      <Paper />
      <Talker x={230} y={560} scale={0.95} gesture={1} eyesClosed shirt={PURPLE} />
      <Talker x={670} y={560} scale={0.95} gesture={0.5} eyesClosed flip shirt={TEAL} mood="calm" phase={30} />
      <NamePlate x={670} y={70} text="DİNLEYEN DE GÖRMÜYOR" delay={d(0.1)} />
      <NoEye x={450} y={190} scale={0.9} delay={d(0.3)} />
      <Chip x={450} y={310} text="TAKLİT YOK!" delay={d(0.55)} />
    </g>
  );
};

// 7) Türkçe konuşanların el hareketleri: biçim ve yön ayrı ayrı
const TurkishHands: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const frame = useCurrentFrame();
  const t = (frame % 60) / 60;
  const bx = 90 + t * 260;
  const by = 160 + t * 170;
  const a1 = useAppear(d(0.12));
  const a2 = useAppear(d(0.28));
  return (
    <g>
      <Paper />
      <Card x={230} y={280} w={400} h={440} fill="#fff" />
      <path d="M 60 170 L 400 380 L 60 380 Z" fill="#9fe0b0" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <g transform={`translate(${bx} ${by - 30}) rotate(${frame * 12})`}>
        <circle r={28} fill={ORANGE} stroke={OUTLINE} strokeWidth={5} />
        <line x1={-28} y1={0} x2={28} y2={0} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Label x={230} y={450} text="YUVARLANARAK" size={30} color={DEEPPINK} />
      <Label x={230} y={485} text="AŞAĞI İNDİ" size={30} color={BLUE} />
      <g transform={place(660, 160, a1)}>
        <Card x={0} y={0} w={380} h={130} />
        <g transform={`translate(-120 0) rotate(${frame * 8})`}>
          <circle r={34} fill="none" stroke={DEEPPINK} strokeWidth={9} strokeDasharray="160 60" />
        </g>
        <Label x={50} y={12} text="1. YUVARLAN" size={32} color={DEEPPINK} />
      </g>
      <g transform={place(660, 330, a2)}>
        <Card x={0} y={0} w={380} h={130} />
        <path d="M -120 -36 L -120 30 M -144 8 L -120 36 L -96 8" fill="none" stroke={BLUE} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
        <Label x={50} y={12} text="2. İN" size={32} color={BLUE} />
      </g>
      <Chip x={660} y={480} text="GÖREN = GÖRMEYEN" delay={d(0.42)} />
    </g>
  );
};

// 8) Matematik anlatırken listeyi aklında tutmak
const MathMemory: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const check = useAppear(d(0.7));
  return (
    <g>
      <Paper />
      <rect x={300} y={40} width={560} height={260} rx={14} fill="#2f5d50" stroke={OUTLINE} strokeWidth={6} />
      <text x={580} y={155} fontFamily={uiFont} fontWeight={800} fontSize={50} textAnchor="middle" fill="#fff">
        x² + 5x + 6
      </text>
      <text x={580} y={230} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={YELLOWC}>
        = (x+2)(x+3)
      </text>
      <Talker x={170} y={560} scale={1.05} gesture={1} shirt={TEAL} />
      <ThoughtBubble x={600} y={420} r={75} delay={d(0.25)}>
        <text x={0} y={14} fontFamily={uiFont} fontWeight={900} fontSize={38} textAnchor="middle" fill={OUTLINE}>
          K · M · R
        </text>
      </ThoughtBubble>
      <g transform={place(780, 420, check)}>
        <circle r={44} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -20 0 L -5 16 L 22 -16" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
};

// 9) Yük hafifliyor
const LightLoad: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const p = useProgress(d(0.2), d(0.7));
  const s = 1 - p * 0.55;
  const lift = p * 40;
  const wave = useWave(24, 10);
  return (
    <g>
      <Paper />
      <circle cx={450} cy={330} r={200} fill="#ffd6e3" />
      <Brain x={450} y={400} scale={1.1} mood={p > 0.5 ? "happy" : "confused"} />
      <g transform={place(450, 230 - lift, s)}>
        <path d="M -110 60 L -80 -50 L 80 -50 L 110 60 Z" fill="#6b6b7a" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-30} y={-80} width={60} height={34} rx={14} fill="none" stroke={OUTLINE} strokeWidth={10} />
        <Label x={0} y={30} text="YÜK" size={46} color="#fff" />
      </g>
      {/* iki yardımcı el */}
      {[-1, 1].map((k) => (
        <g key={k} transform={place(450 + k * (200 - p * 40), 260 - lift + wave * k, 1)}>
          <circle r={34} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
          <path d={`M ${-k * 20} -20 L ${-k * 40} -46`} stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
        </g>
      ))}
      <Chip x={450} y={520} text="DAHA HAFİF!" delay={d(0.6)} />
    </g>
  );
};

// Dönen dişli
const Gear: React.FC<{ x: number; y: number; r: number; speed: number; color: string }> = ({ x, y, r, speed, color }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y}) rotate(${frame * speed})`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={-r * 0.18} y={-r * 1.25} width={r * 0.36} height={r * 0.5} fill={color} stroke={OUTLINE} strokeWidth={4} transform={`rotate(${i * 45})`} />
      ))}
      <circle r={r} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <circle r={r * 0.35} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

// 10) Tuhaflık değil, beyninin bir aracı
const ToolHands: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  return (
    <g>
      <Paper />
      <Talker x={250} y={560} scale={1.2} gesture={1} mood="happy" />
      <ThoughtBubble x={640} y={190} r={120} delay={d(0.1)}>
        <Gear x={-40} y={-15} r={38} speed={4} color={PINK} />
        <Gear x={45} y={30} r={30} speed={-5} color={BLUE} />
      </ThoughtBubble>
      <Chip x={640} y={480} text="DÜŞÜNME ARACI" delay={d(0.45)} />
    </g>
  );
};

// 11) Kapanış: yorum ve etiket
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const bubbles = ["TELEFONDA", "YOL TARİF EDERKEN", "HEYECANLANINCA"];
  const a = [useAppear(d(0.15)), useAppear(d(0.3)), useAppear(d(0.45))];
  return (
    <g>
      <Paper />
      <Talker x={200} y={560} scale={1} phone gesture={1} />
      {bubbles.map((b, i) => (
        <g key={b} transform={place(620, 110 + i * 115, a[i])}>
          <rect x={-220} y={-40} width={440} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={i === 1 ? DEEPPINK : OUTLINE}>
            {b}
          </text>
        </g>
      ))}
      <Chip x={620} y={490} text="@ETİKETLE" delay={d(0.6)} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  PhoneHands,
  WhoFor,
  PhoneTest,
  TapeRecorder,
  BlindSpeakers,
  NoModel,
  TurkishHands,
  MathMemory,
  LightLoad,
  ToolHands,
  YourTurn,
};
