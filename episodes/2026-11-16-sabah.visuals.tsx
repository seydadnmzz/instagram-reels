// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Midenin guruldaması / borborigmus (2026-11-16-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  Chip,
  INK,
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
const PAPER = "#e8f8f6";
const SKIN = "#f2c79a";
const TEAL = "#17c3a5";
const BLUE = "#0f8fb3";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff9a3d";
const GUT = "#f7a8b4";
const GUT_DARK = "#e98597";

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


// Ses dalgaları (yaylar); (x,y) kaynak, dir 1 sağa / -1 sola
const SoundWaves: React.FC<{ x: number; y: number; dir?: number; strength?: number; color?: string }> = ({ x, y, dir = 1, strength = 1, color = ORANGE }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`} opacity={strength}>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 8) % 24) / 24;
        const r = 20 + t * 60 * strength + i * 4;
        return <path key={i} d={`M ${r * 0.6} ${-r} Q ${r * 1.3} 0 ${r * 0.6} ${r}`} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" opacity={1 - t} />;
      })}
    </g>
  );
};

// "GURRR!" yazısı, titreyerek
const Grr: React.FC<{ x: number; y: number; size?: number; delay?: number; rotate?: number }> = ({ x, y, size = 80, delay = 0, rotate = -8 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const shake = Math.sin(frame * 2.3) * 4;
  return (
    <text
      transform={place(x + shake, y, a, rotate)}
      fontFamily={uiFont}
      fontWeight={800}
      fontSize={size}
      textAnchor="middle"
      fill={ORANGE}
      stroke={OUTLINE}
      strokeWidth={size * 0.07}
      paintOrder="stroke"
    >
      GURRR!
    </text>
  );
};

// Mide şekli (J biçimli kese); (0,0) merkez
const STOMACH_D =
  "M -40 -120 Q -30 -150 0 -140 Q 20 -132 14 -100 Q 8 -70 40 -60 Q 110 -40 110 30 Q 108 110 20 120 Q -60 126 -100 70 Q -130 20 -90 -20 Q -60 -50 -50 -90 Z";
const Stomach: React.FC<{ x: number; y: number; scale?: number; fill?: number; face?: "happy" | "wow" | "none"; delay?: number; id: string }> = ({
  x,
  y,
  scale = 1,
  fill = 0,
  face = "happy",
  delay = 0,
  id,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const blink = frame % 80 > 76 ? 0.15 : 1;
  return (
    <g transform={place(x, y, scale * a)}>
      <clipPath id={id}>
        <path d={STOMACH_D} />
      </clipPath>
      <path d={STOMACH_D} fill={GUT} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      {fill > 0 ? (
        <g clipPath={`url(#${id})`}>
          <rect x={-140} y={125 - fill * 230} width={280} height={fill * 230} fill="#f4c76b" />
          {[[-60, 80], [-10, 95], [40, 70], [-40, 40], [60, 100], [10, 40]].map(([cx, cy], i) =>
            cy > 125 - fill * 230 ? <circle key={i} cx={cx} cy={cy} r={14} fill="#e0a43c" stroke={OUTLINE} strokeWidth={3} /> : null,
          )}
        </g>
      ) : null}
      <path d={STOMACH_D} fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      {face !== "none" ? (
        <g>
          {face === "happy" ? (
            <g transform={`translate(0 ${10 * (1 - blink)}) scale(1 ${blink})`}>
              <circle cx={-30} cy={10} r={8} fill={OUTLINE} />
              <circle cx={30} cy={10} r={8} fill={OUTLINE} />
            </g>
          ) : (
            <g>
              <circle cx={-30} cy={10} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
              <circle cx={30} cy={10} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
              <circle cx={-30} cy={12} r={6} fill={OUTLINE} />
              <circle cx={30} cy={12} r={6} fill={OUTLINE} />
            </g>
          )}
          {face === "happy" ? (
            <path d="M -18 40 Q 0 56 18 40" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          ) : (
            <ellipse cx={0} cy={46} rx={12} ry={15} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
          )}
          <circle cx={-56} cy={34} r={9} fill="#ff7f9a" opacity={0.6} />
          <circle cx={56} cy={34} r={9} fill="#ff7f9a" opacity={0.6} />
        </g>
      ) : null}
    </g>
  );
};

// Yatay bağırsak borusu; squeezeX konumunda daralma
const Tube: React.FC<{ y: number; x0?: number; x1?: number; h?: number; squeezeX?: number }> = ({ y, x0 = 60, x1 = 840, h = 120, squeezeX }) => {
  const steps = 60;
  const top: string[] = [];
  const bot: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const pinch = squeezeX === undefined ? 0 : Math.exp(-(((x - squeezeX) / 40) ** 2)) * 0.62;
    const half = (h / 2) * (1 - pinch);
    top.push(`${i ? "L" : "M"} ${x.toFixed(1)} ${(y - half).toFixed(1)}`);
    bot.unshift(`L ${x.toFixed(1)} ${(y + half).toFixed(1)}`);
  }
  return <path d={`${top.join(" ")} ${bot.join(" ")} Z`} fill={GUT} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />;
};

// 1) Sessiz sınıf… GURRR!
const QuietRoom: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const g = Math.round(durationInFrames * 0.22);
  const turned = frame > g + 6;
  return (
    <g>
      <Paper />
      <rect x={60} y={40} width={300} height={150} rx={8} fill="#2f6b5e" stroke={OUTLINE} strokeWidth={6} />
      <text x={210} y={128} fontFamily={uiFont} fontWeight={800} fontSize={42} textAnchor="middle" fill="#fff" opacity={0.9}>
        SESSİZ!
      </text>
      <circle cx={760} cy={100} r={56} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <line x1={760} y1={100} x2={760} y2={62} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <line x1={760} y1={100} x2={760 + 30 * Math.cos(frame / 20)} y2={100 + 30 * Math.sin(frame / 20)} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <Bust x={170} y={470} scale={0.62} mood={turned ? "wow" : "closed"} shirt={BLUE} hair="#1f1f24" />
      <Bust x={730} y={470} scale={0.62} mood={turned ? "wow" : "closed"} shirt={PURPLE} hair="#c9822f" />
      <Bust x={450} y={500} scale={0.85} mood={turned ? "wow" : "calm"} shirt={ORANGE} />
      {/* sıralar */}
      {[170, 450, 730].map((x, i) => (
        <rect key={i} x={x - (i === 1 ? 150 : 120)} y={i === 1 ? 440 : 410} width={i === 1 ? 300 : 240} height={26} rx={6} fill="#c98a4b" stroke={OUTLINE} strokeWidth={5} />
      ))}
      <rect y={500} width={900} height={60} fill="#c8ebe5" stroke={OUTLINE} strokeWidth={5} />
      {frame > g ? (
        <g>
          <SoundWaves x={520} y={430} dir={1} />
          <SoundWaves x={380} y={430} dir={-1} />
          <Grr x={450} y={235} size={86} delay={g} />
          <Sparkles points={[[290, 200], [620, 190]]} />
        </g>
      ) : null}
    </g>
  );
};

// 2) Adı: borborigmus
const GreekWord: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const w = useWave(50, 3);
  return (
    <g>
      <Paper />
      <g transform={place(450, 230, useAppear(2), w)}>
        <rect x={-340} y={-110} width={680} height={220} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text y={10} fontFamily={uiFont} fontWeight={800} fontSize={86} textAnchor="middle" fill={BLUE}>
          BORBORİGMUS
        </text>
        <text y={70} fontFamily={uiFont} fontWeight={700} fontSize={30} textAnchor="middle" fill={INK} opacity={0.7}>
          bor · bo · rig · mus
        </text>
      </g>
      <Stomach id="gw" x={130} y={450} scale={0.6} face="wow" delay={d} />
      <SoundWaves x={200} y={440} />
      <Chip x={560} y={470} text="SESİN TAKLİDİ" delay={d + 12} />
    </g>
  );
};

// 3) Kaslar sıkışıp sıvı ve gazı itiyor
const GutSqueeze: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const sx = 60 + ((frame * 5) % 900);
  return (
    <g>
      <Paper />
      <Tube y={250} squeezeX={sx} h={150} />
      {Array.from({ length: 7 }).map((_, i) => {
        const base = 100 + i * 110;
        const ahead = base > sx ? Math.max(0, 40 - (base - sx)) : 0;
        const x = ((base + ahead + frame * 1.5) % 780) + 70;
        const isGas = i % 2 === 0;
        return isGas ? (
          <circle key={i} cx={x} cy={225} r={18} fill="#fff" stroke={OUTLINE} strokeWidth={4} opacity={0.95} />
        ) : (
          <ellipse key={i} cx={x} cy={280} rx={26} ry={14} fill="#7ec8e3" stroke={OUTLINE} strokeWidth={4} />
        );
      })}
      <Arrow from={[300, 380]} to={[600, 380]} progress={useProgress(8, 30)} color={PURPLE} />
      <Chip x={250} y={480} text="SIVI" delay={Math.round(durationInFrames * 0.3)} />
      <Chip x={450} y={480} text="+ GAZ" dark delay={Math.round(durationInFrames * 0.38)} />
      <Chip x={680} y={480} text="İTİLİYOR" delay={Math.round(durationInFrames * 0.46)} />
    </g>
  );
};

// Gövde içi: mide + kıvrımlı ince bağırsak
const WhereFrom: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const glow = useProgress(d, d + 15);
  return (
    <g>
      <Paper />
      {/* gövde */}
      <path d="M 300 560 L 310 200 Q 320 130 450 125 Q 580 130 590 200 L 600 560 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={450} cy={70} r={60} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <Stomach id="wf" x={480} y={240} scale={0.48} face="none" delay={2} />
      <g>
        {[0, 1, 2].map((r) => (
          <path
            key={r}
            d={`M ${360} ${330 + r * 55} Q 450 ${300 + r * 55} 540 ${330 + r * 55} Q 450 ${360 + r * 55} 360 ${330 + r * 55}`}
            fill="none"
            stroke={glow > 0.5 ? GUT_DARK : GUT}
            strokeWidth={26}
            strokeLinecap="round"
          />
        ))}
        {[0, 1, 2].map((r) => (
          <path
            key={`o${r}`}
            d={`M ${360} ${330 + r * 55} Q 450 ${300 + r * 55} 540 ${330 + r * 55}`}
            fill="none"
            stroke={OUTLINE}
            strokeWidth={3}
            opacity={0.5}
          />
        ))}
      </g>
      {glow > 0 ? <SoundWaves x={560} y={390} strength={glow} /> : null}
      {glow > 0 ? <SoundWaves x={340} y={390} dir={-1} strength={glow} /> : null}
      <Chip x={160} y={240} text="MİDE" delay={6} />
      <Arrow from={[220, 240]} to={[400, 240]} progress={useProgress(8, 22)} color={INK} />
      <Chip x={750} y={430} text="İNCE BAĞIRSAK" dark delay={d} />
      <Sparkles points={[[620, 330], [280, 330]]} />
    </g>
  );
};

// 5) Tok vs aç
const EmptyLoud: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const loud = useProgress(d, d + 20);
  return (
    <g>
      <Paper />
      <Stomach id="full" x={240} y={250} scale={1} fill={0.75} face="happy" delay={2} />
      <Stomach id="empty" x={660} y={250} scale={1} fill={0} face="wow" delay={8} />
      <SoundWaves x={330} y={250} strength={0.35} color={BLUE} />
      {loud > 0 ? <SoundWaves x={770} y={250} strength={1} /> : null}
      {loud > 0 ? <SoundWaves x={550} y={250} dir={-1} strength={1} /> : null}
      {loud > 0 ? <Grr x={660} y={80} size={60} delay={d} rotate={6} /> : null}
      <Chip x={240} y={470} text="TOK: SESSİZ" delay={10} />
      <Chip x={660} y={470} text="AÇ: GÜRÜLTÜLÜ" dark delay={d} />
    </g>
  );
};

// 6) ~2 saat sonra temizlik dalgası
const TwoHours: Visual = ({ durationInFrames }) => {
  const spin = useProgress(6, durationInFrames * 0.6);
  const ang = spin * 720;
  const empty = 0.8 - spin * 0.8;
  const done = useAppear(Math.round(durationInFrames * 0.62));
  return (
    <g>
      <Paper />
      <g transform={place(250, 260)}>
        <circle r={150} fill="#fff" stroke={OUTLINE} strokeWidth={8} />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={0} y1={-130} x2={0} y2={-114} stroke={OUTLINE} strokeWidth={6} transform={`rotate(${i * 30})`} />
        ))}
        <line x1={0} y1={0} x2={0} y2={-110} stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" transform={`rotate(${ang})`} />
        <line x1={0} y1={0} x2={0} y2={-70} stroke={OUTLINE} strokeWidth={10} strokeLinecap="round" transform={`rotate(${ang / 12})`} />
        <circle r={12} fill={OUTLINE} />
      </g>
      <Stomach id="th" x={650} y={230} scale={0.9} fill={empty} face={spin > 0.9 ? "wow" : "happy"} delay={4} />
      <g transform={place(650, 470, done)}>
        <rect x={-190} y={-34} width={380} height={68} rx={34} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
        <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill="#fff">
          TEMİZLİK BAŞLIYOR
        </text>
      </g>
      <Chip x={250} y={480} text="~2 SAAT" dark delay={10} />
    </g>
  );
};

// 7) Dalga kırıntıları süpürüyor
const Sweeper: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const p = useProgress(4, durationInFrames * 0.85);
  const sx = 100 + p * 700;
  const crumbs = [180, 260, 330, 420, 500, 580, 650, 720];
  return (
    <g>
      <Paper />
      <Tube y={270} squeezeX={sx} h={170} />
      {crumbs.map((cx, i) => {
        const pushed = sx > cx - 30;
        const x = pushed ? sx + 30 + (i % 3) * 14 : cx;
        return (
          <path
            key={i}
            transform={place(Math.min(x, 820), 300 - (i % 3) * 22, 1, frame * (pushed ? 6 : 0))}
            d="M -10 -8 L 9 -10 L 12 6 L -6 11 Z"
            fill="#c9822f"
            stroke={OUTLINE}
            strokeWidth={3}
          />
        );
      })}
      {/* süpürge */}
      <g transform={place(sx - 40, 150, 1, -20 + Math.sin(frame / 3) * 10)}>
        <rect x={-6} y={-90} width={12} height={110} rx={6} fill="#a86b3c" stroke={OUTLINE} strokeWidth={4} />
        <path d="M -30 20 L 30 20 L 40 60 L -40 60 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      </g>
      <Chip x={250} y={470} text="MİDE" delay={6} />
      <Chip x={640} y={470} text="BAĞIRSAĞIN SONU" dark delay={12} />
    </g>
  );
};

// 8) Her 1–2 saatte tekrar; yiyince durur
const RepeatCycle: Visual = ({ durationInFrames }) => {
  const draw = useProgress(4, durationInFrames * 0.6);
  const eat = useAppear(Math.round(durationInFrames * 0.6));
  const x0 = 90;
  const x1 = 820;
  const y0 = 300;
  const n = 120;
  const pts: string[] = [];
  const end = Math.round(draw * n);
  for (let i = 0; i <= end; i++) {
    const t = i / n;
    const x = x0 + (x1 - x0) * t;
    const phase = (t * 3.2) % 1;
    const burst = t < 0.78 && phase > 0.55 && phase < 0.8 ? Math.sin(((phase - 0.55) / 0.25) * Math.PI * 6) * 90 : 0;
    pts.push(`${i ? "L" : "M"} ${x.toFixed(1)} ${(y0 - burst).toFixed(1)}`);
  }
  return (
    <g>
      <Paper />
      <line x1={x0} y1={y0} x2={x1} y2={y0} stroke="#9fd9cf" strokeWidth={4} strokeDasharray="12 10" />
      <path d={pts.join(" ")} fill="none" stroke={PINK} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />
      {[0.2, 0.51].map((t, i) => (
        <text key={i} x={x0 + (x1 - x0) * (t + 0.1)} y={140} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill={ORANGE} stroke={OUTLINE} strokeWidth={3} paintOrder="stroke" opacity={draw > t + 0.15 ? 1 : 0}>
          GURRR
        </text>
      ))}
      {/* sandviç */}
      <g transform={place(740, 210, eat)}>
        <path d="M -60 0 Q 0 -50 60 0 Z" fill="#e8b46a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <rect x={-62} y={0} width={124} height={12} fill="#7bc96f" stroke={OUTLINE} strokeWidth={4} />
        <rect x={-58} y={12} width={116} height={12} fill="#e2574c" stroke={OUTLINE} strokeWidth={4} />
        <rect x={-60} y={24} width={120} height={18} rx={8} fill="#e8b46a" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Chip x={300} y={450} text="HER 1–2 SAATTE" delay={8} />
      <Chip x={680} y={450} text="YİYİNCE DURUR" dark delay={Math.round(durationInFrames * 0.65)} />
    </g>
  );
};

// 9) Açlık puanı iki katından fazla
const HungerMeter: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.25);
  const up = useProgress(d, d + 40);
  const v = Math.round(29 + up * 33);
  const h = 300;
  return (
    <g>
      <Paper />
      <Bust x={260} y={540} scale={0.95} mood={up > 0.6 ? "wow" : "calm"} shirt={TEAL} />
      {up > 0.6 ? <SoundWaves x={330} y={470} strength={0.8} /> : null}
      <g transform={place(640, 470)}>
        <rect x={-60} y={-h} width={120} height={h} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-50} y={-(v / 100) * h + 10} width={100} height={(v / 100) * h - 20} rx={14} fill={up > 0.6 ? RED : ORANGE} />
        <line x1={-80} y1={-(29 / 100) * h} x2={80} y2={-(29 / 100) * h} stroke={OUTLINE} strokeWidth={4} strokeDasharray="10 8" />
        <text x={0} y={-h - 30} fontFamily={uiFont} fontWeight={800} fontSize={64} textAnchor="middle" fill={INK}>
          {v}
        </text>
      </g>
      <text x={790} y={250} fontFamily={uiFont} fontWeight={800} fontSize={60} textAnchor="middle" fill={RED} stroke={OUTLINE} strokeWidth={3} paintOrder="stroke" opacity={up > 0.9 ? 1 : 0} transform={`rotate(${Math.sin(frame / 6) * 4} 790 250)`}>
        ×2+
      </text>
      <Chip x={640} y={520} text="AÇLIK PUANI" dark delay={6} />
    </g>
  );
};

// 10) Çoğu zaman normal; ağrı/şişlik varsa doktor
const NormalCheck: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.45);
  const check = useProgress(6, 24);
  return (
    <g>
      <Paper />
      <Stomach id="nc" x={250} y={260} scale={1.15} face="happy" delay={2} />
      <path
        d="M 380 120 L 420 160 L 500 70"
        fill="none"
        stroke={TEAL}
        strokeWidth={22}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={260}
        strokeDashoffset={260 * (1 - check)}
      />
      <Chip x={660} y={170} text="ÇOĞU ZAMAN NORMAL" delay={10} />
      <g transform={place(660, 330, useAppear(d))}>
        <rect x={-210} y={-70} width={420} height={140} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text y={-14} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={RED}>
          AĞRI / ŞİŞLİK?
        </text>
        <text y={40} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={INK}>
          → DOKTORA DANIŞ
        </text>
      </g>
    </g>
  );
};

// 11) Sende nerede?
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const w = useWave(40, 4);
  const items = ["SINAVDA", "TOPLANTIDA", "SİNEMADA"];
  return (
    <g>
      <Paper />
      <Bust x={190} y={540} scale={0.9} mood="happy" shirt={ORANGE} />
      <SoundWaves x={260} y={480} strength={0.6} />
      {items.map((c, i) => (
        <g key={i} transform={place(610, 90 + i * 115, useAppear(d + i * 8), i % 2 ? w : -w)}>
          <rect x={-200} y={-42} width={400} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={[BLUE, PINK, PURPLE][i]}>
            {c}?
          </text>
        </g>
      ))}
      <QuestionMark x={340} y={220} size={80} delay={d + 26} />
      <Chip x={610} y={480} text="YORUMLARA YAZ!" dark delay={d + 32} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  QuietRoom,
  GreekWord,
  GutSqueeze,
  WhereFrom,
  EmptyLoud,
  TwoHours,
  Sweeper,
  RepeatCycle,
  HungerMeter,
  NormalCheck,
  YourTurn,
};
