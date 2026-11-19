// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Bebek dili / bebek ya da yavru köpek görünce sesin incelmesi (2026-11-19-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  Chip,
  Heart,
  NamePlate,
  place,
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
const PAPER = "#fff0f4";
const SKIN = "#f2c79a";
const TEAL = "#17c3a5";
const BLUE = "#3a8fe0";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff8a2b";
const DOG = "#d9a066";
const DOG_DARK = "#a8703a";
const GREY = "#b9b2aa";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

type Mood = "calm" | "squint" | "sneeze" | "closed" | "happy" | "wow" | "dizzy" | "talk";

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
        {mood === "talk" ? <ellipse cx={0} cy={-162} rx={18} ry={6 + Math.abs(Math.sin(frame / 3)) * 12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
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

// Uçuşan müzik notaları (sesin şarkıya dönmesi); (x,y) çıkış noktası, notalar verilen yöne süzülür
const Notes: React.FC<{ x: number; y: number; dir?: number; color?: string; delay?: number; count?: number; scale?: number }> = ({
  x,
  y,
  dir = 1,
  color = PINK,
  delay = 0,
  count = 3,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  if (frame < delay) return null;
  return (
    <g transform={place(x, y, scale)}>
      {Array.from({ length: count }).map((_, i) => {
        const p = ((t + i * 18) % 54) / 54;
        const nx = dir * p * 150;
        const ny = -p * 90 + Math.sin(p * 9 + i) * 14;
        return (
          <g key={i} transform={place(nx, ny, 0.6 + p * 0.5, Math.sin(p * 6) * 14)} opacity={1 - p * 0.7}>
            <ellipse cx={-6} cy={8} rx={12} ry={9} fill={i % 2 ? PURPLE : color} stroke={OUTLINE} strokeWidth={3} transform="rotate(-20 -6 8)" />
            <path d="M 4 6 L 4 -30 Q 18 -24 22 -12" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
};

// Bebek (yüz + battaniye); (0,0) kafa merkezi, kafa yarıçapı 58
const Baby: React.FC<{ x: number; y: number; scale?: number; mood?: "happy" | "wow" | "sleepy"; delay?: number; turn?: number }> = ({
  x,
  y,
  scale = 1,
  mood = "happy",
  delay = 0,
  turn = 0,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const bob = Math.sin(frame / 10) * 3;
  return (
    <g transform={place(x, y + bob, scale * a, turn)}>
      {/* Battaniye */}
      <path d="M -80 40 Q -90 130 0 132 Q 90 130 80 40 Q 0 20 -80 40 Z" fill="#ffd1dc" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -60 70 Q 0 90 60 70" fill="none" stroke={PINK} strokeWidth={5} strokeLinecap="round" />
      {/* Kulaklar */}
      <circle cx={-58} cy={2} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={58} cy={2} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={0} cy={0} r={58} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      {/* Perçem */}
      <path d="M -6 -56 Q -2 -80 16 -74 Q 2 -70 6 -56" fill="#7a4a22" stroke={OUTLINE} strokeWidth={3} />
      {mood === "sleepy" ? (
        <g fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round">
          <path d="M -30 -4 Q -20 4 -10 -4" />
          <path d="M 10 -4 Q 20 4 30 -4" />
        </g>
      ) : (
        <g>
          <circle cx={-20} cy={-4} r={mood === "wow" ? 11 : 8} fill={OUTLINE} />
          <circle cx={20} cy={-4} r={mood === "wow" ? 11 : 8} fill={OUTLINE} />
          <circle cx={-17} cy={-7} r={3} fill="#fff" />
          <circle cx={23} cy={-7} r={3} fill="#fff" />
        </g>
      )}
      {mood === "wow" ? (
        <ellipse cx={0} cy={26} rx={10} ry={12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
      ) : (
        <path d="M -16 20 Q 0 36 16 20" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      )}
      <circle cx={-36} cy={16} r={9} fill="#f59ab0" opacity={0.8} />
      <circle cx={36} cy={16} r={9} fill="#f59ab0" opacity={0.8} />
    </g>
  );
};

// Köpek (yandan, sağa bakar); (0,0) ayakların ortası. puppy: iri kafa, kısa bacak.
const Dog: React.FC<{
  x: number;
  y: number;
  scale?: number;
  puppy?: boolean;
  running?: boolean;
  lying?: boolean;
  flip?: boolean;
  delay?: number;
}> = ({ x, y, scale = 1, puppy = false, running = false, lying = false, flip = false, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const wag = Math.sin(frame / (puppy ? 2.5 : 8)) * (puppy ? 25 : 8);
  const leg = running ? Math.sin(frame / 2.5) * 22 : 0;
  const hop = running ? -Math.abs(Math.sin(frame / 2.5)) * 10 : 0;
  const head = puppy ? 46 : 40;
  const body = puppy ? { rx: 62, ry: 36 } : { rx: 95, ry: 42 };
  const legH = lying ? 0 : puppy ? 34 : 60;
  const by = -legH - body.ry + (lying ? 10 : 0);
  const hx = body.rx * 0.85;
  const hy = by - body.ry * (puppy ? 0.9 : 1.1);
  return (
    <g transform={`${place(x, y + hop, scale * a)} scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx={0} cy={2} rx={body.rx + 10} ry={8} fill="rgba(0,0,0,0.15)" />
      {/* Kuyruk */}
      <path
        transform={`rotate(${lying ? 20 : wag} ${-body.rx + 6} ${by - 10})`}
        d={`M ${-body.rx + 6} ${by - 10} Q ${-body.rx - 40} ${by - 40} ${-body.rx - 30} ${by - 70}`}
        fill="none"
        stroke={OUTLINE}
        strokeWidth={16}
        strokeLinecap="round"
      />
      <path
        transform={`rotate(${lying ? 20 : wag} ${-body.rx + 6} ${by - 10})`}
        d={`M ${-body.rx + 6} ${by - 10} Q ${-body.rx - 40} ${by - 40} ${-body.rx - 30} ${by - 70}`}
        fill="none"
        stroke={DOG}
        strokeWidth={8}
        strokeLinecap="round"
      />
      {/* Bacaklar */}
      {!lying
        ? [-body.rx * 0.6, -body.rx * 0.3, body.rx * 0.35, body.rx * 0.62].map((lx, i) => (
            <rect
              key={i}
              x={lx - 10}
              y={by + body.ry - 14}
              width={20}
              height={legH + 14}
              rx={9}
              fill={i % 2 ? DOG_DARK : DOG}
              stroke={OUTLINE}
              strokeWidth={4}
              transform={`rotate(${i % 2 ? leg : -leg} ${lx} ${by + body.ry - 10})`}
            />
          ))
        : null}
      <ellipse cx={0} cy={by} rx={body.rx} ry={body.ry} fill={DOG} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={-body.rx * 0.2} cy={by - 8} rx={body.rx * 0.35} ry={body.ry * 0.45} fill={DOG_DARK} opacity={0.5} />
      {/* Kafa */}
      <g transform={`translate(${hx} ${hy})`}>
        <path d={`M ${-head * 0.7} ${-head * 0.4} Q ${-head * 1.2} ${head * 0.3} ${-head * 0.75} ${head * 0.85} Q ${-head * 0.4} ${head * 0.4} ${-head * 0.3} ${-head * 0.6} Z`} fill={DOG_DARK} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={0} cy={0} r={head} fill={DOG} stroke={OUTLINE} strokeWidth={5} />
        <ellipse cx={head * 0.75} cy={head * 0.25} rx={head * 0.5} ry={head * 0.38} fill="#f0c48e" stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={head * 1.15} cy={head * 0.1} rx={9} ry={7} fill={OUTLINE} />
        {lying && !puppy ? (
          <path d={`M ${head * 0.05} ${-head * 0.15} q 10 8 20 0`} fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        ) : (
          <g>
            <circle cx={head * 0.25} cy={-head * 0.2} r={puppy ? 10 : 7} fill={OUTLINE} />
            <circle cx={head * 0.25 + 3} cy={-head * 0.2 - 3} r={3} fill="#fff" />
          </g>
        )}
        {!lying ? <path d={`M ${head * 0.85} ${head * 0.55} q 6 22 -8 24 q -10 -4 -4 -22`} fill={PINK} stroke={OUTLINE} strokeWidth={3} /> : null}
      </g>
    </g>
  );
};

// Ses dalgası (yatay); high=true ise ince, sık ve iniş çıkışlı
const VoiceWave: React.FC<{ x: number; y: number; w: number; high?: boolean; color?: string; progress?: number }> = ({
  x,
  y,
  w,
  high = false,
  color = BLUE,
  progress = 1,
}) => {
  const frame = useCurrentFrame();
  const pts: string[] = [];
  const n = 60;
  for (let i = 0; i <= n * progress; i++) {
    const px = (i / n) * w;
    const amp = high ? 26 + 22 * Math.sin(i / 7 + frame / 10) : 16;
    const freq = high ? 1.3 : 0.55;
    pts.push(`${px},${Math.sin(i * freq + frame / 3) * amp}`);
  }
  if (pts.length < 2) return null;
  return (
    <g transform={`translate(${x} ${y})`}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

// Bebek arabası; (0,0) tekerleklerin ortası, üstte bebek oturur (kafa: (10,-170))
const Stroller: React.FC<{ x: number; y: number; scale?: number; children?: React.ReactNode }> = ({ x, y, scale = 1, children }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y, scale)}>
      <path d="M 90 -120 L 130 -200 L 160 -200" fill="none" stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
      <path d="M -110 -130 Q -110 -250 10 -250 L 10 -130 Z" fill={PINK} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      {children}
      <path d="M -110 -130 Q -110 -30 0 -30 L 100 -30 Q 110 -80 100 -130 Z" fill={PURPLE} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      {[-70, 70].map((cx) => (
        <g key={cx} transform={`rotate(${frame * 2} ${cx} 0)`}>
          <circle cx={cx} cy={0} r={28} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
          <path d={`M ${cx - 20} 0 L ${cx + 20} 0 M ${cx} -20 L ${cx} 20`} stroke={OUTLINE} strokeWidth={3} />
        </g>
      ))}
    </g>
  );
};

// Konuşma balonu; (0,0) merkez, kuyruk sola-aşağı ya da sağa-aşağı
const Speech: React.FC<{ x: number; y: number; w: number; h: number; tail?: "left" | "right"; delay?: number; children?: React.ReactNode }> = ({
  x,
  y,
  w,
  h,
  tail = "left",
  delay = 0,
  children,
}) => {
  const a = useAppear(delay);
  const s = tail === "left" ? -1 : 1;
  return (
    <g transform={place(x, y, a)}>
      <path d={`M ${s * w * 0.2} ${h / 2 - 4} L ${s * w * 0.42} ${h / 2 + 40} L ${s * w * 0.02} ${h / 2 - 4} Z`} fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={s * w * 0.06 - 12} y={h / 2 - 8} width={s * w * 0.12 + 24} height={12} fill="#fff" />
      {children}
    </g>
  );
};

// 1) Bebek görünce ses inceliyor
const BabyMeet: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  return (
    <g>
      <Paper />
      <rect x={0} y={470} width={900} height={90} fill="#ffd9e3" />
      <Bust x={200} y={560} scale={0.95} mood="talk" shirt={TEAL} />
      <Stroller x={680} y={480} scale={0.95}>
        <Baby x={45} y={-165} scale={0.75} mood="happy" delay={2} />
      </Stroller>
      <Speech x={420} y={110} w={300} h={110} tail="left" delay={d}>
        <text x={0} y={16} fontFamily={uiFont} fontWeight={800} fontSize={48} textAnchor="middle" fill={PINK}>
          CİCİ BEBEK!
        </text>
      </Speech>
      <Notes x={300} y={300} delay={d + 6} count={4} />
      <Sparkles points={[[560, 170], [800, 150], [600, 60]]} />
    </g>
  );
};

// 2) Bunun adı bebek dili
const BabyTalkName: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.45);
  const w = useWave(30, 3);
  return (
    <g>
      <Paper />
      <Bust x={170} y={560} scale={0.85} mood="talk" shirt={ORANGE} hair="#2f2f2f" />
      <Notes x={250} y={330} delay={4} />
      <Baby x={730} y={330} scale={1.05} mood="wow" delay={4} />
      <g transform={place(450, 150, useAppear(6), w)}>
        <rect x={-210} y={-62} width={420} height={124} rx={30} fill={PINK} stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={22} fontFamily={uiFont} fontWeight={800} fontSize={64} textAnchor="middle" fill="#fff" stroke={OUTLINE} strokeWidth={3} paintOrder="stroke">
          BEBEK DİLİ
        </text>
      </g>
      <NamePlate x={450} y={290} text="BEBEĞE YÖNELİK KONUŞMA" delay={d} />
    </g>
  );
};

// 3) Ne değişiyor? Normal ses ve bebek sesi grafiği
const PitchLine: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const p1 = useProgress(4, 4 + d);
  const p2 = useProgress(d, d * 2);
  return (
    <g>
      <Paper />
      <rect x={60} y={50} width={780} height={460} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <line x1={130} y1={90} x2={130} y2={470} stroke={OUTLINE} strokeWidth={5} />
      <text x={110} y={110} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="end" fill={OUTLINE}>
        İNCE
      </text>
      <text x={110} y={470} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="end" fill={OUTLINE}>
        KALIN
      </text>
      <VoiceWave x={150} y={390} w={600} color={GREY} progress={p1} />
      <VoiceWave x={150} y={190} w={600} high color={PINK} progress={p2} />
      <Chip x={460} y={460} text="YETİŞKİNE" dark delay={6} />
      <Chip x={460} y={100} text="BEBEĞE" delay={d} />
      <Arrow from={[790, 380]} to={[790, 230]} progress={useProgress(d + 10, d + 24)} color={PINK} />
    </g>
  );
};

// 4) 21 toplum, altı kıta
const WorldMap: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const span = durationInFrames * 0.6;
  const dots: [number, number][] = [
    [190, 190], [230, 230], [170, 260], [260, 330], [290, 390], [420, 170], [450, 200], [470, 160],
    [440, 290], [480, 340], [460, 400], [520, 300], [600, 180], [640, 220], [690, 200], [720, 260],
    [660, 300], [740, 330], [700, 420], [760, 420], [560, 240],
  ];
  return (
    <g>
      <Paper fill="#e9f6ff" />
      {/* Kıtalar (basit lekeler) */}
      <g fill="#9ad97a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round">
        <path d="M 120 150 Q 200 100 300 140 Q 320 220 250 260 Q 220 300 180 290 Q 120 240 120 150 Z" />
        <path d="M 240 300 Q 300 300 320 360 Q 300 450 270 470 Q 240 400 240 300 Z" />
        <path d="M 400 140 Q 470 110 520 150 Q 500 200 440 210 Q 400 190 400 140 Z" />
        <path d="M 410 240 Q 500 230 530 290 Q 520 380 470 440 Q 420 380 410 240 Z" />
        <path d="M 540 150 Q 680 110 780 170 Q 790 260 700 300 Q 600 290 560 240 Q 530 190 540 150 Z" />
        <path d="M 680 390 Q 750 370 790 410 Q 770 450 700 450 Q 670 430 680 390 Z" />
      </g>
      {dots.map(([x, y], i) => {
        const t = (i / dots.length) * span;
        const a = frame > t ? Math.min(1, (frame - t) / 6) : 0;
        return (
          <g key={i} transform={place(x, y, a)}>
            <circle r={13} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
          </g>
        );
      })}
      <g transform={place(450, 510, 1)}>
        <rect x={-150} y={-36} width={300} height={72} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={16} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={PINK}>
          {Math.min(21, Math.floor((frame / span) * 21) + (frame > 0 ? 1 : 0))} TOPLUM
        </text>
      </g>
    </g>
  );
};

// Kulaklıklı küçük dinleyici kafası; (0,0) yüz merkezi
const ListenerHead: React.FC<{ x: number; y: number; color: string; skin: string; ok: boolean; delay: number }> = ({ x, y, color, skin, ok, delay }) => {
  const a = useAppear(delay);
  const okA = useAppear(delay + 14);
  return (
    <g transform={place(x, y, a)}>
      <path d="M -38 0 Q -38 -48 0 -48 Q 38 -48 38 0" fill="none" stroke={OUTLINE} strokeWidth={7} />
      <circle cx={0} cy={0} r={32} fill={skin} stroke={OUTLINE} strokeWidth={4} />
      <rect x={-46} y={-14} width={16} height={30} rx={6} fill={color} stroke={OUTLINE} strokeWidth={3} />
      <rect x={30} y={-14} width={16} height={30} rx={6} fill={color} stroke={OUTLINE} strokeWidth={3} />
      <circle cx={-10} cy={-4} r={4} fill={OUTLINE} />
      <circle cx={10} cy={-4} r={4} fill={OUTLINE} />
      <path d="M -10 12 Q 0 20 10 12" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
      {ok ? (
        <g transform={place(30, -36, okA)}>
          <circle r={17} fill={TEAL} stroke={OUTLINE} strokeWidth={3} />
          <path d="M -8 0 L -2 7 L 9 -7" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
};

// 5) Dil bilmeden doğru tahmin
const Listeners: Visual = ({ durationInFrames }) => {
  const step = Math.max(2, Math.round((durationInFrames * 0.5) / 15));
  const skins = [SKIN, "#c98a5a", "#8d5a3a", "#f5d6b8", "#e0a878"];
  const cols = [PINK, BLUE, PURPLE, ORANGE, TEAL];
  return (
    <g>
      <Paper />
      {Array.from({ length: 15 }).map((_, i) => {
        const c = i % 5;
        const r = Math.floor(i / 5);
        return (
          <ListenerHead
            key={i}
            x={170 + c * 140}
            y={170 + r * 120}
            color={cols[(i + r) % 5]}
            skin={skins[(i * 2) % 5]}
            ok={i !== 7 && i !== 11}
            delay={i * step}
          />
        );
      })}
      <Chip x={450} y={60} text="50.000+ DİNLEYİCİ" dark delay={2} />
      <Chip x={450} y={510} text="187 ÜLKE" delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

// 6) Bebekler bu sesi daha çok dinliyor
const BabyListens: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.3);
  const turn = useProgress(d, d + 12) * 18;
  return (
    <g>
      <Paper />
      {/* Sol hoparlör: düz yetişkin sesi */}
      <g transform={place(140, 260, 1)}>
        <rect x={-60} y={-90} width={120} height={180} rx={18} fill={GREY} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={20} r={38} fill="#7d776f" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={-50} r={16} fill="#7d776f" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <VoiceWave x={210} y={150} w={140} color={GREY} />
      {/* Sağ hoparlör: bebek sesi */}
      <g transform={place(760, 260, 1 + Math.sin(frame / 3) * 0.03)}>
        <rect x={-60} y={-90} width={120} height={180} rx={18} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={20} r={38} fill="#ffb3c4" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={-50} r={16} fill="#ffb3c4" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Notes x={700} y={170} dir={-1} delay={4} />
      <Baby x={450} y={300} scale={1.1} mood="wow" turn={turn} delay={2} />
      <Heart x={560} y={170} size={0.6} delay={d + 14} />
      <Chip x={450} y={510} text="67 LABORATUVAR" dark delay={d + 8} />
    </g>
  );
};

// 7) İki yaşında daha çok kelime
const MoreWords: Visual = ({ durationInFrames }) => {
  const words = ["MAMA", "TOP", "KUŞ", "SU", "KEDİ", "ANNE", "BABA", "ARABA"];
  const step = Math.max(3, Math.round((durationInFrames * 0.6) / words.length));
  return (
    <g>
      <Paper />
      <Baby x={220} y={300} scale={1.2} mood="happy" delay={2} />
      <Chip x={220} y={510} text="2 YAŞ" delay={4} />
      {words.map((w, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <g key={w} transform={place(540 + col * 200, 90 + row * 110, useAppear(8 + i * step), (i % 3) - 1)}>
            <rect x={-85} y={-38} width={170} height={76} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
            <text x={0} y={13} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill={[PINK, BLUE, PURPLE, ORANGE][i % 4]}>
              {w}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// 8) Aynı sesi köpeklere de yapıyoruz; en incesi yavrulara
const DogTalk: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const g1 = useProgress(d, d + 15);
  const g2 = useProgress(d + 8, d + 23);
  return (
    <g>
      <Paper />
      <rect x={0} y={470} width={900} height={90} fill="#ffd9e3" />
      <Bust x={160} y={560} scale={0.85} mood="talk" shirt={PURPLE} hair="#8a4b2a" />
      <Notes x={240} y={320} delay={3} />
      <Dog x={480} y={480} scale={0.95} delay={4} />
      <Dog x={760} y={480} scale={1} puppy delay={10} />
      {/* Ses perdesi çubukları */}
      <rect x={455} y={180 - 70 * g1} width={50} height={70 * g1} fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
      <rect x={735} y={180 - 140 * g2} width={50} height={140 * g2} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
      <line x1={400} y1={180} x2={860} y2={180} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <Chip x={480} y={225} text="KÖPEK" dark delay={d} />
      <Chip x={760} y={225} text="YAVRU" delay={d + 8} />
    </g>
  );
};

// 9) Yavru koşuyor, yetişkin köpek umursamıyor
const PuppyRuns: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const run = useProgress(4, Math.round(durationInFrames * 0.7));
  return (
    <g>
      <Paper />
      <rect x={0} y={470} width={900} height={90} fill="#ffd9e3" />
      <Bust x={130} y={560} scale={0.8} mood="talk" shirt={TEAL} />
      <Notes x={200} y={330} delay={2} />
      <Dog x={700 - run * 360} y={480} scale={0.9} puppy running flip delay={0} />
      {/* Yatan yetişkin köpek */}
      <Dog x={700} y={490} scale={0.85} lying delay={6} />
      <g opacity={0.9}>
        {[0, 1, 2].map((i) => {
          const p = ((frame + i * 15) % 45) / 45;
          return (
            <text key={i} x={790 + p * 40} y={300 - p * 80} fontFamily={uiFont} fontWeight={800} fontSize={30 + i * 6} fill={PURPLE} opacity={1 - p}>
              Z
            </text>
          );
        })}
      </g>
      <Chip x={420} y={80} text="YAVRU: KOŞUYOR!" delay={8} />
      <Chip x={640} y={210} text="YETİŞKİN: UMURSAMIYOR" dark delay={Math.round(durationInFrames * 0.45)} />
    </g>
  );
};

// 10) Konuşamayan birinin dikkatini çekmek
const Attention: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const beam = useProgress(d, d + 12);
  return (
    <g>
      <Paper fill="#3a2a4a" />
      {/* Spot ışıkları */}
      <path d="M 260 0 L 120 480 L 380 480 Z" fill={YELLOW} opacity={0.25 * beam} />
      <path d="M 640 0 L 520 480 L 780 480 Z" fill={YELLOW} opacity={0.25 * beam} />
      <rect x={0} y={480} width={900} height={80} fill="#5a4470" />
      <Baby x={250} y={330} scale={1} mood="wow" delay={2} />
      <Dog x={650} y={485} scale={0.95} puppy delay={6} />
      <Notes x={450} y={120} dir={-1} delay={4} />
      <Notes x={450} y={120} dir={1} delay={10} />
      <Arrow from={[450, 200]} to={[340, 270]} progress={useProgress(d, d + 12)} color={PINK} />
      <Arrow from={[450, 200]} to={[570, 300]} progress={useProgress(d + 4, d + 16)} color={PINK} />
      <Chip x={450} y={60} text="BURAYA BAK!" delay={d + 6} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const w = useWave(40, 4);
  const items = ["BEBEĞE?", "KÖPEĞE?", "KEDİYE?"];
  return (
    <g>
      <Paper />
      <Bust x={190} y={540} scale={0.9} mood="talk" shirt={PINK} />
      <Notes x={260} y={300} delay={3} />
      {items.map((c, i) => (
        <g key={i} transform={place(620, 100 + i * 115, useAppear(d + i * 8), i % 2 ? w : -w)}>
          <rect x={-180} y={-42} width={360} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill={[PINK, ORANGE, PURPLE][i]}>
            {c}
          </text>
        </g>
      ))}
      <ThoughtBubble x={380} y={130} r={44} delay={d + 26}>
        <text x={0} y={14} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={OUTLINE}>
          ?
        </text>
      </ThoughtBubble>
      <Chip x={620} y={480} text="YORUMLARA YAZ!" dark delay={d + 32} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  BabyMeet,
  BabyTalkName,
  PitchLine,
  WorldMap,
  Listeners,
  BabyListens,
  MoreWords,
  DogTalk,
  PuppyRuns,
  Attention,
  YourTurn,
};
