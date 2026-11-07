// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Çalışırken süper, sınavda boş? Blok vs. karışık çalışma (2026-11-07-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import { Arrow, Brain, Chip, INK, NamePlate, Person, place, Sparkles, ThoughtBubble, uiFont, useAppear, useProgress, useWave, YELLOW } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#f3efff";
const SOFT = "#e2d9ff";
const PURPLE = "#7c5cff";
const DEEP = "#4a2ad1";
const TEAL = "#2ec4b6";
const ORANGE = "#ff9f43";
const PINK = "#ff6b9a";
const GREEN = "#3fb47a";
const RED = "#e5484d";
const GREY = "#9a93ad";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type Kind = "cube" | "cyl" | "cone" | "sphere";
type Badge = "ok" | "q" | "x" | "none";

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [80, 70, 34],
      [830, 60, 24],
      [840, 330, 16],
      [50, 360, 18],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={SOFT} />
    ))}
  </g>
);

const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; anchor?: "start" | "middle" | "end" }> = ({
  x,
  y,
  text,
  size = 26,
  color = INK,
  anchor = "middle",
}) => (
  <text x={x} y={y} fontFamily={uiFont} fontWeight={800} fontSize={size} textAnchor={anchor} fill={color}>
    {text}
  </text>
);

// Geometrik cisim simgesi; (0,0) merkez, ~60 birim
const Shape: React.FC<{ kind: Kind }> = ({ kind }) => {
  if (kind === "cube") {
    return (
      <g>
        <rect x={-28} y={-14} width={40} height={40} fill={PURPLE} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <path d="M -28 -14 L -12 -30 L 28 -30 L 12 -14 Z" fill="#a993ff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <path d="M 12 -14 L 28 -30 L 28 10 L 12 26 Z" fill="#5a3be0" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      </g>
    );
  }
  if (kind === "cyl") {
    return (
      <g>
        <path d="M -26 -20 L -26 20 A 26 9 0 0 0 26 20 L 26 -20 Z" fill={TEAL} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <ellipse cx={0} cy={-20} rx={26} ry={9} fill="#8ae6dc" stroke={OUTLINE} strokeWidth={4} />
      </g>
    );
  }
  if (kind === "cone") {
    return (
      <g>
        <path d="M 0 -32 L -28 20 A 28 9 0 0 0 28 20 Z" fill={ORANGE} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <path d="M -8 -10 L -16 12" stroke="#ffd29e" strokeWidth={5} strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g>
      <circle r={28} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
      <path d="M -27 2 Q 0 14 27 2" fill="none" stroke={OUTLINE} strokeWidth={3} />
      <ellipse cx={-10} cy={-12} rx={8} ry={5} fill="#ffc2d4" />
    </g>
  );
};

const BadgeMark: React.FC<{ kind: Badge; delay: number }> = ({ kind, delay }) => {
  const a = useAppear(delay);
  if (kind === "none") return null;
  const fill = kind === "ok" ? GREEN : kind === "q" ? YELLOW : RED;
  return (
    <g transform={place(0, 0, a)}>
      <circle r={22} fill={fill} stroke={OUTLINE} strokeWidth={4} />
      {kind === "ok" ? (
        <path d="M -10 1 L -3 9 L 11 -8" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      ) : kind === "q" ? (
        <text x={0} y={10} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
          ?
        </text>
      ) : (
        <path d="M -8 -8 L 8 8 M 8 -8 L -8 8" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
      )}
    </g>
  );
};

// Soru kartı: içinde cisim, köşesinde rozet
const Card: React.FC<{ x: number; y: number; kind: Kind; scale?: number; delay?: number; badge?: Badge; badgeDelay?: number; glow?: string }> = ({
  x,
  y,
  kind,
  scale = 1,
  delay = 0,
  badge = "none",
  badgeDelay = 0,
  glow,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <rect x={-50} y={-60} width={100} height={120} rx={14} fill="rgba(0,0,0,0.12)" transform="translate(5 6)" />
      <rect x={-50} y={-60} width={100} height={120} rx={14} fill="#fff" stroke={glow ?? OUTLINE} strokeWidth={glow ? 8 : 5} />
      <g transform="translate(0 -10)">
        <Shape kind={kind} />
      </g>
      <rect x={-30} y={36} width={60} height={6} rx={3} fill={SOFT} />
      <g transform="translate(40 -52)">
        <BadgeMark kind={badge} delay={badgeDelay} />
      </g>
    </g>
  );
};

// 1) Çalışırken hepsi doğru, sınavda kafa karışık
const AllCorrect: Visual = () => {
  const right = useAppear(56);
  const div = useProgress(4, 30);
  return (
    <g>
      <Paper />
      <Label x={225} y={70} text="ÇALIŞIRKEN" size={34} color={DEEP} />
      {[
        [165, 190],
        [295, 190],
        [165, 340],
        [295, 340],
      ].map(([x, y], i) => (
        <Card key={i} x={x} y={y} kind="cube" scale={1.05} delay={2 + i * 3} badge="ok" badgeDelay={12 + i * 7} />
      ))}
      <Chip x={225} y={480} text="HEPSİ DOĞRU!" delay={42} />
      <line x1={450} y1={40} x2={450} y2={40 + 480 * div} stroke={GREY} strokeWidth={5} strokeDasharray="14 12" strokeLinecap="round" />
      <g opacity={right}>
        <Label x={675} y={70} text="SINAVDA" size={34} color={RED} />
      </g>
      {(
        [
          [605, 190, "cone"],
          [735, 190, "cube"],
          [605, 340, "sphere"],
          [735, 340, "cyl"],
        ] as [number, number, Kind][]
      ).map(([x, y, k], i) => (
        <Card key={k} x={x} y={y} kind={k} scale={1.05} delay={58 + i * 3} badge="q" badgeDelay={60 + i * 2} />
      ))}
      <Chip x={675} y={480} text="KAFAN KARIŞTI" dark delay={92} />
    </g>
  );
};

const BLOCK_ORDER: Kind[] = ["cube", "cube", "cube", "cube", "cyl", "cyl", "cyl", "cyl", "cone", "cone", "cone", "cone"];
const MIX_ORDER: Kind[] = ["cube", "cyl", "cone", "cyl", "cube", "cone", "cone", "cube", "cyl", "cube", "cone", "cyl"];
const slotX = (i: number) => 87 + i * 66;

// 2) Blok çalışma: önce bir konu, sonra öteki
const Blocked: Visual = () => {
  const groups = [0, 1, 2];
  return (
    <g>
      <Paper />
      <Person x={70} y={250} scale={0.6} walking walkSpeed={3.4} shirt={PURPLE} delay={0} />
      <line x1={40} y1={400} x2={860} y2={400} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      {BLOCK_ORDER.map((k, i) => (
        <Card key={i} x={slotX(i)} y={330} kind={k} scale={0.6} delay={6 + i * 5} />
      ))}
      {groups.map((g) => {
        const x1 = slotX(g * 4) - 28;
        const x2 = slotX(g * 4 + 3) + 28;
        return (
          <g key={g} opacity={useAppear(20 + g * 20)}>
            <path d={`M ${x1} 420 L ${x1} 434 L ${x2} 434 L ${x2} 420`} fill="none" stroke={DEEP} strokeWidth={5} strokeLinejoin="round" />
            <Label x={(x1 + x2) / 2} y={466} text={`KONU ${g + 1}`} size={26} color={DEEP} />
          </g>
        );
      })}
      <Chip x={450} y={520} text="ÖNCE BİRİ, SONRA ÖTEKİ" delay={80} />
    </g>
  );
};

// 3) Karıştır: kartlar yer değiştirir
const Shuffle: Visual = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [18, 52], [0, 1], clamp);
  const ease = p * p * (3 - 2 * p);
  // her kartın karışık sıradaki hedef yuvası
  const used = new Set<number>();
  const target = BLOCK_ORDER.map((k) => {
    const j = MIX_ORDER.findIndex((m, idx) => m === k && !used.has(idx));
    used.add(j);
    return j;
  });
  return (
    <g>
      <Paper />
      <g opacity={1 - ease}>
        <Label x={450} y={110} text="BLOK" size={48} color={GREY} />
      </g>
      <g opacity={ease}>
        <Label x={450} y={110} text="KARIŞIK" size={48} color={DEEP} />
      </g>
      {BLOCK_ORDER.map((k, i) => {
        const x = interpolate(ease, [0, 1], [slotX(i), slotX(target[i])]);
        const lift = Math.sin(ease * Math.PI) * (i % 2 === 0 ? -90 : 70);
        return <Card key={i} x={x} y={280 + lift} kind={k} scale={0.6} delay={i * 2} />;
      })}
      <Chip x={450} y={460} text="KARIŞIK ÇALIŞMA" delay={58} />
      <Sparkles points={[[120, 70], [790, 80], [830, 470], [70, 470]]} color={PURPLE} />
    </g>
  );
};

const Strip: React.FC<{ x: number; y: number; order: Kind[]; delay: number }> = ({ x, y, order, delay }) => (
  <g>
    {order.map((k, i) => (
      <Card key={i} x={x + (i - (order.length - 1) / 2) * 44} y={y} kind={k} scale={0.38} delay={delay + i * 3} />
    ))}
  </g>
);

const Sheet = <rect x={-14} y={-20} width={30} height={38} rx={3} fill="#fff" stroke={OUTLINE} strokeWidth={3} />;

// 4) Deney: iki grup öğrenci
const Experiment: Visual = () => (
  <g>
    <Paper />
    <Label x={225} y={70} text="SIRAYLA" size={34} color={DEEP} />
    <Label x={675} y={70} text="KARIŞIK" size={34} color={DEEP} />
    <Strip x={225} y={140} order={["cube", "cube", "cyl", "cyl", "cone", "cone", "sphere", "sphere"]} delay={6} />
    <Strip x={675} y={140} order={["cone", "cube", "sphere", "cyl", "cube", "sphere", "cyl", "cone"]} delay={14} />
    <line x1={450} y1={40} x2={450} y2={460} stroke={GREY} strokeWidth={5} strokeDasharray="14 12" />
    <Person x={160} y={430} scale={0.95} shirt={PURPLE} holding={Sheet} delay={4} />
    <Person x={290} y={430} scale={0.95} shirt={ORANGE} hair="#1f1a17" glasses holding={Sheet} delay={8} />
    <Person x={610} y={430} scale={0.95} shirt={TEAL} hair="#7a4a22" holding={Sheet} delay={12} />
    <Person x={740} y={430} scale={0.95} shirt={PINK} hat="cap" holding={Sheet} delay={16} />
    <NamePlate x={450} y={510} text="GEOMETRİ: CİSİMLERİN HACMİ" delay={30} />
  </g>
);

// Sütun grafiği (blok solda, karışık sağda); değerler 0–1
const Bars: React.FC<{ blok: number; mix: number; title: string; titleColor?: string }> = ({ blok, mix, title, titleColor = DEEP }) => {
  const H = 320;
  const base = 450;
  const bar = (x: number, v: number, color: string, name: string) => (
    <g>
      <rect x={x - 80} y={base - H * v} width={160} height={Math.max(0, H * v)} rx={14} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <Label x={x} y={base - H * v - 18} text={`%${Math.round(v * 100)}`} size={46} />
      <Label x={x} y={base + 44} text={name} size={32} />
    </g>
  );
  return (
    <g>
      <Label x={450} y={66} text={title} size={36} color={titleColor} />
      <line x1={150} y1={base} x2={750} y2={base} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {bar(300, blok, PURPLE, "BLOK")}
      {bar(600, mix, TEAL, "KARIŞIK")}
    </g>
  );
};

// 5) Çalışırken blok grup önde: 89'a 60
const PracticeScore: Visual = () => {
  const b = useProgress(8, 50);
  const m = useProgress(8, 40);
  return (
    <g>
      <Paper />
      <Bars blok={0.89 * b} mix={0.6 * m} title="ÇALIŞIRKEN" />
      <g opacity={useAppear(56)}>
        <Sparkles points={[[190, 120], [410, 140], [300, 90]]} color={PURPLE} />
      </g>
    </g>
  );
};

// 6) Bir hafta sonra tablo tersine döndü: 63'e 20
const TestScore: Visual = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [30, 70], [0, 1], clamp);
  const flip = useAppear(4);
  const crown = useAppear(78);
  const tip = useWave(30, 4);
  return (
    <g>
      <Paper />
      <Bars blok={interpolate(t, [0, 1], [0.89, 0.2])} mix={interpolate(t, [0, 1], [0.6, 0.63])} title="BİR HAFTA SONRA: SINAV" titleColor={RED} />
      {/* takvim */}
      <g transform={place(800, 170, flip, 6)}>
        <rect x={-62} y={-60} width={124} height={130} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-62} y={-60} width={124} height={36} rx={12} fill={RED} stroke={OUTLINE} strokeWidth={5} />
        <Label x={0} y={36} text="+7" size={50} />
        <Label x={0} y={62} text="GÜN" size={20} />
      </g>
      {/* taç */}
      <g transform={place(600, 450 - 320 * 0.63 - 104 + tip, crown)}>
        <path d="M -44 18 L -44 -16 L -22 2 L 0 -26 L 22 2 L 44 -16 L 44 18 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      </g>
      <g opacity={useAppear(74)}>
        <path d="M 405 230 L 405 330" stroke={RED} strokeWidth={10} strokeLinecap="round" />
        <path d="M 385 310 L 405 340 L 425 310" fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
};

// Tablo üslupları
const Painting: React.FC<{ w: number; h: number; style: "dots" | "stripes" | "waves"; palette: string[] }> = ({ w, h, style, palette }) => {
  const x0 = -w / 2;
  const y0 = -h / 2;
  let art: React.ReactNode = null;
  if (style === "dots") {
    const cols = Math.floor(w / 26);
    const rows = Math.floor(h / 26);
    art = Array.from({ length: cols * rows }).map((_, i) => (
      <circle key={i} cx={x0 + 16 + (i % cols) * 26} cy={y0 + 16 + Math.floor(i / cols) * 26} r={9} fill={palette[i % palette.length]} />
    ));
  } else if (style === "stripes") {
    const n = 6;
    art = Array.from({ length: n }).map((_, i) => (
      <rect key={i} x={x0 + 8 + (i * (w - 16)) / n} y={y0 + 8} width={(w - 16) / n - 4} height={h - 16} fill={palette[i % palette.length]} />
    ));
  } else {
    art = [0, 1, 2, 3].map((i) => {
      const y = y0 + 22 + i * ((h - 30) / 4);
      const seg = w / 4;
      return (
        <path
          key={i}
          d={`M ${x0 + 8} ${y} Q ${x0 + seg / 2} ${y - 16} ${x0 + seg} ${y} T ${x0 + 2 * seg} ${y} T ${x0 + 3 * seg} ${y} T ${x0 + w - 8} ${y}`}
          fill="none"
          stroke={palette[i % palette.length]}
          strokeWidth={9}
          strokeLinecap="round"
        />
      );
    });
  }
  return (
    <g>
      <rect x={x0 - 12} y={y0 - 12} width={w + 24} height={h + 24} rx={6} fill="#c98b4a" stroke={OUTLINE} strokeWidth={5} />
      <rect x={x0} y={y0} width={w} height={h} fill="#fffaf2" stroke={OUTLINE} strokeWidth={3} />
      {art}
    </g>
  );
};

// 7) Ressamların tarzı: karışık görenler daha iyi tanıdı
const Paintings: Visual = () => {
  const frame = useCurrentFrame();
  const active = frame < 44 ? Math.floor(frame / 8) % 3 : -1;
  const arts: { x: number; style: "dots" | "stripes" | "waves"; palette: string[]; name: string }[] = [
    { x: 170, style: "dots", palette: [PURPLE, ORANGE, TEAL], name: "RESSAM A" },
    { x: 450, style: "stripes", palette: [PINK, YELLOW, DEEP], name: "RESSAM B" },
    { x: 730, style: "waves", palette: [TEAL, PURPLE, ORANGE], name: "RESSAM C" },
  ];
  const q = useAppear(44);
  const arrow = useProgress(62, 80);
  const ok = useAppear(82);
  return (
    <g>
      <Paper />
      {arts.map((a, i) => (
        <g key={a.name} transform={place(a.x, 150, useAppear(i * 4) * (active === i ? 1.08 : 1))}>
          <Painting w={180} h={130} style={a.style} palette={a.palette} />
          {active === i ? <rect x={-112} y={-87} width={224} height={174} rx={10} fill="none" stroke={YELLOW} strokeWidth={8} /> : null}
        </g>
      ))}
      {arts.map((a, i) => (
        <NamePlate key={a.name} x={a.x} y={262} text={a.name} delay={8 + i * 4} />
      ))}
      <g transform={place(450, 420, q)}>
        <Painting w={150} h={110} style="dots" palette={[GREEN, PINK, YELLOW]} />
      </g>
      <g opacity={q}>
        <Label x={640} y={410} text="BU KİMİN?" size={36} color={DEEP} />
        <Label x={640} y={450} text="YENİ TABLO" size={22} color={GREY} />
      </g>
      <Arrow from={[350, 400]} to={[205, 300]} progress={arrow} color={GREEN} />
      <g transform={place(110, 300, ok)}>
        <circle r={28} fill={GREEN} stroke={OUTLINE} strokeWidth={4} />
        <path d="M -12 1 L -3 11 L 13 -9" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
};

// 8) Karışıkta daha başarılı, ama blok daha iyi sandılar
const Belief: Visual = () => {
  const stamp = useAppear(100);
  return (
    <g>
      <Paper />
      <g transform={place(230, 250, useAppear(4))}>
        <rect x={-180} y={-170} width={360} height={330} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Label x={0} y={-112} text="GERÇEKTE" size={32} color={GREY} />
        <Label x={0} y={10} text="%78" size={96} color={GREEN} />
        <Label x={0} y={70} text="KARIŞIKTA" size={30} />
        <Label x={0} y={110} text="DAHA BAŞARILI" size={30} />
      </g>
      <Person x={590} y={480} scale={0.9} shirt={TEAL} delay={10} />
      <ThoughtBubble x={720} y={190} r={100} delay={24}>
        <Label x={0} y={-8} text="BLOK" size={44} />
        <Label x={0} y={30} text="DAHA İYİ!" size={28} />
      </ThoughtBubble>
      <g transform={place(842, 110, stamp)}>
        <circle r={30} fill={RED} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -11 -11 L 11 11 M 11 -11 L -11 11" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
      </g>
      <Chip x={700} y={520} text="AMA %78 SANDI" dark delay={44} />
    </g>
  );
};

// 9) Neden? Beyin her soruda yöntem seçmek zorunda
const Choose: Visual = () => {
  const frame = useCurrentFrame();
  const scan = Math.floor(frame / 10) % 3;
  const chosen = frame > 70;
  const pick = useProgress(70, 88);
  const boxes: { y: number; kind: Kind; text: string }[] = [
    { y: 120, kind: "cube", text: "KÜP FORMÜLÜ" },
    { y: 270, kind: "sphere", text: "KÜRE FORMÜLÜ" },
    { y: 420, kind: "cyl", text: "SİLİNDİR FORMÜLÜ" },
  ];
  return (
    <g>
      <Paper />
      <Brain x={150} y={250} scale={0.8} mood={chosen ? "happy" : "confused"} />
      <Card x={370} y={270} kind="sphere" scale={1.1} delay={6} badge={chosen ? "ok" : "q"} badgeDelay={chosen ? 86 : 14} />
      {boxes.map((b, i) => {
        const lit = chosen ? i === 1 : scan === i && frame > 20;
        return (
          <g key={b.text} transform={place(680, b.y, useAppear(10 + i * 5))}>
            <rect x={-170} y={-50} width={340} height={100} rx={18} fill={lit ? (chosen ? "#dff5e8" : "#fff6c9") : "#fff"} stroke={chosen && i === 1 ? GREEN : OUTLINE} strokeWidth={chosen && i === 1 ? 8 : 5} />
            <g transform="translate(-118 4) scale(0.8)">
              <Shape kind={b.kind} />
            </g>
            <Label x={40} y={10} text={b.text} size={i === 2 ? 22 : 25} />
          </g>
        );
      })}
      {boxes.map((b, i) => (
        <line key={b.text} x1={432} y1={270} x2={505} y2={b.y} stroke={GREY} strokeWidth={4} strokeDasharray="8 8" opacity={useAppear(20)} />
      ))}
      <Arrow from={[432, 270]} to={[500, 270]} progress={pick} color={GREEN} />
      <Chip x={170} y={490} text="HANGİ YÖNTEM?" delay={24} />
    </g>
  );
};

// 10) Zorlanmak iyi; en çok benzer konularda işe yarar
const Tip: Visual = () => {
  const frame = useCurrentFrame();
  const lift = useWave(36, 26);
  const order = Math.floor(frame / 24) % 3;
  const kinds: Kind[] = ["cube", "cyl", "cone"];
  return (
    <g>
      <Paper />
      {/* halter kaldıran beyin */}
      <g transform={`translate(0 ${-Math.abs(lift) * 0.3})`}>
        <g transform={`translate(230 ${120 - Math.abs(lift)})`}>
          <rect x={-140} y={-8} width={280} height={16} rx={8} fill="#555" stroke={OUTLINE} strokeWidth={4} />
          <rect x={-150} y={-40} width={34} height={80} rx={8} fill={DEEP} stroke={OUTLINE} strokeWidth={5} />
          <rect x={116} y={-40} width={34} height={80} rx={8} fill={DEEP} stroke={OUTLINE} strokeWidth={5} />
        </g>
        <path d={`M 150 230 L 130 ${130 - Math.abs(lift)}`} stroke={OUTLINE} strokeWidth={10} strokeLinecap="round" />
        <path d={`M 310 230 L 330 ${130 - Math.abs(lift)}`} stroke={OUTLINE} strokeWidth={10} strokeLinecap="round" />
      </g>
      <Brain x={230} y={280} scale={0.85} mood="confused" />
      <g opacity={(frame % 30) / 30 < 0.7 ? 1 : 0.2}>
        <path d="M 345 220 q 8 14 0 22 q -8 -8 0 -22 Z" fill="#7cc8ff" stroke={OUTLINE} strokeWidth={3} />
        <path d="M 120 250 q 8 14 0 22 q -8 -8 0 -22 Z" fill="#7cc8ff" stroke={OUTLINE} strokeWidth={3} />
      </g>
      <Chip x={230} y={480} text="ZORLANMAK = İYİ" delay={16} />
      {/* benzer konular kartı */}
      <g transform={place(660, 270, useAppear(8))}>
        <rect x={-200} y={-200} width={400} height={400} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Label x={0} y={-140} text="BENZER KONULAR" size={32} color={DEEP} />
        {kinds.map((k, i) => {
          const slot = (i + order) % 3;
          return <Card key={k} x={-120 + slot * 120} y={-20} kind={k} scale={0.9} />;
        })}
        <Label x={0} y={90} text="KÜP · SİLİNDİR · KONİ" size={24} color={GREY} />
        <Chip x={0} y={150} text="KARIŞTIR!" delay={30} />
      </g>
    </g>
  );
};

// 11) Sen nasıl çalışıyorsun?
const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const which = Math.floor(frame / 20) % 2;
  const pulse = 1 + useWave(24, 0.04);
  const option = (y: number, text: string, order: Kind[], on: boolean, delay: number) => (
    <g transform={place(600, y, useAppear(delay) * (on ? 1.05 : 1))}>
      <rect x={-230} y={-70} width={460} height={140} rx={24} fill="#fff" stroke={on ? PURPLE : OUTLINE} strokeWidth={on ? 9 : 6} />
      <Label x={-120} y={14} text={text} size={40} />
      {order.map((k, i) => (
        <g key={i} transform={`translate(${60 + i * 50} 0) scale(0.62)`}>
          <Shape kind={k} />
        </g>
      ))}
    </g>
  );
  return (
    <g>
      <Paper />
      <Person x={160} y={470} scale={1.1} shirt={PURPLE} presenting />
      {option(130, "BLOK", ["cube", "cube", "cyl", "cyl"], which === 0, 6)}
      {option(300, "KARIŞIK", ["cube", "cyl", "cone", "cyl"], which === 1, 12)}
      <g transform={place(600, 470, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={24} />
      </g>
      <Sparkles points={[[860, 60], [330, 60], [860, 420]]} color={PURPLE} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  AllCorrect,
  Blocked,
  Shuffle,
  Experiment,
  PracticeScore,
  TestScore,
  Paintings,
  Belief,
  Choose,
  Tip,
  YourTurn,
};
