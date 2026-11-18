// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Proust etkisi / bir kokunun seni birden geçmişe götürmesi (2026-11-18-aksam)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  Bottle,
  Chip,
  NamePlate,
  Person,
  place,
  QuestionMark,
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
const PAPER = "#fff1e6";
const SKIN = "#f2c79a";
const TEAL = "#17c3a5";
const BLUE = "#3a8fe0";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff8a2b";
const CAKE = "#f4c35a";
const CAKE_DARK = "#d99a2b";
const GREY = "#b9b2aa";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

type Mood = "calm" | "squint" | "sneeze" | "closed" | "happy" | "wow" | "dizzy";

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
        {mood === "dizzy" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round">
            {[-26, 26].map((cx) => (
              <path key={cx} transform={`rotate(${frame * 12} ${cx} -206)`} d={`M ${cx} -206 m 0 -2 a 3 3 0 1 1 -3 4 a 7 7 0 1 1 9 -7 a 11 11 0 1 1 -15 10`} />
            ))}
            <path d="M -22 -160 Q -11 -170 0 -160 Q 11 -150 22 -160" strokeWidth={5} />
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


// Yükselen koku dalgaları; (x,y) kaynağın merkezi, dalgalar yukarı ya da verilen açıya doğru akar.
const Scent: React.FC<{ x: number; y: number; angle?: number; scale?: number; color?: string; delay?: number; count?: number }> = ({
  x,
  y,
  angle = 0,
  scale = 1,
  color = ORANGE,
  delay = 0,
  count = 3,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a, angle)}>
      {Array.from({ length: count }).map((_, i) => {
        const dx = (i - (count - 1) / 2) * 30;
        const off = ((frame * 2 + i * 20) % 60) - 30;
        return (
          <path
            key={i}
            d={`M ${dx} 0 q -18 -25 0 -50 q 18 -25 0 -50 q -18 -25 0 -50`}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray="40 22"
            strokeDashoffset={off}
            opacity={0.85}
          />
        );
      })}
    </g>
  );
};

// Madlen keki (deniz kabuğu biçiminde küçük kek); (0,0) merkez, yaklaşık 120×80
const Madeleine: React.FC<{ x: number; y: number; scale?: number; rotate?: number }> = ({ x, y, scale = 1, rotate = 0 }) => (
  <g transform={place(x, y, scale, rotate)}>
    <path d="M -60 20 Q -66 -40 0 -44 Q 66 -40 60 20 Q 0 36 -60 20 Z" fill={CAKE} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    {[-36, -18, 0, 18, 36].map((dx) => (
      <path key={dx} d={`M ${dx * 0.3} 18 L ${dx} -30`} stroke={CAKE_DARK} strokeWidth={4} strokeLinecap="round" />
    ))}
  </g>
);

// Çay fincanı + tabak; (0,0) fincanın alt ortası
const TeaCup: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <ellipse cx={0} cy={8} rx={130} ry={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <path d="M 82 -80 Q 140 -80 128 -40 Q 118 -10 70 -20" fill="none" stroke={OUTLINE} strokeWidth={12} strokeLinecap="round" />
    <path d="M 82 -80 Q 140 -80 128 -40 Q 118 -10 70 -20" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
    <path d="M -90 -100 L 90 -100 Q 86 0 0 2 Q -86 0 -90 -100 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -60 -60 Q 0 -40 60 -60" fill="none" stroke={ORANGE} strokeWidth={6} strokeLinecap="round" />
    <ellipse cx={0} cy={-100} rx={90} ry={16} fill="#c98a45" stroke={OUTLINE} strokeWidth={5} />
  </g>
);

// Küçük çocuk yüzü (anı balonları için); (0,0) yüz merkezi, yarıçap 34
const KidFace: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <circle cx={-34} cy={-8} r={14} fill="#7a4a22" stroke={OUTLINE} strokeWidth={4} />
    <circle cx={34} cy={-8} r={14} fill="#7a4a22" stroke={OUTLINE} strokeWidth={4} />
    <circle cx={0} cy={0} r={34} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
    <path d="M -34 -6 Q -30 -40 0 -38 Q 30 -40 34 -6 Q 10 -22 -34 -6 Z" fill="#7a4a22" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={-12} cy={2} r={5} fill={OUTLINE} />
    <circle cx={12} cy={2} r={5} fill={OUTLINE} />
    <path d="M -12 14 Q 0 26 12 14" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
    <circle cx={-22} cy={12} r={6} fill="#f59ab0" opacity={0.8} />
    <circle cx={22} cy={12} r={6} fill="#f59ab0" opacity={0.8} />
  </g>
);

// Yandan kafa kesiti (sağa bakar); içinde koku soğancığı, ara durak, duygu ve hafıza merkezleri.
// (0,0) kafanın merkezi, yaklaşık 420×420.
const HeadSide: React.FC<{ x: number; y: number; scale?: number; delay?: number; showStop?: boolean; glow?: number; children?: React.ReactNode }> = ({
  x,
  y,
  scale = 1,
  delay = 0,
  showStop = true,
  glow = 0,
  children,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      {/* Kafa ve boyun */}
      <path
        d="M -40 210 L -40 150 Q -190 120 -190 -20 Q -190 -190 0 -200 Q 170 -200 185 -40 Q 188 -10 200 20 Q 214 44 192 50 Q 196 80 180 100 Q 182 130 150 140 Q 90 150 80 150 L 80 210 Z"
        fill={SKIN}
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      {/* Beyin */}
      <path d="M -160 -20 Q -170 -170 0 -175 Q 150 -170 150 -50 Q 150 0 100 10 Q 40 30 -40 20 Q -150 30 -160 -20 Z" fill="#f9c6d8" stroke={OUTLINE} strokeWidth={5} />
      <path d="M -110 -110 Q -80 -90 -100 -60 M -30 -150 Q -50 -120 -20 -100 M 60 -140 Q 40 -110 80 -95 M 100 -60 Q 70 -50 90 -20" fill="none" stroke="#e48aae" strokeWidth={5} strokeLinecap="round" />
      {/* Göz */}
      <circle cx={130} cy={-18} r={10} fill={OUTLINE} />
      {/* Koku soğancığı */}
      <ellipse cx={120} cy={26} rx={34} ry={11} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      {/* Ara durak */}
      {showStop ? <circle cx={-10} cy={-60} r={30} fill="#d9d4ce" stroke={OUTLINE} strokeWidth={4} /> : null}
      {/* Duygu merkezi (badem) */}
      <ellipse cx={30} cy={4} rx={22 + glow * 6} ry={15 + glow * 4} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
      {/* Hafıza merkezi (kıvrık) */}
      <path d="M -20 -2 Q -70 10 -90 -20 Q -100 -45 -78 -50" fill="none" stroke={OUTLINE} strokeWidth={20 + glow * 6} strokeLinecap="round" />
      <path d="M -20 -2 Q -70 10 -90 -20 Q -100 -45 -78 -50" fill="none" stroke={BLUE} strokeWidth={12 + glow * 6} strokeLinecap="round" />
      {children}
    </g>
  );
};

// Kutucuklu ikon kartı (göz, kulak, burun)
const IconCard: React.FC<{ x: number; y: number; kind: "eye" | "ear" | "nose"; delay?: number; faded?: boolean }> = ({ x, y, kind, delay = 0, faded = false }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)} opacity={faded ? 0.4 : 1}>
      <rect x={-55} y={-55} width={110} height={110} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {kind === "eye" ? (
        <g>
          <path d="M -38 0 Q 0 -36 38 0 Q 0 36 -38 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <circle cx={0} cy={0} r={14} fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
          <circle cx={0} cy={0} r={6} fill={OUTLINE} />
        </g>
      ) : null}
      {kind === "ear" ? (
        <g>
          <path d="M -14 34 Q -30 34 -26 14 Q -40 -4 -30 -24 Q -14 -44 10 -38 Q 34 -30 30 -6 Q 26 12 8 18 Q 0 22 4 34 Q 0 44 -14 34 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -12 -14 Q 4 -24 12 -8 Q 14 6 0 6" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        </g>
      ) : null}
      {kind === "nose" ? (
        <g>
          <path d="M 4 -38 Q -6 0 -26 18 Q -30 30 -12 30 Q 0 36 12 30 Q 30 30 26 18 Q 16 10 14 -38" fill={SKIN} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <circle cx={-10} cy={24} r={4} fill={OUTLINE} />
          <circle cx={12} cy={24} r={4} fill={OUTLINE} />
        </g>
      ) : null}
    </g>
  );
};

// "Duygu + hafıza" hedef kutusu
const Target: React.FC<{ x: number; y: number; delay?: number; pulse?: number }> = ({ x, y, delay = 0, pulse = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a * (1 + pulse * 0.08))}>
      <rect x={-110} y={-80} width={220} height={160} rx={30} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={-40} cy={-18} rx={30} ry={20} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
      <path d="M 20 0 Q 30 -40 60 -36 Q 80 -30 70 -10" fill="none" stroke={OUTLINE} strokeWidth={18} strokeLinecap="round" />
      <path d="M 20 0 Q 30 -40 60 -36 Q 80 -30 70 -10" fill="none" stroke={BLUE} strokeWidth={10} strokeLinecap="round" />
      <text x={0} y={52} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={OUTLINE}>
        DUYGU + HAFIZA
      </text>
    </g>
  );
};

// Durak tabelası
const StopSign: React.FC<{ x: number; y: number; delay?: number; faded?: boolean }> = ({ x, y, delay = 0, faded = false }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)} opacity={faded ? 0.35 : 1}>
      <rect x={-6} y={-10} width={12} height={110} fill="#8a8a8a" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-90} y={-70} width={180} height={64} rx={14} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
      <text x={0} y={-28} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill="#fff">
        ARA DURAK
      </text>
    </g>
  );
};

// 1) Sokakta fırın kokusu → çocukluk anısı
const StreetSmell: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const frame = useCurrentFrame();
  const walk = Math.min(frame, d);
  return (
    <g>
      <rect width={900} height={560} fill="#ffe2c4" />
      <circle cx={790} cy={80} r={40} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      {/* Fırın */}
      <g>
        <rect x={520} y={150} width={340} height={350} fill="#f6a96b" stroke={OUTLINE} strokeWidth={6} />
        <path d="M 505 150 L 875 150 L 860 110 L 520 110 Z" fill={PINK} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M ${520 + i * 68} 150 q 34 36 68 0`} fill={i % 2 ? "#fff" : PINK} stroke={OUTLINE} strokeWidth={5} />
        ))}
        <rect x={545} y={240} width={170} height={130} rx={8} fill="#fff6e8" stroke={OUTLINE} strokeWidth={5} />
        <Madeleine x={590} y={330} scale={0.45} />
        <Madeleine x={668} y={330} scale={0.45} />
        <path d="M 570 290 Q 630 250 690 290" fill="none" stroke={CAKE_DARK} strokeWidth={14} strokeLinecap="round" />
        <rect x={740} y={260} width={90} height={240} fill="#8a5a32" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={818} cy={385} r={6} fill={YELLOW} />
        <text x={690} y={222} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>
          FIRIN
        </text>
      </g>
      <rect x={0} y={500} width={900} height={60} fill="#c9b8a6" stroke={OUTLINE} strokeWidth={5} />
      <Scent x={530} y={330} angle={-80} scale={1.1} delay={4} />
      <Person x={60 + walk * 4} y={500} scale={0.85} walking={frame < d} walkSpeed={0} shirt={TEAL} facing="right" />
      <ThoughtBubble x={330} y={130} r={85} delay={d + 4}>
        <KidFace x={0} y={6} scale={1.2} />
      </ThoughtBubble>
      <Sparkles points={[[230, 70], [430, 60], [420, 210]]} />
    </g>
  );
};

// 2) Proust etkisi: çaya batırılan kek + roman
const ProustName: Visual = ({ durationInFrames }) => {
  const dip = useProgress(10, durationInFrames * 0.45);
  const dy = Math.sin(dip * Math.PI) * 90;
  const d = Math.round(durationInFrames * 0.4);
  return (
    <g>
      <Paper />
      <rect x={0} y={420} width={900} height={140} fill="#e9b98a" stroke={OUTLINE} strokeWidth={5} />
      <TeaCup x={250} y={430} scale={1.05} />
      <Madeleine x={250} y={180 + dy} scale={0.95} rotate={-20} />
      <Scent x={250} y={300} scale={0.8} color="#d9a877" delay={6} />
      {/* Roman */}
      <g transform={place(650, 260, useAppear(8), 6)}>
        <rect x={-130} y={-170} width={260} height={340} rx={10} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
        <rect x={-110} y={-150} width={220} height={300} rx={6} fill="none" stroke="#fff" strokeWidth={3} />
        <text x={0} y={-80} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#fff">
          KAYIP
        </text>
        <text x={0} y={-42} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#fff">
          ZAMANIN
        </text>
        <text x={0} y={-4} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#fff">
          İZİNDE
        </text>
        <Madeleine x={0} y={80} scale={0.6} />
      </g>
      <NamePlate x={650} y={470} text="MARCEL PROUST · 1913" delay={d} />
      <Chip x={250} y={60} text="PROUST ETKİSİ" delay={d + 10} />
    </g>
  );
};

// 3) Görme ve işitme önce ara duraktan geçer
const SlowRoute: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.1);
  const p1 = useProgress(d, d + 25);
  const p2 = useProgress(d + 50, d + 75);
  const dotX = frame < d + 25 ? 150 + p1 * 300 : frame < d + 50 ? 450 : 450 + p2 * 280;
  const wait = frame >= d + 25 && frame < d + 50;
  return (
    <g>
      <Paper />
      <IconCard x={110} y={170} kind="eye" delay={2} />
      <IconCard x={110} y={330} kind="ear" delay={6} />
      <path d="M 170 250 L 760 250" stroke={GREY} strokeWidth={10} strokeDasharray="20 16" strokeLinecap="round" />
      <StopSign x={450} y={240} delay={10} />
      <Target x={760} y={250} delay={14} />
      <circle cx={dotX} cy={250} r={20} fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
      {wait ? (
        <text x={450} y={380} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={OUTLINE} opacity={0.5 + 0.5 * Math.sin(frame / 3)}>
          . . .
        </text>
      ) : null}
      <Chip x={450} y={470} text="ÖNCE BURAYA UĞRA" dark delay={d + 20} />
    </g>
  );
};

// 4) Koku kestirmeden gider
const DirectRoute: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.12);
  const p = useProgress(d, d + 14);
  const pulse = useWave(12, 1);
  return (
    <g>
      <Paper />
      {/* Eski yol (soluk) */}
      <IconCard x={110} y={120} kind="eye" faded delay={0} />
      <path d="M 170 120 L 640 120" stroke={GREY} strokeWidth={8} strokeDasharray="18 16" opacity={0.5} />
      <StopSign x={420} y={110} faded delay={0} />
      {/* Kestirme */}
      <IconCard x={110} y={380} kind="nose" delay={4} />
      <Scent x={190} y={380} angle={90} scale={0.6} delay={4} />
      <Arrow from={[180, 380]} to={[620, 330]} progress={p} color={ORANGE} />
      {p > 0.3
        ? [0, 1, 2].map((i) => (
            <line key={i} x1={220 + i * 60} y1={410 + i * 8} x2={280 + i * 60} y2={404 + i * 8} stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
          ))
        : null}
      <Target x={760} y={300} delay={8} pulse={p >= 1 ? pulse : 0} />
      <Chip x={420} y={500} text="KESTİRME!" delay={d + 16} />
    </g>
  );
};

// 5) Koku iki merkeze birden dokunur
const TwoCenters: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const glow = useProgress(d + 10, d + 30) * (0.7 + 0.3 * Math.sin(useCurrentFrame() / 4));
  return (
    <g>
      <Paper />
      <HeadSide x={360} y={300} scale={1.15} showStop={false} glow={glow} delay={0} />
      <Scent x={640} y={340} angle={-100} scale={0.75} delay={6} />
      <Arrow from={[640, 300]} to={[530, 300]} progress={useProgress(d, d + 12)} color={ORANGE} />
      <g transform={place(150, 90, useAppear(d + 14))}>
        <rect x={-90} y={-30} width={180} height={60} rx={14} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
        <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#fff">
          DUYGU
        </text>
      </g>
      <g transform={place(150, 500, useAppear(d + 22))}>
        <rect x={-90} y={-30} width={180} height={60} rx={14} fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
        <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#fff">
          HAFIZA
        </text>
      </g>
      <Arrow from={[220, 110]} to={[385, 290]} progress={useProgress(d + 16, d + 28)} color={PINK} />
      <Arrow from={[230, 470]} to={[280, 330]} progress={useProgress(d + 24, d + 36)} color={BLUE} />
      {glow > 0.5 ? <Sparkles points={[[420, 230], [300, 250], [470, 330]]} /> : null}
    </g>
  );
};

// Beyin taraması ekranı
const ScanScreen: React.FC<{ x: number; y: number; label: string; level: number; delay?: number; children?: React.ReactNode }> = ({ x, y, label, level, delay = 0, children }) => {
  const a = useAppear(delay);
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, a)}>
      <rect x={-170} y={-170} width={340} height={300} rx={20} fill="#2f3550" stroke={OUTLINE} strokeWidth={6} />
      <path d="M -110 -20 Q -120 -120 0 -124 Q 110 -120 104 -40 Q 104 0 70 10 Q 20 26 -30 18 Q -104 26 -110 -20 Z" fill="#5b6386" stroke="#9aa3c9" strokeWidth={4} />
      <circle cx={10} cy={-20} r={10 + level * 22} fill={ORANGE} opacity={0.35 + 0.25 * Math.sin(frame / 5) * level} />
      <circle cx={10} cy={-20} r={6 + level * 12} fill={YELLOW} opacity={0.9 * level + 0.1} />
      <circle cx={-46} cy={-30} r={6 + level * 12} fill={YELLOW} opacity={0.9 * level + 0.1} />
      <rect x={-130} y={50} width={260} height={24} rx={12} fill="#4a5070" />
      <rect x={-130} y={50} width={260 * level} height={24} rx={12} fill={ORANGE} />
      <rect x={-100} y={140} width={200} height={56} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <text x={0} y={180} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>
        {label}
      </text>
      {children}
    </g>
  );
};

// 6) Beyin taraması: resim vs koku
const BrainScan: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const p = useProgress(d, d + 30);
  return (
    <g>
      <Paper />
      <ScanScreen x={230} y={250} label="RESİM" level={p * 0.35} delay={2}>
        <g transform="translate(-130 -150)">
          <rect x={0} y={0} width={70} height={52} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
          <path d="M 6 46 L 26 22 L 40 36 L 48 28 L 64 46 Z" fill="#7fb3d5" />
        </g>
      </ScanScreen>
      <ScanScreen x={670} y={250} label="KOKU" level={p} delay={8}>
        <g transform="translate(-120 -110) scale(0.5)">
          <Bottle x={0} y={0} color={PINK} />
        </g>
      </ScanScreen>
      <Chip x={670} y={520} text="DAHA GÜÇLÜ!" delay={d + 30} />
    </g>
  );
};

// Geriye dönen saat
const Clock: React.FC<{ x: number; y: number; r?: number; speed?: number; delay?: number }> = ({ x, y, r = 60, speed = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle cx={0} cy={0} r={r} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={0} y1={-r + 8} x2={0} y2={-r + 16} stroke={OUTLINE} strokeWidth={4} transform={`rotate(${i * 30})`} />
      ))}
      <line x1={0} y1={0} x2={0} y2={-r * 0.7} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" transform={`rotate(${-frame * 14 * speed})`} />
      <line x1={0} y1={0} x2={0} y2={-r * 0.45} stroke={ORANGE} strokeWidth={7} strokeLinecap="round" transform={`rotate(${-frame * 1.2 * speed})`} />
      <circle cx={0} cy={0} r={6} fill={OUTLINE} />
    </g>
  );
};

// 7) Zamanda geri gitme hissi
const TimeTravel: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.2);
  return (
    <g>
      <Paper fill="#ffe7d1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={560}
          cy={250}
          r={((i * 60 + frame * 3) % 300) + 10}
          fill="none"
          stroke={i % 2 ? ORANGE : PURPLE}
          strokeWidth={6}
          opacity={1 - (((i * 60 + frame * 3) % 300) + 10) / 320}
        />
      ))}
      <Clock x={560} y={250} r={80} speed={1} delay={4} />
      <ThoughtBubble x={780} y={100} r={70} delay={d + 6}>
        <KidFace x={0} y={6} scale={1} />
      </ThoughtBubble>
      {/* Yaşlı karakter */}
      <Bust x={210} y={540} scale={0.95} mood="closed" shirt={PURPLE} hair="#e6e6e6" />
      <g transform={place(320, 360, useAppear(6))}>
        <path d="M -30 0 L -36 60 Q 0 72 36 60 L 30 0 Z" fill="#7fc8e0" stroke={OUTLINE} strokeWidth={5} />
        <ellipse cx={0} cy={0} rx={30} ry={10} fill="#bfe6f2" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Scent x={320} y={340} angle={-30} scale={0.6} delay={8} />
      <Chip x={560} y={440} text="GERİ SAR!" delay={d + 12} />
    </g>
  );
};

// 8) Kokunun getirdiği anılar ilk on yıldan
const FirstDecade: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.1);
  const p = useProgress(d, d + 30);
  const q = useProgress(d + 20, d + 50);
  const X0 = 110;
  const W = 680;
  const toX = (age: number) => X0 + (age / 70) * W;
  const odor = [0.55, 1, 0.85, 0.35, 0.2, 0.15, 0.1];
  const other = [0.15, 0.4, 0.75, 0.6, 0.3, 0.2, 0.15];
  return (
    <g>
      <Paper />
      <rect x={toX(0) - 10} y={90} width={toX(10) - toX(0) + 20} height={330} rx={16} fill={YELLOW} opacity={0.45 * p} />
      <line x1={X0} y1={420} x2={X0 + W} y2={420} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {[0, 10, 20, 30, 40, 50, 60, 70].map((age) => (
        <g key={age}>
          <line x1={toX(age)} y1={420} x2={toX(age)} y2={434} stroke={OUTLINE} strokeWidth={4} />
          <text x={toX(age)} y={466} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={OUTLINE}>
            {age}
          </text>
        </g>
      ))}
      <text x={X0 + W + 20} y={466} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={OUTLINE}>
        YAŞ
      </text>
      {odor.map((v, i) => (
        <rect key={`o${i}`} x={toX(i * 10) + 10} y={420 - v * 280 * p} width={36} height={v * 280 * p} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
      ))}
      {other.map((v, i) => (
        <rect key={`b${i}`} x={toX(i * 10) + 52} y={420 - v * 280 * q} width={36} height={v * 280 * q} fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
      ))}
      <g transform={place(660, 90, useAppear(d))}>
        <rect x={-150} y={-32} width={300} height={64} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <rect x={-130} y={-12} width={24} height={24} fill={ORANGE} stroke={OUTLINE} strokeWidth={3} />
        <text x={-96} y={9} fontFamily={uiFont} fontWeight={800} fontSize={22} fill={OUTLINE}>KOKU</text>
        <rect x={-10} y={-12} width={24} height={24} fill={BLUE} stroke={OUTLINE} strokeWidth={3} />
        <text x={22} y={9} fontFamily={uiFont} fontWeight={800} fontSize={22} fill={OUTLINE}>RESİM/SÖZ</text>
      </g>
      <Chip x={250} y={60} text="İLK 10 YIL!" dark delay={d + 34} />
    </g>
  );
};

// 9) Uzun süredir açılmamış çekmece
const DustyDrawer: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.15);
  const open = useProgress(d, d + 25);
  const photo = useAppear(d + 12);
  return (
    <g>
      <Paper />
      {/* Örümcek ağı */}
      <g stroke="#9a948c" strokeWidth={3} fill="none">
        <path d="M 0 0 L 120 120 M 0 60 L 120 120 M 60 0 L 120 120 M 0 30 Q 30 30 30 0 M 0 70 Q 70 70 70 0 M 0 110 Q 110 110 110 0" />
      </g>
      {/* Şifonyer */}
      <rect x={250} y={120} width={400} height={380} rx={14} fill="#b9773e" stroke={OUTLINE} strokeWidth={6} />
      <rect x={280} y={380} width={340} height={90} rx={8} fill="#a86a35" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={450} cy={425} r={9} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
      <rect x={280} y={150} width={340} height={90} rx={8} fill="#a86a35" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={450} cy={195} r={9} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
      {/* Açılan orta çekmece (öne ve aşağı doğru) */}
      <g transform={`translate(0 ${open * 30})`}>
        {open > 0.3 ? (
          <g transform={place(450, 260, photo)}>
            <rect x={-70} y={-60} width={140} height={110} fill="#fff" stroke={OUTLINE} strokeWidth={5} transform="rotate(-6)" />
            <KidFace x={0} y={-8} scale={0.9} />
          </g>
        ) : null}
        <rect x={280 - open * 30} y={265} width={340 + open * 60} height={90 + open * 20} rx={8} fill="#c98a4e" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={450} cy={312 + open * 10} r={10} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
      </g>
      {/* Toz bulutları */}
      {open > 0.05
        ? [-1, 1].map((s) => (
            <g key={s} opacity={Math.max(0, 1 - open * 0.9)}>
              <circle cx={450 + s * (200 + open * 60)} cy={300 - open * 40} r={30} fill="#d8cfc4" stroke={OUTLINE} strokeWidth={3} />
              <circle cx={450 + s * (240 + open * 80)} cy={270 - open * 60} r={20} fill="#d8cfc4" stroke={OUTLINE} strokeWidth={3} />
            </g>
          ))
        : null}
      <Scent x={760} y={360} angle={-80} scale={0.8} delay={2} />
      <Sparkles points={[[380, 230], [530, 240], [450, 160]].map(([x, y]) => [x, y + (frame % 2)] as [number, number])} />
      <Chip x={450} y={60} text="YILLARDIR KAPALI" dark delay={4} />
    </g>
  );
};

// 10) Bugünün kokusu, yarının anısı
const NewMemory: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const flame = useWave(8, 3);
  return (
    <g>
      <Paper />
      {/* Bugün */}
      <Bust x={190} y={500} scale={0.75} mood="happy" shirt={TEAL} />
      <g transform={place(330, 420, useAppear(4))}>
        <rect x={-60} y={-40} width={120} height={70} rx={10} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-60} y={-40} width={120} height={18} rx={8} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        {[-30, 0, 30].map((cx) => (
          <g key={cx}>
            <rect x={cx - 5} y={-72} width={10} height={32} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
            <path d={`M ${cx} ${-88 + flame} q 8 10 0 16 q -8 -6 0 -16 Z`} fill={ORANGE} />
          </g>
        ))}
      </g>
      <Scent x={330} y={330} scale={0.6} delay={6} />
      <Chip x={210} y={70} text="BUGÜN" delay={4} />
      <Arrow from={[420, 280]} to={[560, 280]} progress={useProgress(d, d + 14)} color={ORANGE} />
      {/* Yıllar sonra */}
      <Bust x={710} y={500} scale={0.75} mood="closed" shirt={TEAL} hair="#d9d9d9" delay={d + 10} />
      <Scent x={600} y={360} angle={40} scale={0.5} delay={d + 14} />
      <ThoughtBubble x={720} y={170} r={70} delay={d + 20}>
        <rect x={-34} y={-14} width={68} height={40} rx={6} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
        <rect x={-4} y={-36} width={8} height={22} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
      </ThoughtBubble>
      <Chip x={720} y={70} text="YILLAR SONRA" dark delay={d + 16} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const w = useWave(40, 4);
  const items = ["FIRIN?", "ANNEANNE EVİ?", "YAĞMUR?"];
  return (
    <g>
      <Paper />
      <Bust x={190} y={540} scale={0.9} mood="happy" shirt={ORANGE} />
      <Scent x={190} y={250} scale={0.6} delay={4} />
      {items.map((c, i) => (
        <g key={i} transform={place(610, 90 + i * 115, useAppear(d + i * 8), i % 2 ? w : -w)}>
          <rect x={-200} y={-42} width={400} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={[ORANGE, PINK, PURPLE][i]}>
            {c}
          </text>
        </g>
      ))}
      <QuestionMark x={340} y={220} size={80} delay={d + 26} />
      <Chip x={610} y={480} text="YORUMLARA YAZ!" dark delay={d + 32} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  StreetSmell,
  ProustName,
  SlowRoute,
  DirectRoute,
  TwoCenters,
  BrainScan,
  TimeTravel,
  FirstDecade,
  DustyDrawer,
  NewMemory,
  YourTurn,
};
