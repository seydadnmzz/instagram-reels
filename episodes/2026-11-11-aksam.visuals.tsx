// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Okurken dalıp gitmek / zihin gezinmesi (2026-11-11-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  NamePlate,
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
const WALL = "#e6dcff";
const FLOOR = "#b9a6e8";
const SKIN = "#f2c79a";
const PURPLE = "#8b5cf6";
const LILAC = "#c4b5fd";
const TEAL = "#3fb4a0";
const BLUE = "#5b8def";
const ORANGE = "#f59e42";
const GREY = "#a8a3b8";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Paper: React.FC<{ color?: string }> = ({ color = PAPER }) => <rect width={900} height={560} fill={color} />;

const RoomBg: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={WALL} />
    <rect y={450} width={900} height={110} fill={FLOOR} />
    <line x1={0} y1={450} x2={900} y2={450} stroke={OUTLINE} strokeWidth={5} />
  </g>
);

// Açık kitap; (0,0) sırt ortası. read: 0..1 okunan satır oranı (sarı vurgu ile)
const Book: React.FC<{
  x: number;
  y: number;
  scale?: number;
  read?: number;
  lines?: number;
  cover?: string;
  delay?: number;
  rotate?: number;
  faded?: boolean;
}> = ({ x, y, scale = 1, read = 0, lines = 7, cover = PURPLE, delay = 0, rotate = 0, faded = false }) => {
  const a = useAppear(delay);
  const total = lines * 2;
  const readLines = read * total;
  return (
    <g transform={place(x, y, scale * a, rotate)}>
      <path d="M -170 -110 L -170 110 Q -85 96 0 120 Q 85 96 170 110 L 170 -110 Z" fill={cover} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -160 -118 Q -80 -132 0 -108 L 0 108 Q -80 86 -160 100 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 160 -118 Q 80 -132 0 -108 L 0 108 Q 80 86 160 100 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      {Array.from({ length: total }).map((_, i) => {
        const side = i < lines ? -1 : 1;
        const row = i % lines;
        const y0 = -84 + row * 26;
        const len = row === lines - 1 ? 70 : 118;
        const x0 = side < 0 ? -140 : 22;
        const fill = Math.max(0, Math.min(1, readLines - i));
        return (
          <g key={i}>
            {fill > 0 ? <rect x={x0 - 4} y={y0 - 9} width={(len + 8) * fill} height={18} rx={6} fill={YELLOW} opacity={0.75} /> : null}
            <line x1={x0} y1={y0} x2={x0 + len} y2={y0} stroke={faded ? "#d6d2e2" : GREY} strokeWidth={7} strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
};

// Belden yukarı karakter; (0,0) gövdenin alt ortası, kafa merkezi y=-200.
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  look?: number;
  lookY?: number;
  surprised?: boolean;
  dreamy?: boolean;
  shirt?: string;
  hair?: string;
  delay?: number;
}> = ({ x, y, scale = 1, look = 0, lookY = 0, surprised = false, dreamy = false, shirt = TEAL, hair = "#4a2f1d", delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const blink = frame % 90 > 85 ? 0.15 : 1;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <g transform={`translate(0 ${-196 * (1 - blink)}) scale(1 ${blink})`}>
        <circle cx={-26} cy={-196} r={15} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={26} cy={-196} r={15} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-26 + look * 7} cy={-196 + lookY * 6} r={7} fill={OUTLINE} />
        <circle cx={26 + look * 7} cy={-196 + lookY * 6} r={7} fill={OUTLINE} />
        {dreamy ? (
          <g>
            <path d="M -42 -200 Q -26 -210 -10 -200" fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
            <path d="M 10 -200 Q 26 -210 42 -200" fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
            <rect x={-44} y={-214} width={36} height={14} fill={SKIN} />
            <rect x={8} y={-214} width={36} height={14} fill={SKIN} />
          </g>
        ) : null}
      </g>
      {surprised ? (
        <ellipse cx={0} cy={-158} rx={12} ry={15} fill="#7a2e2e" stroke={OUTLINE} strokeWidth={5} />
      ) : dreamy ? (
        <path d="M -16 -160 Q 0 -150 18 -164" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      ) : (
        <path d="M -22 -164 Q 0 -150 22 -164" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      )}
      <path d="M -44 -226 Q -28 -236 -12 -228" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" transform={surprised ? "translate(0 -8)" : undefined} />
      <path d="M 12 -228 Q 28 -236 44 -226" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" transform={surprised ? "translate(0 -8)" : undefined} />
      <circle cx={-48} cy={-172} r={10} fill="#f59ab0" opacity={0.6} />
      <circle cx={48} cy={-172} r={10} fill="#f59ab0" opacity={0.6} />
    </g>
  );
};

// Bulut biçimli düşünce balonu; (0,0) merkez, w×h boyut
const Cloud: React.FC<{ x: number; y: number; w?: number; h?: number; tail?: [number, number]; delay?: number; children?: React.ReactNode }> = ({
  x,
  y,
  w = 300,
  h = 200,
  tail,
  delay = 0,
  children,
}) => {
  const a = useAppear(delay);
  const bumps = 10;
  const pts = Array.from({ length: bumps }).map((_, i) => {
    const ang = (i / bumps) * Math.PI * 2;
    return [Math.cos(ang) * (w / 2 - 22), Math.sin(ang) * (h / 2 - 22)];
  });
  return (
    <g transform={place(x, y, a)}>
      {tail ? (
        <g>
          <circle cx={tail[0] * 0.55} cy={tail[1] * 0.55} r={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <circle cx={tail[0] * 0.85} cy={tail[1] * 0.85} r={9} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        </g>
      ) : null}
      {pts.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={Math.min(w, h) * 0.2} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      ))}
      <ellipse rx={w / 2 - 20} ry={h / 2 - 20} fill="#fff" />
      {children}
    </g>
  );
};

// Büyük göz; look: -1..1 göz bebeği yatay konumu
const Eye: React.FC<{ x: number; y: number; scale?: number; look: number; lookY?: number; delay?: number }> = ({
  x,
  y,
  scale = 1,
  look,
  lookY = 0,
  delay = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -150 0 Q 0 -120 150 0 Q 0 120 -150 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={7} strokeLinejoin="round" />
      <g transform={`translate(${look * 70} ${lookY * 25})`}>
        <circle r={42} fill={BLUE} stroke={OUTLINE} strokeWidth={5} />
        <circle r={20} fill={OUTLINE} />
        <circle cx={-12} cy={-12} r={8} fill="#fff" />
      </g>
      <path d="M -150 0 Q 0 -120 150 0" fill="none" stroke={OUTLINE} strokeWidth={9} strokeLinecap="round" />
      {[-90, -45, 0, 45, 90].map((dx) => (
        <line key={dx} x1={dx} y1={-62 - (Math.abs(dx) < 50 ? 6 : 0)} x2={dx * 1.15} y2={-92} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      ))}
    </g>
  );
};

// Hayal: palmiye ve güneşli kumsal (düşünce balonu içi)
const BeachDream: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const sway = useWave(60, 4);
  return (
    <g transform={place(0, 0, scale)}>
      <circle cx={60} cy={-40} r={30} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <path d="M -120 40 Q 0 10 120 40 L 120 60 L -120 60 Z" fill="#7cc8f0" stroke={OUTLINE} strokeWidth={4} />
      <path d="M -120 50 Q -40 30 40 54 L -120 60 Z" fill="#f6d68a" />
      <g transform={`rotate(${sway} -50 50)`}>
        <path d="M -50 50 Q -56 0 -44 -40" fill="none" stroke="#8a5a2b" strokeWidth={9} strokeLinecap="round" />
        {[-150, -100, -40, 10, 60].map((ang) => (
          <path key={ang} transform={`translate(-44 -40) rotate(${ang})`} d="M 0 0 Q 22 -14 46 0 Q 22 6 0 0 Z" fill="#4caf6a" stroke={OUTLINE} strokeWidth={3} />
        ))}
      </g>
    </g>
  );
};

// Pizza dilimi (düşünce balonu içi)
const Pizza: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <path d="M -50 -40 L 50 -40 L 0 60 Z" fill="#f6c453" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -56 -48 Q 0 -66 56 -48 L 50 -36 Q 0 -52 -50 -36 Z" fill="#d48a3a" stroke={OUTLINE} strokeWidth={4} />
    <circle cx={-14} cy={-14} r={9} fill={RED} />
    <circle cx={16} cy={-8} r={8} fill={RED} />
    <circle cx={0} cy={22} r={7} fill={RED} />
  </g>
);

// 1) Sayfa bitti, akılda hiçbir şey yok
const BlankPage: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const end = Math.round(durationInFrames * 0.4);
  const read = interpolate(frame, [4, end], [0, 1], clamp);
  const done = frame > end;
  return (
    <g>
      <RoomBg />
      <Bust x={250} y={530} scale={0.95} look={done ? 0.4 : -0.2 + read * 0.6} lookY={done ? -0.4 : 1} surprised={done} delay={0} />
      <Book x={250} y={490} scale={0.7} read={read} delay={2} rotate={-4} />
      <Cloud x={660} y={210} w={300} h={220} tail={[-210, 120]} delay={end}>
        <text x={0} y={22} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={60} fill={GREY}>
          . . .
        </text>
      </Cloud>
      {done ? <QuestionMark x={660} y={90} size={60} delay={end + 6} /> : null}
      <Chip x={660} y={420} text="NE OKUDUM?" delay={end + 10} />
    </g>
  );
};

// 2) Göz satırda, akıl başka yerde
const MindAway: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.3);
  const read = interpolate(frame, [0, durationInFrames], [0.1, 0.6], clamp);
  return (
    <g>
      <RoomBg />
      <Bust x={220} y={560} scale={0.95} look={0.2} lookY={1} dreamy delay={0} />
      <Book x={220} y={490} scale={0.68} read={read} delay={0} rotate={-4} />
      <Cloud x={620} y={220} w={400} h={290} tail={[-240, 110]} delay={d}>
        <BeachDream scale={1.1} />
        <Pizza x={-110} y={-50} scale={0.6} />
      </Cloud>
      <Chip x={220} y={70} text="GÖZ: KİTAPTA" delay={4} />
      <Chip x={640} y={480} text="AKIL: TATİLDE" delay={d + 10} />
    </g>
  );
};

// 3) Okuma süresinin ~beşte biri ile üçte biri
const ReadingPie: Visual = ({ durationInFrames }) => {
  const p = useProgress(6, Math.round(durationInFrames * 0.45));
  const a = useAppear(0);
  const frac = 0.25 * p;
  const ang = frac * Math.PI * 2;
  const r = 170;
  const large = frac > 0.5 ? 1 : 0;
  const ex = Math.sin(ang) * r;
  const ey = -Math.cos(ang) * r;
  return (
    <g>
      <Paper />
      <g transform={place(270, 290, a)}>
        <circle r={r} fill={LILAC} stroke={OUTLINE} strokeWidth={6} />
        {frac > 0.001 ? <path d={`M 0 0 L 0 ${-r} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} Z`} fill={ORANGE} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" /> : null}
        <g transform="translate(-40 40) scale(0.32)">
          <Book x={0} y={0} read={0} />
        </g>
        <g transform={place(Math.sin(ang / 2) * 110, -Math.cos(ang / 2) * 110, p)}>
          <circle r={30} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <text y={12} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={34} fill={ORANGE}>
            ?
          </text>
        </g>
      </g>
      <BigText x={680} y={200} text="1/5 – 1/3" size={84} color={ORANGE} delay={Math.round(durationInFrames * 0.45)} />
      <NamePlate x={680} y={300} text="OKURKEN AKLIN BAŞKA YERDE" delay={Math.round(durationInFrames * 0.5)} />
      <Chip x={680} y={400} text="DERLEME · 2021" delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

// 4) Fark etmeden paragraflar geçiyor, sonra uyanış
const WakeUp: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const wake = Math.round(durationInFrames * 0.6);
  const cursor = interpolate(frame, [0, wake], [0, 1], clamp);
  const woke = frame > wake;
  const paras = 4;
  const zz = useWave(30, 0.2);
  return (
    <g>
      <Paper />
      {/* Uzun sayfa */}
      <g transform={place(560, 285, useAppear(0))}>
        <rect x={-170} y={-250} width={340} height={500} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        {Array.from({ length: paras }).map((_, p) =>
          Array.from({ length: 4 }).map((__, l) => {
            const y = -210 + p * 118 + l * 24;
            const passed = cursor * paras > p + (l + 1) / 4;
            return (
              <line key={`${p}-${l}`} x1={-140} y1={y} x2={l === 3 ? 40 : 140} y2={y} stroke={passed ? "#ddd8ea" : GREY} strokeWidth={8} strokeLinecap="round" />
            );
          }),
        )}
        {/* Göz imleci */}
        <g transform={`translate(${-150 + ((frame * 9) % 290)} ${-210 + cursor * 380})`}>
          <ellipse rx={20} ry={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle r={7} fill={BLUE} />
        </g>
      </g>
      <Bust x={190} y={560} scale={0.9} look={woke ? -0.2 : 0.6} lookY={woke ? -0.6 : 0.6} dreamy={!woke} surprised={woke} delay={0} />
      {!woke ? (
        <text x={260} y={210} fontFamily={uiFont} fontWeight={800} fontSize={44} fill={PURPLE} opacity={0.8 + zz}>
          z z
        </text>
      ) : null}
      {woke ? <BigText x={300} y={150} text="HA?!" size={80} color={YELLOW} delay={wake} /> : null}
      <Chip x={560} y={510} text="4 PARAGRAF GEÇTİ!" delay={wake + 6} />
    </g>
  );
};

// Kamera (göz izleme cihazı)
const Camera: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const on = Math.floor(frame / 12) % 2 === 0;
  return (
    <g transform={place(x, y, a)}>
      <line x1={0} y1={30} x2={-40} y2={150} stroke={OUTLINE} strokeWidth={6} />
      <line x1={0} y1={30} x2={40} y2={150} stroke={OUTLINE} strokeWidth={6} />
      <line x1={0} y1={30} x2={0} y2={150} stroke={OUTLINE} strokeWidth={6} />
      <rect x={-60} y={-30} width={110} height={64} rx={12} fill="#3b3557" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-90} y={-20} width={36} height={44} rx={6} fill="#5a527a" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-90} cy={2} r={14} fill="#9fd3ff" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={34} cy={-14} r={7} fill={on ? RED : "#7a2e2e"} />
    </g>
  );
};

// 5) Göz takibi deneyi
const EyeTracker: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const scan = useProgress(10, Math.round(durationInFrames * 0.5));
  const look = Math.sin(frame / 8) * 0.6;
  return (
    <g>
      <RoomBg />
      {/* Masa */}
      <rect x={60} y={400} width={420} height={22} fill="#a8774a" stroke={OUTLINE} strokeWidth={5} />
      <Bust x={250} y={420} scale={0.9} look={look} lookY={1} shirt={ORANGE} hair="#2e2a24" delay={0} />
      <Book x={250} y={385} scale={0.45} read={0.3 + (frame % 90) / 300} delay={4} rotate={-6} />
      <Camera x={720} y={300} delay={8} />
      {/* Tarama ışını */}
      <g opacity={scan * (0.6 + useWave(20, 0.2))}>
        <path d="M 630 302 L 290 210 L 290 260 Z" fill={RED} opacity={0.25} />
        <line x1={630} y1={302} x2={290} y2={236} stroke={RED} strokeWidth={4} strokeDasharray="12 10" />
      </g>
      <NamePlate x={720} y={120} text="GÖZ TAKİBİ" delay={14} />
      <Chip x={250} y={500} text="ROMAN" delay={18} />
    </g>
  );
};

// 6) Akıl dalınca da gözler satırda kaymaya devam ediyor
const RobotEyes: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const words = ["ELİNOR", "PENCEREDEN", "BAKTI", "VE", "SESSİZCE"];
  const step = Math.floor(frame / 9) % words.length;
  const xs = [150, 330, 500, 610, 750];
  const d = Math.round(durationInFrames * 0.35);
  return (
    <g>
      <Paper />
      <Cloud x={680} y={110} w={260} h={150} delay={d}>
        <Pizza x={-50} y={4} scale={0.5} />
        <text x={40} y={14} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={40} fill={PURPLE}>
          ♪ ♪
        </text>
      </Cloud>
      <Eye x={300} y={150} scale={0.8} look={-1 + (step / (words.length - 1)) * 2} lookY={0.6} delay={0} />
      {/* Metin satırı */}
      <rect x={50} y={300} width={800} height={110} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {words.map((w, i) => (
        <text key={w} x={xs[i]} y={368} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={i === 1 ? 28 : 30} fill={i === step ? OUTLINE : "#8a849c"}>
          {w}
        </text>
      ))}
      <circle cx={xs[step]} cy={326} r={12} fill={RED} stroke={OUTLINE} strokeWidth={3} />
      <Chip x={250} y={480} text="GÖZ: DEVAM" delay={6} />
      <Chip x={650} y={480} text="AKIL: YOK" dark delay={d + 8} />
    </g>
  );
};

// 7) Nadir kelimede duraksama dalgınken kayboluyor
const WordPause: Visual = ({ durationInFrames }) => {
  const g1 = useProgress(4, Math.round(durationInFrames * 0.35));
  const g2 = useProgress(Math.round(durationInFrames * 0.35), Math.round(durationInFrames * 0.55));
  const words = ["BİR", "GÜN", "TEKİNSİZ", "BİR", "SES"];
  const xs = [330, 430, 570, 710, 800];
  const focus = [40, 44, 120, 38, 46];
  const zoned = [80, 80, 80, 80, 80];
  const Row: React.FC<{ y: number; vals: number[]; p: number; color: string; label: string; delay: number }> = ({ y, vals, p, color, label, delay }) => (
    <g>
      <g transform={place(130, y - 20, useAppear(delay))}>
        <rect x={-110} y={-30} width={220} height={60} rx={14} fill={color} stroke={OUTLINE} strokeWidth={5} />
        <text y={11} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={28} fill="#fff">
          {label}
        </text>
      </g>
      {words.map((w, i) => (
        <g key={i}>
          <rect x={xs[i] - 26} y={y - vals[i] * p} width={52} height={vals[i] * p} rx={6} fill={color} stroke={OUTLINE} strokeWidth={4} />
          <text x={xs[i]} y={y + 34} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={i === 2 ? 22 : 24} fill={i === 2 ? RED : OUTLINE}>
            {w}
          </text>
        </g>
      ))}
      <line x1={270} y1={y} x2={850} y2={y} stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
  return (
    <g>
      <Paper />
      <Row y={210} vals={focus} p={g1} color={TEAL} label="DİKKATLİ" delay={0} />
      <Row y={470} vals={zoned} p={g2} color={PURPLE} label="DALGIN" delay={Math.round(durationInFrames * 0.32)} />
      <Chip x={570} y={50} text="NADİR KELİME: UZUN BAKIŞ" delay={Math.round(durationInFrames * 0.3)} />
    </g>
  );
};

// 8) Otomatik pilot: kelimeler beyne ulaşmıyor
const AutoPilot: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const words = ["KELİME", "CÜMLE", "FİKİR"];
  return (
    <g>
      <Paper />
      <Eye x={170} y={250} scale={0.6} look={Math.sin(frame / 6)} delay={0} />
      {/* Bant */}
      <rect x={260} y={300} width={360} height={30} rx={15} fill="#5a527a" stroke={OUTLINE} strokeWidth={5} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={280 + i * 64} cy={315} r={8} fill={GREY} />
      ))}
      {words.map((w, i) => {
        const t = ((frame + i * 25) % 75) / 75;
        const x = 270 + t * 360;
        const bounce = t > 0.8 ? -Math.sin(((t - 0.8) / 0.2) * Math.PI) * 60 : 0;
        return (
          <g key={w} transform={place(x, 280 + bounce, 1, t > 0.8 ? (t - 0.8) * 200 : 0)} opacity={t > 0.95 ? 0 : 1}>
            <rect x={-56} y={-20} width={112} height={40} rx={8} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <text y={9} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={22} fill={OUTLINE}>
              {w}
            </text>
          </g>
        );
      })}
      <Brain x={740} y={280} scale={0.9} mood="confused" delay={6} />
      <text x={790} y={150} fontFamily={uiFont} fontWeight={800} fontSize={46} fill={PURPLE} opacity={0.7 + useWave(30, 0.3)}>
        Z z
      </text>
      <Chip x={450} y={120} text="OTOMATİK PİLOT" delay={4} />
      <Chip x={600} y={470} text="ANLAMA DÜŞÜYOR" dark delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

// 9) İkinci okumada akıl daha çok dalıyor
const Reread: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const grow = useProgress(d, d + 30);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <Book x={220} y={410} scale={0.62} read={0.5} delay={0} />
      <Book x={660} y={410} scale={0.62} read={0.5} cover={ORANGE} delay={d} faded />
      <Chip x={220} y={515} text="1. OKUMA" delay={4} />
      <Chip x={660} y={515} text="2. OKUMA" delay={d + 4} />
      <Cloud x={220} y={200} w={160} h={110} tail={[0, 110]} delay={8}>
        <text y={14} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={36} fill={GREY}>
          ...
        </text>
      </Cloud>
      <g transform={place(660, 190, 0.6 + grow * 0.5)}>
        <Cloud x={0} y={0} w={300} h={200} tail={[0, 150]} delay={d + 6}>
          <BeachDream scale={0.7} />
        </Cloud>
      </g>
      <Arrow from={[360, 120]} to={[470, 120]} progress={useProgress(d + 10, d + 24)} color={RED} />
      <BigText x={415} y={70} text="DAHA ÇOK!" size={40} color={YELLOW} delay={d + 26} />
      <Sparkles points={[[540, 70], [800, 90], [820, 300]].map(([x, y]) => [x, y + Math.sin(frame / 10) * 4] as [number, number])} />
    </g>
  );
};

// 10) Ara ara mini sınav: dalgınlık yarıya iniyor
const QuizBreak: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const play = interpolate(frame, [0, durationInFrames * 0.4], [0, 1], clamp);
  const quiz = Math.floor(play * 3.999);
  const barT = Math.round(durationInFrames * 0.3);
  const b = useProgress(barT, barT + 20);
  const quizPop = useAppear(Math.round((Math.max(1, quiz) / 4) * durationInFrames * 0.4));
  return (
    <g>
      <Paper />
      {/* Dizüstü bilgisayar */}
      <g transform={place(270, 260, useAppear(0))}>
        <rect x={-200} y={-150} width={400} height={250} rx={14} fill="#3b3557" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-180} y={-132} width={360} height={200} rx={6} fill="#fff" />
        <path d="M -230 100 L 230 100 L 250 130 L -250 130 Z" fill="#8f88a8" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        {/* İlerleme çubuğu */}
        <rect x={-160} y={40} width={320} height={10} rx={5} fill="#ddd" />
        <rect x={-160} y={40} width={320 * play} height={10} rx={5} fill={RED} />
        {[1, 2, 3].map((q) => (
          <circle key={q} cx={-160 + (320 * q) / 4} cy={45} r={9} fill={quiz >= q ? YELLOW : "#fff"} stroke={OUTLINE} strokeWidth={3} />
        ))}
        {quiz > 0 && play < 1 ? (
          <g transform={place(0, -40, quizPop)}>
            <rect x={-110} y={-44} width={220} height={88} rx={14} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
            <text y={14} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={38} fill={OUTLINE}>
              SORU {quiz}?
            </text>
          </g>
        ) : (
          <path d="M -24 -70 L 30 -40 L -24 -10 Z" fill={PURPLE} stroke={OUTLINE} strokeWidth={4} />
        )}
      </g>
      {/* Sütun grafiği */}
      <line x1={560} y1={440} x2={860} y2={440} stroke={OUTLINE} strokeWidth={5} />
      <rect x={590} y={440 - 280 * b} width={100} height={280 * b} rx={8} fill={GREY} stroke={OUTLINE} strokeWidth={5} />
      <rect x={730} y={440 - 140 * b} width={100} height={140 * b} rx={8} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
      <text x={640} y={480} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={24} fill={OUTLINE}>
        SINAVSIZ
      </text>
      <text x={780} y={480} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={24} fill={OUTLINE}>
        SINAVLI
      </text>
      <text x={710} y={110} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={26} fill={PURPLE} opacity={b}>
        DALGINLIK
      </text>
      <Chip x={270} y={490} text="YARIYA İNDİ!" delay={barT + 22} />
    </g>
  );
};

// 11) Kapanış
const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <Book x={240} y={300} scale={0.85} read={((frame % 120) / 120) * 0.8} delay={0} rotate={useWave(80, 3)} />
      <Cloud x={640} y={210} w={300} h={220} delay={6}>
        <BeachDream scale={0.8} />
      </Cloud>
      <QuestionMark x={450} y={110} size={90} delay={10} />
      <Chip x={450} y={480} text="YORUMLARA YAZ!" delay={16} />
      <Sparkles points={[[380, 300], [820, 380], [90, 120]]} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  BlankPage,
  MindAway,
  ReadingPie,
  WakeUp,
  EyeTracker,
  RobotEyes,
  WordPause,
  AutoPilot,
  Reread,
  QuizBreak,
  YourTurn,
};
