// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Olumsuzluk yanlılığı / tek kötü yorumu unutamamak (2026-11-21-aksam)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  Heart,
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
const PAPER = "#f3efff";
const SKIN = "#f2c79a";
const TEAL = "#17c3a5";
const BLUE = "#3a8fe0";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff8a2b";
const BLUSH = "#ff5d7a";
const GREEN = "#4cc35a";
const RED2 = "#e5484d";
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


// Döngü içinde kancayı güvenle çağırmak için (sabit sayıda öğe)
const useAppearSafe = (delay: number) => useAppear(delay);

// Yorum satırı (telefon içinde)
const CommentRow: React.FC<{ x: number; y: number; w: number; good: boolean; delay: number; glow?: number }> = ({ x, y, w, good, delay, glow = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      {glow > 0 ? <rect x={-w / 2 - 8} y={-26} width={w + 16} height={52} rx={14} fill={RED2} opacity={0.25 + glow * 0.4} /> : null}
      <rect x={-w / 2} y={-20} width={w} height={40} rx={10} fill={good ? "#eafbe9" : "#ffe3e3"} stroke={OUTLINE} strokeWidth={3} />
      <circle cx={-w / 2 + 22} cy={0} r={12} fill={good ? GREEN : RED2} stroke={OUTLINE} strokeWidth={3} />
      {good ? (
        <path d={`M ${-w / 2 + 16} 0 l 5 5 l 9 -10`} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
      ) : (
        <path d={`M ${-w / 2 + 17} -5 l 10 10 M ${-w / 2 + 27} -5 l -10 10`} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
      )}
      <rect x={-w / 2 + 44} y={-6} width={w - 70} height={8} rx={4} fill={good ? "#9bd49b" : "#e59a9a"} />
    </g>
  );
};

// Telefon; içerik (0,0) ekran merkezinde
const Phone: React.FC<{ x: number; y: number; scale?: number; children?: React.ReactNode }> = ({ x, y, scale = 1, children }) => (
  <g transform={place(x, y, scale)}>
    <rect x={-130} y={-240} width={260} height={480} rx={34} fill="#2f2f3a" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-114} y={-214} width={228} height={428} rx={16} fill="#fff" />
    <rect x={-30} y={-230} width={60} height={8} rx={4} fill="#555" />
    {children}
  </g>
);

// 1) Kanca: telefonda yorumlar; tek kötü yorum parlıyor, kişi gece yatakta onu düşünüyor
const PhoneComments: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const glow = (Math.sin(frame / 5) + 1) / 2;
  const night = useProgress(durationInFrames * 0.55, durationInFrames * 0.7);
  const rows = [true, true, true, false, true, true, true];
  return (
    <g>
      <Paper fill={night > 0.5 ? "#2c2550" : PAPER} />
      {night > 0.5 ? <Sparkles points={[[80, 70], [820, 60], [760, 160], [140, 190]]} color="#ffe27a" /> : null}
      <Phone x={250} y={290} scale={1}>
        <text x={0} y={-180} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={OUTLINE}>
          YORUMLAR
        </text>
        {rows.map((g, i) => (
          <CommentRow key={i} x={0} y={-130 + i * 52} w={200} good={g} delay={4 + i * 5} glow={g ? 0 : glow} />
        ))}
      </Phone>
      <Chip x={250} y={40} text="99 ✓  1 ✗" delay={30} />
      <Bust x={650} y={560} scale={0.95} shirt={PURPLE} mood={night > 0.5 ? "cringe" : "calm"} />
      <ThoughtBubble x={680} y={150} r={80} delay={Math.round(durationInFrames * 0.6)}>
        <g>
          <rect x={-60} y={-22} width={120} height={44} rx={10} fill="#ffe3e3" stroke={OUTLINE} strokeWidth={3} />
          <path d="M -16 -10 l 32 20 M 16 -10 l -32 20" stroke={RED2} strokeWidth={6} strokeLinecap="round" />
        </g>
      </ThoughtBubble>
    </g>
  );
};

// 2) Adı: büyük terazi değil, beyin elinde kötü tarafı ağır tutuyor
const BiasName: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  return (
    <g>
      <Paper />
      <Brain x={450} y={300} scale={1.3} mood="confused" />
      <BigText x={220} y={170} text="−" size={130} color={RED2} delay={10} />
      <BigText x={680} y={170} text="+" size={90} color={GREEN} delay={16} />
      <NamePlate x={450} y={500} text="OLUMSUZLUK YANLILIĞI" delay={d} />
    </g>
  );
};

// Terazi; tilt: pozitif = sol taraf aşağı (derece)
const Balance: React.FC<{ x: number; y: number; tilt: number; left: React.ReactNode; right: React.ReactNode }> = ({ x, y, tilt, left, right }) => {
  const rad = (tilt * Math.PI) / 180;
  const lx = -200 * Math.cos(rad);
  const ly = 200 * Math.sin(rad);
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M -60 260 L 60 260 L 20 230 L -20 230 Z" fill="#8a6cf0" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-10} y={0} width={20} height={232} fill="#c9b8ff" stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${-tilt})`}>
        <rect x={-210} y={-8} width={420} height={16} rx={8} fill="#c9b8ff" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <circle cx={0} cy={0} r={14} fill={ORANGE} stroke={OUTLINE} strokeWidth={5} />
      {[
        [lx, ly, left],
        [-lx, -ly, right],
      ].map(([px, py, c], i) => (
        <g key={i} transform={`translate(${px as number} ${py as number})`}>
          <line x1={-50} y1={70} x2={0} y2={0} stroke={OUTLINE} strokeWidth={3} />
          <line x1={50} y1={70} x2={0} y2={0} stroke={OUTLINE} strokeWidth={3} />
          <path d="M -70 70 L 70 70 Q 60 100 0 100 Q -60 100 -70 70 Z" fill="#ffd23f" stroke={OUTLINE} strokeWidth={5} />
          <g transform="translate(0 40)">{c as React.ReactNode}</g>
        </g>
      ))}
    </g>
  );
};

// 3) Kötü daha güçlü: terazi kötü tarafa yatıyor
const Scale: Visual = ({ durationInFrames }) => {
  const p = useProgress(durationInFrames * 0.2, durationInFrames * 0.5);
  const tilt = -14 * p + 3 * (1 - p);
  return (
    <g>
      <Paper />
      <Balance
        x={450}
        y={200}
        tilt={-tilt}
        left={
          <g>
            <Heart x={-30} y={0} size={0.45} color={GREEN} />
            <Heart x={30} y={0} size={0.45} color={GREEN} />
            <Heart x={0} y={-30} size={0.45} color={GREEN} />
          </g>
        }
        right={
          <g>
            <circle cx={0} cy={-6} r={36} fill="#3b3b4a" stroke={OUTLINE} strokeWidth={5} />
            <text x={0} y={6} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill="#fff">
              ✗
            </text>
          </g>
        }
      />
      <Chip x={230} y={70} text="İYİ" delay={6} />
      <Chip x={670} y={70} text="KÖTÜ" dark delay={10} />
      <Chip x={450} y={515} text="KÖTÜ > İYİ" delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

// Para banknotu
const Bill: React.FC<{ x: number; y: number; rot?: number; scale?: number }> = ({ x, y, rot = 0, scale = 1 }) => (
  <g transform={place(x, y, scale, rot)}>
    <rect x={-70} y={-36} width={140} height={72} rx={8} fill="#9be29b" stroke={OUTLINE} strokeWidth={5} />
    <circle cx={0} cy={0} r={22} fill="#d8f5d8" stroke={OUTLINE} strokeWidth={3} />
    <text x={0} y={10} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={OUTLINE}>
      50
    </text>
  </g>
);

// 4) Elli lira: kazanınca küçük gülümseme, kaybedince büyük üzüntü (çubuklar)
const MoneyTest: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const p1 = useProgress(8, durationInFrames * 0.35);
  const p2 = useProgress(durationInFrames * 0.4, durationInFrames * 0.7);
  const fly = useProgress(durationInFrames * 0.4, durationInFrames * 0.65);
  return (
    <g>
      <Paper />
      <Bust x={225} y={430} scale={0.7} shirt={TEAL} mood="happy" />
      <Bill x={225} y={110 - (1 - p1) * 60} rot={-8} scale={0.9 * Math.min(1, p1 * 3)} />
      <Chip x={225} y={470} text="+50 ₺" delay={6} />
      <rect x={140} y={510} width={170 * p1 * 0.5} height={26} rx={8} fill={GREEN} stroke={OUTLINE} strokeWidth={4} />
      <Bust x={675} y={430} scale={0.7} shirt={ORANGE} mood="cringe" delay={Math.round(durationInFrames * 0.35)} />
      <Bill x={675 + fly * 160} y={110 - fly * 90} rot={fly * 40 + Math.sin(frame / 4) * 6} scale={0.9 * (1 - fly * 0.4)} />
      <Chip x={675} y={470} text="−50 ₺" dark delay={Math.round(durationInFrames * 0.38)} />
      <rect x={560} y={510} width={230 * p2} height={26} rx={8} fill={RED2} stroke={OUTLINE} strokeWidth={4} />
      <line x1={450} y1={60} x2={450} y2={500} stroke={GREY} strokeWidth={4} strokeDasharray="12 12" />
    </g>
  );
};

// Takvim yaprağı
const CalPage: React.FC<{ x: number; y: number; label: string; mood: "sad" | "happy" | "meh"; dark?: number; delay: number }> = ({ x, y, label, mood, dark = 0, delay }) => {
  const a = useAppear(delay);
  const face = mood === "happy" ? "M -26 22 Q 0 46 26 22" : mood === "sad" ? "M -26 38 Q 0 16 26 38" : "M -24 30 L 24 30";
  return (
    <g transform={place(x, y, a)}>
      <rect x={-100} y={-120} width={200} height={240} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-100} y={-120} width={200} height={56} rx={14} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
      <text x={0} y={-80} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill="#fff">
        {label}
      </text>
      <rect x={-96} y={-60} width={192} height={176} fill="#5a5a7a" opacity={dark * 0.45} />
      <circle cx={-26} cy={-10} r={8} fill={OUTLINE} />
      <circle cx={26} cy={-10} r={8} fill={OUTLINE} />
      <path d={face} fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

// Bulut
const Cloud: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <path d="M -70 20 Q -90 -20 -50 -30 Q -40 -70 0 -60 Q 40 -80 60 -40 Q 100 -30 80 20 Z" fill="#7b7b93" stroke={OUTLINE} strokeWidth={5} />
    {[-40, 0, 40].map((dx) => (
      <line key={dx} x1={dx} y1={30} x2={dx - 10} y2={56} stroke={BLUE} strokeWidth={5} strokeLinecap="round" />
    ))}
  </g>
);

// 5) Kötü gün ertesi güne sarkıyor; iyi gün sarkmıyor
const Calendar: Visual = ({ durationInFrames }) => {
  const drift = useProgress(durationInFrames * 0.2, durationInFrames * 0.45);
  const arrowP = useProgress(durationInFrames * 0.15, durationInFrames * 0.35);
  const d2 = Math.round(durationInFrames * 0.5);
  return (
    <g>
      <Paper />
      <CalPage x={150} y={190} label="PAZARTESİ" mood="sad" dark={1} delay={4} />
      <CalPage x={400} y={190} label="SALI" mood="meh" dark={drift} delay={10} />
      <Cloud x={150 + drift * 250} y={70} scale={0.8} />
      <Arrow from={[260, 330]} to={[330, 330]} progress={arrowP} color={RED2} />
      <CalPage x={600} y={390} label="İYİ GÜN" mood="happy" delay={d2} />
      <CalPage x={810} y={390} label="ERTESİ" mood="meh" delay={d2 + 6} />
      <BigText x={706} y={250} text="=" size={70} color={GREY} delay={d2 + 10} />
      <Chip x={250} y={470} text="SARKIYOR!" delay={Math.round(durationInFrames * 0.4)} />
    </g>
  );
};

// EEG çizgisi
const Wave: React.FC<{ x: number; y: number; amp: number; color: string; progress: number }> = ({ x, y, amp, color, progress }) => {
  const pts: string[] = [];
  const n = Math.max(2, Math.round(60 * progress));
  for (let i = 0; i <= n; i++) {
    const t = i / 60;
    const peak = Math.exp(-Math.pow((t - 0.55) * 9, 2));
    const yy = Math.sin(i * 1.3) * 6 - peak * amp;
    pts.push(`${x + t * 300},${y + yy}`);
  }
  return <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />;
};

// 6) Beyin dalgaları: olumsuz resme daha yüksek tepe
const BrainWaves: Visual = ({ durationInFrames }) => {
  const p = useProgress(durationInFrames * 0.15, durationInFrames * 0.7);
  return (
    <g>
      <Paper />
      <g transform={place(110, 160, useAppear(4))}>
        <rect x={-70} y={-60} width={140} height={120} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={0} r={34} fill="#ffd23f" stroke={OUTLINE} strokeWidth={4} />
        <path d="M -14 8 Q 0 22 14 8" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        <circle cx={-11} cy={-8} r={4} fill={OUTLINE} />
        <circle cx={11} cy={-8} r={4} fill={OUTLINE} />
      </g>
      <g transform={place(110, 400, useAppear(10))}>
        <rect x={-70} y={-60} width={140} height={120} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -30 34 L 0 -36 L 30 34 Z" fill={RED2} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <rect x={-4} y={-14} width={8} height={26} fill="#fff" />
        <circle cx={0} cy={22} r={4} fill="#fff" />
      </g>
      <rect x={210} y={70} width={340} height={180} rx={14} fill="#1f1f33" stroke={OUTLINE} strokeWidth={5} />
      <rect x={210} y={310} width={340} height={180} rx={14} fill="#1f1f33" stroke={OUTLINE} strokeWidth={5} />
      <Wave x={230} y={200} amp={50} color={GREEN} progress={p} />
      <Wave x={230} y={450} amp={110} color={RED2} progress={p} />
      <Brain x={730} y={290} scale={0.9} mood="confused" delay={6} />
      <Chip x={730} y={470} text="DAHA GÜÇLÜ!" delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

// 7) Bebekler bile: bebek kızgın yüze dikkatle bakıyor
const Baby: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const a = useAppear(4);
  const look = useProgress(durationInFrames * 0.3, durationInFrames * 0.5);
  const eyeX = -6 + look * 14;
  return (
    <g>
      <Paper />
      <rect x={0} y={430} width={900} height={130} fill="#e2d9ff" />
      {/* Bebek */}
      <g transform={place(330, 330 + Math.sin(frame / 12) * 4, a)}>
        <ellipse cx={0} cy={90} rx={90} ry={70} fill="#ffd6e4" stroke={OUTLINE} strokeWidth={6} />
        <circle cx={0} cy={-20} r={80} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -6 -100 q 10 -20 20 -4" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <circle cx={-28 + eyeX} cy={-24} r={11} fill={OUTLINE} />
        <circle cx={28 + eyeX} cy={-24} r={11} fill={OUTLINE} />
        <ellipse cx={0} cy={18} rx={10} ry={12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-52} cy={6} r={12} fill="#f59ab0" opacity={0.7} />
        <circle cx={52} cy={6} r={12} fill="#f59ab0" opacity={0.7} />
      </g>
      {/* Mutlu ve kızgın yüz kartları */}
      <g transform={place(130, 160, useAppear(10))}>
        <circle r={56} fill="#ffd23f" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -24 10 Q 0 34 24 10" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <circle cx={-18} cy={-12} r={6} fill={OUTLINE} />
        <circle cx={18} cy={-12} r={6} fill={OUTLINE} />
      </g>
      <g transform={place(680, 170, 1 + look * 0.25)}>
        <circle r={56} fill={RED2} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -24 24 Q 0 4 24 24" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <path d="M -30 -26 L -8 -16 M 30 -26 L 8 -16" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <circle cx={-18} cy={-6} r={6} fill={OUTLINE} />
        <circle cx={18} cy={-6} r={6} fill={OUTLINE} />
      </g>
      <Arrow from={[420, 250]} to={[600, 190]} progress={look} color={PURPLE} />
      <Chip x={680} y={300} text="DİKKAT!" dark delay={Math.round(durationInFrames * 0.5)} />
      <Sparkles points={[[600, 100], [770, 110], [760, 240]]} />
    </g>
  );
};

// 8) Atalarımız: çalıdaki tehlike vs meyve
const Ancestor: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const eyes = useProgress(durationInFrames * 0.25, durationInFrames * 0.4);
  const run = useProgress(durationInFrames * 0.45, durationInFrames * 0.9);
  return (
    <g>
      <Paper fill="#e9f6d9" />
      <rect x={0} y={420} width={900} height={140} fill="#b8d98a" />
      {/* Meyve ağacı */}
      <rect x={110} y={250} width={34} height={180} fill="#8a5a32" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={127} cy={210} r={90} fill={GREEN} stroke={OUTLINE} strokeWidth={6} />
      {[[90, 190], [150, 170], [130, 240], [180, 220]].map(([cx, cy]) => (
        <circle key={`${cx}`} cx={cx} cy={cy} r={13} fill={RED2} stroke={OUTLINE} strokeWidth={3} />
      ))}
      <Chip x={127} y={70} text="FIRSAT" delay={8} />
      {/* Çalı ve gözler */}
      <path d="M 600 430 Q 590 330 660 320 Q 700 260 760 310 Q 840 300 830 430 Z" fill="#3f8f4a" stroke={OUTLINE} strokeWidth={6} />
      <g opacity={eyes}>
        <ellipse cx={690} cy={360} rx={14} ry={9} fill="#ffd23f" stroke={OUTLINE} strokeWidth={3} />
        <ellipse cx={740} cy={360} rx={14} ry={9} fill="#ffd23f" stroke={OUTLINE} strokeWidth={3} />
        <rect x={687} y={352} width={6} height={16} fill={OUTLINE} />
        <rect x={737} y={352} width={6} height={16} fill={OUTLINE} />
      </g>
      <Chip x={715} y={250} text="TEHLİKE!" dark delay={Math.round(durationInFrames * 0.35)} />
      {/* Atamız: tehlikeyi görüp kaçıyor */}
      <g transform={`translate(${-run * 200} 0)`}>
        <Person x={450} y={440} scale={0.95} shirt="#b5733f" pants="#6b4423" hair="#2f2f2f" facing={run > 0 ? "left" : "right"} walking={run > 0 && run < 1} />
      </g>
      {run > 0 ? <QuestionMarkLike x={450 - run * 200} y={200 + Math.sin(frame / 3) * 4} /> : null}
    </g>
  );
};

const QuestionMarkLike: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <text x={x} y={y} fontFamily={uiFont} fontWeight={800} fontSize={80} textAnchor="middle" fill={RED2} stroke={OUTLINE} strokeWidth={4} paintOrder="stroke">
    !
  </text>
);

// 9) Beşe bir: beş yeşil kalp ve bir kara bulut
const FiveToOne: Visual = ({ durationInFrames }) => {
  const step = Math.round(durationInFrames * 0.06);
  return (
    <g>
      <Paper />
      {[0, 1, 2, 3, 4].map((i) => (
        <Heart key={i} x={110 + i * 120} y={200} size={0.85} color={PINK} beat delay={6 + i * step} />
      ))}
      <Cloud x={760} y={200} scale={0.9} />
      <BigText x={450} y={380} text="5 : 1" size={120} color="#ffd23f" delay={6 + 5 * step} />
      <NamePlate x={450} y={500} text="İYİ İLİŞKİ" delay={6 + 5 * step} />
    </g>
  );
};

// 10) İpucu: iyi yorumları say
const CountGood: Visual = ({ durationInFrames }) => {
  const c = Math.round(99 * useProgress(durationInFrames * 0.2, durationInFrames * 0.75));
  return (
    <g>
      <Paper />
      <Phone x={620} y={290} scale={0.95}>
        {[true, true, false, true, true, true, true].map((g, i) => (
          <CommentRow key={i} x={0} y={-150 + i * 52} w={200} good={g} delay={4 + i * 4} />
        ))}
      </Phone>
      <Bust x={220} y={560} scale={0.9} shirt={PURPLE} mood="happy" />
      <g transform={place(220, 110, useAppear(10))}>
        <rect x={-110} y={-50} width={220} height={100} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={18} fontFamily={uiFont} fontWeight={800} fontSize={52} textAnchor="middle" fill={GREEN}>
          ✓ {c}
        </text>
      </g>
      <Chip x={620} y={530} text="İYİLERİ DE SAY" delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

// 11) Kapanış: yorumlara yaz
const YourTurn: Visual = ({ durationInFrames }) => {
  const bubbles = ["BEN DE!", "HÂLÂ DÜŞÜNÜYORUM", "YORUMLARA YAZ"];
  const w = useWave(40, 6);
  return (
    <g>
      <Paper />
      <Bust x={190} y={560} scale={0.9} shirt={PURPLE} hair="#2f2f2f" mood="talk" />
      {bubbles.map((b, i) => {
        const a = useAppearSafe(8 + i * Math.round(durationInFrames * 0.15));
        const bw = b.length * 20 + 60;
        return (
          <g key={b} transform={place(600, 130 + i * 120 + (i === 1 ? w : 0), a)}>
            <rect x={-bw / 2} y={-40} width={bw} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
            <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={i === 1 ? PURPLE : OUTLINE}>
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

export const visuals: Record<string, Visual> = {
  PhoneComments,
  BiasName,
  Scale,
  MoneyTest,
  Calendar,
  BrainWaves,
  Baby,
  Ancestor,
  FiveToOne,
  CountGood,
  YourTurn,
};
