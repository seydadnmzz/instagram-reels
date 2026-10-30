// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Kalabalıkta adını hemen duymak — kokteyl partisi etkisi (2026-10-30-sabah)
import { useCurrentFrame } from "remotion";
import {
  BigText,
  Brain,
  Chip,
  INK,
  Person,
  place,
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
const PINK = "#f0679e";
const GRAY = "#c9c4cc";
const NIGHT = "#2b2f55";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

// Konuşma balonu; kuyruk aşağı-sola (tail="left") ya da aşağı-sağa bakar. (x, y) balonun ortası
const Bubble: React.FC<{
  x: number;
  y: number;
  text: string;
  fill?: string;
  color?: string;
  size?: number;
  tail?: "left" | "right" | "none";
  delay?: number;
}> = ({ x, y, text, fill = "#fff", color = INK, size = 30, tail = "left", delay = 0 }) => {
  const appear = useAppear(delay);
  const bob = useWave(36, 3, x);
  const w = text.length * size * 0.68 + 44;
  const h = size + 34;
  const tx = tail === "left" ? -w / 2 + 26 : w / 2 - 26;
  const dir = tail === "left" ? -1 : 1;
  return (
    <g transform={place(x, y + bob, appear)}>
      {tail !== "none" ? (
        <path
          d={`M ${tx - 12} ${h / 2 - 4} L ${tx + dir * 18} ${h / 2 + 26} L ${tx + 14} ${h / 2 - 4} Z`}
          fill={fill}
          stroke={OUTLINE}
          strokeWidth={5}
          strokeLinejoin="round"
        />
      ) : null}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} stroke={OUTLINE} strokeWidth={5} />
      {tail !== "none" ? <rect x={tx - 10} y={h / 2 - 9} width={22} height={8} fill={fill} /> : null}
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={size} fill={color}>
        {text}
      </text>
    </g>
  );
};

// Martini kadehi; (0,0) ayağın tabanı
const Glass: React.FC<{ tilt?: number }> = ({ tilt = 0 }) => (
  <g transform={`rotate(${tilt})`}>
    <rect x={-40} y={-10} width={80} height={12} rx={6} fill="#dff3ff" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-6} y={-120} width={12} height={112} fill="#dff3ff" stroke={OUTLINE} strokeWidth={5} />
    <path d="M -95 -240 L 95 -240 L 0 -120 Z" fill="#dff3ff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -76 -216 L 76 -216 L 0 -128 Z" fill={PINK} />
    <circle cx={30} cy={-226} r={14} fill="#7fc36b" stroke={OUTLINE} strokeWidth={4} />
    <line x1={30} y1={-226} x2={70} y2={-280} stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// Önden kafa (kulaklıklı ya da uyuyan); (0,0) yüzün ortası
const Face: React.FC<{ r?: number; sleeping?: boolean; headphones?: boolean }> = ({ r = 110, sleeping = false, headphones = false }) => {
  const frame = useCurrentFrame();
  const blink = frame % 80 > 75 ? 0.1 : 1;
  return (
    <g>
      <circle cx={0} cy={0} r={r} fill="#f2c79a" stroke={OUTLINE} strokeWidth={6} />
      <path
        d={`M ${-r} -10 Q ${-r} ${-r * 1.15} 0 ${-r * 1.05} Q ${r} ${-r * 1.15} ${r} -10 Q ${r * 0.5} ${-r * 0.7} 0 ${-r * 0.62} Q ${-r * 0.5} ${-r * 0.7} ${-r} -10 Z`}
        fill="#4a2f1d"
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      {sleeping ? (
        <g fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round">
          <path d={`M ${-r * 0.5} 4 Q ${-r * 0.33} ${r * 0.16} ${-r * 0.16} 4`} />
          <path d={`M ${r * 0.16} 4 Q ${r * 0.33} ${r * 0.16} ${r * 0.5} 4`} />
          <circle cx={0} cy={r * 0.5} r={r * 0.08} />
        </g>
      ) : (
        <g>
          <g transform={`scale(1 ${blink})`}>
            <circle cx={-r * 0.33} cy={0} r={r * 0.1} fill={OUTLINE} />
            <circle cx={r * 0.33} cy={0} r={r * 0.1} fill={OUTLINE} />
          </g>
          <path d={`M ${-r * 0.25} ${r * 0.45} Q 0 ${r * 0.62} ${r * 0.25} ${r * 0.45}`} fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        </g>
      )}
      {headphones ? (
        <g stroke={OUTLINE} strokeWidth={6}>
          <path d={`M ${-r - 6} 0 Q ${-r - 10} ${-r * 1.5} 0 ${-r * 1.42} Q ${r + 10} ${-r * 1.5} ${r + 6} 0`} fill="none" stroke="#3a3f4b" strokeWidth={16} />
          <rect x={-r - 34} y={-44} width={48} height={92} rx={18} fill="#5b8def" />
          <rect x={r - 14} y={-44} width={48} height={92} rx={18} fill="#5b8def" />
        </g>
      ) : null}
    </g>
  );
};

const CrowdName: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const turned = frame > at(0.42);
  const jump = turned ? Math.max(0, Math.sin(((frame - at(0.42)) / 10) * Math.PI)) * (frame - at(0.42) < 10 ? 16 : 0) : 0;
  return (
    <g>
      <Paper />
      <rect x={0} y={500} width={900} height={60} fill="#f7c6d8" />
      <Person x={100} y={530} scale={0.95} shirt="#8fd3c7" hair="#2b2b2b" facing="right" />
      <Person x={250} y={530} scale={0.95} shirt="#f6c343" hair="#a0522d" facing="left" glasses />
      <g transform={`translate(0 ${-jump})`}>
        <Person x={450} y={530} scale={1.1} shirt={PINK} facing={turned ? "right" : "left"} />
      </g>
      <Person x={640} y={530} scale={0.95} shirt="#9b8cf2" hair="#2b2b2b" facing="right" mustache />
      <Person x={800} y={530} scale={0.95} shirt="#7fc36b" hair="#6b4a2f" facing="left" />
      <Bubble x={150} y={190} text="BLA BLA" fill={GRAY} color="#6b6670" size={26} delay={2} />
      <Bubble x={330} y={130} text="BLA" fill={GRAY} color="#6b6670" size={26} tail="right" delay={8} />
      <Bubble x={650} y={90} text="BLA BLA" fill={GRAY} color="#6b6670" size={26} delay={14} />
      <Bubble x={770} y={170} text="ADIN!" fill={YELLOW} size={40} tail="right" delay={at(0.35)} />
      <BigText x={520} y={200} text="!" size={130} color={RED} delay={at(0.45)} />
      {turned ? <Sparkles points={[[575, 140], [700, 90], [470, 140]]} /> : null}
    </g>
  );
};

const NameReveal: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const clink = useProgress(0, at(0.35));
  const tilt = 14 * clink;
  return (
    <g>
      <Paper />
      <g transform={place(290 + clink * 30, 385, 0.85)}>
        <Glass tilt={tilt} />
      </g>
      <g transform={place(610 - clink * 30, 385, 0.85)}>
        <g transform="scale(-1 1)">
          <Glass tilt={tilt} />
        </g>
      </g>
      {clink >= 1 ? <Sparkles points={[[450, 130], [400, 90], [505, 95], [450, 50]]} /> : null}
      <Chip x={450} y={440} text="KOKTEYL PARTİSİ" delay={at(0.35)} />
      <Chip x={450} y={505} text="ETKİSİ" dark delay={at(0.5)} />
    </g>
  );
};

const BrainFilter: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const items = ["BLA", "BLA", "ADIN", "BLA", "BLA"];
  const step = Math.max(10, Math.round(durationInFrames / 8));
  return (
    <g>
      <Paper />
      {/* Süzgeç */}
      <g transform="translate(470 0)">
        <rect x={-22} y={110} width={44} height={340} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={0} cy={140 + i * 40} r={7} fill={PINK} stroke={OUTLINE} strokeWidth={3} />
        ))}
      </g>
      <Brain x={730} y={280} scale={0.95} delay={2} />
      {items.map((t, i) => {
        const start = i * step;
        const local = frame - start;
        if (local < 0) return null;
        const isName = t === "ADIN";
        const travel = Math.min(1, local / 26);
        let x = 80 + travel * 300;
        let y = 160 + ((i * 83) % 260);
        let op = 1;
        if (!isName && local > 26) {
          // Süzgece çarpıp aşağı düşer ve solar
          const k = Math.min(1, (local - 26) / 18);
          x = 380 - k * 30;
          y += k * 120;
          op = 1 - k;
        }
        if (isName && local > 26) {
          const k = Math.min(1, (local - 26) / 18);
          x = 380 + k * 230;
          y = y + (280 - y) * k;
        }
        return (
          <g key={i} opacity={op}>
            <Bubble x={x} y={y} text={t} fill={isName ? YELLOW : GRAY} color={isName ? INK : "#6b6670"} size={isName ? 34 : 26} tail="none" />
          </g>
        );
      })}
      <Chip x={190} y={510} text="ARKA PLAN" dark delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

const Headphones: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const frame = useCurrentFrame();
  const appear = useAppear(0);
  return (
    <g>
      <Paper />
      <g transform={place(290, 270, appear * 0.95)}>
        <Face headphones />
      </g>
      {/* Dinlenen kulak: konuşma akıyor */}
      <g fill="none" stroke="#3fb4a0" strokeWidth={7} strokeLinecap="round">
        {[0, 1, 2].map((i) => {
          const k = ((frame / 22 + i / 3) % 1);
          return <path key={i} d={`M ${120 - k * 70} ${230 - 30} q -20 30 0 60`} opacity={1 - k} />;
        })}
      </g>
      <Chip x={110} y={430} text="DİNLE" delay={4} />
      <Bubble x={560} y={150} text="BLA BLA" fill={GRAY} color="#6b6670" size={26} delay={6} />
      <Bubble x={560} y={150} text="…ADIN…" fill={YELLOW} size={34} delay={at(0.32)} />
      {/* Üç kişiden biri fark ediyor */}
      <Person x={630} y={545} scale={0.6} shirt={GRAY} hair="#2b2b2b" delay={at(0.5)} />
      <Person x={730} y={545} scale={0.6} shirt={YELLOW} delay={at(0.55)} />
      <Person x={830} y={545} scale={0.6} shirt={GRAY} hair="#6b4a2f" delay={at(0.6)} />
      <BigText x={745} y={370} text="!" size={70} color={RED} delay={at(0.68)} />
      <Chip x={730} y={290} text="ÜÇTE BİR" dark delay={at(0.68)} />
    </g>
  );
};

const FocusTwist: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const grow = useProgress(at(0.1), at(0.5));
  const base = 450;
  const bars = [
    { x: 200, h: 105, label: "ODAKLI", color: "#8fd3c7", dark: false },
    { x: 440, h: 340, label: "DAĞINIK", color: PINK, dark: true },
  ];
  return (
    <g>
      <Paper />
      <line x1={90} y1={base} x2={560} y2={base} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {bars.map((b) => {
        const h = b.h * grow;
        return (
          <g key={b.label}>
            <rect x={b.x - 70} y={base - h} width={140} height={h} rx={12} fill={b.color} stroke={OUTLINE} strokeWidth={5} />
            <Chip x={b.x} y={base + 50} text={b.label} dark={b.dark} delay={at(0.15)} />
          </g>
        );
      })}
      <BigText x={740} y={160} text="3 KAT" size={110} color={YELLOW} delay={at(0.55)} />
      <Brain x={740} y={380} scale={0.8} mood="confused" delay={at(0.3)} />
    </g>
  );
};

const SleepName: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const line = useProgress(0, at(0.8));
  const spikeOn = at(0.45);
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const fx = i / 60;
    if (fx > line) break;
    const x = -130 + fx * 260;
    let y = Math.sin(i * 1.7) * 6 + Math.sin(i * 0.6) * 4;
    if (frame > spikeOn && i >= 30 && i <= 38) y = [0, -20, -60, -20, 30, 50, 20, 0, 0][i - 30];
    pts.push(`${x},${y}`);
  }
  return (
    <g>
      <rect width={900} height={560} fill={NIGHT} />
      <circle cx={110} cy={90} r={40} fill="#fff4c2" />
      <circle cx={128} cy={78} r={36} fill={NIGHT} />
      <Sparkles points={[[220, 60], [330, 120], [450, 70]]} color="#fff4c2" />
      {/* Yatak */}
      <rect x={60} y={400} width={520} height={90} rx={18} fill="#6e7bd9" stroke={OUTLINE} strokeWidth={6} />
      <rect x={60} y={480} width={30} height={50} fill="#8a5a32" stroke={OUTLINE} strokeWidth={5} />
      <rect x={550} y={480} width={30} height={50} fill="#8a5a32" stroke={OUTLINE} strokeWidth={5} />
      <rect x={80} y={350} width={170} height={70} rx={30} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <g transform="translate(170 330) scale(0.62)">
        <Face sleeping />
      </g>
      <path d="M 230 380 Q 400 330 580 400 L 580 450 L 230 450 Z" fill={PINK} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      {[0, 1, 2].map((i) => {
        const k = ((frame / 40 + i / 3) % 1);
        return (
          <text key={i} x={260 + k * 60 + i * 10} y={250 - k * 90} fontFamily={uiFont} fontWeight={800} fontSize={30 + i * 6} fill="#fff" opacity={1 - k}>
            Z
          </text>
        );
      })}
      <Bubble x={430} y={230} text="ADIN" fill={YELLOW} size={34} tail="left" delay={at(0.25)} />
      {/* Beyin dalgası ekranı */}
      <g transform={place(700, 200, useAppear(4))}>
        <rect x={-160} y={-100} width={320} height={200} rx={20} fill="#1d2140" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-160} y={-100} width={320} height={200} rx={20} fill="none" stroke="#5be3c8" strokeWidth={3} opacity={0.6} />
        <polyline points={pts.join(" ")} fill="none" stroke="#5be3c8" strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <Chip x={700} y={380} text="FARKLI TEPKİ" delay={spikeOn + 4} />
    </g>
  );
};

const AlwaysOn: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  return (
    <g>
      <Paper />
      {[0, 1, 2].map((i) => {
        const k = ((frame / 30 + i / 3) % 1);
        return <circle key={i} cx={450} cy={270} r={130 + k * 160} fill="none" stroke={PINK} strokeWidth={8} opacity={0.8 - k * 0.8} />;
      })}
      <Brain x={450} y={270} scale={1.05} delay={0} />
      <Bubble x={140} y={130} text="BLA" fill={GRAY} color="#6b6670" size={26} tail="none" delay={6} />
      <Bubble x={150} y={400} text="BLA" fill={GRAY} color="#6b6670" size={26} tail="none" delay={12} />
      <Bubble x={770} y={410} text="BLA" fill={GRAY} color="#6b6670" size={26} tail="none" delay={16} />
      <Bubble x={750} y={130} text="ADIN" fill={YELLOW} size={38} tail="none" delay={at(0.3)} />
      <Chip x={450} y={505} text="HEP TETİKTE" dark delay={at(0.45)} />
    </g>
  );
};

const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const card = useAppear(8);
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <Person x={200} y={530} scale={1.3} shirt={PINK} presenting />
      <g transform={place(610, 200, card)}>
        <rect x={-230} y={-110} width={460} height={220} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -160 106 L -190 160 L -110 106 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-150} y={100} width={44} height={12} fill="#fff" />
        <text x={0} y={-8} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={46} fill={INK}>
          SEN NEREDE
        </text>
        <text x={0} y={52} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={46} fill={RED}>
          DÖNDÜN?
        </text>
      </g>
      <g transform={place(610, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={24} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  CrowdName,
  NameReveal,
  BrainFilter,
  Headphones,
  FocusTwist,
  SleepName,
  AlwaysOn,
  YourTurn,
};
