// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Dönüş yolunun daha kısa gelmesi (2026-10-31-aksam)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Chip,
  INK,
  NamePlate,
  Note,
  Person,
  place,
  QuestionMark,
  RED,
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
const PAPER = "#fff1e6";
const SKY = "#ffe2c7";
const GRASS = "#9fd47a";
const ROAD = "#5d6670";
const CAR = "#f2753a";
const CAR2 = "#5b8def";
const SKIN = "#f2c79a";

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

// Yandan araba; (0,0) tekerlek hizasının ortası. Sağa bakar.
const Car: React.FC<{ color?: string; face?: "tired" | "happy" | "surprised"; spin?: number }> = ({
  color = CAR,
  face = "happy",
  spin = 0,
}) => (
  <g>
    <path d="M -120 -20 L -120 -60 Q -118 -74 -100 -76 L -60 -78 L -30 -122 Q -24 -128 -14 -128 L 50 -128 Q 62 -128 70 -118 L 100 -80 L 118 -76 Q 132 -72 132 -56 L 132 -20 Z" fill={color} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -20 -84 L -2 -116 L 22 -116 L 22 -84 Z" fill="#cfeefc" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    <path d="M 34 -84 L 34 -116 L 56 -116 L 82 -84 Z" fill="#cfeefc" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    {/* Sürücünün yüzü */}
    <g transform="translate(54 -100)">
      <circle r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
      <circle cx={5} cy={-3} r={2.6} fill={OUTLINE} />
      {face === "tired" ? <path d="M 0 7 L 10 6" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" /> : null}
      {face === "happy" ? <path d="M -1 5 Q 5 11 11 5" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" /> : null}
      {face === "surprised" ? <circle cx={6} cy={7} r={3.5} fill={OUTLINE} /> : null}
    </g>
    <rect x={118} y={-60} width={14} height={12} rx={3} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
    {[-70, 82].map((wx) => (
      <g key={wx} transform={`translate(${wx} -18) rotate(${spin})`}>
        <circle r={26} fill="#2f2f33" stroke={OUTLINE} strokeWidth={5} />
        <circle r={11} fill="#c9ced6" />
        <rect x={-3} y={-24} width={6} height={12} fill="#c9ced6" />
      </g>
    ))}
  </g>
);

// Saat; speed: kare başına derece
const Clock: React.FC<{ x: number; y: number; scale?: number; speed?: number; delay?: number }> = ({ x, y, scale = 1, speed = 3, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <circle r={62} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-3} y={-56} width={6} height={10} fill={OUTLINE} transform={`rotate(${i * 30})`} />
      ))}
      <line x1={0} y1={0} x2={0} y2={-30} stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" transform={`rotate(${frame * speed * 0.083})`} />
      <line x1={0} y1={0} x2={0} y2={-46} stroke={RED} strokeWidth={5} strokeLinecap="round" transform={`rotate(${frame * speed})`} />
      <circle r={7} fill={OUTLINE} />
    </g>
  );
};

const House: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => (
  <g transform={place(x, y, scale * useAppear(delay))}>
    <rect x={-60} y={-80} width={120} height={80} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <path d="M -76 -76 L 0 -140 L 76 -76 Z" fill="#e0434b" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-16} y={-46} width={32} height={46} fill="#8a5a32" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-48} y={-66} width={24} height={22} fill="#cfeefc" stroke={OUTLINE} strokeWidth={3} />
  </g>
);

// Deniz kenarı: şemsiye + dalga
const Beach: React.FC<{ x: number; y: number; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  const sway = useWave(50, 4);
  return (
    <g transform={place(x, y, scale * useAppear(delay))}>
      <path d="M -90 0 Q -70 -18 -50 0 Q -30 -18 -10 0 Q 10 -18 30 0 Q 50 -18 70 0 L 90 0 L 90 20 L -90 20 Z" fill="#7fd0f0" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      <g transform={`rotate(${sway} 0 0)`}>
        <line x1={0} y1={0} x2={0} y2={-120} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -110 Q 0 -170 70 -110 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -24 -112 Q 0 -160 24 -112" fill={CAR} stroke={OUTLINE} strokeWidth={4} />
      </g>
    </g>
  );
};

const Hills: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={SKY} />
    <circle cx={780} cy={90} r={46} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
    <path d="M 0 300 Q 150 200 320 290 Q 480 200 650 280 Q 780 220 900 270 L 900 560 L 0 560 Z" fill={GRASS} stroke={OUTLINE} strokeWidth={5} />
  </g>
);

const SpeedLines: React.FC<{ x: number; y: number; dir: 1 | -1 }> = ({ x, y, dir }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const o = ((frame * 6 + i * 20) % 40) * dir;
        return <line key={i} x1={x - 50 * dir - o} y1={y - 90 + i * 28} x2={x - 120 * dir - o} y2={y - 90 + i * 28} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" opacity={0.6} />;
      })}
    </g>
  );
};

// 1) Giderken uzun, dönerken kısa
const RoadTrip: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const slow = useProgress(0, durationInFrames);
  const fast = useProgress(0, Math.max(20, durationInFrames * 0.45));
  const gx = 120 + slow * 160;
  const rx = 820 - fast * 640;
  return (
    <g>
      <Hills />
      {/* Üst şerit: gidiş */}
      <rect x={0} y={250} width={900} height={110} fill={ROAD} stroke={OUTLINE} strokeWidth={5} />
      <rect x={0} y={400} width={900} height={110} fill={ROAD} stroke={OUTLINE} strokeWidth={5} />
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i}>
          <rect x={i * 100 + 20} y={302} width={50} height={6} fill="#fff" />
          <rect x={i * 100 + 20} y={452} width={50} height={6} fill="#fff" />
        </g>
      ))}
      <g transform={place(gx, 345 + Math.sin(frame / 3) * 1.5, 0.75)}>
        <Car face="tired" spin={frame * 3} />
      </g>
      <g transform={place(rx, 495 + Math.sin(frame / 2) * 2, 0.75)}>
        <g transform="scale(-1 1)">
          <Car color={CAR2} face="happy" spin={frame * 14} />
        </g>
      </g>
      <SpeedLines x={rx + 60} y={495} dir={-1} />
      <Chip x={200} y={60} text="GİDİŞ: UZUN…" dark delay={4} />
      <Chip x={200} y={140} text="DÖNÜŞ: VIIIN!" delay={Math.round(durationInFrames * 0.45)} />
      <Clock x={560} y={130} scale={0.9} speed={6} delay={8} />
    </g>
  );
};

// Ev — tatil yeri haritası
const MapBase: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <g>
    <Paper />
    {Array.from({ length: 9 }).map((_, i) => (
      <line key={i} x1={i * 110 + 10} y1={0} x2={i * 110 + 10} y2={560} stroke="#f6dcc4" strokeWidth={3} />
    ))}
    {Array.from({ length: 5 }).map((_, i) => (
      <line key={`h${i}`} x1={0} y1={i * 120 + 40} x2={900} y2={i * 120 + 40} stroke="#f6dcc4" strokeWidth={3} />
    ))}
    <House x={130} y={340} delay={delay} />
    <Beach x={770} y={320} delay={delay + 6} />
    <NamePlate x={130} y={390} text="EV" delay={delay + 4} />
    <NamePlate x={770} y={390} text="TATİL" delay={delay + 10} />
  </g>
);

// 2) Aynı yol, aynı mesafe
const SameRoad: Visual = ({ durationInFrames }) => {
  const go = useProgress(6, 34);
  const back = useProgress(30, 58);
  return (
    <g>
      <MapBase />
      <Arrow from={[220, 210]} to={[680, 210]} progress={go} color={CAR} />
      <Arrow from={[680, 460]} to={[220, 460]} progress={back} color={CAR2} />
      <Chip x={450} y={160} text="GİDİŞ" delay={10} />
      <Chip x={450} y={510} text="DÖNÜŞ" dark delay={34} />
      <g transform={place(450, 335, useAppear(52))}>
        <text textAnchor="middle" dominantBaseline="middle" fontFamily={uiFont} fontWeight={800} fontSize={44} fill={INK}>
          = AYNI MESAFE
        </text>
      </g>
      <QuestionMark x={450} y={70} size={90} delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

// Bisiklet + sürücü (sağa bakar), (0,0) zemin ortası
const Cyclist: React.FC<{ color?: string }> = ({ color = CAR }) => {
  const frame = useCurrentFrame();
  const a = frame * 10;
  const px = Math.cos((a * Math.PI) / 180) * 18;
  const py = Math.sin((a * Math.PI) / 180) * 18;
  return (
    <g>
      {[-60, 60].map((wx) => (
        <g key={wx} transform={`translate(${wx} -40) rotate(${a})`}>
          <circle r={40} fill="none" stroke={OUTLINE} strokeWidth={6} />
          <line x1={-40} y1={0} x2={40} y2={0} stroke={OUTLINE} strokeWidth={2} />
          <line x1={0} y1={-40} x2={0} y2={40} stroke={OUTLINE} strokeWidth={2} />
        </g>
      ))}
      <path d="M -60 -40 L -10 -40 L 30 -96 L -30 -96 Z M 30 -96 L 60 -40 M -10 -40 L -30 -110" fill="none" stroke={color} strokeWidth={8} strokeLinejoin="round" />
      <line x1={22} y1={-112} x2={40} y2={-112} stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" />
      {/* Sürücü */}
      <path d={`M -30 -116 L ${-10 + px} ${-40 + py}`} stroke="#2f3f63" strokeWidth={14} strokeLinecap="round" />
      <path d="M -30 -116 L -8 -186" stroke={color} strokeWidth={30} strokeLinecap="round" />
      <path d="M -10 -172 L 30 -114" stroke={SKIN} strokeWidth={10} strokeLinecap="round" />
      <circle cx={-2} cy={-212} r={22} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <path d="M -26 -218 Q -2 -250 22 -218 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={8} cy={-210} r={3} fill={OUTLINE} />
    </g>
  );
};

const Bar: React.FC<{ x: number; y: number; w: number; color: string; label: string; value: string; delay: number }> = ({ x, y, w, color, label, value, delay }) => {
  const p = useProgress(delay, delay + 20);
  return (
    <g>
      <text x={x} y={y - 14} fontFamily={uiFont} fontWeight={800} fontSize={28} fill={INK}>
        {label}
      </text>
      <rect x={x} y={y} width={Math.max(1, w * p)} height={50} rx={10} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <text x={x + w * p + 14} y={y + 36} fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK} opacity={p}>
        {value}
      </text>
    </g>
  );
};

// 3) Bisiklet deneyi: 44 dk → 37 dk
const BikeStudy: Visual = ({ durationInFrames }) => {
  const bob = useWave(14, 2);
  return (
    <g>
      <Paper />
      <rect x={0} y={480} width={900} height={80} fill="#e9c9a8" />
      <g transform={place(180, 480 + bob, 0.95)}>
        <Cyclist />
      </g>
      <Bar x={360} y={170} w={400} color={CAR} label="GİDİŞ" value="44 DK" delay={8} />
      <Bar x={360} y={320} w={333} color={CAR2} label="DÖNÜŞ" value="37 DK" delay={26} />
      <Chip x={580} y={450} text="DAHA KISA SANDILAR" delay={Math.round(durationInFrames * 0.5)} />
      <NamePlate x={560} y={70} text="TAHMİN EDİLEN SÜRE" delay={2} />
    </g>
  );
};

// 4) Beklenti: "kısa sürer" → uzadı
const Expectation: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const late = frame > at(0.5);
  return (
    <g>
      <Hills />
      <rect x={0} y={430} width={900} height={110} fill={ROAD} stroke={OUTLINE} strokeWidth={5} />
      <g transform={place(260, 520, 0.95)}>
        <Car face={late ? "surprised" : "happy"} spin={frame * 4} />
      </g>
      <ThoughtBubble x={180} y={170} r={92} delay={4}>
        <text textAnchor="middle" y={-6} fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
          KISA
        </text>
        <text textAnchor="middle" y={30} fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
          SÜRER!
        </text>
      </ThoughtBubble>
      <Clock x={600} y={220} scale={1.3} speed={late ? 18 : 4} delay={10} />
      {late ? <BigText x={760} y={110} text="?!" size={110} color={RED} delay={at(0.5)} /> : null}
      <Chip x={600} y={400} text="UZADI!" dark delay={at(0.55)} />
    </g>
  );
};

// 5) Dönüşe hazırlıklı: uzun bekliyor, kısa geliyor
const Ready: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const expect = useProgress(2, 16);
  const real = useProgress(at(0.35), at(0.6));
  return (
    <g>
      <Paper />
      <Person x={150} y={500} scale={1.25} shirt={CAR2} delay={0} />
      <ThoughtBubble x={250} y={115} r={80} delay={2}>
        <text textAnchor="middle" y={-4} fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
          UZUN
        </text>
        <text textAnchor="middle" y={26} fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
          SÜRECEK…
        </text>
      </ThoughtBubble>
      <text x={360} y={230} fontFamily={uiFont} fontWeight={800} fontSize={28} fill={INK}>
        BEKLENTİ
      </text>
      <rect x={360} y={246} width={Math.max(1, 460 * expect)} height={50} rx={10} fill="#c9ced6" stroke={OUTLINE} strokeWidth={5} />
      <text x={360} y={360} fontFamily={uiFont} fontWeight={800} fontSize={28} fill={INK}>
        DÖNÜŞ
      </text>
      <rect x={360} y={376} width={Math.max(1, 300 * real)} height={50} rx={10} fill={CAR2} stroke={OUTLINE} strokeWidth={5} />
      <Chip x={600} y={490} text="KISA GELDİ!" delay={at(0.6)} />
      <Sparkles points={[[700, 380], [820, 450], [480, 470]]} />
    </g>
  );
};

// 6) Başka yoldan dönünce de
const OtherRoute: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const go = useProgress(2, at(0.35));
  const back = useProgress(at(0.3), at(0.7));
  const curvy = "M 680 450 C 560 560 520 380 430 470 C 340 560 300 420 220 450";
  return (
    <g>
      <MapBase />
      <Arrow from={[220, 210]} to={[680, 210]} progress={go} color={CAR} />
      <path d={curvy} fill="none" stroke={CAR2} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${back} 1`} />
      {back >= 1 ? <path transform={place(220, 450, 1, 200)} d="M 0 0 L -22 -14 L -22 14 Z" fill={CAR2} /> : null}
      <Chip x={450} y={160} text="GİDİŞ YOLU" delay={4} />
      <Chip x={450} y={330} text="BAŞKA YOL" dark delay={at(0.32)} />
      <NamePlate x={450} y={60} text="ETKİ YİNE SÜRDÜ" delay={at(0.72)} />
    </g>
  );
};

// 7) Önceden "uzun sürecek" denince etki kayboldu
const ToldLong: Visual = ({ durationInFrames }) => {
  const at = (f: number) => Math.round(durationInFrames * f);
  const p = useProgress(at(0.35), at(0.6));
  return (
    <g>
      <Paper />
      <Note x={250} y={170} width={360} title="YOL UZUN SÜRECEK!" rotate={-4} delay={2} />
      <Person x={200} y={520} scale={1.15} shirt="#a46be0" glasses delay={6} />
      <Person x={360} y={520} scale={1.1} shirt="#3fb4a0" facing="left" presenting delay={10} />
      <text x={520} y={250} fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
        GİDİŞ
      </text>
      <rect x={520} y={264} width={Math.max(1, 300 * p)} height={46} rx={10} fill={CAR} stroke={OUTLINE} strokeWidth={5} />
      <text x={520} y={360} fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
        DÖNÜŞ
      </text>
      <rect x={520} y={374} width={Math.max(1, 300 * p)} height={46} rx={10} fill={CAR2} stroke={OUTLINE} strokeWidth={5} />
      <Chip x={670} y={480} text="FARK KALMADI" dark delay={at(0.62)} />
    </g>
  );
};

// 8) Yolda değil, sonradan kısa geliyor
const Hindsight: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = (f: number) => Math.round(durationInFrames * f);
  const after = frame > at(0.5);
  const walkerX = ((frame * 3) % 300) - 150;
  return (
    <g>
      <Paper />
      {/* Ekran: yürüyüş videosu */}
      <g transform={place(270, 230, useAppear(2))}>
        <rect x={-200} y={-140} width={400} height={260} rx={18} fill="#3a3a3f" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-184} y={-124} width={368} height={228} rx={8} fill="#cfeefc" />
        <rect x={-184} y={60} width={368} height={44} fill={GRASS} />
        <g transform={`translate(${walkerX * 0.9} 60)`}>
          <circle cx={0} cy={-80} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
          <line x1={0} y1={-66} x2={0} y2={-30} stroke={CAR} strokeWidth={12} strokeLinecap="round" />
          <line x1={0} y1={-30} x2={Math.sin(frame / 4) * 12} y2={0} stroke="#2f3f63" strokeWidth={8} strokeLinecap="round" />
          <line x1={0} y1={-30} x2={-Math.sin(frame / 4) * 12} y2={0} stroke="#2f3f63" strokeWidth={8} strokeLinecap="round" />
        </g>
        <rect x={-30} y={120} width={60} height={40} fill="#3a3a3f" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Chip x={270} y={470} text="YOLDA: FARK YOK" dark delay={6} />
      <Person x={700} y={520} scale={1.2} shirt={CAR} delay={4} />
      {after ? (
        <ThoughtBubble x={700} y={150} r={90} delay={at(0.5)}>
          <text textAnchor="middle" y={-6} fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
            DÖNÜŞ
          </text>
          <text textAnchor="middle" y={26} fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
            KISAYDI!
          </text>
        </ThoughtBubble>
      ) : null}
      <Chip x={700} y={320} text="SONRADAN: KISA" delay={at(0.58)} />
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
      <Person x={170} y={530} scale={1.3} shirt={CAR} presenting />
      <g transform={place(600, 210, card)}>
        <rect x={-250} y={-120} width={500} height={240} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -190 116 L -220 170 L -140 116 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-180} y={110} width={44} height={12} fill="#fff" />
        <g transform="translate(-165 50) scale(0.55)">
          <Car spin={frame * 6} />
        </g>
        <text x={0} y={22} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={40} fill={INK}>
          YA DA
        </text>
        <g transform="translate(150 50) scale(0.55)">
          <Cyclist color={CAR2} />
        </g>
      </g>
      <g transform={place(600, 460, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={24} />
      </g>
      <BigText x={840} y={400} text="?" size={110} color={RED} delay={30} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  RoadTrip,
  SameRoad,
  BikeStudy,
  Expectation,
  Ready,
  OtherRoute,
  ToldLong,
  Hindsight,
  YourTurn,
};
