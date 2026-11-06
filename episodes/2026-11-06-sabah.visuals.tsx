// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Uykuya dalarken neden sıçrıyoruz? Hipnik sıçrama (2026-11-06-sabah)
import { interpolate, useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  INK,
  place,
  QuestionMark,
  RED,
  Sparkles,
  ThoughtBubble,
  uiFont,
  useAppear,
  useProgress,
  useWave,
  Window,
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#e8f8f6";
const SKIN = "#f2c79a";
const TEAL = "#3fb4a0";
const NIGHT = "#2f3a6b";
const NIGHT2 = "#3e4c86";
const BLANKET = "#5b8def";
const PILLOW = "#ffffff";
const BROWN = "#8a5a32";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Belirli bir karede yukarı fırlayıp geri düşen sıçrama eğrisi (0 → 1 → 0)
const useJolt = (at: number, up = 6, down = 14) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [at, at + up, at + up + down], [0, 1, 0], clamp);
};

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [90, 90, 36],
      [820, 70, 24],
      [800, 300, 16],
      [60, 330, 18],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#d2f0eb" />
    ))}
  </g>
);

// Gece yatak odası zemini
const NightRoom: React.FC<{ windowX?: number }> = ({ windowX = 640 }) => (
  <g>
    <rect width={900} height={560} fill={NIGHT} />
    {Array.from({ length: 20 }).map((_, i) => (
      <rect key={i} x={i * 46 + 18} y={0} width={14} height={470} fill={NIGHT2} opacity={0.5} />
    ))}
    <rect x={0} y={470} width={900} height={90} fill="#5a4a7a" stroke={OUTLINE} strokeWidth={4} />
    <Window x={windowX} y={70} kind="night" />
  </g>
);

const Zzz: React.FC<{ x: number; y: number; delay?: number; color?: string }> = ({ x, y, delay = 0, color = "#fff" }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const t = ((frame - delay + i * 20) % 60) / 60;
        if (frame < delay) return null;
        return (
          <text
            key={i}
            x={x + t * 50 + i * 8}
            y={y - t * 80}
            fontFamily={uiFont}
            fontWeight={800}
            fontSize={26 + i * 8}
            fill={color}
            stroke={OUTLINE}
            strokeWidth={2}
            paintOrder="stroke"
            opacity={1 - t}
          >
            Z
          </text>
        );
      })}
    </g>
  );
};

// Yatakta yatan karakter; (0,0) yatağın orta tabanı. jolt: 0..1 sıçrama, awake: gözler açık
const Bed: React.FC<{ jolt?: number; awake?: boolean; scale?: number; x: number; y: number }> = ({
  jolt = 0,
  awake = false,
  scale = 1,
  x,
  y,
}) => {
  const lift = -70 * jolt;
  return (
    <g transform={place(x, y, scale)}>
      {/* karyola */}
      <rect x={-300} y={-150} width={34} height={150} rx={8} fill={BROWN} stroke={OUTLINE} strokeWidth={5} />
      <rect x={266} y={-110} width={34} height={110} rx={8} fill={BROWN} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-280} y={-80} width={560} height={50} rx={10} fill="#f4ecd9" stroke={OUTLINE} strokeWidth={5} />
      {/* yastık */}
      <rect x={-262} y={-118} width={130} height={46} rx={22} fill={PILLOW} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`translate(0 ${lift}) rotate(${-8 * jolt} -190 -100)`}>
        {/* kafa */}
        <circle cx={-190} cy={-120} r={46} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -236 -126 Q -232 -176 -186 -170 Q -146 -168 -146 -136 Q -170 -150 -196 -146 Q -222 -150 -236 -126 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={4} />
        {awake ? (
          <g>
            <circle cx={-205} cy={-118} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-170} cy={-118} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-205} cy={-117} r={5} fill={OUTLINE} />
            <circle cx={-170} cy={-117} r={5} fill={OUTLINE} />
            <ellipse cx={-188} cy={-92} rx={9} ry={11} fill="#8a2430" stroke={OUTLINE} strokeWidth={3} />
          </g>
        ) : (
          <g>
            <path d="M -214 -116 Q -205 -108 -196 -116 M -180 -116 Q -171 -108 -162 -116" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
            <path d="M -196 -94 Q -188 -88 -180 -94" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
          </g>
        )}
        {/* yorgan */}
        <path d="M -150 -40 L -150 -112 Q -40 -140 120 -118 Q 250 -110 262 -80 L 262 -40 Z" fill={BLANKET} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -60 -126 L -60 -40 M 60 -124 L 60 -40 M 170 -116 L 170 -40" stroke="#4673d1" strokeWidth={4} />
        {jolt > 0.05 ? (
          <g>
            <circle cx={-100} cy={-120} r={16} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
            <circle cx={240} cy={-104} r={16} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
          </g>
        ) : null}
      </g>
      {/* ayaklar */}
      <rect x={-270} y={-30} width={20} height={30} fill={BROWN} stroke={OUTLINE} strokeWidth={4} />
      <rect x={250} y={-30} width={20} height={30} fill={BROWN} stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

// Hareket çizgileri (sıçrama anı)
const Shock: React.FC<{ x: number; y: number; t: number; r?: number }> = ({ x, y, t, r = 80 }) => (
  <g opacity={t} transform={`translate(${x} ${y})`}>
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return (
        <line
          key={i}
          x1={Math.cos(a) * r}
          y1={Math.sin(a) * r}
          x2={Math.cos(a) * (r + 40 * t)}
          y2={Math.sin(a) * (r + 40 * t)}
          stroke={YELLOW}
          strokeWidth={8}
          strokeLinecap="round"
        />
      );
    })}
  </g>
);

const Bolt: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = YELLOW }) => (
  <path
    transform={place(x, y, scale)}
    d="M 10 -70 L -30 6 L 0 6 L -14 70 L 34 -14 L 4 -14 L 22 -70 Z"
    fill={color}
    stroke={OUTLINE}
    strokeWidth={5}
    strokeLinejoin="round"
  />
);

// 1) Uykuya dalarken yatakta sıçrayan karakter
const BedJolt: Visual = ({ durationInFrames }) => {
  const at = Math.min(54, Math.round(durationInFrames * 0.35));
  const jolt = useJolt(at);
  const frame = useCurrentFrame();
  const awake = frame >= at;
  const hop = useAppear(at + 2);
  return (
    <g>
      <NightRoom windowX={690} />
      <Bed x={450} y={500} jolt={jolt} awake={awake} />
      {!awake ? <Zzz x={300} y={300} /> : null}
      <Shock x={260} y={360 - 70 * jolt} t={jolt} r={70} />
      {awake ? (
        <g transform={place(470, 170, hop)}>
          <BigText x={0} y={0} text="HOP!" size={110} color={YELLOW} />
        </g>
      ) : null}
      {awake ? <QuestionMark x={140} y={170} size={0.8} color="#fff" delay={at + 12} /> : null}
    </g>
  );
};

// 2) Adı var: hipnik sıçrama
const NameCard: Visual = () => {
  const card = useAppear(4);
  const pulse = 1 + useWave(20, 0.08);
  const zig = useProgress(20, 40);
  return (
    <g>
      <Paper />
      <g transform={place(450, 200, card)}>
        <rect x={-330} y={-110} width={660} height={220} rx={30} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={-30} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={TEAL}>
          BUNUN ADI
        </text>
        <text x={0} y={50} fontFamily={uiFont} fontWeight={800} fontSize={72} textAnchor="middle" fill={INK}>
          HİPNİK SIÇRAMA
        </text>
      </g>
      {/* uyanıklık → uyku çizgisi ve ani sıçrama */}
      <g transform="translate(130 430)">
        <text x={0} y={-50} fontFamily={uiFont} fontWeight={700} fontSize={24} fill={INK}>
          UYANIK
        </text>
        <text x={640} y={-50} fontFamily={uiFont} fontWeight={700} fontSize={24} fill={INK} textAnchor="end">
          UYKU
        </text>
        <path
          d="M 0 0 L 300 0 L 320 -70 L 345 50 L 365 0 L 640 0"
          fill="none"
          stroke={OUTLINE}
          strokeWidth={8}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={1000}
          strokeDashoffset={1000 * (1 - zig)}
        />
      </g>
      <g transform={place(830, 250, pulse * useAppear(40))}>
        <Bolt x={0} y={0} scale={0.9} />
      </g>
      <Chip x={450} y={510} text="KASLAR ANİDEN KASILIR" dark delay={44} />
    </g>
  );
};

// Küçük uyuyan kafa ikonu
const MiniHead: React.FC<{ x: number; y: number; on: number }> = ({ x, y, on }) => (
  <g transform={`translate(${x} ${y - 18 * on})`}>
    <circle cx={0} cy={0} r={34} fill={on > 0 ? SKIN : "#e2e2e2"} stroke={OUTLINE} strokeWidth={4} />
    <path d="M -34 -6 Q -30 -40 0 -38 Q 30 -40 34 -6 Q 14 -24 0 -22 Q -16 -26 -34 -6 Z" fill={on > 0 ? "#4a2f1d" : "#b8b8b8"} stroke={OUTLINE} strokeWidth={3} />
    {on > 0 ? (
      <g>
        <circle cx={-12} cy={2} r={6} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
        <circle cx={12} cy={2} r={6} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
        <ellipse cx={0} cy={18} rx={5} ry={6} fill="#8a2430" />
      </g>
    ) : (
      <path d="M -18 4 Q -12 9 -6 4 M 6 4 Q 12 9 18 4" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
    )}
  </g>
);

// 3) 10 kişiden 7'si
const SevenOfTen: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      {Array.from({ length: 10 }).map((_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 170 + col * 140;
        const y = 150 + row * 150;
        const onAt = 14 + i * 7;
        const active = i < 7 && frame >= onAt;
        const bump = active ? interpolate(frame, [onAt, onAt + 4, onAt + 12], [0, 1, 0.15], clamp) : 0;
        return (
          <g key={i}>
            <MiniHead x={x} y={y} on={active ? Math.max(bump, 0.01) : 0} />
            {active ? <Bolt x={x + 40} y={y - 40} scale={0.28} /> : null}
          </g>
        );
      })}
      <BigText x={450} y={470} text="10 KİŞİDEN 7'Sİ" size={70} color={YELLOW} delay={70} />
    </g>
  );
};

// Gösterge kartı: başlık + aşağı inen ok
const DownCard: React.FC<{ x: number; title: string; delay: number; children: React.ReactNode }> = ({ x, title, delay, children }) => {
  const appear = useAppear(delay);
  const p = useProgress(delay + 10, delay + 30);
  return (
    <g transform={place(x, 280, appear)}>
      <rect x={-125} y={-200} width={250} height={380} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <g transform="translate(0 -80)">{children}</g>
      <Arrow from={[0, 40]} to={[0, 120]} progress={p} color={TEAL} />
      <text x={0} y={162} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={INK}>
        {title}
      </text>
    </g>
  );
};

// 4) Beden yavaşlıyor
const SlowDown: Visual = () => {
  const breathe = 1 + useWave(70, 0.06);
  const sag = useProgress(20, 60);
  return (
    <g>
      <Paper />
      <DownCard x={170} title="KASLAR" delay={4}>
        {/* gevşeyen yay */}
        <path
          d={`M -70 0 ${Array.from({ length: 6 })
            .map((_, i) => `Q ${-58 + i * 24} ${-30 + sag * 26} ${-46 + i * 24} 0`)
            .join(" ")} L 80 0`}
          fill="none"
          stroke={RED}
          strokeWidth={8}
          strokeLinecap="round"
        />
      </DownCard>
      <DownCard x={450} title="NEFES" delay={14}>
        <g transform={`scale(${breathe})`}>
          <path d="M -8 -60 L -8 -20 Q -60 -40 -64 20 Q -66 60 -20 56 Q -8 40 -8 -20" fill="#f59ac0" stroke={OUTLINE} strokeWidth={4} />
          <path d="M 8 -60 L 8 -20 Q 60 -40 64 20 Q 66 60 20 56 Q 8 40 8 -20" fill="#f59ac0" stroke={OUTLINE} strokeWidth={4} />
        </g>
      </DownCard>
      <DownCard x={730} title="TANSİYON" delay={24}>
        <circle cx={0} cy={0} r={58} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -44 10 A 46 46 0 0 1 44 10" fill="none" stroke="#d2f0eb" strokeWidth={10} />
        <line
          x1={0}
          y1={0}
          x2={Math.cos(Math.PI * (1.85 - sag * 0.6)) * 44}
          y2={Math.sin(Math.PI * (1.85 - sag * 0.6)) * 44}
          stroke={RED}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <circle cx={0} cy={0} r={8} fill={OUTLINE} />
      </DownCard>
    </g>
  );
};

// 5) Beyin gevşemeyi düşmek sanıyor: alarm
const BrainAlarm: Visual = () => {
  const frame = useCurrentFrame();
  const on = Math.floor(frame / 8) % 2 === 0;
  const shake = useWave(5, 3);
  return (
    <g>
      <rect width={900} height={560} fill={on && frame > 20 ? "#ffe3e3" : PAPER} />
      <Brain x={300 + shake} y={320} scale={1.6} mood="confused" delay={2} />
      {/* siren */}
      <g transform={place(300, 120, useAppear(10))}>
        {frame > 20 && on ? <circle cx={0} cy={-10} r={70} fill={RED} opacity={0.25} /> : null}
        <path d="M -40 20 L -40 -20 Q -40 -56 0 -56 Q 40 -56 40 -20 L 40 20 Z" fill={on ? RED : "#c94a4a"} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-56} y={20} width={112} height={22} rx={6} fill="#555" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <g transform={place(650, 220, useAppear(24))}>
        <rect x={-190} y={-70} width={380} height={140} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -170 40 L -240 100 L -120 60 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-176} y={34} width={70} height={30} fill="#fff" />
        <text x={0} y={18} fontFamily={uiFont} fontWeight={800} fontSize={54} textAnchor="middle" fill={RED}>
          DÜŞÜYORUZ!
        </text>
      </g>
      <Chip x={650} y={420} text="ASLINDA: GEVŞEME" dark delay={44} />
    </g>
  );
};

// 6) Kaslar bir anda kasılıyor
const Catch: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = Math.min(40, Math.round(durationInFrames * 0.3));
  const fall = interpolate(frame, [0, at], [0, 1], clamp);
  const jolt = useJolt(at, 4, 10);
  const caught = frame >= at;
  const y = 120 + fall * 170 - jolt * 50;
  const wobble = useWave(10, 8);
  return (
    <g>
      <Paper />
      {/* düşüş izi */}
      {!caught
        ? [0, 1, 2].map((i) => (
            <line key={i} x1={410 + i * 40} y1={y - 140} x2={410 + i * 40} y2={y - 60} stroke="#9fd8cf" strokeWidth={8} strokeLinecap="round" />
          ))
        : null}
      <g transform={place(450, y, 1, caught ? 0 : wobble)}>
        {/* gövde */}
        <rect x={-50} y={0} width={100} height={130} rx={30} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
        {/* kollar: düşerken yukarıda, yakalanınca bükülü kas */}
        {caught ? (
          <g>
            <path d="M -48 30 L -120 40 L -130 -20" fill="none" stroke={OUTLINE} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M -48 30 L -120 40 L -130 -20" fill="none" stroke={TEAL} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 48 30 L 120 40 L 130 -20" fill="none" stroke={OUTLINE} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 48 30 L 120 40 L 130 -20" fill="none" stroke={TEAL} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={-130} cy={-26} r={18} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
            <circle cx={130} cy={-26} r={18} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
          </g>
        ) : (
          <g>
            <line x1={-40} y1={20} x2={-110} y2={-60} stroke={OUTLINE} strokeWidth={28} strokeLinecap="round" />
            <line x1={-40} y1={20} x2={-110} y2={-60} stroke={TEAL} strokeWidth={20} strokeLinecap="round" />
            <line x1={40} y1={20} x2={110} y2={-60} stroke={OUTLINE} strokeWidth={28} strokeLinecap="round" />
            <line x1={40} y1={20} x2={110} y2={-60} stroke={TEAL} strokeWidth={20} strokeLinecap="round" />
            <circle cx={-114} cy={-64} r={17} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
            <circle cx={114} cy={-64} r={17} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
          </g>
        )}
        <line x1={-24} y1={128} x2={-30} y2={200} stroke={OUTLINE} strokeWidth={26} strokeLinecap="round" />
        <line x1={24} y1={128} x2={30} y2={200} stroke={OUTLINE} strokeWidth={26} strokeLinecap="round" />
        {/* kafa */}
        <circle cx={0} cy={-46} r={50} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -50 -52 Q -48 -104 0 -100 Q 48 -104 50 -52 Q 30 -76 0 -72 Q -30 -78 -50 -52 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-18} cy={-46} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={18} cy={-46} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-18} cy={-45} r={5} fill={OUTLINE} />
        <circle cx={18} cy={-45} r={5} fill={OUTLINE} />
        <ellipse cx={0} cy={-16} rx={10} ry={12} fill="#8a2430" stroke={OUTLINE} strokeWidth={3} />
      </g>
      <Shock x={450} y={y + 40} t={jolt} r={150} />
      {caught ? <BigText x={170} y={150} text="KASIL!" size={70} color={YELLOW} delay={at} /> : null}
      {caught ? <BigText x={740} y={160} text="HOP!" size={80} color={RED} delay={at + 6} /> : null}
      {caught ? <Chip x={720} y={470} text="UYANDIN!" dark delay={at + 14} /> : null}
    </g>
  );
};

// 7) Rüyada düşüş, ışık ve "çat" sesi
const FlashBang: Visual = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame % 40, [0, 3, 12], [0, 1, 0], clamp) * (frame > 30 ? 1 : 0);
  const fall = (frame * 3) % 160;
  return (
    <g>
      <rect width={900} height={560} fill={NIGHT} />
      <ThoughtBubble x={300} y={250} r={180} delay={2}>
        {/* uçurum ve düşen minik karakter */}
        <rect x={-160} y={-80} width={120} height={230} fill="#7a5a3a" stroke={OUTLINE} strokeWidth={4} />
        <g transform={`translate(${-10 + fall * 0.3} ${-110 + fall * 0.9}) scale(1.8)`}>
          <circle cx={0} cy={0} r={16} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
          <line x1={0} y1={16} x2={0} y2={46} stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
          <line x1={0} y1={22} x2={-20} y2={6} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
          <line x1={0} y1={22} x2={20} y2={6} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        </g>
      </ThoughtBubble>
      <rect width={900} height={560} fill="#fff" opacity={flash * 0.55} />
      <g transform={place(700, 170, useAppear(24))}>
        <path
          d="M 0 -110 L 30 -40 L 105 -60 L 55 0 L 105 60 L 30 40 L 0 110 L -30 40 L -105 60 L -55 0 L -105 -60 L -30 -40 Z"
          fill={YELLOW}
          stroke={OUTLINE}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <text x={0} y={18} fontFamily={uiFont} fontWeight={800} fontSize={52} textAnchor="middle" fill={RED}>
          ÇAT!
        </text>
      </g>
      <Chip x={700} y={380} text="IŞIK" delay={34} />
      <Chip x={700} y={460} text="DÜŞME RÜYASI" dark delay={42} />
    </g>
  );
};

// 8) Ağaçta uyuyan atalar teorisi
const TreeApe: Visual = ({ durationInFrames }) => {
  const at = Math.min(60, Math.round(durationInFrames * 0.4));
  const jolt = useJolt(at);
  const sway = useWave(80, 3);
  return (
    <g>
      <rect width={900} height={560} fill="#cfeee8" />
      <circle cx={790} cy={90} r={46} fill="#fff6c8" stroke={OUTLINE} strokeWidth={4} />
      <rect x={0} y={500} width={900} height={60} fill="#8fcf7a" stroke={OUTLINE} strokeWidth={4} />
      <g transform="translate(-60 -40) scale(1.15)">
      {/* ağaç */}
      <rect x={150} y={150} width={70} height={360} fill={BROWN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${sway} 200 290)`}>
        <path d="M 200 300 L 560 270" stroke={OUTLINE} strokeWidth={34} strokeLinecap="round" />
        <path d="M 200 300 L 560 270" stroke={BROWN} strokeWidth={24} strokeLinecap="round" />
        {/* yaprak ve yuva */}
        <ellipse cx={330} cy={290} rx={120} ry={24} fill="#c49a5a" stroke={OUTLINE} strokeWidth={4} />
        {/* maymun */}
        <g transform={`translate(340 ${262 - 40 * jolt}) rotate(${-10 * jolt})`}>
          <ellipse cx={0} cy={0} rx={70} ry={34} fill="#8a5a3a" stroke={OUTLINE} strokeWidth={5} />
          <circle cx={-70} cy={-14} r={34} fill="#8a5a3a" stroke={OUTLINE} strokeWidth={5} />
          <ellipse cx={-76} cy={-6} rx={22} ry={18} fill="#e8c39a" stroke={OUTLINE} strokeWidth={3} />
          <circle cx={-44} cy={-34} r={12} fill="#e8c39a" stroke={OUTLINE} strokeWidth={3} />
          {jolt > 0.05 ? (
            <g>
              <circle cx={-84} cy={-16} r={5} fill={OUTLINE} />
              <circle cx={-68} cy={-16} r={5} fill={OUTLINE} />
            </g>
          ) : (
            <path d="M -90 -16 Q -84 -11 -78 -16 M -72 -16 Q -66 -11 -60 -16" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
          )}
          <path d="M 66 6 Q 110 30 96 70" fill="none" stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
        </g>
      </g>
      <circle cx={190} cy={150} r={110} fill="#5fbf6a" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={110} cy={210} r={70} fill="#5fbf6a" stroke={OUTLINE} strokeWidth={5} />
      <Shock x={290} y={240 - 40 * jolt} t={jolt} r={70} />
      </g>
      <Chip x={720} y={380} text="TEORİ" delay={10} />
      <Chip x={720} y={460} text="KANIT ZAYIF" dark delay={at + 14} />
      <QuestionMark x={650} y={200} size={0.9} delay={at + 20} />
    </g>
  );
};

const Cup: React.FC<{ steam?: boolean }> = ({ steam = true }) => {
  const s = useWave(30, 6);
  return (
    <g>
      {steam ? (
        <path d={`M -14 -70 Q ${-24 + s} -90 -14 -110 M 14 -70 Q ${24 - s} -90 14 -110`} fill="none" stroke="#9aa" strokeWidth={5} strokeLinecap="round" />
      ) : null}
      <path d="M -40 -60 L 40 -60 L 32 20 Q 30 34 16 34 L -16 34 Q -30 34 -32 20 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <path d="M 38 -40 Q 70 -40 66 -10 Q 62 12 34 8" fill="none" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-34} y={-50} width={68} height={14} fill="#7a4a2a" />
    </g>
  );
};

const IconCard: React.FC<{ x: number; y: number; label: string; delay: number; children: React.ReactNode }> = ({ x, y, label, delay, children }) => {
  const appear = useAppear(delay);
  const bob = useWave(40, 4, delay);
  return (
    <g transform={place(x, y + bob, appear)}>
      <rect x={-180} y={-110} width={360} height={220} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <g transform="translate(0 -22) scale(0.85)">{children}</g>
      <text x={0} y={88} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={INK}>
        {label}
      </text>
    </g>
  );
};

// 9) Tetikleyiciler
const Triggers: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <IconCard x={240} y={150} label="KAFEİN" delay={4}>
        <g transform="scale(0.9) translate(0 10)">
          <Cup />
        </g>
      </IconCard>
      <IconCard x={660} y={150} label="STRES" delay={14}>
        <circle cx={0} cy={0} r={46} fill="#ffd166" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -26 -18 L -8 -10 M 26 -18 L 8 -10" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <path d="M -20 22 Q -10 12 0 22 Q 10 32 20 22" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <Bolt x={44} y={-44} scale={0.3} />
      </IconCard>
      <IconCard x={240} y={410} label="UYKUSUZLUK" delay={24}>
        <circle cx={0} cy={0} r={46} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <line x1={0} y1={0} x2={0} y2={-30} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <line x1={0} y1={0} x2={Math.cos(frame / 10) * 26} y2={Math.sin(frame / 10) * 26} stroke={RED} strokeWidth={5} strokeLinecap="round" />
        <circle cx={0} cy={0} r={6} fill={OUTLINE} />
      </IconCard>
      <IconCard x={660} y={410} label="GECE SPORU" delay={34}>
        <g transform={`rotate(${useWave(30, 10)})`}>
          <rect x={-50} y={-6} width={100} height={12} fill="#777" stroke={OUTLINE} strokeWidth={3} />
          <rect x={-62} y={-30} width={20} height={60} rx={4} fill={OUTLINE} />
          <rect x={42} y={-30} width={20} height={60} rx={4} fill={OUTLINE} />
        </g>
      </IconCard>
    </g>
  );
};

// 10) Zararsız + ipuçları
const Tips: Visual = () => {
  const shield = useAppear(4);
  const check = useProgress(14, 30);
  return (
    <g>
      <Paper />
      <g transform={place(220, 270, shield)}>
        <path d="M 0 -150 L 130 -100 Q 130 60 0 150 Q -130 60 -130 -100 Z" fill={TEAL} stroke={OUTLINE} strokeWidth={6} />
        <path
          d="M -60 0 L -15 45 L 65 -45"
          fill="none"
          stroke="#fff"
          strokeWidth={22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={220}
          strokeDashoffset={220 * (1 - check)}
        />
      </g>
      <Chip x={220} y={480} text="ZARARSIZ" delay={20} />
      <IconCard x={640} y={150} label="ERKEN BIRAK" delay={30}>
        <g transform="scale(0.8) translate(0 14)">
          <Cup steam={false} />
        </g>
        <line x1={-50} y1={-50} x2={50} y2={50} stroke={RED} strokeWidth={10} strokeLinecap="round" opacity={useAppear(40)} />
      </IconCard>
      <IconCard x={640} y={410} label="DÜZENLİ UYU" delay={44}>
        <rect x={-50} y={-40} width={100} height={84} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-50} y={-40} width={100} height={22} fill={RED} stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={30} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK}>
          23:00
        </text>
      </IconCard>
    </g>
  );
};

// 11) Kapanış sorusu
const YourTurn: Visual = () => {
  const card = useAppear(8);
  const pulse = 1 + useWave(24, 0.05);
  return (
    <g>
      <NightRoom windowX={60} />
      <Bed x={300} y={520} scale={0.75} awake />
      <Zzz x={160} y={330} color={YELLOW} delay={0} />
      <g transform={place(640, 210, card)}>
        <rect x={-210} y={-160} width={420} height={320} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Chip x={0} y={-90} text="UÇURUMDAN?" delay={14} />
        <Chip x={0} y={0} text="MERDİVENDEN?" delay={20} />
        <Chip x={0} y={90} text="KALDIRIMDAN?" delay={26} />
      </g>
      <g transform={place(640, 470, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={30} />
      </g>
      <Sparkles points={[[860, 60], [420, 60], [860, 380]]} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  BedJolt,
  NameCard,
  SevenOfTen,
  SlowDown,
  BrainAlarm,
  Catch,
  FlashBang,
  TreeApe,
  Triggers,
  Tips,
  YourTurn,
};
