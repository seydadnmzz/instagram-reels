// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Güneşe bakınca hapşırmak / fotik hapşırma refleksi (2026-11-12-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  INK,
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
const PAPER = "#e8f8f6";
const SKY = "#fff6cf";
const SKIN = "#f2c79a";
const TEAL = "#17c3a5";
const BLUE = "#0f8fb3";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff9a3d";
const DARK = "#1d3340";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Dönen ışınlı güneş
const Sun: React.FC<{ x: number; y: number; r?: number; delay?: number; glow?: number }> = ({ x, y, r = 60, delay = 0, glow = 1 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a, frame * 0.6)}>
      <circle r={r * (1.7 + 0.15 * Math.sin(frame / 6))} fill="#fff3a0" opacity={0.55 * glow} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-6} y={-r - 34} width={12} height={24} rx={6} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} transform={`rotate(${i * 30})`} />
      ))}
      <circle r={r} fill={YELLOW} stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.25} fill="#fff7c2" />
    </g>
  );
};

type Mood = "calm" | "squint" | "sneeze" | "closed" | "happy" | "wow";

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

// Hapşırık patlaması: damlacıklar + "HAPŞU!" yazısı. progress 0..1
const SneezeBurst: React.FC<{ x: number; y: number; progress: number; dir?: number; size?: number; text?: string }> = ({
  x,
  y,
  progress,
  dir = 0,
  size = 1,
  text = "HAPŞU!",
}) => {
  if (progress <= 0) return null;
  const p = Math.min(1, progress);
  const pop = Math.min(1, p * 4);
  return (
    <g transform={place(x, y, size)}>
      {Array.from({ length: 11 }).map((_, i) => {
        const ang = ((dir - 40 + (i * 80) / 10) * Math.PI) / 180;
        const dist = 30 + p * (110 + (i % 3) * 30);
        return <circle key={i} cx={Math.cos(ang) * dist} cy={Math.sin(ang) * dist} r={6 - (i % 3)} fill="#bfe9ff" stroke={OUTLINE} strokeWidth={2} opacity={1 - p * 0.8} />;
      })}
      <g transform={place(Math.cos((dir * Math.PI) / 180) * 120, Math.sin((dir * Math.PI) / 180) * 120 - 50, pop, -8)}>
        <path d="M -110 -10 L -80 -50 L -40 -30 L 0 -66 L 30 -32 L 80 -54 L 90 -14 L 124 6 L 84 30 L 96 64 L 40 46 L 0 74 L -30 40 L -86 56 L -80 20 L -120 14 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <text x={0} y={14} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill={RED}>
          {text}
        </text>
      </g>
    </g>
  );
};

// Kırmızı çarpı
const Cross: React.FC<{ x: number; y: number; size?: number; delay?: number }> = ({ x, y, size = 60, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)} stroke={RED} strokeWidth={16} strokeLinecap="round">
      <line x1={-size} y1={-size} x2={size} y2={size} />
      <line x1={size} y1={-size} x2={-size} y2={size} />
    </g>
  );
};

// 1) Karanlıktan güneşe çık… HAPŞU!
const SunSneeze: Visual = ({ durationInFrames }) => {
  const walkEnd = Math.round(durationInFrames * 0.35);
  const sneezeAt = Math.round(durationInFrames * 0.55);
  const walk = useProgress(4, walkEnd);
  const burst = useProgress(sneezeAt, sneezeAt + 24);
  const frame = useCurrentFrame();
  const mood: Mood = frame >= sneezeAt ? "sneeze" : frame > walkEnd ? "squint" : "calm";
  const x = 170 + walk * 300;
  return (
    <g>
      <rect width={900} height={560} fill={SKY} />
      <rect y={470} width={900} height={90} fill="#bfe6a8" stroke={OUTLINE} strokeWidth={5} />
      {/* Karanlık bina içi */}
      <rect x={0} y={0} width={300} height={560} fill={DARK} stroke={OUTLINE} strokeWidth={6} />
      <rect x={20} y={40} width={260} height={430} fill="#0e1e27" />
      <Sun x={760} y={120} r={62} />
      <Bust x={x} y={540} scale={0.95} mood={mood} />
      <SneezeBurst x={x + 60} y={340} progress={burst} dir={-10} />
      {frame > walkEnd && frame < sneezeAt ? <Sparkles points={[[x - 90, 230], [x + 90, 210]]} /> : null}
    </g>
  );
};

// Burun ikonu
const Nose: React.FC<{ x: number; y: number; scale?: number; delay?: number; wiggle?: number }> = ({ x, y, scale = 1, delay = 0, wiggle = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a, Math.sin(frame * 1.2) * 6 * wiggle)}>
      <path d="M -10 -80 Q -20 -10 -50 30 Q -60 60 -25 60 Q -12 72 0 62 Q 12 72 25 60 Q 60 60 50 30 Q 20 -10 10 -80 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <ellipse cx={-18} cy={50} rx={8} ry={5} fill="#7a4a35" />
      <ellipse cx={18} cy={50} rx={8} ry={5} fill="#7a4a35" />
    </g>
  );
};

// Göz ikonu
const Eye: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const look = Math.sin(frame / 12) * 8;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -80 0 Q 0 -70 80 0 Q 0 70 -80 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={look} cy={0} r={28} fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={look} cy={0} r={13} fill={OUTLINE} />
      <circle cx={look - 9} cy={-9} r={6} fill="#fff" />
    </g>
  );
};

// 2) Adı: fotik hapşırma = ışık + burun
const NameTag: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  return (
    <g>
      <Paper />
      <Sun x={150} y={220} r={55} delay={2} />
      <BigText x={295} y={220} text="+" size={100} color={TEAL} delay={d * 0.5} />
      <Nose x={430} y={210} scale={1.1} delay={d * 0.7} wiggle={1} />
      <BigText x={565} y={220} text="=" size={100} color={TEAL} delay={d} />
      <SneezeBurst x={650} y={250} progress={useProgress(d + 6, d + 30)} dir={0} size={1} />
      <Chip x={450} y={460} text="FOTİK = IŞIKLA İLGİLİ" dark delay={d + 24} />
    </g>
  );
};

// 3) Her dört kişiden biri
const OneInFour: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.45);
  const frame = useCurrentFrame();
  const shirts = [BLUE, PURPLE, ORANGE, PINK];
  const hairs = ["#4a2f1d", "#1f1f24", "#c9822f", "#7a3b1d"];
  return (
    <g>
      <Paper />
      <Sun x={820} y={70} r={36} />
      {[0, 1, 2, 3].map((i) => (
        <Bust key={i} x={150 + i * 200} y={420} scale={0.62} shirt={shirts[i]} hair={hairs[i]} mood={i === 2 && frame >= d ? "sneeze" : "calm"} delay={4 + i * 6} />
      ))}
      <SneezeBurst x={590} y={290} progress={useProgress(d, d + 24)} dir={-60} size={0.7} />
      <rect x={60} y={440} width={780} height={6} rx={3} fill="#9fd9cf" />
      <Chip x={450} y={500} text="HER 4 KİŞİDEN 1'İ" delay={d + 14} />
    </g>
  );
};

// Termometre
const Thermo: React.FC<{ x: number; y: number; level: number }> = ({ x, y, level }) => (
  <g transform={place(x, y)}>
    <rect x={-14} y={-80} width={28} height={110} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-6} y={20 - 90 * level} width={12} height={10 + 90 * level} fill={RED} />
    <circle cx={0} cy={40} r={22} fill={RED} stroke={OUTLINE} strokeWidth={5} />
  </g>
);

// 4) Aristoteles: güneşin sıcaklığı mı?
const AristotleHeat: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.3);
  const heat = useProgress(d, d + 40);
  return (
    <g>
      <Paper />
      {/* Sütunlar */}
      {[60, 840].map((cx) => (
        <g key={cx}>
          <rect x={cx - 34} y={80} width={68} height={400} fill="#f4f1ea" stroke={OUTLINE} strokeWidth={5} />
          <rect x={cx - 48} y={60} width={96} height={26} fill="#e6e1d6" stroke={OUTLINE} strokeWidth={5} />
          {[0, 1, 2].map((k) => (
            <line key={k} x1={cx - 14 + k * 14} y1={96} x2={cx - 14 + k * 14} y2={470} stroke="#cfc8b8" strokeWidth={4} />
          ))}
        </g>
      ))}
      <rect y={480} width={900} height={80} fill="#e6e1d6" stroke={OUTLINE} strokeWidth={5} />
      <Sun x={650} y={130} r={55} />
      {/* Sıcaklık dalgaları */}
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 12) % 36) / 36;
        return (
          <path
            key={i}
            d="M 0 0 Q 15 -12 30 0 Q 45 12 60 0"
            transform={`translate(${560 - t * 160} ${190 + i * 40 + t * 40}) rotate(20)`}
            fill="none"
            stroke={ORANGE}
            strokeWidth={11}
            strokeLinecap="round"
            opacity={heat * (1 - t)}
          />
        );
      })}
      <Bust x={300} y={480} scale={0.9} shirt="#f4f1ea" hair="#9a9a9a" beard mood="calm" />
      <NamePlate x={300} y={520} text="ARİSTOTELES" delay={6} />
      <Thermo x={560} y={390} level={heat} />
      <QuestionMark x={470} y={110} size={80} delay={d + 20} />
      <Chip x={720} y={300} text="SICAKLIK?" delay={d + 30} />
    </g>
  );
};

// 5) Bacon: gözler kapalı → hapşırık yok
const BaconEyes: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.4);
  const frame = useCurrentFrame();
  return (
    <g>
      <rect width={900} height={560} fill={SKY} />
      <rect y={480} width={900} height={80} fill="#bfe6a8" stroke={OUTLINE} strokeWidth={5} />
      <Sun x={760} y={110} r={55} />
      <Bust x={330} y={500} scale={0.95} shirt="#3d3a5c" hair="#6b4a2b" beard mood={frame < d * 1.5 ? "closed" : "wow"} />
      {/* Gözlerden sızan ışık yok: kapak */}
      <g opacity={useAppear(d * 0.3)}>
        <SneezeBurst x={420} y={300} progress={frame > d * 0.5 ? 0.35 : 0} dir={-20} size={0.8} />
      </g>
      <Cross x={540} y={225} size={70} delay={d * 0.6} />
      <NamePlate x={330} y={530} text="FRANCIS BACON" delay={4} />
      <Chip x={700} y={330} text="GÖZ KAPALI" dark delay={d * 0.3} />
      <Chip x={700} y={410} text="SUÇLU: IŞIK!" delay={d * 1.5} />
      {frame > d * 1.5 ? <Sparkles points={[[600, 200], [820, 250], [560, 470]]} /> : null}
    </g>
  );
};

// Bir yol boyunca hareket eden sinyal
const Pulse: React.FC<{ path: [number, number][]; t: number; color: string }> = ({ path, t, color }) => {
  if (t <= 0 || t >= 1) return null;
  const seg = t * (path.length - 1);
  const i = Math.min(path.length - 2, Math.floor(seg));
  const f = seg - i;
  const x = path[i][0] + (path[i + 1][0] - path[i][0]) * f;
  const y = path[i][1] + (path[i + 1][1] - path[i][1]) * f;
  return (
    <g>
      <circle cx={x} cy={y} r={22} fill={color} opacity={0.35} />
      <circle cx={x} cy={y} r={12} fill={color} stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

const polyline = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");

// 6) Görme siniri → burun siniri: sinyal sıçrıyor
const NerveCross: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const a = Math.round(durationInFrames * 0.15);
  const b = Math.round(durationInFrames * 0.45);
  const c = Math.round(durationInFrames * 0.7);
  const optic: [number, number][] = [[230, 330], [320, 250], [430, 200]];
  const trig: [number, number][] = [[470, 200], [590, 260], [680, 320]];
  const t1 = useProgress(a, b);
  const t2 = useProgress(b + 6, c);
  const jumped = frame >= b;
  return (
    <g>
      <Paper />
      <Sun x={80} y={90} r={40} />
      <Brain x={450} y={150} scale={0.8} mood={jumped ? "confused" : "happy"} />
      <path d={polyline(optic)} fill="none" stroke={OUTLINE} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
      <path d={polyline(optic)} fill="none" stroke={YELLOW} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d={polyline(trig)} fill="none" stroke={OUTLINE} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
      <path d={polyline(trig)} fill="none" stroke={PINK} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <Eye x={200} y={360} scale={0.9} />
      <Nose x={700} y={360} scale={0.9} wiggle={frame > c ? 1 : 0} />
      {/* Işık ışınları göze */}
      <Arrow from={[100, 140]} to={[170, 300]} progress={useProgress(2, a)} color={ORANGE} />
      <Pulse path={optic} t={t1} color={YELLOW} />
      <Pulse path={trig} t={t2} color={PINK} />
      {jumped && frame < b + 20 ? <Sparkles points={[[450, 190], [420, 230], [480, 230]]} /> : null}
      <SneezeBurst x={760} y={380} progress={useProgress(c, c + 24)} dir={-30} size={0.75} />
      <Chip x={200} y={480} text="GÖRME SİNİRİ" delay={a} />
      <Chip x={680} y={490} text="BURUN SİNİRİ" dark delay={b} />
    </g>
  );
};

// Beyin dalgası monitörü
const Monitor: React.FC<{ x: number; y: number; amp: number; label: string; delay?: number; color?: string }> = ({ x, y, amp, label, delay = 0, color = TEAL }) => {
  // Genişlik 340, yükseklik 140
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const pts: string[] = [];
  for (let i = 0; i <= 50; i++) {
    const px = -150 + i * 6;
    const py = Math.sin((i + frame) / 3) * 8 + Math.sin((i * 1.7 + frame) / 2) * amp * (i % 15 < 6 ? 1 : 0.3);
    pts.push(`${i ? "L" : "M"} ${px} ${py}`);
  }
  return (
    <g transform={place(x, y, a)}>
      <rect x={-170} y={-70} width={340} height={140} rx={16} fill="#13232c" stroke={OUTLINE} strokeWidth={6} />
      <path d={pts.join(" ")} fill="none" stroke={color} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-90} y={76} width={180} height={38} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <text x={0} y={103} fontFamily={uiFont} fontWeight={800} fontSize={22} textAnchor="middle" fill={INK}>
        {label}
      </text>
    </g>
  );
};

// 7) Zürih: görme merkezi daha güçlü tepki
const ZurichEEG: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.3);
  const flash = frame % 24 < 8 ? 1 : 0.25;
  const grow = useProgress(d, d + 30);
  return (
    <g>
      <Paper />
      {/* Yanıp sönen lamba */}
      <g transform={place(800, 280)}>
        <circle r={70} fill="#fff7c2" opacity={flash * 0.8} />
        <circle r={34} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} opacity={0.6 + flash * 0.4} />
        <rect x={-14} y={-52} width={28} height={20} fill="#c9ced6" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Bust x={120} y={250} scale={0.5} shirt={PINK} mood="squint" eeg />
      <Monitor x={430} y={140} amp={8 + 34 * grow} label="HAPŞIRAN" color={YELLOW} delay={6} />
      <Bust x={120} y={530} scale={0.5} shirt={BLUE} hair="#1f1f24" mood="calm" eeg delay={10} />
      <Monitor x={430} y={400} amp={8} label="DİĞERLERİ" delay={14} />
      <Chip x={430} y={295} text="GÖRME MERKEZİ" dark delay={d + 20} />
      <Chip x={770} y={140} text="GÜÇLÜ!" delay={d + 30} />
      <Chip x={770} y={420} text="NORMAL" delay={d + 36} />
    </g>
  );
};

// 8) Ailede geçiyor, sayı hep aynı
const FamilyTree: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.15);
  const step = Math.round(durationInFrames * 0.2);
  const people = [
    { x: 150, scale: 0.6, shirt: PURPLE, hair: "#d8d8d8", label: "BÜYÜKANNE" },
    { x: 450, scale: 0.6, shirt: BLUE, hair: "#4a2f1d", label: "ANNE" },
    { x: 750, scale: 0.5, shirt: ORANGE, hair: "#4a2f1d", label: "SEN" },
  ];
  return (
    <g>
      <Paper />
      <Sun x={450} y={60} r={34} />
      {people.map((p, i) => {
        const at = d + i * step;
        const s = frame >= at && frame < at + step * 0.8;
        return (
          <g key={i}>
            <Bust x={p.x} y={420} scale={p.scale} shirt={p.shirt} hair={p.hair} mood={s ? "sneeze" : "calm"} delay={2 + i * 6} />
            <NamePlate x={p.x} y={450} text={p.label} delay={4 + i * 6} />
          </g>
        );
      })}
      {people.map((p, i) => (
        <SneezeBurst key={i} x={p.x + 40} y={260} progress={useProgress(d + i * step, d + i * step + 20)} dir={-50} size={0.55} text="HAPŞU ×2" />
      ))}
      <Arrow from={[250, 330]} to={[340, 330]} progress={useProgress(d + step - 10, d + step)} color={INK} />
      <Arrow from={[550, 330]} to={[650, 330]} progress={useProgress(d + 2 * step - 10, d + 2 * step)} color={INK} />
      <Chip x={450} y={520} text="GENELDE 2-3 KEZ" delay={d + 3 * step} />
    </g>
  );
};

// 9) Renk değil, ani parlama
const SuddenLight: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.5);
  const colors = [RED, "#3ccf6b", BLUE, PURPLE];
  const col = colors[Math.floor(frame / 12) % colors.length];
  const bright = frame >= d;
  const flash = useProgress(d, d + 6);
  return (
    <g>
      <rect width={900} height={560} fill={bright ? "#fffbe6" : "#28404d"} />
      {/* Ampul */}
      <g transform={place(250, 220)}>
        {bright ? (
          <g opacity={flash}>
            <circle r={150} fill="#fff7c2" />
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={i} x={-6} y={-150} width={12} height={40} rx={6} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} transform={`rotate(${i * 36 + frame})`} />
            ))}
          </g>
        ) : (
          <circle r={110} fill={col} opacity={0.3} />
        )}
        <circle r={70} fill={bright ? "#fff7c2" : col} stroke={OUTLINE} strokeWidth={6} />
        <rect x={-30} y={64} width={60} height={46} rx={8} fill="#c9ced6" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Bust x={650} y={540} scale={0.85} shirt={TEAL} mood={bright ? "sneeze" : "calm"} />
      <SneezeBurst x={590} y={330} progress={useProgress(d + 4, d + 28)} dir={-150} size={0.75} />
      {!bright ? <Chip x={250} y={470} text="RENK DEĞİL" delay={8} /> : <Chip x={250} y={470} text="ANİ PARLAMA!" dark />}
    </g>
  );
};

// Araba (sağa bakar), (0,0) tekerlek tabanı ortası
const Car: React.FC<{ x: number; y: number; scale?: number; rot?: number }> = ({ x, y, scale = 1, rot = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, scale, rot)}>
      <path d="M -130 -30 L -120 -70 L -60 -76 L -30 -120 L 60 -120 L 100 -76 L 140 -66 L 140 -30 Z" fill={RED} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -20 -110 L 52 -110 L 82 -78 L -42 -78 Z" fill="#cfefff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      <circle cx={30} cy={-92} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
      {[-80, 85].map((cx) => (
        <g key={cx} transform={`translate(${cx} -26) rotate(${frame * 12})`}>
          <circle r={28} fill={OUTLINE} />
          <circle r={12} fill="#c9ced6" />
          <rect x={-2} y={-12} width={4} height={24} fill={OUTLINE} />
        </g>
      ))}
      <circle cx={136} cy={-50} r={8} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
    </g>
  );
};

// 10) Tünel çıkışı: dikkat!
const TunnelCar: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const exit = Math.round(durationInFrames * 0.45);
  const move = useProgress(0, exit + 20);
  const wob = frame > exit ? Math.sin(frame / 3) * 4 * Math.max(0, 1 - (frame - exit) / 40) : 0;
  const cx = 120 + move * 420;
  return (
    <g>
      <rect width={900} height={560} fill={SKY} />
      <Sun x={790} y={100} r={55} />
      <rect y={420} width={900} height={140} fill="#5d6670" stroke={OUTLINE} strokeWidth={5} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={((((i * 200 - frame * 6) % 1000) + 1000) % 1000) - 100} y={480} width={90} height={12} fill="#fff" />
      ))}
      {/* Tünel */}
      <rect x={-10} y={-10} width={310} height={430} fill="#8a8f96" stroke={OUTLINE} strokeWidth={6} />
      {[0, 1, 2, 3].map((k) => (
        <line key={k} x1={0} y1={60 + k * 50} x2={300} y2={60 + k * 50} stroke="#767b82" strokeWidth={4} />
      ))}
      <path d="M 20 420 L 20 300 Q 20 160 150 160 Q 280 160 280 420 Z" fill="#14202a" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <Car x={cx} y={470} scale={1} rot={wob} />
      <SneezeBurst x={cx + 40} y={360} progress={useProgress(exit, exit + 24)} dir={-40} size={0.8} />
      <g transform={place(760, 330, useAppear(exit + 18))}>
        <path d="M 0 -70 L 70 50 L -70 50 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-6} y={-30} width={12} height={46} rx={4} fill={OUTLINE} />
        <circle cx={0} cy={32} r={7} fill={OUTLINE} />
      </g>
      <Chip x={700} y={510} text="DİKKAT!" dark delay={exit + 26} />
    </g>
  );
};

// 11) Sen kaç kez?
const YourCount: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const w = useWave(40, 4);
  const counts = ["1", "2", "3+"];
  return (
    <g>
      <rect width={900} height={560} fill={SKY} />
      <Sun x={110} y={90} r={45} />
      <Bust x={260} y={540} scale={0.95} mood="happy" />
      {counts.map((c, i) => (
        <g key={i} transform={place(660, 110 + i * 130, useAppear(d + i * 10), i % 2 ? w : -w)}>
          <rect x={-170} y={-45} width={340} height={90} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <path d="M -150 40 L -170 70 L -120 44 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <text x={-110} y={16} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={[BLUE, PINK, ORANGE][i]}>
            {c}
          </text>
          <text x={40} y={12} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
            HAPŞU!
          </text>
        </g>
      ))}
      <QuestionMark x={470} y={130} size={90} delay={d + 30} />
      <Chip x={660} y={510} text="YORUMLARA YAZ!" dark delay={d + 36} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  SunSneeze,
  NameTag,
  OneInFour,
  AristotleHeat,
  BaconEyes,
  NerveCross,
  ZurichEEG,
  FamilyTree,
  SuddenLight,
  TunnelCar,
  YourCount,
};
