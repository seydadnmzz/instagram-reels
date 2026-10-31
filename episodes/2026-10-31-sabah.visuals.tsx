// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Suda parmakların buruşması (2026-10-31-sabah)
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
const PAPER = "#e8f8f6";
const SKIN = "#f2c79a";
const SKIN_DARK = "#c98c5e";
const WATER = "#7fd0f0";
const BLOOD = "#e0434b";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

const FINGERS = [
  { x: -54, len: 112 },
  { x: -18, len: 134 },
  { x: 18, len: 128 },
  { x: 54, len: 104 },
];

// Avuç içi bize dönük el; (0,0) avuç ortası. wrinkle: 0 (pürüzsüz) → 1 (kuru üzüm)
const Hand: React.FC<{ wrinkle?: number; scale?: number }> = ({ wrinkle = 0, scale = 1 }) => {
  const lines = (fx: number, top: number) =>
    [0, 1, 2, 3].map((i) => {
      const y = top + 14 + i * 13;
      const amp = 4 * wrinkle;
      return (
        <path
          key={i}
          d={`M ${fx - 12} ${y} Q ${fx - 6} ${y - amp} ${fx} ${y} Q ${fx + 6} ${y + amp} ${fx + 12} ${y}`}
          fill="none"
          stroke={SKIN_DARK}
          strokeWidth={3}
          strokeLinecap="round"
          opacity={wrinkle}
        />
      );
    });
  return (
    <g transform={`scale(${scale})`}>
      {/* Bilek */}
      <rect x={-46} y={70} width={92} height={110} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      {/* Başparmak */}
      <rect x={-34} y={-58} width={34} height={92} rx={17} fill={SKIN} stroke={OUTLINE} strokeWidth={5} transform="translate(-58 30) rotate(-38)" />
      {/* Parmaklar */}
      {FINGERS.map((f) => (
        <rect key={f.x} x={f.x - 17} y={-28 - f.len} width={34} height={f.len + 30} rx={17} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      ))}
      {/* Avuç */}
      <rect x={-74} y={-40} width={148} height={130} rx={36} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-68} y={-46} width={136} height={20} fill={SKIN} />
      <path d="M -40 10 Q 0 30 40 0 M -30 50 Q 10 40 50 30" fill="none" stroke={SKIN_DARK} strokeWidth={3} strokeLinecap="round" />
      {/* Parmak uçlarındaki kırışıklar */}
      {FINGERS.map((f) => (
        <g key={`w${f.x}`}>{lines(f.x, -28 - f.len)}</g>
      ))}
      <g transform="translate(-58 30) rotate(-38)">{lines(-17, -58)}</g>
    </g>
  );
};

// Yükselen kabarcık
const Bubbles: React.FC<{ x: number; y: number; spread?: number; count?: number }> = ({ x, y, spread = 200, count = 7 }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const t = ((frame * 1.3 + i * 37) % 120) / 120;
        const bx = x + ((i * 53) % spread) - spread / 2 + Math.sin(frame / 10 + i) * 6;
        return <circle key={i} cx={bx} cy={y - t * 130} r={6 + (i % 3) * 4} fill="#fff" stroke={OUTLINE} strokeWidth={3} opacity={1 - t} />;
      })}
    </g>
  );
};

// Su damlası
const Drop: React.FC<{ x: number; y: number; size?: number }> = ({ x, y, size = 1 }) => (
  <path transform={place(x, y, size)} d="M 0 -24 C 12 -8 18 2 18 10 A 18 18 0 0 1 -18 10 C -18 2 -12 -8 0 -24 Z" fill={WATER} stroke={OUTLINE} strokeWidth={4} />
);

const RubberDuck: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const bob = useWave(40, 6);
  const tilt = useWave(55, 6);
  return (
    <g transform={place(x, y + bob, 1, tilt)}>
      <ellipse cx={0} cy={0} rx={48} ry={30} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={30} cy={-34} r={24} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      <path d="M 50 -36 L 72 -30 L 50 -24 Z" fill="#f28c28" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      <circle cx={36} cy={-40} r={5} fill={OUTLINE} />
      <path d="M -20 -4 Q 0 10 18 -4" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
};

const BathFingers: Visual = () => {
  const frame = useCurrentFrame();
  const rise = useProgress(0, 18);
  const wrinkle = useProgress(14, 60);
  const wave = Math.sin(frame / 8) * 6;
  return (
    <g>
      <Paper />
      {/* Fayans */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 160 + 40} y1={0} x2={i * 160 + 40} y2={330} stroke="#c5ebe5" strokeWidth={4} />
      ))}
      {[110, 220].map((y) => (
        <line key={y} x1={0} y1={y} x2={900} y2={y} stroke="#c5ebe5" strokeWidth={4} />
      ))}
      {/* El sudan çıkıyor */}
      <g transform={place(450, 540 - 220 * rise, 1.2, useWave(50, 3))}>
        <Hand wrinkle={wrinkle} />
      </g>
      {/* Küvet ve su */}
      <path d={`M 40 340 Q 225 ${330 + wave} 450 340 T 860 340 L 860 380 L 40 380 Z`} fill={WATER} stroke={OUTLINE} strokeWidth={5} />
      <path d="M 20 370 L 880 370 Q 870 540 760 540 L 140 540 Q 30 540 20 370 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 80 410 Q 90 500 160 510" fill="none" stroke="#d7eeee" strokeWidth={10} strokeLinecap="round" />
      <RubberDuck x={700} y={330} />
      <Bubbles x={200} y={340} spread={180} />
      <Sparkles points={[[330, 170], [580, 120], [610, 260]]} />
      <g opacity={wrinkle}>
        <Chip x={190} y={150} text="BURUŞTU!" dark delay={44} />
      </g>
    </g>
  );
};

const Sponge: React.FC<{ swell: number }> = ({ swell }) => (
  <g transform={`scale(${1 + swell * 0.25} ${1 + swell * 0.35})`}>
    <rect x={-110} y={-70} width={220} height={140} rx={24} fill="#f7d54a" stroke={OUTLINE} strokeWidth={6} />
    {[
      [-60, -30, 12],
      [10, -40, 9],
      [60, 0, 14],
      [-20, 20, 10],
      [-75, 35, 8],
      [40, 42, 9],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}`} cx={cx} cy={cy} r={r} fill="#d9a92e" />
    ))}
  </g>
);

const SpongeMyth: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const swell = useProgress(4, 30);
  const crossAt = Math.round(durationInFrames * 0.62);
  const cross = useProgress(crossAt, crossAt + 10);
  return (
    <g>
      <Paper />
      {/* Damlalar süngere yağıyor */}
      {Array.from({ length: 5 }).map((_, i) => {
        const t = ((frame * 2 + i * 26) % 130) / 130;
        return <Drop key={i} x={300 + i * 75} y={40 + t * 150} size={0.8} />;
      })}
      <g transform={place(450, 330, useAppear(2))}>
        <Sponge swell={swell} />
      </g>
      <NamePlate x={450} y={480} text="SÜNGER GİBİ ŞİŞME?" delay={10} />
      {/* Kırmızı çarpı */}
      <g opacity={cross > 0 ? 1 : 0} stroke={RED} strokeWidth={22} strokeLinecap="round">
        <line x1={300} y1={200} x2={300 + 300 * cross} y2={200 + 260 * cross} />
        <line x1={600} y1={200} x2={600 - 300 * cross} y2={200 + 260 * cross} />
      </g>
      <Chip x={760} y={110} text="DEĞİL!" delay={crossAt + 6} />
    </g>
  );
};

const VesselsShrink: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const signal = useProgress(at(0.15), at(0.42));
  const squeeze = useProgress(at(0.45), at(0.7));
  const thick = 64 - 40 * squeeze;
  const dip = 34 * squeeze;
  const flow = (frame * 3) % 70;
  // Deri yüzeyi: damarlar büzülünce aralıklarla içe çöker
  const skinPath = () => {
    let d = "M 300 120";
    for (let i = 0; i < 6; i++) {
      const x0 = 300 + i * 90;
      d += ` Q ${x0 + 45} ${120 + dip} ${x0 + 90} 120`;
    }
    return d + " L 840 470 L 300 470 Z";
  };
  return (
    <g>
      <Paper />
      {/* Parmak ucu kesiti */}
      <path d={skinPath()} fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <NamePlate x={570} y={80} text="PARMAK UCU DERİSİ" delay={4} />
      {/* Damar */}
      <rect x={320} y={320 - thick / 2} width={500} height={thick} rx={thick / 2} fill={BLOOD} stroke={OUTLINE} strokeWidth={5} />
      {Array.from({ length: 8 }).map((_, i) => {
        const cx = 335 + ((i * 70 + flow) % 470);
        return <circle key={i} cx={cx} cy={320} r={Math.max(4, thick * 0.18)} fill="#ffb3b8" />;
      })}
      {/* Beyinden gelen sinir sinyali */}
      <Brain x={140} y={170} scale={0.65} delay={0} />
      <path d="M 150 240 C 150 340 220 400 320 380" fill="none" stroke={YELLOW} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={`${signal} 1`} />
      <path d="M 150 240 C 150 340 220 400 320 380" fill="none" stroke={OUTLINE} strokeWidth={3} strokeDasharray="10 12" opacity={signal} />
      <Chip x={160} y={470} text="SİNİR SİSTEMİ" dark delay={at(0.15)} />
      {squeeze > 0 ? <Chip x={600} y={420} text="DAMAR BÜZÜLÜR" delay={at(0.47)} /> : null}
      {/* İçe çöken yerleri gösteren oklar */}
      <Arrow from={[435, 30 + 0]} to={[435, 120]} progress={useProgress(at(0.7), at(0.8))} color={RED} />
      <Arrow from={[705, 30]} to={[705, 120]} progress={useProgress(at(0.72), at(0.82))} color={RED} />
    </g>
  );
};

// Kırık sinir simgesi
const BrokenNerve: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => (
  <g transform={place(x, y, useAppear(delay))}>
    <path d="M -70 0 L -14 0 L -4 -14" fill="none" stroke={YELLOW} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 70 0 L 14 0 L 4 14" fill="none" stroke={YELLOW} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -70 0 L -14 0 L -4 -14 M 70 0 L 14 0 L 4 14" fill="none" stroke={OUTLINE} strokeWidth={3} />
    <path d="M -8 -30 L 8 -12 L -6 4 L 10 22" fill="none" stroke={RED} strokeWidth={6} strokeLinecap="round" />
  </g>
);

const NerveTest: Visual = () => {
  const wrinkle = useProgress(10, 40);
  const bob = useWave(60, 4);
  return (
    <g>
      <Paper />
      {/* Su leğeni */}
      <path d="M 60 400 L 640 400 L 600 520 L 100 520 Z" fill={WATER} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <g transform={place(220, 330 + bob, 0.82)}>
        <Hand wrinkle={wrinkle} />
      </g>
      <g transform={place(480, 330 - bob, 0.82)}>
        <Hand wrinkle={0} />
      </g>
      <path d="M 60 400 L 640 400 L 630 430 L 70 430 Z" fill={WATER} opacity={0.85} stroke={OUTLINE} strokeWidth={4} />
      <Chip x={220} y={60} text="SAĞLAM" delay={14} />
      <Chip x={480} y={60} text="HASARLI" dark delay={22} />
      <BrokenNerve x={480} y={475} delay={26} />
      {/* Doktor */}
      <Person x={770} y={520} scale={1.15} shirt="#ffffff" glasses facing="left" presenting delay={4} />
      <NamePlate x={770} y={110} text="SİNİR TESTİ" delay={32} />
      <Sparkles points={[[150, 150], [300, 130]]} />
    </g>
  );
};

const Tire: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, 1, frame * 4)}>
      <circle r={150} fill="#3a3a3f" stroke={OUTLINE} strokeWidth={6} />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={-10} y={-150} width={20} height={34} fill="#1f1f22" transform={`rotate(${i * 22.5})`} />
      ))}
      <circle r={78} fill="#c9ced6" stroke={OUTLINE} strokeWidth={6} />
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={i} cx={0} cy={-46} r={10} fill="#8a919c" transform={`rotate(${i * 72})`} />
      ))}
      <circle r={18} fill="#8a919c" stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

const TireTread: Visual = () => {
  const frame = useCurrentFrame();
  const eq = useAppear(16);
  return (
    <g>
      <Paper />
      {/* Islak yol */}
      <rect x={0} y={470} width={900} height={90} fill="#5d6670" />
      <ellipse cx={230} cy={478} rx={200} ry={12} fill={WATER} opacity={0.8} />
      <Tire x={230} y={320} />
      {/* Lastikten fışkıran su */}
      {Array.from({ length: 6 }).map((_, i) => {
        const t = ((frame * 2 + i * 22) % 60) / 60;
        return <Drop key={i} x={70 - t * 60 - i * 6} y={460 - Math.sin(t * Math.PI) * (90 + i * 10)} size={0.6} />;
      })}
      <g transform={place(450, 300, eq)}>
        <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontFamily={uiFont} fontWeight={800} fontSize={110} fill={INK}>
          =
        </text>
      </g>
      {/* Buruşuk parmak ucu, olukları boyunca akan su */}
      <g transform={place(680, 300, useAppear(22))}>
        <rect x={-90} y={-170} width={180} height={340} rx={90} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        {[-110, -70, -30, 10, 50, 90].map((y) => (
          <path key={y} d={`M -70 ${y} Q -35 ${y - 16} 0 ${y} Q 35 ${y + 16} 70 ${y}`} fill="none" stroke={SKIN_DARK} strokeWidth={6} strokeLinecap="round" />
        ))}
        {[-90, -50, -10, 30, 70].map((y, i) => {
          const t = ((frame * 2.4 + i * 30) % 90) / 90;
          return <circle key={y} cx={-60 + t * 120} cy={y + Math.sin(t * Math.PI * 2) * 8} r={8} fill={WATER} stroke={OUTLINE} strokeWidth={3} />;
        })}
      </g>
      <Chip x={230} y={70} text="LASTİK DİŞİ" dark delay={6} />
      <Chip x={680} y={70} text="PARMAK UCU" delay={26} />
    </g>
  );
};

const Marble: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <g transform={place(x, y, 1)}>
    <circle r={20} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={-7} cy={-7} r={6} fill="#fff" opacity={0.85} />
  </g>
);

const MARBLE_COLORS = ["#5b8def", "#e0434b", "#3fb4a0", "#f2b134", "#a46be0"];

const Marbles: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const period = Math.max(18, Math.floor((durationInFrames - 20) / 5));
  const moved = Math.min(5, Math.floor(Math.max(0, frame - 10) / period));
  const t = ((Math.max(0, frame - 10)) % period) / period;
  const flying = moved < 5 && frame > 10;
  const fx = 230 + (560 - 230) * t;
  const fy = 380 - Math.sin(t * Math.PI) * 190;
  const handX = flying ? fx : 560;
  const handY = flying ? fy - 120 : 260;
  const bowl = (x: number) => (
    <g>
      <ellipse cx={x} cy={400} rx={130} ry={26} fill={WATER} stroke={OUTLINE} strokeWidth={5} />
      <path d={`M ${x - 130} 400 Q ${x - 120} 500 ${x} 500 Q ${x + 120} 500 ${x + 130} 400`} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
    </g>
  );
  return (
    <g>
      <Paper />
      {bowl(230)}
      {bowl(560)}
      {MARBLE_COLORS.slice(moved + (flying ? 1 : 0)).map((c, i) => (
        <Marble key={c} x={180 + i * 26} y={405 - (i % 2) * 10} color={c} />
      ))}
      {MARBLE_COLORS.slice(0, moved).map((c, i) => (
        <Marble key={c} x={510 + i * 26} y={405 - (i % 2) * 10} color={c} />
      ))}
      {flying ? <Marble x={fx} y={fy} color={MARBLE_COLORS[moved]} /> : null}
      {/* Marbleı taşıyan buruşuk el (aşağı bakar) */}
      <g transform={place(handX, handY, 0.55, 180)}>
        <Hand wrinkle={1} />
      </g>
      {/* Kronometre */}
      <g transform={place(790, 170, useAppear(4))}>
        <rect x={-14} y={-102} width={28} height={20} rx={5} fill={OUTLINE} />
        <circle r={80} fill="#fff" stroke={OUTLINE} strokeWidth={7} />
        <line x1={0} y1={0} x2={0} y2={-60} stroke={RED} strokeWidth={8} strokeLinecap="round" transform={`rotate(${frame * 9})`} />
        <circle r={9} fill={OUTLINE} />
      </g>
      <Chip x={790} y={310} text="DAHA HIZLI" delay={Math.round(durationInFrames * 0.5)} />
      <Drop x={300} y={330} size={0.5} />
      <Drop x={140} y={350} size={0.4} />
    </g>
  );
};

// Kefeleri sallanan terazi
const Balance: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const tilt = useWave(50, 12);
  const rad = (tilt * Math.PI) / 180;
  const lx = -120 * Math.cos(rad);
  const ly = -120 * Math.sin(rad);
  return (
    <g transform={place(x, y, 1)}>
      <rect x={-50} y={150} width={100} height={18} rx={6} fill="#c9a36a" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-8} y={0} width={16} height={152} fill="#c9a36a" stroke={OUTLINE} strokeWidth={4} />
      <line x1={lx} y1={ly} x2={-lx} y2={-ly} stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
      {[
        [lx, ly, "EVET"],
        [-lx, -ly, "HAYIR"],
      ].map(([px, py, label]) => (
        <g key={String(label)} transform={`translate(${px} ${py})`}>
          <line x1={0} y1={0} x2={0} y2={50} stroke={OUTLINE} strokeWidth={4} />
          <path d="M -50 50 Q 0 90 50 50 Z" fill="#f2b134" stroke={OUTLINE} strokeWidth={4} />
        </g>
      ))}
      <circle r={10} fill={OUTLINE} />
    </g>
  );
};

const Debate: Visual = () => (
  <g>
    <Paper />
    <Person x={130} y={520} scale={1.15} shirt="#5b8def" glasses presenting delay={2} />
    <Person x={770} y={520} scale={1.15} shirt="#e0434b" mustache facing="left" presenting delay={8} />
    <NamePlate x={130} y={545} text="2013" delay={6} />
    <NamePlate x={770} y={545} text="2014" delay={12} />
    <Chip x={150} y={190} text="İŞE YARIYOR" delay={10} />
    <Chip x={750} y={190} text="FARK YOK" dark delay={18} />
    <Balance x={450} y={300} />
    <QuestionMark x={450} y={150} size={1} delay={22} />
    <QuestionMark x={330} y={110} size={0.6} delay={28} />
    <QuestionMark x={570} y={110} size={0.6} delay={32} />
  </g>
);

const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const card = useAppear(8);
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Person x={180} y={530} scale={1.3} shirt="#3fb4a0" presenting holding={<g transform="scale(0.35) rotate(-20)"><Hand wrinkle={1} /></g>} />
      <g transform={place(600, 210, card)}>
        <rect x={-240} y={-120} width={480} height={240} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -180 116 L -210 170 L -130 116 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-170} y={110} width={44} height={12} fill="#fff" />
        {/* Küvet simgesi */}
        <g transform="translate(-140 10)">
          <path d="M -70 0 L 70 0 Q 66 60 0 60 Q -66 60 -70 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <path d="M -70 0 Q -35 -12 0 0 T 70 0" fill={WATER} stroke={OUTLINE} strokeWidth={4} />
          <path d="M -50 0 L -50 -60 Q -50 -78 -32 -78" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        </g>
        <text x={0} y={22} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={42} fill={INK}>
          YA DA
        </text>
        {/* Deniz dalgası simgesi */}
        <g transform="translate(140 20)">
          <path d="M -70 10 Q -50 -30 -20 0 Q 0 -30 20 0 Q 45 -30 70 10 L 70 50 L -70 50 Z" fill={WATER} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <circle cx={40} cy={-50} r={18} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
        </g>
      </g>
      <g transform={place(600, 460, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={24} />
      </g>
      <BigText x={830} y={420} text="?" size={110} color={RED} delay={30} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  BathFingers,
  SpongeMyth,
  VesselsShrink,
  NerveTest,
  TireTread,
  Marbles,
  Debate,
  YourTurn,
};
