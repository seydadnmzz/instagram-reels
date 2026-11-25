// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Biri yukarı bakınca neden sen de bakıyorsun? / bakış takibi (2026-11-25-sabah)
import { useCurrentFrame } from "remotion";
import { Arrow, BigText, Brain, Chip, NamePlate, place, QuestionMark, Sparkles, ThoughtBubble, uiFont, useAppear, useProgress, useWave } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff0f4";
const SKY = "#ffe3ec";
const SKIN = "#f2c79a";
const PINK = "#ff5c8a";
const DEEPPINK = "#d63a6e";
const BLUE = "#3a8fe0";
const TEAL = "#17b3a0";
const ORANGE = "#ff8a2b";
const PURPLE = "#8a6cf0";
const GREY = "#b9b2aa";
const BROWN = "#7a4a2a";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string }> = ({ x, y, text, size = 30, color = OUTLINE }) => (
  <text x={x} y={y} fontFamily={uiFont} fontWeight={900} fontSize={size} textAnchor="middle" fill={color}>
    {text}
  </text>
);

// Sokak zemini: kaldırım + yol çizgisi
const Street: React.FC<{ y?: number }> = ({ y = 470 }) => (
  <g>
    <rect x={0} y={y} width={900} height={560 - y} fill="#e6d3dc" />
    <line x1={0} y1={y} x2={900} y2={y} stroke={OUTLINE} strokeWidth={5} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <line key={i} x1={i * 150 + 20} y1={y + 50} x2={i * 150 + 90} y2={y + 50} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
    ))}
  </g>
);

// Pencereli bina; highlight: parlayan pencere indeksi
const Building: React.FC<{ x: number; y: number; w: number; h: number; color?: string; highlight?: number; glow?: number }> = ({
  x,
  y,
  w,
  h,
  color = "#f7a9c0",
  highlight = -1,
  glow = 0,
}) => {
  const cols = Math.max(2, Math.floor(w / 70));
  const rows = Math.max(2, Math.floor((h - 40) / 80));
  const cw = w / cols;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <rect x={x - 8} y={y - 14} width={w + 16} height={18} fill={DEEPPINK} stroke={OUTLINE} strokeWidth={5} />
      {Array.from({ length: rows * cols }).map((_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const hl = i === highlight;
        return (
          <rect
            key={i}
            x={x + c * cw + cw * 0.22}
            y={y + 24 + r * 80}
            width={cw * 0.56}
            height={50}
            rx={6}
            fill={hl ? `rgba(255,210,63,${0.5 + glow * 0.5})` : "#bfe6ff"}
            stroke={OUTLINE}
            strokeWidth={hl ? 6 : 4}
          />
        );
      })}
    </g>
  );
};

// Ayakta duran karakter; (0,0) ayakların ortası, kafa merkezi (0,-178).
// up: 0 → karşıya bakar, 1 → yukarı bakar (baş geriye eğilir, gözler yukarı)
const Guy: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  up?: number;
  facing?: 1 | -1;
  walking?: boolean;
  point?: boolean;
  delay?: number;
  phase?: number;
  mouth?: "o" | "smile" | "flat";
}> = ({ x, y, scale = 1, shirt = BLUE, hair = "#4a2f1d", up = 0, facing = 1, walking = false, point = false, delay = 0, phase = 0, mouth = "flat" }) => {
  const frame = useCurrentFrame() + phase;
  const a = useAppear(delay);
  const swing = walking ? Math.sin(frame / 4.5) * 22 : 0;
  const bob = walking ? Math.abs(Math.sin(frame / 4.5)) * -4 : 0;
  const tilt = -22 * up;
  return (
    <g transform={`${place(x, y + bob, scale * a)} scale(${facing} 1)`}>
      <ellipse cx={0} cy={2} rx={36} ry={7} fill="rgba(0,0,0,0.15)" />
      {/* Bacaklar */}
      <g stroke={OUTLINE} strokeLinecap="round">
        <line x1={-12} y1={-80} x2={-12 - swing * 0.9} y2={-4} strokeWidth={22} />
        <line x1={12} y1={-80} x2={12 + swing * 0.9} y2={-4} strokeWidth={22} />
        <line x1={-12} y1={-80} x2={-12 - swing * 0.9} y2={-4} strokeWidth={13} stroke="#2f3f63" />
        <line x1={12} y1={-80} x2={12 + swing * 0.9} y2={-4} strokeWidth={13} stroke="#2f3f63" />
      </g>
      {/* Gövde */}
      <path d="M -34 -78 L -30 -130 Q -28 -142 -14 -144 L 14 -144 Q 28 -142 30 -130 L 34 -78 Z" fill={shirt} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      {/* Kollar */}
      <g stroke={OUTLINE} strokeLinecap="round">
        <line x1={-26} y1={-132} x2={-34 + swing * 0.6} y2={-84} strokeWidth={18} />
        <line x1={-26} y1={-132} x2={-34 + swing * 0.6} y2={-84} strokeWidth={9} stroke={shirt} />
        {point ? (
          <>
            <line x1={26} y1={-132} x2={62} y2={-196} strokeWidth={18} />
            <line x1={26} y1={-132} x2={62} y2={-196} strokeWidth={9} stroke={shirt} />
            <circle cx={64} cy={-200} r={9} fill={SKIN} strokeWidth={4} stroke={OUTLINE} />
          </>
        ) : (
          <>
            <line x1={26} y1={-132} x2={34 - swing * 0.6} y2={-84} strokeWidth={18} />
            <line x1={26} y1={-132} x2={34 - swing * 0.6} y2={-84} strokeWidth={9} stroke={shirt} />
          </>
        )}
      </g>
      {/* Baş */}
      <g transform={`rotate(${tilt} 0 -146)`}>
        <circle cx={0} cy={-180} r={36} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -36 -184 Q -34 -222 0 -220 Q 34 -222 36 -186 Q 16 -204 -4 -200 Q -24 -204 -36 -184 Z" fill={hair} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <ellipse cx={4} cy={-182} rx={9} ry={10} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
        <ellipse cx={22} cy={-182} rx={9} ry={10} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
        <circle cx={7 + up * 1} cy={-181 - up * 5} r={4.5} fill={OUTLINE} />
        <circle cx={25 + up * 1} cy={-181 - up * 5} r={4.5} fill={OUTLINE} />
        {mouth === "o" ? <ellipse cx={14} cy={-160} rx={6} ry={7} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={3} /> : null}
        {mouth === "smile" ? <path d="M 4 -164 Q 14 -154 24 -164" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" /> : null}
        {mouth === "flat" ? <line x1={6} y1={-161} x2={22} y2={-161} stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" /> : null}
        <circle cx={-6} cy={-166} r={6} fill="#f59ab0" opacity={0.6} />
      </g>
    </g>
  );
};

// Bakış çizgisi: kesik kesik, kendini çizen
const GazeLine: React.FC<{ from: [number, number]; to: [number, number]; p: number; color?: string }> = ({ from, to, p, color = DEEPPINK }) => {
  const x2 = from[0] + (to[0] - from[0]) * p;
  const y2 = from[1] + (to[1] - from[1]) * p;
  return <line x1={from[0]} y1={from[1]} x2={x2} y2={y2} stroke={color} strokeWidth={6} strokeDasharray="14 12" strokeLinecap="round" opacity={p > 0 ? 1 : 0} />;
};

// Yukarı ok sembolü (yanıp sönen)
const UpArrows: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const a = useAppear(delay);
  const w = useWave(24, 8);
  return (
    <g transform={place(x, y - w, a)} fill={PINK} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round">
      <path d="M 0 -40 L 30 -6 L 12 -6 L 12 30 L -12 30 L -12 -6 L -30 -6 Z" />
    </g>
  );
};

// 1) Kanca: biri yukarı bakıyor, sen de bakıyorsun
const LookUpHook: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const frame = useCurrentFrame();
  const walkX = Math.min(420, 120 + frame * 4);
  const youUp = useProgress(d(0.45), d(0.6));
  const firstUp = useProgress(0, 10);
  return (
    <g>
      <Paper fill={SKY} />
      <Building x={600} y={60} w={260} h={420} highlight={1} glow={useWave(30, 0.5) + 0.5} />
      <Street />
      <Guy x={560} y={480} scale={1.15} shirt={TEAL} hair="#2b2b2b" up={firstUp} />
      <Guy x={walkX} y={480} scale={1.15} shirt={PINK} walking={walkX < 420} up={youUp} mouth={youUp > 0.5 ? "o" : "flat"} />
      <GazeLine from={[575, 280]} to={[770, 110]} p={useProgress(4, d(0.25))} />
      <GazeLine from={[440, 280]} to={[760, 120]} p={useProgress(d(0.55), d(0.75))} color={BLUE} />
      <QuestionMark x={340} y={180} size={80} delay={d(0.62)} color={DEEPPINK} />
      <UpArrows x={120} y={150} delay={d(0.7)} />
    </g>
  );
};

// 2) Orada ne var? Hiçbir şey!
const NothingThere: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const scan = useWave(40, 60);
  const empty = useAppear(d(0.4));
  return (
    <g>
      <Paper />
      {/* Büyük pencere */}
      <rect x={250} y={60} width={400} height={360} rx={16} fill="#bfe6ff" stroke={OUTLINE} strokeWidth={7} />
      <line x1={450} y1={60} x2={450} y2={420} stroke={OUTLINE} strokeWidth={7} />
      <line x1={250} y1={240} x2={650} y2={240} stroke={OUTLINE} strokeWidth={7} />
      <path d="M 250 60 Q 300 200 262 420 L 250 420 Z" fill={PINK} stroke={OUTLINE} strokeWidth={5} />
      <path d="M 650 60 Q 600 200 638 420 L 650 420 Z" fill={PINK} stroke={OUTLINE} strokeWidth={5} />
      <rect x={230} y={420} width={440} height={26} rx={6} fill="#f7a9c0" stroke={OUTLINE} strokeWidth={5} />
      {/* Büyüteç */}
      <g transform={place(450 + scan * 1.6, 220 + scan * 0.6, 1, -20)}>
        <line x1={50} y1={50} x2={110} y2={110} stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
        <line x1={50} y1={50} x2={110} y2={110} stroke={BROWN} strokeWidth={12} strokeLinecap="round" />
        <circle cx={0} cy={0} r={70} fill="rgba(255,255,255,0.45)" stroke={OUTLINE} strokeWidth={10} />
      </g>
      <g opacity={Math.min(1, empty)}>
        <Chip x={450} y={500} text="HİÇBİR ŞEY!" delay={d(0.4)} />
      </g>
      <QuestionMark x={120} y={200} size={90} delay={d(0.15)} color={DEEPPINK} />
      <QuestionMark x={790} y={260} size={70} delay={d(0.25)} color={PURPLE} />
    </g>
  );
};

// 3) Bakış takibi: beyin "orada bir şey var" diyor
const GazeFollow: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const p1 = useProgress(d(0.05), d(0.3));
  const p2 = useProgress(d(0.3), d(0.55));
  return (
    <g>
      <Paper />
      <rect x={0} y={480} width={900} height={80} fill="#f7d0dc" />
      <Guy x={150} y={490} scale={1.25} shirt={TEAL} hair="#2b2b2b" up={0.9} />
      <Guy x={360} y={490} scale={1.25} shirt={PINK} up={p2} mouth="o" facing={1} />
      <GazeLine from={[185, 255]} to={[560, 70]} p={p1} />
      <GazeLine from={[395, 255]} to={[560, 80]} p={p2} color={BLUE} />
      <Sparkles points={[[560, 70], [600, 110], [520, 120]]} />
      <ThoughtBubble x={700} y={290} r={110} delay={d(0.3)}>
        <Brain x={0} y={10} scale={0.55} delay={d(0.34)} />
        <BigText x={70} y={-60} text="!" size={70} color={PINK} delay={d(0.42)} />
      </ThoughtBubble>
      <NamePlate x={700} y={500} text="BAKIŞ TAKİBİ" delay={d(0.2)} />
    </g>
  );
};

// 4) New York kaldırım deneyi
const StreetExperiment: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const frame = useCurrentFrame();
  const glow = useWave(30, 0.5) + 0.5;
  return (
    <g>
      <Paper fill={SKY} />
      <Building x={40} y={40} w={300} h={440} color="#d9c2f2" highlight={4} glow={glow} />
      <Building x={360} y={140} w={180} h={340} color="#ffc9a8" />
      <Street />
      <Guy x={420} y={480} scale={0.95} shirt={TEAL} up={1} facing={-1} delay={d(0.05)} />
      <Guy x={490} y={480} scale={0.95} shirt={PURPLE} hair="#2b2b2b" up={1} facing={-1} delay={d(0.12)} />
      <Guy x={560} y={480} scale={0.95} shirt={ORANGE} hair="#b8662b" up={1} facing={-1} delay={d(0.19)} />
      <GazeLine from={[420, 300]} to={[250, 220]} p={useProgress(d(0.25), d(0.45))} />
      <Guy x={940 - ((frame * 3) % 400)} y={480} scale={0.95} shirt={PINK} walking facing={-1} phase={7} />
      <NamePlate x={490} y={110} text="DENEY EKİBİ" delay={d(0.35)} />
      <Chip x={720} y={60} text="NEW YORK" delay={d(0.5)} />
    </g>
  );
};

// Küçük kafa ikonu: yukarı bakıyor ya da bakmıyor
const Head: React.FC<{ x: number; y: number; up: boolean; color: string; scale?: number; delay?: number }> = ({ x, y, up, color, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a, up ? -18 : 0)}>
      <path d="M -26 40 Q -26 18 0 18 Q 26 18 26 40 Z" fill={color} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={0} cy={0} r={20} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={-6} cy={up ? -6 : 0} r={3.5} fill={OUTLINE} />
      <circle cx={7} cy={up ? -6 : 0} r={3.5} fill={OUTLINE} />
    </g>
  );
};

// 5) Kalabalık büyüdükçe daha çok kişi bakıyor
const CrowdGrows: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const groups = [
    { n: 1, label: "1 KİŞİ", h: 0.3, color: TEAL },
    { n: 5, label: "5 KİŞİ", h: 0.62, color: PURPLE },
    { n: 15, label: "15 KİŞİ", h: 0.92, color: PINK },
  ];
  const ps = [useProgress(d(0.05), d(0.18)), useProgress(d(0.18), d(0.31)), useProgress(d(0.31), d(0.44))];
  return (
    <g>
      <Paper />
      <line x1={80} y1={460} x2={840} y2={460} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {groups.map((g, i) => {
        const cx = 200 + i * 250;
        const H = 300;
        const cols = Math.min(5, g.n);
        return (
          <g key={g.label}>
            <rect x={cx - 60} y={460 - H * g.h * ps[i]} width={120} height={H * g.h * ps[i]} rx={10} fill={g.color} stroke={OUTLINE} strokeWidth={5} />
            {Array.from({ length: g.n }).map((_, k) => (
              <Head
                key={k}
                x={cx - (cols - 1) * 13 + (k % cols) * 26}
                y={500 - Math.floor(k / cols) * 0 + 0}
                up
                color={g.color}
                scale={0.55}
                delay={d(0.05) + k}
              />
            ))}
            <Label x={cx} y={548} text={g.label} size={24} />
            <g opacity={ps[i] > 0.95 ? 1 : 0}>
              <UpArrows x={cx} y={430 - H * g.h} />
            </g>
          </g>
        );
      })}
      <Label x={450} y={60} text="BAŞINI KALDIRAN YAYALAR" size={32} color={DEEPPINK} />
    </g>
  );
};

// 6) Dört kişiden biri
const OneInFour: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const up = useProgress(d(0.3), d(0.45));
  return (
    <g>
      <Paper fill={SKY} />
      <Street y={440} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          {i === 2 ? <circle cx={150 + i * 200} cy={300} r={120} fill="#ffd23f" opacity={0.55 * up} /> : null}
          <Guy x={150 + i * 200} y={450} scale={1.15} shirt={[TEAL, PURPLE, PINK, ORANGE][i]} hair={i % 2 ? "#2b2b2b" : "#4a2f1d"} up={i === 2 ? up : 0} mouth={i === 2 ? "o" : "flat"} delay={d(0.03 * i)} />
        </g>
      ))}
      <BigText x={450} y={80} text="4'TE 1" size={100} color={PINK} delay={d(0.5)} />
      <NamePlate x={450} y={510} text="BİNLERCE YAYA · OXFORD" delay={d(0.2)} />
    </g>
  );
};

// 7) Arkadan gelenler daha çok bakıyor
const BehindMore: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const frame = useCurrentFrame();
  const behindUp = useProgress(d(0.35), d(0.5));
  const bx = Math.min(200, 40 + frame * 3);
  const fx = Math.max(720, 880 - frame * 3);
  return (
    <g>
      <Paper fill={SKY} />
      <Street y={450} />
      {/* Bakan grup */}
      <Guy x={400} y={460} scale={1} shirt={TEAL} up={1} delay={0} />
      <Guy x={470} y={460} scale={1} shirt={PURPLE} hair="#2b2b2b" up={1} delay={2} />
      <GazeLine from={[440, 270]} to={[620, 80]} p={useProgress(0, d(0.2))} />
      {/* Arkadan gelen: aynı yöne bakıyor, bakışı kapıyor */}
      <Guy x={bx} y={460} scale={1} shirt={PINK} walking={bx < 200} up={behindUp} mouth={behindUp > 0.5 ? "o" : "flat"} />
      {/* Önden gelen: gruba doğru yürüyor */}
      <Guy x={fx} y={460} scale={1} shirt={ORANGE} hair="#b8662b" facing={-1} walking={fx > 720} />
      <Chip x={190} y={110} text="ARKADAN: DAHA ÇOK" delay={d(0.45)} />
      <g transform={place(720, 200, useAppear(d(0.4)))}>
        <rect x={-130} y={-28} width={260} height={56} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <Label x={0} y={11} text="ÖNDEN: DAHA AZ" size={28} color={GREY} />
      </g>
    </g>
  );
};

// Göz çizimi: sklera rengi, iris konumu
const Eye: React.FC<{ x: number; y: number; sclera: string; iris: string; look: number; scale?: number; delay?: number }> = ({ x, y, sclera, iris, look, scale = 1, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -120 0 Q 0 -90 120 0 Q 0 90 -120 0 Z" fill={sclera} stroke={OUTLINE} strokeWidth={7} />
      <clipPath id={`eyeclip-${x}`}>
        <path d="M -120 0 Q 0 -90 120 0 Q 0 90 -120 0 Z" />
      </clipPath>
      <g clipPath={`url(#eyeclip-${x})`}>
        <circle cx={look * 60} cy={0} r={38} fill={iris} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={look * 60} cy={0} r={17} fill={OUTLINE} />
        <circle cx={look * 60 + 10} cy={-12} r={7} fill="#fff" />
      </g>
    </g>
  );
};

// 8) Gözün beyazı: insan vs diğer primatlar
const EyeWhites: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const look = useWave(50, 1);
  return (
    <g>
      <Paper />
      <rect x={40} y={70} width={390} height={380} rx={28} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={470} y={70} width={390} height={380} rx={28} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <Eye x={235} y={250} sclera="#ffffff" iris={BLUE} look={look} delay={d(0.05)} />
      <Eye x={665} y={250} sclera="#5a3b28" iris="#3a2618" look={look} delay={d(0.25)} />
      <Label x={235} y={410} text="İNSAN" size={36} color={DEEPPINK} />
      <Label x={665} y={410} text="DİĞER PRİMATLAR" size={32} />
      <Chip x={235} y={130} text="BAKIŞ BELLİ!" delay={d(0.28)} />
      <Chip x={665} y={130} text="ZOR SEÇİLİYOR" dark delay={d(0.38)} />
      <Sparkles points={[[110, 200], [360, 310]]} />
    </g>
  );
};

// Bebek yüzü
const Baby: React.FC<{ x: number; y: number; up: number; delay?: number }> = ({ x, y, up, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle cx={0} cy={0} r={78} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -10 -78 Q 0 -100 12 -84" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx={-26} cy={-6} rx={15} ry={17} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={26} cy={-6} rx={15} ry={17} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={-26} cy={-6 - up * 9} r={8} fill={OUTLINE} />
      <circle cx={26} cy={-6 - up * 9} r={8} fill={OUTLINE} />
      <ellipse cx={0} cy={36} rx={10} ry={8} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={-50} cy={22} r={11} fill="#f59ab0" opacity={0.7} />
      <circle cx={50} cy={22} r={11} fill="#f59ab0" opacity={0.7} />
    </g>
  );
};

// Şempanze yüzü (genel çizim)
const Ape: React.FC<{ x: number; y: number; tilt: number; delay?: number }> = ({ x, y, tilt, delay = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a, -tilt * 22)}>
      <circle cx={-82} cy={-4} r={24} fill="#d9a57a" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={82} cy={-4} r={24} fill="#d9a57a" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={0} r={80} fill="#5a3b28" stroke={OUTLINE} strokeWidth={6} />
      <path d="M -56 -10 Q -60 -50 -20 -46 Q 0 -40 20 -46 Q 60 -50 56 -10 Q 66 40 30 62 Q 0 74 -30 62 Q -66 40 -56 -10 Z" fill="#d9a57a" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-22} cy={-14} r={9} fill="#3a2618" />
      <circle cx={22} cy={-14} r={9} fill="#3a2618" />
      <ellipse cx={-7} cy={18} rx={4} ry={3} fill={OUTLINE} />
      <ellipse cx={7} cy={18} rx={4} ry={3} fill={OUTLINE} />
      <path d="M -24 40 Q 0 52 24 40" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
    </g>
  );
};

// 9) Bebek gözleri takip ediyor, şempanze başı
const BabyVsApe: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const up = useProgress(d(0.25), d(0.4));
  const apeUp = useProgress(d(0.3), d(0.45));
  return (
    <g>
      <Paper />
      {/* Deneyci: baş sabit, yalnızca gözleri tavana */}
      <g transform={place(450, 150, useAppear(0))}>
        <circle cx={0} cy={0} r={64} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -64 -6 Q -62 -72 0 -70 Q 62 -72 64 -8 Q 30 -36 0 -32 Q -30 -36 -64 -6 Z" fill="#2b2b2b" stroke={OUTLINE} strokeWidth={5} />
        <ellipse cx={-22} cy={0} rx={14} ry={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={22} cy={0} rx={14} ry={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-22} cy={-8} r={7} fill={OUTLINE} />
        <circle cx={22} cy={-8} r={7} fill={OUTLINE} />
        <line x1={-12} y1={36} x2={12} y2={36} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      </g>
      <Arrow from={[450, 70]} to={[450, 10]} progress={useProgress(d(0.05), d(0.2))} color={DEEPPINK} />
      <NamePlate x={640} y={150} text="SADECE GÖZLER" delay={d(0.1)} />
      <Baby x={210} y={380} up={up} delay={d(0.15)} />
      <Ape x={690} y={385} tilt={apeUp * 0.15} delay={d(0.3)} />
      <Chip x={210} y={505} text="GÖZÜ TAKİP ✔" delay={d(0.4)} />
      <Chip x={690} y={505} text="BAŞA BAKAR" dark delay={d(0.45)} />
    </g>
  );
};

// 10) İş birliği: iki kişi bakışla anlaşıyor
const TeamEyes: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const lift = useWave(40, 6);
  const g = useProgress(d(0.2), d(0.4));
  return (
    <g>
      <Paper />
      <rect x={0} y={470} width={900} height={90} fill="#f7d0dc" />
      <Guy x={260} y={480} scale={1.3} shirt={TEAL} mouth="smile" />
      <Guy x={640} y={480} scale={1.3} shirt={PINK} facing={-1} mouth="smile" />
      {/* Birlikte taşınan kutu */}
      <g transform={place(450, 340 + lift)}>
        <rect x={-130} y={-50} width={260} height={100} rx={8} fill="#e8b07a" stroke={OUTLINE} strokeWidth={6} />
        <line x1={-130} y1={0} x2={130} y2={0} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <line x1={300} y1={340} x2={320} y2={340 + lift} stroke={OUTLINE} strokeWidth={14} strokeLinecap="round" />
      <line x1={600} y1={340} x2={580} y2={340 + lift} stroke={OUTLINE} strokeWidth={14} strokeLinecap="round" />
      {/* Bakış alışverişi */}
      <path d={`M 290 225 Q 450 ${150 - 30 * g} 610 225`} fill="none" stroke={DEEPPINK} strokeWidth={6} strokeDasharray="14 12" opacity={g > 0 ? 1 : 0} />
      <Sparkles points={[[450, 120], [400, 160], [500, 160]]} />
      <Chip x={450} y={60} text="İŞ BİRLİĞİ" delay={d(0.45)} />
      <Label x={450} y={540} text="BİR HİPOTEZ" size={26} color={GREY} />
    </g>
  );
};

// 11) Kapanış: sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const bubbles = ["SOKAKTA", "OKULDA", "KONSERDE"];
  const a = [useAppear(d(0.15)), useAppear(d(0.3)), useAppear(d(0.45))];
  return (
    <g>
      <Paper fill={SKY} />
      <rect x={0} y={480} width={900} height={80} fill="#f7d0dc" />
      <Guy x={200} y={490} scale={1.5} shirt={PINK} up={1} point mouth="o" />
      <UpArrows x={330} y={120} delay={d(0.05)} />
      {bubbles.map((b, i) => (
        <g key={b} transform={place(630, 110 + i * 115, a[i])}>
          <rect x={-200} y={-40} width={400} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={i === 1 ? DEEPPINK : OUTLINE}>
            {b}
          </text>
        </g>
      ))}
      <Chip x={630} y={480} text="@ETİKETLE" delay={d(0.45)} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  LookUpHook,
  NothingThere,
  GazeFollow,
  StreetExperiment,
  CrowdGrows,
  OneInFour,
  BehindMore,
  EyeWhites,
  BabyVsApe,
  TeamEyes,
  YourTurn,
};

