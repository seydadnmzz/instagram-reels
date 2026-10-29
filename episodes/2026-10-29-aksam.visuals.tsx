// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Kayıttaki sesimizin tuhaf gelmesi (2026-10-29-aksam)
import { useCurrentFrame } from "remotion";
import {
  BigText,
  Chip,
  Heart,
  INK,
  NamePlate,
  Person,
  place,
  QuestionMark,
  RED,
  Sparkles,
  uiFont,
  useAppear,
  useProgress,
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff1e6";
const SKIN = "#f2c79a";
const AIR = "#4aa3d8";
const BONE = "#f28c28";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

// Akıllı telefon; ekranında oynayan ses dalgası. (0,0) telefonun ortası
const Phone: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={`scale(${scale})`}>
      <rect x={-34} y={-62} width={68} height={124} rx={12} fill="#3a3f4b" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-26} y={-50} width={52} height={96} rx={6} fill="#ffe2c4" />
      {Array.from({ length: 7 }).map((_, i) => {
        const h = 8 + Math.abs(Math.sin(frame / 4 + i * 1.3)) * 30;
        return <rect key={i} x={-21 + i * 6.5} y={-2 - h / 2} width={4} height={h} rx={2} fill={BONE} />;
      })}
      <circle cx={0} cy={54} r={4} fill="#ffe2c4" />
    </g>
  );
};

// Dışa doğru yayılan ses halkaları
const Waves: React.FC<{ x: number; y: number; angle?: number; color?: string; size?: number; delay?: number }> = ({
  x,
  y,
  angle = 0,
  color = AIR,
  size = 1,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  if (frame < delay) return null;
  return (
    <g transform={place(x, y, size, angle)} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round">
      {[0, 1, 2].map((i) => {
        const k = ((t / 24 + i / 3) % 1) * 1;
        const r = 20 + k * 70;
        return <path key={i} d={`M ${r * 0.5} ${-r * 0.87} A ${r} ${r} 0 0 1 ${r * 0.5} ${r * 0.87}`} opacity={1 - k} />;
      })}
    </g>
  );
};

// Yandan büyük kafa (sağa bakar); ağız ≈ (150, 100), kulak ≈ (-110, 20) — kafa merkezine göre
const BigHead: React.FC<{ shake?: number; children?: React.ReactNode }> = ({ shake = 0, children }) => {
  const frame = useCurrentFrame();
  const talk = 6 + Math.abs(Math.sin(frame / 3)) * 12;
  return (
    <g transform={`translate(${shake} 0)`}>
      <rect x={-70} y={150} width={110} height={130} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -190 0 C -190 -140 -80 -210 30 -200 C 140 -190 200 -110 195 -20 L 225 40 L 195 55 C 200 110 180 150 120 165 L 40 175 C -80 190 -190 120 -190 0 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      {children}
      <path d="M -190 0 C -200 -150 -70 -230 60 -205 C 120 -195 170 -160 185 -120 C 120 -150 40 -150 -20 -120 C -70 -95 -110 -40 -120 20 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-110} cy={20} r={26} fill="#e8b07f" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={110} cy={-40} r={14} fill={OUTLINE} />
      <path d="M 70 -78 Q 110 -96 140 -80" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={160} cy={100} rx={22} ry={talk} fill="#8a2f3a" stroke={OUTLINE} strokeWidth={5} />
    </g>
  );
};

// Kendini çizen eğri ok
const CurvePath: React.FC<{ d: string; progress: number; color: string; dashed?: boolean }> = ({ d, progress, color, dashed }) => (
  <g opacity={progress > 0 ? 1 : 0}>
    <path d={d} fill="none" stroke={OUTLINE} strokeWidth={18} strokeLinecap="round" pathLength={1} strokeDasharray={`${progress} 1`} />
    <path d={d} fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" pathLength={1} strokeDasharray={`${progress} 1`} />
    {dashed ? <path d={d} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="12 14" opacity={progress} /> : null}
  </g>
);

// Ayaklı mikrofon; (0,0) zemindeki ayak
const Mic: React.FC = () => (
  <g>
    <rect x={-40} y={-10} width={80} height={12} rx={6} fill="#3a3f4b" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-5} y={-200} width={10} height={194} fill="#6b7280" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-26} y={-290} width={52} height={96} rx={26} fill="#9aa3b2" stroke={OUTLINE} strokeWidth={5} />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={-20} y1={-270 + i * 18} x2={20} y2={-270 + i * 18} stroke={OUTLINE} strokeWidth={3} />
    ))}
  </g>
);

const PlaybackShock: Visual = () => {
  const frame = useCurrentFrame();
  const shake = frame > 28 ? Math.sin(frame * 1.6) * 3 : 0;
  return (
    <g>
      <Paper />
      <g transform={`translate(${shake} 0)`}>
        <Person x={300} y={540} scale={1.4} shirt={BONE} presenting holding={<Phone scale={1.1} />} />
      </g>
      <Waves x={450} y={290} angle={-20} color={BONE} delay={6} />
      <g transform={place(620, 150, useAppear(26))}>
        <rect x={-150} y={-60} width={300} height={110} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -110 46 L -140 100 L -60 46 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-104} y={40} width={40} height={12} fill="#fff" />
        <text x={0} y={14} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={40} fill={INK}>
          BU BEN Mİ?
        </text>
      </g>
      <QuestionMark x={760} y={380} size={1.1} delay={34} color={RED} />
      <BigText x={120} y={160} text="!" size={150} color={RED} delay={30} />
    </g>
  );
};

const TwoPaths: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const air = useProgress(at(0.35), at(0.6));
  const bone = useProgress(at(0.5), at(0.75));
  return (
    <g>
      <Paper />
      <g transform="translate(380 300) scale(0.95)">
        <BigHead>
          <CurvePath d="M 140 90 C 60 70 -20 60 -100 25" progress={bone} color={BONE} />
        </BigHead>
        <CurvePath d="M 200 110 C 380 60 300 -330 0 -290 C -220 -260 -270 -60 -140 15" progress={air} color={AIR} dashed />
      </g>
      <BigText x={790} y={110} text="2" size={150} delay={at(0.3)} />
      <Chip x={790} y={250} text="HAVA" delay={at(0.55)} />
      <Chip x={770} y={460} text="KEMİK" dark delay={at(0.72)} />
    </g>
  );
};

const SkullVibes: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const boneOn = frame > at(0.45);
  const shake = boneOn ? Math.sin(frame * 2.2) * 3 : 0;
  return (
    <g>
      <Paper />
      <g transform="translate(360 310) scale(0.95)">
        <BigHead shake={shake}>
          {boneOn
            ? [0, 1, 2].map((i) => {
                const k = (((frame - at(0.45)) / 20 + i / 3) % 1);
                return (
                  <ellipse key={i} cx={20} cy={20} rx={40 + k * 150} ry={30 + k * 120} fill="none" stroke={BONE} strokeWidth={8} opacity={0.9 - k * 0.8} />
                );
              })
            : null}
        </BigHead>
      </g>
      <Waves x={530} y={410} angle={20} delay={2} />
      <NamePlate x={690} y={500} text="HAVADAN" delay={at(0.08)} />
      <Chip x={190} y={500} text="TİTREŞİM" delay={at(0.5)} />
      <Chip x={720} y={150} text="KEMİK" dark delay={at(0.45)} />
    </g>
  );
};

const DeepVoice: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const boost = useProgress(at(0.15), at(0.45));
  const base = [70, 80, 90, 110, 120, 110, 100, 90, 80, 70];
  return (
    <g>
      <Paper />
      <g transform={place(450, 300, useAppear(2))}>
        <rect x={-380} y={-210} width={760} height={330} rx={26} fill="#2d2a33" stroke={OUTLINE} strokeWidth={6} />
        <line x1={-340} y1={90} x2={340} y2={90} stroke="#6b6670" strokeWidth={4} />
        {base.map((h, i) => {
          const low = i < 4;
          const wob = Math.abs(Math.sin(frame / 5 + i)) * 14;
          const hh = h + wob + (low ? boost * (160 - i * 30) : 0);
          return <rect key={i} x={-330 + i * 68} y={90 - hh} width={48} height={hh} rx={8} fill={low ? BONE : "#8fd3c7"} stroke={OUTLINE} strokeWidth={4} />;
        })}
      </g>
      <Chip x={240} y={480} text="KALIN" delay={at(0.2)} />
      <Chip x={660} y={480} text="İNCE" dark delay={at(0.3)} />
      <g transform={place(240, 100, useAppear(at(0.4)))}>
        <path d="M 0 40 L 0 -30 M -26 -6 L 0 -34 L 26 -6" fill="none" stroke={RED} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
};

const MicHearsAir: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  return (
    <g>
      <Paper />
      <Person x={180} y={520} scale={1.3} shirt={BONE} />
      <Waves x={250} y={270} delay={4} />
      <g transform={place(420, 520, useAppear(2))}>
        <Mic />
      </g>
      <Chip x={420} y={110} text="SADECE HAVA" delay={at(0.15)} />
      <Person x={720} y={520} scale={1.3} shirt="#5b8def" facing="left" delay={at(0.55)} />
      <Waves x={600} y={270} angle={180} delay={at(0.6)} />
      <NamePlate x={720} y={160} text="BAŞKALARI" delay={at(0.62)} />
      <BigText x={570} y={400} text="=" size={120} delay={at(0.7)} />
    </g>
  );
};

// Ses kartı (gizli ses kaydı)
const VoiceCard: React.FC<{ x: number; y: number; delay: number; highlight?: boolean; stars: number }> = ({ x, y, delay, highlight, stars }) => {
  const appear = useAppear(delay);
  const starIn = useProgress(delay + 20, delay + 40);
  const shown = Math.round(stars * starIn);
  return (
    <g transform={place(x, y, appear)}>
      <rect x={-110} y={-130} width={220} height={260} rx={22} fill={highlight ? "#fff8d6" : "#fff"} stroke={OUTLINE} strokeWidth={6} />
      <g transform="translate(0 -40)">
        <Phone scale={0.9} />
      </g>
      <text x={0} y={70} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
        ?
      </text>
      {Array.from({ length: 5 }).map((_, i) => (
        <text key={i} x={-80 + i * 40} y={112} textAnchor="middle" fontFamily={uiFont} fontSize={34} fill={i < shown ? YELLOW : "#ddd"} stroke={OUTLINE} strokeWidth={1.5}>
          ★
        </text>
      ))}
    </g>
  );
};

const BlindTest: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  return (
    <g>
      <Paper />
      <VoiceCard x={180} y={230} delay={4} stars={2} />
      <VoiceCard x={450} y={230} delay={10} stars={5} highlight />
      <VoiceCard x={720} y={230} delay={16} stars={3} />
      <Heart x={450} y={70} size={0.55} beat delay={at(0.55)} />
      <Chip x={450} y={430} text="KENDİ SESİ" delay={at(0.55)} />
      <NamePlate x={450} y={510} text="FARK ETMEDEN DİNLEDİLER" delay={at(0.3)} />
      <Sparkles points={[[330, 110], [580, 120], [300, 360]]} />
    </g>
  );
};

const JustUnfamiliar: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const check = useProgress(at(0.3), at(0.5));
  return (
    <g>
      <Paper />
      <Person x={250} y={530} scale={1.35} shirt={BONE} presenting holding={<Phone scale={1.1} />} delay={2} />
      <Waves x={390} y={270} angle={-20} color={BONE} delay={6} />
      <g transform={place(650, 230, useAppear(at(0.15)))}>
        <circle r={130} fill="#fff" stroke={OUTLINE} strokeWidth={7} />
        <path d="M -60 0 L -15 45 L 70 -50" fill="none" stroke="#3fb45a" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${check} 1`} />
      </g>
      <Chip x={650} y={450} text="ALIŞKANLIK" dark delay={at(0.45)} />
      <Sparkles points={[[520, 90], [800, 120], [790, 350]]} />
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
      <Person x={200} y={530} scale={1.3} shirt={BONE} presenting holding={<Phone />} />
      <g transform={place(610, 200, card)}>
        <rect x={-220} y={-110} width={440} height={220} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -160 106 L -190 160 L -110 106 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-150} y={100} width={44} height={12} fill="#fff" />
        <g transform="translate(-120 0)">
          <Phone scale={1.1} />
        </g>
        <text x={50} y={22} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill={INK}>
          DİNLER
        </text>
        <text x={50} y={72} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill={RED}>
          MİSİN?
        </text>
      </g>
      <g transform={place(610, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={24} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  PlaybackShock,
  TwoPaths,
  SkullVibes,
  DeepVoice,
  MicHearsAir,
  BlindTest,
  JustUnfamiliar,
  YourTurn,
};
