// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Acı biber ağzını neden yakıyor? (2026-11-24-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  NamePlate,
  Person,
  place,
  Sparkles,
  ThoughtBubble,
  uiFont,
  useAppear,
  useProgress,
  useWave,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#e8f8f6";
const SKIN = "#f2c79a";
const TEAL = "#17b3a0";
const DEEP = "#0f7f86";
const BLUE = "#3a8fe0";
const PINK = "#ff6b8b";
const RED = "#e8434b";
const ORANGE = "#ff8a2b";
const YELLOWC = "#ffd23f";
const GREEN = "#4caf50";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Kırmızı acı biber; (0,0) sapın dibi, aşağı doğru uzanır
const Pepper: React.FC<{ x: number; y: number; scale?: number; rotate?: number; bite?: boolean; color?: string }> = ({
  x,
  y,
  scale = 1,
  rotate = 0,
  bite = false,
  color = RED,
}) => (
  <g transform={place(x, y, scale, rotate)}>
    <path
      d="M -22 0 C -40 40 -30 120 10 190 C 18 202 30 200 28 186 C 20 120 40 50 24 0 Z"
      fill={color}
      stroke={OUTLINE}
      strokeWidth={5}
      strokeLinejoin="round"
    />
    {bite ? <circle cx={20} cy={196} r={22} fill={PAPER} stroke={OUTLINE} strokeWidth={5} /> : null}
    <path d="M -8 30 C -16 70 -10 110 6 140" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={7} strokeLinecap="round" />
    <path d="M -28 -2 Q 0 -18 30 -2 Q 0 12 -28 -2 Z" fill={GREEN} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 0 -8 Q 4 -36 22 -46" fill="none" stroke={OUTLINE} strokeWidth={12} strokeLinecap="round" />
    <path d="M 0 -8 Q 4 -36 22 -46" fill="none" stroke={GREEN} strokeWidth={6} strokeLinecap="round" />
  </g>
);

// Titreşen alev
const Flame: React.FC<{ x: number; y: number; scale?: number; phase?: number }> = ({ x, y, scale = 1, phase = 0 }) => {
  const frame = useCurrentFrame();
  const s = 1 + Math.sin((frame + phase) / 3) * 0.08;
  const lean = Math.sin((frame + phase) / 5) * 6;
  return (
    <g transform={place(x, y, scale)}>
      <g transform={`rotate(${lean}) scale(1 ${s})`}>
        <path d="M 0 0 C -40 0 -46 -40 -24 -70 C -20 -50 -8 -48 -6 -60 C -10 -90 10 -110 20 -120 C 18 -90 46 -70 40 -36 C 38 -12 22 0 0 0 Z" fill={ORANGE} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 0 -6 C -18 -6 -22 -28 -10 -44 C -6 -34 2 -34 4 -46 C 16 -36 22 -22 18 -14 C 14 -8 8 -6 0 -6 Z" fill={YELLOWC} />
      </g>
    </g>
  );
};

// Bardak; fill: içecek rengi, level: 0..1
const Glass: React.FC<{ x: number; y: number; fill: string; level?: number; bubbles?: boolean; scale?: number }> = ({
  x,
  y,
  fill,
  level = 0.75,
  bubbles = false,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const top = -130 + (1 - level) * 120;
  return (
    <g transform={place(x, y, scale)}>
      <path d={`M -44 ${top} L 44 ${top} L 38 0 L -38 0 Z`} fill={fill} />
      {bubbles
        ? [0, 1, 2, 3, 4].map((i) => {
            const by = -((frame * 2 + i * 26) % 110);
            return <circle key={i} cx={-24 + i * 12} cy={by} r={5} fill="rgba(255,255,255,0.85)" />;
          })
        : null}
      <path d="M -50 -140 L 50 -140 L 40 0 L -40 0 Z" fill="rgba(255,255,255,0.25)" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -34 -120 L -28 -20" stroke="rgba(255,255,255,0.8)" strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

// Yarım boy karakter; mood "fire" ağzından alev çıkar
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  mood?: "calm" | "happy" | "wow" | "talk" | "fire";
  delay?: number;
}> = ({ x, y, scale = 1, shirt = TEAL, hair = "#4a2f1d", mood = "calm", delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const shake = mood === "fire" ? Math.sin(frame * 1.7) * 3 : Math.sin(frame / 18) * 2;
  const face = mood === "fire" ? "#f4a07a" : SKIN;
  const tear = (frame % 40) / 40;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={face} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${shake} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={face} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {mood === "fire" ? (
          <g>
            <path d="M -38 -212 L -16 -202 M -38 -196 L -16 -202" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
            <path d="M 38 -212 L 16 -202 M 38 -196 L 16 -202" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
            <path d={`M -30 -194 q -4 ${10 + tear * 30} 0 ${14 + tear * 30}`} fill="none" stroke={BLUE} strokeWidth={6} strokeLinecap="round" opacity={1 - tear * 0.6} />
            <path d={`M 30 -194 q 4 ${10 + tear * 30} 0 ${14 + tear * 30}`} fill="none" stroke={BLUE} strokeWidth={6} strokeLinecap="round" opacity={1 - tear * 0.6} />
            <ellipse cx={0} cy={-160} rx={24} ry={18} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} />
          </g>
        ) : mood === "wow" ? (
          <g>
            <circle cx={-26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-26} cy={-204} r={6} fill={OUTLINE} />
            <circle cx={26} cy={-204} r={6} fill={OUTLINE} />
            <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
          </g>
        ) : (
          <g>
            <circle cx={-26} cy={-206} r={8} fill={OUTLINE} />
            <circle cx={26} cy={-206} r={8} fill={OUTLINE} />
            {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
            {mood === "talk" ? <ellipse cx={0} cy={-162} rx={18} ry={6 + Math.abs(Math.sin(frame / 3)) * 12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
            {mood === "calm" ? <path d="M -20 -160 Q 0 -166 20 -160" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
          </g>
        )}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        <circle cx={-46} cy={-176} r={10} fill={mood === "fire" ? RED : "#f59ab0"} opacity={0.7} />
        <circle cx={46} cy={-176} r={10} fill={mood === "fire" ? RED : "#f59ab0"} opacity={0.7} />
        {mood === "fire" ? (
          <g>
            <g transform="translate(-22 -158) rotate(-110)">
              <Flame x={0} y={0} scale={0.42} />
            </g>
            <g transform="translate(22 -158) rotate(110)">
              <Flame x={0} y={0} scale={0.42} phase={7} />
            </g>
          </g>
        ) : null}
      </g>
    </g>
  );
};

// Sinir ucu + alıcı (kilit benzeri yuva). active: 0..1 parlama
const Receptor: React.FC<{ x: number; y: number; active?: number; scale?: number }> = ({ x, y, active = 0, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <path d="M -260 30 C -160 10 -80 40 -40 20" fill="none" stroke="#f1b5c8" strokeWidth={34} strokeLinecap="round" />
    <path d="M -260 30 C -160 10 -80 40 -40 20" fill="none" stroke={OUTLINE} strokeWidth={4} strokeDasharray="0" opacity={0.25} />
    <circle cx={0} cy={0} r={70} fill="#f7c6d6" stroke={OUTLINE} strokeWidth={6} />
    <path d="M -24 -70 L -24 -20 Q 0 6 24 -20 L 24 -70" fill={active > 0.5 ? YELLOWC : "#fff"} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
    {active > 0 ? <circle cx={0} cy={0} r={70 + active * 30} fill="none" stroke={ORANGE} strokeWidth={8} opacity={1 - active * 0.6} /> : null}
  </g>
);

// Kapsaisin parçacığı
const Molecule: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <line x1={-18} y1={0} x2={18} y2={0} stroke={OUTLINE} strokeWidth={6} />
    <circle cx={-18} cy={0} r={15} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={18} cy={0} r={12} fill={RED} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={0} cy={-16} r={9} fill={YELLOWC} stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// Alarm lambası
const Siren: React.FC<{ x: number; y: number; on: boolean; scale?: number }> = ({ x, y, on, scale = 1 }) => {
  const frame = useCurrentFrame();
  const blink = on && Math.floor(frame / 5) % 2 === 0;
  return (
    <g transform={place(x, y, scale)}>
      {blink ? <circle cx={0} cy={-40} r={70} fill={RED} opacity={0.25} /> : null}
      <path d="M -40 0 L -40 -50 Q -40 -90 0 -90 Q 40 -90 40 -50 L 40 0 Z" fill={blink ? RED : "#f6a3a7"} stroke={OUTLINE} strokeWidth={6} />
      <rect x={-56} y={0} width={112} height={24} rx={6} fill={OUTLINE} />
      <path d="M -18 -60 Q -18 -74 -4 -76" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

// Ocak
const Stove: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={place(x, y)}>
    <rect x={-90} y={0} width={180} height={90} rx={10} fill="#c9d4da" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-100} y={-12} width={200} height={16} rx={6} fill="#8d9aa2" stroke={OUTLINE} strokeWidth={5} />
    <circle cx={-40} cy={45} r={10} fill={OUTLINE} />
    <circle cx={40} cy={45} r={10} fill={OUTLINE} />
    <Flame x={-30} y={-12} scale={0.55} />
    <Flame x={0} y={-12} scale={0.7} phase={5} />
    <Flame x={30} y={-12} scale={0.55} phase={9} />
  </g>
);

// Termometre; level 0..1
const Thermo: React.FC<{ x: number; y: number; level: number; color?: string; scale?: number }> = ({ x, y, level, color = BLUE, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <rect x={-18} y={-200} width={36} height={200} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-8} y={-190 + (1 - level) * 170} width={16} height={190 - (1 - level) * 170} rx={8} fill={color} />
    <circle cx={0} cy={10} r={30} fill={color} stroke={OUTLINE} strokeWidth={5} />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={18} y1={-170 + i * 40} x2={34} y2={-170 + i * 40} stroke={OUTLINE} strokeWidth={4} />
    ))}
  </g>
);

// Kuş
const Bird: React.FC<{ x: number; y: number; scale?: number; peck?: number }> = ({ x, y, scale = 1, peck = 0 }) => {
  const frame = useCurrentFrame();
  const blink = frame % 70 > 65 ? 0.2 : 1;
  return (
    <g transform={place(x, y, scale)}>
      <path d="M -30 60 L -30 100 M 20 60 L 20 100" stroke="#e39a2f" strokeWidth={8} strokeLinecap="round" />
      <path d="M -120 10 L -170 -20 L -160 30 Z" fill={DEEP} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <ellipse cx={-20} cy={20} rx={110} ry={70} fill={BLUE} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 10 Q -30 -30 30 10 Q -20 50 -70 10 Z" fill={DEEP} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={0} cy={50} rx={60} ry={30} fill="#bfe3ff" />
      <g transform={`rotate(${peck * 25} 60 -20)`}>
        <circle cx={70} cy={-40} r={50} fill={BLUE} stroke={OUTLINE} strokeWidth={6} />
        <g transform={`translate(0 ${-48 * (1 - blink)}) scale(1 ${blink})`}>
          <circle cx={84} cy={-48} r={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={88} cy={-48} r={6} fill={OUTLINE} />
        </g>
        <path d="M 112 -40 L 156 -28 L 112 -16 Z" fill={YELLOWC} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={64} cy={-22} r={9} fill={PINK} opacity={0.7} />
      </g>
    </g>
  );
};

// Süt kutusu
const Carton: React.FC<{ x: number; y: number; label: string; band: string; scale?: number }> = ({ x, y, label, band, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <path d="M -70 -200 L 0 -250 L 70 -200 Z" fill="#f4f4f4" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-70} y={-200} width={140} height={200} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-70} y={-130} width={140} height={60} fill={band} stroke={OUTLINE} strokeWidth={4} />
    <text x={0} y={-90} fontFamily={uiFont} fontWeight={900} fontSize={label.length > 7 ? 24 : 30} textAnchor="middle" fill="#fff">
      {label}
    </text>
    <text x={0} y={-150} fontFamily={uiFont} fontWeight={900} fontSize={34} textAnchor="middle" fill={OUTLINE}>
      SÜT
    </text>
    <path d="M -40 -40 Q -20 -60 0 -40 Q 20 -20 40 -40" fill="none" stroke={band} strokeWidth={6} strokeLinecap="round" />
  </g>
);

// 1) Kanca: acı biber ısırınca ağızdan alev
const PepperHook: Visual = ({ durationInFrames }) => {
  const fire = useAppear(Math.round(durationInFrames * 0.25));
  const sway = useWave(30, 6);
  return (
    <g>
      <Paper />
      <circle cx={450} cy={300} r={240} fill="#c9efe9" />
      {fire < 0.5 ? (
        <Bust x={420} y={560} scale={1.25} mood="calm" />
      ) : (
        <Bust x={420} y={560} scale={1.25} mood="fire" />
      )}
      <Pepper x={680} y={160} scale={1.1} rotate={30 + sway} />
      <g opacity={fire}>
        <Flame x={140} y={260} scale={1.1} />
        <Flame x={760} y={480} scale={0.9} phase={10} />
      </g>
      <Chip x={180} y={470} text="ALEV ALEV!" delay={Math.round(durationInFrames * 0.35)} />
      <BigText x={160} y={100} text="?!" size={90} color={RED} delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

// 2) Acılık bir tat değil, ağrı + sıcaklık sinyali
const NotTaste: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const cross = useProgress(d(0.12), d(0.25));
  const arr = useProgress(d(0.28), d(0.4));
  const tongueA = useAppear(4);
  return (
    <g>
      <Paper />
      <g transform={place(240, 300, tongueA)}>
        <path d="M -150 -90 L 150 -90 L 150 40 C 150 150 -150 150 -150 40 Z" fill="#f48fa6" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 0 -80 L 0 90" stroke="#d96b86" strokeWidth={6} strokeLinecap="round" />
        {[
          [-90, -40],
          [-60, 20],
          [-100, 70],
          [80, -40],
          [60, 30],
          [100, 70],
          [-30, -50],
          [30, 0],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={9} fill="#e66f8d" />
        ))}
      </g>
      <Chip x={240} y={130} text="TAT" delay={6} />
      <g opacity={cross > 0 ? 0.85 : 0} stroke={RED} strokeWidth={8} strokeLinecap="round">
        <line x1={180} y1={100} x2={180 + 120 * cross} y2={100 + 60 * cross} />
        <line x1={300} y1={100} x2={300 - 120 * cross} y2={100 + 60 * cross} />
      </g>
      <Arrow from={[420, 300]} to={[540, 300]} progress={arr} color={OUTLINE} />
      <g transform={place(700, 230, useAppear(d(0.38)))}>
        <circle r={110} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Flame x={-30} y={40} scale={0.8} />
        <path d="M 40 -60 L 10 0 L 40 0 L 15 60" fill="none" stroke={YELLOWC} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
        <path d="M 40 -60 L 10 0 L 40 0 L 15 60" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <Chip x={700} y={430} text="AĞRI + SICAKLIK" delay={d(0.45)} />
    </g>
  );
};

// 3) Kapsaisin sinir ucundaki alıcıya bağlanıyor
const Capsaicin: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const fly = useProgress(d(0.25), d(0.7));
  const ease = 1 - (1 - fly) ** 2;
  const frame = useCurrentFrame();
  const active = fly >= 1 ? Math.abs(Math.sin(frame / 5)) : 0;
  return (
    <g>
      <Paper />
      <Pepper x={150} y={130} scale={1.2} rotate={-20} />
      <NamePlate x={200} y={480} text="KAPSAİSİN" delay={d(0.15)} />
      {[0, 1, 2].map((i) => {
        const sx = 230 + i * 20;
        const sy = 200 + i * 60;
        const tx = 650 + (i - 1) * 6;
        const ty = 220 + (i - 1) * 4;
        const k = Math.max(0, Math.min(1, ease * 1.1 - i * 0.05));
        return <Molecule key={i} x={sx + (tx - sx) * k} y={sy + (ty - sy) * k} scale={i === 1 ? 1.5 : 1.2} />;
      })}
      <Receptor x={650} y={300} active={active} />
      <Chip x={680} y={470} text="SİNİR UCU" delay={d(0.1)} />
    </g>
  );
};

// 4) Sahte alarm: ocak da biber de aynı alarmı çalıyor
const HeatSensor: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const a1 = useProgress(d(0.1), d(0.3));
  const a2 = useProgress(d(0.5), d(0.7));
  return (
    <g>
      <Paper />
      <Stove x={150} y={210} />
      <g transform={place(150, 470, useAppear(d(0.05)))}>
        <Pepper x={-20} y={-90} scale={0.6} rotate={-60} />
      </g>
      <Arrow from={[270, 220]} to={[390, 260]} progress={a1} color={ORANGE} />
      <Arrow from={[270, 420]} to={[390, 340]} progress={a2} color={RED} />
      <Receptor x={520} y={300} scale={0.8} active={a2 >= 1 ? 0.8 : a1 >= 1 ? 0.3 : 0} />
      <Siren x={760} y={260} on={a1 >= 1} scale={1.2} />
      <Chip x={720} y={460} text="AYNI ALARM!" delay={d(0.7)} />
    </g>
  );
};

// 5) Beyin "yanıyorsun" sanıyor ama gerçek ateş yok
const BrainFire: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  return (
    <g>
      <Paper />
      <Brain x={260} y={320} scale={1.3} mood="confused" delay={2} />
      <ThoughtBubble x={300} y={110} r={70} delay={d(0.1)}>
        <Flame x={0} y={40} scale={0.7} />
      </ThoughtBubble>
      <Chip x={260} y={500} text="YANIYORSUN!" delay={d(0.2)} />
      <g transform={place(680, 380, useAppear(d(0.45)))}>
        <Thermo x={0} y={0} level={0.4} color={BLUE} />
      </g>
      <Chip x={680} y={470} text="ATEŞ YOK" dark delay={d(0.6)} />
      <Sparkles points={[[600, 120], [760, 150]]} />
    </g>
  );
};

// 6) Nobel: biberin yardımıyla bulunan alıcı
const NobelLab: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const medal = useAppear(d(0.45));
  const spin = useWave(40, 10);
  return (
    <g>
      <Paper />
      <rect x={0} y={430} width={900} height={130} fill="#cdeee8" />
      <Person x={220} y={460} scale={1.5} shirt="#ffffff" glasses presenting delay={2} />
      <NamePlate x={220} y={510} text="DAVID JULIUS" delay={d(0.1)} />
      <rect x={380} y={360} width={200} height={20} rx={6} fill="#8a5a32" stroke={OUTLINE} strokeWidth={4} />
      <Pepper x={470} y={300} scale={0.4} rotate={-80} />
      <Glass x={540} y={360} fill="#bfe3ff" level={0.5} scale={0.45} />
      <g transform={place(720, 220, medal, spin)}>
        <path d="M -40 -150 L -10 -60 L 10 -60 L 40 -150" fill={BLUE} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <circle r={80} fill={YELLOWC} stroke={OUTLINE} strokeWidth={6} />
        <circle r={60} fill="none" stroke="#d6a51c" strokeWidth={5} />
        <text y={-4} fontFamily={uiFont} fontWeight={900} fontSize={28} textAnchor="middle" fill={OUTLINE}>
          NOBEL
        </text>
        <text y={30} fontFamily={uiFont} fontWeight={900} fontSize={28} textAnchor="middle" fill={OUTLINE}>
          2021
        </text>
      </g>
      <Sparkles points={[[620, 110], [820, 140], [800, 320]]} />
    </g>
  );
};

// 7) Kuşlar kapsaisine tepki vermiyor
const BirdPepper: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const peck = Math.max(0, Math.sin(frame / 6)) ** 3;
  const d = (k: number) => Math.round(durationInFrames * k);
  return (
    <g>
      <Paper fill="#dff4fb" />
      <circle cx={790} cy={90} r={50} fill={YELLOWC} stroke={OUTLINE} strokeWidth={5} />
      <path d="M 0 440 Q 450 400 900 440 L 900 560 L 0 560 Z" fill="#9fd98b" stroke={OUTLINE} strokeWidth={5} />
      <g transform={place(330, 330, useAppear(2))}>
        <Bird x={0} y={0} scale={1.2} peck={peck} />
      </g>
      <Pepper x={580} y={300} scale={0.7} rotate={-75} />
      <Pepper x={620} y={360} scale={0.6} rotate={-95} color={ORANGE} />
      <Chip x={680} y={200} text="HİÇ ACIMIYOR!" delay={d(0.4)} />
      <Sparkles points={[[470, 220], [520, 160]]} />
    </g>
  );
};

// 8) İçecek yarışı: en iyi süt
const DrinkTest: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const drinks = [
    { label: "SU", fill: "#bfe3ff", score: 0.45 },
    { label: "KOLA", fill: "#6b3a22", score: 0.3, bubbles: true },
    { label: "MADEN S.", fill: "#e5f6ff", score: 0.3, bubbles: true },
    { label: "SÜT", fill: "#ffffff", score: 0.95 },
  ];
  const grow = useProgress(d(0.2), d(0.5));
  return (
    <g>
      <Paper />
      <Chip x={150} y={50} text="72 KİŞİ" delay={4} />
      {drinks.map((dr, i) => {
        const x = 180 + i * 180;
        const best = i === 3;
        return (
          <g key={dr.label}>
            <rect x={x - 40} y={300 - 220 * dr.score * grow} width={80} height={220 * dr.score * grow} fill={best ? GREEN : "#9bb7c2"} stroke={OUTLINE} strokeWidth={4} />
            <Glass x={x} y={460} fill={dr.fill} bubbles={dr.bubbles} scale={0.8} />
            <text x={x} y={510} fontFamily={uiFont} fontWeight={900} fontSize={26} textAnchor="middle" fill={OUTLINE}>
              {dr.label}
            </text>
          </g>
        );
      })}
      <line x1={110} y1={300} x2={800} y2={300} stroke={OUTLINE} strokeWidth={5} />
      <BigText x={720} y={40} text="★" size={90} color={YELLOWC} delay={d(0.72)} />
    </g>
  );
};

// 9) Yağsız süt de neredeyse aynı: sır belki proteinde
const SkimMilk: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const a = useAppear(4);
  const b = useAppear(d(0.15));
  return (
    <g>
      <Paper />
      <g transform={place(190, 440, a)}>
        <Carton x={0} y={0} label="TAM YAĞLI" band={BLUE} />
      </g>
      <g transform={place(500, 440, b)}>
        <Carton x={0} y={0} label="YAĞSIZ" band={TEAL} />
      </g>
      <BigText x={345} y={300} text="≈" size={110} color={OUTLINE} delay={d(0.3)} />
      <ThoughtBubble x={750} y={170} r={95} delay={d(0.35)}>
        <text y={12} fontFamily={uiFont} fontWeight={900} fontSize={30} textAnchor="middle" fill={OUTLINE}>
          PROTEİN?
        </text>
      </ThoughtBubble>
      <Chip x={740} y={470} text="SIR YAĞDA DEĞİL" delay={d(0.5)} />
    </g>
  );
};

// 10) Gazlı içecekler zayıf
const FizzyBad: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const x = useProgress(d(0.15), d(0.3));
  return (
    <g>
      <Paper />
      <Glass x={280} y={460} fill="#6b3a22" bubbles scale={1.6} />
      <Glass x={480} y={460} fill="#e5f6ff" bubbles scale={1.3} />
      <g opacity={x > 0 ? 1 : 0} stroke={RED} strokeWidth={22} strokeLinecap="round">
        <line x1={190} y1={170} x2={190 + 380 * x} y2={170 + 300 * x} />
        <line x1={570} y1={170} x2={570 - 380 * x} y2={170 + 300 * x} />
      </g>
      <Bust x={750} y={560} scale={0.95} mood="fire" />
      <Chip x={380} y={80} text="GAZLI = ZAYIF" delay={d(0.3)} />
    </g>
  );
};

// 11) Kapanış: yorum ve etiket
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const bubbles = ["HİÇ DAYANAMAM", "ORTA KARAR", "EN ACISI GELSİN!"];
  const a = [useAppear(d(0.15)), useAppear(d(0.3)), useAppear(d(0.45))];
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={1} mood="talk" />
      <Pepper x={110} y={170} scale={0.55} rotate={-30} />
      <ThoughtBubble x={240} y={110} r={60} delay={4}>
        <text x={0} y={16} fontFamily={uiFont} fontWeight={900} fontSize={50} textAnchor="middle" fill={OUTLINE}>
          ?
        </text>
      </ThoughtBubble>
      {bubbles.map((b, i) => (
        <g key={b} transform={place(610, 110 + i * 115, a[i])}>
          <rect x={-220} y={-40} width={440} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={i === 2 ? RED : OUTLINE}>
            {b}
          </text>
        </g>
      ))}
      <Chip x={610} y={490} text="@ETİKETLE" delay={d(0.6)} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  PepperHook,
  NotTaste,
  Capsaicin,
  HeatSensor,
  BrainFire,
  NobelLab,
  BirdPepper,
  DrinkTest,
  SkimMilk,
  FizzyBad,
  YourTurn,
};
