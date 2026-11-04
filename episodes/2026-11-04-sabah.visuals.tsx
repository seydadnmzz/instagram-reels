// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Kendini neden gıdıklayamıyorsun? (2026-11-04-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  INK,
  NamePlate,
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
const PAPER = "#e8f8f6";
const SKIN = "#f2c79a";
const TEAL = "#3fb4a0";
const BLUE = "#5b8def";
const PINK = "#f59ac0";
const FEATHER = "#9b6bf2";

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

// Tüy; (0,0) tutulan uç, tüy yukarı doğru uzanır
const Feather: React.FC<{ color?: string }> = ({ color = FEATHER }) => (
  <g>
    <path d="M 0 -18 C 34 -50 34 -112 0 -150 C -34 -112 -34 -50 0 -18 Z" fill={color} stroke={OUTLINE} strokeWidth={4} />
    <path d="M -14 -60 L -26 -70 M 14 -90 L 26 -100 M -14 -110 L -24 -118" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
    <line x1={0} y1={6} x2={0} y2={-140} stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
  </g>
);

type Mood = "flat" | "smile" | "laugh" | "angry";

// Belden yukarı çizilmiş karakter; (0,0) gövdenin alt ortası.
// hands: yerel koordinatlarda iki elin konumu [sol, sağ] (izleyiciye göre)
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  mood?: Mood;
  shirt?: string;
  hair?: string;
  hands?: [[number, number], [number, number]];
  holdRight?: React.ReactNode;
  holdLeft?: React.ReactNode;
  rotate?: number;
  delay?: number;
}> = ({ x, y, scale = 1, mood = "flat", shirt = TEAL, hair = "#4a2f1d", hands, holdRight, holdLeft, rotate = 0, delay = 0 }) => {
  const appear = useAppear(delay);
  const hs = hands ?? [
    [-120, -20],
    [120, -20],
  ];
  const shoulders: [number, number][] = [
    [-92, -128],
    [92, -128],
  ];
  const arm = (i: number) => {
    const [sx, sy] = shoulders[i];
    const [hx, hy] = hs[i];
    return (
      <g key={i}>
        <line x1={sx} y1={sy} x2={hx} y2={hy} stroke={OUTLINE} strokeWidth={36} strokeLinecap="round" />
        <line x1={sx} y1={sy} x2={hx} y2={hy} stroke={shirt} strokeWidth={28} strokeLinecap="round" />
      </g>
    );
  };
  const hand = (i: number, hold?: React.ReactNode) => {
    const [hx, hy] = hs[i];
    return (
      <g key={`h${i}`}>
        {hold ? <g transform={`translate(${hx} ${hy})`}>{hold}</g> : null}
        <circle cx={hx} cy={hy} r={20} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      </g>
    );
  };
  return (
    <g transform={place(x, y, scale * appear, rotate)}>
      <path d="M -112 0 L -112 -90 Q -112 -150 -50 -150 L 50 -150 Q 112 -150 112 -90 L 112 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={5} />
      <rect x={-20} y={-168} width={40} height={26} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      {arm(0)}
      {arm(1)}
      <circle cx={0} cy={-238} r={84} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <path d="M -84 -246 Q -86 -330 0 -326 Q 86 -330 84 -246 Q 60 -290 10 -282 Q -40 -292 -84 -246 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={-84} cy={-232} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={84} cy={-232} r={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      {mood === "laugh" ? (
        <g>
          <path d="M -46 -240 Q -30 -258 -14 -240 M 14 -240 Q 30 -258 46 -240" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
          <path d="M -42 -208 Q 0 -140 42 -208 Z" fill="#8a2430" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <path d="M -18 -172 Q 0 -186 18 -172 Q 0 -160 -18 -172 Z" fill="#f07a86" />
          <circle cx={-56} cy={-206} r={12} fill="#f7a0a8" opacity={0.8} />
          <circle cx={56} cy={-206} r={12} fill="#f7a0a8" opacity={0.8} />
        </g>
      ) : (
        <g>
          <circle cx={-30} cy={-240} r={8} fill={OUTLINE} />
          <circle cx={30} cy={-240} r={8} fill={OUTLINE} />
          {mood === "flat" ? (
            <g>
              <path d="M -46 -266 L -16 -264 M 16 -264 L 46 -266" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
              <path d="M -24 -196 L 24 -196" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
            </g>
          ) : null}
          {mood === "smile" ? <path d="M -28 -204 Q 0 -178 28 -204" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" /> : null}
          {mood === "angry" ? (
            <g>
              <path d="M -50 -272 L -14 -256 M 14 -256 L 50 -272" stroke={OUTLINE} strokeWidth={7} strokeLinecap="round" />
              <path d="M -28 -188 Q 0 -212 28 -188" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
              <circle cx={-60} cy={-206} r={12} fill="#f07a7a" opacity={0.7} />
              <circle cx={60} cy={-206} r={12} fill="#f07a7a" opacity={0.7} />
            </g>
          ) : null}
        </g>
      )}
      {hand(0, holdLeft)}
      {hand(1, holdRight)}
    </g>
  );
};

// 1) Kendini gıdıklamaya çalışan karakter: tepki yok
const TickleSelf: Visual = () => {
  const wiggle = useWave(8, 14);
  const wiggleY = useWave(11, 8);
  return (
    <g>
      <Paper />
      <rect x={0} y={480} width={900} height={80} fill="#bfe7e0" />
      <Bust
        x={360}
        y={580}
        mood="flat"
        hands={[
          [-150, -330],
          [-60 + wiggle, -150 + wiggleY],
        ]}
        holdRight={<g transform="rotate(-70)"><Feather /></g>}
      />
      <QuestionMark x={600} y={160} size={1} delay={12} />
      <Chip x={680} y={390} text="HİÇBİR ŞEY!" dark delay={20} />
      <BigText x={770} y={240} text="…" size={110} color={INK} delay={26} />
    </g>
  );
};

// 2) Arkadaşı gıdıklayınca kahkaha
const FriendTickle: Visual = () => {
  const shake = useWave(6, 4);
  const tickle = useWave(7, 10);
  return (
    <g>
      <Paper />
      <rect x={0} y={480} width={900} height={80} fill="#bfe7e0" />
      <Bust
        x={300}
        y={580}
        mood="laugh"
        rotate={shake}
        shirt={TEAL}
        hands={[
          [-60, -60],
          [60, -60],
        ]}
      />
      <g transform={`translate(${tickle} 0)`}>
        <Person x={660} y={540} scale={1.25} shirt="#f28c28" hair="#2b2b2b" facing="left" presenting holding={<g transform="rotate(-60) scale(0.7)"><Feather /></g>} delay={4} />
      </g>
      <BigText x={480} y={120} text="HA HA!" size={72} color={YELLOW} delay={10} />
      <BigText x={130} y={190} text="HA!" size={60} color={YELLOW} delay={18} />
      <Sparkles points={[[420, 220], [180, 110], [560, 60]]} />
    </g>
  );
};

const BRAIN_PATH =
  "M -110 10 C -130 -60 -70 -110 -20 -95 C 10 -125 80 -110 95 -65 C 140 -50 135 20 100 40 C 95 85 30 100 0 80 C -40 105 -110 85 -110 10 Z";

// 3) Beyincik vurgusu
const Cerebellum: Visual = () => {
  const frame = useCurrentFrame();
  const brain = useAppear(0);
  const cb = useAppear(12);
  const glow = 0.35 + 0.25 * Math.sin(frame / 6);
  const arrow = useProgress(22, 40);
  return (
    <g>
      <Paper />
      <g transform={place(400, 250, 1.5 * brain)}>
        <rect x={60} y={60} width={30} height={110} rx={12} fill="#e48bb0" stroke={OUTLINE} strokeWidth={4} />
        <path d={BRAIN_PATH} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -60 -60 Q -40 -40 -55 -15 M 30 -80 Q 10 -55 35 -35 M -80 30 Q -50 30 -45 55 M 0 -20 Q 20 0 0 30" fill="none" stroke="#d96b98" strokeWidth={5} strokeLinecap="round" />
        <circle cx={-40} cy={-10} r={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-6} cy={-10} r={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-44} cy={-8} r={5} fill={OUTLINE} />
        <circle cx={-10} cy={-8} r={5} fill={OUTLINE} />
        <g transform={place(110, 75, cb)}>
          <ellipse cx={0} cy={0} rx={70} ry={52} fill={YELLOW} opacity={glow} />
          <ellipse cx={0} cy={0} rx={52} ry={36} fill="#e0679c" stroke={OUTLINE} strokeWidth={5} />
          {[-20, -6, 8, 22].map((yy) => (
            <path key={yy} d={`M -40 ${yy} Q 0 ${yy - 8} 40 ${yy}`} fill="none" stroke="#a83b6c" strokeWidth={3} strokeLinecap="round" />
          ))}
        </g>
      </g>
      <Arrow from={[760, 470]} to={[600, 380]} progress={arrow} color={RED} />
      <NamePlate x={760} y={500} text="BEYİNCİK" delay={30} />
      <Chip x={180} y={500} text="ÖN" delay={6} />
      <Chip x={760} y={90} text="ARKA" dark delay={8} />
    </g>
  );
};

// 4) Beyin hissi önceden tahmin ediyor
const Prediction: Visual = () => {
  const arrow = useProgress(8, 24);
  const check = useAppear(30);
  return (
    <g>
      <Paper />
      <Brain x={200} y={330} scale={1.1} delay={0} />
      <Arrow from={[320, 270]} to={[440, 230]} progress={arrow} color={INK} />
      <ThoughtBubble x={630} y={220} r={150} delay={12}>
        <g transform="translate(-60 80) rotate(-30)">
          <Feather />
        </g>
        <g transform={place(60, 0, check)}>
          <circle r={48} fill="#4cc38a" stroke={OUTLINE} strokeWidth={5} />
          <path d="M -24 0 L -6 18 L 26 -16" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </ThoughtBubble>
      <Chip x={450} y={500} text="ÖNCEDEN TAHMİN" delay={20} />
    </g>
  );
};

// 5) Tahmin edilen his kısılıyor
const VolumeDown: Visual = () => {
  const p = useProgress(10, 50);
  const knobX = 800 - 330 * p;
  const bars = [0.9, 1, 0.8, 0.95, 0.85, 0.7];
  return (
    <g>
      <Paper />
      {/* Hoparlör */}
      <g transform="translate(200 230)">
        <path d="M -60 -30 L -20 -30 L 30 -75 L 30 75 L -20 30 L -60 30 Z" fill={TEAL} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${55 + i * 28} -${40 + i * 22} Q ${80 + i * 34} 0 ${55 + i * 28} ${40 + i * 22}`}
            fill="none"
            stroke={OUTLINE}
            strokeWidth={6}
            strokeLinecap="round"
            opacity={Math.min(1, Math.max(0, 1.6 - p * 2.4 - i * 0.3))}
          />
        ))}
      </g>
      <NamePlate x={620} y={110} text="HİS" delay={4} />
      {/* Kaydırıcı */}
      <rect x={440} y={180} width={380} height={20} rx={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <rect x={440} y={180} width={Math.max(0, knobX - 440)} height={20} rx={10} fill={RED} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={knobX} cy={190} r={26} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      {/* Ekolayzır */}
      {bars.map((b, i) => {
        const h = 200 * b * (1 - 0.8 * p);
        return <rect key={i} x={460 + i * 60} y={440 - h} width={40} height={h} rx={6} fill={i % 2 ? BLUE : TEAL} stroke={OUTLINE} strokeWidth={4} />;
      })}
      <line x1={440} y1={442} x2={820} y2={442} stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <Chip x={200} y={430} text="KENDİ DOKUNUŞUN" dark delay={8} />
      <Chip x={630} y={500} text="KISILDI" delay={40} />
    </g>
  );
};

// 6) Robot aracılığıyla kendini gıdıklama
const RobotTickle: Visual = () => {
  const stick = useWave(14, 14);
  const armX = useWave(14, 18);
  const robot = useAppear(6);
  return (
    <g>
      <Paper />
      {/* Kablo */}
      <path d="M 250 470 C 250 300 560 300 680 380" fill="none" stroke={OUTLINE} strokeWidth={6} />
      <Bust
        x={430}
        y={600}
        scale={0.8}
        mood="smile"
        hands={[
          [-225 + stick * 1.2, -260],
          [200, -145],
        ]}
      />
      {/* Masa */}
      <rect x={30} y={492} width={840} height={26} rx={8} fill="#c9a36a" stroke={OUTLINE} strokeWidth={5} />
      {/* Joystick */}
      <g transform="translate(250 492)">
        <rect x={-46} y={-30} width={92} height={30} rx={8} fill="#5d6b7a" stroke={OUTLINE} strokeWidth={4} />
        <g transform={`rotate(${stick} 0 -30)`}>
          <line x1={0} y1={-30} x2={0} y2={-96} stroke={OUTLINE} strokeWidth={10} strokeLinecap="round" />
          <circle cx={0} cy={-100} r={16} fill={RED} stroke={OUTLINE} strokeWidth={4} />
        </g>
      </g>
      {/* Avuç (masada, yukarı bakıyor) */}
      <ellipse cx={600} cy={482} rx={46} ry={16} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      {/* Robot */}
      <g transform={place(760, 392, robot)}>
        <rect x={-60} y={-40} width={120} height={140} rx={18} fill="#b8c4d0" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-44} y={-110} width={88} height={64} rx={14} fill="#d7e0e8" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={-18} cy={-80} r={9} fill={OUTLINE} />
        <circle cx={18} cy={-80} r={9} fill={OUTLINE} />
        <line x1={0} y1={-110} x2={0} y2={-140} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={-146} r={9} fill={RED} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={0} cy={20} r={16} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
        <line x1={-60} y1={0} x2={-150 + armX} y2={-20} stroke={OUTLINE} strokeWidth={18} strokeLinecap="round" />
        <line x1={-60} y1={0} x2={-150 + armX} y2={-20} stroke="#8d9aa8" strokeWidth={10} strokeLinecap="round" />
        <g transform={`translate(${-150 + armX} -20) rotate(180) scale(0.55)`}>
          <Feather color={FEATHER} />
        </g>
      </g>
      <NamePlate x={760} y={200} text="ROBOT" delay={14} />
      <Chip x={220} y={90} text="KUMANDA SENDE" delay={20} />
    </g>
  );
};

// 7) Gecikme arttıkça gıdıklanma artıyor
const DelayMeter: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const p = useProgress(8, Math.max(20, durationInFrames - 20));
  const value = (0.2 * p).toFixed(1).replace(".", ",");
  const angle = p * 72;
  const mood: Mood = p < 0.35 ? "flat" : p < 0.75 ? "smile" : "laugh";
  const shake = mood === "laugh" ? Math.sin(frame / 3) * 3 : 0;
  return (
    <g>
      <Paper />
      {/* Kronometre */}
      <g transform="translate(220 260)">
        <rect x={-18} y={-150} width={36} height={30} rx={6} fill="#5d6b7a" stroke={OUTLINE} strokeWidth={4} />
        <circle r={125} fill="#fff" stroke={OUTLINE} strokeWidth={7} />
        <path d={`M 0 0 L 0 -105 A 105 105 0 0 1 ${105 * Math.sin((angle * Math.PI) / 180)} ${-105 * Math.cos((angle * Math.PI) / 180)} Z`} fill={YELLOW} opacity={0.8} />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={0} y1={-108} x2={0} y2={-92} stroke={OUTLINE} strokeWidth={4} transform={`rotate(${i * 30})`} />
        ))}
        <line x1={0} y1={0} x2={0} y2={-95} stroke={RED} strokeWidth={8} strokeLinecap="round" transform={`rotate(${angle})`} />
        <circle r={12} fill={OUTLINE} />
      </g>
      <g>
        <rect x={110} y={420} width={220} height={66} rx={14} fill={INK} />
        <text x={220} y={466} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={40} fill="#fff">
          {`${value} SN`}
        </text>
      </g>
      {/* Gıdık ölçer */}
      <g transform="translate(520 0)">
        <text x={0} y={70} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
          GIDIK
        </text>
        <rect x={-34} y={90} width={68} height={360} rx={34} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={-24} y={100 + 340 * (1 - (0.15 + 0.85 * p))} width={48} height={340 * (0.15 + 0.85 * p)} rx={24} fill={RED} />
        <circle cx={0} cy={470} r={44} fill={RED} stroke={OUTLINE} strokeWidth={6} />
      </g>
      <Bust x={760} y={600} scale={0.62} mood={mood} rotate={shake} shirt={BLUE} />
      <Arrow from={[620, 420]} to={[620, 140]} progress={p} color={INK} />
    </g>
  );
};

// 8) Çiftler sırayla birbirinin parmağına bastırıyor
const FingerPress: Visual = () => {
  const frame = useCurrentFrame();
  const turn = Math.floor(frame / 24) % 2;
  const press = Math.max(0, Math.sin(((frame % 24) / 24) * Math.PI));
  const lp = turn === 0 ? press * 26 : 0;
  const rp = turn === 1 ? press * 26 : 0;
  return (
    <g>
      <Paper />
      <rect x={30} y={430} width={840} height={26} rx={8} fill="#c9a36a" stroke={OUTLINE} strokeWidth={5} />
      <Bust
        x={170}
        y={620}
        scale={0.78}
        mood="flat"
        shirt={BLUE}
        hands={[
          [150, -235],
          [330, -330 + lp / 0.78],
        ]}
      />
      <Bust
        x={730}
        y={620}
        scale={0.78}
        mood="flat"
        shirt={RED}
        hair="#2b2b2b"
        hands={[
          [-330, -330 + rp / 0.78],
          [-150, -235],
        ]}
      />
      {/* Ortadaki ölçer */}
      <g transform="translate(450 420)">
        <rect x={-70} y={-24} width={140} height={34} rx={8} fill="#5d6b7a" stroke={OUTLINE} strokeWidth={4} />
        <rect x={-40} y={-16} width={80} height={18} rx={4} fill="#9ff0c8" stroke={OUTLINE} strokeWidth={3} />
      </g>
      <Arrow from={[428, 160]} to={[428, 270]} progress={turn === 0 ? press : 0} color={BLUE} />
      <Arrow from={[472, 160]} to={[472, 270]} progress={turn === 1 ? press : 0} color={RED} />
      <Chip x={450} y={90} text="AYNI GÜÇLE!" delay={6} />
    </g>
  );
};

// 9) Baskı her turda artıyor
const Escalation: Visual = ({ durationInFrames }) => {
  const step = Math.max(6, (durationInFrames - 30) / 8);
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      <line x1={110} y1={480} x2={820} y2={480} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <line x1={110} y1={480} x2={110} y2={70} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <text x={130} y={60} fontFamily={uiFont} fontWeight={800} fontSize={28} fill={INK}>
        BASKI
      </text>
      {Array.from({ length: 8 }).map((_, k) => {
        const h = 40 * Math.pow(1.38, k);
        const g = Math.min(1, Math.max(0, (frame - k * step) / 10));
        return (
          <g key={k}>
            <rect x={150 + k * 82} y={480 - h * g} width={58} height={h * g} rx={6} fill={k % 2 ? RED : BLUE} stroke={OUTLINE} strokeWidth={4} opacity={g > 0 ? 1 : 0} />
            <text x={179 + k * 82} y={520} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
              {k + 1}
            </text>
          </g>
        );
      })}
      <Chip x={330} y={150} text="+%38 HER TUR" delay={14} />
      <text x={820} y={550} textAnchor="end" fontFamily={uiFont} fontWeight={800} fontSize={24} fill={INK}>
        TUR
      </text>
    </g>
  );
};

// Konuşma balonu
const Speech: React.FC<{ x: number; y: number; lines: string[]; tail: "left" | "right"; delay?: number; color?: string }> = ({
  x,
  y,
  lines,
  tail,
  delay = 0,
  color = "#fff",
}) => {
  const appear = useAppear(delay);
  const w = 330;
  const h = 56 + lines.length * 44;
  const tx = tail === "left" ? -70 : 70;
  return (
    <g transform={place(x, y, appear)}>
      <path d={`M ${tx - 24} ${h / 2 - 4} L ${tx * 1.3} ${h / 2 + 50} L ${tx + 24} ${h / 2 - 4} Z`} fill={color} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <rect x={tx - 20} y={h / 2 - 8} width={40} height={10} fill={color} />
      {lines.map((l, i) => (
        <text key={l} x={0} y={-h / 2 + 62 + i * 44} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={36} fill={INK}>
          {l}
        </text>
      ))}
    </g>
  );
};

// 10) "O daha sert vurdu!" tartışması
const KidsArgue: Visual = () => {
  const frame = useCurrentFrame();
  const j1 = Math.sin(frame / 3) * 2;
  const j2 = Math.sin(frame / 3 + 1.5) * 2;
  return (
    <g>
      <Paper />
      <Bust x={220} y={620} scale={0.82} mood="angry" shirt={BLUE} rotate={j1} hands={[[-120, -20], [150, -180]]} />
      <Bust x={680} y={620} scale={0.82} mood="angry" shirt={RED} hair="#2b2b2b" rotate={j2} hands={[[-150, -180], [120, -20]]} />
      <Speech x={240} y={120} lines={["O DAHA SERT", "VURDU!"]} tail="left" delay={4} />
      <Speech x={660} y={120} lines={["HAYIR,", "ASIL O!"]} tail="right" delay={16} color={YELLOW} />
      <BigText x={450} y={330} text="!" size={130} color={RED} delay={24} />
    </g>
  );
};

// 11) Kapanış sorusu
const YourTurn: Visual = () => {
  const frame = useCurrentFrame();
  const card = useAppear(8);
  const pulse = 1 + 0.05 * Math.sin(frame / 5);
  const wiggle = useWave(9, 8);
  return (
    <g>
      <Paper />
      <Bust
        x={190}
        y={620}
        scale={0.85}
        mood="laugh"
        hands={[
          [-120, -20],
          [150 + wiggle, -380],
        ]}
        holdRight={<g transform="rotate(20)"><Feather /></g>}
      />
      <g transform={place(610, 220, card)}>
        <rect x={-230} y={-170} width={460} height={340} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -200 120 L -270 190 L -150 160 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-214} y={120} width={70} height={44} fill="#fff" />
        <Chip x={0} y={-100} text="AYAK?" delay={14} />
        <Chip x={0} y={0} text="BOYUN?" delay={20} />
        <Chip x={0} y={100} text="KOLTUK ALTI?" delay={26} />
      </g>
      <g transform={place(610, 500, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={30} />
      </g>
      <BigText x={850} y={110} text="?" size={110} color={RED} delay={34} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  TickleSelf,
  FriendTickle,
  Cerebellum,
  Prediction,
  VolumeDown,
  RobotTickle,
  DelayMeter,
  FingerPress,
  Escalation,
  KidsArgue,
  YourTurn,
};
