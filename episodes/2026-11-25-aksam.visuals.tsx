// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Beklerken zaman neden geçmiyor? (2026-11-25-aksam)
import { interpolate, useCurrentFrame } from "remotion";
import { Arrow, BigText, Brain, Chip, NamePlate, Person, place, QuestionMark, Sparkles, uiFont, useAppear, useProgress, useWave } from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#f3efff";
const PURPLE = "#8a6cf0";
const LILAC = "#c9b8ff";
const PINK = "#ff6b8b";
const TEAL = "#17c3a5";
const ORANGE = "#ff8a2b";
const GREEN = "#4cc35a";
const RED2 = "#e5484d";
const YEL = "#ffd23f";
const SKY = "#bfe6ff";
const GREY = "#b9b2aa";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Duvar saati; minute/hour açı (derece)
const Clock: React.FC<{ x: number; y: number; r?: number; minute: number; hour?: number; delay?: number; face?: string }> = ({
  x,
  y,
  r = 90,
  minute,
  hour = 300,
  delay = 0,
  face = "#fff",
}) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={r + 10} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} />
      <circle r={r} fill={face} stroke={OUTLINE} strokeWidth={4} />
      {Array.from({ length: 12 }).map((_, i) => {
        const ang = (i * 30 * Math.PI) / 180;
        const big = i % 3 === 0;
        return (
          <line
            key={i}
            x1={Math.sin(ang) * (r - (big ? 20 : 12))}
            y1={-Math.cos(ang) * (r - (big ? 20 : 12))}
            x2={Math.sin(ang) * (r - 4)}
            y2={-Math.cos(ang) * (r - 4)}
            stroke={OUTLINE}
            strokeWidth={big ? 6 : 3}
            strokeLinecap="round"
          />
        );
      })}
      <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke={OUTLINE} strokeWidth={9} strokeLinecap="round" transform={`rotate(${hour})`} />
      <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke={RED2} strokeWidth={6} strokeLinecap="round" transform={`rotate(${minute})`} />
      <circle r={8} fill={OUTLINE} />
    </g>
  );
};

// Otobüs durağı tabelası
const StopSign: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={place(x, y)}>
    <rect x={-6} y={-230} width={12} height={230} fill="#7a7a7a" stroke={OUTLINE} strokeWidth={4} />
    <circle cx={0} cy={-250} r={44} fill={YEL} stroke={OUTLINE} strokeWidth={5} />
    <text x={0} y={-238} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={OUTLINE}>
      D
    </text>
  </g>
);

// Saat kulesi gibi kol saati yerine elde telefon: kişinin üstünde küçük saat balonu
const SpeechBubble: React.FC<{ x: number; y: number; text: string; delay: number; color?: string; wobble?: number; size?: number }> = ({
  x,
  y,
  text,
  delay,
  color = OUTLINE,
  wobble = 0,
  size = 32,
}) => {
  const a = useAppear(delay);
  const bw = text.length * size * 0.62 + 60;
  return (
    <g transform={place(x, y + wobble, a)}>
      <rect x={-bw / 2} y={-40} width={bw} height={80} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <text x={0} y={size * 0.37} fontFamily={uiFont} fontWeight={800} fontSize={size} textAnchor="middle" fill={color}>
        {text}
      </text>
    </g>
  );
};

// 1) Durakta bekleyen kişi; saat sadece iki dakika ilerliyor
const BusStop: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const p = useProgress(10, durationInFrames - 10);
  const tap = Math.abs(Math.sin(frame / 5)) * 6;
  return (
    <g>
      <rect width={900} height={560} fill={SKY} />
      <circle cx={790} cy={80} r={46} fill={YEL} stroke={OUTLINE} strokeWidth={5} />
      {/* bina silüetleri */}
      <rect x={0} y={250} width={150} height={240} fill={LILAC} stroke={OUTLINE} strokeWidth={4} />
      <rect x={580} y={210} width={130} height={280} fill="#d9ccff" stroke={OUTLINE} strokeWidth={4} />
      <rect x={720} y={280} width={180} height={210} fill={LILAC} stroke={OUTLINE} strokeWidth={4} />
      {/* kaldırım + yol */}
      <rect x={0} y={480} width={900} height={80} fill="#8d8d99" stroke={OUTLINE} strokeWidth={4} />
      <rect x={0} y={470} width={900} height={14} fill="#d8d3cc" stroke={OUTLINE} strokeWidth={4} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={40 + i * 190} y={515} width={90} height={10} fill="#fff" />
      ))}
      <StopSign x={200} y={472} />
      {/* bank */}
      <rect x={250} y={410} width={180} height={16} rx={6} fill="#a8703e" stroke={OUTLINE} strokeWidth={4} />
      <rect x={262} y={424} width={10} height={48} fill={OUTLINE} />
      <rect x={408} y={424} width={10} height={48} fill={OUTLINE} />
      <g transform={`translate(0 ${-tap * 0.3})`}>
        <Person x={470} y={472} shirt={PURPLE} facing="left" />
      </g>
      <Clock x={410} y={150} r={70} minute={interpolate(p, [0, 1], [0, 12])} delay={4} />
      <SpeechBubble x={590} y={120} text="+2 DAKİKA?!" delay={Math.round(durationInFrames * 0.45)} color={RED2} />
    </g>
  );
};

// 2) Ağır çekimde akan saat; kum saati
const SlowClock: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const sway = useWave(50, 4);
  const sand = useProgress(0, durationInFrames);
  return (
    <g>
      <Paper />
      <Clock x={280} y={280} r={150} minute={frame * 0.5} hour={290} face="#fff" />
      {/* kum saati */}
      <g transform={place(660, 290, 1, sway)}>
        <rect x={-90} y={-170} width={180} height={22} rx={8} fill="#a8703e" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-90} y={148} width={180} height={22} rx={8} fill="#a8703e" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -70 -148 L 70 -148 L 12 0 L 70 148 L -70 148 L -12 0 Z" fill="#eef9ff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {/* üst kum */}
        <path d={`M ${-60 + sand * 40} ${-130 + sand * 90} L ${60 - sand * 40} ${-130 + sand * 90} L 8 -4 L -8 -4 Z`} fill={YEL} />
        {/* alt kum */}
        <path d={`M -64 146 L 64 146 L ${40 - sand * 10} ${130 - sand * 40} L ${-40 + sand * 10} ${130 - sand * 40} Z`} fill={YEL} />
        <line x1={0} y1={0} x2={0} y2={140} stroke={YEL} strokeWidth={4} strokeDasharray="6 10" strokeDashoffset={-frame * 0.5} />
      </g>
      <Chip x={280} y={505} text="AĞIR ÇEKİM" delay={14} />
    </g>
  );
};

// 3) Beyinde saat yok: beyin + üstü çizili saat
const NoClock: Visual = ({ durationInFrames }) => {
  const cross = useProgress(Math.round(durationInFrames * 0.2), Math.round(durationInFrames * 0.35));
  const eye = useAppear(Math.round(durationInFrames * 0.5));
  const look = useWave(40, 10);
  return (
    <g>
      <Paper />
      <Brain x={260} y={300} scale={1.5} mood="confused" />
      <g>
        <Clock x={640} y={190} r={80} minute={60} hour={0} delay={4} />
        <line x1={540} y1={90} x2={540 + 200 * cross} y2={90 + 200 * cross} stroke={RED2} strokeWidth={14} strokeLinecap="round" />
        <line x1={740} y1={90} x2={740 - 200 * cross} y2={90 + 200 * cross} stroke={RED2} strokeWidth={14} strokeLinecap="round" />
      </g>
      {/* dikkat = göz */}
      <g transform={place(640, 430, eye)}>
        <ellipse rx={100} ry={52} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <circle cx={look} cy={0} r={30} fill={PURPLE} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={look} cy={0} r={13} fill={OUTLINE} />
        <circle cx={look + 8} cy={-8} r={5} fill="#fff" />
      </g>
      <Chip x={640} y={520} text="DİKKAT" dark delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

// 4) Dikkat kapısı: kapı açıldıkça tık'lar sayaca akıyor
const AttentionGate: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const open = useProgress(Math.round(durationInFrames * 0.15), Math.round(durationInFrames * 0.45));
  const count = Math.floor(interpolate(frame, [durationInFrames * 0.3, durationInFrames], [0, 24], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const pulses = Array.from({ length: 6 });
  return (
    <g>
      <Paper />
      {/* kaynak: tık üreten metronom kutusu */}
      <rect x={40} y={190} width={170} height={180} rx={20} fill={LILAC} stroke={OUTLINE} strokeWidth={5} />
      <text x={125} y={295} fontFamily={uiFont} fontWeight={800} fontSize={40} textAnchor="middle" fill={OUTLINE}>
        TIK
      </text>
      {/* kapı */}
      <rect x={380} y={120} width={30} height={330} fill="#8a5a32" stroke={OUTLINE} strokeWidth={5} />
      <g transform={`translate(410 120) scale(${1 - open * 0.8} 1)`}>
        <rect x={0} y={0} width={110} height={330} fill={ORANGE} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={90} cy={170} r={9} fill={YEL} stroke={OUTLINE} strokeWidth={3} />
      </g>
      {/* akan tıklar */}
      {pulses.map((_, i) => {
        const t = ((frame + i * 14) % 84) / 84;
        const reach = open > 0.3 ? 1 : 0.42;
        const x = 210 + t * 520;
        const visible = t < reach;
        return visible ? (
          <circle key={i} cx={x} cy={280 + Math.sin(t * 12) * 10} r={16} fill={YEL} stroke={OUTLINE} strokeWidth={4} />
        ) : null;
      })}
      {/* sayaç */}
      <rect x={690} y={190} width={170} height={180} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <text x={775} y={305} fontFamily={uiFont} fontWeight={800} fontSize={76} textAnchor="middle" fill={PURPLE}>
        {count}
      </text>
      <NamePlate x={460} y={500} text="ZAMANA ODAKLAN → KAPI AÇILIR" delay={8} />
    </g>
  );
};

// Ocak + çaydanlık
const Kettle: React.FC<{ x: number; y: number; steam: number }> = ({ x, y, steam }) => {
  const frame = useCurrentFrame();
  return (
    <g transform={place(x, y)}>
      <path d="M -90 0 Q -100 -110 0 -120 Q 100 -110 90 0 Z" fill={TEAL} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <path d="M 80 -60 Q 140 -80 150 -130" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
      <path d="M 80 -60 Q 140 -80 150 -130" fill="none" stroke={TEAL} strokeWidth={12} strokeLinecap="round" />
      <path d="M -50 -118 Q 0 -190 50 -118" fill="none" stroke={OUTLINE} strokeWidth={10} />
      <ellipse cx={0} cy={-122} rx={28} ry={10} fill="#0e9b83" stroke={OUTLINE} strokeWidth={4} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${150 + i * 6} ${-140 - i * 30 - (frame % 20)} q 14 -12 0 -24 q -14 -12 0 -24`}
          fill="none"
          stroke="#fff"
          strokeWidth={6}
          strokeLinecap="round"
          opacity={steam * (0.8 - i * 0.2)}
        />
      ))}
    </g>
  );
};

// 5) İzlenen çaydanlık kaynamıyor
const WatchedKettle: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const flame = 1 + Math.sin(frame / 3) * 0.12;
  const stare = useWave(30, 4);
  return (
    <g>
      <rect width={900} height={560} fill="#efe7ff" />
      {/* tezgâh */}
      <rect x={0} y={420} width={900} height={140} fill="#a8703e" stroke={OUTLINE} strokeWidth={5} />
      <rect x={60} y={380} width={380} height={44} rx={8} fill="#5b5b66" stroke={OUTLINE} strokeWidth={5} />
      {[0, 1, 2].map((i) => (
        <path key={i} transform={`translate(${200 + i * 50} 380) scale(1 ${flame})`} d="M -12 0 Q 0 -30 12 0 Z" fill={i === 1 ? ORANGE : "#3b8cff"} stroke={OUTLINE} strokeWidth={3} />
      ))}
      <Kettle x={250} y={370} steam={0} />
      {/* izleyen kişi */}
      <Person x={660} y={420} shirt={PINK} facing="left" />
      <g transform={`translate(${stare} 0)`}>
        <Arrow from={[600, 230]} to={[340, 260]} progress={useProgress(6, 22)} color={PURPLE} />
      </g>
      <Clock x={720} y={110} r={60} minute={frame * 0.3} delay={4} />
      <SpeechBubble x={470} y={90} text="HÂLÂ MI?!" delay={Math.round(durationInFrames * 0.4)} color={RED2} />
    </g>
  );
};

// 6) 117 deney: kartlar dizilir, iki çubuk karşılaştırma
const Experiments: Visual = ({ durationInFrames }) => {
  const step = Math.max(1, Math.round((durationInFrames * 0.35) / 12));
  const bars = useProgress(Math.round(durationInFrames * 0.45), Math.round(durationInFrames * 0.7));
  return (
    <g>
      <Paper />
      {Array.from({ length: 12 }).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return <Card key={i} x={70 + col * 72} y={110 + row * 100} delay={4 + i * step} />;
      })}
      <BigText x={210} y={460} text="117" size={110} color={YEL} delay={6} />
      {/* çubuklar */}
      <line x1={480} y1={430} x2={860} y2={430} stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
      <rect x={520} y={430 - 300 * bars} width={120} height={300 * bars} fill={RED2} stroke={OUTLINE} strokeWidth={5} />
      <rect x={700} y={430 - 140 * bars} width={120} height={140 * bars} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
      <Chip x={580} y={480} text="BOŞ" delay={Math.round(durationInFrames * 0.45)} />
      <Chip x={760} y={480} text="MEŞGUL" delay={Math.round(durationInFrames * 0.5)} />
      <NamePlate x={670} y={70} text="HİSSEDİLEN SÜRE" delay={Math.round(durationInFrames * 0.4)} />
    </g>
  );
};

const Card: React.FC<{ x: number; y: number; delay: number }> = ({ x, y, delay }) => {
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a, -4)}>
      <rect x={-28} y={-38} width={56} height={76} rx={6} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
      <rect x={-16} y={-22} width={32} height={5} fill={PURPLE} />
      <rect x={-16} y={-8} width={26} height={5} fill={GREY} />
      <rect x={-16} y={6} width={30} height={5} fill={GREY} />
      <path d="M -12 22 L -4 30 L 14 14" fill="none" stroke={GREEN} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

// Kanatlı saat
const WingClock: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const frame = useCurrentFrame();
  const flap = Math.sin(frame / 3) * 20;
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <path transform={`rotate(${-flap})`} d="M -60 0 Q -150 -80 -130 10 Q -110 -10 -60 20 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <path transform={`rotate(${flap})`} d="M 60 0 Q 150 -80 130 10 Q 110 -10 60 20 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <Clock x={0} y={0} r={56} minute={frame * 8} hour={frame * 0.7} />
    </g>
  );
};

// 7) Eğlenirken zaman uçuyor
const TimeFlies: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const fly = interpolate(frame, [0, durationInFrames], [0, 1]);
  const bounce = Math.abs(Math.sin(frame / 6)) * 10;
  return (
    <g>
      <Paper />
      <Sparkles points={[[120, 80], [800, 90], [460, 60], [80, 300], [840, 330]]} color={YEL} />
      <g transform={`translate(0 ${-bounce})`}>
        <Person x={270} y={480} shirt={ORANGE} facing="right" presenting />
      </g>
      <g transform={`translate(0 ${-Math.abs(Math.sin(frame / 6 + 1)) * 10})`}>
        <Person x={450} y={480} shirt={TEAL} facing="left" hair="#1d1d1d" presenting />
      </g>
      <g transform={`translate(0 ${-Math.abs(Math.sin(frame / 6 + 2)) * 10})`}>
        <Person x={620} y={480} shirt={PINK} facing="left" hair="#b5542a" glasses />
      </g>
      <rect x={0} y={480} width={900} height={80} fill={LILAC} stroke={OUTLINE} strokeWidth={4} />
      <WingClock x={180 + fly * 560} y={150 - fly * 60} delay={6} />
      <SpeechBubble x={360} y={250} text="HAHA!" delay={10} color={PURPLE} size={30} />
    </g>
  );
};

// 8) Hafızada tersi: iki kutu, terazi gibi yer değiştiriyor
const MemoryFlip: Visual = ({ durationInFrames }) => {
  const flip = useProgress(Math.round(durationInFrames * 0.35), Math.round(durationInFrames * 0.6));
  const tilt = interpolate(flip, [0, 1], [-12, 12]);
  const leftLen = interpolate(flip, [0, 1], [300, 120]);
  const rightLen = interpolate(flip, [0, 1], [120, 300]);
  return (
    <g>
      <Paper />
      <Brain x={450} y={110} scale={0.8} />
      {/* terazi */}
      <rect x={440} y={180} width={20} height={280} fill={OUTLINE} />
      <rect x={380} y={450} width={140} height={24} rx={8} fill={OUTLINE} />
      <g transform={place(450, 200, 1, tilt)}>
        <line x1={-300} y1={0} x2={300} y2={0} stroke={OUTLINE} strokeWidth={10} strokeLinecap="round" />
        <g transform={`rotate(${-tilt} -300 0)`}>
          <line x1={-300} y1={0} x2={-300} y2={60} stroke={OUTLINE} strokeWidth={4} />
          <rect x={-300 - leftLen / 2} y={60} width={leftLen} height={70} rx={14} fill={GREY} stroke={OUTLINE} strokeWidth={5} />
          <text x={-300} y={108} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>
            BEKLEME
          </text>
        </g>
        <g transform={`rotate(${-tilt} 300 0)`}>
          <line x1={300} y1={0} x2={300} y2={60} stroke={OUTLINE} strokeWidth={4} />
          <rect x={300 - rightLen / 2} y={60} width={rightLen} height={70} rx={14} fill={ORANGE} stroke={OUTLINE} strokeWidth={5} />
          <text x={300} y={108} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>
            DOLU GÜN
          </text>
        </g>
      </g>
      <Chip x={190} y={500} text={flip < 0.5 ? "YAŞARKEN" : "HATIRLARKEN"} dark />
      <QuestionMark x={760} y={480} size={70} delay={Math.round(durationInFrames * 0.6)} color={PURPLE} />
    </g>
  );
};

// 9) İpucu: saate bakma, kitap oku
const TipBook: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const page = Math.sin(frame / 8) * 0.5 + 0.5;
  const crossA = useAppear(Math.round(durationInFrames * 0.15));
  const bookA = useAppear(Math.round(durationInFrames * 0.35));
  return (
    <g>
      <Paper />
      {/* sol: saat + çarpı */}
      <Clock x={220} y={240} r={110} minute={frame * 2} delay={2} />
      <g transform={place(220, 240, crossA)}>
        <circle r={140} fill="none" stroke={RED2} strokeWidth={16} />
        <line x1={-100} y1={-100} x2={100} y2={100} stroke={RED2} strokeWidth={16} strokeLinecap="round" />
      </g>
      {/* sağ: kitap */}
      <g transform={place(650, 260, bookA)}>
        <path d="M 0 -80 Q -90 -110 -180 -80 L -180 100 Q -90 70 0 100 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 0 -80 Q 90 -110 180 -80 L 180 100 Q 90 70 0 100 Z" fill="#fff" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d={`M 0 -80 Q ${90 - page * 180} -120 ${180 - page * 360} -80 L ${180 - page * 360} 100 Q ${90 - page * 180} 70 0 100 Z`} fill={LILAC} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-150} y={-50 + i * 30} width={110} height={6} fill={GREY} />
        ))}
        <rect x={-10} y={100} width={20} height={10} fill={OUTLINE} />
      </g>
      <Arrow from={[390, 240]} to={[460, 240]} progress={useProgress(Math.round(durationInFrames * 0.3), Math.round(durationInFrames * 0.45))} color={PURPLE} />
      <Chip x={650} y={480} text="DİKKATİNİ DAĞIT" delay={Math.round(durationInFrames * 0.5)} />
    </g>
  );
};

// 10) Özet: saat normal hızda, beyin dürbünle izliyor
const Summary: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const peek = useWave(45, 6);
  return (
    <g>
      <Paper />
      <Clock x={640} y={260} r={130} minute={frame * 3} hour={frame * 0.25} delay={2} />
      <Brain x={230} y={320} scale={1.3} />
      {/* dürbün */}
      <g transform={place(330, 250 + peek, useAppear(10), -8)}>
        <rect x={0} y={-30} width={120} height={40} rx={10} fill={OUTLINE} />
        <rect x={0} y={16} width={120} height={40} rx={10} fill={OUTLINE} />
        <circle cx={124} cy={-10} r={22} fill={SKY} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={124} cy={36} r={22} fill={SKY} stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Chip x={450} y={505} text="ZAMAN AYNI HIZDA" delay={Math.round(durationInFrames * 0.35)} />
    </g>
  );
};

// 11) Kapanış: nerede beklerken sıkılıyorsun?
const YourTurn: Visual = ({ durationInFrames }) => {
  const w = useWave(40, 6);
  const step = Math.round(durationInFrames * 0.13);
  return (
    <g>
      <Paper />
      <Brain x={190} y={320} scale={1.2} />
      <Clock x={190} y={120} r={55} minute={useCurrentFrame() * 1.5} delay={4} />
      <SpeechBubble x={610} y={100} text="DOKTOR SIRASI" delay={8} />
      <SpeechBubble x={610} y={210} text="KARGO BEKLERKEN" delay={8 + step} color={PURPLE} wobble={w} />
      <SpeechBubble x={610} y={320} text="TRAFİKTE" delay={8 + step * 2} />
      <SpeechBubble x={610} y={430} text="MİKRODALGA ÖNÜNDE" delay={8 + step * 3} color={PINK} />
      <Chip x={190} y={500} text="@ETİKETLE" delay={Math.round(durationInFrames * 0.6)} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  BusStop,
  SlowClock,
  NoClock,
  AttentionGate,
  WatchedKettle,
  Experiments,
  TimeFlies,
  MemoryFlip,
  TipBook,
  Summary,
  YourTurn,
};
