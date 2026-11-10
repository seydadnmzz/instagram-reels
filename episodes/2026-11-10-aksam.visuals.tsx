// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Bir kelimeyi tekrarlayınca neden anlamsızlaşıyor? — anlamsal doygunluk (2026-11-10-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  INK,
  NamePlate,
  Note,
  Person,
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
const PAPER = "#fff1e6";
const DOT = "#ffe0c7";
const ORANGE = "#ff7a3d";
const DEEP = "#d9451c";
const BLUE = "#5b8def";
const GREEN = "#3fb46a";
const SILVER = "#cfd6de";
const WOOD = "#c98f55";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [90, 90, 36],
      [820, 70, 24],
      [800, 300, 16],
      [60, 330, 18],
      [470, 40, 14],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={DOT} />
    ))}
  </g>
);

// Kaşık çizimi; (0,0) sapın ortası
const Spoon: React.FC<{ x: number; y: number; scale?: number; rotate?: number; opacity?: number }> = ({
  x,
  y,
  scale = 1,
  rotate = 0,
  opacity = 1,
}) => (
  <g transform={place(x, y, scale, rotate)} opacity={opacity}>
    <rect x={-12} y={-10} width={24} height={150} rx={12} fill={SILVER} stroke={OUTLINE} strokeWidth={5} />
    <ellipse cx={0} cy={-70} rx={48} ry={66} fill={SILVER} stroke={OUTLINE} strokeWidth={5} />
    <ellipse cx={-12} cy={-88} rx={14} ry={24} fill="#fff" opacity={0.7} />
  </g>
);

// Konuşma balonu
const Bubble: React.FC<{ x: number; y: number; w: number; h?: number; text: string; size?: number; delay?: number; tail?: "left" | "right"; wobble?: number; fade?: number }> = ({
  x,
  y,
  w,
  h = 90,
  text,
  size = 44,
  delay = 0,
  tail = "left",
  wobble = 0,
  fade = 1,
}) => {
  const appear = useAppear(delay);
  const frame = useCurrentFrame();
  const tx = tail === "left" ? -w / 2 + 40 : w / 2 - 40;
  return (
    <g transform={place(x, y, appear)}>
      <path
        d={`M ${tx - 14} ${h / 2 - 4} L ${tx + (tail === "left" ? -34 : 34)} ${h / 2 + 34} L ${tx + 18} ${h / 2 - 4} Z`}
        fill="#fff"
        stroke={OUTLINE}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={tx - 12} y={h / 2 - 9} width={28} height={10} fill="#fff" />
      <text
        x={0}
        y={size * 0.36}
        fontFamily={uiFont}
        fontWeight={800}
        fontSize={size}
        textAnchor="middle"
        fill={INK}
        opacity={fade}
        transform={wobble ? `skewX(${Math.sin(frame / 3) * wobble})` : undefined}
      >
        {text}
      </text>
    </g>
  );
};

// 1) Kanca: KAŞIK KAŞIK KAŞIK… kelime dağılıyor, kaşık soru işaretine dönüşüyor
const RepeatWord: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const melt = interpolate(frame, [durationInFrames * 0.35, durationInFrames * 0.75], [0, 1], clamp);
  const spoonFade = 1 - melt;
  const words = [0, 1, 2, 3];
  return (
    <g>
      <Paper />
      <Person x={170} y={500} scale={1.25} shirt={ORANGE} presenting delay={0} />
      {words.map((i) => {
        const d = 4 + i * 9;
        const local = Math.max(0, frame - d);
        const jitter = melt * Math.sin(local / 2 + i) * 10;
        return (
          <g key={i} transform={`translate(${jitter} ${melt * i * 4})`}>
            <Bubble
              x={430 + (i % 2) * 70}
              y={80 + i * 92}
              w={250}
              h={78}
              text={melt > 0.6 && i >= 2 ? "K A Ş I K ?" : "KAŞIK"}
              size={melt > 0.6 && i >= 2 ? 34 : 42}
              delay={d}
              wobble={melt * 18}
              fade={1 - melt * 0.55 * (i / 3)}
            />
          </g>
        );
      })}
      <Spoon x={760} y={250} scale={1.1} rotate={useWave(40, 8)} opacity={spoonFade} />
      <QuestionMark x={760} y={250} size={170} delay={Math.round(durationInFrames * 0.55)} color={RED} />
    </g>
  );
};

// 2) Adı var: beyin kelimeye "doyuyor"
const NameIt: Visual = () => {
  const frame = useCurrentFrame();
  const fill = useProgress(6, 50);
  return (
    <g>
      <Paper />
      <Brain x={300} y={260} scale={1.5} delay={0} mood={fill > 0.8 ? "confused" : "happy"} />
      {/* doluluk göstergesi */}
      <g transform="translate(640 120)">
        <rect x={-50} y={0} width={100} height={260} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-42} y={8 + 244 * (1 - fill)} width={84} height={244 * fill} rx={14} fill={ORANGE} />
        {[0, 1, 2, 3, 4].map((i) => (
          <text
            key={i}
            x={0}
            y={240 - i * 50 - (frame % 50) * 0.3}
            fontFamily={uiFont}
            fontWeight={800}
            fontSize={18}
            textAnchor="middle"
            fill="#fff"
            opacity={fill > i * 0.2 ? 1 : 0}
          >
            KAŞIK
          </text>
        ))}
        <text x={0} y={-16} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={INK}>
          DOLU!
        </text>
      </g>
      <Chip x={450} y={490} text="ANLAMSAL DOYGUNLUK" dark delay={22} />
    </g>
  );
};

// 3) Terimi koyan araştırmacı (genel karakter + isim etiketi)
const Thesis: Visual = () => {
  return (
    <g>
      <Paper />
      {/* üniversite binası */}
      <g transform={place(700, 330, useAppear(0))}>
        <path d="M -150 -120 L 0 -200 L 150 -120 Z" fill="#e9d3bd" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <rect x={-140} y={-120} width={280} height={190} fill="#f4e4d2" stroke={OUTLINE} strokeWidth={5} />
        {[-100, -40, 20, 80].map((cx) => (
          <rect key={cx} x={cx} y={-100} width={22} height={150} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        ))}
        <rect x={-160} y={66} width={320} height={20} fill="#e9d3bd" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <NamePlate x={700} y={455} text="McGILL ÜNİVERSİTESİ" delay={8} />
      <Person x={170} y={500} scale={1.15} shirt={BLUE} glasses mustache presenting delay={4} />
      <Note x={360} y={200} width={300} title="TEZ · 1962" text="DOYGUNLUK" rotate={-4} delay={14} />
      <NamePlate x={210} y={530} text="LEON JAKOBOVITS JAMES" delay={20} />
    </g>
  );
};

// 4) 1907: üç dakika boyunca bakılan kelime tuhaflaşıyor
const Stare: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, durationInFrames * 0.9], [0, 1], clamp);
  const skew = Math.sin(frame / 4) * 14 * t;
  return (
    <g>
      <Paper />
      <Person x={160} y={500} scale={1.15} shirt="#7a5cc9" facing="right" delay={0} />
      {/* göz çizgileri */}
      <path d="M 220 260 L 420 240 M 220 280 L 420 290" stroke={OUTLINE} strokeWidth={4} strokeDasharray="10 10" opacity={0.5} />
      {/* kart */}
      <g transform={place(560, 260, useAppear(4))}>
        <rect x={-150} y={-90} width={300} height={180} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text
          x={0}
          y={20}
          fontFamily={uiFont}
          fontWeight={800}
          fontSize={64}
          textAnchor="middle"
          fill={INK}
          opacity={1 - t * 0.5}
          transform={`skewX(${skew})`}
          letterSpacing={t * 18}
        >
          KAŞIK
        </text>
      </g>
      {/* kronometre */}
      <g transform={place(790, 120, useAppear(10))}>
        <circle cx={0} cy={0} r={62} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-10} y={-82} width={20} height={16} fill={OUTLINE} />
        <path d={`M 0 0 L 0 -50 A 50 50 0 ${t > 0.5 ? 1 : 0} 1 ${50 * Math.sin(t * Math.PI * 2 * 0.999)} ${-50 * Math.cos(t * Math.PI * 2 * 0.999)} Z`} fill={ORANGE} opacity={0.8} />
        <line x1={0} y1={0} x2={44 * Math.sin(t * Math.PI * 2)} y2={-44 * Math.cos(t * Math.PI * 2)} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      </g>
      <Chip x={790} y={420} text="3 DAKİKA" delay={14} />
      <QuestionMark x={560} y={440} size={90} delay={Math.round(durationInFrames * 0.5)} color={RED} />
    </g>
  );
};

// Kelime kutusu ve anlam (kaşık) arasında köprü
const WordAndMeaning: React.FC<{ strength: number; frame: number; showChecks?: boolean }> = ({ strength, frame, showChecks }) => {
  const dots = [0, 1, 2];
  return (
    <g>
      {/* kelime kutusu */}
      <g transform={place(170, 250, useAppear(0))}>
        <rect x={-120} y={-60} width={240} height={120} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={18} fontFamily={uiFont} fontWeight={800} fontSize={52} textAnchor="middle" fill={INK}>
          KAŞIK
        </text>
        <text x={0} y={100} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={DEEP}>
          KELİME
        </text>
      </g>
      {/* anlam */}
      <g transform={place(730, 250, useAppear(6))}>
        <circle cx={0} cy={0} r={95} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Spoon x={0} y={-6} scale={0.6} rotate={30} />
        <text x={0} y={140} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={DEEP}>
          ANLAM
        </text>
      </g>
      {/* köprü */}
      <path
        d="M 290 250 Q 460 170 635 250"
        fill="none"
        stroke={ORANGE}
        strokeWidth={6 + 16 * strength}
        strokeLinecap="round"
        strokeDasharray={strength < 0.6 ? "18 16" : undefined}
        opacity={0.35 + 0.65 * strength}
      />
      {dots.map((i) => {
        const p = ((frame * (0.6 + strength * 0.8)) / 40 + i / 3) % 1;
        const x = 290 + (635 - 290) * p;
        const y = 250 - 4 * 80 * p * (1 - p) * 1.0;
        return <circle key={i} cx={x} cy={y} r={10 * (0.4 + strength * 0.6)} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} opacity={0.4 + strength * 0.6} />;
      })}
      {showChecks ? (
        <g>
          <circle cx={270} cy={170} r={26} fill={GREEN} stroke={OUTLINE} strokeWidth={4} />
          <path d="M 258 170 L 268 180 L 284 160" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
          <circle cx={810} cy={170} r={26} fill={GREEN} stroke={OUTLINE} strokeWidth={4} />
          <path d="M 798 170 L 808 180 L 824 160" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
};

// 5) Mekanizma: bağlantı her kullanımda yoruluyor
const Bridge: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const strength = interpolate(frame, [10, durationInFrames * 0.85], [1, 0.25], clamp);
  const sweat = Math.floor(frame / 8) % 2;
  return (
    <g>
      <Paper />
      <WordAndMeaning strength={strength} frame={frame} />
      <g opacity={strength < 0.6 ? 1 : 0}>
        <path d={`M 470 ${150 + sweat * 6} q -10 18 0 26 q 10 -8 0 -26`} fill="#7fc7ff" stroke={OUTLINE} strokeWidth={3} />
        <path d={`M 510 ${140 + (1 - sweat) * 6} q -10 18 0 26 q 10 -8 0 -26`} fill="#7fc7ff" stroke={OUTLINE} strokeWidth={3} />
      </g>
      <Chip x={460} y={470} text="BAĞLANTI YORULUYOR" dark delay={16} />
    </g>
  );
};

// 6) İkisi de yerinde, köprü geçici olarak zayıf
const WeakBridge: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <WordAndMeaning strength={0.2 + 0.05 * Math.sin(frame / 8)} frame={frame} showChecks />
      <Chip x={460} y={470} text="GEÇİCİ ZAYIFLAMA" delay={12} />
    </g>
  );
};

// 7) Yazma deneyi: aynı kelime satır satır yazılıyor
const WritingTest: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const lines = 9;
  const shown = Math.floor(interpolate(frame, [6, durationInFrames * 0.85], [0, lines], clamp));
  const penY = 120 + Math.min(shown, lines - 1) * 40;
  return (
    <g>
      <Paper />
      <rect x={0} y={470} width={900} height={90} fill={WOOD} stroke={OUTLINE} strokeWidth={4} />
      <g transform={place(330, 270, useAppear(0), -2)}>
        <rect x={-190} y={-200} width={380} height={420} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        {Array.from({ length: lines }).map((_, i) => (
          <g key={i}>
            <line x1={-160} y1={-140 + i * 40 + 8} x2={160} y2={-140 + i * 40 + 8} stroke="#b8d4f0" strokeWidth={3} />
            {i < shown ? (
              <text x={-150} y={-140 + i * 40} fontFamily={uiFont} fontWeight={700} fontSize={30} fill={BLUE}>
                kaşık kaşık kaşık
              </text>
            ) : null}
          </g>
        ))}
      </g>
      {/* kalem */}
      <g transform={place(470 + Math.sin(frame / 2) * 14, penY + 40, 1, 35)}>
        <rect x={-10} y={-120} width={20} height={110} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
        <path d="M -10 -10 L 0 14 L 10 -10 Z" fill="#f2c79a" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Person x={720} y={480} scale={1.0} shirt={GREEN} delay={4} />
      <Chip x={720} y={110} text="94 ÖĞRENCİ" delay={12} />
    </g>
  );
};

// 8) Yüzde 70 durdu
const Seventy: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const p = useProgress(6, Math.max(20, durationInFrames * 0.6));
  const pct = Math.round(70 * p);
  const cells = Array.from({ length: 10 });
  return (
    <g>
      <Paper />
      <BigText x={230} y={200} text={`%${pct}`} size={170} color={ORANGE} delay={0} />
      <Chip x={230} y={340} text="DURDU!" dark delay={10} />
      {/* 10 öğrenci simgesi, 7'si dur işaretli */}
      {cells.map((_, i) => {
        const cx = 520 + (i % 5) * 72;
        const cy = 150 + Math.floor(i / 5) * 140;
        const stop = i < 7 && p > (i + 1) / 10;
        return (
          <g key={i} transform={place(cx, cy, useAppear(4 + i * 2))}>
            <circle cx={0} cy={-20} r={20} fill="#f2c79a" stroke={OUTLINE} strokeWidth={4} />
            <path d="M -26 40 Q -26 6 0 6 Q 26 6 26 40 Z" fill={stop ? RED : SILVER} stroke={OUTLINE} strokeWidth={4} />
            {stop ? (
              <g transform={`translate(0 -64) rotate(${Math.sin(frame / 5 + i) * 8})`}>
                <polygon points="-16,-7 -7,-16 7,-16 16,-7 16,7 7,16 -7,16 -16,7" fill={RED} stroke={OUTLINE} strokeWidth={3} />
                <rect x={-9} y={-2} width={18} height={4} fill="#fff" />
              </g>
            ) : null}
          </g>
        );
      })}
      {/* yanlış yazılmış gibi */}
      <g transform={place(640, 470, useAppear(24))}>
        <rect x={-210} y={-40} width={420} height={80} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={-20} y={16} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={INK} transform={`skewX(${Math.sin(frame / 3) * 10})`}>
          KAŞIK?
        </text>
      </g>
    </g>
  );
};

// 9) Dejavunun tersi + Ig Nobel kupası
const Reverse: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const flip = useProgress(10, 30);
  const cup = useAppear(Math.round(durationInFrames * 0.45));
  return (
    <g>
      <Paper />
      <g transform="translate(250 200)">
        <g transform={`scale(${Math.cos(flip * Math.PI) >= 0 ? Math.cos(flip * Math.PI) : -Math.cos(flip * Math.PI)} 1)`}>
          <rect x={-170} y={-80} width={340} height={160} rx={22} fill={flip < 0.5 ? "#fff" : INK} stroke={OUTLINE} strokeWidth={6} />
          <text x={0} y={-10} fontFamily={uiFont} fontWeight={800} fontSize={46} textAnchor="middle" fill={flip < 0.5 ? INK : "#fff"}>
            {flip < 0.5 ? "DÉJÀ VU" : "JAMAIS VU"}
          </text>
          <text x={0} y={46} fontFamily={uiFont} fontWeight={700} fontSize={26} textAnchor="middle" fill={flip < 0.5 ? DEEP : YELLOW}>
            {flip < 0.5 ? "YENİ AMA TANIDIK" : "TANIDIK AMA YABANCI"}
          </text>
        </g>
      </g>
      <path
        d="M 120 330 A 130 60 0 0 0 380 330"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={400}
        strokeDashoffset={400 * (1 - flip)}
      />
      {/* kupa */}
      <g transform={place(670, 280, cup, Math.sin(frame / 10) * 4)}>
        <path d="M -80 -110 L 80 -110 Q 80 10 0 30 Q -80 10 -80 -110 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -80 -90 Q -130 -80 -110 -40 Q -96 -20 -66 -24" fill="none" stroke={OUTLINE} strokeWidth={6} />
        <path d="M 80 -90 Q 130 -80 110 -40 Q 96 -20 66 -24" fill="none" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-14} y={28} width={28} height={50} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-70} y={78} width={140} height={34} rx={6} fill={DEEP} stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={-42} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
          IG
        </text>
        <text x={0} y={-8} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={INK}>
          NOBEL
        </text>
      </g>
      <Chip x={670} y={470} text="2023" dark delay={Math.round(durationInFrames * 0.5)} />
      <Sparkles points={[[560, 140], [790, 160], [760, 390]]} />
    </g>
  );
};

// 10) Uyarı: otomatik pilot kapanıyor, anlam geri geliyor
const Alert: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const back = useProgress(durationInFrames * 0.5, durationInFrames * 0.8);
  const blink = Math.floor(frame / 8) % 2 === 0;
  return (
    <g>
      <Paper />
      <Brain x={230} y={320} scale={1.2} delay={0} mood={back > 0.5 ? "happy" : "confused"} />
      {/* uyarı lambası */}
      <g transform={place(230, 80, useAppear(6))}>
        <path d="M -40 30 L -30 -30 Q 0 -60 30 -30 L 40 30 Z" fill={blink && back < 0.5 ? RED : "#f6a5a5"} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-50} y={30} width={100} height={20} rx={6} fill={INK} />
      </g>
      <g transform={place(620, 150, useAppear(10))}>
        <rect x={-210} y={-50} width={420} height={100} rx={20} fill={back < 0.5 ? INK : "#fff"} stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={14} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill={back < 0.5 ? YELLOW : GREEN}>
          {back < 0.5 ? "FAZLA OTOMATİK!" : "ANLAM GERİ GELDİ"}
        </text>
      </g>
      <Arrow from={[460, 320]} to={[600, 320]} progress={back} color={GREEN} />
      <Spoon x={700} y={360} scale={0.9 * back} rotate={useWave(30, 10)} opacity={back} />
      <Sparkles points={back > 0.6 ? [[640, 270], [780, 300], [740, 470]] : []} />
    </g>
  );
};

// 11) Kapanış sorusu
const YourTurn: Visual = () => {
  const card = useAppear(8);
  const pulse = 1 + useWave(24, 0.05);
  return (
    <g>
      <Paper />
      <Person x={180} y={500} scale={1.2} shirt={ORANGE} presenting delay={0} />
      <g transform={place(590, 220, card)}>
        <rect x={-230} y={-170} width={460} height={340} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Chip x={0} y={-95} text="KAŞIK? KAPI?" delay={14} />
        <Chip x={0} y={0} text="KENDİ ADIN?" delay={20} />
        <Chip x={0} y={95} text="HANGİ KELİME?" delay={26} />
      </g>
      <g transform={place(590, 490, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={30} />
      </g>
      <Sparkles points={[[860, 50], [380, 60], [860, 470]]} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  RepeatWord,
  NameIt,
  Thesis,
  Stare,
  Bridge,
  WeakBridge,
  WritingTest,
  Seventy,
  Reverse,
  Alert,
  YourTurn,
};
