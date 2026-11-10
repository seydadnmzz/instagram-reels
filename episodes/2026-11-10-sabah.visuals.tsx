// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Neden hıçkırıyoruz? (2026-11-10-sabah)
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
  uiFont,
  useAppear,
  useProgress,
  useWave,
  Window,
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#e8f8f6";
const SKIN = "#f2c79a";
const TEAL = "#3fb4a0";
const SHIRT = "#f08a3c";
const GREEN = "#4caf50";
const LUNG = "#f7a3b5";
const MUSCLE = "#e0565b";
const WOMB = "#ffd7e0";
const WATER = "#7fd3e6";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Hıçkırık ritmi: her `period` karede bir kısa sıçrama (0..1)
const useHic = (period = 34, offset = 0) => {
  const frame = useCurrentFrame();
  const t = (frame + offset) % period;
  return t < 10 ? Math.sin((t / 10) * Math.PI) : 0;
};

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [90, 90, 36],
      [820, 70, 24],
      [800, 300, 16],
      [60, 330, 18],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#d2f0eb" />
    ))}
  </g>
);

// Açık turkuaz oda (kütüphane / sınıf havası)
const QuietRoom: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {Array.from({ length: 20 }).map((_, i) => (
      <rect key={i} x={i * 46 + 18} y={0} width={14} height={440} fill="#d6f1ec" />
    ))}
    <rect x={0} y={440} width={900} height={120} fill="#c9a77c" stroke={OUTLINE} strokeWidth={4} />
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={i} x1={i * 160 + 40} y1={440} x2={i * 160 + 40} y2={560} stroke="#a9865c" strokeWidth={4} />
    ))}
    <Window x={660} y={60} kind="day" />
  </g>
);

const Check: React.FC<{ x: number; y: number; t: number; size?: number }> = ({ x, y, t, size = 1 }) => (
  <g transform={place(x, y, size)}>
    <circle r={46} fill={GREEN} stroke={OUTLINE} strokeWidth={5} opacity={Math.min(1, t * 3)} />
    <path
      d="M -22 0 L -6 18 L 24 -16"
      fill="none"
      stroke="#fff"
      strokeWidth={11}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={80}
      strokeDashoffset={80 * (1 - t)}
    />
  </g>
);

// "HIK!" patlama balonu
const HicBurst: React.FC<{ x: number; y: number; t: number; size?: number }> = ({ x, y, t, size = 1 }) => {
  if (t <= 0.02) return null;
  const pts = Array.from({ length: 16 })
    .map((_, i) => {
      const a = (i / 16) * Math.PI * 2;
      const r = i % 2 ? 58 : 84;
      return `${Math.cos(a) * r * 1.35},${Math.sin(a) * r}`;
    })
    .join(" ");
  return (
    <g transform={place(x, y, size * (0.6 + 0.4 * t))} opacity={Math.min(1, t * 2)}>
      <polygon points={pts} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <text x={0} y={16} fontFamily={uiFont} fontWeight={800} fontSize={50} textAnchor="middle" fill={INK}>
        HIK!
      </text>
    </g>
  );
};

// Büyük yüz (önden): hıçkırırken omuzları sıçrar
const Face: React.FC<{ x: number; y: number; scale?: number; jolt?: number; mood?: "shock" | "calm" | "smile" }> = ({
  x,
  y,
  scale = 1,
  jolt = 0,
  mood = "shock",
}) => (
  <g transform={place(x, y - jolt * 18, scale)}>
    <path d="M -110 210 Q -110 110 0 106 Q 110 110 110 210 Z" fill={SHIRT} stroke={OUTLINE} strokeWidth={6} />
    <rect x={-22} y={70} width={44} height={44} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
    <circle cx={0} cy={0} r={90} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
    <path d="M -90 -10 Q -88 -100 0 -98 Q 88 -100 90 -12 Q 50 -50 0 -44 Q -50 -50 -90 -10 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={5} />
    {mood === "shock" ? (
      <g>
        <circle cx={-32} cy={4} r={16 + jolt * 4} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={32} cy={4} r={16 + jolt * 4} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={-32} cy={5} r={6} fill={OUTLINE} />
        <circle cx={32} cy={5} r={6} fill={OUTLINE} />
        <ellipse cx={0} cy={48} rx={12 + jolt * 6} ry={10 + jolt * 10} fill="#8a2430" stroke={OUTLINE} strokeWidth={4} />
      </g>
    ) : (
      <g>
        <path d="M -46 0 Q -32 -12 -18 0 M 18 0 Q 32 -12 46 0" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <path d={mood === "smile" ? "M -26 40 Q 0 64 26 40" : "M -20 46 L 20 46"} fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      </g>
    )}
    <circle cx={-58} cy={30} r={12} fill="#f4a3a3" opacity={0.7} />
    <circle cx={58} cy={30} r={12} fill="#f4a3a3" opacity={0.7} />
  </g>
);

// Gövde şeması: ciğerler + diyafram kubbesi. `contract` 0..1: diyafram aşağı düzleşir
const Torso: React.FC<{ contract: number; showLabel?: boolean }> = ({ contract, showLabel = true }) => {
  const domeY = 300 - 70 * (1 - contract); // kubbe tepesi
  const baseY = 330;
  const lungStretch = 1 + 0.12 * contract;
  return (
    <g>
      {/* gövde silueti */}
      <path d="M 300 60 Q 450 30 600 60 L 640 160 L 620 470 L 280 470 L 260 160 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      {/* soluk borusu */}
      <rect x={436} y={40} width={28} height={110} rx={10} fill="#f5d0a9" stroke={OUTLINE} strokeWidth={5} />
      {/* ciğerler */}
      <g transform={`translate(450 150) scale(1 ${lungStretch}) translate(-450 -150)`}>
        <path d="M 436 150 Q 330 130 330 230 Q 330 300 420 300 Q 440 300 440 270 Z" fill={LUNG} stroke={OUTLINE} strokeWidth={5} />
        <path d="M 464 150 Q 570 130 570 230 Q 570 300 480 300 Q 460 300 460 270 Z" fill={LUNG} stroke={OUTLINE} strokeWidth={5} />
      </g>
      {/* diyafram */}
      <path
        d={`M 285 ${baseY} Q 450 ${domeY - 70 * (1 - contract)} 615 ${baseY}`}
        fill="none"
        stroke={OUTLINE}
        strokeWidth={24}
        strokeLinecap="round"
      />
      <path
        d={`M 285 ${baseY} Q 450 ${domeY - 70 * (1 - contract)} 615 ${baseY}`}
        fill="none"
        stroke={MUSCLE}
        strokeWidth={14}
        strokeLinecap="round"
      />
      {showLabel ? <NamePlate x={450} y={420} text="DİYAFRAM" /> : null}
    </g>
  );
};

// 1) Sessiz odada hık!
const Hic: Visual = () => {
  const jolt = useHic(30, 0);
  const frame = useCurrentFrame();
  const burstA = frame > 8 ? jolt : 0;
  return (
    <g>
      <QuietRoom />
      {/* diğerleri: sessiz okuyorlar */}
      <Person x={130} y={470} scale={1.1} shirt="#8f7ae0" facing="right" />
      <Person x={770} y={470} scale={1.1} shirt="#5bc0b0" facing="left" glasses />
      <g opacity={interpolate(frame, [0, 10], [0, 1], clamp)}>
        <Chip x={450} y={60} text="ŞŞŞT…" dark />
      </g>
      <Face x={450} y={300} scale={1.05} jolt={jolt} />
      <HicBurst x={640} y={170} t={burstA} />
      <g opacity={interpolate(frame, [30, 40], [0, 1], clamp)}>
        <QuestionMark x={240} y={180} size={70} delay={30} />
      </g>
    </g>
  );
};

// 2) Adı: singultus
const NameCard: Visual = () => {
  const card = useAppear(4);
  const jolt = useHic(30, 10);
  return (
    <g>
      <Paper />
      <g transform={place(450, 170, card)}>
        <rect x={-320} y={-110} width={640} height={220} rx={30} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={-34} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={TEAL}>
          TIPTAKİ ADI
        </text>
        <text x={0} y={52} fontFamily={uiFont} fontWeight={800} fontSize={78} textAnchor="middle" fill={INK}>
          SINGULTUS
        </text>
      </g>
      <Face x={250} y={400} scale={0.62} jolt={jolt} />
      <Chip x={610} y={430} text="= HIÇKIRIK" delay={24} />
    </g>
  );
};

// 3) Diyafram bir anda kasılıyor
const Diaphragm: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const start = Math.round(durationInFrames * 0.3);
  const t = Math.max(0, frame - start) % 36;
  const contract = frame < start ? 0 : t < 6 ? t / 6 : interpolate(t, [6, 22], [1, 0], clamp);
  const arrowP = useProgress(start - 20, start);
  return (
    <g>
      <Paper />
      <Torso contract={contract} />
      <Arrow from={[760, 200]} to={[630, 300]} progress={arrowP} color={RED} />
      <Chip x={760} y={160} text="KUBBE KAS" delay={10} />
      <g opacity={contract}>
        <path d="M 380 360 L 380 400 M 520 360 L 520 400" stroke={RED} strokeWidth={8} strokeLinecap="round" />
        <Chip x={150} y={300} text="ŞAK!" delay={start} />
      </g>
    </g>
  );
};

// 4) Ses telleri şak diye kapanıyor
const Glottis: Visual = () => {
  const frame = useCurrentFrame();
  const cycle = frame % 40;
  // hava girer (0..16), sonra kapanır (16..22), açılır
  const close = interpolate(cycle, [14, 18, 30, 38], [0, 1, 1, 0], clamp);
  const gap = 46 * (1 - close);
  const flowOn = cycle < 16;
  const appear = useAppear(2);
  return (
    <g>
      <Paper />
      <g transform={place(450, 270, appear)}>
        {/* gırtlak halkası */}
        <ellipse cx={0} cy={0} rx={190} ry={140} fill="#f7c3c9" stroke={OUTLINE} strokeWidth={6} />
        <ellipse cx={0} cy={0} rx={150} ry={106} fill="#7a2b39" stroke={OUTLINE} strokeWidth={5} />
        {/* ses telleri: V şeklinde iki şerit */}
        <path d={`M 0 -96 L ${-gap - 6} 96 L -80 96 Z`} fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <path d={`M 0 -96 L ${gap + 6} 96 L 80 96 Z`} fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      </g>
      {/* hava akışı okları */}
      {flowOn
        ? [0, 1, 2].map((i) => {
            const y = 40 + ((frame * 6 + i * 50) % 150);
            return <path key={i} d={`M ${430 + i * 20} ${y} l 0 30 l -10 -10 m 10 10 l 10 -10`} stroke={TEAL} strokeWidth={6} fill="none" strokeLinecap="round" />;
          })
        : null}
      <HicBurst x={720} y={120} t={close > 0.6 && cycle < 30 ? 1 : 0} size={0.9} />
      <NamePlate x={450} y={490} text="SES TELLERİ" delay={10} />
      <Chip x={170} y={110} text="HAVA →" delay={6} />
    </g>
  );
};

// Gazlı içecek bardağı
const Fizzy: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, t)}>
      <path d="M -50 -90 L 50 -90 L 40 90 L -40 90 Z" fill="#c98a4a" stroke={OUTLINE} strokeWidth={5} />
      <path d="M -50 -90 L 50 -90 L 47 -60 L -47 -60 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={-24 + (i % 3) * 22} cy={80 - ((frame * 3 + i * 27) % 130)} r={5} fill="#fff" opacity={0.85} />
      ))}
      <rect x={18} y={-150} width={10} height={90} fill={RED} stroke={OUTLINE} strokeWidth={3} transform="rotate(12)" />
    </g>
  );
};

// Hızlı yenen burger
const Burger: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => {
  const wob = useWave(10, 6);
  return (
    <g transform={place(x, y + wob, t)}>
      <path d="M -80 -10 Q -80 -80 0 -80 Q 80 -80 80 -10 Z" fill="#e7a24a" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-86} y={-12} width={172} height={18} rx={8} fill="#5fbf4a" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-82} y={6} width={164} height={26} rx={10} fill="#7a3b1e" stroke={OUTLINE} strokeWidth={4} />
      <path d="M -80 32 L 80 32 Q 80 62 50 62 L -50 62 Q -80 62 -80 32 Z" fill="#e7a24a" stroke={OUTLINE} strokeWidth={5} />
      <path d="M -30 -60 l 6 -4 M 10 -66 l 6 -2 M 40 -50 l 5 -4" stroke="#fff4d6" strokeWidth={4} strokeLinecap="round" />
    </g>
  );
};

// 5) Tetikleyiciler
const Triggers: Visual = () => {
  const a = useAppear(4);
  const b = useAppear(18);
  const c = useAppear(32);
  const d = useAppear(46);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <Burger x={150} y={230} t={a} />
      <Chip x={150} y={350} text="HIZLI YEMEK" delay={8} />
      <Fizzy x={380} y={220} t={b} />
      <Chip x={380} y={420} text="GAZLI İÇECEK" delay={22} />
      <g transform={place(600, 220, c)}>
        <Heart_ x={0} y={0} beat={frame} />
      </g>
      <Chip x={600} y={350} text="HEYECAN" delay={36} />
      <g transform={place(790, 220, d)}>
        <circle r={70} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={30} fontFamily={uiFont} fontWeight={800} fontSize={90} textAnchor="middle" fill={TEAL}>
          ?
        </text>
      </g>
      <Chip x={790} y={420} text="SEBEPSİZ" dark delay={50} />
      <g opacity={useProgress(56, 66)}>
        <text x={450} y={510} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill={INK}>
          DİYAFRAM KIŞKIRTILINCA…
        </text>
      </g>
    </g>
  );
};

// Atan kalp
const Heart_: React.FC<{ x: number; y: number; beat: number }> = ({ x, y, beat }) => {
  const s = 1 + (beat % 20 < 5 ? 0.12 : 0);
  return (
    <g transform={place(x, y, s)}>
      <path d="M 0 60 C -90 0 -70 -70 -20 -60 C 0 -56 0 -40 0 -36 C 0 -40 0 -56 20 -60 C 70 -70 90 0 0 60 Z" fill={RED} stroke={OUTLINE} strokeWidth={5} />
      <path d="M -40 -30 Q -44 -10 -30 0" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
    </g>
  );
};

// Kıvrılmış bebek (anne karnında)
const Fetus: React.FC<{ jolt: number }> = ({ jolt }) => (
  <g transform={`translate(0 ${-jolt * 10})`}>
    <path d="M -20 70 Q -90 60 -80 -10 Q -70 -60 -10 -50 Q 60 -40 60 20 Q 60 80 -20 70 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
    <circle cx={30} cy={-60} r={52} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
    <path d="M 14 -64 Q 24 -56 34 -64" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
    <path d="M 48 -60 Q 58 -52 66 -60" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
    <ellipse cx={46} cy={-36} rx={5 + jolt * 3} ry={4 + jolt * 4} fill="#8a2430" />
    <path d="M -40 40 Q -10 30 10 50" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
  </g>
);

// 6) Anne karnında hıçkırık
const Womb: Visual = () => {
  const jolt = useHic(32, 0);
  const appear = useAppear(4);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <g transform={place(380, 290, appear)}>
        <circle r={210} fill={WOMB} stroke={OUTLINE} strokeWidth={6} />
        <circle r={180} fill="#ffe9ee" />
        {Array.from({ length: 5 }).map((_, i) => (
          <circle key={i} cx={-120 + i * 60} cy={140 - ((frame * 1.5 + i * 40) % 260)} r={8} fill="#fff" opacity={0.7} />
        ))}
        <Fetus jolt={jolt} />
      </g>
      <HicBurst x={680} y={160} t={frame > 12 ? jolt : 0} size={0.85} />
      <Chip x={700} y={400} text="ANNE KARNINDA" delay={20} />
    </g>
  );
};

// Yenidoğan yatağı + EEG başlığı
const Baby: React.FC<{ x: number; y: number; jolt: number; scale?: number }> = ({ x, y, jolt, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <rect x={-150} y={20} width={300} height={70} rx={20} fill="#9fd9ef" stroke={OUTLINE} strokeWidth={5} />
    <g transform={`translate(0 ${-jolt * 12})`}>
      <ellipse cx={20} cy={10} rx={100} ry={44} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-90} cy={-10} r={50} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      {/* EEG elektrotları */}
      {[-130, -110, -85, -60].map((ex, i) => (
        <g key={i}>
          <line x1={ex} y1={-50 + (i === 0 || i === 3 ? 14 : 0)} x2={ex + 40} y2={-130} stroke={OUTLINE} strokeWidth={3} />
          <circle cx={ex} cy={-50 + (i === 0 || i === 3 ? 14 : 0)} r={8} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
        </g>
      ))}
      <path d="M -106 -8 Q -98 -2 -90 -8 M -78 -8 Q -70 -2 -62 -8" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={-84} cy={14} rx={5 + jolt * 3} ry={4 + jolt * 4} fill="#8a2430" />
    </g>
  </g>
);

// 7) Her hıçkırıkta beyinde güçlü dalga
const BrainWave: Visual = () => {
  const frame = useCurrentFrame();
  const period = 40;
  const jolt = useHic(period, 0);
  const screen = useAppear(10);
  // EEG çizgisi: hıçkırıktan sonra büyük dalga
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const fx = frame - (80 - i);
    const t = ((fx % period) + period) % period;
    const spike = t > 4 && t < 22 ? Math.sin(((t - 4) / 18) * Math.PI * 2) * 70 * Math.exp(-(t - 4) / 12) : 0;
    const noise = Math.sin(fx * 1.7) * 4;
    pts.push(`${-230 + i * 5.75},${-spike + noise}`);
  }
  return (
    <g>
      <Paper />
      <Baby x={240} y={400} jolt={jolt} />
      <g transform={place(620, 200, screen)}>
        <rect x={-250} y={-130} width={500} height={260} rx={22} fill="#1f2d3a" stroke={OUTLINE} strokeWidth={6} />
        <line x1={-230} y1={0} x2={230} y2={0} stroke="#3a5566" strokeWidth={2} />
        <polyline points={pts.join(" ")} fill="none" stroke={YELLOW} strokeWidth={6} strokeLinejoin="round" />
        <text x={-220} y={-96} fontFamily={uiFont} fontWeight={800} fontSize={26} fill="#9fe3d6">
          BEYİN DALGASI
        </text>
      </g>
      <Arrow from={[330, 300]} to={[400, 230]} progress={useProgress(20, 34)} color={RED} />
      <NamePlate x={240} y={520} text="YENİDOĞAN" delay={6} />
      <Chip x={620} y={400} text="HER HIÇKIRIKTA" dark delay={30} />
    </g>
  );
};

// 8) Beyin nefes kaslarını tanıyor
const Lesson: Visual = () => {
  const frame = useCurrentFrame();
  const contract = useHic(36, 0);
  const link = useProgress(20, 40);
  const pulse = (frame % 36) / 36;
  return (
    <g>
      <Paper />
      <g transform="translate(260 300) scale(0.55) translate(-450 -260)">
        <Torso contract={contract} showLabel={false} />
      </g>
      <Brain x={690} y={210} scale={0.85} mood="happy" delay={4} />
      {/* sinyal yolu */}
      <path d="M 340 300 Q 520 380 640 280" fill="none" stroke={OUTLINE} strokeWidth={14} strokeLinecap="round" strokeDasharray={400} strokeDashoffset={400 * (1 - link)} />
      <path d="M 340 300 Q 520 380 640 280" fill="none" stroke={YELLOW} strokeWidth={8} strokeLinecap="round" strokeDasharray={400} strokeDashoffset={400 * (1 - link)} />
      {link > 0.95 ? (
        <circle
          cx={interpolate(pulse, [0, 1], [340, 640])}
          cy={300 + Math.sin(pulse * Math.PI) * 64 - pulse * 20}
          r={14}
          fill={RED}
          stroke={OUTLINE}
          strokeWidth={3}
        />
      ) : null}
      <g transform={place(590, 70, useAppear(40))}>
        <Chip x={0} y={0} text="AHA! BU NEFES KASI" />
      </g>
      <NamePlate x={260} y={470} text="NEFES KASLARI" delay={10} />
      <Sparkles points={[[790, 130], [600, 130]]} />
    </g>
  );
};

// Kurbağa yavrusu (iribaş)
const TadpoleShape: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => {
  const frame = useCurrentFrame();
  const tail = Math.sin(frame / 4) * 22;
  return (
    <g transform={place(x, y, scale)}>
      <path d={`M 60 0 Q 140 ${tail} 220 ${tail * 1.4} Q 140 ${tail + 26} 60 24 Z`} fill="#4f7d4a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <ellipse cx={0} cy={10} rx={90} ry={66} fill="#5e9a58" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-44} cy={-12} r={18} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={-48} cy={-10} r={8} fill={OUTLINE} />
      <path d="M -70 34 Q -54 44 -38 34" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      {/* solungaç çizgileri */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M ${2 + i * 14} ${-8} q 8 18 0 36`} fill="none" stroke="#2e5a2b" strokeWidth={4} strokeLinecap="round" />
      ))}
    </g>
  );
};

// 9) Atalardan kalma refleks: iribaş ↔ insan
const Tadpole: Visual = () => {
  const frame = useCurrentFrame();
  const left = useAppear(4);
  const right = useAppear(28);
  const jolt = useHic(30, 0);
  return (
    <g>
      <Paper />
      <g transform={place(230, 270, left)}>
        <rect x={-200} y={-200} width={400} height={400} rx={26} fill={WATER} stroke={OUTLINE} strokeWidth={6} />
        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={i} cx={-150 + i * 55} cy={150 - ((frame * 2 + i * 45) % 320)} r={7} fill="#fff" opacity={0.75} />
        ))}
        <TadpoleShape x={-30} y={-10} scale={0.95} />
        <text x={0} y={175} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={INK}>
          SOLUNGAÇ
        </text>
      </g>
      <BigText x={450} y={270} text="≈" size={110} color={YELLOW} delay={20} />
      <g transform={place(670, 270, right)}>
        <rect x={-200} y={-200} width={400} height={400} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Face x={0} y={-50} scale={0.62} jolt={jolt} />
        <text x={0} y={175} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={INK}>
          HIÇKIRIK
        </text>
      </g>
      <Chip x={450} y={510} text="ESKİ BİR REFLEKS?" dark delay={40} />
    </g>
  );
};

// 10) Hâlâ gizem — ama çoğu kendiliğinden geçiyor
const Mystery: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const half = Math.round(durationInFrames * 0.45);
  const calm = frame >= half;
  const jolt = useHic(30, 0);
  const fill = interpolate(frame, [half, half + 50], [0, 1], clamp);
  return (
    <g>
      <Paper />
      <Brain x={180} y={190} scale={0.7} mood="confused" delay={2} />
      <QuestionMark x={300} y={100} size={80} delay={8} />
      <QuestionMark x={90} y={80} size={56} delay={14} />
      <Face x={540} y={260} scale={0.9} jolt={calm ? 0 : jolt} mood={calm ? "smile" : "shock"} />
      {!calm ? <HicBurst x={760} y={120} t={jolt} size={0.8} /> : null}
      {/* kronometre: birkaç dakika */}
      <g transform={place(780, 400, useAppear(half))}>
        <circle r={80} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d={`M 0 0 L 0 -66 A 66 66 0 ${fill > 0.5 ? 1 : 0} 1 ${Math.sin(fill * Math.PI * 2) * 66} ${-Math.cos(fill * Math.PI * 2) * 66} Z`} fill={TEAL} opacity={0.6} />
        <line x1={0} y1={0} x2={Math.sin(fill * Math.PI * 2) * 60} y2={-Math.cos(fill * Math.PI * 2) * 60} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <rect x={-14} y={-104} width={28} height={20} rx={4} fill={OUTLINE} />
      </g>
      <g opacity={calm ? 1 : 0}>
        <Check x={640} y={110} t={useProgress(half + 30, half + 44)} />
        <Chip x={260} y={470} text="KENDİLİĞİNDEN GEÇER" delay={half + 10} />
      </g>
    </g>
  );
};

// 11) Kapanış sorusu
const YourTurn: Visual = () => {
  const card = useAppear(8);
  const pulse = 1 + useWave(24, 0.05);
  const jolt = useHic(36, 0);
  return (
    <g>
      <QuietRoom />
      <Face x={220} y={300} scale={0.85} jolt={jolt} />
      <g transform={place(620, 220, card)}>
        <rect x={-220} y={-170} width={440} height={340} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Chip x={0} y={-100} text="SU İÇMEK?" delay={14} />
        <Chip x={0} y={-10} text="NEFES TUTMAK?" delay={20} />
        <Chip x={0} y={80} text="KORKUTULMAK?" delay={26} />
      </g>
      <g transform={place(620, 480, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={30} />
      </g>
      <BigText x={400} y={90} text="?" size={90} color={YELLOW} delay={36} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  Hic,
  NameCard,
  Diaphragm,
  Glottis,
  Triggers,
  Womb,
  BrainWave,
  Lesson,
  Tadpole,
  Mystery,
  YourTurn,
};
