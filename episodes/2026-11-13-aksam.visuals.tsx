// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Tanıştığın kişinin adını hemen unutmak (2026-11-13-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import {
  Arrow,
  Brain,
  Chip,
  INK,
  NamePlate,
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
const PINK = "#ff5c93";
const SKIN = "#f2c79a";
const BLUE = "#4fb6e8";
const GREEN = "#5cc27a";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff9a3d";
const DARKGREEN = "#1f8a4c";
const COFFEE = "#7a4a2a";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

const PurpleRoom: React.FC<{ window?: "day" | "night" | false; picture?: boolean }> = ({ window = "day", picture = true }) => (
  <Room wall="#f3efff" stripe="#e6ddff" floor="#b98a6a" window={window} picture={picture} />
);

type Mood = "panic" | "blush" | "happy" | "calm" | "cool" | "shock" | "angry";

// Önden görünen karakter; (x, y) ayakların ortası, figür ~245 birim boyunda
const Kid: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  skin?: string;
  print?: "face" | "star" | "none";
  stain?: number;
  mood?: Mood;
  look?: number;
  phone?: boolean;
  wave?: boolean;
  delay?: number;
  blushAmount?: number;
  reachR?: number;
  reachL?: number;
}> = ({
  x,
  y,
  scale = 1,
  shirt = BLUE,
  hair = "#4a2f1d",
  skin = SKIN,
  print = "none",
  stain = 0,
  mood = "calm",
  look = 0,
  phone = false,
  wave = false,
  delay = 0,
  blushAmount,
  reachR,
  reachL,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const breathe = Math.sin(frame / 14) * 1.5;
  const armL0 = wave ? -150 + Math.sin(frame / 5) * 18 : phone ? -40 : 8;
  const armR = reachR ?? (phone ? 40 : -8);
  const armL = reachL ?? armL0;
  const px = look * 5;
  const py = phone ? 5 : 0;
  const blush = blushAmount ?? (mood === "blush" || mood === "panic" ? 1 : 0);
  return (
    <g transform={place(x, y, scale * a)}>
      <ellipse cx={0} cy={2} rx={46} ry={8} fill="rgba(0,0,0,0.16)" />
      {/* Bacaklar */}
      <rect x={-26} y={-70} width={22} height={70} rx={8} fill="#2f3f63" stroke={OUTLINE} strokeWidth={4} />
      <rect x={4} y={-70} width={22} height={70} rx={8} fill="#2f3f63" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-34} y={-8} width={30} height={12} rx={6} fill={OUTLINE} />
      <rect x={4} y={-8} width={30} height={12} rx={6} fill={OUTLINE} />
      {/* Kollar */}
      <g transform={`rotate(${armL} -40 -146)`}>
        <rect x={-54} y={-150} width={18} height={74} rx={9} fill={shirt} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-45} cy={-74} r={10} fill={skin} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <g transform={`rotate(${armR} 40 -146)`}>
        <rect x={36} y={-150} width={18} height={74} rx={9} fill={shirt} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={45} cy={-74} r={10} fill={skin} stroke={OUTLINE} strokeWidth={4} />
      </g>
      {/* Gövde */}
      <g transform={`translate(0 ${breathe * 0.4})`}>
        <rect x={-42} y={-158} width={84} height={96} rx={20} fill={shirt} stroke={OUTLINE} strokeWidth={5} />
        {print === "face" ? (
          <g transform="translate(0 -112)">
            <path d="M 0 22 C -40 -2 -30 -36 -8 -30 Q 0 -28 0 -18 Q 0 -28 8 -30 C 30 -36 40 -2 0 22 Z" fill="#ff8fb5" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={0} cy={-6} r={14} fill="#ffe08a" stroke={OUTLINE} strokeWidth={3} />
            <path d="M -14 -10 Q -12 -26 0 -24 Q 12 -26 14 -10 Q 6 -18 0 -16 Q -6 -18 -14 -10 Z" fill="#a0522d" stroke={OUTLINE} strokeWidth={2} />
            <path d="M -6 0 Q 0 6 6 0" fill="none" stroke={OUTLINE} strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={-5} cy={-6} r={2} fill={OUTLINE} />
            <circle cx={5} cy={-6} r={2} fill={OUTLINE} />
          </g>
        ) : null}
        {print === "star" ? (
          <path
            transform="translate(0 -110)"
            d="M 0 -26 L 8 -8 L 27 -8 L 12 4 L 18 23 L 0 12 L -18 23 L -12 4 L -27 -8 L -8 -8 Z"
            fill={YELLOW}
            stroke={OUTLINE}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        ) : null}
        {stain > 0 ? (
          <path
            transform={`translate(6 -112) scale(${stain})`}
            d="M -24 -10 Q -30 -30 -6 -26 Q 10 -40 22 -22 Q 38 -14 26 4 Q 34 24 12 22 Q 2 40 -12 24 Q -34 26 -28 6 Q -40 -2 -24 -10 Z"
            fill={COFFEE}
            opacity={0.9}
          />
        ) : null}
        {/* Boyun + kafa */}
        <rect x={-9} y={-170} width={18} height={14} fill={skin} />
        <circle cx={0} cy={-205} r={42} fill={skin} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -42 -208 Q -42 -252 0 -250 Q 42 -252 42 -210 Q 26 -228 4 -226 Q -20 -232 -42 -208 Z" fill={hair} stroke={OUTLINE} strokeWidth={4} />
        {/* Gözler */}
        {mood === "cool" ? (
          <g>
            <rect x={-32} y={-214} width={28} height={18} rx={6} fill={INK} stroke={OUTLINE} strokeWidth={3} />
            <rect x={4} y={-214} width={28} height={18} rx={6} fill={INK} stroke={OUTLINE} strokeWidth={3} />
            <path d="M -4 -208 L 4 -208" stroke={OUTLINE} strokeWidth={4} />
            <path d="M -26 -210 L -18 -210" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
          </g>
        ) : mood === "panic" || mood === "shock" ? (
          <g>
            <circle cx={-15} cy={-208} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={15} cy={-208} r={11} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <circle cx={-15 + px} cy={-208 + py} r={4.5} fill={OUTLINE} />
            <circle cx={15 + px} cy={-208 + py} r={4.5} fill={OUTLINE} />
          </g>
        ) : mood === "happy" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round">
            <path d="M -22 -206 Q -15 -214 -8 -206" />
            <path d="M 8 -206 Q 15 -214 22 -206" />
          </g>
        ) : (
          <g>
            <circle cx={-15 + px} cy={-208 + py} r={5} fill={OUTLINE} />
            <circle cx={15 + px} cy={-208 + py} r={5} fill={OUTLINE} />
          </g>
        )}
        {mood === "angry" ? (
          <path d="M -26 -226 L -6 -218 M 26 -226 L 6 -218" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : null}
        {/* Yanaklar */}
        <ellipse cx={-26} cy={-190} rx={10} ry={6} fill="#ff6b8b" opacity={0.75 * blush} />
        <ellipse cx={26} cy={-190} rx={10} ry={6} fill="#ff6b8b" opacity={0.75 * blush} />
        {/* Ağız */}
        {mood === "panic" ? (
          <path d="M -12 -180 Q -6 -186 0 -180 Q 6 -174 12 -180" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : mood === "shock" ? (
          <ellipse cx={0} cy={-180} rx={7} ry={9} fill={OUTLINE} />
        ) : mood === "blush" ? (
          <path d="M -9 -180 L 9 -180" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : mood === "angry" ? (
          <path d="M -12 -176 Q 0 -188 12 -176" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        ) : (
          <path d="M -12 -184 Q 0 -172 12 -184" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        )}
        {/* Ter damlası */}
        {mood === "panic" || mood === "blush" ? (
          <path
            transform={`translate(44 ${-232 + ((frame % 40) / 40) * 22})`}
            d="M 0 -12 Q 9 2 0 8 Q -9 2 0 -12 Z"
            fill="#9fdcff"
            stroke={OUTLINE}
            strokeWidth={3}
          />
        ) : null}
      </g>
      {/* Telefon */}
      {phone ? (
        <g transform="translate(0 -96)">
          <rect x={-18} y={-28} width={36} height={52} rx={6} fill={INK} stroke={OUTLINE} strokeWidth={3} />
          <rect x={-13} y={-22} width={26} height={38} rx={3} fill="#9fd3f2" opacity={0.7 + 0.3 * Math.sin(frame / 6)} />
        </g>
      ) : null}
    </g>
  );
};

// Konuşma balonu (beyaz kutu + kuyruk aşağıda)
const Speech: React.FC<{ x: number; y: number; w: number; text: string; color?: string; delay?: number; tail?: number }> = ({
  x,
  y,
  w,
  text,
  color = INK,
  delay = 0,
  tail = 0,
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <path d={`M ${tail - 18} 34 L ${tail + 6} 70 L ${tail + 22} 34 Z`} fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-w / 2} y={-38} width={w} height={76} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={tail - 16} y={26} width={36} height={10} fill="#fff" />
      <text y={12} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={color}>
        {text}
      </text>
    </g>
  );
};


// Yaka kartı / isim etiketi
const NameTag: React.FC<{ x: number; y: number; name: string; scale?: number; rotate?: number; opacity?: number; color?: string }> = ({
  x,
  y,
  name,
  scale = 1,
  rotate = 0,
  opacity = 1,
  color = RED,
}) => (
  <g transform={place(x, y, scale, rotate)} opacity={opacity}>
    <rect x={-120} y={-62} width={240} height={124} rx={16} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <path d="M -120 -46 Q -120 -62 -104 -62 L 104 -62 Q 120 -62 120 -46 L 120 -20 L -120 -20 Z" fill={color} stroke={OUTLINE} strokeWidth={5} />
    <text y={-32} fontFamily={uiFont} fontWeight={800} fontSize={20} textAnchor="middle" fill="#fff">
      MERHABA, BEN
    </text>
    <text y={36} fontFamily={uiFont} fontWeight={800} fontSize={42} textAnchor="middle" fill={INK}>
      {name}
    </text>
  </g>
);

// Basit makas, iğne ve kumaş simgeleri
const Scissors: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const open = useWave(30, 8);
  return (
    <g transform={place(x, y, s)}>
      <g transform={`rotate(${-12 - open})`}>
        <path d="M 0 0 L 70 -10 L 70 4 Z" fill="#c9d3dd" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={-22} cy={-14} r={16} fill="none" stroke={RED} strokeWidth={8} />
      </g>
      <g transform={`rotate(${12 + open})`}>
        <path d="M 0 0 L 70 10 L 70 -4 Z" fill="#c9d3dd" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={-22} cy={14} r={16} fill="none" stroke={RED} strokeWidth={8} />
      </g>
      <circle r={5} fill={OUTLINE} />
    </g>
  );
};

const Needle: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const sway = useWave(40, 6);
  return (
    <g transform={place(x, y, s, 35 + sway)}>
      <path d="M 0 -60 Q 6 -58 4 -40 L 1 60 L -1 60 L -4 -40 Q -6 -58 0 -60 Z" fill="#c9d3dd" stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={0} cy={-46} rx={2} ry={7} fill="#fff" stroke={OUTLINE} strokeWidth={2} />
      <path d="M 0 -46 Q 40 -70 50 -20 Q 60 30 20 50" fill="none" stroke={RED} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
};

const Fabric: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => {
  const w = useWave(50, 6);
  return (
    <g transform={place(x, y, s)}>
      <path d={`M -60 -40 Q 0 ${-52 + w} 60 -40 L 60 40 Q 0 ${28 + w} -60 40 Z`} fill={PURPLE} stroke={OUTLINE} strokeWidth={5} />
      <path d={`M -40 -30 L -40 30 M -10 -34 L -10 26 M 20 -34 L 20 26`} stroke="#b9a6ff" strokeWidth={5} strokeDasharray="8 8" />
    </g>
  );
};

// Küçük yüz kartı (deneylerdeki fotoğraflar)
const FaceCard: React.FC<{ x: number; y: number; label: string; ok: boolean | null; delay?: number; okDelay?: number; fade?: number }> = ({
  x,
  y,
  label,
  ok,
  delay = 0,
  okDelay = 20,
  fade = 0,
}) => {
  const a = useAppear(delay);
  const m = useAppear(okDelay);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-170} y={-210} width={340} height={400} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-140} y={-180} width={280} height={230} rx={12} fill="#e6ddff" stroke={OUTLINE} strokeWidth={4} />
      <g transform="translate(0 50)">
        <path d="M -80 0 Q -80 -70 0 -70 Q 80 -70 80 0 Z" fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={0} cy={-120} r={52} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -52 -124 Q -50 -180 0 -176 Q 50 -180 52 -124 Q 30 -150 0 -146 Q -30 -150 -52 -124 Z" fill="#3b2a1d" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-18} cy={-120} r={6} fill={OUTLINE} />
        <circle cx={18} cy={-120} r={6} fill={OUTLINE} />
        <path d="M -16 -96 Q 0 -84 16 -96" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        <path d="M -20 -150 L -6 -144" stroke={OUTLINE} strokeWidth={3} />
      </g>
      <g opacity={1 - fade * 0.75}>
        <text y={118} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={INK}>
          {label}
        </text>
      </g>
      {ok === null ? null : (
        <g transform={place(130, -190, m)}>
          <circle r={42} fill={ok ? GREEN : RED} stroke={OUTLINE} strokeWidth={5} />
          {ok ? (
            <path d="M -20 0 L -6 16 L 22 -16" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M -16 -16 L 16 16 M 16 -16 L -16 16" stroke="#fff" strokeWidth={10} strokeLinecap="round" />
          )}
        </g>
      )}
    </g>
  );
};

// 1) Tanıştın, el sıkıştın… isim uçup gitti
const Handshake: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const shake = useWave(10, 6);
  const fly = useProgress(Math.round(durationInFrames * 0.45), Math.round(durationInFrames * 0.75));
  const d = Math.round(durationInFrames * 0.7);
  return (
    <g>
      <PurpleRoom />
      <g transform={`translate(0 ${shake * 0.5})`}>
        <Kid x={310} y={530} scale={1.05} shirt={BLUE} reachR={-78 + shake} mood={frame > d ? "panic" : "happy"} look={1} />
        <Kid x={590} y={530} scale={1.05} shirt={ORANGE} hair="#1d1d1d" reachL={78 - shake} mood="happy" look={-1} />
      </g>
      <circle cx={450} cy={367 + shake} r={16} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <g opacity={1 - fly}>
        <Speech x={650 + fly * 260} y={110 - fly * 160} w={340} text="BEN DENİZ!" delay={6} tail={-60} />
      </g>
      {fly > 0.1 && fly < 1 ? <Sparkles points={[[650 + fly * 200, 150 - fly * 120]]} /> : null}
      <QuestionMark x={250} y={110} size={90} delay={d} />
      <Chip x={250} y={40} text="ADI NEYDİ?" dark delay={d + 6} />
    </g>
  );
};

// 2) Yüz ve meslek aklında, ad yok
const FaceNoName: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.25);
  const blink = useWave(14, 1) > 0 ? 1 : 0.35;
  return (
    <g>
      <Paper />
      <Kid x={170} y={540} scale={1} shirt={BLUE} mood="shock" look={1} />
      <ThoughtBubble x={590} y={250} r={210} delay={4}>
        <g transform="translate(-95 -40)">
          <circle cx={0} cy={0} r={58} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
          <path d="M -58 -4 Q -58 -64 0 -60 Q 58 -64 58 -4 Q 30 -30 0 -28 Q -30 -30 -58 -4 Z" fill="#1d1d1d" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={-20} cy={4} r={6} fill={OUTLINE} />
          <circle cx={20} cy={4} r={6} fill={OUTLINE} />
          <path d="M -16 26 Q 0 38 16 26" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        </g>
        {[
          ["YÜZÜ", "✓", d],
          ["MESLEĞİ", "✓", d + 10],
          ["ADI", "???", d + 22],
        ].map(([t, m, dl], i) => (
          <Row key={i} y={-90 + i * 66} text={t as string} mark={m as string} delay={dl as number} bad={i === 2} blink={blink} />
        ))}
      </ThoughtBubble>
    </g>
  );
};

const Row: React.FC<{ y: number; text: string; mark: string; delay: number; bad: boolean; blink: number }> = ({ y, text, mark, delay, bad, blink }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(70, y, a)}>
      <rect x={-80} y={-26} width={210} height={52} rx={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <text x={-64} y={10} fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
        {text}
      </text>
      <text x={106} y={11} fontFamily={uiFont} fontWeight={800} fontSize={bad ? 26 : 32} textAnchor="middle" fill={bad ? RED : DARKGREEN} opacity={bad ? blink : 1}>
        {mark}
      </text>
    </g>
  );
};

// 3) İsimler kaygan: beyinden kayıp düşen isim etiketi
const SlipperyName: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const cycle = Math.max(30, Math.round(durationInFrames / 2));
  const t = (frame % cycle) / cycle;
  const slide = interpolate(t, [0, 0.35, 1], [0, 0, 1], { extrapolateRight: "clamp" });
  const d = Math.round(durationInFrames * 0.3);
  return (
    <g>
      <Paper />
      <path d="M 120 470 Q 450 430 780 470" fill="none" stroke="#b9a6ff" strokeWidth={10} strokeLinecap="round" />
      <Brain x={330} y={260} scale={1.25} mood="confused" />
      <g opacity={1 - slide * 0.9}>
        <NameTag x={560 + slide * 220} y={180 + slide * 260} name="DENİZ" scale={0.8} rotate={slide * 70} />
      </g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${510 + i * 26} ${120 + i * 6} q 12 20 0 40`}
          fill="none"
          stroke="#7ec8ff"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={slide > 0 ? 0.9 : 0}
        />
      ))}
      <Chip x={600} y={60} text="İSİMLER KAYGAN!" delay={d} />
      <NamePlate x={330} y={430} text="HAFIZAN BOZUK DEĞİL" delay={d + 10} />
    </g>
  );
};

// 4) "Bu bir terzi" ✓ — "Bu Bay Terzi" ✗
const TailorCards: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.42);
  const fade = useProgress(d + 20, d + 45);
  return (
    <g>
      <Paper />
      <FaceCard x={235} y={265} label="BU BİR TERZİ" ok={true} delay={2} okDelay={22} />
      <FaceCard x={665} y={265} label="BU BAY TERZİ" ok={false} delay={d} okDelay={d + 22} fade={fade} />
      <text x={450} y={290} fontFamily={uiFont} fontWeight={800} fontSize={48} textAnchor="middle" fill={PURPLE}>
        VS
      </text>
    </g>
  );
};

// 5) Meslek kelimesi çağrışımlara bağlı, soyadı sadece hece
const Associations: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.32);
  const p1 = useProgress(8, 22);
  const p2 = useProgress(16, 30);
  const p3 = useProgress(24, 38);
  const wob = useWave(24, 3);
  return (
    <g>
      <Paper />
      <rect x={20} y={20} width={520} height={520} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={560} y={20} width={320} height={520} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <g transform={place(280, 290, useAppear(2))}>
        <rect x={-95} y={-38} width={190} height={76} rx={18} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <text y={14} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={INK}>
          TERZİ
        </text>
      </g>
      <Arrow from={[230, 248]} to={[150, 160]} progress={p1} color={PURPLE} />
      <Arrow from={[330, 248]} to={[420, 150]} progress={p2} color={PURPLE} />
      <Arrow from={[280, 330]} to={[280, 400]} progress={p3} color={PURPLE} />
      <g opacity={p1}>
        <Scissors x={110} y={110} s={0.9} />
      </g>
      <g opacity={p2}>
        <Needle x={440} y={100} s={0.75} />
      </g>
      <g opacity={p3}>
        <Fabric x={280} y={465} s={0.8} />
      </g>
      <g transform={place(720, 270, useAppear(d), wob)}>
        <rect x={-130} y={-40} width={260} height={80} rx={18} fill="#ece6ff" stroke={OUTLINE} strokeWidth={5} />
        <text y={14} fontFamily={uiFont} fontWeight={800} fontSize={36} textAnchor="middle" fill={INK}>
          BAY TERZİ
        </text>
      </g>
      <g opacity={useProgress(d + 14, d + 24)}>
        <text x={720} y={390} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={RED}>
          TER · Zİ
        </text>
        <text x={720} y={440} fontFamily={uiFont} fontWeight={700} fontSize={24} textAnchor="middle" fill={INK}>
          SADECE HECE
        </text>
      </g>
      <Chip x={280} y={58} text="ÇAĞRIŞIM" dark delay={4} />
    </g>
  );
};

// 6) Hatırlama çubukları: meslek > isim ≈ uydurma kelime
const RecallBars: Visual = ({ durationInFrames }) => {
  const step = Math.round(durationInFrames * 0.22);
  const base = 440;
  const bars: { label: string; h: number; color: string; from: number }[] = [
    { label: "MESLEK", h: 290, color: GREEN, from: 6 },
    { label: "İSİM", h: 120, color: PINK, from: 6 + step },
    { label: "UYDURMA", h: 115, color: "#c9b8ff", from: 6 + step * 2 },
  ];
  return (
    <g>
      <Paper />
      <line x1={110} y1={base} x2={800} y2={base} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      {bars.map((b, i) => (
        <Bar key={i} x={220 + i * 230} base={base} {...b} />
      ))}
      <text x={455} y={70} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
        NE KADAR HATIRLANDI?
      </text>
      <g opacity={useProgress(6 + step * 2 + 18, 6 + step * 2 + 28)}>
        <text x={565} y={260} fontFamily={uiFont} fontWeight={800} fontSize={64} textAnchor="middle" fill={RED}>
          ≈
        </text>
      </g>
    </g>
  );
};

const Bar: React.FC<{ x: number; base: number; label: string; h: number; color: string; from: number }> = ({ x, base, label, h, color, from }) => {
  const g = useProgress(from, from + 20);
  const hh = h * g;
  return (
    <g>
      <rect x={x - 80} y={base - hh} width={160} height={hh} rx={10} fill={color} stroke={OUTLINE} strokeWidth={g > 0 ? 5 : 0} />
      <text x={x} y={base + 48} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK} opacity={g > 0 ? 1 : 0.3}>
        {label}
      </text>
    </g>
  );
};

// 7) İsim anlamlı olunca fark kayboluyor
const MeaningRescue: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const g = useProgress(d, d + 24);
  const base = 450;
  const h = 120 + 170 * g;
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <line x1={420} y1={base} x2={860} y2={base} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <rect x={470} y={base - 290} width={150} height={290} rx={10} fill={GREEN} stroke={OUTLINE} strokeWidth={5} opacity={0.35} />
      <rect x={670} y={base - h} width={150} height={h} rx={10} fill={g > 0.95 ? GREEN : PINK} stroke={OUTLINE} strokeWidth={5} />
      <text x={545} y={base + 44} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK}>
        MESLEK
      </text>
      <text x={745} y={base + 44} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK}>
        ANLAMLI İSİM
      </text>
      <Arrow from={[745, base - 100]} to={[745, base - 260]} progress={useProgress(d - 4, d + 20)} color={RED} />
      <NameTag x={210} y={200} name="DENİZ" scale={0.95} color={PURPLE} />
      <g transform={place(210, 380, useAppear(d - 8))}>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M -110 ${i * 26} q 27 -20 55 0 t 55 0 t 55 0 t 55 0`}
            fill="none"
            stroke={BLUE}
            strokeWidth={8}
            strokeLinecap="round"
            transform={`translate(${Math.sin((frame + i * 10) / 8) * 8} 0)`}
          />
        ))}
      </g>
      <Sparkles points={[[745, base - h - 30], [700, base - h - 10]]} />
      {g > 0.95 ? <Chip x={640} y={60} text="FARK KAYBOLDU!" delay={d + 26} /> : null}
    </g>
  );
};

// 8) Sırayla tanışma çemberi
const CircleIntro: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const turn = Math.min(3, Math.floor((frame / Math.max(1, durationInFrames)) * 4));
  const names = ["BEN ALİ!", "BEN ELİF!", "BEN CAN!"];
  const xs = [140, 330, 520, 730];
  const shirts = [GREEN, ORANGE, PURPLE, BLUE];
  const hairs = ["#2a1d14", "#7a3b1d", "#1d1d1d", "#4a2f1d"];
  const arrowP = useProgress(Math.round(durationInFrames * 0.5), Math.round(durationInFrames * 0.6));
  return (
    <g>
      <PurpleRoom window="day" picture={false} />
      {xs.map((x, i) => (
        <Kid
          key={i}
          x={x}
          y={530}
          scale={0.78}
          shirt={shirts[i]}
          hair={hairs[i]}
          mood={i === 3 ? (turn >= 2 ? "panic" : "calm") : i === turn ? "happy" : "calm"}
          wave={i === turn && i < 3}
          look={i === 3 ? -1 : 0}
          delay={i * 3}
        />
      ))}
      {turn < 3 ? <Speech key={turn} x={xs[turn]} y={120} w={210} text={names[turn]} delay={Math.round((turn * durationInFrames) / 4)} tail={-8} /> : null}
      {turn >= 2 ? (
        <g>
          <Arrow from={[730, 70]} to={[730, 200]} progress={arrowP} color={RED} />
          <Chip x={730} y={44} text="SIRADA SEN!" dark delay={Math.round(durationInFrames * 0.5)} />
        </g>
      ) : null}
    </g>
  );
};

// 9) Sıradaki kişi etkisi: aklın kendi konuşmanda
const NextInLine: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.35);
  const fade = useProgress(d, d + 30);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <Kid x={210} y={540} scale={0.85} shirt={PURPLE} hair="#1d1d1d" mood="happy" wave delay={2} />
      <g opacity={1 - fade * 0.85} transform={`translate(0 ${-fade * 30})`}>
        <Speech x={210} y={185} w={280} text="BEN CAN!" delay={4} tail={-8} />
      </g>
      {fade > 0.4 ? (
        <g opacity={fade}>
          <path d="M 120 195 L 300 195" stroke={RED} strokeWidth={8} strokeLinecap="round" />
          <text x={210} y={290} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={RED}>
            KAYDEDİLMEDİ
          </text>
        </g>
      ) : null}
      <Kid x={650} y={540} scale={1} shirt={BLUE} mood="panic" look={0} />
      <ThoughtBubble x={660} y={150} r={120} delay={6}>
        <text y={-14} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK}>
          NE DİYECEĞİM?
        </text>
        <text y={30} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={RED} opacity={frame % 30 < 20 ? 1 : 0.4}>
          BEN… BEN…
        </text>
      </ThoughtBubble>
      <Chip x={300} y={44} text="SIRADAKİ KİŞİ ETKİSİ" delay={d + 10} />
    </g>
  );
};

// 10) İpucu: dikkat ver + anlama bağla
const TipLink: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.45);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <Kid x={130} y={540} scale={0.85} shirt={BLUE} mood="happy" look={1} />
      <g transform={place(130, 160, useAppear(4))}>
        <path d="M -50 0 Q 0 -40 50 0 Q 0 40 -50 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <circle r={16} fill={PURPLE} stroke={OUTLINE} strokeWidth={3} />
        <circle r={7} fill={OUTLINE} />
        <text y={-50} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK}>
          DİKKAT
        </text>
      </g>
      <NameTag x={420} y={210} name="DENİZ" scale={0.95} color={PURPLE} />
      <Arrow from={[540, 210]} to={[640, 210]} progress={useProgress(d - 12, d)} color={RED} />
      <g transform={place(760, 220, useAppear(d))}>
        <circle r={100} fill="#bfe8ff" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={40} cy={-44} r={22} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M -86 ${i * 28} q 22 -18 43 0 t 43 0 t 43 0 t 43 0`}
            fill="none"
            stroke="#1f6fbf"
            strokeWidth={7}
            strokeLinecap="round"
            transform={`translate(${Math.sin((frame + i * 12) / 7) * 6} 0)`}
          />
        ))}
      </g>
      <Chip x={590} y={420} text="DİKKAT + ANLAM" dark delay={d + 14} />
      <Sparkles points={[[680, 110], [850, 140]]} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const w = useWave(40, 3);
  const items = ["İŞ YERİNDE", "DÜĞÜNDE", "OKULDA"];
  const colors = [PURPLE, PINK, ORANGE];
  return (
    <g>
      <Paper />
      <Kid x={170} y={540} scale={1} shirt={BLUE} mood="happy" wave />
      <QuestionMark x={330} y={120} size={80} delay={d + 30} />
      {items.map((c, i) => (
        <g key={i} transform={place(620, 100 + i * 120, useAppear(d + i * 10), i % 2 ? w : -w)}>
          <rect x={-200} y={-42} width={400} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <circle cx={-158} cy={0} r={18} fill={colors[i]} stroke={OUTLINE} strokeWidth={4} />
          <text x={22} y={11} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
            {c}?
          </text>
        </g>
      ))}
      <Chip x={620} y={480} text="YORUMLARA YAZ!" dark delay={d + 36} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  Handshake,
  FaceNoName,
  SlipperyName,
  TailorCards,
  Associations,
  RecallBars,
  MeaningRescue,
  CircleIntro,
  NextInLine,
  TipLink,
  YourTurn,
};
