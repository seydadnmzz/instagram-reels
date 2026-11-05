// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Önce sevmedin, sonra bağımlı oldun — sadece maruz kalma etkisi (2026-11-05-sabah)
import { interpolate, useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  Heart,
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
const PAPER = "#fff0f4";
const SKIN = "#f2c79a";
const PINK = "#ff5c8a";
const PURPLE = "#8f6bf2";
const TEAL = "#3fb4a0";
const BLUE = "#5b8def";
const GREEN = "#4cc38a";

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [90, 90, 36],
      [820, 70, 24],
      [810, 300, 16],
      [60, 330, 18],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#ffdbe6" />
    ))}
  </g>
);

const Floor: React.FC<{ y?: number }> = ({ y = 480 }) => <rect x={0} y={y} width={900} height={560 - y} fill="#ffc9d9" />;

// Müzik notası; (0,0) nota başı
const Note8: React.FC<{ x: number; y: number; scale?: number; color?: string; rotate?: number }> = ({
  x,
  y,
  scale = 1,
  color = PURPLE,
  rotate = 0,
}) => (
  <g transform={place(x, y, scale, rotate)}>
    <ellipse cx={0} cy={0} rx={18} ry={13} fill={color} stroke={OUTLINE} strokeWidth={4} transform="rotate(-20)" />
    <rect x={12} y={-70} width={8} height={70} fill={OUTLINE} />
    <path d="M 20 -70 Q 46 -56 40 -30 Q 36 -48 20 -50 Z" fill={OUTLINE} />
  </g>
);

// Yükselen notalar
const FloatingNotes: React.FC<{ x: number; y: number; on?: boolean }> = ({ x, y, on = true }) => {
  const frame = useCurrentFrame();
  if (!on) return null;
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 20) % 60) / 60;
        return (
          <g key={i} opacity={1 - t}>
            <Note8 x={x + i * 50 - 50 + Math.sin(t * 6 + i) * 18} y={y - t * 120} scale={0.8} color={[PURPLE, PINK, TEAL][i]} rotate={i * 8 - 8} />
          </g>
        );
      })}
    </g>
  );
};

type Mood = "flat" | "smile" | "laugh" | "frown" | "wow" | "bored";

// Yüz; (0,0) başın merkezi, yarıçap 84. mole: sol yanakta ben (aynada yer değiştirir)
const Face: React.FC<{ mood?: Mood; hair?: string; mole?: boolean }> = ({ mood = "flat", hair = "#4a2f1d", mole = false }) => (
  <g>
    <circle cx={-84} cy={6} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={84} cy={6} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={0} cy={0} r={84} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
    {/* Yana taranmış saç (yön aynada ters döner) */}
    <path d="M -84 -8 Q -90 -94 0 -90 Q 86 -92 84 -10 Q 70 -60 -30 -50 Q -60 -48 -84 -8 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} />
    <path d="M -30 -50 Q -10 -80 30 -86" fill="none" stroke={OUTLINE} strokeWidth={3} />
    {mole ? (
      <g>
        <circle cx={-46} cy={30} r={10} fill="#6b3b2a" />
        <rect x={-74} y={-62} width={34} height={16} rx={8} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} transform="rotate(-30 -57 -54)" />
      </g>
    ) : null}
    {mood === "laugh" ? (
      <g>
        <path d="M -46 -2 Q -30 -20 -14 -2 M 14 -2 Q 30 -20 46 -2" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <path d="M -42 30 Q 0 98 42 30 Z" fill="#8a2430" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -18 66 Q 0 52 18 66 Q 0 78 -18 66 Z" fill="#f07a86" />
        <circle cx={-58} cy={32} r={12} fill="#f7a0a8" opacity={0.8} />
        <circle cx={58} cy={32} r={12} fill="#f7a0a8" opacity={0.8} />
      </g>
    ) : (
      <g>
        {mood === "bored" ? (
          <path d="M -42 -2 L -18 -2 M 18 -2 L 42 -2" stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" />
        ) : (
          <g>
            <circle cx={-30} cy={-2} r={8} fill={OUTLINE} />
            <circle cx={30} cy={-2} r={8} fill={OUTLINE} />
          </g>
        )}
        {mood === "flat" || mood === "bored" ? <path d="M -24 42 L 24 42" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" /> : null}
        {mood === "smile" ? (
          <g>
            <path d="M -30 34 Q 0 62 30 34" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
            <circle cx={-58} cy={30} r={11} fill="#f7a0a8" opacity={0.8} />
            <circle cx={58} cy={30} r={11} fill="#f7a0a8" opacity={0.8} />
          </g>
        ) : null}
        {mood === "frown" ? (
          <g>
            <path d="M -48 -30 L -14 -20 M 14 -20 L 48 -30" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
            <path d="M -26 50 Q 0 28 26 50" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
          </g>
        ) : null}
        {mood === "wow" ? (
          <g>
            <path d="M -48 -34 Q -30 -48 -12 -36 M 12 -36 Q 30 -48 48 -34" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
            <ellipse cx={0} cy={44} rx={16} ry={22} fill="#8a2430" stroke={OUTLINE} strokeWidth={5} />
          </g>
        ) : null}
      </g>
    )}
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
  headphones?: boolean;
  bob?: number;
  hands?: [[number, number], [number, number]];
  holdRight?: React.ReactNode;
  delay?: number;
}> = ({ x, y, scale = 1, mood = "flat", shirt = PINK, hair = "#4a2f1d", headphones = false, bob = 0, hands, holdRight, delay = 0 }) => {
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
        <Face mood={mood} hair={hair} />
        {headphones ? (
          <g>
            <path d="M -92 0 Q -100 -118 0 -116 Q 100 -118 92 0" fill="none" stroke={OUTLINE} strokeWidth={14} strokeLinecap="round" />
            <rect x={-112} y={-24} width={36} height={60} rx={14} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
            <rect x={76} y={-24} width={36} height={60} rx={14} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
          </g>
        ) : null}
      </g>
      {hs.map(([hx, hy], i) => (
        <g key={`h${i}`}>
          {i === 1 && holdRight ? <g transform={`translate(${hx} ${hy})`}>{holdRight}</g> : null}
          <circle cx={hx} cy={hy} r={20} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
        </g>
      ))}
    </g>
  );
};

// Fotoğraf çerçevesi (polaroid); (0,0) merkez
const Photo: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  label: string;
  mirrored?: boolean;
  mood?: Mood;
  delay?: number;
  glow?: boolean;
}> = ({ x, y, scale = 1, rotate = 0, label, mirrored = false, mood = "smile", delay = 0, glow = false }) => {
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, scale * appear, rotate)}>
      {glow ? <rect x={-128} y={-158} width={256} height={316} rx={18} fill={YELLOW} opacity={0.8} /> : null}
      <rect x={-110} y={-140} width={220} height={280} rx={8} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-92} y={-122} width={184} height={184} fill="#cfe9ff" stroke={OUTLINE} strokeWidth={3} />
      <g transform={`translate(0 -20) scale(${mirrored ? -0.85 : 0.85} 0.85)`}>
        <Face mood={mood} mole />
      </g>
      <text x={0} y={112} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
        {label}
      </text>
    </g>
  );
};

// 1) Şarkıyı ilk duyunca "bu ne ya?" → birkaç gün sonra bağımlı
const FirstListen: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const switchAt = durationInFrames * 0.55;
  const later = frame >= switchAt;
  const wave = useWave(16, 8);
  const bob = later ? wave : 0;
  return (
    <g>
      <Paper />
      <Floor />
      <Bust x={330} y={565} scale={0.95} mood={later ? "laugh" : "frown"} headphones bob={bob} shirt={PINK} />
      <FloatingNotes x={520} y={200} on={later} />
      {/* Gün sayacı */}
      <g transform="translate(700 140)">
        <rect x={-110} y={-70} width={220} height={140} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-110} y={-70} width={220} height={44} rx={16} fill={RED} stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={34} fontFamily={uiFont} fontWeight={800} fontSize={54} textAnchor="middle" fill={INK}>
          {later ? "3. GÜN" : "1. GÜN"}
        </text>
      </g>
      {later ? (
        <g>
          <Heart x={720} y={330} size={1.3} delay={switchAt + 4} />
          <Chip x={720} y={440} text="TEKRAR ÇAL!" delay={switchAt + 10} />
        </g>
      ) : (
        <g>
          <QuestionMark x={560} y={300} size={130} delay={6} />
          <Chip x={720} y={440} text="BU NE YA?" dark delay={10} />
        </g>
      )}
    </g>
  );
};

// 2) Aynada beğeniyor, fotoğrafta "bu ben miyim?"
const MirrorPhoto: Visual = ({ durationInFrames }) => {
  const photoIn = durationInFrames * 0.45;
  const frame = useCurrentFrame();
  const shine = useWave(30, 1);
  return (
    <g>
      <Paper />
      {/* Ayna */}
      <g transform="translate(250 270)">
        <ellipse cx={0} cy={0} rx={170} ry={220} fill="#c9a24a" stroke={OUTLINE} strokeWidth={6} />
        <ellipse cx={0} cy={0} rx={146} ry={196} fill="#dff3ff" stroke={OUTLINE} strokeWidth={4} />
        <path d={`M -90 -120 L ${-50 + shine * 6} -160`} stroke="#fff" strokeWidth={14} strokeLinecap="round" />
        <g transform="translate(0 10) scale(-1.05 1.05)">
          <Face mood="smile" mole />
        </g>
        <Heart x={110} y={-150} size={1} delay={10} />
      </g>
      <Chip x={250} y={520} text="AYNADA" delay={4} />
      {/* Fotoğraf */}
      <Photo x={650} y={250} rotate={6} label="FOTOĞRAF" mood="flat" delay={photoIn} />
      {frame > photoIn ? <QuestionMark x={810} y={110} size={110} delay={photoIn + 8} /> : null}
      {frame > photoIn ? <Chip x={650} y={500} text="BU BEN MİYİM?" dark delay={photoIn + 12} /> : null}
    </g>
  );
};

// 3) Adı: sadece maruz kalma etkisi — beyin, tekrar gördüklerini seviyor
const NameIt: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const items = [
    (k: string) => <Note8 key={k} x={0} y={20} scale={0.9} />,
    (k: string) => (
      <g key={k} transform="scale(0.42)">
        <Face mood="smile" mole />
      </g>
    ),
    (k: string) => (
      <g key={k}>
        <rect x={-46} y={-30} width={92} height={60} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
          ABC
        </text>
      </g>
    ),
  ];
  return (
    <g>
      <Paper />
      {items.map((draw, i) => {
        const a = frame / 22 + (i * Math.PI * 2) / 3;
        const cx = 450 + Math.cos(a) * 270;
        const cy = 250 + Math.sin(a) * 140;
        return (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            {draw(`d${i}`)}
          </g>
        );
      })}
      <Brain x={450} y={250} scale={1.1} mood="happy" />
      {[0, 1, 2].map((i) => {
        const start = durationInFrames * (0.25 + i * 0.15);
        return <Heart key={i} x={[330, 570, 450][i]} y={[150, 150, 110][i]} size={0.7} delay={start} />;
      })}
      <Chip x={450} y={500} text="SADECE MARUZ KALMA ETKİSİ" dark delay={8} />
    </g>
  );
};

// 4) Zajonc anlamsız kelimeler gösteriyor
const NonsenseWords: Visual = ({ durationInFrames }) => {
  const words = ["ZOBRAK", "FELİMO", "TURVAK"];
  return (
    <g>
      <Paper />
      <Floor y={490} />
      {/* Pano */}
      <rect x={300} y={60} width={540} height={330} rx={14} fill="#2f5d50" stroke={OUTLINE} strokeWidth={6} />
      <rect x={300} y={390} width={540} height={18} fill="#9a6a3c" stroke={OUTLINE} strokeWidth={4} />
      {words.map((w, i) => {
        const d = durationInFrames * (0.15 + i * 0.18);
        return (
          <g key={w}>
            <Card x={570} y={130 + i * 95} text={w} delay={d} />
          </g>
        );
      })}
      <QuestionMark x={790} y={110} size={80} delay={durationInFrames * 0.7} />
      <Person x={170} y={490} scale={1.45} shirt={PURPLE} pants="#2f3f63" hair="#2b2b2b" glasses presenting delay={0} />
      <NamePlate x={170} y={520} text="R. ZAJONC" delay={10} />
    </g>
  );
};

const Card: React.FC<{ x: number; y: number; text: string; delay?: number }> = ({ x, y, text, delay = 0 }) => {
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, appear, -2)}>
      <rect x={-150} y={-36} width={300} height={72} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <text x={0} y={14} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={INK} letterSpacing={4}>
        {text}
      </text>
    </g>
  );
};

// 5) Ne kadar sık görüldüyse o kadar olumlu
const MoreIsBetter: Visual = ({ durationInFrames }) => {
  const bars = [
    { label: "AZ", h: 90, mood: "flat" as Mood },
    { label: "ORTA", h: 170, mood: "smile" as Mood },
    { label: "ÇOK", h: 260, mood: "laugh" as Mood },
  ];
  return (
    <g>
      <Paper />
      <line x1={140} y1={460} x2={800} y2={460} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <line x1={140} y1={460} x2={140} y2={90} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <text x={110} y={270} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={INK} transform="rotate(-90 110 270)">
        OLUMLU
      </text>
      {bars.map((b, i) => {
        const p = useProgress(durationInFrames * (0.1 + i * 0.2), durationInFrames * (0.25 + i * 0.2));
        const x = 260 + i * 200;
        const h = b.h * p;
        return (
          <g key={b.label}>
            <rect x={x - 60} y={460 - h} width={120} height={h} rx={8} fill={[BLUE, PURPLE, PINK][i]} stroke={OUTLINE} strokeWidth={5} />
            <text x={x} y={505} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
              {b.label}
            </text>
            {p > 0.98 ? (
              <g transform={place(x, 460 - h - 60, 0.42)}>
                <Face mood={b.mood} hair="#2b2b2b" />
              </g>
            ) : null}
          </g>
        );
      })}
      <text x={800} y={545} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="end" fill="#6b6b6b">
        GÖRME SAYISI →
      </text>
      <Sparkles points={[[720, 120], [790, 190], [660, 90]]} />
    </g>
  );
};

// 6) 208 deney — güvenilir
const MetaStack: Visual = ({ durationInFrames }) => {
  const p = useProgress(0, durationInFrames * 0.55);
  const n = Math.round(208 * p);
  const sheets = Math.round(12 * p);
  const ok = useAppear(durationInFrames * 0.6);
  return (
    <g>
      <Paper />
      <Floor y={470} />
      {Array.from({ length: sheets }).map((_, i) => (
        <rect
          key={i}
          x={190 + (i % 2) * 8}
          y={440 - i * 24}
          width={220}
          height={26}
          rx={4}
          fill={i % 2 ? "#fff" : "#f4f4f4"}
          stroke={OUTLINE}
          strokeWidth={4}
          transform={`rotate(${(i % 3) - 1} 300 ${450 - i * 24})`}
        />
      ))}
      <text x={600} y={250} fontFamily={uiFont} fontWeight={800} fontSize={150} textAnchor="middle" fill={PINK} stroke={OUTLINE} strokeWidth={7} paintOrder="stroke">
        {n}
      </text>
      <text x={600} y={310} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={INK}>
        DENEY
      </text>
      <g transform={place(600, 410, ok)}>
        <circle cx={-150} cy={0} r={34} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -166 0 L -154 14 L -132 -12" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Chip x={630} y={410} text="GÜVENİLİR" delay={durationInFrames * 0.6} />
    </g>
  );
};

// 7) Deney: kendi yüzünün ayna görüntüsünü seçiyor
const MirrorStudy: Visual = ({ durationInFrames }) => {
  const pick = durationInFrames * 0.5;
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <Photo x={250} y={220} scale={0.9} label="AYNA" mirrored mood="smile" delay={4} glow={frame > pick} />
      <Photo x={650} y={220} scale={0.9} label="GERÇEK" mood="smile" delay={12} />
      <Arrow from={[450, 470]} to={[300, 400]} progress={useProgress(pick - 10, pick)} color={RED} />
      {frame > pick ? <Heart x={250} y={60} size={1.1} delay={pick} /> : null}
      <Chip x={450} y={510} text="SEN: AYNA" dark delay={pick} />
    </g>
  );
};

// 8) Arkadaşı gerçek fotoğrafı seçiyor; sen aynadan, o karşıdan görüyor
const FriendsChoice: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const pick = durationInFrames * 0.25;
  const explain = durationInFrames * 0.42;
  return (
    <g>
      <Paper />
      <Photo x={160} y={200} scale={0.7} label="AYNA" mirrored mood="smile" delay={0} />
      <Photo x={420} y={200} scale={0.7} label="GERÇEK" mood="smile" delay={4} glow={frame > pick} />
      {frame > pick ? <Heart x={420} y={70} size={1} delay={pick} /> : null}
      <Chip x={290} y={400} text="ARKADAŞ: GERÇEK" delay={pick + 6} />
      {/* Kim nereden görüyor */}
      <g transform={place(720, 260, useAppear(explain))}>
        <rect x={-150} y={-200} width={300} height={400} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={-150} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
          SEN → AYNA
        </text>
        <g transform="translate(-60 -60) scale(0.45)">
          <Face mood="smile" />
        </g>
        <rect x={40} y={-110} width={20} height={100} rx={6} fill="#bfe6ff" stroke={OUTLINE} strokeWidth={4} />
        <text x={0} y={60} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
          ONLAR → KARŞIDAN
        </text>
        <g transform="translate(-70 140) scale(0.4)">
          <Face mood="smile" mole />
        </g>
        <g transform="translate(70 140) scale(0.4)">
          <Face mood="smile" hair="#c0392b" />
        </g>
      </g>
    </g>
  );
};

// 9) Tanıdık olan daha kolay işleniyor → hoşa gidiyor
const EasyBrain: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const t = (frame % 60) / 60;
  const bump = Math.abs(Math.sin(frame / 3)) * 14;
  return (
    <g>
      <Paper />
      <Brain x={720} y={250} scale={1.05} mood="happy" />
      {/* Kolay yol */}
      <path d="M 60 170 L 600 170" stroke={GREEN} strokeWidth={34} strokeLinecap="round" />
      <path d="M 60 170 L 600 170" stroke="#fff" strokeWidth={4} strokeDasharray="20 18" />
      <g transform={`translate(${80 + t * 500} 130)`}>
        <Note8 x={0} y={10} scale={0.8} color={PINK} />
      </g>
      <Chip x={300} y={240} text="TANIDIK" delay={4} />
      {/* Zor yol */}
      <path d="M 60 390 L 120 360 L 180 400 L 240 350 L 300 405 L 360 355 L 420 400 L 480 360 L 600 390" fill="none" stroke="#b0b0b0" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
      <g transform={`translate(${80 + t * 200} ${330 - bump})`}>
        <QuestionMark x={0} y={0} size={60} color="#9a9a9a" />
      </g>
      <Chip x={300} y={470} text="YENİ" dark delay={10} />
      <g transform={place(720, 470, useAppear(durationInFrames * 0.3))}>
        <Chip x={0} y={0} text="KOLAY = HOŞ" />
      </g>
      <Sparkles points={[[640, 110], [820, 140], [810, 360]]} />
    </g>
  );
};

// 10) Fazla tekrar: beğeni önce artıyor, sonra düşüyor (ters U)
const TooMuch: Visual = ({ durationInFrames }) => {
  const p = useProgress(durationInFrames * 0.08, durationInFrames * 0.85);
  const pts: [number, number][] = [];
  for (let i = 0; i <= 40; i++) {
    const u = i / 40;
    pts.push([120 + u * 460, 440 - Math.sin(u * Math.PI * 0.92 + 0.08) * 300 + u * 60]);
  }
  const shown = Math.max(1, Math.round(p * 40));
  const d = pts
    .slice(0, shown + 1)
    .map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`)
    .join(" ");
  const [dx, dy] = pts[shown];
  const plays = Math.round(interpolate(p, [0, 1], [1, 40]));
  const mood: Mood = p < 0.2 ? "flat" : p < 0.6 ? "laugh" : "bored";
  return (
    <g>
      <Paper />
      <line x1={120} y1={460} x2={600} y2={460} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <line x1={120} y1={460} x2={120} y2={90} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <text x={90} y={270} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK} transform="rotate(-90 90 270)">
        BEĞENİ
      </text>
      <text x={600} y={500} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="end" fill={INK}>
        TEKRAR →
      </text>
      <path d={d} fill="none" stroke={PINK} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={dx} cy={dy} r={16} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      <Bust x={750} y={565} scale={0.7} mood={mood} headphones shirt={PURPLE} />
      <g transform="translate(750 90)">
        <rect x={-90} y={-36} width={180} height={72} rx={36} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -62 -16 L -62 16 L -36 0 Z" fill={INK} />
        <text x={20} y={14} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill={INK}>
          ×{plays}
        </text>
      </g>
      {p > 0.75 ? <BigText x={620} y={170} text="ZZZ" size={56} color="#bfa8ff" delay={durationInFrames * 0.7} /> : null}
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = () => {
  const pulse = 1 + useWave(30, 0.05);
  const card = useAppear(8);
  const bob = useWave(16, 6);
  return (
    <g>
      <Paper />
      <Bust x={200} y={600} scale={0.95} mood="laugh" headphones bob={bob} shirt={PINK} />
      <FloatingNotes x={330} y={210} />
      <g transform={place(610, 220, card)}>
        <rect x={-230} y={-160} width={460} height={320} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -200 110 L -270 180 L -150 150 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-214} y={110} width={70} height={44} fill="#fff" />
        <text x={0} y={-70} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={INK}>
          HANGİ ŞARKI?
        </text>
        <Heart x={-60} y={30} size={0.9} delay={16} />
        <Note8 x={50} y={60} scale={1} color={PURPLE} />
      </g>
      <g transform={place(610, 490, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={22} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  FirstListen,
  MirrorPhoto,
  NameIt,
  NonsenseWords,
  MoreIsBetter,
  MetaStack,
  MirrorStudy,
  FriendsChoice,
  EasyBrain,
  TooMuch,
  YourTurn,
};
