// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Erteleme / neden hep son geceye bırakıyoruz (2026-11-19-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import { Arrow, Brain, Chip, Heart, INK, Person, place, QuestionMark, Sparkles, uiFont, useAppear, useProgress, useWave } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#f3efff";
const SKIN = "#f2c79a";
const PURPLE = "#8a6cf0";
const PINK = "#ff5c8a";
const TEAL = "#17c3a5";
const ORANGE = "#ff9a3d";
const BLUE = "#3d8bfd";
const YEL = "#ffd23f";
const HAIR = "#4a2f1d";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

type Mood = "calm" | "happy" | "wow" | "sleep" | "think";

// Yuvarlak yüz; (0,0) merkez, yarıçap r
const Face: React.FC<{ r?: number; mood?: Mood; hair?: string; baby?: boolean }> = ({ r = 60, mood = "calm", hair = HAIR, baby = false }) => {
  const frame = useCurrentFrame();
  const blink = frame % 96 > 90 ? 0.15 : 1;
  const k = r / 60;
  return (
    <g transform={`scale(${k})`}>
      <circle r={60} fill={SKIN} stroke={OUTLINE} strokeWidth={6 / k} />
      {baby ? (
        <path d="M -6 -60 Q 4 -78 16 -66 Q 8 -64 6 -56" fill="none" stroke={HAIR} strokeWidth={5} strokeLinecap="round" />
      ) : (
        <path d="M -62 -6 Q -66 -72 0 -70 Q 62 -70 62 -8 Q 40 -40 0 -40 Q -36 -40 -62 -6 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      )}
      {mood === "sleep" ? (
        <g>
          <path d="M -32 0 Q -22 8 -12 0" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          <path d="M 12 0 Q 22 8 32 0" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        </g>
      ) : mood === "wow" ? (
        <g>
          <circle cx={-22} cy={-2} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={22} cy={-2} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={-22} cy={0} r={5} fill={OUTLINE} />
          <circle cx={22} cy={0} r={5} fill={OUTLINE} />
        </g>
      ) : (
        <g transform={`translate(0 ${-2 * (1 - blink)}) scale(1 ${blink})`}>
          <circle cx={-22} cy={-2} r={baby ? 8 : 7} fill={OUTLINE} />
          <circle cx={22} cy={-2} r={baby ? 8 : 7} fill={OUTLINE} />
          {mood === "think" ? <circle cx={-18} cy={-6} r={2.5} fill="#fff" /> : null}
        </g>
      )}
      {mood === "happy" ? (
        <path d="M -20 22 Q 0 44 20 22 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      ) : mood === "wow" ? (
        <ellipse cx={0} cy={30} rx={9} ry={12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
      ) : mood === "think" ? (
        <path d="M -14 30 Q 0 24 16 30" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      ) : (
        <path d="M -14 26 Q 0 36 14 26" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      )}
      <circle cx={-38} cy={16} r={8} fill="#f59ab0" opacity={0.6} />
      <circle cx={38} cy={16} r={8} fill="#f59ab0" opacity={0.6} />
    </g>
  );
};

// Yetişkin/çocuk büstü; (x,y) gövdenin alt ortası
const Bust: React.FC<{ x: number; y: number; scale?: number; shirt?: string; mood?: Mood; hair?: string; delay?: number }> = ({
  x,
  y,
  scale = 1,
  shirt = PURPLE,
  mood = "calm",
  hair = HAIR,
  delay = 0,
}) => {
  const a = useAppear(delay);
  const sway = useWave(70, 2);
  return (
    <g transform={place(x, y, scale * a, sway)}>
      <path d="M -90 0 L -80 -76 Q -76 -112 -38 -116 L 38 -116 Q 76 -112 80 -76 L 90 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-13} y={-132} width={26} height={20} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform="translate(0 -190)">
        <Face r={64} mood={mood} hair={hair} />
      </g>
    </g>
  );
};

// Konuşma balonu (beyaz); metin satırları
const Speech: React.FC<{ x: number; y: number; w: number; lines: string[]; color?: string; delay?: number; size?: number; tailLeft?: boolean }> = ({
  x,
  y,
  w,
  lines,
  color = PURPLE,
  delay = 0,
  size = 36,
  tailLeft = true,
}) => {
  const a = useAppear(delay);
  const h = lines.length * (size + 10) + 34;
  const tail = tailLeft ? `M ${-w / 2 + 40} ${h / 2 - 2} L ${-w / 2 + 20} ${h / 2 + 40} L ${-w / 2 + 80} ${h / 2 - 2}` : `M ${w / 2 - 80} ${h / 2 - 2} L ${w / 2 - 20} ${h / 2 + 40} L ${w / 2 - 40} ${h / 2 - 2}`;
  return (
    <g transform={place(x, y, a)}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <path d={tail} fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-w / 2 + 3} y={h / 2 - 8} width={w - 6} height={6} fill="#fff" />
      {lines.map((t, i) => (
        <text key={i} y={-h / 2 + 17 + (i + 1) * (size + 10) - 10} fontFamily={uiFont} fontWeight={800} fontSize={size} textAnchor="middle" fill={color}>
          {t}
        </text>
      ))}
    </g>
  );
};

// Duvar saati; akrep/yelkovan dönebilir
const Clock: React.FC<{ x: number; y: number; r?: number; spin?: number; delay?: number; color?: string }> = ({ x, y, r = 60, spin = 0, delay = 0, color = "#fff" }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={r} fill={color} stroke={OUTLINE} strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={0} y1={-r + 8} x2={0} y2={-r + 16} stroke={OUTLINE} strokeWidth={4} transform={`rotate(${i * 30})`} />
      ))}
      <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" transform={`rotate(${-30 + spin / 12})`} />
      <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke={PINK} strokeWidth={5} strokeLinecap="round" transform={`rotate(${spin})`} />
      <circle r={6} fill={OUTLINE} />
    </g>
  );
};

// Görev kâğıdı; (x,y) merkez
const TaskPaper: React.FC<{ x: number; y: number; scale?: number; title?: string; grumpy?: boolean; delay?: number; tilt?: number }> = ({
  x,
  y,
  scale = 1,
  title = "ÖDEV",
  grumpy = false,
  delay = 0,
  tilt = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a, tilt)}>
      <path d="M -70 -95 L 40 -95 L 70 -65 L 70 95 L -70 95 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 40 -95 L 40 -65 L 70 -65" fill="#e6e0ff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      <text x={-16} y={-56} fontFamily={uiFont} fontWeight={800} fontSize={21} textAnchor="middle" fill={PURPLE}>
        {title}
      </text>
      {grumpy ? (
        <g transform="translate(0 25)">
          <path d="M -36 -24 L -14 -14 M 36 -24 L 14 -14" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          <circle cx={-24} cy={-4} r={6} fill={OUTLINE} />
          <circle cx={24} cy={-4} r={6} fill={OUTLINE} />
          <path d="M -20 32 Q 0 16 20 32" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        </g>
      ) : (
        [0, 1, 2, 3, 4].map((i) => <rect key={i} x={-50} y={-25 + i * 22} width={100 - (i % 2) * 30} height={6} rx={3} fill="#b9a6f5" />)
      )}
    </g>
  );
};

// Akıllı telefon; (x,y) merkez
const Phone: React.FC<{ x: number; y: number; scale?: number; delay?: number; glow?: number }> = ({ x, y, scale = 1, delay = 0, glow = 0 }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      {glow > 0 ? <circle r={110} fill={YEL} opacity={0.35 * glow} /> : null}
      <rect x={-48} y={-86} width={96} height={172} rx={16} fill={INK} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-38} y={-70} width={76} height={136} rx={6} fill="#6fd3ff" />
      <rect x={-30} y={-60} width={26} height={26} rx={6} fill={PINK} />
      <rect x={4} y={-60} width={26} height={26} rx={6} fill={YEL} />
      <rect x={-30} y={-26} width={26} height={26} rx={6} fill={TEAL} />
      <rect x={4} y={-26} width={26} height={26} rx={6} fill={ORANGE} />
      <rect x={-30} y={10} width={60} height={46} rx={8} fill="#fff" />
      <path d="M -12 22 L 14 33 L -12 44 Z" fill={PINK} />
    </g>
  );
};

// 1) Yine son gece — gece, masa, panik
const LastNight: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const shake = Math.sin(frame / 2) * (frame > d ? 2 : 0);
  return (
    <g>
      <rect width={900} height={560} fill="#2d2259" />
      {[
        [80, 60],
        [200, 120],
        [330, 50],
        [610, 90],
        [760, 40],
        [850, 140],
      ].map(([sx, sy], i) => (
        <circle key={i} cx={sx} cy={sy} r={4 + (i % 2) * 2} fill="#fff" opacity={0.6 + 0.4 * Math.sin((frame + i * 13) / 9)} />
      ))}
      <circle cx={130} cy={130} r={52} fill="#ffe9a8" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={150} cy={115} r={46} fill="#2d2259" />
      <Clock x={760} y={150} r={70} spin={frame * 6} delay={4} />
      <rect x={0} y={430} width={900} height={130} fill="#6b4f9e" stroke={OUTLINE} strokeWidth={5} />
      <g transform={`translate(${shake} 0)`}>
        <Bust x={450} y={470} scale={1} shirt={PURPLE} mood={frame > d ? "wow" : "think"} delay={2} />
      </g>
      <rect x={250} y={420} width={400} height={30} rx={6} fill="#9b6b43" stroke={OUTLINE} strokeWidth={5} />
      <g transform={place(330, 420, useAppear(8))}>
        <path d="M -50 0 L -36 -60 L 36 -60 L 50 0 Z" fill="#cfd6e6" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={0} cy={-30} r={9} fill="#fff" />
      </g>
      <g transform={place(580, 420, useAppear(10))}>
        <rect x={-14} y={-90} width={8} height={90} fill={OUTLINE} />
        <path d="M -60 -90 L 30 -90 L 10 -130 L -40 -130 Z" fill={YEL} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -60 -90 L -120 0 L 90 0 L 30 -90 Z" fill={YEL} opacity={0.25} />
      </g>
      <g transform={place(450, 70, useAppear(d))}>
        <rect x={-210} y={-36} width={420} height={72} rx={36} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
        <text y={13} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill="#fff">
          TESLİM: YARIN!
        </text>
      </g>
      {frame > d ? <Sparkles points={[[330, 220], [570, 220]]} color="#fff" /> : null}
    </g>
  );
};

// 2) Takvim — günler tek tek üstü çiziliyor
const Calendar: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const per = Math.max(2, Math.floor((durationInFrames * 0.6) / 20));
  return (
    <g>
      <Paper />
      <g transform={place(330, 290, useAppear(2))}>
        <rect x={-270} y={-230} width={540} height={460} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-270} y={-230} width={540} height={80} rx={18} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
        <text y={-176} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill="#fff">
          3 HAFTA
        </text>
        {Array.from({ length: 21 }).map((_, i) => {
          const c = i % 7;
          const r = Math.floor(i / 7);
          const cx = -225 + c * 75;
          const cy = -100 + r * 95;
          const last = i === 20;
          const crossed = !last && frame > 10 + i * per;
          return (
            <g key={i} transform={`translate(${cx} ${cy})`}>
              <rect x={-30} y={-36} width={60} height={72} rx={8} fill={last ? "#ffe0ea" : "#f3efff"} stroke={OUTLINE} strokeWidth={3} />
              <text y={10} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={INK}>
                {i + 1}
              </text>
              {crossed ? <path d="M -22 -26 L 22 26 M 22 -26 L -22 26" stroke={PINK} strokeWidth={6} strokeLinecap="round" /> : null}
              {last ? <circle r={40} fill="none" stroke={PINK} strokeWidth={6} /> : null}
            </g>
          );
        })}
        <text x={0} y={205} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={PINK}>
          SON GÜN = TESLİM
        </text>
      </g>
      <Bust x={760} y={560} scale={0.85} shirt={TEAL} mood="think" delay={8} />
      <QuestionMark x={800} y={120} size={90} delay={per * 12} color={PINK} />
    </g>
  );
};

// 3) Tembellik değil — kanepe yazısının üstü çiziliyor
const NotLazy: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const cross = useProgress(d, d + 14);
  return (
    <g>
      <Paper />
      <g transform={place(450, 330, useAppear(2))}>
        <rect x={-230} y={-40} width={460} height={110} rx={30} fill={ORANGE} stroke={OUTLINE} strokeWidth={6} />
        <rect x={-250} y={-90} width={500} height={70} rx={24} fill="#ffb066" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-270} y={-80} width={50} height={150} rx={20} fill={ORANGE} stroke={OUTLINE} strokeWidth={6} />
        <rect x={220} y={-80} width={50} height={150} rx={20} fill={ORANGE} stroke={OUTLINE} strokeWidth={6} />
        <rect x={-210} y={70} width={20} height={40} fill={OUTLINE} />
        <rect x={190} y={70} width={20} height={40} fill={OUTLINE} />
      </g>
      <g transform={place(450, 110, useAppear(6))}>
        <text fontFamily={uiFont} fontWeight={800} fontSize={86} textAnchor="middle" fill={INK} y={30}>
          TEMBELLİK?
        </text>
        <line x1={-260} y1={0} x2={-260 + 520 * cross} y2={0} stroke={PINK} strokeWidth={14} strokeLinecap="round" />
      </g>
      <Brain x={450} y={300} scale={0.85} delay={10} mood={cross > 0.5 ? "happy" : "confused"} />
      <g transform={place(450, 500, useAppear(d + 16))}>
        <rect x={-150} y={-34} width={300} height={68} rx={16} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
        <text y={13} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill="#fff">
          HAYIR!
        </text>
      </g>
    </g>
  );
};

// 4) Duygu sorunu — somurtkan görev + duygular
const Feelings: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const bob = useWave(30, 6);
  return (
    <g>
      <Paper />
      <TaskPaper x={250} y={300 + bob} scale={1.35} grumpy delay={2} title="GÖREV" />
      <Bust x={700} y={560} scale={0.95} shirt={PURPLE} mood="wow" delay={6} />
      {[
        { t: "SIKINTI", x: 520, y: 110, c: ORANGE },
        { t: "KAYGI", x: 470, y: 230, c: PINK },
        { t: "BIKKINLIK", x: 520, y: 350, c: BLUE },
      ].map((e, i) => {
        const a = useAppear(d + i * 10);
        return (
          <g key={e.t} transform={place(e.x, e.y, a, (i - 1) * 4)}>
            <rect x={-e.t.length * 13 - 26} y={-32} width={e.t.length * 26 + 52} height={64} rx={32} fill={e.c} stroke={OUTLINE} strokeWidth={5} />
            <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill="#fff">
              {e.t}
            </text>
          </g>
        );
      })}
      <g transform={place(450, 520, useAppear(d + 36))}>
        <rect x={-180} y={-30} width={360} height={60} rx={14} fill={INK} />
        <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill="#fff">
          DUYGU SORUNU
        </text>
      </g>
    </g>
  );
};

// 5) Kaçış — telefona geçince rahatlama + ödül
const Escape: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const slide = useProgress(d, d + 20);
  const relief = useProgress(d + 20, d + 30);
  return (
    <g>
      <Paper />
      <g opacity={1 - slide * 0.65} transform={`translate(${-slide * 60} ${slide * 30})`}>
        <TaskPaper x={160} y={280} scale={1.1} grumpy delay={2} tilt={-6} title="GÖREV" />
      </g>
      <Arrow from={[260, 200]} to={[420, 200]} progress={slide} color={PURPLE} />
      <Bust x={560} y={560} scale={0.95} shirt={TEAL} mood={relief > 0.5 ? "happy" : "calm"} delay={4} />
      <Phone x={720} y={330} scale={1.1} delay={d} glow={relief} />
      <g transform={place(720, 110, useAppear(d + 28), useWave(40, 5))}>
        <rect x={-110} y={-36} width={220} height={72} rx={36} fill={YEL} stroke={OUTLINE} strokeWidth={5} />
        <text y={13} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={INK}>
          OH BE!
        </text>
      </g>
      <g transform={place(420, 90, useAppear(d + 40))}>
        <path d="M 0 -48 L 14 -14 L 50 -12 L 22 10 L 32 46 L 0 26 L -32 46 L -22 10 L -50 -12 L -14 -14 Z" fill={YEL} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      </g>
      <Chip x={300} y={500} text="ÖDÜL GİBİ!" dark delay={d + 44} />
      {relief > 0.5 ? <Sparkles points={[[640, 220], [800, 240], [720, 470]]} /> : null}
    </g>
  );
};

// 6) Fatura gelecekteki sana — kutu bugünden yarına kayıyor
const FutureSelf: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const move = useProgress(d, d + 30);
  const grow = 1 + move * 0.5;
  const ax = interpolate(move, [0, 1], [270, 610]);
  return (
    <g>
      <Paper />
      <Bust x={170} y={560} scale={0.8} shirt={TEAL} mood="happy" delay={2} />
      <Bust x={730} y={560} scale={0.8} shirt={PURPLE} hair="#8e8e8e" mood={move > 0.8 ? "wow" : "calm"} delay={6} />
      <Chip x={170} y={60} text="BUGÜNKÜ SEN" delay={4} />
      <Chip x={690} y={60} text="GELECEKTEKİ SEN" dark delay={8} />
      <g transform={place(ax, 200 + Math.sin(move * Math.PI) * -60, grow * useAppear(10))}>
        <rect x={-70} y={-55} width={140} height={110} rx={10} fill="#c98b4e" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-70} y={-55} width={140} height={26} fill="#b0763d" stroke={OUTLINE} strokeWidth={5} />
        <text y={30} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill="#fff">
          FATURA
        </text>
      </g>
      {move > 0.8 ? <QuestionMark x={850} y={250} size={70} color={PINK} delay={d + 26} /> : null}
    </g>
  );
};

// 7) Beyin taraması — gelecekteki ben ≈ yabancı
const BrainScan: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.45);
  const link = useProgress(d, d + 18);
  const scan = (frame * 6) % 260;
  return (
    <g>
      <Paper />
      <g transform={place(450, 120, useAppear(2))}>
        <rect x={-150} y={-95} width={300} height={190} rx={22} fill="#1f2340" stroke={OUTLINE} strokeWidth={6} />
        <g transform="scale(0.62)">
          <Brain x={0} y={0} />
        </g>
        <rect x={-140} y={-90 + scan * 0.7} width={280} height={6} fill="#6fd3ff" opacity={0.7} />
      </g>
      {[
        { x: 150, label: "BEN", shirt: TEAL, hair: HAIR },
        { x: 450, label: "GELECEKTEKİ BEN", shirt: PURPLE, hair: "#8e8e8e" },
        { x: 750, label: "YABANCI", shirt: ORANGE, hair: "#1f1f24" },
      ].map((p, i) => (
        <g key={p.label}>
          <Bust x={p.x} y={500} scale={0.55} shirt={p.shirt} hair={p.hair} mood={i === 1 ? "think" : "calm"} delay={8 + i * 6} />
          <g transform={place(p.x, 525, useAppear(10 + i * 6))}>
            <rect x={-p.label.length * 9 - 18} y={-24} width={p.label.length * 18 + 36} height={48} rx={24} fill={INK} />
            <text y={9} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill="#fff">
              {p.label}
            </text>
          </g>
        </g>
      ))}
      <g opacity={link}>
        <path d="M 520 330 Q 600 260 680 330" fill="none" stroke={PINK} strokeWidth={8} strokeLinecap="round" strokeDasharray="14 12" />
        <circle cx={600} cy={280} r={34} fill={YEL} stroke={OUTLINE} strokeWidth={5} />
        <text x={600} y={294} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={INK}>
          ≈
        </text>
      </g>
    </g>
  );
};

// 8) Dönem — stres çizgileri
const Semester: Visual = ({ durationInFrames }) => {
  const p = useProgress(10, Math.round(durationInFrames * 0.75));
  const X0 = 130;
  const X1 = 820;
  const Y = (v: number) => 470 - v * 330;
  const procr = (t: number) => 0.15 + 0.75 * t * t;
  const other = (t: number) => 0.35 + 0.2 * t;
  const path = (f: (t: number) => number) => {
    const pts: string[] = [];
    const n = 40;
    for (let i = 0; i <= n * p; i++) {
      const t = i / n;
      pts.push(`${i === 0 ? "M" : "L"} ${X0 + (X1 - X0) * t} ${Y(f(t))}`);
    }
    return pts.join(" ");
  };
  return (
    <g>
      <Paper />
      <g opacity={useAppear(2)}>
        <line x1={X0} y1={480} x2={X1 + 20} y2={480} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <line x1={X0} y1={480} x2={X0} y2={110} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <text x={X0 - 20} y={100} fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
          STRES
        </text>
        <text x={X0 + 10} y={525} fontFamily={uiFont} fontWeight={800} fontSize={28} fill={INK}>
          DÖNEM BAŞI
        </text>
        <text x={X1 + 10} y={525} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="end" fill={INK}>
          DÖNEM SONU
        </text>
      </g>
      <path d={path(other)} fill="none" stroke={TEAL} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d={path(procr)} fill="none" stroke={PINK} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <g transform={place(330, 150, useAppear(8))}>
        <rect x={-10} y={-12} width={50} height={18} rx={9} fill={PINK} />
        <text x={56} y={6} fontFamily={uiFont} fontWeight={800} fontSize={30} fill={PINK}>
          ERTELEYENLER
        </text>
        <rect x={-10} y={38} width={50} height={18} rx={9} fill={TEAL} />
        <text x={56} y={56} fontFamily={uiFont} fontWeight={800} fontSize={30} fill={TEAL}>
          ERTELEMEYENLER
        </text>
      </g>
      {p > 0.95 ? (
        <g>
          <g transform={place(X1, Y(procr(1)), 1)}>
            <circle r={16} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
          </g>
          <Chip x={640} y={420} text="STRES + HASTALIK" dark delay={Math.round(durationInFrames * 0.75)} />
        </g>
      ) : null}
    </g>
  );
};

// 9) Kendini affet — kalp ve ikinci sınav
const Forgive: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.45);
  return (
    <g>
      <Paper />
      <Bust x={250} y={560} scale={1} shirt={PURPLE} mood="happy" delay={2} />
      <Heart x={250} y={495} size={1.1} color={PINK} beat delay={8} />
      <Speech x={300} y={95} w={380} lines={["OLDU BİR KERE,", "AFFETTİM!"]} size={34} delay={6} color={PINK} />
      <TaskPaper x={680} y={300} scale={1.2} title="2. SINAV" delay={d} />
      <g transform={place(730, 360, useAppear(d + 14))}>
        <circle r={46} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -22 0 L -6 18 L 24 -16" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Chip x={680} y={500} text="DAHA AZ ERTELEME" dark delay={d + 20} />
    </g>
  );
};

// 10) İlk küçük adım — merdiven
const FirstStep: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.4);
  const walk = useProgress(4, d);
  return (
    <g>
      <Paper />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={360 + i * 100} y={460 - i * 70} width={540 - i * 100} height={70} fill={i === 0 ? YEL : "#d9ceff"} stroke={OUTLINE} strokeWidth={5} />
      ))}
      <rect x={0} y={530} width={900} height={30} fill="#b9a6f5" />
      <Person x={interpolate(walk, [0, 1], [120, 400])} y={walk >= 1 ? 460 : 530} scale={0.9} shirt={TEAL} walking={walk < 1} walkSpeed={0} />
      <g transform={place(820, 90, useAppear(6))}>
        <path d="M 0 40 L 0 -40 L 50 -26 L 0 -12" fill={PINK} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      </g>
      <Speech x={250} y={110} w={420} lines={["İLK KÜÇÜK ADIM", "NE?"]} size={38} delay={8} color={PURPLE} />
      <Chip x={470} y={500} text="KİTABI AÇ!" dark delay={d + 6} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.2);
  return (
    <g>
      <Paper />
      <Bust x={200} y={560} scale={1.05} shirt={PURPLE} mood="happy" delay={2} />
      <Speech x={600} y={160} w={480} lines={["SEN EN ÇOK NEYİ", "ERTELİYORSUN?"]} size={40} delay={d} />
      <Clock x={560} y={390} r={62} spin={frame * 4} delay={d + 10} />
      <Phone x={720} y={390} scale={0.8} delay={d + 16} />
      <QuestionMark x={840} y={330} size={70} delay={d + 22} color={PINK} />
      <Chip x={640} y={510} text="YORUMLARA YAZ!" dark delay={d + 28} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  LastNight,
  Calendar,
  NotLazy,
  Feelings,
  Escape,
  FutureSelf,
  BrainScan,
  Semester,
  Forgive,
  FirstStep,
  YourTurn,
};
