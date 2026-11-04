// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Telefon titredi ama mesaj yok — hayalet titreşim (2026-11-04-aksam)
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
  Table,
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
const TEAL = "#3fb4a0";
const ORANGE = "#ff8a3d";
const BLUE = "#5b8def";
const JEANS = "#4a6fb5";
const GREEN = "#4cc38a";

const Paper: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {[
      [90, 90, 36],
      [820, 70, 24],
      [800, 300, 16],
      [60, 330, 18],
    ].map(([cx, cy, r]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#ffe1c9" />
    ))}
  </g>
);

const Floor: React.FC<{ y?: number }> = ({ y = 480 }) => <rect x={0} y={y} width={900} height={560 - y} fill="#ffd2b0" />;

// Titreşim çizgileri: (0,0) merkezli, w genişliğinde iki yanda zikzak
const Buzz: React.FC<{ w?: number; h?: number; on?: boolean; color?: string }> = ({ w = 90, h = 110, on = true, color = RED }) => {
  const frame = useCurrentFrame();
  if (!on) return null;
  const o = frame % 6 < 3 ? 1 : 0.45;
  const zig = (sx: number) =>
    `M ${sx} ${-h / 2} l ${sx > 0 ? 14 : -14} 18 l ${sx > 0 ? -14 : 14} 18 l ${sx > 0 ? 14 : -14} 18 l ${sx > 0 ? -14 : 14} 18`;
  return (
    <g opacity={o}>
      <path d={zig(w)} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      <path d={zig(-w)} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      <path d={zig(w + 28)} transform="translate(0 20)" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
      <path d={zig(-w - 28)} transform="translate(0 20)" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
    </g>
  );
};

// Telefon; (0,0) merkez, 130×230 birim. shake: titreşim sarsıntısı
const Phone: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  shake?: boolean;
  screen?: string;
  children?: React.ReactNode;
  delay?: number;
}> = ({ x, y, scale = 1, rotate = 0, shake = false, screen = "#cfe9ff", children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const dx = shake ? (frame % 4 < 2 ? -5 : 5) : 0;
  return (
    <g transform={place(x + dx, y, scale * appear, rotate + (shake ? dx * 0.6 : 0))}>
      <rect x={-65} y={-115} width={130} height={230} rx={22} fill={OUTLINE} />
      <rect x={-54} y={-96} width={108} height={186} rx={10} fill={screen} />
      <rect x={-18} y={-108} width={36} height={6} rx={3} fill="#555" />
      <circle cx={0} cy={102} r={6} fill="#555" />
      {children}
    </g>
  );
};

// Boş bildirim ekranı içeriği
const NoNotif: React.FC = () => (
  <g>
    <text x={0} y={-40} fontFamily={uiFont} fontWeight={800} fontSize={44} textAnchor="middle" fill={INK}>
      19:13
    </text>
    <text x={0} y={20} fontFamily={uiFont} fontWeight={800} fontSize={20} textAnchor="middle" fill="#666">
      BİLDİRİM
    </text>
    <text x={0} y={46} fontFamily={uiFont} fontWeight={800} fontSize={20} textAnchor="middle" fill="#666">
      YOK
    </text>
  </g>
);


type Mood = "flat" | "smile" | "laugh" | "angry" | "wow";

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
          {mood === "wow" ? (
            <g>
              <path d="M -48 -276 Q -30 -290 -12 -278 M 12 -278 Q 30 -290 48 -276" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
              <ellipse cx={0} cy={-194} rx={16} ry={22} fill="#8a2430" stroke={OUTLINE} strokeWidth={5} />
            </g>
          ) : null}
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

// 1) Cepte titreşim → telefon çıkarılıyor → bildirim yok
const PocketBuzz: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const pull = useProgress(durationInFrames * 0.35, durationInFrames * 0.55);
  const buzzing = frame < durationInFrames * 0.35;
  const empty = useAppear(durationInFrames * 0.58);
  return (
    <g>
      <Paper />
      <Floor />
      {/* Kot pantolon bacağı ve cep */}
      <g>
        <rect x={470} y={250} width={360} height={320} rx={30} fill={JEANS} stroke={OUTLINE} strokeWidth={6} />
        <path d="M 470 300 L 830 300" stroke="#3a5a99" strokeWidth={6} strokeDasharray="14 10" />
        <Phone x={650} y={330 - pull * 190} scale={0.95} shake={buzzing}>
          {pull > 0.95 ? (
            <g transform={place(0, 0, empty)}>
              <NoNotif />
            </g>
          ) : null}
        </Phone>
        <path d="M 520 330 Q 650 420 780 330 L 780 560 L 520 560 Z" fill={JEANS} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 540 345 Q 650 425 760 345" fill="none" stroke="#3a5a99" strokeWidth={5} strokeDasharray="12 9" />
        <g transform="translate(650 300)">
          <Buzz w={150} h={110} on={buzzing} />
        </g>
      </g>
      <Bust x={230} y={565} scale={0.95} mood={pull > 0.95 ? "wow" : "smile"} shirt={ORANGE} />
      {buzzing ? <BigText x={650} y={120} text="BZZ!" size={80} color={YELLOW} delay={4} /> : null}
      {pull > 0.95 ? <QuestionMark x={390} y={120} size={1} delay={durationInFrames * 0.6} /> : null}
    </g>
  );
};

// 2) Telefon masada ama bacakta titreşim hissi
const EmptyScreen: Visual = ({ durationInFrames }) => {
  const look = useProgress(durationInFrames * 0.45, durationInFrames * 0.6);
  return (
    <g>
      <Paper />
      <Floor />
      <Table x={690} floorY={480} width={300}>
        <g transform="translate(0 -14)">
          <rect x={-90} y={-14} width={180} height={28} rx={10} fill={OUTLINE} />
          <rect x={-80} y={-8} width={160} height={16} rx={5} fill="#cfe9ff" />
        </g>
      </Table>
      <Chip x={690} y={250} text="MASADA!" delay={8} />
      <Bust x={280} y={565} scale={0.95} mood={look > 0.5 ? "wow" : "flat"} shirt={ORANGE} />
      {/* Bacak hizasında hayalet titreşim */}
      <g transform="translate(280 500)">
        <Buzz w={150} h={70} color={RED} />
      </g>
      <Arrow from={[470, 330]} to={[580, 375]} progress={look} color={RED} />
      <QuestionMark x={480} y={130} size={1} delay={durationInFrames * 0.55} />
    </g>
  );
};

// 3) Hayalet telefon
const PhantomPhone: Visual = () => {
  const float = useWave(40, 14);
  const appear = useAppear(0);
  return (
    <g>
      <Paper />
      <g transform={place(450, 250 + float, 1.1 * appear)}>
        <path
          d="M -110 -150 Q -110 -200 -60 -200 L 60 -200 Q 110 -200 110 -150 L 110 150 L 80 125 L 50 150 L 20 125 L -10 150 L -40 125 L -70 150 L -110 125 Z"
          fill="#ffffff"
          stroke={OUTLINE}
          strokeWidth={6}
          strokeLinejoin="round"
          opacity={0.95}
        />
        <rect x={-80} y={-170} width={160} height={250} rx={12} fill="#e9e2ff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={-34} cy={-70} r={18} fill={OUTLINE} />
        <circle cx={34} cy={-70} r={18} fill={OUTLINE} />
        <circle cx={-28} cy={-76} r={6} fill="#fff" />
        <circle cx={40} cy={-76} r={6} fill="#fff" />
        <ellipse cx={0} cy={0} rx={20} ry={26} fill={OUTLINE} />
        <circle cx={-62} cy={-20} r={12} fill="#f7a0a8" opacity={0.8} />
        <circle cx={62} cy={-20} r={12} fill="#f7a0a8" opacity={0.8} />
        <g transform="translate(0 -40)">
          <Buzz w={150} h={110} color="#9b6bf2" />
        </g>
      </g>
      <Chip x={450} y={510} text="HAYALET TİTREŞİM" dark delay={14} />
      <Sparkles points={[[170, 120], [740, 160], [700, 420], [200, 400]]} />
    </g>
  );
};

// 4) Hastane anketi: üç çalışandan ikisi
const HospitalSurvey: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const mark = (i: number) => durationInFrames * (0.35 + i * 0.12);
  return (
    <g>
      <Paper />
      <Floor y={470} />
      {/* Hastane binası */}
      <g transform="translate(150 470)">
        <rect x={-110} y={-300} width={220} height={300} fill="#ffffff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-30} y={-280} width={60} height={60} rx={8} fill={RED} stroke={OUTLINE} strokeWidth={4} />
        <rect x={-8} y={-270} width={16} height={40} fill="#fff" />
        <rect x={-20} y={-258} width={40} height={16} fill="#fff" />
        {[-70, 30].map((wx) =>
          [-190, -120].map((wy) => <rect key={`${wx}${wy}`} x={wx} y={wy} width={40} height={40} fill="#cfe9ff" stroke={OUTLINE} strokeWidth={4} />),
        )}
        <rect x={-28} y={-70} width={56} height={70} fill="#9a6a3c" stroke={OUTLINE} strokeWidth={4} />
      </g>
      {[0, 1, 2].map((i) => {
        const hit = i < 2;
        const x = 400 + i * 170;
        return (
          <g key={i}>
            <Person x={x} y={470} scale={1.15} shirt="#ffffff" pants="#5aa9e6" hair={["#2b2b2b", "#a0522d", "#e0b04a"][i]} glasses={i === 1} delay={i * 6} />
            {hit ? (
              <g>
                <g transform={`translate(${x} 160)`}>
                  <Phone x={0} y={0} scale={0.32} shake delay={mark(i)} />
                  {frame > mark(i) ? <Buzz w={34} h={40} /> : null}
                </g>
              </g>
            ) : (
              <Chip x={x} y={170} text="YOK" delay={mark(2)} />
            )}
          </g>
        );
      })}
      <Chip x={570} y={515} text="3 KİŞİDEN 2'Sİ" delay={mark(2) + 6} />
    </g>
  );
};

// 5) Öğrencilerde yüzde 89
const StudentChart: Visual = ({ durationInFrames }) => {
  const fill = useProgress(6, durationInFrames * 0.45);
  const pct = Math.round(89 * fill);
  return (
    <g>
      <Paper />
      {/* Kep takmış öğrenci */}
      <Person x={160} y={470} scale={1.3} shirt={BLUE} hair="#4a2f1d" delay={0} />
      {/* Çubuk */}
      <g transform="translate(330 120)">
        <rect x={0} y={0} width={500} height={90} rx={45} fill="#ffffff" stroke={OUTLINE} strokeWidth={6} />
        <rect x={8} y={8} width={Math.max(0, 484 * fill * 0.89)} height={74} rx={37} fill={ORANGE} />
        <text x={250} y={62} fontFamily={uiFont} fontWeight={800} fontSize={48} textAnchor="middle" fill={INK}>
          %{pct}
        </text>
      </g>
      {/* Takvim: iki haftada bir */}
      <g transform="translate(580 370)">
        <rect x={-190} y={-110} width={380} height={190} rx={14} fill="#ffffff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-190} y={-110} width={380} height={40} rx={14} fill={RED} stroke={OUTLINE} strokeWidth={5} />
        {Array.from({ length: 14 }).map((_, i) => {
          const cx = -160 + (i % 7) * 53;
          const cy = -40 + Math.floor(i / 7) * 60;
          const on = i === 13;
          return <Cell key={i} cx={cx} cy={cy} on={on} delay={durationInFrames * 0.5 + i * 2} />;
        })}
      </g>
      <Chip x={580} y={510} text="2 HAFTADA 1" dark delay={durationInFrames * 0.6} />
    </g>
  );
};

const Cell: React.FC<{ cx: number; cy: number; on: boolean; delay: number }> = ({ cx, cy, on, delay }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(cx + 26, cy, a)}>
      <rect x={-20} y={-20} width={40} height={40} rx={6} fill={on ? YELLOW : "#f3f3f3"} stroke={OUTLINE} strokeWidth={3} />
      {on ? <path d="M -10 0 L -2 10 L 12 -10" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /> : null}
    </g>
  );
};

// 6) Beyin tetikte: radar halkaları
const AlertBrain: Visual = () => {
  const frame = useCurrentFrame();
  return (
    <g>
      <Paper />
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 20) % 60) / 60;
        return <circle key={i} cx={450} cy={270} r={120 + t * 200} fill="none" stroke={ORANGE} strokeWidth={8} opacity={1 - t} />;
      })}
      {/* Anten */}
      <line x1={450} y1={170} x2={450} y2={100} stroke={OUTLINE} strokeWidth={6} />
      <circle cx={450} cy={96} r={14} fill={frame % 20 < 10 ? RED : YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <Brain x={450} y={270} scale={1.25} />
      <Phone x={760} y={280} scale={0.45} rotate={10} delay={10} />
      <QuestionMark x={760} y={130} size={0.8} delay={18} />
      <Chip x={450} y={500} text="SÜREKLİ TETİKTE" dark delay={14} />
    </g>
  );
};

// 7) Kumaş sürtünmesi / kas seğirmesi → beyin "titreşim!"
const FalseAlarm: Visual = ({ durationInFrames }) => {
  const rub = useWave(10, 12);
  const arrow = useProgress(durationInFrames * 0.3, durationInFrames * 0.5);
  const twitch = useCurrentFrame() % 24 < 4 ? 6 : 0;
  return (
    <g>
      <Paper />
      {/* Kumaş parçası */}
      <g transform="translate(200 300)">
        <rect x={-150} y={-170} width={300} height={340} rx={24} fill={JEANS} stroke={OUTLINE} strokeWidth={6} />
        {[-100, -40, 20, 80].map((yy, i) => (
          <path key={yy} d={`M ${-110 + rub} ${yy} q 50 ${-16 + (i % 2) * 8} 100 0 t 100 0`} fill="none" stroke="#3a5a99" strokeWidth={6} strokeLinecap="round" />
        ))}
        <g transform={`translate(${twitch} 0)`}>
          <ellipse cx={0} cy={120} rx={46} ry={22} fill="#f2a0a0" stroke={OUTLINE} strokeWidth={4} opacity={0.9} />
        </g>
      </g>
      <Chip x={200} y={90} text="KUMAŞ" delay={4} />
      <Chip x={200} y={510} text="KAS SEĞİRMESİ" delay={10} />
      <Arrow from={[380, 300]} to={[500, 300]} progress={arrow} color={RED} />
      <Brain x={660} y={360} scale={0.9} mood="confused" delay={durationInFrames * 0.35} />
      <ThoughtBubble x={720} y={150} r={95} delay={durationInFrames * 0.5}>
        <Phone x={0} y={0} scale={0.42} shake />
      </ThoughtBubble>
      <BigText x={560} y={110} text="BZZ?" size={52} color={YELLOW} delay={durationInFrames * 0.55} />
    </g>
  );
};

// 8) Terazi: mesajı kaçırmak ağır, boşuna alarm hafif
const SignalScale: Visual = ({ durationInFrames }) => {
  const tilt = useProgress(8, durationInFrames * 0.4);
  const a = -14 * tilt; // sol aşağı
  const rad = (a * Math.PI) / 180;
  const L = 280;
  const lx = 450 - L * Math.cos(rad);
  const ly = 240 - L * Math.sin(rad);
  const rx = 450 + L * Math.cos(rad);
  const ry = 240 + L * Math.sin(rad);
  return (
    <g>
      <Paper />
      <Floor y={500} />
      <path d="M 410 500 L 450 240 L 490 500 Z" fill="#9a6a3c" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={OUTLINE} strokeWidth={12} strokeLinecap="round" />
      <circle cx={450} cy={240} r={14} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      {/* Sol kefe: kaçırılan mesaj (ağır) */}
      <g transform={`translate(${lx} ${ly})`}>
        <path d="M 0 0 L -90 110 M 0 0 L 90 110" stroke={OUTLINE} strokeWidth={4} fill="none" />
        <path d="M -110 110 L 110 110 L 80 150 L -80 150 Z" fill="#ffffff" stroke={OUTLINE} strokeWidth={5} />
        <g transform="translate(0 68)">
          <rect x={-60} y={-40} width={120} height={80} rx={10} fill={RED} stroke={OUTLINE} strokeWidth={5} />
          <path d="M -60 -40 L 0 6 L 60 -40" fill="none" stroke={OUTLINE} strokeWidth={5} />
          <line x1={-70} y1={-50} x2={70} y2={50} stroke={OUTLINE} strokeWidth={8} strokeLinecap="round" />
        </g>
      </g>
      {/* Sağ kefe: boşuna alarm (hafif) */}
      <g transform={`translate(${rx} ${ry})`}>
        <path d="M 0 0 L -90 110 M 0 0 L 90 110" stroke={OUTLINE} strokeWidth={4} fill="none" />
        <path d="M -110 110 L 110 110 L 80 150 L -80 150 Z" fill="#ffffff" stroke={OUTLINE} strokeWidth={5} />
        <g transform="translate(0 80)">
          <path d="M -28 28 Q -26 -26 0 -28 Q 26 -26 28 28 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
          <circle cx={0} cy={32} r={7} fill={OUTLINE} />
        </g>
      </g>
      <Chip x={190} y={515} text="MESAJI KAÇIRMAK" dark delay={durationInFrames * 0.3} />
      <Chip x={710} y={70} text="BOŞUNA ALARM" delay={durationInFrames * 0.4} />
    </g>
  );
};

// 9) Göğüs cebi vs kemer
const PocketCompare: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const fast = frame % 10 < 5;
  const slow = frame % 40 < 5;
  const badge = useAppear(durationInFrames * 0.45);
  return (
    <g>
      <Paper />
      <Floor y={490} />
      {/* Sol: göğüs cebi */}
      <Person x={250} y={490} scale={1.6} shirt="#ffffff" pants="#5aa9e6" hair="#2b2b2b" />
      <g transform="translate(272 335)">
        <rect x={-22} y={-18} width={44} height={40} fill="#e8e8e8" stroke={OUTLINE} strokeWidth={3} />
        <rect x={-12} y={-34} width={24} height={30} rx={4} fill={OUTLINE} />
        {fast ? <Buzz w={46} h={40} /> : null}
      </g>
      <Chip x={250} y={90} text="GÖĞÜS CEBİ" delay={6} />
      {/* Sağ: kemer */}
      <Person x={640} y={490} scale={1.6} shirt={ORANGE} pants="#2f3f63" hair="#a0522d" facing="left" />
      <g transform="translate(615 395)">
        <rect x={-14} y={-24} width={28} height={44} rx={5} fill={OUTLINE} />
        {slow ? <Buzz w={40} h={40} /> : null}
      </g>
      <Chip x={640} y={90} text="KEMER" delay={12} />
      <g transform={place(450, 250, badge)}>
        <Chip x={0} y={0} text="DAHA SIK!" dark />
      </g>
    </g>
  );
};

// 10) İyi haber: titreşimi kapat, yerini değiştir
const GoodNews: Visual = ({ durationInFrames }) => {
  const sw = useProgress(durationInFrames * 0.2, durationInFrames * 0.3);
  const move = useProgress(durationInFrames * 0.5, durationInFrames * 0.7);
  return (
    <g>
      <Paper />
      <Phone x={230} y={280} scale={1.3} screen="#ffffff">
        <text x={0} y={-50} fontFamily={uiFont} fontWeight={800} fontSize={20} textAnchor="middle" fill={INK}>
          TİTREŞİM
        </text>
        <g transform="translate(0 0)">
          <rect x={-38} y={-18} width={76} height={36} rx={18} fill={sw > 0.5 ? "#c8c8c8" : GREEN} stroke={OUTLINE} strokeWidth={3} />
          <circle cx={20 - 40 * sw} cy={0} r={14} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
        </g>
        <text x={0} y={50} fontFamily={uiFont} fontWeight={800} fontSize={22} textAnchor="middle" fill={sw > 0.5 ? RED : GREEN}>
          {sw > 0.5 ? "KAPALI" : "AÇIK"}
        </text>
      </Phone>
      <Chip x={230} y={510} text="KAPAT" delay={durationInFrames * 0.22} />
      {/* Cepten çantaya */}
      <g transform="translate(540 330)">
        <rect x={-60} y={-60} width={120} height={140} rx={20} fill={JEANS} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -50 -40 Q 0 0 50 -40" fill="none" stroke="#3a5a99" strokeWidth={5} />
      </g>
      <g transform="translate(780 330)">
        <path d="M -40 -70 Q 0 -120 40 -70" fill="none" stroke={OUTLINE} strokeWidth={8} />
        <rect x={-80} y={-70} width={160} height={150} rx={18} fill="#e05a7a" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-80} y={-70} width={160} height={36} rx={14} fill="#c8486a" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Phone x={540 + 240 * move} y={290 - Math.sin(move * Math.PI) * 120} scale={0.38} rotate={move * 20} />
      <Arrow from={[600, 200]} to={[740, 200]} progress={move} color={RED} />
      <Chip x={660} y={510} text="YERİNİ DEĞİŞTİR" delay={durationInFrames * 0.55} />
      <NamePlate x={450} y={60} text="ÇOĞU KİŞİ RAHATSIZ OLMUYOR" delay={4} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = () => {
  const card = useAppear(8);
  const pulse = 1 + useWave(30, 0.04);
  return (
    <g>
      <Paper />
      <Floor />
      <Bust x={200} y={600} scale={0.95} mood="smile" shirt={ORANGE} hands={[[-120, -20], [100, -180]]} holdRight={<Phone x={0} y={-30} scale={0.35} shake />} />
      <g transform={place(610, 220, card)}>
        <rect x={-230} y={-170} width={460} height={340} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path d="M -200 120 L -270 190 L -150 160 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-214} y={120} width={70} height={44} fill="#fff" />
        <Chip x={0} y={-100} text="CEPTE?" delay={14} />
        <Chip x={0} y={0} text="ÇANTADA?" delay={20} />
        <Chip x={0} y={100} text="MASADA?" delay={26} />
      </g>
      <g transform={place(610, 500, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={30} />
      </g>
      <BigText x={850} y={110} text="?" size={110} color={RED} delay={34} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  PocketBuzz,
  EmptyScreen,
  PhantomPhone,
  HospitalSurvey,
  StudentChart,
  AlertBrain,
  FalseAlarm,
  SignalScale,
  PocketCompare,
  GoodNews,
  YourTurn,
};
