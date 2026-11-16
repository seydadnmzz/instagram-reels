// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Ekrana bakınca gözler neden kuruyor / göz kırpmayı unutmak (2026-11-16-aksam)
import { useCurrentFrame } from "remotion";
import { Arrow, BigText, Chip, INK, NamePlate, place, QuestionMark, RED, Sparkles, uiFont, useAppear, useProgress, useWave, YELLOW } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff1e6";
const SKIN = "#f2c79a";
const ORANGE = "#ff8a3d";
const TEAL = "#17b8a5";
const BLUE = "#3a8fe0";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const GREEN = "#5cc46a";
const NIGHT = "#2d2a4a";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Büyük göz; (0,0) merkez, genişlik ~2r. open: 0 (kapalı) – 1 (açık). dry: kızarık damarlar.
const Eye: React.FC<{ x: number; y: number; r?: number; open?: number; dry?: boolean; look?: number; iris?: string; id: string }> = ({
  x,
  y,
  r = 110,
  open = 1,
  dry = false,
  look = 0,
  iris = "#6b4a2e",
  id,
}) => {
  const h = r * 0.62;
  const almond = `M ${-r} 0 Q 0 ${-h * 2} ${r} 0 Q 0 ${h * 2} ${-r} 0 Z`;
  // Üst göz kapağı aşağı iner
  const lidY = -h + (1 - open) * h * 2.1;
  return (
    <g transform={place(x, y)}>
      <defs>
        <clipPath id={`eye-${id}`}>
          <path d={almond} />
        </clipPath>
      </defs>
      <path d={almond} fill={dry ? "#ffe3e3" : "#fff"} />
      <g clipPath={`url(#eye-${id})`}>
        {dry
          ? [
              [-r * 0.9, 6, -r * 0.55, -10, -r * 0.4, 4],
              [-r * 0.9, 20, -r * 0.6, 26, -r * 0.42, 14],
              [r * 0.9, -4, r * 0.6, 8, r * 0.42, -6],
              [r * 0.92, 18, r * 0.65, 14, r * 0.45, 24],
            ].map((p, i) => (
              <path key={i} d={`M ${p[0]} ${p[1]} Q ${p[2]} ${p[3]} ${p[4]} ${p[5]}`} stroke="#e0505a" strokeWidth={3} fill="none" strokeLinecap="round" />
            ))
          : null}
        <circle cx={look * r * 0.3} cy={0} r={r * 0.42} fill={iris} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={look * r * 0.3} cy={0} r={r * 0.2} fill={OUTLINE} />
        <circle cx={look * r * 0.3 + r * 0.12} cy={-r * 0.12} r={r * 0.08} fill="#fff" />
        <rect x={-r - 10} y={-h * 2 - 10} width={r * 2 + 20} height={lidY + h * 2 + 10} fill={SKIN} />
        <path d={`M ${-r - 10} ${lidY} Q 0 ${lidY + 18 * open} ${r + 10} ${lidY}`} fill="none" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <path d={almond} fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      {open < 0.25
        ? [-0.6, -0.3, 0, 0.3, 0.6].map((t) => (
            <line key={t} x1={t * r} y1={h * 0.5} x2={t * r * 1.15} y2={h * 0.5 + 16} stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
          ))
        : null}
    </g>
  );
};

// Kare sayacına göre kırpma: period kare arayla kısa kapanış
const blinkAt = (frame: number, period: number, offset = 0) => {
  const t = (frame + offset) % period;
  return t < 3 ? [1, 0.2, 0.05][t] : t < 6 ? [0.3, 0.7, 1][t - 3] : 1;
};

// Akıllı telefon; (0,0) merkez, 150×280
const Phone: React.FC<{ x: number; y: number; scale?: number; rotate?: number; glow?: string; children?: React.ReactNode }> = ({
  x,
  y,
  scale = 1,
  rotate = 0,
  glow = "#9fd8ff",
  children,
}) => (
  <g transform={place(x, y, scale, rotate)}>
    <rect x={-75} y={-140} width={150} height={280} rx={24} fill="#3a3f4a" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-62} y={-118} width={124} height={236} rx={10} fill={glow} />
    <rect x={-20} y={-132} width={40} height={6} rx={3} fill="#22252c" />
    {children}
  </g>
);

// Belden yukarı karakter; (0,0) gövde alt orta; kafa merkezi (0,-200), yarıçap 70
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  open?: number;
  dry?: boolean;
  look?: number;
  mouth?: "flat" | "smile" | "ouch" | "o";
  delay?: number;
}> = ({ x, y, scale = 1, shirt = ORANGE, hair = "#4a2f1d", open = 1, dry = false, look = 0, mouth = "flat", delay = 0 }) => {
  const a = useAppear(delay);
  const lid = -206 - 14 + (1 - open) * 28;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      {[-26, 26].map((ex) => (
        <g key={ex}>
          <circle cx={ex} cy={-206} r={15} fill={dry ? "#ffd6d6" : "#fff"} stroke={OUTLINE} strokeWidth={4} />
          <circle cx={ex + look * 6} cy={-205} r={7} fill={OUTLINE} />
          {open < 1 ? <rect x={ex - 17} y={-224} width={34} height={Math.max(0, lid + 224)} fill={SKIN} /> : null}
          {open < 1 ? <line x1={ex - 16} y1={lid} x2={ex + 16} y2={lid} stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" /> : null}
          {dry ? <path d={`M ${ex - 14} -201 L ${ex - 6} -203 M ${ex + 14} -210 L ${ex + 7} -208`} stroke="#e0505a" strokeWidth={2.5} strokeLinecap="round" /> : null}
        </g>
      ))}
      <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      {mouth === "smile" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
      {mouth === "flat" ? <path d="M -18 -162 L 18 -162" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
      {mouth === "ouch" ? <path d="M -22 -158 Q -11 -170 0 -160 Q 11 -170 22 -158" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
      {mouth === "o" ? <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} /> : null}
      <circle cx={-46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
      <circle cx={46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
    </g>
  );
};

// Kıvrık sıcaklık/yanma çizgileri
const Steam: React.FC<{ x: number; y: number; color?: string }> = ({ x, y, color = RED }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y)}>
      {[-18, 0, 18].map((dx, i) => {
        const up = ((frame * 1.2 + i * 12) % 36) - 0;
        return (
          <path
            key={i}
            d={`M ${dx} ${-up} q 8 -10 0 -20 q -8 -10 0 -20`}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeLinecap="round"
            opacity={1 - up / 40}
          />
        );
      })}
    </g>
  );
};

// 1) Saatlerce telefona baktın, gözler yanıyor
const ScreenStare: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const late = useProgress(0, durationInFrames * 0.6);
  const scroll = (frame * 3) % 60;
  return (
    <g>
      <Paper fill={NIGHT} />
      {[
        [80, 60],
        [180, 130],
        [300, 50],
        [760, 80],
        [840, 170],
        [640, 40],
      ].map(([sx, sy], i) => (
        <circle key={i} cx={sx} cy={sy} r={4} fill="#fff" opacity={0.5 + 0.5 * Math.sin(frame / 8 + i)} />
      ))}
      <path d="M 780 70 a 40 40 0 1 0 40 50 a 32 32 0 1 1 -40 -50 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={330} cy={360} rx={260} ry={160} fill="#9fd8ff" opacity={0.18} />
      <Bust x={300} y={560} scale={1.05} shirt={ORANGE} open={0.85} dry={late > 0.4} mouth={late > 0.4 ? "ouch" : "flat"} />
      <Phone x={560} y={330} scale={0.95} rotate={-8}>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={-50} y={-110 + ((i * 60 + 300 - scroll * 1) % 300) - 40} width={100} height={42} rx={8} fill={[PINK, TEAL, YELLOW, PURPLE, GREEN][i]} opacity={0.85} />
        ))}
      </Phone>
      {late > 0.4 ? <Steam x={274} y={330} /> : null}
      {late > 0.4 ? <Steam x={326} y={330} /> : null}
      <g transform={place(720, 470, useAppear(10))}>
        <rect x={-110} y={-34} width={220} height={68} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={13} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill={INK}>
          {`0${Math.min(3, Math.floor(late * 4))}:${String(Math.floor((late * 240) % 60)).padStart(2, "0")}`}
        </text>
      </g>
      <Chip x={720} y={390} text="SAATLERCE…" delay={14} />
    </g>
  );
};

// 2) Suçlu ışık değil
const NotBlueLight: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const cross = useProgress(durationInFrames * 0.45, durationInFrames * 0.6);
  return (
    <g>
      <Paper />
      <Phone x={300} y={290} scale={1.1}>
        <circle cx={0} cy={0} r={34} fill="#fff" opacity={0.9} />
      </Phone>
      {Array.from({ length: 10 }).map((_, i) => {
        const ang = (i / 10) * Math.PI * 2 + frame / 40;
        const r1 = 190;
        const r2 = 230 + Math.sin(frame / 5 + i) * 10;
        return (
          <line
            key={i}
            x1={300 + Math.cos(ang) * r1}
            y1={290 + Math.sin(ang) * r1}
            x2={300 + Math.cos(ang) * r2}
            y2={290 + Math.sin(ang) * r2}
            stroke={BLUE}
            strokeWidth={10}
            strokeLinecap="round"
          />
        );
      })}
      <g opacity={cross > 0 ? 1 : 0}>
        <line x1={150} y1={110} x2={150 + 300 * cross} y2={110 + 360 * cross} stroke={RED} strokeWidth={22} strokeLinecap="round" />
        <line x1={450} y1={110} x2={450 - 300 * cross} y2={110 + 360 * cross} stroke={RED} strokeWidth={22} strokeLinecap="round" />
      </g>
      <Chip x={680} y={170} text="IŞIK MI?" delay={6} />
      <Chip x={680} y={290} text="HAYIR!" dark delay={Math.round(durationInFrames * 0.55)} />
      <QuestionMark x={680} y={430} size={90} delay={Math.round(durationInFrames * 0.65)} color={ORANGE} />
    </g>
  );
};

// 3) Ekrana dalınca göz kırpmayı unutuyorsun
const ForgotBlink: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const w = useWave(50, 3);
  const bubble = useAppear(Math.round(durationInFrames * 0.3));
  return (
    <g>
      <Paper />
      <Eye id="fb" x={300} y={290} r={190} open={1} look={0.6} />
      <Phone x={680} y={300} scale={0.85} rotate={w}>
        <rect x={-40} y={-60} width={80} height={80} rx={12} fill={PINK} />
        <rect x={-40} y={36} width={80} height={14} rx={7} fill="#fff" />
        <rect x={-40} y={60} width={56} height={14} rx={7} fill="#fff" />
      </Phone>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={470 + i * 30} cy={290} r={7} fill={ORANGE} opacity={0.4 + 0.6 * Math.abs(Math.sin(frame / 8 - i))} />
      ))}
      <g transform={place(300, 70, bubble)}>
        <rect x={-190} y={-38} width={380} height={76} rx={38} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={13} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK}>
          KIRPMAK MI? O NE?
        </text>
      </g>
    </g>
  );
};

// 4) Normalde dakikada ~15 kez
const BlinkCounter: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const period = Math.max(8, Math.floor(durationInFrames / 15));
  const count = Math.min(15, Math.floor(frame / period) + 1);
  const open = blinkAt(frame, period);
  return (
    <g>
      <Paper fill="#ffe7d4" />
      <Eye id="bc" x={290} y={280} r={180} open={open} />
      <g transform={place(700, 260)}>
        <circle r={150} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text y={40} fontFamily={uiFont} fontWeight={800} fontSize={130} textAnchor="middle" fill={ORANGE} stroke={OUTLINE} strokeWidth={5} paintOrder="stroke">
          {count}
        </text>
        <text y={-70} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK}>
          KIRPIŞ
        </text>
      </g>
      <Chip x={700} y={480} text="1 DAKİKA" dark delay={4} />
    </g>
  );
};

// 5) Ekrana bakarken yarıya düşebiliyor
const HalfBlinks: Visual = ({ durationInFrames }) => {
  const p = useProgress(6, durationInFrames * 0.6);
  const bars = [
    { label: "NORMAL", value: 15, color: GREEN },
    { label: "EKRANDA", value: 15 - 7.5 * p, color: RED },
  ];
  return (
    <g>
      <Paper />
      <line x1={140} y1={470} x2={800} y2={470} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {bars.map((b, i) => {
        const h = b.value * 22;
        const x = 280 + i * 330;
        return (
          <g key={i}>
            <rect x={x - 80} y={470 - h} width={160} height={h} rx={14} fill={b.color} stroke={OUTLINE} strokeWidth={5} />
            <text x={x} y={470 - h - 20} fontFamily={uiFont} fontWeight={800} fontSize={48} textAnchor="middle" fill={INK}>
              {i === 0 ? "15" : `${Math.round(b.value)}`}
            </text>
            <text x={x} y={520} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
              {b.label}
            </text>
          </g>
        );
      })}
      <Arrow from={[400, 150]} to={[560, 260]} progress={useProgress(10, 30)} color={RED} />
      <Chip x={690} y={90} text="YARIYA!" delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

// 6) Göz kapağı silecek gibi nem yayar
const Wiper: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const period = Math.max(30, Math.floor(durationInFrames / 2.5));
  const t = (frame % period) / period;
  const open = t < 0.1 ? 1 - t * 10 : t < 0.2 ? (t - 0.1) * 10 : 1;
  const sheen = t > 0.1 && t < 0.5 ? 1 - (t - 0.1) / 0.4 : 0;
  return (
    <g>
      <Paper />
      <Eye id="wp" x={280} y={290} r={190} open={open} />
      <g opacity={sheen}>
        <Sparkles
          points={[
            [180, 260],
            [380, 250],
            [300, 340],
          ]}
          color="#9fd8ff"
        />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          transform={place(150 + i * 85, 160 + Math.sin(frame / 6 + i) * 4)}
          d="M 0 -18 Q 12 0 0 10 Q -12 0 0 -18 Z"
          fill="#62b8ff"
          stroke={OUTLINE}
          strokeWidth={3}
          opacity={sheen}
        />
      ))}
      <g transform={place(700, 230)}>
        <rect x={-150} y={-90} width={300} height={170} rx={20} fill="#cfeefc" stroke={OUTLINE} strokeWidth={6} />
        <g transform={`rotate(${-60 + Math.sin(frame / 7) * 55} 0 70)`}>
          <line x1={0} y1={70} x2={0} y2={-70} stroke={OUTLINE} strokeWidth={10} strokeLinecap="round" />
        </g>
        <circle cx={0} cy={70} r={10} fill={OUTLINE} />
      </g>
      <BigText x={700} y={410} text="=" size={90} color={ORANGE} delay={8} />
      <Chip x={700} y={490} text="SİLECEK" dark delay={14} />
    </g>
  );
};

// 7) Glasgow 1991: beş kat azaldı
const FiveFold: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const shown = Math.min(5, Math.floor(useProgress(6, d) * 5 + 0.001));
  return (
    <g>
      <Paper />
      <g transform={place(220, 300)}>
        <rect x={-150} y={-120} width={300} height={200} rx={16} fill="#3a3f4a" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-132} y={-104} width={264} height={168} rx={8} fill="#9fd8ff" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-110} y={-86 + i * 36} width={160 - (i % 2) * 50 + Math.sin(frame / 10 + i) * 10} height={16} rx={8} fill="#fff" />
        ))}
        <rect x={-30} y={80} width={60} height={40} fill="#3a3f4a" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-90} y={116} width={180} height={18} rx={8} fill="#3a3f4a" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <NamePlate x={220} y={510} text="EKRAN BAŞINDA" delay={4} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={place(470 + i * 85, 180, i < shown ? 1 : 0.0001)}>
          <ellipse rx={34} ry={20} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle r={10} fill={OUTLINE} />
          {i > 0 ? (
            <line x1={-38} y1={-26} x2={38} y2={26} stroke={RED} strokeWidth={7} strokeLinecap="round" opacity={useProgress(d, d + 14)} />
          ) : null}
        </g>
      ))}
      <BigText x={640} y={380} text="÷5" size={150} color={ORANGE} delay={d + 6} />
    </g>
  );
};

// 8) Hızlı oyunda üçte bire
const FastGame: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.45);
  const fast = frame * 12;
  return (
    <g>
      <Paper />
      {/* Oyun ekranı */}
      <g transform={place(270, 240)}>
        <rect x={-200} y={-150} width={400} height={300} rx={22} fill="#3a3f4a" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-180} y={-130} width={360} height={260} rx={10} fill="#1f2a44" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const sx = ((fast + i * 70) % 360) - 180;
          return <circle key={i} cx={-sx} cy={-100 + i * 40} r={5} fill="#fff" />;
        })}
        <g transform={place(-60, 20 + Math.sin(frame / 3) * 30)}>
          <path d="M -40 0 L 30 -22 L 40 0 L 30 22 Z" fill={PINK} stroke={OUTLINE} strokeWidth={4} />
        </g>
        {[0, 1].map((i) => {
          const ex = 180 - ((fast * 0.8 + i * 200) % 380);
          return <circle key={i} cx={ex} cy={-40 + i * 90} r={22} fill={GREEN} stroke={OUTLINE} strokeWidth={4} />;
        })}
      </g>
      <NamePlate x={270} y={440} text="HIZLI OYUN" delay={4} />
      {/* Sayaç: 15 → 5 */}
      <g transform={place(690, 240, useAppear(d))}>
        <circle r={120} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text y={14} fontFamily={uiFont} fontWeight={800} fontSize={86} textAnchor="middle" fill={RED} stroke={OUTLINE} strokeWidth={4} paintOrder="stroke">
          1/3
        </text>
        <text y={70} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={INK}>
          KIRPIŞ
        </text>
      </g>
      <Chip x={690} y={450} text="NEREDEYSE!" dark delay={d + 10} />
    </g>
  );
};

// 9) Kırpış yarım kalıyor
const HalfClosed: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const period = Math.max(24, Math.floor(durationInFrames / 3));
  const t = frame % period;
  const fullOpen = blinkAt(frame, period);
  const halfOpen = t < 3 ? [1, 0.65, 0.55][t] : t < 6 ? [0.65, 0.85, 1][t - 3] : 1;
  return (
    <g>
      <Paper />
      <Eye id="h1" x={230} y={260} r={150} open={fullOpen} />
      <Eye id="h2" x={670} y={260} r={150} open={halfOpen} dry />
      <g transform={place(230, 450, useAppear(6))}>
        <rect x={-120} y={-34} width={240} height={68} rx={16} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
        <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill="#fff">
          TAM KIRPIŞ
        </text>
      </g>
      <g transform={place(670, 450, useAppear(14))}>
        <rect x={-120} y={-34} width={240} height={68} rx={16} fill={RED} stroke={OUTLINE} strokeWidth={5} />
        <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill="#fff">
          YARIM!
        </text>
      </g>
      <Arrow from={[670, 120]} to={[670, 175]} progress={useProgress(16, 30)} color={RED} />
    </g>
  );
};

// 10) Geçici: başını kaldır, uzağa bak, göz kırp
const LookAway: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.25);
  const lookUp = useProgress(d, d + 12);
  const open = frame > d + 12 ? blinkAt(frame, 22) : 1;
  return (
    <g>
      <Paper fill="#e6f4ff" />
      <rect x={560} y={50} width={300} height={240} rx={12} fill="#bfe6ff" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={790} cy={110} r={34} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <path d="M 560 250 Q 640 170 720 240 Q 780 190 860 250 L 860 290 L 560 290 Z" fill={GREEN} stroke={OUTLINE} strokeWidth={4} />
      <line x1={710} y1={50} x2={710} y2={290} stroke={OUTLINE} strokeWidth={6} />
      <rect y={500} width={900} height={60} fill="#f3d9c2" stroke={OUTLINE} strokeWidth={4} />
      <g transform={`rotate(${-8 * lookUp} 260 400)`}>
        <Bust x={260} y={560} scale={1} shirt={ORANGE} open={open} look={lookUp} mouth="smile" />
      </g>
      <Phone x={420} y={470} scale={0.55} rotate={60} />
      <Arrow from={[360, 250]} to={[540, 170]} progress={useProgress(d, d + 14)} color={ORANGE} />
      <Chip x={660} y={370} text="UZAĞA BAK" delay={d + 6} />
      <Chip x={660} y={450} text="GÖZ KIRP!" dark delay={d + 14} />
      <Chip x={210} y={60} text="GEÇİCİ" delay={4} />
    </g>
  );
};

// 11) Sen kaç saat?
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const w = useWave(40, 4);
  const items = ["1–3 SAAT?", "5 SAAT+?"];
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={0.9} mouth="smile" shirt={ORANGE} />
      <Phone x={340} y={420} scale={0.5} rotate={-10} />
      {items.map((c, i) => (
        <g key={i} transform={place(620, 120 + i * 130, useAppear(d + i * 8), i % 2 ? w : -w)}>
          <rect x={-200} y={-46} width={400} height={92} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={13} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={[BLUE, PINK][i]}>
            {c}
          </text>
        </g>
      ))}
      <QuestionMark x={380} y={200} size={80} delay={d + 22} />
      <Chip x={620} y={420} text="YORUMLARA YAZ!" dark delay={d + 28} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  ScreenStare,
  NotBlueLight,
  ForgotBlink,
  BlinkCounter,
  HalfBlinks,
  Wiper,
  FiveFold,
  FastGame,
  HalfClosed,
  LookAway,
  YourTurn,
};
