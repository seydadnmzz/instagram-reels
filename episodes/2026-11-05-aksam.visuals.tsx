// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Yeni öğrendiğin şeyi her yerde görmek — sıklık yanılsaması (2026-11-05-aksam)
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
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#f3efff";
const SKIN = "#f2c79a";
const PURPLE = "#8f6bf2";
const LILAC = "#d9ceff";
const TEAL = "#3fb4a0";
const BLUE = "#5b8def";
const GREEN = "#4cc38a";
const ORANGE = "#ff9f43";
const CAR_RED = "#e8443a";
const WORD = "PARADOKS";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [90, 80, 36],
      [820, 70, 24],
      [820, 300, 16],
      [60, 320, 18],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#e4dcff" />
    ))}
  </g>
);

const Floor: React.FC<{ y?: number; color?: string }> = ({ y = 480, color = "#d6caff" }) => (
  <rect x={0} y={y} width={900} height={560 - y} fill={color} />
);

type Mood = "flat" | "smile" | "wow" | "focus";

// Yüz; (0,0) başın merkezi, yarıçap 84
const Face: React.FC<{ mood?: Mood; hair?: string; glasses?: boolean }> = ({ mood = "flat", hair = "#4a2f1d", glasses = false }) => (
  <g>
    <circle cx={-84} cy={6} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={84} cy={6} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={0} cy={0} r={84} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
    <path d="M -84 -8 Q -90 -94 0 -90 Q 86 -92 84 -10 Q 70 -60 -30 -50 Q -60 -48 -84 -8 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} />
    {mood === "wow" ? (
      <g>
        <circle cx={-30} cy={-2} r={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={30} cy={-2} r={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-30} cy={-2} r={6} fill={OUTLINE} />
        <circle cx={30} cy={-2} r={6} fill={OUTLINE} />
        <path d="M -48 -36 Q -30 -50 -12 -38 M 12 -38 Q 30 -50 48 -36" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <ellipse cx={0} cy={46} rx={16} ry={20} fill="#8a2430" stroke={OUTLINE} strokeWidth={5} />
      </g>
    ) : (
      <g>
        <circle cx={-30} cy={-2} r={8} fill={OUTLINE} />
        <circle cx={30} cy={-2} r={8} fill={OUTLINE} />
        {mood === "smile" ? (
          <g>
            <path d="M -30 34 Q 0 62 30 34" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
            <circle cx={-58} cy={30} r={11} fill="#f7a0a8" opacity={0.8} />
            <circle cx={58} cy={30} r={11} fill="#f7a0a8" opacity={0.8} />
          </g>
        ) : null}
        {mood === "flat" ? <path d="M -24 42 L 24 42" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" /> : null}
        {mood === "focus" ? (
          <g>
            <path d="M -48 -26 L -14 -18 M 14 -18 L 48 -26" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
            <path d="M -16 44 L 16 44" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
          </g>
        ) : null}
      </g>
    )}
    {glasses ? (
      <g>
        <circle cx={-30} cy={-2} r={24} fill="none" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={30} cy={-2} r={24} fill="none" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -6 -2 L 6 -2" stroke={OUTLINE} strokeWidth={5} />
      </g>
    ) : null}
  </g>
);

// Belden yukarı karakter; (0,0) gövdenin alt ortası
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  mood?: Mood;
  shirt?: string;
  hair?: string;
  glasses?: boolean;
  bob?: number;
  hands?: [[number, number], [number, number]];
  delay?: number;
}> = ({ x, y, scale = 1, mood = "flat", shirt = PURPLE, hair = "#4a2f1d", glasses = false, bob = 0, hands, delay = 0 }) => {
  const appear = useAppear(delay);
  const hs = hands ?? [
    [-120, -20],
    [120, -20],
  ];
  const shoulders: [number, number][] = [
    [-92, -128],
    [92, -128],
  ];
  return (
    <g transform={place(x, y, scale * appear)}>
      <path d="M -112 0 L -112 -90 Q -112 -150 -50 -150 L 50 -150 Q 112 -150 112 -90 L 112 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-20} y={-168} width={40} height={26} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      {[0, 1].map((i) => (
        <g key={i}>
          <line x1={shoulders[i][0]} y1={shoulders[i][1]} x2={hs[i][0]} y2={hs[i][1]} stroke={OUTLINE} strokeWidth={36} strokeLinecap="round" />
          <line x1={shoulders[i][0]} y1={shoulders[i][1]} x2={hs[i][0]} y2={hs[i][1]} stroke={shirt} strokeWidth={28} strokeLinecap="round" />
        </g>
      ))}
      <g transform={`translate(0 ${-238 + bob}) rotate(${bob * 0.8})`}>
        <Face mood={mood} hair={hair} glasses={glasses} />
      </g>
      {hs.map(([hx, hy], i) => (
        <circle key={`h${i}`} cx={hx} cy={hy} r={20} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      ))}
    </g>
  );
};

// Kelime kartı; (0,0) merkez
const WordCard: React.FC<{ x: number; y: number; scale?: number; rotate?: number; delay?: number; glow?: boolean; label?: string }> = ({
  x,
  y,
  scale = 1,
  rotate = 0,
  delay = 0,
  glow = false,
  label = WORD,
}) => {
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, scale * appear, rotate)}>
      {glow ? <rect x={-128} y={-40} width={256} height={80} rx={18} fill={YELLOW} opacity={0.85} /> : null}
      <rect x={-114} y={-28} width={228} height={56} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={PURPLE}>
        {label}
      </text>
    </g>
  );
};

// Basit araba; (0,0) alt orta
const Car: React.FC<{ x: number; y: number; color: string; scale?: number; flip?: boolean; glow?: boolean }> = ({
  x,
  y,
  color,
  scale = 1,
  flip = false,
  glow = false,
}) => (
  <g transform={`${place(x, y, scale)} scale(${flip ? -1 : 1} 1)`}>
    {glow ? <ellipse cx={0} cy={-40} rx={120} ry={66} fill={YELLOW} opacity={0.7} /> : null}
    <path d="M -95 -20 L -95 -50 Q -92 -62 -70 -64 L -45 -64 L -22 -96 L 38 -96 L 64 -64 L 88 -60 Q 98 -56 98 -40 L 98 -20 Z" fill={color} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -34 -64 L -16 -88 L 6 -88 L 6 -64 Z M 16 -64 L 16 -88 L 34 -88 L 52 -64 Z" fill="#cfe9ff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    {[-56, 60].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-18} r={20} fill={OUTLINE} />
        <circle cx={wx} cy={-18} r={8} fill="#bbb" />
      </g>
    ))}
  </g>
);

// Goril kostümlü kişi; (0,0) ayakların ortası, ~200 birim boy
const Gorilla: React.FC<{ x: number; y: number; scale?: number; thump?: number; opacity?: number }> = ({ x, y, scale = 1, thump = 0, opacity = 1 }) => {
  const fur = "#3a3536";
  const face = "#8c7b74";
  const armUp = thump > 0 ? -60 : 0;
  return (
    <g transform={place(x, y, scale)} opacity={opacity}>
      <ellipse cx={0} cy={2} rx={44} ry={8} fill="rgba(0,0,0,0.18)" />
      <rect x={-34} y={-70} width={26} height={70} rx={12} fill={fur} stroke={OUTLINE} strokeWidth={4} />
      <rect x={8} y={-70} width={26} height={70} rx={12} fill={fur} stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={0} cy={-110} rx={56} ry={58} fill={fur} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={0} cy={-104} rx={30} ry={34} fill="#4d4647" />
      <path d={`M -48 -140 Q -84 ${-96 + armUp} -60 ${-50 + armUp}`} fill="none" stroke={OUTLINE} strokeWidth={30} strokeLinecap="round" />
      <path d={`M -48 -140 Q -84 ${-96 + armUp} -60 ${-50 + armUp}`} fill="none" stroke={fur} strokeWidth={22} strokeLinecap="round" />
      <path d={`M 48 -140 Q 84 ${-96 + armUp} 60 ${-50 + armUp}`} fill="none" stroke={OUTLINE} strokeWidth={30} strokeLinecap="round" />
      <path d={`M 48 -140 Q 84 ${-96 + armUp} 60 ${-50 + armUp}`} fill="none" stroke={fur} strokeWidth={22} strokeLinecap="round" />
      <circle cx={0} cy={-186} r={36} fill={fur} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={0} cy={-180} rx={24} ry={22} fill={face} stroke={OUTLINE} strokeWidth={3} />
      <circle cx={-10} cy={-188} r={4} fill={OUTLINE} />
      <circle cx={10} cy={-188} r={4} fill={OUTLINE} />
      <path d="M -8 -172 Q 0 -166 8 -172" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
      {thump > 0 ? (
        <g>
          <path d="M -90 -150 L -112 -164 M -94 -126 L -120 -126 M 90 -150 L 112 -164 M 94 -126 L 120 -126" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
};

// Akciğer taraması ekranı; (0,0) merkez, 380×300
const ScanScreen: React.FC<{ x: number; y: number; scale?: number; gorillaOpacity?: number; slice?: number }> = ({
  x,
  y,
  scale = 1,
  gorillaOpacity = 1,
  slice = 0,
}) => (
  <g transform={place(x, y, scale)}>
    <rect x={-200} y={-160} width={400} height={320} rx={16} fill="#3b3550" stroke={OUTLINE} strokeWidth={6} />
    <rect x={-182} y={-142} width={364} height={284} rx={8} fill="#0f0f16" />
    <ellipse cx={0} cy={6} rx={160} ry={124} fill="#2c2c34" />
    <path d="M -18 -96 Q -120 -100 -128 10 Q -126 98 -40 104 Q -18 60 -18 -96 Z" fill="#14141a" stroke="#6d6d7a" strokeWidth={3} />
    <path d="M 18 -96 Q 120 -100 128 10 Q 126 98 40 104 Q 18 60 18 -96 Z" fill="#14141a" stroke="#6d6d7a" strokeWidth={3} />
    {[
      [-80, -30],
      [-60, 40],
      [70, -10],
      [90, 50],
      [-96, 70],
      [56, 80],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx + (i % 2 ? slice : -slice) * 0.4} cy={cy} r={i === 2 ? 6 : 3.5} fill="#b9b9c4" />
    ))}
    <g transform="translate(80 -40) scale(0.22)" opacity={gorillaOpacity}>
      <Gorilla x={0} y={110} thump={0} />
    </g>
    <text x={-170} y={-118} fontFamily={uiFont} fontWeight={700} fontSize={18} fill="#8f8fa0">
      BT · AKCİĞER
    </text>
  </g>
);

// 1) Yeni kelime öğrendin → ertesi gün her yerde
const NewWord: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const switchAt = durationInFrames * 0.38;
  const later = frame >= switchAt;
  const bob = useWave(24, 4);
  const spots: [number, number, number][] = [
    [620, 110, -6],
    [780, 220, 5],
    [610, 330, 4],
    [790, 420, -4],
  ];
  return (
    <g>
      <Paper />
      <Floor />
      <Bust x={250} y={500} scale={0.9} mood={later ? "wow" : "smile"} bob={bob} hands={[[-110, -10], [110, -10]]} />
      {/* Kitap */}
      <g transform="translate(250 470)">
        <path d="M -150 -40 L 0 -20 L 150 -40 L 150 50 L 0 70 L -150 50 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 0 -20 L 0 70" stroke={OUTLINE} strokeWidth={4} />
        <rect x={-150} y={50} width={300} height={14} fill={PURPLE} stroke={OUTLINE} strokeWidth={4} />
      </g>
      {!later ? (
        <g>
          <WordCard x={250} y={110} delay={6} glow />
          <BigText x={650} y={170} text="1. GÜN" size={70} color={PURPLE} delay={4} />
          <Chip x={650} y={290} text="YENİ KELİME!" delay={12} />
        </g>
      ) : (
        <g>
          {/* Her yerde: gazete, telefon, tabela, TV */}
          {spots.map(([sx, sy, r], i) => (
            <g key={i}>
              <WordCard x={sx} y={sy} scale={0.95} rotate={r} delay={switchAt + 6 + i * 9} glow={i % 2 === 0} />
            </g>
          ))}
          <Chip x={700} y={520} text="2. GÜN: HER YERDE!" dark delay={switchAt + 2} />
          <Sparkles points={[[520, 80], [870, 140], [520, 400], [880, 360]]} />
        </g>
      )}
    </g>
  );
};

// 2) Kırmızı araba aldın → yollar kırmızı arabayla doldu
const RedCars: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const colors = [CAR_RED, BLUE, "#9a9aa6", CAR_RED, GREEN, CAR_RED, ORANGE, "#9a9aa6", CAR_RED];
  const glowOn = frame > durationInFrames * 0.35;
  return (
    <g>
      <rect width={900} height={560} fill={PAPER} />
      <rect x={0} y={330} width={900} height={170} fill="#5b5670" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={((i * 180 - frame * 4) % 1080) - 90} y={410} width={90} height={10} fill="#fff" />
      ))}
      <rect x={0} y={500} width={900} height={60} fill="#d6caff" />
      {colors.map((c, i) => {
        const lane = i % 2;
        const speed = lane ? 5.5 : 4.2;
        const xx = lane ? 1000 - ((frame * speed + i * 210) % 1200) : ((frame * speed + i * 210) % 1200) - 150;
        return <Car key={i} x={xx} y={lane ? 400 : 470} color={c} scale={0.8} flip={lane === 1} glow={glowOn && c === CAR_RED} />;
      })}
      <Person x={130} y={320} scale={0.9} shirt={PURPLE} facing="right" />
      <g transform={place(220, 140, useAppear(8))}>
        <rect x={-70} y={-50} width={140} height={100} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <Car x={0} y={30} color={CAR_RED} scale={0.55} />
      </g>
      <Chip x={600} y={150} text="HEP KIRMIZI ARABA!" dark delay={durationInFrames * 0.35} />
      {glowOn ? <QuestionMark x={810} y={70} size={90} delay={durationInFrames * 0.45} /> : null}
    </g>
  );
};

// 3) Adı: sıklık yanılsaması — dilbilimci Arnold Zwicky
const NameIt: Visual = ({ durationInFrames }) => {
  const lens = useWave(50, 30);
  return (
    <g>
      <Paper />
      <Floor />
      <Person x={180} y={470} scale={1.2} shirt={TEAL} glasses mustache presenting delay={4} />
      <NamePlate x={190} y={515} text="DİLBİLİMCİ ARNOLD ZWICKY" delay={14} />
      <Brain x={600} y={230} scale={1} />
      {/* Büyüteç */}
      <g transform={place(600 + lens, 230, 1, -20)}>
        <circle cx={0} cy={0} r={70} fill="rgba(255,255,255,0.25)" stroke={OUTLINE} strokeWidth={10} />
        <rect x={60} y={-12} width={110} height={24} rx={12} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
      </g>
      {[0, 1, 2].map((i) => (
        <WordCard key={i} x={[440, 780, 760][i]} y={[90, 110, 380][i]} scale={0.6} rotate={[-8, 6, -4][i]} delay={durationInFrames * 0.2 + i * 8} />
      ))}
      <Chip x={600} y={430} text="SIKLIK YANILSAMASI" dark delay={10} />
    </g>
  );
};

// 4) O şey çoğalmadı; değişen dikkatin — spot ışığı
const Spotlight: Visual = ({ durationInFrames }) => {
  const p = useProgress(durationInFrames * 0.1, durationInFrames * 0.6);
  const sx = interpolate(p, [0, 0.5, 1], [180, 700, 450], clamp);
  const cars: [number, number, string][] = [
    [140, 240, "#9a9aa6"],
    [330, 400, BLUE],
    [450, 230, CAR_RED],
    [600, 420, GREEN],
    [760, 260, "#9a9aa6"],
    [180, 440, ORANGE],
    [740, 470, CAR_RED],
  ];
  return (
    <g>
      <rect width={900} height={560} fill="#2a2440" />
      {cars.map(([x, y, c], i) => (
        <g key={i} opacity={c === CAR_RED ? 1 : 0.45}>
          <Car x={x} y={y} color={c} scale={0.7} glow={c === CAR_RED && p > 0.9} />
        </g>
      ))}
      <ellipse cx={sx} cy={300} rx={170} ry={130} fill="#fff6c2" opacity={0.25} />
      <path d={`M 450 -10 L ${sx - 150} 300 L ${sx + 150} 300 Z`} fill="#fff6c2" opacity={0.12} />
      <g transform="translate(450 70)">
        <rect x={-200} y={-36} width={400} height={72} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={14} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill={INK}>
          ARABA SAYISI: AYNI
        </text>
      </g>
      <Chip x={450} y={520} text="DEĞİŞEN: DİKKATİN" delay={durationInFrames * 0.45} />
    </g>
  );
};

// 5) Beynin filtresi: çoğu şey elenir, yeni öğrenilen geçer
const Filter: Visual = () => {
  const frame = useCurrentFrame();
  const items = [
    { c: "#9a9aa6", pass: false },
    { c: BLUE, pass: false },
    { c: GREEN, pass: false },
    { c: PURPLE, pass: true },
    { c: ORANGE, pass: false },
    { c: "#9a9aa6", pass: false },
  ];
  return (
    <g>
      <Paper />
      {/* Huni */}
      <path d="M 220 170 L 680 170 L 510 330 L 510 380 L 390 380 L 390 330 Z" fill={LILAC} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={210} y={150} width={480} height={30} rx={10} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
      {items.map((it, i) => {
        const t = ((frame + i * 14) % 84) / 84;
        const startX = 260 + i * 76;
        if (it.pass) {
          const y = interpolate(t, [0, 0.4, 1], [20, 170, 470], clamp);
          const x = interpolate(t, [0, 0.4, 0.7, 1], [startX, startX, 450, 450], clamp);
          return (
            <g key={i}>
              <WordCard x={x} y={y} scale={0.45} glow />
            </g>
          );
        }
        const y = interpolate(t, [0, 0.4, 1], [20, 140, 60], clamp);
        const x = startX + interpolate(t, [0.4, 1], [0, i < 3 ? -260 : 260], clamp);
        return (
          <g key={i} transform={place(x, y, 0.8, t * 360)} opacity={1 - Math.max(0, t - 0.6) * 2.5}>
            <rect x={-26} y={-26} width={52} height={52} rx={8} fill={it.c} stroke={OUTLINE} strokeWidth={4} />
          </g>
        );
      })}
      <Brain x={450} y={470} scale={0.6} />
      <Chip x={150} y={300} text="ELENDİ" dark delay={10} />
      <Chip x={760} y={430} text="GEÇTİ!" delay={20} />
    </g>
  );
};

// Basketbol oyuncusu + top sahnesi
const Court: React.FC<{ frame: number; gorillaX: number | null; thump?: number; scale?: number }> = ({ frame, gorillaX, thump = 0 }) => {
  const players: [number, string][] = [
    [140, "#fff"],
    [270, "#3a3a3a"],
    [400, "#fff"],
    [530, "#3a3a3a"],
    [660, "#fff"],
    [790, "#3a3a3a"],
  ];
  const whites = players.filter((pl) => pl[1] === "#fff");
  const seg = Math.floor(frame / 18);
  const tt = (frame % 18) / 18;
  const a = whites[seg % 3][0];
  const b = whites[(seg + 1) % 3][0];
  const bx = a + (b - a) * tt;
  const by = 300 - Math.sin(tt * Math.PI) * 90;
  return (
    <g>
      <rect width={900} height={560} fill="#f2d3a2" />
      <rect x={0} y={0} width={900} height={200} fill="#e8e0ff" />
      <path d="M 0 470 L 900 470" stroke="#c99a5b" strokeWidth={6} />
      {players.map(([x, c], i) => (
        <Person key={i} x={x + Math.sin((frame + i * 20) / 10) * 14} y={460} scale={0.85} shirt={c} pants="#2f3f63" facing={i % 2 ? "left" : "right"} walking={false} />
      ))}
      {gorillaX !== null ? <Gorilla x={gorillaX} y={480} scale={0.95} thump={thump} /> : null}
      <circle cx={bx} cy={by} r={18} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
      <path d={`M ${bx - 18} ${by} L ${bx + 18} ${by} M ${bx} ${by - 18} L ${bx} ${by + 18}`} stroke={OUTLINE} strokeWidth={2} />
    </g>
  );
};

// 6) Pasları say — goril kostümlü biri geçiyor
const PassCount: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const gStart = durationInFrames * 0.45;
  const gx = interpolate(frame, [gStart, durationInFrames], [-80, 520], clamp);
  const count = Math.floor(frame / 18);
  return (
    <g>
      <Court frame={frame} gorillaX={frame > gStart ? gx : null} />
      <g transform="translate(740 80)">
        <rect x={-110} y={-50} width={220} height={100} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={-12} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={INK}>
          BEYAZLAR
        </text>
        <text x={0} y={34} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={PURPLE}>
          {count} PAS
        </text>
      </g>
      <Chip x={190} y={80} text="PASLARI SAY!" dark delay={4} />
    </g>
  );
};

// 7) Gorili yarısı fark etmedi
const NoGorilla: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const thump = Math.sin(frame / 4) > 0 ? 1 : 0;
  const result = durationInFrames * 0.4;
  const resultIn = useAppear(result);
  const bubbleIn = useAppear(6);
  return (
    <g>
      <Paper />
      {/* Ekran */}
      <g transform="translate(560 220)">
        <rect x={-290} y={-190} width={580} height={360} rx={18} fill="#3b3550" stroke={OUTLINE} strokeWidth={6} />
        <svg x={-270} y={-170} width={540} height={320} viewBox="0 0 900 560">
          <Court frame={frame} gorillaX={450} thump={thump} />
        </svg>
      </g>
      <Bust x={150} y={600} scale={0.85} mood="focus" shirt={TEAL} />
      <g transform={place(170, 120, bubbleIn)}>
        <rect x={-110} y={-44} width={220} height={88} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK}>
          15 PAS!
        </text>
      </g>
      {frame > result ? (
        <g>
          <g transform={place(560, 480, resultIn)}>
            <rect x={-250} y={-44} width={500} height={88} rx={20} fill={RED} stroke={OUTLINE} strokeWidth={5} />
            <text x={0} y={14} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill="#fff">
              YARISI GÖRMEDİ!
            </text>
          </g>
        </g>
      ) : null}
    </g>
  );
};

// 8) Radyologlar da kaçırdı
const LungScan: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const slice = useWave(40, 10);
  const stat = durationInFrames * 0.45;
  return (
    <g>
      <Paper />
      <Floor y={490} />
      <ScanScreen x={560} y={230} scale={1} slice={slice} />
      <Bust x={170} y={600} scale={0.85} mood="focus" shirt="#ffffff" glasses />
      <Chip x={170} y={90} text="24 RADYOLOG" dark delay={6} />
      {frame > stat ? (
        <g>
          <BigText x={560} y={450} text="YÜZDE 83" size={72} color={YELLOW} delay={stat} />
          <Chip x={560} y={515} text="GORİLİ GÖRMEDİ" delay={stat + 8} />
        </g>
      ) : null}
      <Arrow from={[800, 60]} to={[668, 160]} progress={useProgress(durationInFrames * 0.15, durationInFrames * 0.35)} color={RED} />
    </g>
  );
};

// 9) Göz takibi: gorile baktı ama görmedi
const EyeTrack: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const path: [number, number][] = [
    [-80, -30],
    [-60, 40],
    [70, -10],
    [90, 50],
    [80, -40],
    [84, -34],
  ];
  const p = useProgress(4, durationInFrames * 0.6);
  const idx = p * (path.length - 1);
  const shown = Math.floor(idx);
  const blink = frame % 70 > 64 ? 0.1 : 1;
  return (
    <g>
      <Paper />
      <ScanScreen x={450} y={230} scale={1.05} />
      <g transform="translate(450 230) scale(1.05)">
        {path.slice(0, shown + 1).map(([x, y], i) => (
          <g key={i}>
            {i > 0 ? <line x1={path[i - 1][0]} y1={path[i - 1][1]} x2={x} y2={y} stroke={YELLOW} strokeWidth={4} opacity={0.8} /> : null}
            <circle cx={x} cy={y} r={i === path.length - 1 ? 22 : 12} fill="none" stroke={YELLOW} strokeWidth={5} />
          </g>
        ))}
      </g>
      {/* Göz ikonu */}
      <g transform="translate(110 110)">
        <path d="M -70 0 Q 0 -60 70 0 Q 0 60 -70 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <g transform={`scale(1 ${blink})`}>
          <circle cx={0} cy={0} r={22} fill={PURPLE} stroke={OUTLINE} strokeWidth={4} />
          <circle cx={0} cy={0} r={9} fill={OUTLINE} />
        </g>
      </g>
      <Chip x={110} y={190} text="GÖZ TAKİBİ" dark delay={4} />
      {p >= 1 ? <Chip x={450} y={500} text="BAKTI AMA GÖRMEDİ!" delay={durationInFrames * 0.6} /> : null}
      {p >= 1 ? <QuestionMark x={790} y={120} size={100} delay={durationInFrames * 0.65} /> : null}
    </g>
  );
};

// 10) Yenilik yanılsaması: hep oradaydı
const AlwaysThere: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const p = useProgress(durationInFrames * 0.15, durationInFrames * 0.55);
  const years = [2025, 2010, 1990, 1970, 1950];
  const yearIdx = Math.min(years.length - 1, Math.floor(p * years.length));
  const sway = useWave(40, 3);
  return (
    <g>
      <Paper />
      {/* Eski gazete */}
      <g transform={place(330, 270, 1, -4 + sway)}>
        <rect x={-200} y={-200} width={400} height={400} fill="#f6efd9" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={-150} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={INK}>
          GAZETE
        </text>
        <rect x={-170} y={-130} width={340} height={5} fill={INK} />
        <text x={0} y={-92} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={RED}>
          {years[yearIdx]}
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={-170} y={-60 + i * 36} width={i === 2 ? 120 : 340 - (i % 3) * 40} height={8} fill="#a6a6a6" />
        ))}
        <g transform="translate(110 22)">
          <rect x={-64} y={-20} width={128} height={40} rx={8} fill={p >= 1 ? YELLOW : "transparent"} />
          <text x={0} y={10} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={PURPLE}>
            {WORD}
          </text>
        </g>
      </g>
      {/* Geri sar okları */}
      <g transform="translate(700 150)">
        <rect x={-110} y={-50} width={220} height={100} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <path d={`M ${-20 - (frame % 20)} -24 L ${-64 - (frame % 20)} 0 L ${-20 - (frame % 20)} 24 Z M ${40 - (frame % 20)} -24 L ${-4 - (frame % 20)} 0 L ${40 - (frame % 20)} 24 Z`} fill={PURPLE} />
      </g>
      <Chip x={700} y={290} text="YENİ Mİ?" dark delay={6} />
      {p >= 1 ? <Chip x={700} y={400} text="HEP ORADAYDI!" delay={durationInFrames * 0.55} /> : null}
      {p >= 1 ? <Sparkles points={[[470, 250], [520, 330], [250, 330]]} /> : null}
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = () => {
  const pulse = 1 + useWave(30, 0.05);
  const card = useAppear(8);
  const bob = useWave(20, 5);
  return (
    <g>
      <Paper />
      <Bust x={200} y={600} scale={0.95} mood="smile" bob={bob} shirt={PURPLE} />
      <g transform={place(610, 220, card)}>
        <rect x={-240} y={-160} width={480} height={320} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -200 110 L -270 180 L -150 150 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-214} y={110} width={70} height={44} fill="#fff" />
        <text x={0} y={-80} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill={INK}>
          SEN NEYİ GÖRDÜN?
        </text>
        <Car x={-100} y={60} color={CAR_RED} scale={0.6} />
        <WordCard x={90} y={20} scale={0.7} delay={16} />
        <QuestionMark x={150} y={90} size={70} delay={20} />
      </g>
      <g transform={place(610, 490, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={22} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  NewWord,
  RedCars,
  NameIt,
  Spotlight,
  Filter,
  PassCount,
  NoGorilla,
  LungScan,
  EyeTrack,
  AlwaysThere,
  YourTurn,
};
