// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Rüyaları neden hemen unutuyoruz? (2026-11-23-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import { Arrow, BigText, Brain, Chip, NamePlate, place, QuestionMark, Sparkles, uiFont, useAppear, useProgress, useWave } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#f3efff";
const NIGHT = "#2c2550";
const SKIN = "#f2c79a";
const PURPLE = "#8a6cf0";
const LILAC = "#c9b8ff";
const PINK = "#ff6b8b";
const TEAL = "#17c3a5";
const ORANGE = "#ff8a2b";
const GREEN = "#4cc35a";
const RED2 = "#e5484d";
const GREY = "#b9b2aa";
const MOONY = "#ffe27a";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

const NightSky: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={NIGHT} />
    <Sparkles points={[[70, 60], [210, 120], [820, 70], [700, 150], [480, 40], [860, 230]]} color={MOONY} />
  </g>
);

// Ay (hilal)
const Moon: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 40 }) => (
  <path
    transform={place(x, y)}
    d={`M ${r * 0.2} ${-r} A ${r} ${r} 0 1 0 ${r * 0.2} ${r} A ${r * 0.75} ${r * 0.75} 0 1 1 ${r * 0.2} ${-r} Z`}
    fill={MOONY}
    stroke={OUTLINE}
    strokeWidth={4}
  />
);

// Yatak + yatan kişi. (0,0) yatağın ön alt ortası. eyes: 0 kapalı → 1 açık
const Bed: React.FC<{ x: number; y: number; scale?: number; eyes?: number; blanket?: string; sitting?: number }> = ({
  x,
  y,
  scale = 1,
  eyes = 0,
  blanket = PURPLE,
  sitting = 0,
}) => {
  const frame = useCurrentFrame();
  const breathe = Math.sin(frame / 20) * 3 * (1 - eyes);
  const headX = -150 + sitting * 30;
  const headY = -150 - sitting * 70;
  return (
    <g transform={place(x, y, scale)}>
      {/* karyola */}
      <rect x={-250} y={-200} width={30} height={200} rx={8} fill="#8a5a32" stroke={OUTLINE} strokeWidth={5} />
      <rect x={220} y={-120} width={30} height={120} rx={8} fill="#8a5a32" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-235} y={-90} width={470} height={60} rx={10} fill="#a8703e" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-225} y={-120} width={450} height={40} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {/* yastık */}
      <ellipse cx={-160} cy={-128} rx={62} ry={26} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      {/* kafa */}
      <g transform={`translate(${headX} ${headY})`}>
        <circle cx={0} cy={0} r={44} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -44 -4 Q -44 -52 0 -50 Q 44 -52 44 -6 Q 22 -26 0 -24 Q -24 -26 -44 -4 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        {eyes < 0.5 ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round">
            <path d="M -24 4 Q -16 10 -8 4" />
            <path d="M 8 4 Q 16 10 24 4" />
          </g>
        ) : (
          <g>
            <circle cx={-16} cy={2} r={9} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={16} cy={2} r={9} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={-15} cy={3} r={4} fill={OUTLINE} />
            <circle cx={17} cy={3} r={4} fill={OUTLINE} />
          </g>
        )}
        {eyes < 0.5 ? (
          <path d="M -8 24 Q 0 28 8 24" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : (
          <ellipse cx={0} cy={24} rx={6} ry={8} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={3} />
        )}
      </g>
      {/* yorgan */}
      <path
        d={`M ${-110 + sitting * 20} ${-150 + breathe - sitting * 10} Q 40 ${-190 + breathe} 230 -130 L 230 -80 L -120 -80 Z`}
        fill={blanket}
        stroke={OUTLINE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path d={`M -60 ${-140 + breathe} Q 60 ${-160 + breathe} 200 -118`} fill="none" stroke="#fff" strokeWidth={4} opacity={0.5} />
    </g>
  );
};

// Rüya bulutu; içinde şato, gökkuşağı ve uçan balık. fade: 0 tam → 1 silinmiş
const DreamCloud: React.FC<{ x: number; y: number; scale?: number; fade?: number; delay?: number }> = ({ x, y, scale = 1, fade = 0, delay = 0 }) => {
  const a = useAppear(delay);
  const frame = useCurrentFrame();
  const fishY = Math.sin(frame / 10) * 8;
  return (
    <g transform={place(x, y, scale * a)} opacity={1 - fade * 0.85}>
      <path
        d="M -170 40 C -220 30 -220 -40 -160 -50 C -160 -110 -80 -120 -50 -90 C -20 -140 70 -130 80 -80 C 140 -110 210 -60 180 0 C 220 40 170 90 120 70 C 90 110 -10 110 -40 80 C -80 110 -170 100 -170 40 Z"
        fill="#fff"
        stroke={OUTLINE}
        strokeWidth={6}
      />
      <g opacity={1 - fade}>
        {/* gökkuşağı */}
        {[PINK, ORANGE, MOONY, TEAL, PURPLE].map((c, i) => (
          <path key={c} d={`M ${-120 + i * 10} 50 A ${100 - i * 10} ${90 - i * 10} 0 0 1 ${80 - i * 10} 50`} fill="none" stroke={c} strokeWidth={10} />
        ))}
        {/* şato */}
        <g transform="translate(90 10)">
          <rect x={-30} y={-20} width={60} height={60} fill={LILAC} stroke={OUTLINE} strokeWidth={4} />
          <rect x={-42} y={-50} width={22} height={90} fill={LILAC} stroke={OUTLINE} strokeWidth={4} />
          <rect x={20} y={-50} width={22} height={90} fill={LILAC} stroke={OUTLINE} strokeWidth={4} />
          <path d="M -46 -50 L -31 -80 L -16 -50 Z M 16 -50 L 31 -80 L 46 -50 Z" fill={PINK} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
          <path d="M -10 40 L -10 15 Q 0 2 10 15 L 10 40 Z" fill="#6b4a2b" stroke={OUTLINE} strokeWidth={3} />
        </g>
        {/* uçan balık */}
        <g transform={`translate(-100 ${-40 + fishY})`}>
          <ellipse cx={0} cy={0} rx={30} ry={16} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
          <path d="M 28 0 L 48 -14 L 48 14 Z" fill={ORANGE} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
          <circle cx={-14} cy={-4} r={4} fill={OUTLINE} />
          <path d="M -2 -14 Q 10 -40 26 -20" fill="#fff" stroke={OUTLINE} strokeWidth={3} />
        </g>
      </g>
    </g>
  );
};

// Silinirken uçuşan parçacıklar
const Dust: React.FC<{ x: number; y: number; progress: number }> = ({ x, y, progress }) => {
  const pts = [
    [-120, -40], [-60, -90], [20, -100], [100, -60], [150, 0], [-150, 30], [60, 60], [-30, 50],
  ];
  return (
    <g opacity={progress > 0 && progress < 1 ? 1 - progress * 0.7 : 0}>
      {pts.map(([dx, dy], i) => (
        <rect
          key={i}
          x={x + dx + progress * (60 + i * 15)}
          y={y + dy - progress * (80 + i * 10)}
          width={16}
          height={16}
          rx={3}
          fill={[PINK, ORANGE, TEAL, PURPLE][i % 4]}
          stroke={OUTLINE}
          strokeWidth={2}
          transform={`rotate(${progress * 200 + i * 30} ${x + dx} ${y + dy})`}
        />
      ))}
    </g>
  );
};

// 1) Kanca: rüya görüyor, gözünü açınca rüya silinip gidiyor
const DreamFade: Visual = ({ durationInFrames }) => {
  const wake = useProgress(durationInFrames * 0.35, durationInFrames * 0.42);
  const fade = useProgress(durationInFrames * 0.42, durationInFrames * 0.75);
  const sky = interpolate(wake, [0, 1], [0, 1]);
  return (
    <g>
      <rect width={900} height={560} fill={sky > 0.5 ? "#ffe9c9" : NIGHT} />
      {sky > 0.5 ? (
        <g>
          <circle cx={800} cy={90} r={46} fill={MOONY} stroke={OUTLINE} strokeWidth={5} />
          <Sparkles points={[[740, 60], [850, 160]]} color={ORANGE} />
        </g>
      ) : (
        <g>
          <Moon x={790} y={90} />
          <Sparkles points={[[90, 60], [660, 60], [850, 200]]} color={MOONY} />
        </g>
      )}
      <Bed x={330} y={540} scale={1.05} eyes={wake} />
      <DreamCloud x={560} y={200} scale={1.05} fade={fade} delay={4} />
      <Dust x={560} y={200} progress={fade} />
      {fade > 0.6 ? <QuestionMark x={560} y={200} size={110} delay={Math.round(durationInFrames * 0.7)} /> : null}
    </g>
  );
};

// 2) Peki neden? Kafası karışık beyin, etrafında rüya kırıntıları
const WhyDreams: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      {[0, 1, 2, 3, 4].map((i) => {
        const ang = (i / 5) * Math.PI * 2 + frame / 40;
        return (
          <g key={i} transform={`translate(${450 + Math.cos(ang) * 290} ${290 + Math.sin(ang) * 170})`}>
            <path d="M -40 10 C -50 -14 -20 -30 -2 -18 C 10 -34 44 -26 40 0 C 54 16 30 30 10 22 C -6 34 -36 30 -40 10 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} opacity={0.9} />
          </g>
        );
      })}
      <Brain x={450} y={300} scale={1.4} mood="confused" />
      <QuestionMark x={640} y={150} size={90} delay={10} />
      <QuestionMark x={260} y={140} size={70} delay={18} color={PURPLE} />
      <Chip x={450} y={500} text="ZOR BİR İŞ!" delay={Math.round(durationInFrames * 0.4)} />
    </g>
  );
};

// Uyku başlığı (beyin maskotu için)
const NightCap: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const sway = useWave(50, 6);
  return (
    <g transform={place(x, y, 1, -18 + sway)}>
      <path d="M -70 0 Q 0 -150 90 -60 Q 40 -60 50 0 Z" fill={PURPLE} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-78} y={-8} width={140} height={26} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={92} cy={-58} r={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

// Kayıt cihazı; rec 0 kapalı (gri), 1 açık (kırmızı yanıp sönen)
const Recorder: React.FC<{ x: number; y: number; rec: number; delay?: number }> = ({ x, y, rec, delay = 0 }) => {
  const a = useAppear(delay);
  const frame = useCurrentFrame();
  const on = rec > 0.5;
  const blink = on && Math.floor(frame / 10) % 2 === 0;
  return (
    <g transform={place(x, y, a)}>
      <rect x={-110} y={-70} width={190} height={140} rx={20} fill="#3a3a4a" stroke={OUTLINE} strokeWidth={6} />
      <path d="M 80 -40 L 140 -70 L 140 70 L 80 40 Z" fill="#555569" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-15} cy={0} r={42} fill="#1d1d28" stroke="#777" strokeWidth={6} />
      <circle cx={-15} cy={0} r={18} fill="#4a4a7a" />
      <circle cx={-80} cy={-44} r={12} fill={on ? (blink ? RED2 : "#7a2b2b") : GREY} stroke={OUTLINE} strokeWidth={3} />
      <text x={-50} y={-36} fontFamily={uiFont} fontWeight={800} fontSize={22} fill={on ? "#fff" : GREY}>
        REC
      </text>
    </g>
  );
};

// 3) Uyuyan beyin kayıt yapamıyor; uyanınca kayıt başlıyor
const NoRecording: Visual = ({ durationInFrames }) => {
  const wake = useProgress(durationInFrames * 0.55, durationInFrames * 0.62);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper fill={wake > 0.5 ? PAPER : "#d9d0ff"} />
      <g opacity={wake > 0.5 ? 0 : 1}>
        {[0, 1, 2].map((i) => {
          const t = ((frame + i * 20) % 60) / 60;
          return (
            <text key={i} x={330 + t * 60 + i * 10} y={150 - t * 80} fontFamily={uiFont} fontWeight={800} fontSize={40 + i * 8} fill={PURPLE} opacity={1 - t}>
              Z
            </text>
          );
        })}
      </g>
      <Brain x={250} y={310} scale={1.3} mood={wake > 0.5 ? "happy" : "confused"} />
      {wake <= 0.5 ? <NightCap x={240} y={200} /> : null}
      <Recorder x={650} y={270} rec={wake} delay={6} />
      {wake <= 0.5 ? (
        <Chip x={640} y={430} text="KAYIT KAPALI" dark delay={14} />
      ) : (
        <Chip x={640} y={430} text="UYAN → KAYDET" delay={0} />
      )}
      {wake > 0.5 ? <Sparkles points={[[140, 170], [370, 180], [250, 460]]} /> : null}
    </g>
  );
};

// Küçük takvim kartı; marks: işaretli günler
const CalCard: React.FC<{ x: number; y: number; title: string; days: number; marks: number[]; color: string; delay: number; markDelay: number }> = ({
  x,
  y,
  title,
  days,
  marks,
  color,
  delay,
  markDelay,
}) => {
  const a = useAppear(delay);
  const frame = useCurrentFrame();
  const cols = 7;
  const rows = Math.ceil(days / cols);
  const cell = 44;
  const w = cols * cell + 30;
  const h = rows * cell + 80;
  return (
    <g transform={place(x, y, a)}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-w / 2} y={-h / 2} width={w} height={54} rx={16} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <text x={0} y={-h / 2 + 37} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill="#fff">
        {title}
      </text>
      {Array.from({ length: days }).map((_, i) => {
        const cx = -w / 2 + 15 + (i % cols) * cell + cell / 2;
        const cy = -h / 2 + 64 + Math.floor(i / cols) * cell + cell / 2;
        const k = marks.indexOf(i);
        const shown = k >= 0 && frame > markDelay + k * 6;
        return (
          <g key={i}>
            <rect x={cx - 18} y={cy - 18} width={36} height={36} rx={6} fill={shown ? MOONY : "#f1eef8"} stroke={OUTLINE} strokeWidth={2} />
            {shown ? (
              <path d={`M ${cx - 12} ${cy + 6} C ${cx - 16} ${cy - 4} ${cx - 6} ${cy - 12} ${cx} ${cy - 6} C ${cx + 6} ${cy - 14} ${cx + 16} ${cy - 6} ${cx + 12} ${cy + 6} Z`} fill="#fff" stroke={OUTLINE} strokeWidth={2.5} />
            ) : null}
          </g>
        );
      })}
    </g>
  );
};

// 4) İki grup: haftada 5 sabah vs ayda 2 kez
const TwoGroups: Visual = ({ durationInFrames }) => {
  const d2 = Math.round(durationInFrames * 0.45);
  return (
    <g>
      <Paper />
      <CalCard x={230} y={250} title="1 HAFTA" days={7} marks={[0, 1, 3, 4, 6]} color={PURPLE} delay={2} markDelay={10} />
      <CalCard x={650} y={260} title="1 AY" days={28} marks={[9, 22]} color={GREY} delay={d2} markDelay={d2 + 8} />
      <Chip x={230} y={420} text="5 SABAH" delay={30} />
      <Chip x={650} y={470} text="2 KEZ" dark delay={d2 + 20} />
      <BigText x={440} y={260} text="≠" size={110} color={PINK} delay={d2 - 6} />
    </g>
  );
};

// Gece çizgisi üzerinde uyanma sivri uçları
const NightLine: React.FC<{ y: number; spikes: number[]; color: string; progress: number; label: string; delay: number }> = ({ y, spikes, color, progress, label, delay }) => {
  const a = useAppear(delay);
  const x0 = 170;
  const x1 = 820;
  const xEnd = x0 + (x1 - x0) * progress;
  let d = `M ${x0} ${y}`;
  spikes.forEach((s) => {
    const sx = x0 + (x1 - x0) * s;
    if (sx < xEnd) d += ` L ${sx - 10} ${y} L ${sx} ${y - 60} L ${sx + 10} ${y}`;
  });
  d += ` L ${xEnd} ${y}`;
  return (
    <g opacity={a}>
      <text x={150} y={y + 10} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="end" fill="#fff">
        {label}
      </text>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="#6b62a0" strokeWidth={6} strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />
      {spikes.map((s, i) => {
        const sx = x0 + (x1 - x0) * s;
        return sx < xEnd ? <circle key={i} cx={sx} cy={y - 74} r={10} fill={MOONY} stroke={OUTLINE} strokeWidth={3} /> : null;
      })}
    </g>
  );
};

// 5) Gece boyunca uyanmalar: sık hatırlayanlarda iki kat
const NightWakes: Visual = ({ durationInFrames }) => {
  const p = useProgress(6, durationInFrames * 0.7);
  return (
    <g>
      <NightSky />
      <Moon x={120} y={80} r={34} />
      <circle cx={830} cy={80} r={32} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
      <Arrow from={[180, 80]} to={[770, 80]} progress={p} color="#9b8fe0" />
      <NightLine y={230} spikes={[0.1, 0.22, 0.35, 0.47, 0.6, 0.72, 0.84, 0.95]} color={MOONY} progress={p} label="ÇOK" delay={2} />
      <NightLine y={400} spikes={[0.25, 0.55, 0.8, 0.92]} color={LILAC} progress={p} label="AZ" delay={8} />
      <Chip x={450} y={500} text="×2 UYANIKLIK" delay={Math.round(durationInFrames * 0.6)} />
    </g>
  );
};

// 6) Seslere duyarlı: çalar saat sesi, uyuyan kişinin gözü bir an açılıyor
const SoundReact: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const ring = Math.sin(frame / 2) * 6;
  const peek = frame > durationInFrames * 0.45 && frame < durationInFrames * 0.75 ? 1 : 0;
  return (
    <g>
      <NightSky />
      <Bed x={360} y={540} scale={1} eyes={peek} blanket={TEAL} />
      {/* çalar saat / ses kaynağı */}
      <g transform={place(760, 380, 1, ring)}>
        <circle cx={0} cy={0} r={56} fill={PINK} stroke={OUTLINE} strokeWidth={6} />
        <circle cx={0} cy={0} r={40} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <path d="M 0 0 L 0 -26 M 0 0 L 18 8" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <circle cx={-40} cy={-50} r={16} fill={MOONY} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={40} cy={-50} r={16} fill={MOONY} stroke={OUTLINE} strokeWidth={4} />
      </g>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 12) % 36) / 36;
        return (
          <path
            key={i}
            d={`M ${690 - t * 260} ${300 - t * 40} q -30 40 0 80`}
            transform={`translate(0 ${-t * 20})`}
            fill="none"
            stroke={MOONY}
            strokeWidth={7}
            strokeLinecap="round"
            opacity={1 - t}
          />
        );
      })}
      {peek ? <BigText x={210} y={230} text="!" size={100} color={MOONY} /> : null}
      <Chip x={450} y={60} text="DAHA GÜÇLÜ TEPKİ" delay={Math.round(durationInFrames * 0.2)} />
    </g>
  );
};

// Çizgi film fare; (0,0) gövde merkezi
const Mouse: React.FC<{ x: number; y: number; scale?: number; asleep?: boolean; flip?: boolean }> = ({ x, y, scale = 1, asleep = false, flip = false }) => {
  const tail = useWave(40, 10);
  const frame = useCurrentFrame();
  const breathe = asleep ? Math.sin(frame / 15) * 3 : 0;
  return (
    <g transform={`${place(x, y, scale)} scale(${flip ? -1 : 1} 1)`}>
      <path d={`M 80 20 Q 140 ${10 + tail} 170 ${-30 + tail}`} fill="none" stroke="#e88aa8" strokeWidth={8} strokeLinecap="round" />
      <ellipse cx={0} cy={breathe} rx={95} ry={60 + breathe} fill="#b9b8c8" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-70} cy={-50} r={34} fill="#b9b8c8" stroke={OUTLINE} strokeWidth={6} />
      <circle cx={-70} cy={-50} r={18} fill="#f5b3c7" />
      <path d="M -80 -10 Q -150 -20 -150 10 Q -140 30 -90 25" fill="#b9b8c8" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-152} cy={6} r={10} fill={PINK} stroke={OUTLINE} strokeWidth={3} />
      {asleep ? (
        <path d="M -112 -2 Q -104 4 -96 -2" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      ) : (
        <circle cx={-105} cy={-4} r={7} fill={OUTLINE} />
      )}
      <path d="M -140 14 L -175 8 M -140 18 L -175 24" stroke={OUTLINE} strokeWidth={2.5} />
    </g>
  );
};

// 7) Silgi hücreler: uyuyan farenin hafıza kartını silgi siliyor
const EraserCells: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const erase = useProgress(durationInFrames * 0.3, durationInFrames * 0.8);
  const ex = 520 + Math.sin(frame / 3) * 60;
  return (
    <g>
      <Paper fill="#d9d0ff" />
      <Mouse x={230} y={420} scale={1} asleep />
      <text x={300} y={300} fontFamily={uiFont} fontWeight={800} fontSize={40} fill={PURPLE}>
        Z z
      </text>
      {/* hafıza kartı */}
      <g transform={place(600, 220, useAppear(6))}>
        <rect x={-170} y={-100} width={340} height={200} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={-50} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={PURPLE}>
          ANI
        </text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={-130} y={-20 + i * 36} width={260 - i * 40} height={14} rx={7} fill={LILAC} />
        ))}
        <rect x={-170} y={-100} width={340 * erase} height={200} rx={18} fill="#fff" opacity={0.92} />
      </g>
      {/* silgi */}
      {erase > 0 && erase < 1 ? (
        <g transform={place(ex, 240 - Math.abs(Math.sin(frame / 3)) * 10, 1, -25)}>
          <rect x={-40} y={-60} width={80} height={120} rx={12} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
          <rect x={-40} y={-60} width={80} height={44} rx={12} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
        </g>
      ) : null}
      <Chip x={600} y={400} text="RÜYA UYKUSU" dark delay={10} />
      <NamePlate x={600} y={480} text="UNUTMAYA YARDIM EDEN HÜCRELER" delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

// 8) Dikkat: henüz farelerde. Fare → insan, ok üzerinde soru işareti
const MouseCaution: Visual = ({ durationInFrames }) => {
  const p = useProgress(durationInFrames * 0.3, durationInFrames * 0.55);
  const wob = useWave(30, 4);
  return (
    <g>
      <Paper />
      {/* uyarı tabelası */}
      <g transform={place(450, 110, useAppear(2), wob)}>
        <path d="M 0 -80 L 90 70 L -90 70 Z" fill={MOONY} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <text x={0} y={52} fontFamily={uiFont} fontWeight={800} fontSize={90} textAnchor="middle" fill={OUTLINE}>
          !
        </text>
      </g>
      <Mouse x={220} y={390} scale={0.9} />
      <Chip x={210} y={500} text="FARE" delay={8} />
      <Arrow from={[360, 380]} to={[560, 380]} progress={p} color={PURPLE} />
      {p > 0.9 ? <QuestionMark x={460} y={300} size={70} /> : null}
      {/* insan (belden yukarı) */}
      <g transform={place(700, 470, useAppear(Math.round(durationInFrames * 0.4)))}>
        <path d="M -90 0 L -80 -70 Q -75 -105 -40 -110 L 40 -110 Q 75 -105 80 -70 L 90 0 Z" fill={TEAL} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={0} cy={-170} r={60} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -60 -176 Q -58 -244 0 -240 Q 58 -244 60 -178 Q 34 -206 0 -202 Q -34 -204 -60 -176 Z" fill="#2f2f2f" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={-22} cy={-176} r={7} fill={OUTLINE} />
        <circle cx={22} cy={-176} r={7} fill={OUTLINE} />
        <path d="M -16 -138 Q -4 -146 6 -138 Q 14 -132 20 -140" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      </g>
      <Chip x={700} y={510} text="İNSAN?" dark delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

// Defter (rüya günlüğü)
const Notebook: React.FC<{ x: number; y: number; scale?: number; lines: number; rotate?: number }> = ({ x, y, scale = 1, lines, rotate = 0 }) => (
  <g transform={place(x, y, scale, rotate)}>
    <rect x={-120} y={-80} width={240} height={160} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-120} y={-80} width={26} height={160} rx={8} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={-80} y={-50 + i * 32} width={Math.max(0, Math.min(1, lines - i)) * (170 - i * 20)} height={8} rx={4} fill={PURPLE} opacity={0.7} />
    ))}
  </g>
);

// 9) Özet: rüya → kısa uyanma → kayıt
const Summary: Visual = ({ durationInFrames }) => {
  const p1 = useProgress(durationInFrames * 0.15, durationInFrames * 0.35);
  const p2 = useProgress(durationInFrames * 0.45, durationInFrames * 0.65);
  return (
    <g>
      <Paper />
      <DreamCloud x={150} y={250} scale={0.55} delay={2} />
      <Arrow from={[260, 250]} to={[350, 250]} progress={p1} color={PURPLE} />
      {/* göz açılıyor */}
      <g transform={place(450, 250, useAppear(Math.round(durationInFrames * 0.3)))}>
        <ellipse cx={0} cy={0} rx={80} ry={50} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <circle cx={0} cy={0} r={30} fill={PURPLE} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={0} cy={0} r={13} fill={OUTLINE} />
        <circle cx={10} cy={-10} r={6} fill="#fff" />
      </g>
      <Arrow from={[550, 250]} to={[640, 250]} progress={p2} color={PURPLE} />
      <g transform={place(750, 250, useAppear(Math.round(durationInFrames * 0.6)))}>
        <Notebook x={0} y={0} scale={0.75} lines={4} />
        <circle cx={70} cy={-60} r={30} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M 56 -60 l 10 10 l 18 -20" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Chip x={150} y={400} text="RÜYA" delay={6} />
      <Chip x={450} y={400} text="BİRAZ UYAN" delay={Math.round(durationInFrames * 0.35)} />
      <Chip x={750} y={400} text="KAYDET" delay={Math.round(durationInFrames * 0.65)} />
    </g>
  );
};

// 10) İpucu: yatakta doğrulup rüyasını deftere yazıyor
const DreamDiary: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const write = useProgress(durationInFrames * 0.35, durationInFrames * 0.9) * 4;
  const penX = 640 + ((frame * 6) % 140) - 70;
  return (
    <g>
      <rect width={900} height={560} fill="#ffe9c9" />
      {/* pencere ve güneş */}
      <rect x={60} y={40} width={200} height={170} rx={8} fill="#bfe8ff" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={190} cy={110} r={36} fill={MOONY} stroke={OUTLINE} strokeWidth={4} />
      <line x1={160} y1={40} x2={160} y2={210} stroke={OUTLINE} strokeWidth={5} />
      <line x1={60} y1={125} x2={260} y2={125} stroke={OUTLINE} strokeWidth={5} />
      <Bed x={330} y={540} scale={0.95} eyes={1} sitting={1} />
      <ThinkCloud x={300} y={140} delay={6} />
      <Notebook x={640} y={300} scale={1} lines={write} rotate={-4} />
      {write < 4 ? (
        <g transform={place(penX, 290 + Math.floor(write) * 30, 1, 30)}>
          <rect x={-8} y={-70} width={16} height={70} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
          <path d="M -8 0 L 0 18 L 8 0 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
        </g>
      ) : null}
      <Chip x={640} y={490} text="HEMEN NOT AL" delay={Math.round(durationInFrames * 0.3)} />
      <Chip x={640} y={80} text="KALKMA!" dark delay={4} />
    </g>
  );
};

// Kişinin yanında küçük rüya hatırlatma bulutu
const ThinkCloud: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => {
  const a = useAppear(delay);
  const f = useWave(40, 5);
  return (
    <g transform={place(x, y + f, a)}>
      <circle cx={-30} cy={80} r={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={-14} cy={56} r={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <path d="M -80 20 C -100 -10 -70 -40 -40 -30 C -30 -60 30 -60 40 -30 C 80 -40 100 0 70 20 C 70 46 -60 46 -80 20 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <g transform="translate(0 0) scale(0.45)">
        <rect x={-30} y={-20} width={60} height={60} fill={LILAC} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -40 -20 L 0 -70 L 40 -20 Z" fill={PINK} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      </g>
    </g>
  );
};

// Konuşma balonu
const SpeechBubble: React.FC<{ x: number; y: number; text: string; delay: number; color?: string; wobble?: number }> = ({ x, y, text, delay, color = OUTLINE, wobble = 0 }) => {
  const a = useAppear(delay);
  const bw = text.length * 20 + 60;
  return (
    <g transform={place(x, y + wobble, a)}>
      <rect x={-bw / 2} y={-40} width={bw} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={color}>
        {text}
      </text>
    </g>
  );
};

// 11) Kapanış: hangi rüyanı hatırlıyorsun?
const YourTurn: Visual = ({ durationInFrames }) => {
  const w = useWave(40, 6);
  const step = Math.round(durationInFrames * 0.15);
  return (
    <g>
      <Paper />
      <Brain x={200} y={320} scale={1.2} />
      <NightCap x={190} y={220} />
      <SpeechBubble x={610} y={120} text="UÇUYORDUM!" delay={8} />
      <SpeechBubble x={610} y={240} text="SINAVA GEÇ KALDIM" delay={8 + step} color={PURPLE} wobble={w} />
      <SpeechBubble x={610} y={360} text="HİÇ HATIRLAMIYORUM" delay={8 + step * 2} />
      <Chip x={610} y={480} text="@ETİKETLE" delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  DreamFade,
  WhyDreams,
  NoRecording,
  TwoGroups,
  NightWakes,
  SoundReact,
  EraserCells,
  MouseCaution,
  Summary,
  DreamDiary,
  YourTurn,
};
