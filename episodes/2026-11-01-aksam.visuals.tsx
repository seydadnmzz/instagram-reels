// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Déjà vu neden olur? (2026-11-01-aksam)
import { useCurrentFrame } from "remotion";
import {
  BigText,
  Brain,
  Chip,
  INK,
  Note,
  Person,
  place,
  QuestionMark,
  RED,
  Room,
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
const PAPER = "#f3efff";
const PURPLE = "#6a4cf5";
const MINT = "#3fcf9f";
const GREY = "#c9c4d8";
const PINK = "#f59ab0";

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    <rect y={470} width={900} height={90} fill="#e4dcff" />
    <line x1={0} y1={470} x2={900} y2={470} stroke="#cbbcff" strokeWidth={4} />
  </g>
);

// Omuzlarıyla birlikte baş; (x, y) omuzların alt ortası
const Head: React.FC<{
  x: number;
  y: number;
  scale?: number;
  talk?: boolean;
  sleepy?: boolean;
  goggles?: boolean;
  shirt?: string;
  hair?: string;
  delay?: number;
}> = ({ x, y, scale = 1, talk = false, sleepy = false, goggles = false, shirt = MINT, hair = "#4a2f1d", delay = 0 }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const blink = frame % 80 > 75 ? 0.15 : 1;
  const r = 70;
  const mouth = talk ? 0.5 + 0.5 * Math.abs(Math.sin(frame / 3.2)) : 0;
  return (
    <g transform={place(x, y, scale * appear)}>
      <path d="M -95 0 C -95 -70 -60 -95 0 -95 C 60 -95 95 -70 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-18} y={-112} width={36} height={26} fill="#f2c79a" stroke={OUTLINE} strokeWidth={4} />
      <g transform={`translate(0 ${-110 - r})`}>
        <circle cx={-r} cy={6} r={14} fill="#f2c79a" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={r} cy={6} r={14} fill="#f2c79a" stroke={OUTLINE} strokeWidth={4} />
        <circle r={r} fill="#f2c79a" stroke={OUTLINE} strokeWidth={5} />
        <path
          d={`M ${-r} -4 C ${-r - 6} ${-r - 10} ${r + 6} ${-r - 10} ${r} -4 C ${r * 0.5} -40 ${-r * 0.4} -44 ${-r} -4 Z`}
          fill={hair}
          stroke={OUTLINE}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {goggles ? (
          <g>
            <rect x={-78} y={-6} width={156} height={12} fill={OUTLINE} />
            <rect x={-60} y={-34} width={120} height={56} rx={16} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
            <rect x={-48} y={-24} width={96} height={14} rx={7} fill="#9b86ff" />
          </g>
        ) : sleepy ? (
          <g stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" fill="none">
            <path d="M -34 -6 Q -24 2 -14 -6" />
            <path d="M 14 -6 Q 24 2 34 -6" />
          </g>
        ) : (
          <g transform={`translate(0 ${-8 * (1 - blink)}) scale(1 ${blink})`}>
            <circle cx={-24} cy={-8} r={8} fill={OUTLINE} />
            <circle cx={24} cy={-8} r={8} fill={OUTLINE} />
          </g>
        )}
        <circle cx={-44} cy={20} r={10} fill={PINK} opacity={0.7} />
        <circle cx={44} cy={20} r={10} fill={PINK} opacity={0.7} />
        {talk ? (
          <ellipse cx={0} cy={32} rx={16} ry={4 + 14 * mouth} fill="#7a2335" stroke={OUTLINE} strokeWidth={4} />
        ) : sleepy ? (
          <ellipse cx={0} cy={34} rx={10} ry={8} fill="#7a2335" stroke={OUTLINE} strokeWidth={4} />
        ) : (
          <path d="M -14 28 Q 0 40 14 28" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};

// Bitki (saksıda)
const Plant: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = MINT }) => (
  <g transform={place(x, y, scale)}>
    <path d="M -26 0 L -20 -44 L 20 -44 L 26 0 Z" fill="#d9774e" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={0} cy={-80} r={34} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={-26} cy={-62} r={20} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={26} cy={-62} r={20} fill={color} stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// Heykel
const Statue: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <rect x={-30} y={-30} width={60} height={30} fill="#d8d2e8" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-14} y={-90} width={28} height={60} rx={10} fill="#eceaf3" stroke={OUTLINE} strokeWidth={4} />
    <circle cx={0} cy={-104} r={18} fill="#eceaf3" stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// Çalı / bank
const Bush: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <ellipse cx={0} cy={-22} rx={44} ry={26} fill="#2fa57e" stroke={OUTLINE} strokeWidth={4} />
  </g>
);
const Bench: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <rect x={-44} y={-30} width={88} height={14} rx={4} fill="#a77a4d" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-38} y={-16} width={10} height={16} fill={OUTLINE} />
    <rect x={28} y={-16} width={10} height={16} fill={OUTLINE} />
  </g>
);

// Küçük oda çerçevesi (sahne kartı)
const RoomCard: React.FC<{ x: number; y: number; w?: number; h?: number; label: string; kind: "avlu" | "muze"; scale?: number; faded?: boolean; delay?: number }> = ({
  x,
  y,
  w = 340,
  h = 260,
  label,
  kind,
  scale = 1,
  faded = false,
  delay = 0,
}) => {
  const appear = useAppear(delay);
  const floorY = h / 2 - 30;
  return (
    <g transform={place(x, y, scale * appear)} opacity={faded ? 0.55 : 1}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={kind === "avlu" ? "#dff3ff" : "#fff6e8"} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-w / 2 + 3} y={floorY} width={w - 6} height={h / 2 - floorY - 3} fill={kind === "avlu" ? "#bfe6b0" : "#e8cfae"} />
      {kind === "avlu" ? (
        <g>
          <Bush x={-110} y={floorY + 10} />
          <Plant x={0} y={floorY + 10} scale={0.9} />
          <Bush x={110} y={floorY + 10} />
        </g>
      ) : (
        <g>
          <Bench x={-110} y={floorY + 10} />
          <Statue x={0} y={floorY + 10} scale={0.95} />
          <Bench x={110} y={floorY + 10} />
        </g>
      )}
      <g transform={`translate(0 ${-h / 2 - 4})`}>
        <rect x={-label.length * 9 - 20} y={-22} width={label.length * 18 + 40} height={44} rx={12} fill={INK} />
        <text x={0} y={9} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={26} fill="#fff">
          {label}
        </text>
      </g>
    </g>
  );
};

// ---------------------------------------------------------------------------

const DejaRoom: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const stop = Math.min(frame, at(0.4));
  const px = 150 + stop * (260 / Math.max(1, at(0.4)));
  const ghost = useProgress(at(0.4), at(0.6));
  const shake = frame > at(0.45) ? Math.sin(frame / 2) * 3 : 0;
  return (
    <g>
      <Room wall="#ece6ff" stripe="#e2d9ff" floor="#b9a6f0" window="day" windowX={0.62} pictureX={0.12} />
      {/* "Önceki" hayalet görüntü */}
      <g opacity={0.35 * ghost} transform={`translate(${-18 * ghost} ${-10 * ghost})`}>
        <Person x={px} y={520} scale={1.25} shirt="#9b86ff" pants="#7d74b8" />
      </g>
      <Person x={px} y={520} scale={1.25} shirt={PURPLE} walking={frame < at(0.4)} />
      <ThoughtBubble x={px + 150} y={170 + shake} r={70} delay={at(0.45)}>
        <text x={0} y={22} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={64} fill={INK}>
          !?
        </text>
      </ThoughtBubble>
      <Chip x={700} y={380} text="BUNU YAŞADIM!" delay={at(0.55)} />
    </g>
  );
};

const NameReveal: Visual = () => {
  return (
    <g>
      <Paper />
      <Note x={450} y={170} width={560} title="DÉJÀ VU" text="= ZATEN GÖRÜLMÜŞ" rotate={-2} delay={2} />
      <Brain x={450} y={400} scale={0.7} mood="happy" delay={12} />
      <Chip x={180} y={420} text="FRANSIZCA" dark delay={18} />
      <Sparkles points={[[160, 80], [760, 90], [740, 330]]} />
    </g>
  );
};

const TwoThirds: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const shirts = [PURPLE, MINT, "#f08a5d"];
  return (
    <g>
      <Paper />
      {shirts.map((s, i) => (
        <g key={i}>
          <Person x={200 + i * 250} y={470} scale={1.25} shirt={s} delay={2 + i * 4} facing={i === 2 ? "left" : "right"} />
          {i < 2 ? (
            <ThoughtBubble x={240 + i * 250} y={110} r={44} delay={at(0.3) + i * 6}>
              <text x={0} y={16} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill={INK}>
                !?
              </text>
            </ThoughtBubble>
          ) : null}
        </g>
      ))}
      <BigText x={700} y={110} text="3'TE 2" size={70} color={YELLOW} delay={at(0.55)} />
      <Chip x={450} y={515} text="ÇOĞUMUZ YAŞIYOR" delay={at(0.65)} />
    </g>
  );
};

const TiredYoung: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  return (
    <g>
      <Paper />
      <Head x={260} y={520} sleepy shirt={MINT} />
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 14) % 42) / 42;
        return (
          <text
            key={i}
            x={360 + i * 30 + t * 30}
            y={200 - i * 34 - t * 40}
            fontFamily={uiFont}
            fontWeight={800}
            fontSize={34 + i * 8}
            fill={PURPLE}
            opacity={1 - t * 0.6}
          >
            Z
          </text>
        );
      })}
      {/* Stres çizgileri */}
      <g stroke={RED} strokeWidth={6} strokeLinecap="round" opacity={useAppear(at(0.3))}>
        <line x1={150} y1={150} x2={120} y2={120} />
        <line x1={140} y1={190} x2={100} y2={180} />
        <line x1={180} y1={120} x2={170} y2={84} />
      </g>
      <Chip x={660} y={150} text="YORGUN" dark delay={at(0.4)} />
      <Chip x={660} y={250} text="STRESLİ" dark delay={at(0.5)} />
      <Chip x={660} y={360} text="GENÇLERDE SIK" delay={at(0.15)} />
    </g>
  );
};

const VrRooms: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const turn = useWave(70, 8);
  return (
    <g>
      <Paper />
      <g transform={`rotate(${turn} 450 470)`}>
        <Head x={450} y={540} goggles shirt={PURPLE} />
      </g>
      <RoomCard x={170} y={200} w={260} h={190} label="AVLU" kind="avlu" scale={0.85 + 0.03 * Math.sin(frame / 9)} delay={at(0.2)} />
      <RoomCard x={730} y={200} w={260} h={190} label="MÜZE" kind="muze" scale={0.85 + 0.03 * Math.cos(frame / 9)} delay={at(0.35)} />
      <Chip x={450} y={60} text="SANAL GERÇEKLİK" delay={at(0.1)} />
    </g>
  );
};

const SameLayout: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const link = useProgress(at(0.35), at(0.6));
  const floorY = 300 - 30 + 10; // RoomCard içindeki zemin (h=300)
  const pairs = [-110, 0, 110];
  return (
    <g>
      <Paper />
      <RoomCard x={225} y={270} w={340} h={300} label="ESKİ ODA" kind="avlu" faded delay={2} />
      <RoomCard x={675} y={270} w={340} h={300} label="YENİ ODA" kind="muze" delay={at(0.15)} />
      <QuestionMark x={225} y={200} size={60} delay={at(0.25)} color={GREY} />
      {pairs.map((dx) => (
        <line
          key={dx}
          x1={225 + dx}
          y1={270 - 150 + floorY - 40}
          x2={225 + dx + 450 * link}
          y2={270 - 150 + floorY - 40}
          stroke={RED}
          strokeWidth={5}
          strokeDasharray="12 10"
          opacity={link > 0 ? 1 : 0}
        />
      ))}
      <Chip x={450} y={510} text="AYNI DÜZEN" delay={at(0.6)} />
    </g>
  );
};

const Familiar: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const dots: [number, number][] = [
    [-50, 20],
    [0, -10],
    [50, 20],
  ];
  return (
    <g>
      <Paper />
      <Brain x={280} y={340} scale={1.1} mood="confused" delay={2} />
      <ThoughtBubble x={560} y={170} r={110} delay={at(0.15)}>
        <rect x={-80} y={-50} width={160} height={100} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 1 ? 18 : 14} fill={i === 1 ? MINT : "#2fa57e"} stroke={OUTLINE} strokeWidth={3} />
        ))}
      </ThoughtBubble>
      <Chip x={600} y={360} text="TANIDIK…" delay={at(0.35)} />
      <g transform={`translate(0 ${Math.sin(frame / 6) * 4})`}>
        <Chip x={640} y={450} text="AMA NEREDEN?" dark delay={at(0.55)} />
      </g>
      <QuestionMark x={810} y={300} size={60} delay={at(0.6)} />
    </g>
  );
};

const NoFuture: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const coin = useAppear(at(0.5));
  const spin = Math.cos(frame / 3);
  return (
    <g>
      <Paper />
      {/* Labirent yolu: çatal */}
      <path d="M 120 470 L 120 300 L 300 300" fill="none" stroke="#b9a6f0" strokeWidth={70} strokeLinejoin="round" />
      <path d="M 300 300 L 300 120 M 300 300 L 470 300" fill="none" stroke="#b9a6f0" strokeWidth={70} strokeLinecap="round" />
      <Person x={250} y={330} scale={0.8} shirt={PURPLE} delay={2} />
      <ThoughtBubble x={440} y={140} r={72} delay={at(0.15)}>
        <text x={0} y={12} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
          SAĞA!
        </text>
      </ThoughtBubble>
      <Chip x={250} y={520} text="BİLDİĞİNİ SANDI" dark delay={at(0.25)} />
      {/* Yazı tura */}
      <g transform={place(700, 250, coin)}>
        <ellipse rx={90 * Math.abs(spin) + 6} ry={90} fill={YELLOW} stroke={OUTLINE} strokeWidth={6} />
        <text
          x={0}
          y={14}
          textAnchor="middle"
          fontFamily={uiFont}
          fontWeight={800}
          fontSize={40}
          fill={INK}
          transform={`scale(${Math.max(0.05, Math.abs(spin))} 1)`}
        >
          {spin > 0 ? "YAZI" : "TURA"}
        </text>
      </g>
      <Chip x={700} y={430} text="= TESADÜF" delay={at(0.6)} />
    </g>
  );
};

const BrainScan: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const glow = useProgress(at(0.2), at(0.45));
  const pulse = 0.7 + 0.3 * Math.abs(Math.sin(frame / 6));
  return (
    <g>
      <Paper />
      {/* Yandan beyin silueti; ön taraf solda */}
      <g transform="translate(450 270)">
        <path
          d="M -230 30 C -250 -80 -150 -170 -20 -170 C 120 -170 230 -110 230 0 C 230 80 170 120 90 120 L 60 170 L 10 170 L 10 120 C -100 130 -215 110 -230 30 Z"
          fill="#f8c6dc"
          stroke={OUTLINE}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <path d="M -150 -80 Q -110 -60 -130 -20 M -40 -140 Q -60 -100 -20 -80 M 60 -130 Q 40 -90 80 -70 M 140 -60 Q 110 -30 150 0 M -60 20 Q -20 0 0 40" fill="none" stroke="#d96b98" strokeWidth={6} strokeLinecap="round" />
        {/* Ön bölge parlıyor */}
        <ellipse cx={-150} cy={-40} rx={80} ry={70} fill={YELLOW} opacity={0.75 * glow * pulse} />
        {/* Hafıza merkezi sönük */}
        <ellipse cx={20} cy={50} rx={40} ry={22} fill={GREY} stroke={OUTLINE} strokeWidth={4} opacity={useAppear(at(0.35))} />
      </g>
      <Chip x={190} y={80} text="ÖN BÖLGE" delay={at(0.3)} />
      <line x1={470} y1={330} x2={560} y2={470} stroke={OUTLINE} strokeWidth={4} strokeDasharray="8 8" opacity={useAppear(at(0.45))} />
      <Chip x={600} y={500} text="HAFIZA MERKEZİ" dark delay={at(0.45)} />
      <Sparkles points={[[120, 160], [260, 150], [180, 310]]} />
    </g>
  );
};

const FactCheck: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const stamp = useAppear(at(0.45), 12);
  return (
    <g>
      <Paper />
      <Brain x={230} y={330} scale={1} mood="happy" delay={2} />
      {/* Kontrol kartı */}
      <g transform={place(600, 230, useAppear(at(0.15)))}>
        <rect x={-190} y={-130} width={380} height={260} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={-70} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={34} fill={INK}>
          TANIDIK HİS
        </text>
        <line x1={-150} y1={-45} x2={150} y2={-45} stroke={GREY} strokeWidth={5} />
        <rect x={-120} y={-14} width={32} height={32} rx={6} fill="none" stroke={OUTLINE} strokeWidth={4} />
        <text x={-60} y={10} fontFamily={uiFont} fontWeight={800} fontSize={28} fill={INK}>
          GERÇEK Mİ?
        </text>
      </g>
      <g transform={place(660, 335, 1.6 - 0.6 * stamp, -10)} opacity={stamp > 0.05 ? 1 : 0}>
        <rect x={-120} y={-40} width={240} height={80} rx={12} fill="none" stroke={RED} strokeWidth={8} />
        <text x={0} y={18} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={50} fill={RED}>
          YANLIŞ!
        </text>
      </g>
      <Chip x={600} y={470} text="BEYİN KONTROL EDİYOR" delay={at(0.65)} />
    </g>
  );
};

const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const card = useAppear(10);
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Head x={210} y={540} talk scale={1.05} shirt={PURPLE} />
      <g transform={place(610, 200, card)}>
        <rect x={-240} y={-100} width={480} height={200} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -170 96 L -210 150 L -120 96 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-165} y={90} width={44} height={12} fill="#fff" />
        <text x={0} y={-12} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={42} fill={PURPLE}>
          EN SON NEREDE
        </text>
        <text x={0} y={46} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={42} fill={INK}>
          YAŞADIN?
        </text>
      </g>
      <g transform={place(610, 430, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={20} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  DejaRoom,
  NameReveal,
  TwoThirds,
  TiredYoung,
  VrRooms,
  SameLayout,
  Familiar,
  NoFuture,
  BrainScan,
  FactCheck,
  YourTurn,
};
