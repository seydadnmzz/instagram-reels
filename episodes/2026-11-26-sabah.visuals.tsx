// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Gözünü ovunca neden ışık görüyorsun? Fosfen (2026-11-26-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  NamePlate,
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
const PAPER = "#e8f8f6";
const SKIN = "#f2c79a";
const TEAL = "#17b3a0";
const DEEP = "#0f7f86";
const BLUE = "#3a8fe0";
const PINK = "#ff6b8b";
const RED = "#e8434b";
const ORANGE = "#ff8a2b";
const YELLOWC = "#ffd23f";
const PURPLE = "#8a5cf6";
const GREEN = "#4caf50";
const NIGHT = "#1d2340";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Kapalı göz karanlığında dönen renkli fosfen desenleri
const Phosphenes: React.FC<{ x: number; y: number; scale?: number; intensity?: number }> = ({
  x,
  y,
  scale = 1,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const colors = [PURPLE, TEAL, YELLOWC, PINK, BLUE, ORANGE];
  return (
    <g transform={place(x, y, scale)} opacity={intensity}>
      {colors.map((c, i) => {
        const ang = frame / 25 + (i * Math.PI * 2) / colors.length;
        const r = 70 + Math.sin(frame / 12 + i) * 25;
        return (
          <circle
            key={i}
            cx={Math.cos(ang) * r}
            cy={Math.sin(ang) * r * 0.7}
            r={26 + Math.sin(frame / 8 + i * 2) * 8}
            fill={c}
            opacity={0.85}
          />
        );
      })}
      {[0, 1, 2].map((i) => {
        const rr = ((frame * 2 + i * 50) % 150) + 10;
        return (
          <circle key={`r${i}`} r={rr} fill="none" stroke={i === 1 ? YELLOWC : "#9ff0e4"} strokeWidth={6} opacity={1 - rr / 160} />
        );
      })}
      <path
        d="M -30 0 L -8 -8 L 0 -30 L 8 -8 L 30 0 L 8 8 L 0 30 L -8 8 Z"
        fill="#fff"
        transform={`rotate(${frame * 3}) scale(${1 + Math.sin(frame / 5) * 0.2})`}
      />
    </g>
  );
};

// Yarım boy karakter; eyes "closed" | "open" | "wow"; rubbing: elleri gözlerde
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  eyes?: "closed" | "open" | "wow";
  mouth?: "calm" | "happy" | "talk" | "o";
  rubbing?: boolean;
  delay?: number;
}> = ({ x, y, scale = 1, shirt = TEAL, hair = "#4a2f1d", eyes = "open", mouth = "calm", rubbing = false, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const sway = Math.sin(frame / 18) * 2;
  const rub = rubbing ? Math.sin(frame / 2.2) * 8 : 0;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${sway} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {eyes === "closed" ? (
          <g>
            <path d="M -38 -204 Q -26 -194 -14 -204" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
            <path d="M 14 -204 Q 26 -194 38 -204" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          </g>
        ) : eyes === "wow" ? (
          <g>
            <circle cx={-26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-26} cy={-204} r={6} fill={OUTLINE} />
            <circle cx={26} cy={-204} r={6} fill={OUTLINE} />
          </g>
        ) : (
          <g>
            <circle cx={-26} cy={-206} r={8} fill={OUTLINE} />
            <circle cx={26} cy={-206} r={8} fill={OUTLINE} />
          </g>
        )}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mouth === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mouth === "talk" ? <ellipse cx={0} cy={-162} rx={18} ry={6 + Math.abs(Math.sin(frame / 3)) * 12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
        {mouth === "o" ? <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} /> : null}
        {mouth === "calm" ? <path d="M -20 -160 Q 0 -166 20 -160" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        <circle cx={-46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
        {rubbing ? (
          <g>
            <path d={`M -80 -60 Q -70 -130 ${-30 + rub} -200`} fill="none" stroke={OUTLINE} strokeWidth={30} strokeLinecap="round" />
            <path d={`M -80 -60 Q -70 -130 ${-30 + rub} -200`} fill="none" stroke={SKIN} strokeWidth={20} strokeLinecap="round" />
            <circle cx={-30 + rub} cy={-202} r={20} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
            <path d={`M 80 -60 Q 70 -130 ${30 - rub} -200`} fill="none" stroke={OUTLINE} strokeWidth={30} strokeLinecap="round" />
            <path d={`M 80 -60 Q 70 -130 ${30 - rub} -200`} fill="none" stroke={SKIN} strokeWidth={20} strokeLinecap="round" />
            <circle cx={30 - rub} cy={-202} r={20} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
          </g>
        ) : null}
      </g>
    </g>
  );
};

// Gözün yandan kesiti: (0,0) göz merkezi, ışık soldan girer, retina sağda
const EyeSection: React.FC<{ x: number; y: number; scale?: number; glow?: number; press?: number }> = ({
  x,
  y,
  scale = 1,
  glow = 0,
  press = 0,
}) => {
  const squash = 1 - press * 0.08;
  return (
    <g transform={place(x, y, scale)}>
      <g transform={`scale(1 ${squash})`}>
        <circle r={150} fill="#ffffff" stroke={OUTLINE} strokeWidth={6} />
        {/* retina */}
        <path d="M 40 -142 A 150 150 0 0 1 40 142" fill="none" stroke={glow > 0 ? YELLOWC : "#f48fb1"} strokeWidth={22} />
        <path d="M 40 -142 A 150 150 0 0 1 40 142" fill="none" stroke={OUTLINE} strokeWidth={3} opacity={0.4} />
        {glow > 0 ? <path d="M 40 -142 A 150 150 0 0 1 40 142" fill="none" stroke={ORANGE} strokeWidth={40 * glow} opacity={0.35} /> : null}
        {/* kornea ve iris */}
        <path d="M -150 -60 Q -200 0 -150 60" fill="#cdeffd" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-150} y={-60} width={16} height={120} fill={DEEP} stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={-108} cy={0} rx={22} ry={52} fill="#d9f4ff" stroke={OUTLINE} strokeWidth={5} />
      </g>
      {/* görme siniri */}
      <path d="M 145 0 C 200 0 230 20 290 30" fill="none" stroke={OUTLINE} strokeWidth={34} strokeLinecap="round" />
      <path d="M 145 0 C 200 0 230 20 290 30" fill="none" stroke={YELLOWC} strokeWidth={24} strokeLinecap="round" />
    </g>
  );
};

// Parmak ucu (yuvarlak uçlu el); (0,0) parmak ucu, sağa bakar
const Finger: React.FC<{ x: number; y: number; scale?: number; rotate?: number }> = ({ x, y, scale = 1, rotate = 0 }) => (
  <g transform={place(x, y, scale, rotate)}>
    <path d="M 0 -26 L -160 -40 Q -200 0 -160 40 L 0 26 Q 26 0 0 -26 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -6 -16 Q 8 0 -6 16" fill="#fff" stroke={OUTLINE} strokeWidth={3} opacity={0.7} />
  </g>
);

// Yıldırım sinyali (sinir boyunca giden darbe)
const Zap: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = YELLOWC }) => (
  <path
    transform={place(x, y, scale)}
    d="M -10 -40 L 14 -40 L 2 -8 L 20 -8 L -14 42 L -4 6 L -22 6 Z"
    fill={color}
    stroke={OUTLINE}
    strokeWidth={4}
    strokeLinejoin="round"
  />
);

// 1) Kanca: kapalı göz, ovuşturma, karanlıkta renkli ışıklar
const RubHook: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const show = useProgress(d(0.15), d(0.4));
  return (
    <g>
      <Paper />
      <Bust x={230} y={560} scale={1.15} eyes="closed" rubbing mouth="o" />
      <g transform={place(620, 230, 0.4 + show * 0.6)}>
        <rect x={-230} y={-170} width={460} height={340} rx={40} fill={NIGHT} stroke={OUTLINE} strokeWidth={6} />
        <Phosphenes x={0} y={0} scale={1.1} intensity={show} />
      </g>
      <ThoughtBubble x={410} y={440} r={18} delay={d(0.1)} />
      <Chip x={620} y={480} text="NE OLUYOR?!" delay={d(0.5)} />
    </g>
  );
};

// 2) Adı: fosfen = ışıksız ışık
const PhospheneName: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const x = useProgress(d(0.35), d(0.5));
  return (
    <g>
      <Paper />
      <g transform={place(250, 250, useAppear(2))}>
        <rect x={-180} y={-160} width={360} height={320} rx={36} fill={NIGHT} stroke={OUTLINE} strokeWidth={6} />
        <Phosphenes x={0} y={0} scale={0.9} />
      </g>
      <BigText x={640} y={150} text="FOSFEN" size={96} color={YELLOWC} delay={d(0.1)} />
      {/* güneş + üstü çizili: ışık girmiyor */}
      <g transform={place(640, 360, useAppear(d(0.25)))}>
        <circle r={56} fill={YELLOWC} stroke={OUTLINE} strokeWidth={6} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line
            key={i}
            x1={Math.cos((i * Math.PI) / 4) * 72}
            y1={Math.sin((i * Math.PI) / 4) * 72}
            x2={Math.cos((i * Math.PI) / 4) * 96}
            y2={Math.sin((i * Math.PI) / 4) * 96}
            stroke={OUTLINE}
            strokeWidth={8}
            strokeLinecap="round"
          />
        ))}
        <line x1={-110} y1={-110} x2={-110 + 220 * x} y2={-110 + 220 * x} stroke={RED} strokeWidth={20} strokeLinecap="round" opacity={x > 0 ? 1 : 0} />
      </g>
      <Chip x={640} y={500} text="IŞIK YOK!" delay={d(0.55)} />
    </g>
  );
};

// 3) Basınç: parmak göze bastırıyor, retina uyarılıyor
const PressEye: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const press = Math.max(0, Math.sin(frame / 7));
  const glow = useProgress(d(0.35), d(0.5));
  return (
    <g>
      <Paper />
      <EyeSection x={420} y={280} scale={1.1} press={press} glow={glow} />
      <Finger x={292 + press * 16} y={172} rotate={35} scale={0.9} />
      <Chip x={170} y={470} text="BASINÇ" delay={d(0.15)} />
      <Chip x={720} y={90} text="RETİNA" delay={d(0.4)} />
      <Arrow from={[720, 125]} to={[620, 190]} progress={useProgress(d(0.42), d(0.55))} />
    </g>
  );
};

// 4) Retina hücreleri ışık gibi ateşliyor
const RetinaFire: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const cells = [0, 1, 2, 3, 4];
  return (
    <g>
      <Paper />
      {/* solda ışık, sağda basınç: ikisi de aynı sinyal */}
      <g transform={place(150, 170, useAppear(2))}>
        <circle r={50} fill={YELLOWC} stroke={OUTLINE} strokeWidth={5} />
        <text y={100} fontFamily={uiFont} fontWeight={900} fontSize={28} textAnchor="middle" fill={OUTLINE}>
          IŞIK
        </text>
      </g>
      <g transform={place(150, 400, useAppear(d(0.2)))}>
        <Finger x={40} y={0} scale={0.55} />
        <text y={80} fontFamily={uiFont} fontWeight={900} fontSize={28} textAnchor="middle" fill={OUTLINE}>
          BASINÇ
        </text>
      </g>
      <Arrow from={[220, 180]} to={[350, 260]} progress={useProgress(d(0.05), d(0.2))} />
      <Arrow from={[220, 390]} to={[350, 310]} progress={useProgress(d(0.25), d(0.4))} />
      {/* sinir hücreleri */}
      {cells.map((i) => {
        const y = 150 + i * 65;
        const on = Math.floor((frame + i * 5) / 6) % 3 === 0;
        return (
          <g key={i}>
            <line x1={430} y1={y} x2={700} y2={y} stroke={OUTLINE} strokeWidth={8} />
            <circle cx={420} cy={y} r={24} fill={on ? YELLOWC : "#f48fb1"} stroke={OUTLINE} strokeWidth={5} />
            <Zap x={470 + ((frame * 6 + i * 50) % 230)} y={y} scale={0.55} />
          </g>
        );
      })}
      <Chip x={770} y={470} text="AYNI SİNYAL" delay={d(0.5)} />
    </g>
  );
};

// 5) Beyin sinyalin kaynağına bakmıyor
const BrainReads: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const zx = 120 + ((frame * 7) % 420);
  return (
    <g>
      <Paper />
      <path d="M 90 300 C 250 260 400 340 560 290" fill="none" stroke={OUTLINE} strokeWidth={34} strokeLinecap="round" />
      <path d="M 90 300 C 250 260 400 340 560 290" fill="none" stroke={YELLOWC} strokeWidth={24} strokeLinecap="round" />
      <Zap x={zx} y={295} scale={0.9} />
      <text x={300} y={380} fontFamily={uiFont} fontWeight={900} fontSize={28} textAnchor="middle" fill={OUTLINE}>
        GÖRME SİNİRİ
      </text>
      <Brain x={700} y={280} scale={1.3} delay={2} />
      <ThoughtBubble x={740} y={110} r={72} delay={d(0.45)}>
        <text y={12} fontFamily={uiFont} fontWeight={900} fontSize={34} textAnchor="middle" fill={OUTLINE}>
          IŞIK!
        </text>
      </ThoughtBubble>
      <Sparkles points={[[640, 60], [840, 220], [600, 420]]} />
    </g>
  );
};

// 6) Müller: her duyu siniri kendi dilinde konuşur
const NerveLaw: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const rows = [
    { label: "GÖZ", out: "IŞIK", color: YELLOWC },
    { label: "KULAK", out: "SES", color: BLUE },
    { label: "DERİ", out: "DOKUNUŞ", color: PINK },
  ];
  const a = [useAppear(d(0.3)), useAppear(d(0.42)), useAppear(d(0.54))];
  return (
    <g>
      <Paper />
      <Person x={150} y={470} scale={1.45} shirt="#ffffff" hair="#6b6b6b" mustache presenting delay={2} />
      <NamePlate x={150} y={515} text="JOHANNES MÜLLER" delay={d(0.1)} />
      {rows.map((r, i) => (
        <g key={r.label} transform={place(600, 130 + i * 130, a[i])}>
          <rect x={-250} y={-40} width={190} height={80} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={-155} y={12} fontFamily={uiFont} fontWeight={900} fontSize={30} textAnchor="middle" fill={OUTLINE}>
            {r.label}
          </text>
          <Arrow from={[-50, 0]} to={[40, 0]} progress={1} />
          <rect x={60} y={-40} width={210} height={80} rx={18} fill={r.color} stroke={OUTLINE} strokeWidth={5} />
          <text x={165} y={12} fontFamily={uiFont} fontWeight={900} fontSize={30} textAnchor="middle" fill={OUTLINE}>
            {r.out}
          </text>
        </g>
      ))}
    </g>
  );
};

// 7) Newton: göz kenarına bastırınca renkli halka
const NewtonRing: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const ring = useAppear(d(0.4));
  const hue = frame * 4;
  return (
    <g>
      <Paper />
      <Person x={200} y={470} scale={1.45} shirt="#7a4fd6" hair="#e8e8e8" delay={2} />
      <NamePlate x={200} y={515} text="ISAAC NEWTON" delay={d(0.1)} />
      {/* kitap/defter */}
      <g transform={place(390, 400, useAppear(d(0.2)), -8)}>
        <rect x={-60} y={-40} width={120} height={80} rx={6} fill="#fff7d6" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -40 -15 H 40 M -40 5 H 30 M -40 25 H 20" stroke="#9a8b6a" strokeWidth={5} strokeLinecap="round" />
      </g>
      <g transform="translate(660 250)">
        <circle r={190} fill={NIGHT} stroke={OUTLINE} strokeWidth={6} />
        <g transform={`scale(${ring})`}>
          <circle cx={70} cy={0} r={70} fill="none" stroke={`hsl(${hue % 360} 90% 65%)`} strokeWidth={20} />
          <circle cx={70} cy={0} r={70} fill="none" stroke={`hsl(${(hue + 120) % 360} 90% 65%)`} strokeWidth={8} opacity={0.8} />
        </g>
        <Finger x={-170} y={0} scale={0.7} />
        <Arrow from={[-60, -120]} to={[40, -90]} progress={useProgress(d(0.3), d(0.45))} color="#fff" />
      </g>
      <Chip x={660} y={500} text="RENKLİ HALKA" delay={d(0.55)} />
    </g>
  );
};

// 8) Uzayda ışık çakmaları
const SpaceFlash: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const flash = frame % 24 < 4;
  const rayX = -100 + ((frame * 14) % 1100);
  const bob = useWave(80, 10);
  const stars: [number, number][] = [
    [80, 60], [200, 140], [320, 40], [820, 80], [760, 460], [60, 420], [520, 500], [860, 300],
  ];
  return (
    <g>
      <Paper fill={NIGHT} />
      {stars.map(([sx, sy], i) => (
        <circle key={i} cx={sx} cy={sy} r={3 + (i % 3)} fill="#fff" opacity={0.8} />
      ))}
      <circle cx={790} cy={130} r={60} fill="#cfd6e6" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={770} cy={115} r={12} fill="#aab3c8" />
      <circle cx={812} cy={150} r={8} fill="#aab3c8" />
      {/* kozmik ışın */}
      <line x1={rayX - 140} y1={60 + rayX * 0.35} x2={rayX} y2={110 + rayX * 0.35} stroke={PINK} strokeWidth={6} strokeLinecap="round" />
      <g transform={place(420, 300 + bob, useAppear(2))}>
        <rect x={-110} y={60} width={220} height={140} rx={40} fill="#f2f2f2" stroke={OUTLINE} strokeWidth={6} />
        <circle r={120} fill="#f2f2f2" stroke={OUTLINE} strokeWidth={6} />
        <ellipse cx={0} cy={0} rx={88} ry={72} fill="#1b3a5c" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -40 0 Q -28 10 -16 0 M 16 0 Q 28 10 40 0" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
        {flash ? <Sparkles points={[[-30, -30], [40, -20]]} color="#ffffff" /> : null}
        {flash ? <circle r={90} fill="#fff" opacity={0.25} /> : null}
      </g>
      <Chip x={420} y={70} text="KOZMİK IŞINLAR?" delay={d(0.4)} />
    </g>
  );
};

// 9) Uyarı: gözünü sert ovma
const GentleTip: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const x = useProgress(d(0.25), d(0.4));
  const pulse = 1 + useWave(20, 0.05);
  return (
    <g>
      <Paper />
      <g transform="translate(260 0)">
        <Bust x={0} y={560} scale={1.05} eyes="closed" rubbing mouth="o" />
        <g opacity={x > 0 ? 1 : 0} stroke={RED} strokeWidth={22} strokeLinecap="round">
          <line x1={-160} y1={110} x2={-160 + 320 * x} y2={110 + 300 * x} />
          <line x1={160} y1={110} x2={160 - 320 * x} y2={110 + 300 * x} />
        </g>
      </g>
      <g transform={place(670, 230, useAppear(d(0.45)) * pulse)}>
        <path d="M 0 -120 L 120 90 L -120 90 Z" fill={YELLOWC} stroke={OUTLINE} strokeWidth={8} strokeLinejoin="round" />
        <text y={70} fontFamily={uiFont} fontWeight={900} fontSize={150} textAnchor="middle" fill={OUTLINE}>
          !
        </text>
      </g>
      <Chip x={670} y={430} text="SERT OVMA!" delay={d(0.55)} />
    </g>
  );
};

// 10) Kapanış: yorum ve etiket
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const bubbles = ["DÖNEN HALKALAR", "RENKLİ BENEKLER", "DAMA TAHTASI!"];
  const a = [useAppear(d(0.15)), useAppear(d(0.3)), useAppear(d(0.45))];
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={1} mouth="talk" />
      <g transform={place(130, 110, useAppear(4))}>
        <rect x={-80} y={-60} width={160} height={120} rx={24} fill={NIGHT} stroke={OUTLINE} strokeWidth={5} />
        <Phosphenes x={0} y={0} scale={0.42} />
      </g>
      {bubbles.map((b, i) => (
        <g key={b} transform={place(620, 110 + i * 115, a[i])}>
          <rect x={-220} y={-40} width={440} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={i === 2 ? DEEP : OUTLINE}>
            {b}
          </text>
        </g>
      ))}
      <Chip x={620} y={490} text="@ETİKETLE" delay={d(0.6)} />
      <Sparkles points={[[380, 60], [860, 230]]} color={GREEN} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  RubHook,
  PhospheneName,
  PressEye,
  RetinaFire,
  BrainReads,
  NerveLaw,
  NewtonRing,
  SpaceFlash,
  GentleTip,
  YourTurn,
};
