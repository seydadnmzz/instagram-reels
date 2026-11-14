// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Yan şerit / yan kasa sırası neden hep daha hızlı görünür (2026-11-14-aksam)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Chip,
  INK,
  NamePlate,
  Note,
  place,
  Person,
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
const SKIN = "#f2c79a";
const ORANGE = "#ff8a3d";
const TEAL = "#17b8a5";
const BLUE = "#3a8fe0";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const GREEN = "#5cc46a";
const ASPHALT = "#5d6470";
const CAR_COLORS = [BLUE, TEAL, PURPLE, PINK, GREEN, "#f5b83d"];

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

type Face = "none" | "angry" | "bored" | "happy" | "side";

// Yandan görünen araba; (0,0) iki tekerleğin ortası, yol hizası. Boyu ~200 birim, sağa bakar.
const Car: React.FC<{
  x: number;
  y: number;
  color?: string;
  scale?: number;
  face?: Face;
  moving?: boolean;
  opacity?: number;
  delay?: number;
}> = ({ x, y, color = RED, scale = 1, face = "none", moving = false, opacity = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const spin = moving ? frame * 14 : 0;
  const bounce = moving ? Math.sin(frame / 2.5) * 1.5 : 0;
  return (
    <g transform={place(x, y, scale * a)} opacity={opacity}>
      <ellipse cx={0} cy={4} rx={100} ry={8} fill="rgba(0,0,0,0.2)" />
      <g transform={`translate(0 ${bounce})`}>
        <path
          d="M -100 -22 L -100 -58 Q -98 -70 -84 -72 L -56 -74 L -32 -108 Q -26 -114 -16 -114 L 34 -114 Q 46 -114 54 -104 L 74 -74 L 90 -70 Q 102 -66 102 -52 L 102 -22 Z"
          fill={color}
          stroke={OUTLINE}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path d="M -46 -74 L -26 -102 L 8 -102 L 8 -74 Z" fill="#cfeefc" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <path d="M 18 -74 L 18 -102 L 40 -102 L 60 -74 Z" fill="#cfeefc" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <rect x={90} y={-62} width={12} height={10} rx={3} fill={YELLOW} stroke={OUTLINE} strokeWidth={3} />
        <rect x={-102} y={-60} width={10} height={10} rx={3} fill={RED} stroke={OUTLINE} strokeWidth={3} />
        {face !== "none" ? (
          <g>
            <circle cx={-12} cy={-86} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={3} />
            {face === "angry" ? (
              <g stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" fill="none">
                <path d="M -18 -95 L -10 -91 M -2 -95 L -8 -91" />
                <path d="M -16 -78 Q -10 -83 -4 -78" />
              </g>
            ) : null}
            {face === "bored" ? (
              <g stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" fill="none">
                <path d="M -18 -89 L -12 -89 M -6 -89 L 0 -89" />
                <path d="M -14 -79 L -6 -79" />
              </g>
            ) : null}
            {face === "happy" ? (
              <g stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" fill="none">
                <circle cx={-15} cy={-89} r={1.5} fill={OUTLINE} />
                <circle cx={-5} cy={-89} r={1.5} fill={OUTLINE} />
                <path d="M -16 -81 Q -10 -75 -4 -81" />
              </g>
            ) : null}
            {face === "side" ? (
              <g fill={OUTLINE}>
                <circle cx={-19} cy={-91} r={2.5} />
                <circle cx={-10} cy={-91} r={2.5} />
                <path d="M -16 -79 L -8 -80" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
              </g>
            ) : null}
          </g>
        ) : null}
      </g>
      {[-58, 60].map((wx) => (
        <g key={wx} transform={`translate(${wx} -18) rotate(${spin})`}>
          <circle r={20} fill="#2f2f36" stroke={OUTLINE} strokeWidth={4} />
          <circle r={8} fill="#c9ccd3" />
          <rect x={-2} y={-18} width={4} height={10} fill="#c9ccd3" />
        </g>
      ))}
    </g>
  );
};

// İki şeritli yol; şerit çizgileri kayar (speed: kare başına birim)
const Road: React.FC<{ top: number; bottom: number; dash?: number }> = ({ top, bottom, dash = 0 }) => {
  const frame = useCurrentFrame();
  const mid = (top + bottom) / 2;
  const off = (frame * dash) % 120;
  return (
    <g>
      <rect x={0} y={top} width={900} height={bottom - top} fill={ASPHALT} stroke={OUTLINE} strokeWidth={5} />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={i * 120 - off - 120} y={mid - 4} width={70} height={8} rx={3} fill="#fff" />
      ))}
    </g>
  );
};

// Belden yukarı karakter; (0,0) gövdenin alt ortası, kafa merkezi (0,-200), yarıçap 70.
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  mood?: "calm" | "happy" | "bored" | "look";
  delay?: number;
}> = ({ x, y, scale = 1, shirt = TEAL, hair = "#4a2f1d", mood = "calm", delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const tilt = Math.sin(frame / 18) * 2;
  const blink = frame % 90 > 85 ? 0.15 : 1;
  const look = mood === "look" ? 14 + Math.sin(frame / 10) * 4 : 0;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${tilt} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {mood === "bored" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round">
            <path d="M -40 -206 L -12 -206" />
            <path d="M 12 -206 L 40 -206" />
          </g>
        ) : (
          <g>
            <circle cx={-26} cy={-206} r={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} transform={`translate(0 ${-206 * (1 - blink)}) scale(1 ${blink})`} />
            <circle cx={26} cy={-206} r={14} fill="#fff" stroke={OUTLINE} strokeWidth={4} transform={`translate(0 ${-206 * (1 - blink)}) scale(1 ${blink})`} />
            <circle cx={-26 + look * 0.5} cy={-205} r={7} fill={OUTLINE} />
            <circle cx={26 + look * 0.5} cy={-205} r={7} fill={OUTLINE} />
          </g>
        )}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mood === "calm" || mood === "look" ? <path d="M -20 -164 Q 0 -154 20 -164" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        {mood === "bored" ? <path d="M -18 -162 L 18 -162" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        <circle cx={-46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
      </g>
    </g>
  );
};

// Sıradaki küçük insan (kafa + gövde); (0,0) ayak hizası
const Shopper: React.FC<{ x: number; y: number; color: string; scale?: number; hair?: string }> = ({ x, y, color, scale = 1, hair = "#4a2f1d" }) => (
  <g transform={place(x, y, scale)}>
    <ellipse cx={0} cy={2} rx={26} ry={6} fill="rgba(0,0,0,0.18)" />
    <rect x={-22} y={-78} width={44} height={78} rx={16} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={0} cy={-100} r={24} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
    <path d="M -24 -104 Q -22 -128 0 -126 Q 22 -128 24 -104 Q 10 -114 0 -112 Q -12 -114 -24 -104 Z" fill={hair} stroke={OUTLINE} strokeWidth={3} />
    <circle cx={-8} cy={-100} r={3} fill={OUTLINE} />
    <circle cx={8} cy={-100} r={3} fill={OUTLINE} />
  </g>
);

// Kasa bankosu; (0,0) üst orta
const Register: React.FC<{ x: number; y: number; num: number; color: string }> = ({ x, y, num, color }) => (
  <g transform={place(x, y)}>
    <rect x={-70} y={0} width={140} height={70} rx={8} fill="#e9e3dc" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-30} y={-40} width={60} height={40} rx={6} fill="#3a3f4a" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-18} y={-120} width={36} height={60} rx={8} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <text x={0} y={-78} fontFamily={uiFont} fontWeight={800} fontSize={32} textAnchor="middle" fill="#fff">
      {num}
    </text>
  </g>
);

// 1) Trafikte sıkıştın, yan şerit akıp gidiyor
const TrafficJam: Visual = () => {
  const frame = useCurrentFrame();
  const jitter = Math.sin(frame / 3) * 1.2;
  return (
    <g>
      <Paper fill="#ffe3cc" />
      <circle cx={760} cy={90} r={50} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      <rect y={150} width={900} height={20} fill="#9ad27a" stroke={OUTLINE} strokeWidth={4} />
      <Road top={170} bottom={500} />
      {/* Üst (yan) şerit: hızla akıyor */}
      {[0, 1, 2].map((i) => {
        const x = ((frame * 9 + i * 340) % 1200) - 150;
        return <Car key={i} x={x} y={315} scale={0.85} color={CAR_COLORS[i]} moving />;
      })}
      {/* Alt (bizim) şerit: sıkışık */}
      <Car x={130} y={480} scale={0.95} color={GREEN} />
      <Car x={x0(jitter)} y={480} scale={0.95} color={ORANGE} face="angry" />
      <Car x={680} y={480} scale={0.95} color={PURPLE} />
      <rect y={500} width={900} height={60} fill="#9ad27a" stroke={OUTLINE} strokeWidth={4} />
      <Chip x={420} y={70} text="YİNE Mİ?!" delay={18} />
          </g>
  );
};
const x0 = (j: number) => 405 + j;

// 2) Markette yan sıra daha hızlı
const MarketQueue: Visual = ({ durationInFrames }) => {
  const p = useProgress(6, durationInFrames - 10);
  const frame = useCurrentFrame();
  const tap = Math.sin(frame / 4) * 3;
  return (
    <g>
      <Paper />
      {/* Üst sıra (yan sıra): ilerliyor */}
      <rect y={258} width={900} height={14} fill="#f3d9c2" stroke={OUTLINE} strokeWidth={3} />
      <Till x={110} y={262} num={1} color={BLUE} />
      {[0, 1, 2, 3, 4].map((i) => {
        const xx = 260 + i * 120 - p * 240;
        const op = xx < 230 ? Math.max(0, (xx - 170) / 60) : 1;
        return (
          <g key={i} opacity={op}>
            <Shopper x={xx} y={262} color={CAR_COLORS[i % 6]} scale={0.85} />
          </g>
        );
      })}
      <Arrow from={[760, 120]} to={[560, 120]} progress={useProgress(10, 30)} color={GREEN} />
      {/* Alt sıra (bizimki): kıpırdamıyor */}
      <rect y={500} width={900} height={14} fill="#f3d9c2" stroke={OUTLINE} strokeWidth={3} />
      <Till x={110} y={504} num={2} color={PINK} />
      <Shopper x={260} y={504} color={PURPLE} scale={0.85} />
      <Shopper x={380} y={504} color={TEAL} scale={0.85} />
      <Shopper x={500} y={504} color={BLUE} scale={0.85} />
      <g transform={`rotate(${tap} 620 504)`}>
        <Shopper x={620} y={504} color={ORANGE} scale={0.95} />
      </g>
      <Chip x={820} y={60} text="HIZLI" delay={8} />
      <Chip x={790} y={330} text="BEKLE…" dark delay={14} />
    </g>
  );
};

// Küçük kasa; (0,0) zemin ortası
const Till: React.FC<{ x: number; y: number; num: number; color: string }> = ({ x, y, num, color }) => (
  <g transform={place(x, y)}>
    <rect x={-60} y={-70} width={120} height={70} rx={8} fill="#e9e3dc" stroke={OUTLINE} strokeWidth={5} />
    <rect x={-26} y={-104} width={52} height={34} rx={6} fill="#3a3f4a" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-20} y={-170} width={40} height={52} rx={8} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <text x={0} y={-132} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill="#fff">
      {num}
    </text>
  </g>
);

// 3) İki araştırmacı, Nature 1999
const Researchers: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const w = useWave(50, 3);
  return (
    <g>
      <Paper />
      <rect y={470} width={900} height={90} fill="#f3d9c2" stroke={OUTLINE} strokeWidth={5} />
      <Person x={140} y={470} scale={1.45} shirt={BLUE} glasses presenting delay={2} />
      <Person x={330} y={470} scale={1.45} shirt={PINK} hair="#2b2b2b" mustache delay={8} facing="right" />
      <NamePlate x={140} y={515} text="TORONTO" delay={10} />
      <NamePlate x={330} y={515} text="STANFORD" delay={14} />
      <g transform={`rotate(${w} 650 250)`}>
        <Note x={650} y={250} width={420} title="NATURE" text="YAN ŞERİT HIZLI MI?" rotate={3} delay={d} />
      </g>
      <Sparkles points={[[470, 130], [820, 110], [840, 400]]} />
    </g>
  );
};

// 4) 120 sürücü adayına video izlettiler
const VideoTest: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      {/* Ekran */}
      <g transform={place(450, 40)}>
        <rect x={-260} y={0} width={520} height={290} rx={18} fill="#2f3440" stroke={OUTLINE} strokeWidth={6} />
        <svg x={-240} y={20} width={480} height={250} viewBox="0 0 900 470">
          <rect width={900} height={470} fill="#ffe3cc" />
          <rect y={60} width={900} height={360} fill={ASPHALT} />
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={i * 120 - ((frame * 5) % 120)} y={236} width={70} height={8} fill="#fff" />
          ))}
          {[0, 1, 2].map((i) => (
            <Car key={i} x={((frame * 4 + i * 330) % 1100) - 100} y={220} scale={0.8} color={CAR_COLORS[i + 2]} moving />
          ))}
          {[0, 1, 2].map((i) => (
            <Car key={`b${i}`} x={((frame * 4.4 + i * 330 + 150) % 1100) - 100} y={400} scale={0.8} color={CAR_COLORS[i]} moving />
          ))}
        </svg>
        <circle cx={232} cy={18} r={7} fill={RED} opacity={frame % 30 < 15 ? 1 : 0.2} />
      </g>
      {/* İzleyiciler */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Shopper key={i} x={130 + i * 160} y={560} color={CAR_COLORS[i]} scale={1.5} hair={i % 2 ? "#2b2b2b" : "#7a4a24"} />
      ))}
      <Chip x={450} y={372} text="120 SÜRÜCÜ ADAYI" delay={14} />
    </g>
  );
};

// 5) Yüzde 70'i yanıldı
const SeventyPercent: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.45);
  return (
    <g>
      <Paper />
      {Array.from({ length: 10 }).map((_, i) => {
        const on = i < 7 && frame > 6 + i * 4;
        const col = i % 5;
        const row = Math.floor(i / 5);
        return <Shopper key={i} x={70 + col * 82} y={230 + row * 180} color={on ? ORANGE : "#c9c3bb"} scale={0.95} />;
      })}
      <BigText x={680} y={170} text="YÜZDE 70" size={60} color={ORANGE} delay={36} />
      <text x={680} y={235} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill={INK} opacity={useAppear(40)}>
        "YAN ŞERİT HIZLI!"
      </text>
      <g transform={place(680, 390, useAppear(d), -4)}>
        <rect x={-150} y={-60} width={300} height={120} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <text x={0} y={-12} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={RED}>
          AMA YAN ŞERİT
        </text>
        <text x={0} y={32} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={INK}>
          DAHA YAVAŞTI!
        </text>
      </g>
      <QuestionMark x={850} y={480} size={50} delay={d + 10} color={RED} />
    </g>
  );
};

// Çubuk göstergesi
const Bar: React.FC<{ x: number; y: number; label: string; value: number; color: string; delay: number }> = ({ x, y, label, value, color, delay }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)} >
      <text x={0} y={30} fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
        {label}
      </text>
      <rect x={330} y={0} width={440} height={44} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <rect x={334} y={4} width={Math.max(0, 432 * value)} height={36} rx={18} fill={color} />
    </g>
  );
};

// 6) Yavaşken sıkışıyor: hızla geçiyorsun, onlar seni uzun uzun geçiyor
const Bunching: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.45);
  const quick = useProgress(d, d + 15);
  const slow = useProgress(d + 4, durationInFrames - 6);
  return (
    <g>
      <Paper />
      <Road top={30} bottom={340} />
      {/* Üst şerit: seyrek, hızlı */}
      {[0, 1].map((i) => (
        <Car key={i} x={((frame * 6 + i * 520) % 1040) - 120} y={175} scale={0.7} color={CAR_COLORS[i]} moving />
      ))}
      {/* Alt şerit: sıkışık, yavaş */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Car key={`s${i}`} x={((frame * 1.2 + i * 160) % 960) - 80} y={315} scale={0.7} color={i === 2 ? ORANGE : CAR_COLORS[(i + 2) % 6]} moving />
      ))}
      <Chip x={790} y={70} text="SEYREK" delay={6} />
      <Chip x={790} y={225} text="SIKIŞIK" dark delay={12} />
      <Bar x={40} y={380} label="SEN GEÇERKEN" value={0.18 * quick} color={GREEN} delay={d} />
      <Bar x={40} y={460} label="SENİ GEÇERKEN" value={0.95 * slow} color={RED} delay={d + 4} />
    </g>
  );
};

// 7) Hep önüne bakıyorsun
const LookAhead: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const fade = useProgress(d, d + 30);
  return (
    <g>
      <Paper fill="#ffe3cc" />
      <Road top={180} bottom={470} />
      {/* Görüş konisi */}
      <path d={`M 470 300 L 900 200 L 900 470 Z`} fill={YELLOW} opacity={0.35 + Math.sin(frame / 8) * 0.05} />
      {/* Arkada kalan arabalar soluyor */}
      <Car x={140} y={320} scale={0.75} color={CAR_COLORS[1]} opacity={1 - fade * 0.85} />
      <Car x={140} y={455} scale={0.75} color={CAR_COLORS[3]} opacity={1 - fade * 0.85} />
      {/* Bizim araba */}
      <Car x={430} y={455} scale={0.85} color={ORANGE} face="side" />
      {/* Önde, seni geçen araba parlıyor */}
      <Car x={740 + Math.sin(frame / 12) * 6} y={320} scale={0.85} color={PINK} moving />
      {frame > d + 20 ? <Sparkles points={[[640, 210], [850, 230], [820, 330]]} /> : null}
      <g opacity={fade}>
        <text x={160} y={150} fontFamily={uiFont} fontWeight={800} fontSize={28} textAnchor="middle" fill={INK}>
          GÖZDEN KAYBOLDU
        </text>
      </g>
      <Chip x={690} y={120} text="GÖZÜNÜN ÖNÜNDE!" delay={d + 12} />
      <Arrow from={[480, 380]} to={[620, 330]} progress={useProgress(6, 24)} color={RED} />
    </g>
  );
};

// 8) Yavaşken boştasın, gözün yan şeride kayıyor
const IdleGlance: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  return (
    <g>
      <Paper />
      {/* Yan camdan görünen akan şerit */}
      <rect x={470} y={60} width={400} height={300} rx={30} fill="#cfeefc" stroke={OUTLINE} strokeWidth={6} />
      <svg x={476} y={66} width={388} height={288} viewBox="0 0 388 288">
        <rect y={150} width={388} height={138} fill={ASPHALT} />
        {[0, 1].map((i) => (
          <Car key={i} x={((frame * 7 + i * 300) % 600) - 100} y={270} scale={0.75} color={CAR_COLORS[i + 3]} moving />
        ))}
      </svg>
      {/* Direksiyon başındaki sürücü */}
      <Bust x={250} y={560} scale={1.1} shirt={ORANGE} mood={frame > d ? "look" : "bored"} />
      <g transform={place(250, 520)}>
        <circle r={95} fill="none" stroke="#3a3f4a" strokeWidth={22} />
        <circle r={95} fill="none" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <ThoughtBubble x={90} y={110} r={50} delay={6}>
        <text x={0} y={12} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK}>
          Zzz
        </text>
      </ThoughtBubble>
      <Arrow from={[340, 300]} to={[470, 220]} progress={useProgress(d, d + 16)} color={RED} />
      <Chip x={670} y={430} text="BOŞTA = YANA BAK" delay={d + 10} />
    </g>
  );
};

// 9) Üç sıra: en hızlı olma şansı üçte bir
const ThreeLines: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.5);
  const pick = Math.floor(frame / 8) % 3;
  const settled = frame > d ? 0 : pick;
  return (
    <g>
      <Paper />
      <rect y={460} width={900} height={100} fill="#f3d9c2" stroke={OUTLINE} strokeWidth={4} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Register x={170 + i * 280} y={180} num={i + 1} color={[BLUE, PINK, PURPLE][i]} />
          <Shopper x={170 + i * 280} y={420} color={i === 0 ? ORANGE : CAR_COLORS[i + 2]} scale={0.9} />
          <Shopper x={225 + i * 280} y={520} color={CAR_COLORS[i]} scale={0.9} />
        </g>
      ))}
      {/* Kazanan sırayı gösteren yıldız döner, sonunda seninki olmayan birinde kalır */}
      <g transform={place(170 + (frame > d ? 2 : settled) * 280, 60, 1, frame * 3)}>
        <path d="M 0 -34 L 10 -10 L 34 -10 L 14 6 L 22 32 L 0 16 L -22 32 L -14 6 L -34 -10 L -10 -10 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <NamePlate x={170} y={530} text="SEN" delay={4} />
      <BigText x={450} y={330} text="ÜÇTE BİR" size={70} color={ORANGE} delay={d} />
    </g>
  );
};

// 10) Şeridinde kal
const StayLane: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.4);
  const zig = Math.sin(frame / 10) * 45;
  const tx = ((frame * 4) % 1000) - 120;
  return (
    <g>
      <Paper fill="#ffe3cc" />
      <Road top={130} bottom={460} />
      {/* Zikzak yapan araba (riskli) */}
      <g opacity={0.9}>
        <Car x={tx + 180} y={290 + zig} scale={0.7} color={PURPLE} moving />
      </g>
      {/* Şeridinde kalan araba */}
      <Car x={tx - 60} y={445} scale={0.7} color={ORANGE} face="happy" moving />
      <g transform={place(720, 70, useAppear(10))}>
        <path d="M 0 -42 L 46 38 L -46 38 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        <text x={0} y={30} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={INK}>
          !
        </text>
      </g>
      <Chip x={720} y={150} text="RİSK" dark delay={14} />
      <Chip x={450} y={510} text="ŞERİDİNDE KAL" delay={d} />
      <g transform={place(220, 70, useAppear(d + 8))}>
        <circle r={40} fill={GREEN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -18 0 L -4 14 L 20 -14" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
};

// 11) Sende nerede?
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const w = useWave(40, 4);
  const items = ["TRAFİKTE", "KASADA"];
  return (
    <g>
      <Paper />
      <Bust x={200} y={540} scale={0.9} mood="happy" shirt={ORANGE} />
      {items.map((c, i) => (
        <g key={i} transform={place(620, 120 + i * 130, useAppear(d + i * 8), i % 2 ? w : -w)}>
          <rect x={-200} y={-46} width={400} height={92} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={13} fontFamily={uiFont} fontWeight={800} fontSize={38} textAnchor="middle" fill={[BLUE, PINK][i]}>
            {c} Mİ?
          </text>
        </g>
      ))}
      <QuestionMark x={340} y={250} size={80} delay={d + 22} />
      <Chip x={620} y={420} text="YORUMLARA YAZ!" dark delay={d + 28} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  TrafficJam,
  MarketQueue,
  Researchers,
  VideoTest,
  SeventyPercent,
  Bunching,
  LookAhead,
  IdleGlance,
  ThreeLines,
  StayLane,
  YourTurn,
};
