// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: İkinci el utanç / başkası rezil olunca senin utanman (2026-11-21-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Chip,
  Heart,
  NamePlate,
  Note,
  Person,
  place,
  Sparkles,
  ThoughtBubble,
  uiFont,
  useAppear,
  useProgress,
  useWave,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff0f4";
const SKIN = "#f2c79a";
const TEAL = "#17c3a5";
const BLUE = "#3a8fe0";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff8a2b";
const BLUSH = "#ff5d7a";
const GREY = "#b9b2aa";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

type Mood = "calm" | "happy" | "wow" | "talk" | "cringe";

// Belden yukarı karakter; (0,0) gövdenin alt ortası, kafa merkezi (0,-200), yarıçap 70.
// cover: 0→1 elleri yüzüne kapatır (parmak arasından bakar).
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  mood?: Mood;
  cover?: number;
  blush?: number;
  delay?: number;
}> = ({ x, y, scale = 1, shirt = TEAL, hair = "#4a2f1d", mood = "calm", cover = 0, blush = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const shake = mood === "cringe" ? Math.sin(frame * 1.2) * 1.5 : Math.sin(frame / 18) * 2;
  const blink = frame % 90 > 85 ? 0.15 : 1;
  const handY = -60 + (-200 + 60) * cover;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${shake} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {mood === "calm" || mood === "happy" || mood === "talk" ? (
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
        {mood === "cringe" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M -40 -214 L -18 -205 L -40 -196" />
            <path d="M 40 -214 L 18 -205 L 40 -196" />
          </g>
        ) : null}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mood === "calm" ? <path d="M -20 -164 Q 0 -152 20 -164" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mood === "wow" ? <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} /> : null}
        {mood === "talk" ? <ellipse cx={0} cy={-162} rx={18} ry={6 + Math.abs(Math.sin(frame / 3)) * 12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
        {mood === "cringe" ? (
          <path d="M -26 -158 L -13 -166 L 0 -158 L 13 -166 L 26 -158" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        ) : null}
        <circle cx={-46} cy={-178} r={10 + blush * 8} fill={blush > 0 ? BLUSH : "#f59ab0"} opacity={0.7} />
        <circle cx={46} cy={-178} r={10 + blush * 8} fill={blush > 0 ? BLUSH : "#f59ab0"} opacity={0.7} />
        {blush > 0.3 ? (
          <path d="M 74 -236 q 10 16 0 24 q -10 -8 0 -24 Z" fill="#8fd3ff" stroke={OUTLINE} strokeWidth={3} transform={`translate(0 ${(frame % 40) * 0.6})`} />
        ) : null}
      </g>
      {cover > 0 ? (
        <g>
          {[-1, 1].map((s) => (
            <g key={s}>
              <path d={`M ${s * 70} -40 Q ${s * 80} ${handY + 40} ${s * 40} ${handY + 20}`} fill="none" stroke={shirt} strokeWidth={30} strokeLinecap="round" />
              <path d={`M ${s * 70} -40 Q ${s * 80} ${handY + 40} ${s * 40} ${handY + 20}`} fill="none" stroke={OUTLINE} strokeWidth={36} strokeLinecap="round" opacity={0} />
              <g transform={`translate(${s * 30} ${handY})`}>
                <rect x={-26} y={-44} width={52} height={66} rx={20} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
                {[-12, 0, 12].map((fx) => (
                  <line key={fx} x1={fx} y1={-40} x2={fx} y2={-10} stroke={OUTLINE} strokeWidth={3} />
                ))}
              </g>
            </g>
          ))}
        </g>
      ) : null}
    </g>
  );
};

// Tökezleyip düşen küçük karakter; (x,y) ayak konumu
const Tripper: React.FC<{ x: number; y: number; scale?: number; fall: number; shirt?: string; delay?: number }> = ({
  x,
  y,
  scale = 1,
  fall,
  shirt = ORANGE,
  delay = 0,
}) => (
  <g transform={`translate(${x + fall * 40} ${y}) rotate(${fall * 70})`}>
    <Person x={0} y={0} scale={scale} shirt={shirt} facing="right" walking={fall < 0.05} delay={delay} />
  </g>
);

// Sahnede tökezleme anı (TV ve düşünce balonları için)
const Stage: React.FC<{ fall: number; w?: number; h?: number }> = ({ fall, w = 300, h = 190 }) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#3a2f63" />
    <ellipse cx={0} cy={h / 2 - 20} rx={w * 0.45} ry={26} fill="#ffe27a" opacity={0.5} />
    <rect x={-w / 2} y={h / 2 - 28} width={w} height={28} fill="#7a4a8a" />
    <Tripper x={-30} y={h / 2 - 22} scale={0.62} fall={fall} />
    <ellipse cx={18} cy={h / 2 - 22} rx={14} ry={6} fill="#ffd23f" stroke={OUTLINE} strokeWidth={3} />
  </g>
);

const TV: React.FC<{ x: number; y: number; scale?: number; fall: number; children?: React.ReactNode }> = ({ x, y, scale = 1, fall, children }) => (
  <g transform={place(x, y, scale)}>
    <path d="M -40 120 L -70 170 M 40 120 L 70 170" stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
    <rect x={-175} y={-120} width={350} height={240} rx={20} fill="#4a4a5a" stroke={OUTLINE} strokeWidth={6} />
    <g>
      <clipPath id="tvclip">
        <rect x={-155} y={-100} width={310} height={200} rx={8} />
      </clipPath>
      <g clipPath="url(#tvclip)">
        <Stage fall={fall} w={310} h={200} />
      </g>
    </g>
    {children}
  </g>
);

const Couch: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-150} width={340} height={110} rx={30} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
    <rect x={-190} y={-60} width={380} height={70} rx={24} fill="#a28cf5" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-200} y={-110} width={50} height={120} rx={22} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
    <rect x={150} y={-110} width={50} height={120} rx={22} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
  </g>
);

// Yan görünüşte beyin; iki parlayan bölge (ön singulat + ön insula)
const ScanBrain: React.FC<{ x: number; y: number; scale?: number; glow: number; labels?: boolean; delay?: number }> = ({
  x,
  y,
  scale = 1,
  glow,
  labels = false,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const pulse = 1 + Math.sin(frame / 4) * 0.12 * glow;
  return (
    <g transform={place(x, y, scale * a)}>
      <path
        d="M -150 20 C -170 -70 -90 -140 -10 -125 C 60 -150 150 -110 160 -30 C 185 20 150 80 90 80 C 60 110 -20 110 -60 85 C -120 95 -150 70 -150 20 Z"
        fill="#f9b6cf"
        stroke={OUTLINE}
        strokeWidth={6}
      />
      <path d="M -100 -60 Q -70 -30 -95 0 M -20 -100 Q -40 -70 -10 -50 M 60 -100 Q 40 -70 75 -55 M 110 -10 Q 80 10 100 45 M -60 40 Q -20 30 0 60" fill="none" stroke="#e07fa3" strokeWidth={6} strokeLinecap="round" />
      <path d="M 120 75 Q 120 120 100 150" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
      <path d="M 120 75 Q 120 120 100 150" fill="none" stroke="#f9b6cf" strokeWidth={12} strokeLinecap="round" />
      {glow > 0 ? (
        <g>
          <ellipse cx={-40} cy={-35} rx={46 * pulse} ry={30 * pulse} fill="#ff3d5e" opacity={0.35 * glow} />
          <ellipse cx={-40} cy={-35} rx={24} ry={16} fill="#ff3d5e" stroke={OUTLINE} strokeWidth={4} opacity={glow} />
          <ellipse cx={-10} cy={30} rx={40 * pulse} ry={28 * pulse} fill="#ff8a2b" opacity={0.35 * glow} />
          <ellipse cx={-10} cy={30} rx={20} ry={14} fill="#ff8a2b" stroke={OUTLINE} strokeWidth={4} opacity={glow} />
        </g>
      ) : null}
      {labels ? (
        <g>
          <NamePlate x={-60} y={-175} text="ÖN SİNGULAT" delay={delay + 20} />
          <NamePlate x={-20} y={160} text="ÖN İNSULA" delay={delay + 28} />
        </g>
      ) : null}
    </g>
  );
};

// 1) Dizide biri rezil oluyor, izleyen yüzünü kapatıyor
const CouchCringe: Visual = ({ durationInFrames }) => {
  const fall = useProgress(durationInFrames * 0.15, durationInFrames * 0.3);
  const cover = useProgress(durationInFrames * 0.3, durationInFrames * 0.45);
  return (
    <g>
      <Paper />
      <rect x={0} y={430} width={900} height={130} fill="#ffd9e3" />
      <TV x={230} y={250} scale={1} fall={fall} />
      <Chip x={230} y={70} text="AY, OLAMAZ!" delay={Math.round(durationInFrames * 0.3)} />
      <Couch x={650} y={520} />
      <Bust x={650} y={470} scale={0.95} shirt={TEAL} mood={cover > 0.1 ? "cringe" : "wow"} cover={cover} blush={cover} />
    </g>
  );
};

// 2) Adı: ikinci el utanç
const CringeName: Visual = ({ durationInFrames }) => {
  const w = useWave(30, 3);
  const fall = useProgress(8, 24);
  const arrow = useProgress(durationInFrames * 0.35, durationInFrames * 0.5);
  return (
    <g>
      <Paper />
      <g transform={place(450, 110, useAppear(4), w)}>
        <rect x={-260} y={-62} width={520} height={124} rx={30} fill={PINK} stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={22} fontFamily={uiFont} fontWeight={800} fontSize={60} textAnchor="middle" fill="#fff" stroke={OUTLINE} strokeWidth={3} paintOrder="stroke">
          İKİNCİ EL UTANÇ
        </text>
      </g>
      <rect x={0} y={470} width={900} height={90} fill="#ffd9e3" />
      <Tripper x={180} y={470} scale={1} fall={fall} />
      <Arrow from={[330, 380]} to={[560, 380]} progress={arrow} color={PINK} />
      <Bust x={710} y={560} scale={0.85} shirt={PURPLE} hair="#2f2f2f" mood="cringe" blush={arrow} />
      <NamePlate x={450} y={220} text="BAŞKASI ADINA UTANMAK" delay={Math.round(durationInFrames * 0.45)} />
    </g>
  );
};

// 3) 619 kişiye utanç verici senaryolar okutuldu
const Survey: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const count = Math.round(619 * useProgress(6, durationInFrames * 0.6));
  const cols = 10;
  const rows = 4;
  return (
    <g>
      <Paper />
      <Note x={190} y={290} width={260} title="SENARYO" text="YANLIŞ KİŞİYE EL SALLADI…" rotate={-4} delay={4} />
      {Array.from({ length: cols * rows }).map((_, i) => {
        const cx = 440 + (i % cols) * 44;
        const cy = 250 + Math.floor(i / cols) * 70;
        const show = frame > 6 + i * 1.2;
        if (!show) return null;
        const c = [PINK, TEAL, BLUE, ORANGE, PURPLE][i % 5];
        return (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            <circle cx={0} cy={-18} r={12} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
            <path d="M -16 14 Q -16 -4 0 -4 Q 16 -4 16 14 Z" fill={c} stroke={OUTLINE} strokeWidth={3} />
          </g>
        );
      })}
      <BigText x={640} y={130} text={`${count}`} size={130} color="#ffd23f" />
      <NamePlate x={640} y={510} text="KATILIMCI" delay={10} />
    </g>
  );
};

// 4) Kişi farkında değil (ayakkabısına tuvalet kâğıdı yapışmış) ama izleyenler utanıyor
const UnawareShirt: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const t = Math.min(frame, durationInFrames);
  const px = 120 + t * 2.2;
  const wiggle = Math.sin(frame / 4) * 6;
  const d = Math.round(durationInFrames * 0.35);
  return (
    <g>
      <Paper />
      <rect x={0} y={400} width={900} height={160} fill="#ffd9e3" />
      <path d={`M ${px - 8} 398 Q ${px - 90} ${402 + wiggle} ${px - 160} ${396 - wiggle} L ${px - 160} 384 Q ${px - 90} ${390 + wiggle} ${px - 8} 386 Z`} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
      <Person x={px} y={400} scale={1.05} shirt={ORANGE} facing="right" walking />
      <g transform={`translate(${px + 110} 120)`}>
        <rect x={-90} y={-30} width={180} height={50} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <text x={0} y={6} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={OUTLINE}>
          LA LA LA
        </text>
      </g>
      <Chip x={450} y={60} text="FARKINDA DEĞİL!" delay={d} />
      <Bust x={170} y={560} scale={0.55} shirt={TEAL} mood="cringe" blush={1} delay={d} />
      <Bust x={760} y={560} scale={0.55} shirt={PURPLE} hair="#2f2f2f" mood="cringe" cover={useProgress(d + 10, d + 24)} blush={1} delay={d + 4} />
    </g>
  );
};

// 5) İzleyen, kişiye atfedilen utançtan daha çok utanıyor
const MoreThanHim: Visual = ({ durationInFrames }) => {
  const p1 = useProgress(8, durationInFrames * 0.35);
  const p2 = useProgress(durationInFrames * 0.3, durationInFrames * 0.65);
  const base = 450;
  const h1 = 150 * p1;
  const h2 = 300 * p2;
  return (
    <g>
      <Paper />
      <line x1={100} y1={base} x2={800} y2={base} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <rect x={210} y={base - h1} width={160} height={h1} rx={10} fill={GREY} stroke={OUTLINE} strokeWidth={5} />
      <rect x={530} y={base - h2} width={160} height={h2} rx={10} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
      <text x={290} y={base + 50} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={OUTLINE}>
        O KİŞİ
      </text>
      <text x={610} y={base + 50} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={OUTLINE}>
        İZLEYEN
      </text>
      <g transform={place(290, base - h1 - 70, 0.4 * Math.max(0.01, p1))}>
        <Bust x={0} y={140} mood="happy" shirt={ORANGE} />
      </g>
      <g transform={place(610, base - h2 - 70, 0.4 * Math.max(0.01, p2))}>
        <Bust x={0} y={140} mood="cringe" shirt={TEAL} blush={1} />
      </g>
      <Chip x={450} y={60} text="UTANÇ" dark delay={4} />
    </g>
  );
};

// 6) Beyin taraması: iki bölge parlıyor
const BrainScan: Visual = ({ durationInFrames }) => {
  const glow = useProgress(durationInFrames * 0.35, durationInFrames * 0.55);
  const slide = useProgress(0, 20);
  return (
    <g>
      <Paper fill="#f3ecff" />
      {/* Tarayıcı */}
      <g transform="translate(200 300)">
        <rect x={-150} y={70} width={300} height={40} rx={10} fill="#d8d3ea" stroke={OUTLINE} strokeWidth={5} />
        <g transform={`translate(${-60 + slide * 60} 0)`}>
          <rect x={-60} y={40} width={200} height={34} rx={14} fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
          <circle cx={-50} cy={30} r={24} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
        </g>
        <circle cx={-40} cy={20} r={120} fill="none" stroke="#fff" strokeWidth={60} />
        <circle cx={-40} cy={20} r={120} fill="none" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={-40} cy={20} r={90} fill="none" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={-40} cy={20} r={150} fill="none" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Arrow from={[380, 280]} to={[460, 280]} progress={useProgress(10, 24)} color={PURPLE} />
      <ScanBrain x={650} y={270} scale={0.95} glow={glow} labels delay={6} />
    </g>
  );
};

// 7) Aynı bölgeler başkasının acısında da çalışıyor
const SocialPain: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const a1 = useProgress(durationInFrames * 0.2, durationInFrames * 0.35);
  const a2 = useProgress(durationInFrames * 0.4, durationInFrames * 0.55);
  const hit = Math.abs(Math.sin(frame / 5));
  return (
    <g>
      <Paper />
      {/* Sol: başparmağa çekiç */}
      <g transform="translate(160 160)">
        <circle cx={0} cy={0} r={95} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-50} y={10} width={80} height={36} rx={16} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
        <g transform={`rotate(${-40 + hit * 40} 50 -10)`}>
          <rect x={-10} y={-60} width={80} height={30} rx={6} fill={GREY} stroke={OUTLINE} strokeWidth={4} />
          <rect x={55} y={-40} width={16} height={80} rx={6} fill="#a8703a" stroke={OUTLINE} strokeWidth={4} transform="rotate(-60 63 0)" />
        </g>
        <path d="M -60 -20 l 10 -20 l 6 14 l 12 -18" fill="none" stroke={ORANGE} strokeWidth={5} strokeLinecap="round" />
      </g>
      <text x={160} y={300} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>
        BAŞKASININ ACISI
      </text>
      {/* Sağ: tökezleme */}
      <g transform="translate(160 430)">
        <clipPath id="pitclip">
          <circle cx={0} cy={0} r={92} />
        </clipPath>
        <circle cx={0} cy={0} r={95} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <g clipPath="url(#pitclip)">
          <rect x={-100} y={40} width={200} height={60} fill="#ffd9e3" />
          <Tripper x={-30} y={50} scale={0.5} fall={Math.min(1, (frame % 60) / 20)} />
          <ellipse cx={10} cy={50} rx={12} ry={5} fill="#ffd23f" stroke={OUTLINE} strokeWidth={3} />
        </g>
      </g>
      <text x={160} y={552} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>
        REZİLLİK
      </text>
      <Arrow from={[270, 170]} to={[470, 250]} progress={a1} color={PINK} />
      <Arrow from={[270, 420]} to={[470, 330]} progress={a2} color={PINK} />
      <ScanBrain x={660} y={290} scale={0.95} glow={Math.max(a1, a2)} />
      <Chip x={660} y={70} text="SOSYAL ACI" delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

// 8) Empati ölçer: ibre yükseldikçe tepki artıyor
const EmpathyMeter: Visual = ({ durationInFrames }) => {
  const p = useProgress(10, durationInFrames * 0.7);
  const angle = -80 + p * 150;
  return (
    <g>
      <Paper />
      <g transform="translate(330 380)">
        <path d="M -220 0 A 220 220 0 0 1 220 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -190 0 A 190 190 0 0 1 -95 -164" fill="none" stroke={GREY} strokeWidth={34} />
        <path d="M -95 -164 A 190 190 0 0 1 95 -164" fill="none" stroke="#ffb3c4" strokeWidth={34} />
        <path d="M 95 -164 A 190 190 0 0 1 190 0" fill="none" stroke={BLUSH} strokeWidth={34} />
        <g transform={`rotate(${angle})`}>
          <path d="M -10 0 L 0 -170 L 10 0 Z" fill={OUTLINE} />
        </g>
        <circle cx={0} cy={0} r={18} fill={OUTLINE} />
        <text x={0} y={70} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={OUTLINE}>
          EMPATİ
        </text>
      </g>
      <Bust x={740} y={560} scale={0.75} shirt={TEAL} mood={p > 0.6 ? "cringe" : "calm"} blush={Math.max(0, p - 0.4) * 1.6} />
      <Heart x={740} y={120} size={1 + p * 1.2} color={PINK} beat delay={6} />
    </g>
  );
};

// 9) Rezil olan arkadaşsa tepki daha güçlü
const FriendFails: Visual = ({ durationInFrames }) => {
  const fall = useProgress(10, 26);
  const g1 = useProgress(20, 40) * 0.45;
  const g2 = useProgress(durationInFrames * 0.4, durationInFrames * 0.6);
  return (
    <g>
      <Paper />
      <line x1={450} y1={30} x2={450} y2={530} stroke={OUTLINE} strokeWidth={4} strokeDasharray="14 12" />
      <NamePlate x={225} y={60} text="YABANCI" delay={2} />
      <NamePlate x={675} y={60} text="ARKADAŞIN" delay={Math.round(durationInFrames * 0.3)} />
      <rect x={60} y={300} width={330} height={10} fill="#ffd9e3" />
      <rect x={510} y={300} width={330} height={10} fill="#ffd9e3" />
      <Tripper x={180} y={300} scale={0.85} fall={fall} shirt={GREY} />
      <Tripper x={630} y={300} scale={0.85} fall={useProgress(durationInFrames * 0.3, durationInFrames * 0.42)} shirt={ORANGE} />
      <Heart x={760} y={140} size={1} color={PINK} beat delay={Math.round(durationInFrames * 0.3)} />
      <ScanBrain x={225} y={440} scale={0.55} glow={g1} />
      <ScanBrain x={675} y={440} scale={0.55 + g2 * 0.12} glow={g2} />
    </g>
  );
};

// 10) Kendini onun yerine koyabilmek
const Shoes: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.4);
  return (
    <g>
      <Paper />
      <Bust x={260} y={560} scale={0.95} shirt={TEAL} mood="calm" />
      <ThoughtBubble x={600} y={200} r={150} delay={6}>
        <g transform="scale(0.75)">
          <Stage fall={Math.min(1, ((frame % 70) / 24))} w={300} h={220} />
        </g>
      </ThoughtBubble>
      <Heart x={260} y={460} size={1.1} color={PINK} beat delay={d} />
      <Chip x={600} y={470} text="EMPATİ İŞARETİ" delay={d} />
      <Sparkles points={[[440, 90], [790, 110], [800, 330]]} />
    </g>
  );
};

// 11) Kapanış: yorumlara yaz
const YourTurn: Visual = ({ durationInFrames }) => {
  const bubbles = ["BEN DE!", "HER DİZİDE!", "SAHNEYİ GEÇİYORUM"];
  return (
    <g>
      <Paper />
      <Bust x={190} y={560} scale={0.9} shirt={PINK} hair="#2f2f2f" mood="talk" />
      {bubbles.map((b, i) => {
        const a = useAppearSafe(8 + i * Math.round(durationInFrames * 0.15));
        const w = b.length * 20 + 60;
        return (
          <g key={b} transform={place(600, 130 + i * 120, a)}>
            <rect x={-w / 2} y={-40} width={w} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
            <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={i === 1 ? PINK : OUTLINE}>
              {b}
            </text>
          </g>
        );
      })}
      <Chip x={600} y={510} text="@ETİKETLE" delay={Math.round(durationInFrames * 0.55)} />
      <BigText x={340} y={110} text="?" size={110} color="#ffd23f" delay={4} />
    </g>
  );
};

// Döngü içinde kancayı güvenle çağırmak için (sabit sayıda öğe)
const useAppearSafe = (delay: number) => useAppear(delay);

export const visuals: Record<string, Visual> = {
  CouchCringe,
  CringeName,
  Survey,
  UnawareShirt,
  MoreThanHim,
  BrainScan,
  SocialPain,
  EmpathyMeter,
  FriendFails,
  Shoes,
  YourTurn,
};
