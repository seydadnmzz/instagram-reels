// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Göz seğirmesi / göz kapağı miyokimisi (2026-11-22-sabah)
import { useId } from "react";
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
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
const PURPLE = "#8a6cf0";
const GREY = "#b9b2aa";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Seğirme miktarı: kısa, düzensiz titreşim patlamaları
const useTwitch = (strength = 1) => {
  const f = useCurrentFrame();
  const burst = Math.sin(f / 7) > 0.2 ? 1 : 0;
  return burst * strength * (Math.sin(f * 2.7) * 0.6 + Math.sin(f * 4.3) * 0.4);
};

// Tek göz (yakın plan). (0,0) göz merkezi. twitch: alt kapak titreşimi (birim), look: göz bebeği kayması
const Eye: React.FC<{ twitch?: number; scale?: number; x: number; y: number; closed?: number; ring?: number; iris?: string }> = ({
  twitch = 0,
  scale = 1,
  x,
  y,
  closed = 0,
  ring = 0,
  iris = "#3a8f6a",
}) => {
  const lid = twitch * 10;
  const topY = -70 + closed * 70;
  const cid = useId().replace(/:/g, "");
  return (
    <g transform={place(x, y, scale)}>
      {ring > 0 ? (
        <ellipse cx={0} cy={0} rx={200 + ring * 6} ry={140 + ring * 6} fill="none" stroke={RED} strokeWidth={34} opacity={0.55} />
      ) : null}
      <defs>
        <clipPath id={`skin-${cid}`}>
          <ellipse cx={0} cy={0} rx={185} ry={128} />
        </clipPath>
      </defs>
      <ellipse cx={0} cy={0} rx={185} ry={128} fill={SKIN} />
      <g clipPath={`url(#skin-${cid})`}>
        <path d="M -150 0 Q 0 -110 150 0 Q 0 110 -150 0 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <circle cx={0} cy={0} r={52} fill={iris} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={0} r={24} fill={OUTLINE} />
        <circle cx={-16} cy={-18} r={10} fill="#fff" />
        <path d={`M -160 0 Q 0 ${topY * 1.6} 160 0 L 200 -140 L -200 -140 Z`} fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <g transform={`translate(0 ${-Math.abs(lid)})`}>
          <path d={`M -160 0 Q 0 ${100 - Math.abs(lid) * 2} 160 0 L 200 140 L -200 140 Z`} fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
          <path d="M -90 72 Q 0 96 90 72" fill="none" stroke="#d99a6c" strokeWidth={5} strokeLinecap="round" />
        </g>
        <path d="M -130 -96 Q 0 -150 130 -96" fill="none" stroke="#5a3a24" strokeWidth={16} strokeLinecap="round" />
      </g>
      <ellipse cx={0} cy={0} rx={185} ry={128} fill="none" stroke={OUTLINE} strokeWidth={6} />
      {/* kirpikler */}
      {[-90, -45, 0, 45, 90].map((cx) => (
        <line key={cx} x1={cx} y1={topY * 0.75 - 4} x2={cx * 1.15} y2={topY * 0.75 - 30} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      ))}
      {Math.abs(twitch) > 0.2 ? (
        <g stroke={OUTLINE} strokeWidth={5} strokeLinecap="round">
          <line x1={-120} y1={95} x2={-145} y2={118} />
          <line x1={0} y1={108} x2={0} y2={138} />
          <line x1={120} y1={95} x2={145} y2={118} />
        </g>
      ) : null}
    </g>
  );
};

// Belden yukarı yüz; (0,0) gövdenin alt ortası, kafa merkezi (0,-200)
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  mood?: "calm" | "happy" | "wow" | "talk" | "tired";
  twitch?: number;
  delay?: number;
}> = ({ x, y, scale = 1, shirt = TEAL, hair = "#4a2f1d", mood = "calm", twitch = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const sway = Math.sin(frame / 18) * 2;
  const blink = frame % 90 > 85 ? 0.15 : 1;
  const t = twitch * 5;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${sway} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {mood === "wow" ? (
          <g>
            <circle cx={-26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-26} cy={-204} r={6} fill={OUTLINE} />
          </g>
        ) : mood === "tired" ? (
          <path d="M -36 -204 Q -26 -198 -16 -204" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        ) : (
          <g transform={`translate(0 ${-206 * (1 - blink)}) scale(1 ${blink})`}>
            <circle cx={-26} cy={-206} r={8} fill={OUTLINE} />
          </g>
        )}
        {/* sağ göz: seğiren */}
        <circle cx={26} cy={-206} r={mood === "wow" ? 13 : 8} fill={mood === "wow" ? "#fff" : OUTLINE} stroke={OUTLINE} strokeWidth={mood === "wow" ? 4 : 0} />
        {mood === "wow" ? <circle cx={26} cy={-204} r={6} fill={OUTLINE} /> : null}
        <path d={`M 12 ${-190 - Math.abs(t)} Q 26 ${-184 - Math.abs(t) * 1.6} 40 ${-190 - Math.abs(t)}`} fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {Math.abs(twitch) > 0.2 ? (
          <g stroke={RED} strokeWidth={4} strokeLinecap="round">
            <line x1={50} y1={-186} x2={62} y2={-178} />
            <line x1={46} y1={-176} x2={54} y2={-166} />
          </g>
        ) : null}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mood === "calm" || mood === "tired" ? <path d="M -20 -160 Q 0 -166 20 -160" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mood === "wow" ? <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} /> : null}
        {mood === "talk" ? <ellipse cx={0} cy={-162} rx={18} ry={6 + Math.abs(Math.sin(frame / 3)) * 12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
        <circle cx={-46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
      </g>
    </g>
  );
};

// Kanat çırpan kelebek
const Butterfly: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => {
  const frame = useCurrentFrame();
  const flap = 0.35 + Math.abs(Math.sin(frame / 3)) * 0.65;
  return (
    <g transform={place(x, y + Math.sin(frame / 10) * 8, scale)}>
      <g transform={`scale(${flap} 1)`}>
        <path d="M 0 0 C -60 -70 -100 -10 -50 20 C -90 50 -40 80 0 20 Z" fill={PURPLE} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <path d="M 0 0 C 60 -70 100 -10 50 20 C 90 50 40 80 0 20 Z" fill={PINK} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      </g>
      <rect x={-6} y={-24} width={12} height={56} rx={6} fill={OUTLINE} />
      <path d="M -3 -24 Q -14 -44 -22 -46 M 3 -24 Q 14 -44 22 -46" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
};

// 1) Kanca: yakın plan seğiren göz + kelebek
const TwitchHook: Visual = ({ durationInFrames }) => {
  const tw = useTwitch(1);
  const bf = useAppear(Math.round(durationInFrames * 0.35));
  return (
    <g>
      <Paper />
      <circle cx={450} cy={280} r={250} fill="#c9efe9" />
      <Eye x={430} y={270} scale={1.2} twitch={tw} />
      <g opacity={bf}>
        <Butterfly x={720} y={420} scale={0.9 * bf} />
      </g>
      <Chip x={450} y={500} text="SEĞİR SEĞİR!" delay={10} />
      <BigText x={150} y={110} text="?!" size={90} color={RED} delay={20} />
    </g>
  );
};

// 2) Ad: miyokimi, en sık alt kapak
const MyokymiaName: Visual = ({ durationInFrames }) => {
  const tw = useTwitch(0.9);
  const arrow = useProgress(durationInFrames * 0.45, durationInFrames * 0.65);
  return (
    <g>
      <Paper />
      <Eye x={300} y={250} scale={0.9} twitch={tw} />
      <NamePlate x={450} y={60} text="GÖZ KAPAĞI MİYOKİMİSİ" delay={6} />
      <Arrow from={[640, 400]} to={[400, 340]} progress={arrow} color={RED} />
      <Chip x={700} y={440} text="EN SIK: ALT KAPAK" delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

// 3) Halka kas + rastgele sinyaller
const RingMuscle: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const ring = useAppear(8);
  const pulse = Math.abs(Math.sin(frame / 4));
  const tw = useTwitch(1);
  const nerve = useProgress(durationInFrames * 0.35, durationInFrames * 0.55);
  const sparks = [0, 1, 2].map((i) => ((frame * 6 + i * 120) % 360) / 360);
  return (
    <g>
      <Paper />
      <g opacity={ring}>
        <Eye x={520} y={280} scale={0.95} twitch={tw} ring={pulse} />
      </g>
      {/* sinir */}
      <path d="M 40 520 C 120 420 180 420 260 360" fill="none" stroke={YELLOWC} strokeWidth={12} strokeDasharray={400} strokeDashoffset={400 * (1 - nerve)} strokeLinecap="round" />
      <path d="M 40 520 C 120 420 180 420 260 360" fill="none" stroke={OUTLINE} strokeWidth={3} strokeDasharray={400} strokeDashoffset={400 * (1 - nerve)} opacity={0.4} />
      {nerve > 0.95
        ? sparks.map((s, i) => {
            const px = 40 + (260 - 40) * s;
            const py = 520 - (520 - 360) * s - Math.sin(s * Math.PI) * 40;
            return <circle key={i} cx={px} cy={py} r={11} fill="#fff6b0" stroke={ORANGE} strokeWidth={4} />;
          })
        : null}
      <Chip x={170} y={70} text="HALKA KAS" delay={12} />
      <Chip x={190} y={300} text="RASTGELE SİNYAL" dark delay={Math.round(durationInFrames * 0.55)} />
      {nerve > 0.95 ? <Sparkles points={[[300, 330], [330, 380]]} /> : null}
    </g>
  );
};

// Pil simgesi
const Battery: React.FC<{ x: number; y: number; level: number }> = ({ x, y, level }) => (
  <g transform={place(x, y)}>
    <rect x={-60} y={-32} width={110} height={64} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
    <rect x={52} y={-14} width={14} height={28} rx={4} fill={OUTLINE} />
    <rect x={-50} y={-22} width={90 * level} height={44} rx={5} fill={level < 0.3 ? RED : TEAL} />
  </g>
);

// 4) Tetikleyiciler: stres, yorgunluk, uykusuzluk
const Triggers: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = (k: number) => Math.round(durationInFrames * k);
  const a1 = useAppear(d(0.25));
  const a2 = useAppear(d(0.45));
  const a3 = useAppear(d(0.65));
  const drain = useProgress(d(0.45), d(0.7));
  const rain = (frame % 20) * 2;
  return (
    <g>
      <Paper />
      <Bust x={450} y={540} scale={0.95} mood="tired" twitch={useTwitch(1)} />
      <g transform={place(170, 180, a1)}>
        <path d="M -90 10 Q -100 -40 -50 -40 Q -40 -80 10 -70 Q 50 -90 80 -50 Q 120 -40 100 10 Z" fill="#6b6f80" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <path d="M -10 15 L -30 60 L 0 55 L -15 100" fill="none" stroke={YELLOWC} strokeWidth={10} strokeLinejoin="round" />
        <line x1={40} y1={20 + rain / 2} x2={36} y2={34 + rain / 2} stroke={BLUE} strokeWidth={5} strokeLinecap="round" />
        <text x={0} y={150} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>STRES</text>
      </g>
      <g transform={place(730, 160, a2)}>
        <Battery x={0} y={0} level={1 - drain * 0.85} />
        <text x={0} y={90} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>YORGUNLUK</text>
      </g>
      <g transform={place(730, 380, a3)}>
        <path d="M 20 -50 A 55 55 0 1 0 50 40 A 45 45 0 1 1 20 -50 Z" fill={YELLOWC} stroke={OUTLINE} strokeWidth={5} />
        <line x1={-60} y1={-60} x2={60} y2={60} stroke={RED} strokeWidth={10} strokeLinecap="round" />
        <text x={0} y={100} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>UYKUSUZLUK</text>
      </g>
    </g>
  );
};

// Kahve fincanı
const Cup: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => {
  const a = useAppear(delay);
  const steam = useWave(30, 6);
  return (
    <g transform={place(x, y, a)}>
      <path d={`M -20 -70 q ${steam} -15 0 -30 M 12 -70 q ${-steam} -15 0 -30`} fill="none" stroke={GREY} strokeWidth={5} strokeLinecap="round" />
      <path d="M -45 -50 L 45 -50 L 35 20 Q 30 30 20 30 L -20 30 Q -30 30 -35 20 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 42 -30 Q 70 -30 66 -6 Q 62 12 36 8" fill="none" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-38} y={-48} width={76} height={12} fill="#6b3b1e" />
    </g>
  );
};

// 5) Kahve, sigara, alkol
const CoffeeCups: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const meter = useProgress(d(0.1), d(0.8));
  const cig = useAppear(d(0.28));
  const wine = useAppear(d(0.38));
  return (
    <g>
      <Paper />
      <rect x={60} y={430} width={560} height={20} fill="#8a5a32" stroke={OUTLINE} strokeWidth={4} />
      <Cup x={130} y={400} delay={4} />
      <Cup x={240} y={400} delay={d(0.08)} />
      <Cup x={350} y={400} delay={d(0.16)} />
      <g transform={place(450, 410, cig)}>
        <rect x={-50} y={-10} width={100} height={20} rx={4} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <rect x={30} y={-10} width={20} height={20} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <g transform={place(560, 370, wine)}>
        <path d="M -30 -50 L 30 -50 Q 30 10 0 14 Q -30 10 -30 -50 Z" fill="#a3262b" stroke={OUTLINE} strokeWidth={5} />
        <line x1={0} y1={14} x2={0} y2={54} stroke={OUTLINE} strokeWidth={6} />
        <line x1={-22} y1={58} x2={22} y2={58} stroke={OUTLINE} strokeWidth={6} />
      </g>
      {/* seğirme ölçeri */}
      <g transform="translate(760 290)">
        <rect x={-40} y={-200} width={80} height={360} rx={40} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-28} y={148 - 330 * meter} width={56} height={330 * meter} rx={26} fill={meter > 0.6 ? RED : ORANGE} />
        <text x={0} y={210} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={OUTLINE}>SEĞİRME</text>
      </g>
      <Chip x={330} y={130} text="FAZLASI = RİSK" delay={d(0.4)} />
    </g>
  );
};

// 6) Ekran süresi çubuk grafiği
const ScreenTime: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const b1 = useProgress(d(0.05), d(0.25));
  const b2 = useProgress(d(0.2), d(0.45));
  const tw = useTwitch(1);
  const H = 44;
  return (
    <g>
      <Paper />
      <line x1={120} y1={470} x2={640} y2={470} stroke={OUTLINE} strokeWidth={6} />
      <rect x={180} y={470 - 4.84 * H * b1} width={150} height={4.84 * H * b1} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
      <rect x={420} y={470 - 6.88 * H * b2} width={150} height={6.88 * H * b2} fill={RED} stroke={OUTLINE} strokeWidth={5} />
      <text x={255} y={455 - 4.84 * H * b1} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={OUTLINE} opacity={b1}>4,8 SA</text>
      <text x={495} y={455 - 6.88 * H * b2} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={OUTLINE} opacity={b2}>6,9 SA</text>
      <text x={255} y={515} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={OUTLINE}>SEĞİRMEYEN</text>
      <text x={495} y={515} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={OUTLINE}>SEĞİREN</text>
      {/* telefon */}
      <g transform={place(770, 260, useAppear(6))}>
        <rect x={-70} y={-130} width={140} height={260} rx={22} fill={OUTLINE} />
        <rect x={-58} y={-110} width={116} height={210} rx={10} fill="#bfe9ff" />
        <g transform="translate(0 -10) scale(0.3)">
          <Eye x={0} y={0} twitch={tw} />
        </g>
      </g>
      <Chip x={770} y={470} text="+2 SAAT" dark delay={d(0.65)} />
    </g>
  );
};

// 7) Magnezyum efsanesi
const MagnesiumMyth: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const bottle = useAppear(4);
  const tubes = useAppear(d(0.2));
  const stamp = useAppear(d(0.42));
  return (
    <g>
      <Paper />
      <g transform={place(200, 300, bottle)}>
        <rect x={-55} y={-150} width={110} height={40} rx={8} fill={OUTLINE} />
        <rect x={-80} y={-110} width={160} height={220} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-80} y={-50} width={160} height={90} fill={BLUE} stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={18} fontFamily={uiFont} fontWeight={900} fontSize={58} textAnchor="middle" fill="#fff">Mg</text>
      </g>
      <g opacity={tubes}>
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(${560 + i * 150} 290)`}>
            <rect x={-30} y={-130} width={60} height={240} rx={28} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
            <rect x={-22} y={-20 * tubes} width={44} height={120 * tubes} rx={20} fill={RED} />
            <rect x={-36} y={-150} width={72} height={30} rx={6} fill={i === 0 ? TEAL : ORANGE} stroke={OUTLINE} strokeWidth={4} />
            <text x={0} y={160} fontFamily={uiFont} fontWeight={800} fontSize={24} textAnchor="middle" fill={OUTLINE}>{i === 0 ? "SEĞİREN" : "SEĞİRMEYEN"}</text>
          </g>
        ))}
        <text x={635} y={310} fontFamily={uiFont} fontWeight={900} fontSize={60} textAnchor="middle" fill={OUTLINE}>=</text>
      </g>
      <g transform={place(330, 470, stamp, -8)}>
        <rect x={-190} y={-40} width={380} height={80} rx={10} fill="none" stroke={RED} strokeWidth={8} />
        <text x={0} y={16} fontFamily={uiFont} fontWeight={900} fontSize={44} textAnchor="middle" fill={RED}>BAĞLANTI YOK</text>
      </g>
    </g>
  );
};

// 8) Sana dev gibi, dışarıdan zor fark edilir
const MirrorCheck: Visual = ({ durationInFrames }) => {
  const tw = useTwitch(1);
  const right = useAppear(Math.round(durationInFrames * 0.45));
  return (
    <g>
      <Paper />
      <rect x={30} y={30} width={400} height={500} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={470} y={30} width={400} height={500} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <Eye x={230} y={270} scale={0.95} twitch={tw * 2} />
      <text x={230} y={500} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={RED}>SEN HİSSEDİYORSUN</text>
      <g opacity={right}>
        <Bust x={670} y={430} scale={0.9} twitch={tw * 0.25} mood="calm" />
        <text x={670} y={500} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={DEEP}>ONLAR GÖRÜYOR</text>
        <BigText x={790} y={110} text="?" size={80} color={BLUE} delay={Math.round(durationInFrames * 0.6)} />
      </g>
    </g>
  );
};

// 9) Takvim: genelde zararsız, kendiliğinden geçer
const Calendar: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const days = 7;
  const prog = useProgress(d(0.1), d(0.7));
  const fade = 1 - prog;
  const tw = useTwitch(fade);
  return (
    <g>
      <Paper />
      <g transform="translate(60 90)">
        <rect x={0} y={0} width={420} height={330} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={0} y={0} width={420} height={70} rx={20} fill={TEAL} stroke={OUTLINE} strokeWidth={6} />
        <text x={210} y={48} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill="#fff">GÜNLER</text>
        {Array.from({ length: days }).map((_, i) => {
          const cx = 50 + (i % 4) * 105;
          const cy = 130 + Math.floor(i / 4) * 110;
          const done = prog * days > i;
          return (
            <g key={i}>
              <rect x={cx - 38} y={cy - 38} width={76} height={76} rx={10} fill={done ? "#d6f5ef" : "#f4f4f4"} stroke={OUTLINE} strokeWidth={4} />
              {done ? <path d={`M ${cx - 20} ${cy} L ${cx - 4} ${cy + 18} L ${cx + 22} ${cy - 18}`} fill="none" stroke={DEEP} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" /> : null}
            </g>
          );
        })}
      </g>
      <Bust x={690} y={520} scale={0.95} mood={prog > 0.85 ? "happy" : "calm"} twitch={tw} />
      <Chip x={450} y={490} text="GENELDE ZARARSIZ" delay={d(0.55)} />
      {prog > 0.85 ? <Sparkles points={[[600, 150], [790, 170], [700, 110]]} /> : null}
    </g>
  );
};

// 10) Ne zaman doktora?
const DoctorSign: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const items = ["HAFTALARCA SÜRERSE", "YÜZE YAYILIRSA"];
  const a = [useAppear(d(0.15)), useAppear(d(0.4))];
  return (
    <g>
      <Paper />
      <Person x={170} y={500} scale={1.5} shirt="#ffffff" glasses presenting delay={2} />
      <NamePlate x={170} y={530} text="GÖZ DOKTORU" delay={8} />
      {items.map((t, i) => (
        <g key={t} transform={place(590, 180 + i * 150, a[i])}>
          <rect x={-250} y={-46} width={500} height={92} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <circle cx={-200} cy={0} r={26} fill={RED} stroke={OUTLINE} strokeWidth={4} />
          <text x={-200} y={11} fontFamily={uiFont} fontWeight={900} fontSize={32} textAnchor="middle" fill="#fff">!</text>
          <text x={30} y={11} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill={OUTLINE}>{t}</text>
        </g>
      ))}
    </g>
  );
};

// 11) Kapanış: yorum ve etiket
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const bubbles = ["SINAV HAFTASI", "3 KAHVEDEN SONRA", "GECE EKRANDA"];
  const a = [useAppear(d(0.15)), useAppear(d(0.3)), useAppear(d(0.45))];
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={1} mood="talk" twitch={useTwitch(1)} />
      <ThoughtBubble x={200} y={110} r={60} delay={4}>
        <text x={0} y={16} fontFamily={uiFont} fontWeight={900} fontSize={50} textAnchor="middle" fill={OUTLINE}>?</text>
      </ThoughtBubble>
      {bubbles.map((b, i) => (
        <g key={b} transform={place(610, 110 + i * 115, a[i])}>
          <rect x={-220} y={-40} width={440} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={i === 1 ? DEEP : OUTLINE}>
            {b}
          </text>
        </g>
      ))}
      <Chip x={610} y={490} text="@ETİKETLE" delay={d(0.6)} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  TwitchHook,
  MyokymiaName,
  RingMuscle,
  Triggers,
  CoffeeCups,
  ScreenTime,
  MagnesiumMyth,
  MirrorCheck,
  Calendar,
  DoctorSign,
  YourTurn,
};
