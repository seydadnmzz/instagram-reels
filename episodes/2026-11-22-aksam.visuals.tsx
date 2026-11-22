// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Tatlıya her zaman yer var / duyusal özgül tokluk (2026-11-22-aksam)
import { useCurrentFrame } from "remotion";
import { Arrow, BigText, Chip, NamePlate, Person, place, Sparkles, uiFont, useAppear, useProgress, useWave } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#fff1e6";
const SKIN = "#f2c79a";
const ORANGE = "#ff8a2b";
const DEEP = "#d9601a";
const PINK = "#ff6b8b";
const RED = "#e8434b";
const GREEN = "#3fb46a";
const BLUE = "#3a8fe0";
const YELLOWC = "#ffd23f";
const PURPLE = "#8a6cf0";
const BROWN = "#8a5a32";
const GREY = "#b9b2aa";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string }> = ({ x, y, text, size = 28, color = OUTLINE }) => (
  <text x={x} y={y} fontFamily={uiFont} fontWeight={800} fontSize={size} textAnchor="middle" fill={color}>
    {text}
  </text>
);

// Belden yukarı karakter; (0,0) gövdenin alt ortası, kafa merkezi (0,-200)
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  mood?: "full" | "happy" | "wow" | "talk" | "calm";
  look?: number;
  delay?: number;
}> = ({ x, y, scale = 1, shirt = ORANGE, hair = "#4a2f1d", mood = "calm", look = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const sway = Math.sin(frame / 18) * 2;
  const blink = frame % 90 > 85 ? 0.15 : 1;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${sway} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {mood === "wow" ? (
          <g>
            {[-26, 26].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy={-206} r={15} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
                <circle cx={cx + look * 5} cy={-204} r={7} fill={OUTLINE} />
              </g>
            ))}
          </g>
        ) : mood === "full" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round">
            <path d="M -38 -204 Q -26 -196 -14 -204" />
            <path d="M 14 -204 Q 26 -196 38 -204" />
          </g>
        ) : (
          <g transform={`translate(0 ${-206 * (1 - blink)}) scale(1 ${blink})`}>
            <circle cx={-26 + look * 4} cy={-206} r={8} fill={OUTLINE} />
            <circle cx={26 + look * 4} cy={-206} r={8} fill={OUTLINE} />
          </g>
        )}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mood === "calm" ? <path d="M -20 -160 Q 0 -166 20 -160" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        {mood === "full" ? (
          <ellipse cx={0} cy={-162} rx={20} ry={7} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} />
        ) : null}
        {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mood === "wow" ? <ellipse cx={0} cy={-160} rx={12} ry={15} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} /> : null}
        {mood === "talk" ? <ellipse cx={0} cy={-162} rx={18} ry={6 + Math.abs(Math.sin(frame / 3)) * 12} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
        <circle cx={-46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-176} r={10} fill="#f59ab0" opacity={0.7} />
      </g>
    </g>
  );
};

// Tabak; (0,0) merkez. food: üstündeki yiyecek
const Plate: React.FC<{ x: number; y: number; scale?: number; food?: "meal" | "empty" | "pasta" | "salad" | "soup"; amount?: number }> = ({
  x,
  y,
  scale = 1,
  food = "meal",
  amount = 1,
}) => (
  <g transform={place(x, y, scale)}>
    <ellipse cx={0} cy={8} rx={110} ry={34} fill="rgba(0,0,0,0.15)" />
    <ellipse cx={0} cy={0} rx={110} ry={34} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <ellipse cx={0} cy={-2} rx={72} ry={20} fill="none" stroke="#e6ddd3" strokeWidth={4} />
    {food === "meal" && amount > 0.05 ? (
      <g transform={`scale(${amount})`}>
        <ellipse cx={-22} cy={-10} rx={44} ry={18} fill="#b5652e" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={30} cy={-14} r={16} fill={GREEN} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={46} cy={-4} r={12} fill={YELLOWC} stroke={OUTLINE} strokeWidth={4} />
      </g>
    ) : null}
    {food === "pasta" ? (
      <g transform={`scale(${amount})`}>
        <path d="M -50 -8 q 15 -25 30 0 q 15 -25 30 0 q 15 -25 30 0" fill="none" stroke={YELLOWC} strokeWidth={10} strokeLinecap="round" />
        <circle cx={0} cy={-14} r={12} fill={RED} stroke={OUTLINE} strokeWidth={4} />
      </g>
    ) : null}
    {food === "salad" ? (
      <g transform={`scale(${amount})`}>
        <circle cx={-24} cy={-12} r={16} fill={GREEN} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={6} cy={-16} r={16} fill="#6fcf6a" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={30} cy={-8} r={10} fill={RED} stroke={OUTLINE} strokeWidth={4} />
      </g>
    ) : null}
    {food === "soup" ? <ellipse cx={0} cy={-4} rx={60} ry={14} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} /> : null}
  </g>
);

// Çilekli dilim pasta; (0,0) taban ortası
const Cake: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <ellipse cx={0} cy={6} rx={95} ry={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <path d="M -70 0 L -70 -70 L 70 -100 L 70 -30 Z" fill="#f7d9a8" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -70 -36 L 70 -66" stroke={PINK} strokeWidth={12} />
    <path d="M -70 -70 L 70 -100 L 50 -112 L -80 -84 Z" fill="#fff6fa" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 10 -112 q -4 -26 16 -30 q 20 4 14 28 Z" fill={RED} stroke={OUTLINE} strokeWidth={4} />
    <path d="M 22 -142 l 6 -12 l 8 10" fill={GREEN} stroke={OUTLINE} strokeWidth={3} />
  </g>
);

// Dikey "lezzet" göstergesi; level 0..1
const Meter: React.FC<{ x: number; y: number; level: number; label?: string; color?: string; h?: number }> = ({ x, y, level, label, color, h = 220 }) => {
  const c = color ?? (level > 0.6 ? GREEN : level > 0.3 ? YELLOWC : RED);
  return (
    <g transform={place(x, y)}>
      <rect x={-30} y={-h} width={60} height={h} rx={14} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <rect x={-22} y={-h + 8 + (h - 16) * (1 - level)} width={44} height={(h - 16) * level} rx={9} fill={c} />
      {label ? <Label x={0} y={40} text={label} size={24} /> : null}
    </g>
  );
};

// 1) Kanca: "DOYDUM!" sonra tatlı geliyor, gözler açılıyor
const FullThenDessert: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const frame = useCurrentFrame();
  const cakeIn = useProgress(d(0.4), d(0.6));
  const wow = frame > d(0.55);
  const push = useProgress(d(0.08), d(0.25));
  const bubble = useAppear(6);
  return (
    <g>
      <Paper />
      <rect x={0} y={420} width={900} height={140} fill="#e9b98a" stroke={OUTLINE} strokeWidth={5} />
      <Bust x={260} y={430} scale={1.05} mood={wow ? "wow" : "full"} look={wow ? 1 : 0} shirt={ORANGE} />
      <g transform={`translate(${-push * 60} 0)`}>
        <Plate x={260} y={470} food="meal" amount={0.15} />
      </g>
      {!wow ? (
        <g transform={place(470, 120, bubble)}>
          <rect x={-120} y={-40} width={240} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <path d="M -40 40 L -70 75 L -10 40 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <Label x={0} y={12} text="DOYDUM!" size={38} />
        </g>
      ) : (
        <g>
          <BigText x={470} y={110} text="YER VAR!" size={64} color={YELLOWC} delay={d(0.6)} />
          <Sparkles points={[[600, 300], [760, 260], [700, 380]]} />
        </g>
      )}
      <g transform={`translate(${(1 - cakeIn) * 500} 0)`}>
        <Cake x={680} y={460} scale={1.2} />
      </g>
    </g>
  );
};

// 2) Ad: duyusal özgül tokluk — mide + dil
const NameTag: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const wave = useWave(40, 6);
  const a1 = useAppear(d(0.12));
  const a2 = useAppear(d(0.3));
  return (
    <g>
      <Paper />
      <Chip x={450} y={70} text="DUYUSAL ÖZGÜL TOKLUK" dark delay={4} />
      {/* mide */}
      <g transform={place(250, 300, a1)}>
        <path d="M -40 -110 Q -50 -60 -80 -20 Q -120 50 -40 100 Q 40 140 90 70 Q 120 20 60 -10 Q 20 -30 10 -110 Z" fill="#f59ab0" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -30 40 Q 0 60 40 40" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
        <circle cx={-20} cy={10} r={6} fill={OUTLINE} />
        <circle cx={30} cy={10} r={6} fill={OUTLINE} />
        <Label x={0} y={160} text="MİDE" size={32} />
      </g>
      <BigText x={450} y={300} text="+" size={110} color={ORANGE} delay={d(0.22)} />
      {/* ağız + dil */}
      <g transform={place(650, 300 + wave, a2)}>
        <path d="M -110 -30 Q 0 -90 110 -30 Q 100 90 0 100 Q -100 90 -110 -30 Z" fill="#7a2b2b" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -70 30 Q -60 -10 0 -6 Q 60 -10 70 30 Q 60 90 0 90 Q -60 90 -70 30 Z" fill={PINK} stroke={OUTLINE} strokeWidth={5} />
        <path d="M 0 0 L 0 60" stroke="#d94a6a" strokeWidth={5} strokeLinecap="round" />
        <path d="M -100 -36 Q 0 -80 100 -36 L 90 -20 Q 0 -60 -90 -20 Z" fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <Label x={0} y={150} text="DAMAK" size={32} />
      </g>
      <Chip x={650} y={515} text="O DA DOYUYOR!" delay={d(0.45)} />
    </g>
  );
};

// 3) Her lokmada tat sönüyor
const FadingBites: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const eat = useProgress(d(0.1), d(0.85));
  const level = 1 - eat * 0.82;
  const frame = useCurrentFrame();
  const forkY = Math.sin(frame / 6) * 30;
  const bites = Math.floor(eat * 5);
  return (
    <g>
      <Paper />
      <rect x={0} y={420} width={900} height={140} fill="#e9b98a" stroke={OUTLINE} strokeWidth={5} />
      <Plate x={330} y={450} scale={1.5} food="pasta" amount={1 - eat * 0.7} />
      {/* çatal */}
      <g transform={place(470, 300 + forkY, 1, -20)}>
        <rect x={-6} y={-10} width={12} height={130} rx={6} fill={GREY} stroke={OUTLINE} strokeWidth={4} />
        <path d="M -20 -10 L -20 -60 M -7 -10 L -7 -60 M 7 -10 L 7 -60 M 20 -10 L 20 -60 M -22 -10 L 22 -10" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      </g>
      <Meter x={720} y={400} level={level} label="LEZZET" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={120 + i * 50} cy={90} r={16} fill={i < bites ? ORANGE : "#fff"} stroke={OUTLINE} strokeWidth={4} />
      ))}
      <Label x={220} y={145} text="LOKMA" size={26} />
      <Arrow from={[820, 150]} to={[820, 360]} progress={useProgress(d(0.4), d(0.7))} color={RED} />
    </g>
  );
};

// 4) Oxford deneyi: yenen yemek vs yenmeyenler
const LabRatings: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const drop = useProgress(d(0.3), d(0.7));
  return (
    <g>
      <Paper fill="#fff6ee" />
      <Person x={130} y={470} shirt="#fff" pants="#2f3f63" glasses presenting delay={2} />
      <NamePlate x={130} y={515} text="ARAŞTIRMACI" delay={8} />
      <g transform="translate(260 0)">
        <rect x={0} y={60} width={600} height={430} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <Label x={300} y={110} text="LEZZET PUANI" size={30} />
        {[
          { x: 120, food: "salad" as const, eaten: false },
          { x: 300, food: "pasta" as const, eaten: true },
          { x: 480, food: "soup" as const, eaten: false },
        ].map((b, i) => {
          const h = b.eaten ? 220 * (1 - drop * 0.6) : 220 * (1 - drop * 0.12);
          return (
            <g key={i}>
              <rect x={b.x - 45} y={400 - h} width={90} height={h} rx={10} fill={b.eaten ? RED : GREEN} stroke={OUTLINE} strokeWidth={4} />
              <Plate x={b.x} y={440} scale={0.55} food={b.food} />
            </g>
          );
        })}
        <Chip x={300} y={160} text="YENEN" dark delay={d(0.35)} />
      </g>
    </g>
  );
};

// 5) Sadece 2 dakika: kronometre + henüz sindirilmemiş besin
const TwoMinutes: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const t = useProgress(d(0.05), d(0.6));
  const angle = t * 360 * 2;
  const secs = Math.round(t * 120);
  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, "0");
  const done = t >= 1;
  return (
    <g>
      <Paper />
      <g transform={place(300, 300)}>
        <rect x={-22} y={-200} width={44} height={36} rx={8} fill={GREY} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={0} r={170} fill="#fff" stroke={OUTLINE} strokeWidth={8} />
        <path d={`M 0 0 L 0 -150 A 150 150 0 ${t > 0.5 ? 1 : 0} 1 ${150 * Math.sin((t * Math.PI * 2))} ${-150 * Math.cos(t * Math.PI * 2)} Z`} fill={ORANGE} opacity={0.35} />
        <line x1={0} y1={0} x2={0} y2={-140} stroke={RED} strokeWidth={8} strokeLinecap="round" transform={`rotate(${angle})`} />
        <circle cx={0} cy={0} r={14} fill={OUTLINE} />
        <text x={0} y={90} fontFamily={uiFont} fontWeight={900} fontSize={54} textAnchor="middle" fill={OUTLINE}>
          {mm}:{ss}
        </text>
      </g>
      <g transform={place(680, 230, useAppear(d(0.35)))}>
        <Meter x={0} y={140} level={done ? 0.35 : 1 - t * 0.65} label="LEZZET" h={200} />
      </g>
      {done ? <Chip x={680} y={470} text="DAHA SİNDİRİLMEDİ!" delay={d(0.62)} /> : null}
    </g>
  );
};

// Şeker/çikolata draje
const Candy: React.FC<{ x: number; y: number; color: string; r?: number }> = ({ x, y, color, r = 26 }) => (
  <g>
    <ellipse cx={x} cy={y} rx={r} ry={r * 0.8} fill={color} stroke={OUTLINE} strokeWidth={4} />
    <ellipse cx={x - r * 0.35} cy={y - r * 0.3} rx={r * 0.25} ry={r * 0.15} fill="#fff" opacity={0.7} />
  </g>
);

// 6) Sadece rengi farklı çikolatalar
const ColorCandies: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const eat = useProgress(d(0.15), d(0.6));
  const colors = [RED, BLUE, YELLOWC, GREEN];
  const reds = 6 - Math.floor(eat * 5);
  return (
    <g>
      <Paper />
      {colors.map((c, i) => {
        const cx = 140 + i * 200;
        const n = i === 0 ? reds : 6;
        return (
          <g key={c}>
            <ellipse cx={cx} cy={240} rx={85} ry={30} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
            {Array.from({ length: n }).map((_, k) => (
              <Candy key={k} x={cx - 40 + (k % 3) * 40} y={226 - Math.floor(k / 3) * 26} color={c} r={20} />
            ))}
            <Meter x={cx} y={490} level={i === 0 ? 1 - eat * 0.6 : 0.95} color={c} h={170} />
          </g>
        );
      })}
      <Label x={450} y={80} text="TADI AYNI, SADECE RENK FARKLI" size={34} />
      <Chip x={140} y={140} text="YENEN" dark delay={d(0.4)} />
    </g>
  );
};

// Sandviç; fill: iç harç rengi
const Sandwich: React.FC<{ x: number; y: number; fill: string; scale?: number }> = ({ x, y, fill, scale = 1 }) => (
  <g transform={place(x, y, scale)}>
    <path d="M -50 10 L 50 10 L 0 -50 Z" fill="#f2c27a" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -46 4 L 46 4" stroke={fill} strokeWidth={10} />
    <path d="M -40 -4 L 40 -4 L 0 -48 Z" fill="#f7d9a8" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" opacity={0.6} />
  </g>
);

// 7) Sandviç deneyi: tek çeşit vs dört çeşit
const Sandwiches: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const g = useProgress(d(0.15), d(0.45));
  return (
    <g>
      <Paper />
      <line x1={450} y1={60} x2={450} y2={520} stroke={OUTLINE} strokeWidth={4} strokeDasharray="14 12" />
      <Label x={225} y={90} text="TEK ÇEŞİT" size={32} />
      <Label x={675} y={90} text="DÖRT ÇEŞİT" size={32} />
      {[0, 1, 2, 3].map((i) => (
        <Sandwich key={i} x={130 + i * 64} y={180} fill={GREEN} scale={0.75} />
      ))}
      {[GREEN, RED, YELLOWC, PURPLE].map((c, i) => (
        <Sandwich key={c} x={580 + i * 64} y={180} fill={c} scale={0.75} />
      ))}
      <rect x={175} y={460 - 150 * g} width={100} height={150 * g} rx={10} fill={GREY} stroke={OUTLINE} strokeWidth={4} />
      <rect x={625} y={460 - 200 * g} width={100} height={200 * g} rx={10} fill={ORANGE} stroke={OUTLINE} strokeWidth={4} />
      <line x1={120} y1={462} x2={780} y2={462} stroke={OUTLINE} strokeWidth={5} />
      <Label x={225} y={505} text="YENEN" size={24} />
      <Label x={675} y={505} text="YENEN" size={24} />
      <Chip x={675} y={225} text="1/3 FAZLA" delay={d(0.4)} />
    </g>
  );
};

// 8) Tatlı yepyeni bir lezzet
const NewTaste: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const x1 = useProgress(d(0.1), d(0.25));
  const x2 = useProgress(d(0.2), d(0.35));
  const x3 = useProgress(d(0.3), d(0.45));
  const glow = useWave(30, 0.06);
  const cross = (p: number, cx: number) =>
    p > 0 ? (
      <g stroke={RED} strokeWidth={10} strokeLinecap="round" opacity={0.9}>
        <line x1={cx - 50 * p} y1={150 - 50 * p} x2={cx + 50 * p} y2={150 + 50 * p} />
        <line x1={cx + 50 * p} y1={150 - 50 * p} x2={cx - 50 * p} y2={150 + 50 * p} />
      </g>
    ) : null;
  return (
    <g>
      <Paper />
      <Plate x={150} y={160} scale={0.7} food="soup" />
      <Plate x={330} y={160} scale={0.7} food="meal" />
      <Plate x={510} y={160} scale={0.7} food="salad" />
      {cross(x1, 150)}
      {cross(x2, 330)}
      {cross(x3, 510)}
      <Label x={330} y={260} text="TATTIN, SIKILDIN" size={28} />
      <g transform={place(680, 450, 1.25 + glow)}>
        <circle cx={0} cy={-60} r={120} fill="#fff7c2" opacity={0.8} />
        <Cake x={0} y={20} />
      </g>
      <Chip x={300} y={420} text="YENİ TAT!" delay={d(0.3)} />
      <Sparkles points={[[580, 320], [800, 330], [700, 250]]} />
    </g>
  );
};

// Böğürtlen çalısı
const Bush: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={place(x, y)}>
    <path d="M -90 0 Q -110 -60 -60 -80 Q -40 -130 10 -110 Q 60 -140 80 -80 Q 120 -50 90 0 Z" fill="#4a9a4a" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    {[
      [-40, -60],
      [10, -80],
      [50, -50],
      [-10, -30],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={11} fill={PURPLE} stroke={OUTLINE} strokeWidth={3} />
    ))}
  </g>
);

// 9) Atalar: çeşitli besinler
const Ancestors: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const a = [useAppear(d(0.08)), useAppear(d(0.16)), useAppear(d(0.24)), useAppear(d(0.32))];
  const fishY = useWave(24, 8);
  return (
    <g>
      <Paper fill="#e4f4ff" />
      <circle cx={780} cy={90} r={50} fill={YELLOWC} stroke={OUTLINE} strokeWidth={5} />
      <rect x={0} y={400} width={900} height={160} fill="#9fd36b" stroke={OUTLINE} strokeWidth={5} />
      <path d="M 560 400 Q 700 380 900 400 L 900 470 Q 700 460 560 470 Z" fill={BLUE} stroke={OUTLINE} strokeWidth={4} />
      <Person x={140} y={430} shirt="#b5652e" pants="#6b4a2a" hair="#3a2a1a" walking walkSpeed={0.6} delay={0} />
      <g transform={place(330, 400, a[0])}>
        <Bush x={0} y={0} />
      </g>
      <g transform={place(470, 380, a[1])}>
        <path d="M -20 0 L 20 0 L 0 -80 Z" fill="#7a4a24" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={0} cy={-100} r={46} fill="#5bb65b" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={-14} cy={-96} r={11} fill={RED} stroke={OUTLINE} strokeWidth={3} />
        <circle cx={16} cy={-110} r={11} fill={RED} stroke={OUTLINE} strokeWidth={3} />
      </g>
      <g transform={place(720, 430 + fishY, a[2])}>
        <path d="M -40 0 Q 0 -30 40 0 Q 0 30 -40 0 Z M 40 0 L 66 -18 L 66 18 Z" fill={ORANGE} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={-20} cy={-4} r={4} fill={OUTLINE} />
      </g>
      <g transform={place(260, 500, a[3])}>
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={i * 36} cy={0} rx={16} ry={12} fill={BROWN} stroke={OUTLINE} strokeWidth={3} />
        ))}
      </g>
      <Chip x={450} y={70} text="ÇEŞİTLİ BESİN" delay={d(0.2)} />
      <Chip x={450} y={150} text="= DENGELİ BESLENME" dark delay={d(0.42)} />
    </g>
  );
};

// 10) Açık büfe: çeşit arttıkça tabak doluyor
const Buffet: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const fill = useProgress(d(0.15), d(0.8));
  const foods = ["soup", "salad", "pasta", "meal", "soup", "salad"] as const;
  const pile = Math.floor(fill * 6);
  return (
    <g>
      <Paper />
      <rect x={40} y={250} width={820} height={30} rx={8} fill={BROWN} stroke={OUTLINE} strokeWidth={5} />
      <rect x={70} y={280} width={20} height={150} fill={BROWN} stroke={OUTLINE} strokeWidth={4} />
      <rect x={810} y={280} width={20} height={150} fill={BROWN} stroke={OUTLINE} strokeWidth={4} />
      {foods.map((f, i) => (
        <Plate key={i} x={110 + i * 136} y={235} scale={0.55} food={f} />
      ))}
      <Cake x={620} y={200} scale={0.55} />
      <Label x={260} y={110} text="AÇIK BÜFE" size={44} color={DEEP} />
      {/* doldurulan tabak */}
      <g transform={place(450, 470)}>
        <ellipse cx={0} cy={0} rx={140} ry={40} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        {Array.from({ length: pile }).map((_, k) => (
          <circle
            key={k}
            cx={-60 + (k % 3) * 60}
            cy={-14 - Math.floor(k / 3) * 34}
            r={26}
            fill={[ORANGE, GREEN, YELLOWC, RED, PURPLE, "#b5652e"][k]}
            stroke={OUTLINE}
            strokeWidth={4}
          />
        ))}
      </g>
      <Meter x={760} y={530} level={0.15 + fill * 0.8} color={RED} h={200} />
      <Label x={760} y={310} text="YENEN" size={24} />
    </g>
  );
};

// 11) Kapanış: sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = (k: number) => Math.round(durationInFrames * k);
  const bubbles = ["BAKLAVA", "SÜTLAÇ", "DONDURMA"];
  const a = [useAppear(d(0.1)), useAppear(d(0.25)), useAppear(d(0.4))];
  return (
    <g>
      <Paper />
      <Bust x={210} y={540} scale={1} mood="talk" shirt={ORANGE} />
      <g transform={place(210, 150, useAppear(4))}>
        <circle cx={0} cy={0} r={60} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <Label x={0} y={18} text="?" size={56} />
      </g>
      {bubbles.map((b, i) => (
        <g key={b} transform={place(620, 110 + i * 110, a[i])}>
          <rect x={-200} y={-40} width={400} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <Label x={0} y={12} text={b} size={32} color={i === 1 ? DEEP : OUTLINE} />
        </g>
      ))}
      <Chip x={620} y={480} text="@ETİKETLE" delay={d(0.6)} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  FullThenDessert,
  NameTag,
  FadingBites,
  LabRatings,
  TwoMinutes,
  ColorCandies,
  Sandwiches,
  NewTaste,
  Ancestors,
  Buffet,
  YourTurn,
};
