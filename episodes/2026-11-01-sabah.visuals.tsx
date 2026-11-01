// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Açken sinirlenmek / "hangry" (2026-11-01-sabah)
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
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff0f4";
const WALL = "#ffe1ea";
const FLOOR = "#f6c7a8";
const SKIN = "#f2c79a";
const ANGRY_SKIN = "#f28a7a";
const PINK = "#ff4f8b";
const TEAL = "#3fb4a0";
const BLUE = "#5b8def";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Paper: React.FC = () => <rect width={900} height={560} fill={PAPER} />;

type Mood = "angry" | "calm" | "happy" | "think";

// Belden yukarı karakter; (0,0) gövdenin alt ortası. Kafa merkezi y=-200.
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  mood: Mood;
  shirt?: string;
  hair?: string;
  anger?: number; // 0..1, yüz kızarıklığı
  delay?: number;
  shake?: boolean;
}> = ({ x, y, scale = 1, mood, shirt = TEAL, hair = "#4a2f1d", anger, delay = 0, shake = false }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const redness = anger ?? (mood === "angry" ? 1 : 0);
  const skin = redness > 0 ? mixColor(SKIN, ANGRY_SKIN, redness) : SKIN;
  const jitter = shake ? Math.sin(frame * 1.7) * 3 : 0;
  return (
    <g transform={place(x + jitter, y, scale * a)}>
      {/* Gövde */}
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={skin} stroke={OUTLINE} strokeWidth={5} />
      {/* Kafa */}
      <circle cx={0} cy={-200} r={70} fill={skin} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <Face mood={mood} />
      {mood === "angry" ? <Steam x={0} y={-290} /> : null}
    </g>
  );
};

const Face: React.FC<{ mood: Mood }> = ({ mood }) => {
  const frame = useCurrentFrame();
  const blink = frame % 80 > 75 ? 0.15 : 1;
  if (mood === "angry") {
    return (
      <g>
        <path d="M -46 -224 L -12 -210" stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
        <path d="M 46 -224 L 12 -210" stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
        <circle cx={-26} cy={-196} r={8} fill={OUTLINE} />
        <circle cx={26} cy={-196} r={8} fill={OUTLINE} />
        <path d="M -30 -158 Q 0 -178 30 -158" fill="none" stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" />
      </g>
    );
  }
  if (mood === "think") {
    return (
      <g>
        <path d="M -42 -222 Q -26 -232 -10 -222" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <path d="M 12 -226 Q 28 -236 44 -226" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
        <circle cx={-24} cy={-198} r={8} fill={OUTLINE} transform={`translate(0 ${-198 * (1 - blink)}) scale(1 ${blink})`} />
        <circle cx={30} cy={-202} r={8} fill={OUTLINE} transform={`translate(0 ${-202 * (1 - blink)}) scale(1 ${blink})`} />
        <path d="M -18 -162 L 18 -166" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g>
      <g transform={`translate(0 ${-198 * (1 - blink)}) scale(1 ${blink})`}>
        <circle cx={-26} cy={-198} r={8} fill={OUTLINE} />
        <circle cx={26} cy={-198} r={8} fill={OUTLINE} />
      </g>
      {mood === "happy" ? (
        <path d="M -32 -168 Q 0 -136 32 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      ) : (
        <path d="M -24 -166 Q 0 -150 24 -166" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      )}
      <circle cx={-46} cy={-174} r={10} fill="#f59ab0" opacity={0.7} />
      <circle cx={46} cy={-174} r={10} fill="#f59ab0" opacity={0.7} />
    </g>
  );
};

// Kafadan çıkan öfke dumanı
const Steam: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {[-50, 50].map((dx, i) => {
        const t = ((frame + i * 12) % 30) / 30;
        return (
          <g key={dx} transform={place(x + dx, y + 20 - t * 40, 0.6 + t * 0.6)} opacity={1 - t}>
            <circle r={18} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={16} cy={-8} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          </g>
        );
      })}
    </g>
  );
};

const mixColor = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const m = pa.map((v, i) => Math.round(v + (pb[i] - v) * Math.min(1, Math.max(0, t))));
  return `#${m.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
};

// Boş tabak + çatal bıçak
const Plate: React.FC<{ x: number; y: number; scale?: number; food?: number; delay?: number }> = ({ x, y, scale = 1, food = 0, delay = 0 }) => (
  <g transform={place(x, y, scale * useAppear(delay))}>
    <ellipse cx={0} cy={0} rx={110} ry={34} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
    <ellipse cx={0} cy={0} rx={70} ry={20} fill="none" stroke="#d8d8d8" strokeWidth={4} />
    {food > 0 ? (
      <g transform={place(0, -10, food)}>
        <path d="M -60 0 Q -60 -40 0 -44 Q 60 -40 60 0 Z" fill="#f2b44a" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-62} y={-10} width={124} height={12} rx={6} fill="#7cc46a" stroke={OUTLINE} strokeWidth={4} />
      </g>
    ) : null}
    <rect x={-150} y={-60} width={10} height={80} rx={5} fill="#c9ced6" stroke={OUTLINE} strokeWidth={4} />
    <rect x={140} y={-60} width={10} height={80} rx={5} fill="#c9ced6" stroke={OUTLINE} strokeWidth={4} />
  </g>
);

const Clock: React.FC<{ x: number; y: number; scale?: number; speed?: number; delay?: number }> = ({ x, y, scale = 1, speed = 6, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <circle r={58} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-3} y={-52} width={6} height={10} fill={OUTLINE} transform={`rotate(${i * 30})`} />
      ))}
      <line x1={0} y1={0} x2={0} y2={-28} stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" transform={`rotate(${frame * speed * 0.083 + 120})`} />
      <line x1={0} y1={0} x2={0} y2={-42} stroke={RED} strokeWidth={5} strokeLinecap="round" transform={`rotate(${frame * speed})`} />
      <circle r={7} fill={OUTLINE} />
    </g>
  );
};

// "GURR" yazılı mide guruldaması
const Growl: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const a = useAppear(delay);
  const w = useWave(12, 4);
  return (
    <g transform={place(x, y, a, w)}>
      <path d="M -70 -10 Q -60 -40 -30 -34 Q -10 -60 20 -40 Q 50 -56 64 -26 Q 90 -10 64 12 Q 50 36 20 22 Q -10 40 -36 22 Q -78 26 -70 -10 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <text x={0} y={10} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
        GURR!
      </text>
    </g>
  );
};

// 1) Yemek gecikti, sinirlendin
const LateLunch: Visual = ({ durationInFrames }) => {
  const anger = useProgress(10, Math.max(30, durationInFrames * 0.6));
  const mood: Mood = anger > 0.55 ? "angry" : "think";
  return (
    <g>
      <rect width={900} height={560} fill={WALL} />
      <rect y={430} width={900} height={130} fill={FLOOR} stroke={OUTLINE} strokeWidth={5} />
      <Clock x={760} y={120} speed={14} delay={4} />
      <Bust x={330} y={470} scale={1.15} mood={mood} anger={anger} shake={anger > 0.55} />
      {/* Masa */}
      <rect x={60} y={420} width={780} height={40} rx={10} fill="#c98a52" stroke={OUTLINE} strokeWidth={6} />
      <Plate x={620} y={410} delay={10} />
      <Growl x={120} y={320} delay={Math.round(durationInFrames * 0.35)} />
      <Chip x={620} y={300} text="YEMEK NEREDE?!" dark delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

// 2) AÇ + KIZGIN = HANGRY
const HangryWord: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const join = useProgress(durationInFrames * 0.15, durationInFrames * 0.3);
  const big = useAppear(Math.round(durationInFrames * 0.28));
  const pulse = 1 + 0.04 * Math.sin(frame / 5);
  return (
    <g>
      <Paper />
      <g transform={place(190 + join * 70, 190, 1.3 - join * 0.2)}>
        <Plate x={0} y={20} scale={0.7} delay={2} />
        <Chip x={0} y={-70} text="AÇ" delay={6} />
      </g>
      <BigText x={450} y={180} text="+" size={120} color={PINK} delay={12} />
      <g transform={place(710 - join * 70, 190, 1.3 - join * 0.2)}>
        <Bust x={0} y={95} scale={0.45} mood="angry" delay={10} />
        <Chip x={0} y={-70} text="KIZGIN" delay={14} />
      </g>
      <g transform={place(450, 410, big * pulse)}>
        <rect x={-260} y={-70} width={520} height={140} rx={30} fill={PINK} stroke={OUTLINE} strokeWidth={7} />
        <text x={0} y={30} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={96} fill="#fff" stroke={OUTLINE} strokeWidth={5} paintOrder="stroke">
          HANGRY
        </text>
      </g>
      <Sparkles points={[[170, 360], [740, 340], [800, 470]]} />
    </g>
  );
};

// Telefon ve bildirim
const Phone: React.FC<{ x: number; y: number; scale?: number; level: number; delay?: number }> = ({ x, y, scale = 1, level, delay = 0 }) => {
  const a = useAppear(delay);
  const buzz = useWave(6, 2);
  return (
    <g transform={place(x, y, scale * a, buzz)}>
      <rect x={-110} y={-200} width={220} height={400} rx={30} fill="#2f2f38" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-94} y={-176} width={188} height={352} rx={16} fill="#fff" />
      <rect x={-80} y={-150} width={160} height={110} rx={14} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <text x={0} y={-104} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={22} fill={INK}>
        NE KADAR
      </text>
      <text x={0} y={-72} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={22} fill={INK}>
        AÇSIN?
      </text>
      {/* Kaydırıcı */}
      <rect x={-70} y={0} width={140} height={14} rx={7} fill="#e3e3e3" stroke={OUTLINE} strokeWidth={3} />
      <rect x={-70} y={0} width={140 * level} height={14} rx={7} fill={PINK} />
      <circle cx={-70 + 140 * level} cy={7} r={16} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <text x={-70} y={52} textAnchor="middle" fontSize={30}>
        🙂
      </text>
      <text x={70} y={52} textAnchor="middle" fontSize={30}>
        😫
      </text>
      <rect x={-50} y={110} width={100} height={36} rx={18} fill={TEAL} stroke={OUTLINE} strokeWidth={3} />
      <text x={0} y={135} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={18} fill="#fff">
        GÖNDER
      </text>
    </g>
  );
};

// 3) 64 kişi, 3 hafta, günde 5 kez
const PhoneSurvey: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const level = 0.5 + 0.45 * Math.sin(frame / 14);
  const days = Math.min(21, Math.floor(useProgress(10, durationInFrames * 0.85) * 21));
  return (
    <g>
      <Paper />
      <Phone x={200} y={290} scale={1.1} level={level} delay={2} />
      {/* Takvim */}
      <g transform={place(620, 220, useAppear(10))}>
        <rect x={-210} y={-150} width={420} height={300} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-210} y={-150} width={420} height={60} rx={20} fill={PINK} stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={-108} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill="#fff">
          3 HAFTA
        </text>
        {Array.from({ length: 21 }).map((_, i) => {
          const cx = -165 + (i % 7) * 55;
          const cy = -50 + Math.floor(i / 7) * 70;
          return (
            <g key={i}>
              <rect x={cx - 22} y={cy - 22} width={44} height={44} rx={8} fill={i < days ? "#ffd1df" : "#f4f4f4"} stroke={OUTLINE} strokeWidth={3} />
              {i < days ? <path d={`M ${cx - 10} ${cy} L ${cx - 2} ${cy + 9} L ${cx + 12} ${cy - 10}`} fill="none" stroke={PINK} strokeWidth={5} strokeLinecap="round" /> : null}
            </g>
          );
        })}
      </g>
      <Chip x={500} y={460} text="64 KİŞİ" delay={18} />
      <Chip x={730} y={460} text="GÜNDE 5 KEZ" dark delay={26} />
    </g>
  );
};

// Animasyonlu çubuk
const Bar: React.FC<{ x: number; label: string; color: string; value: number; icon: string }> = ({ x, label, color, value, icon }) => (
  <g>
    <rect x={x - 55} y={120} width={110} height={300} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <rect x={x - 49} y={414 - 288 * value} width={98} height={288 * value} rx={10} fill={color} />
    <text x={x} y={100} textAnchor="middle" fontSize={56}>
      {icon}
    </text>
    <text x={x} y={466} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
      {label}
    </text>
  </g>
);

// 4) Açlık arttıkça öfke artıyor, keyif düşüyor
const MoodMeter: Visual = ({ durationInFrames }) => {
  const p = useProgress(8, durationInFrames * 0.75);
  const a = useAppear(0);
  const up = useAppear(Math.round(durationInFrames * 0.4));
  return (
    <g>
      <Paper />
      <g opacity={a}>
        <Bar x={170} label="AÇLIK" color="#f2b44a" value={0.15 + p * 0.8} icon="🍔" />
        <Bar x={400} label="ÖFKE" color={RED} value={0.15 + p * 0.75} icon="😠" />
        <Bar x={630} label="HUYSUZLUK" color={PINK} value={0.2 + p * 0.7} icon="😤" />
        <Bar x={800} label="" color={TEAL} value={0.85 - p * 0.65} icon="😊" />
        <text x={800} y={466} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
          KEYİF
        </text>
      </g>
      {[400, 630].map((x) => (
        <g key={x} transform={place(x + 75, 160, up)}>
          <path d="M 0 -30 L 22 4 L 8 4 L 8 34 L -8 34 L -8 4 L -22 4 Z" fill={RED} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        </g>
      ))}
      <g transform={place(870, 380, up, 180)}>
        <path d="M 0 -30 L 22 4 L 8 4 L 8 34 L -8 34 L -8 4 L -22 4 Z" fill={TEAL} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      </g>
    </g>
  );
};

// Gülen mide
const Tummy: React.FC<{ x: number; y: number; scale?: number; delay?: number; sad?: boolean }> = ({ x, y, scale = 1, delay = 0, sad = true }) => {
  const a = useAppear(delay);
  const w = useWave(16, 3);
  return (
    <g transform={place(x, y, scale * a, w)}>
      <path d="M -40 -70 Q -10 -90 10 -60 Q 30 -30 70 -40 Q 110 -40 100 20 Q 90 80 20 80 Q -60 80 -70 20 Q -76 -20 -40 -30 Z" fill="#f7a6a0" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={0} cy={10} r={7} fill={OUTLINE} />
      <circle cx={44} cy={10} r={7} fill={OUTLINE} />
      {sad ? (
        <path d="M 6 46 Q 22 32 38 46" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      ) : (
        <path d="M 6 36 Q 22 52 38 36" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      )}
    </g>
  );
};

// 5) Beyin açlığın kötü hissini çevreye kızgınlık sanıyor
const Misread: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const sig = useProgress(8, durationInFrames * 0.2);
  const out = useProgress(durationInFrames * 0.25, durationInFrames * 0.4);
  const dash = (frame * 3) % 40;
  return (
    <g>
      <Paper />
      <Tummy x={130} y={420} delay={2} />
      <Chip x={140} y={290} text="KÖTÜ HİS" dark delay={8} />
      {/* Sinyal dalgası */}
      <path
        d="M 230 400 Q 280 360 320 380 Q 360 400 400 340 Q 420 300 410 260"
        fill="none"
        stroke={PINK}
        strokeWidth={8}
        strokeDasharray="20 20"
        strokeDashoffset={-dash}
        strokeLinecap="round"
        opacity={sig}
      />
      <Brain x={430} y={170} scale={0.9} mood="confused" delay={6} />
      <QuestionMark x={560} y={70} size={70} delay={14} />
      <Arrow from={[540, 240]} to={[670, 350]} progress={out} color={RED} />
      <g transform={place(760, 420, useAppear(Math.round(durationInFrames * 0.35)))}>
        <Bust x={0} y={110} scale={0.75} mood="think" shirt={BLUE} hair="#e0a33a" />
      </g>
      <BigText x={865} y={360} text="!" size={100} color={RED} delay={Math.round(durationInFrames * 0.42)} />
      <Chip x={710} y={235} text="SUÇLU O SANKİ" delay={Math.round(durationInFrames * 0.4)} />
    </g>
  );
};

// Bozulan bilgisayar
const Computer: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => {
  const frame = useCurrentFrame();
  const flash = Math.floor(frame / 8) % 2 === 0;
  return (
    <g transform={place(x, y, scale)}>
      <rect x={-90} y={-130} width={180} height={130} rx={10} fill="#3a3f4a" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-76} y={-116} width={152} height={102} fill={flash ? "#4d7cf0" : "#3060d8"} />
      <text x={0} y={-58} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={28} fill="#fff">
        HATA!
      </text>
      <rect x={-20} y={0} width={40} height={24} fill="#6b7280" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-60} y={22} width={120} height={14} rx={6} fill="#6b7280" stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

// 6) Duygularını düşünen aç kişiler huysuzlaşmadı
const AwareCalm: Visual = ({ durationInFrames }) => {
  const right = Math.round(durationInFrames * 0.2);
  return (
    <g>
      <Paper />
      <Computer x={450} y={310} scale={1.05} />
      <Bust x={190} y={520} scale={0.95} mood="angry" shake shirt={RED} />
      <Chip x={190} y={95} text="DÜŞÜNMEDİ" dark delay={8} />
      <Bust x={710} y={520} scale={0.95} mood="calm" shirt={TEAL} hair="#2c2c2c" delay={right} />
      <ThoughtBubble x={790} y={195} r={82} delay={right + 8}>
        <text x={0} y={-6} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={18} fill={INK}>
          NASIL
        </text>
        <text x={0} y={22} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={18} fill={INK}>
          HİSSEDİYORUM?
        </text>
      </ThoughtBubble>
      <Chip x={650} y={95} text="ÖNCE DÜŞÜNDÜ" delay={right + 4} />
      <BigText x={450} y={470} text="VS" size={80} color={PINK} delay={4} />
    </g>
  );
};

// 7) Kendine sor: aç mıyım?
const AskSelf: Visual = ({ durationInFrames }) => {
  const snack = Math.round(durationInFrames * 0.55);
  const calm = useProgress(snack, snack + 18);
  const mood: Mood = calm > 0.5 ? "happy" : "think";
  return (
    <g>
      <rect width={900} height={560} fill={WALL} />
      <rect y={440} width={900} height={120} fill={FLOOR} stroke={OUTLINE} strokeWidth={5} />
      <Bust x={280} y={500} scale={1.1} mood={mood} anger={0.6 * (1 - calm)} />
      <ThoughtBubble x={610} y={150} r={118} delay={8}>
        <text x={0} y={-6} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={34} fill={INK}>
          YOKSA
        </text>
        <text x={0} y={36} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={32} fill={RED}>
          AÇ MIYIM?
        </text>
      </ThoughtBubble>
      <Plate x={650} y={430} scale={0.9} food={useAppear(snack)} delay={snack - 6} />
      <Sparkles points={[[560, 360], [740, 350], [470, 300]]} />
      <QuestionMark x={110} y={150} size={70} delay={14} color={PINK} />
    </g>
  );
};

// Yorum balonu
const Comment: React.FC<{ x: number; y: number; text: string; delay: number }> = ({ x, y, text, delay }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-170} y={-40} width={340} height={80} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-125} cy={0} r={22} fill={PINK} stroke={OUTLINE} strokeWidth={4} />
      <text x={-90} y={10} fontFamily={uiFont} fontWeight={800} fontSize={32} fill={INK}>
        {text}
      </text>
    </g>
  );
};

// 8) Kapanış: sen açken kime sinirleniyorsun?
const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  const tilt = interpolate(Math.sin(frame / 10), [-1, 1], [-4, 4], clamp);
  return (
    <g>
      <Paper />
      <g transform={`rotate(${tilt} 200 500)`}>
        <Bust x={200} y={520} scale={1.05} mood="angry" />
      </g>
      <Comment x={640} y={110} text="KARDEŞİME!" delay={6} />
      <Comment x={640} y={215} text="GARSONA!" delay={14} />
      <Comment x={640} y={320} text="HERKESE!" delay={22} />
      <g transform={place(640, 450, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" delay={28} />
      </g>
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  LateLunch,
  HangryWord,
  PhoneSurvey,
  MoodMeter,
  Misread,
  AwareCalm,
  AskSelf,
  YourTurn,
};
