// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Ayağın neden uyuşur ve karıncalanır? Geçici parestezi (2026-11-08-sabah)
import { interpolate, useCurrentFrame } from "remotion";
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
  uiFont,
  useAppear,
  useProgress,
  useWave,
  Window,
  YELLOW,
} from "../kit";

export type Visual = React.FC<{ durationInFrames: number }>;

const OUTLINE = "#2b2b2b";
const PAPER = "#e8f8f6";
const SKIN = "#f2c79a";
const TEAL = "#3fb4a0";
const PANTS = "#2f3f63";
const SHIRT = "#f08a3c";
const GREEN = "#4caf50";
const NERVE = "#ffd23f";
const BLOOD = "#d8343f";
const DIM = "#b9c4c2";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

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

// Açık turkuaz oturma odası
const LivingRoom: React.FC = () => (
  <g>
    <rect width={900} height={560} fill={PAPER} />
    {Array.from({ length: 20 }).map((_, i) => (
      <rect key={i} x={i * 46 + 18} y={0} width={14} height={460} fill="#d6f1ec" />
    ))}
    <rect x={0} y={460} width={900} height={100} fill="#c9a77c" stroke={OUTLINE} strokeWidth={4} />
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={i} x1={i * 160 + 40} y1={460} x2={i * 160 + 40} y2={560} stroke="#a9865c" strokeWidth={4} />
    ))}
    <Window x={660} y={70} kind="day" />
  </g>
);

// Karıncalanma çizgileri (zikzak kıvılcımlar)
const Tingle: React.FC<{ x: number; y: number; r?: number; t?: number; color?: string }> = ({
  x,
  y,
  r = 60,
  t = 1,
  color = YELLOW,
}) => {
  const frame = useCurrentFrame();
  return (
    <g transform={`translate(${x} ${y})`} opacity={t}>
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2 + frame / 30;
        const flick = 0.6 + 0.4 * Math.abs(Math.sin(frame / 3 + i));
        const x1 = Math.cos(a) * r;
        const y1 = Math.sin(a) * r;
        const x2 = Math.cos(a) * (r + 34 * flick);
        const y2 = Math.sin(a) * (r + 34 * flick);
        const mx = (x1 + x2) / 2 + Math.sin(a) * 8;
        const my = (y1 + y2) / 2 - Math.cos(a) * 8;
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} L ${mx} ${my} L ${x2} ${y2}`}
            fill="none"
            stroke={color}
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </g>
  );
};

// Bağdaş kurmuş oturan karakter (önden); (0,0) kalçanın tabanı
const SittingPerson: React.FC<{ x: number; y: number; scale?: number; face?: "calm" | "shock" }> = ({
  x,
  y,
  scale = 1,
  face = "calm",
}) => {
  const breathe = useWave(50, 3);
  return (
    <g transform={place(x, y, scale)}>
      {/* bağdaş kurmuş bacaklar */}
      <ellipse cx={0} cy={6} rx={150} ry={14} fill="rgba(0,0,0,0.15)" />
      <path d="M -140 -10 Q -150 -50 -100 -56 L 30 -30 Q 50 -6 20 2 L -120 2 Q -140 0 -140 -10 Z" fill={PANTS} stroke={OUTLINE} strokeWidth={5} />
      <path d="M 140 -10 Q 150 -50 100 -56 L -30 -30 Q -50 -6 -20 2 L 120 2 Q 140 0 140 -10 Z" fill={PANTS} stroke={OUTLINE} strokeWidth={5} />
      <ellipse cx={-38} cy={-8} rx={26} ry={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={38} cy={-8} rx={26} ry={14} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <g transform={`translate(0 ${breathe})`}>
        {/* gövde */}
        <rect x={-58} y={-190} width={116} height={150} rx={30} fill={SHIRT} stroke={OUTLINE} strokeWidth={5} />
        {/* kollar dizlerde */}
        <path d="M -54 -170 Q -100 -120 -96 -60" fill="none" stroke={OUTLINE} strokeWidth={26} strokeLinecap="round" />
        <path d="M -54 -170 Q -100 -120 -96 -60" fill="none" stroke={SHIRT} strokeWidth={17} strokeLinecap="round" />
        <path d="M 54 -170 Q 100 -120 96 -60" fill="none" stroke={OUTLINE} strokeWidth={26} strokeLinecap="round" />
        <path d="M 54 -170 Q 100 -120 96 -60" fill="none" stroke={SHIRT} strokeWidth={17} strokeLinecap="round" />
        <circle cx={-96} cy={-58} r={13} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
        <circle cx={96} cy={-58} r={13} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
        {/* kafa */}
        <rect x={-12} y={-206} width={24} height={20} fill={SKIN} />
        <circle cx={0} cy={-250} r={50} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M -50 -256 Q -48 -306 0 -304 Q 48 -306 50 -258 Q 24 -280 -6 -274 Q -34 -272 -50 -256 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={4} />
        {face === "calm" ? (
          <g>
            <path d="M -26 -248 Q -18 -242 -10 -248 M 10 -248 Q 18 -242 26 -248" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
            <path d="M -12 -222 Q 0 -212 12 -222" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <circle cx={-18} cy={-250} r={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={18} cy={-250} r={10} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-18} cy={-249} r={4} fill={OUTLINE} />
            <circle cx={18} cy={-249} r={4} fill={OUTLINE} />
            <ellipse cx={0} cy={-218} rx={9} ry={11} fill="#8a2430" stroke={OUTLINE} strokeWidth={3} />
          </g>
        )}
      </g>
    </g>
  );
};

// Yan görünüşte büyük bacak (kalça solda, ayak sağda); (0,0) kalça
const BigLeg: React.FC<{ color?: string; foot?: boolean; footOpacity?: number }> = ({
  color = PANTS,
  foot = true,
  footOpacity = 1,
}) => (
  <g>
    <path d="M 0 -50 L 330 -46 Q 360 -44 360 -10 L 360 30 Q 360 50 330 50 L 0 50 Z" fill={color} stroke={OUTLINE} strokeWidth={6} />
    <circle cx={340} cy={0} r={52} fill={color} stroke={OUTLINE} strokeWidth={6} />
    <path d="M 330 -40 L 600 -30 L 600 30 L 330 46 Z" fill={color} stroke={OUTLINE} strokeWidth={6} />
    <circle cx={340} cy={0} r={46} fill={color} />
    {foot ? (
      <g opacity={footOpacity}>
        <path d="M 600 -34 L 640 -34 Q 660 -34 660 -10 L 660 60 Q 700 64 730 80 Q 740 100 720 104 L 610 104 Q 596 104 596 90 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      </g>
    ) : null}
  </g>
);

// Damla
const Drop: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = BLOOD }) => (
  <path
    transform={place(x, y, scale)}
    d="M 0 -60 Q 44 -6 44 22 Q 44 60 0 60 Q -44 60 -44 22 Q -44 -6 0 -60 Z"
    fill={color}
    stroke={OUTLINE}
    strokeWidth={5}
  />
);

const Check: React.FC<{ x: number; y: number; t: number; color?: string; size?: number }> = ({ x, y, t, color = GREEN, size = 1 }) => (
  <g transform={place(x, y, size)}>
    <circle r={46} fill={color} stroke={OUTLINE} strokeWidth={5} opacity={Math.min(1, t * 3)} />
    <path
      d="M -22 0 L -6 18 L 24 -16"
      fill="none"
      stroke="#fff"
      strokeWidth={11}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={80}
      strokeDashoffset={80 * (1 - t)}
    />
  </g>
);

const Cross: React.FC<{ x: number; y: number; t: number; size?: number }> = ({ x, y, t, size = 1 }) => (
  <g transform={place(x, y, size * t)}>
    <circle r={46} fill={RED} stroke={OUTLINE} strokeWidth={5} />
    <path d="M -18 -18 L 18 18 M 18 -18 L -18 18" stroke="#fff" strokeWidth={11} strokeLinecap="round" />
  </g>
);

// 1) Bağdaştan kalkınca ayak "yok"
const CrossLegged: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const at = Math.round(durationInFrames * 0.45);
  const standing = frame >= at;
  const wobble = useWave(16, 7);
  const stand = useAppear(at);
  const q = useAppear(at + 8);
  return (
    <g>
      <LivingRoom />
      {/* minder */}
      <ellipse cx={300} cy={470} rx={190} ry={26} fill="#5bc0b0" stroke={OUTLINE} strokeWidth={5} />
      {!standing ? (
        <g>
          <SittingPerson x={300} y={462} />
          <g opacity={interpolate(frame, [at - 50, at - 20], [0, 1], clamp)}>
            <Chip x={300} y={110} text="2 SAAT SONRA…" dark />
          </g>
        </g>
      ) : (
        <g>
          <g transform={place(300, 470, 1, wobble * stand)}>
            <Person x={0} y={0} scale={1.9} shirt={SHIRT} />
            {/* uyuşan ayak: soluk, kesik çizgili */}
            <circle cx={18} cy={-10} r={40} fill="#fff" stroke={RED} strokeWidth={5} strokeDasharray="10 8" opacity={0.85} />
          </g>
          <Tingle x={320} y={455} r={52} t={stand} />
          <g transform={place(470, 160, q)}>
            <Chip x={0} y={0} text="AYAĞIM?!" />
          </g>
          <QuestionMark x={170} y={170} size={90} delay={at + 12} />
        </g>
      )}
    </g>
  );
};

// 2) Adı: geçici parestezi
const NameCard: Visual = () => {
  const card = useAppear(4);
  const foot = useAppear(18);
  const tingle = useProgress(26, 36);
  return (
    <g>
      <Paper />
      <g transform={place(450, 170, card)}>
        <rect x={-340} y={-110} width={680} height={220} rx={30} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <text x={0} y={-30} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={TEAL}>
          BUNUN ADI
        </text>
        <text x={0} y={52} fontFamily={uiFont} fontWeight={800} fontSize={70} textAnchor="middle" fill={INK}>
          GEÇİCİ PARESTEZİ
        </text>
      </g>
      <g transform={place(250, 400, foot * 0.62)}>
        <g transform="translate(-660 -40)">
          <path d="M 600 -60 L 640 -60 Q 660 -60 660 -30 L 660 60 Q 700 64 730 80 Q 740 100 720 104 L 610 104 Q 596 104 596 90 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={8} strokeLinejoin="round" />
          <rect x={590} y={-110} width={80} height={60} rx={10} fill={PANTS} stroke={OUTLINE} strokeWidth={8} />
        </g>
      </g>
      <Tingle x={262} y={420} r={74} t={tingle} />
      <Chip x={600} y={420} text="= AYAK UYUŞMASI" delay={34} />
    </g>
  );
};

// 3) Kan mı? Hayır, sinir!
const Myth: Visual = () => {
  const left = useAppear(4);
  const x = useAppear(22);
  const right = useAppear(34);
  const check = useProgress(46, 60);
  const nerveFlow = useCurrentFrame() * 4;
  return (
    <g>
      <Paper />
      <g transform={place(240, 260, left)}>
        <rect x={-170} y={-190} width={340} height={380} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Drop x={0} y={-30} scale={1.3} />
        <text x={0} y={140} fontFamily={uiFont} fontWeight={800} fontSize={46} textAnchor="middle" fill={INK}>
          KAN?
        </text>
      </g>
      <Cross x={360} y={110} t={x} size={1.1} />
      <g transform={place(660, 260, right)}>
        <rect x={-170} y={-190} width={340} height={380} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <path
          d="M -120 -20 Q -80 -90 -40 -20 T 40 -20 T 120 -20"
          fill="none"
          stroke={OUTLINE}
          strokeWidth={22}
          strokeLinecap="round"
        />
        <path
          d="M -120 -20 Q -80 -90 -40 -20 T 40 -20 T 120 -20"
          fill="none"
          stroke={NERVE}
          strokeWidth={13}
          strokeLinecap="round"
          strokeDasharray="30 14"
          strokeDashoffset={-nerveFlow}
        />
        <text x={0} y={140} fontFamily={uiFont} fontWeight={800} fontSize={46} textAnchor="middle" fill={INK}>
          SİNİR!
        </text>
      </g>
      <Check x={780} y={110} t={check} size={1.1} />
    </g>
  );
};

// 4) Katlanan hortum gibi: mesajlar beyne ulaşamıyor
const Hose: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const kinkAt = Math.round(durationInFrames * 0.35);
  const kink = interpolate(frame, [kinkAt, kinkAt + 14], [0, 1], clamp);
  const kinkY = 230 - 120 * kink;
  const hosePath = `M 150 300 L 380 300 Q 450 ${300 - 10 * kink} 450 ${kinkY} Q 450 ${300 - 10 * kink} 520 300 L 720 300`;
  const msgs = Array.from({ length: 6 }).map((_, i) => {
    const raw = ((frame * 3 + i * 95) % 570) + 150;
    // katlanınca mesajlar katlanma noktasında birikir
    const limit = 400 - (i % 3) * 26;
    const xPos = kink > 0.5 && raw > limit - 10 ? Math.min(raw, limit) : raw;
    return { x: xPos, stuck: kink > 0.5 && raw >= limit };
  });
  const brainMood = kink > 0.5 ? "confused" : "happy";
  return (
    <g>
      <Paper />
      {/* ayak (sol) */}
      <g transform="translate(-480 210) scale(0.85)">
        <path d="M 600 -34 L 640 -34 Q 660 -34 660 -10 L 660 60 Q 700 64 730 80 Q 740 100 720 104 L 610 104 Q 596 104 596 90 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      </g>
      <NamePlate x={110} y={430} text="AYAK" />
      <path d={hosePath} fill="none" stroke={OUTLINE} strokeWidth={42} strokeLinecap="round" strokeLinejoin="round" />
      <path d={hosePath} fill="none" stroke={NERVE} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
      {msgs.map((m, i) =>
        m.x < 380 || m.x > 520 || kink < 0.5 ? (
          <g key={i} transform={`translate(${m.x} 300)`}>
            <rect x={-18} y={-12} width={36} height={24} rx={3} fill="#fff" stroke={OUTLINE} strokeWidth={3} />
            <path d="M -18 -12 L 0 2 L 18 -12" fill="none" stroke={OUTLINE} strokeWidth={3} />
          </g>
        ) : null,
      )}
      {/* sıkıştıran el / baskı */}
      <g opacity={kink}>
        <path d={`M 400 ${kinkY - 30} L 450 ${kinkY - 70} L 500 ${kinkY - 30}`} fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
        <Chip x={450} y={460} text="MESAJ YOK!" delay={kinkAt + 10} />
      </g>
      <Brain x={790} y={290} scale={0.8} mood={brainMood} />
      {kink > 0.5 ? <QuestionMark x={830} y={150} size={70} delay={kinkAt + 16} /> : null}
    </g>
  );
};

// 5) Dizin dış yanı: bacak bacak üstüne
const KneeNerve: Visual = () => {
  const frame = useCurrentFrame();
  const base = useAppear(2);
  const top = interpolate(frame, [14, 34], [-160, 0], clamp);
  const nerve = useProgress(36, 60);
  const pulse = 1 + useWave(14, 0.12);
  return (
    <g>
      <Paper />
      {/* alttaki bacak */}
      <g transform={place(60, 330, base * 1)} >
        <BigLeg color="#3e5585" />
        {/* sinir: dizin dış yanından dolanır */}
        <path
          d="M 0 18 L 300 22 Q 380 30 360 60 Q 340 30 420 20 L 600 14"
          fill="none"
          stroke={OUTLINE}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={760}
          strokeDashoffset={760 * (1 - nerve)}
        />
        <path
          d="M 0 18 L 300 22 Q 380 30 360 60 Q 340 30 420 20 L 600 14"
          fill="none"
          stroke={NERVE}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={760}
          strokeDashoffset={760 * (1 - nerve)}
        />
      </g>
      {/* üstteki bacak: dizin üstüne biner */}
      <g transform={`translate(0 ${top})`}>
        <path d="M 120 210 L 380 260 Q 420 270 410 300 L 400 330 Q 380 340 350 320 L 110 280 Z" fill={PANTS} stroke={OUTLINE} strokeWidth={6} />
        <path d="M 380 250 L 560 150 L 590 190 L 420 300 Z" fill={PANTS} stroke={OUTLINE} strokeWidth={6} />
      </g>
      <g transform={place(400, 336, pulse)} opacity={nerve}>
        <circle r={56} fill="none" stroke={RED} strokeWidth={7} strokeDasharray="12 9" />
      </g>
      <Arrow from={[620, 470]} to={[460, 380]} progress={useProgress(56, 70)} color={RED} />
      <Chip x={700} y={490} text="DİZİN DIŞ YANI" delay={60} />
      <NamePlate x={180} y={80} text="BACAK BACAK ÜSTÜNE" delay={10} />
    </g>
  );
};

// 6) Karışık sinyaller: bazısı susuyor, bazısı çıldırıyor
const MixedSignals: Visual = () => {
  const frame = useCurrentFrame();
  const lanes = [0, 1, 2, 3, 4];
  const active = [false, true, false, true, true];
  const appear = useAppear(4);
  return (
    <g>
      <Paper />
      <g opacity={appear}>
        {lanes.map((i) => {
          const y = 140 + i * 68;
          const on = active[i];
          return (
            <g key={i}>
              <line x1={190} y1={y} x2={650} y2={y} stroke={OUTLINE} strokeWidth={18} strokeLinecap="round" />
              <line x1={190} y1={y} x2={650} y2={y} stroke={on ? NERVE : DIM} strokeWidth={10} strokeLinecap="round" />
              {on
                ? Array.from({ length: 4 }).map((_, k) => {
                    const sx = 190 + ((frame * (9 + i * 2) + k * 140) % 460);
                    return (
                      <path
                        key={k}
                        transform={`translate(${sx} ${y})`}
                        d="M -14 -22 L 4 -4 L -6 -2 L 12 22 L -2 2 L 8 0 Z"
                        fill={YELLOW}
                        stroke={OUTLINE}
                        strokeWidth={3}
                      />
                    );
                  })
                : (
                  <text x={390} y={y - 18} fontFamily={uiFont} fontWeight={800} fontSize={26} textAnchor="middle" fill="#7a8a88">
                    · · · SESSİZ · · ·
                  </text>
                )}
            </g>
          );
        })}
      </g>
      {/* sol uçta ayak */}
      <g transform="translate(-450 240) scale(0.8)">
        <path d="M 600 -34 L 640 -34 Q 660 -34 660 -10 L 660 60 Q 700 64 730 80 Q 740 100 720 104 L 610 104 Q 596 104 596 90 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      </g>
      <Brain x={770} y={280} scale={0.85} mood="confused" delay={10} />
      <QuestionMark x={830} y={120} size={70} delay={26} />
      <Chip x={500} y={500} text="KARIŞIK SİNYAL" dark delay={30} />
    </g>
  );
};

// Tek bir karınca
const Ant: React.FC<{ x: number; y: number; step: number; scale?: number }> = ({ x, y, step, scale = 1 }) => {
  const leg = Math.sin(step) * 6;
  return (
    <g transform={place(x, y, scale)}>
      {[-10, 0, 10].map((lx, i) => (
        <g key={i}>
          <line x1={lx} y1={0} x2={lx + (i % 2 ? leg : -leg)} y2={14} stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
          <line x1={lx} y1={0} x2={lx + (i % 2 ? -leg : leg)} y2={-14} stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
      <ellipse cx={-16} cy={0} rx={10} ry={8} fill="#3a2a22" />
      <ellipse cx={0} cy={0} rx={7} ry={6} fill="#3a2a22" />
      <circle cx={13} cy={0} r={7} fill="#3a2a22" />
      <path d="M 17 -4 Q 26 -14 30 -10 M 17 4 Q 26 14 30 10" fill="none" stroke={OUTLINE} strokeWidth={2.5} />
    </g>
  );
};

// 7) Karıncalanma: bacakta yürüyen karıncalar
const Ants: Visual = () => {
  const frame = useCurrentFrame();
  const leg = useAppear(2);
  const n = Math.floor(interpolate(frame, [10, 70], [0, 12], clamp));
  return (
    <g>
      <Paper />
      <g transform={place(40, 300, leg * 1.05)}>
        <BigLeg color="#9cc3f0" />
      </g>
      {Array.from({ length: n }).map((_, i) => {
        const row = i % 3;
        const x = 70 + ((frame * 3 + i * 63) % 700);
        const y = 278 + row * 24;
        return <Ant key={i} x={x} y={y} step={frame / 2 + i} scale={1.1} />;
      })}
      <Tingle x={720} y={360} r={70} t={useProgress(20, 34)} />
      <Brain x={150} y={130} scale={0.55} mood="confused" delay={30} />
      <Chip x={540} y={110} text="KARINCALANMA!" delay={40} />
    </g>
  );
};

// 8) Baskı kalkınca sinirler yeniden açılıyor
const WakeUp: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const liftAt = Math.round(durationInFrames * 0.25);
  const lift = interpolate(frame, [liftAt, liftAt + 20], [0, 1], clamp);
  const light = interpolate(frame, [liftAt + 14, liftAt + 60], [0, 1], clamp);
  const segs = 8;
  return (
    <g>
      <Paper />
      {/* sinir segmentleri sırayla yanar */}
      {Array.from({ length: segs }).map((_, i) => {
        const on = light * segs > i;
        const x = 110 + i * 85;
        return (
          <g key={i}>
            <rect x={x} y={380} width={70} height={34} rx={17} fill={on ? NERVE : DIM} stroke={OUTLINE} strokeWidth={5} />
            {on ? <Sparkles points={[[x + 35, 360]]} /> : null}
          </g>
        );
      })}
      {/* ağırlık */}
      <g transform={`translate(450 ${300 - 230 * lift}) rotate(${-8 * lift})`}>
        <path d="M -130 60 L -100 -60 L 100 -60 L 130 60 Z" fill="#6b7280" stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <rect x={-40} y={-90} width={80} height={34} rx={12} fill="none" stroke={OUTLINE} strokeWidth={10} />
        <text x={0} y={22} fontFamily={uiFont} fontWeight={800} fontSize={46} textAnchor="middle" fill="#fff">
          BASKI
        </text>
      </g>
      <Arrow from={[780, 330]} to={[780, 150]} progress={lift} color={GREEN} />
      <Chip x={450} y={490} text="SİNİRLER YENİDEN AÇILIYOR" delay={liftAt + 30} />
    </g>
  );
};

// 9) Akıllı alarm: kımılda!
const Alarm: Visual = () => {
  const frame = useCurrentFrame();
  const ring = Math.sin(frame / 2) * 12;
  const bell = useAppear(4);
  const shift = interpolate(frame, [40, 60], [0, 1], clamp);
  return (
    <g>
      <LivingRoom />
      {/* zil */}
      <g transform={place(250, 220, bell, ring)}>
        <path d="M -70 50 Q -70 -70 0 -76 Q 70 -70 70 50 L 90 74 L -90 74 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={0} cy={86} r={16} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={0} cy={-84} r={12} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      </g>
      <g opacity={bell}>
        <path d="M 120 150 Q 100 220 120 290 M 380 150 Q 400 220 380 290" fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" />
        <path d="M 90 130 Q 60 220 90 310 M 410 130 Q 440 220 410 310" fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" opacity={0.6} />
      </g>
      <g transform={place(250, 410, useAppear(16))}>
        <Chip x={0} y={0} text="KIMILDA!" dark />
      </g>
      {/* karakter pozisyon değiştirir: oturuyor → kalkıp esniyor */}
      {shift < 0.5 ? (
        <SittingPerson x={660} y={470} scale={0.8} face="shock" />
      ) : (
        <Person x={660} y={470} scale={1.3} shirt={SHIRT} presenting />
      )}
      <Sparkles points={[[560, 170], [780, 140]]} />
      <g opacity={shift}>
        <Check x={790} y={250} t={useProgress(60, 74)} />
      </g>
    </g>
  );
};

// 10) Dikkat: fırlama, önce bileğini oynat
const Tips: Visual = () => {
  const frame = useCurrentFrame();
  const left = useAppear(4);
  const right = useAppear(26);
  const jump = Math.abs(Math.sin(frame / 8)) * -30;
  const rot = (frame * 6) % 360;
  return (
    <g>
      <Paper />
      <g transform={place(230, 270, left)}>
        <rect x={-190} y={-210} width={380} height={420} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <g transform={`translate(0 ${jump})`}>
          <Person x={0} y={110} scale={1.05} shirt={SHIRT} presenting />
        </g>
        <path d="M -160 -170 L 160 150" stroke={RED} strokeWidth={14} strokeLinecap="round" opacity={useAppear(16)} />
        <text x={0} y={180} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={RED}>
          HEMEN FIRLAMA
        </text>
      </g>
      <g transform={place(670, 270, right)}>
        <rect x={-190} y={-210} width={380} height={420} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        {/* bilek: dairesel ok etrafında dönen ayak */}
        <g transform="translate(0 -20)">
          <circle r={110} fill="none" stroke={TEAL} strokeWidth={8} strokeDasharray="18 12" />
          <g transform={`rotate(${Math.sin(rot / 57.3) * 25})`}>
            <rect x={-26} y={-120} width={52} height={90} rx={10} fill={PANTS} stroke={OUTLINE} strokeWidth={5} />
            <path d="M -26 -34 L 26 -34 L 26 10 Q 70 14 86 30 Q 92 48 76 50 L -20 50 Q -30 50 -30 38 Z" fill={SKIN} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          </g>
        </g>
        <text x={0} y={180} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={GREEN}>
          BİLEĞİ OYNAT
        </text>
      </g>
      <Check x={830} y={80} t={useProgress(36, 50)} />
    </g>
  );
};

// 11) Kapanış sorusu
const YourTurn: Visual = () => {
  const card = useAppear(8);
  const pulse = 1 + useWave(24, 0.05);
  return (
    <g>
      <LivingRoom />
      <ellipse cx={230} cy={470} rx={170} ry={24} fill="#5bc0b0" stroke={OUTLINE} strokeWidth={5} />
      <SittingPerson x={230} y={462} scale={0.85} />
      <Tingle x={300} y={450} r={34} />
      <g transform={place(640, 210, card)}>
        <rect x={-210} y={-160} width={420} height={320} rx={26} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <Chip x={0} y={-90} text="BAĞDAŞTA?" delay={14} />
        <Chip x={0} y={0} text="OTOBÜSTE?" delay={20} />
        <Chip x={0} y={90} text="SINAVDA?" delay={26} />
      </g>
      <g transform={place(640, 470, pulse)}>
        <Chip x={0} y={0} text="YORUMLARA YAZ" dark delay={30} />
      </g>
      <BigText x={430} y={110} text="?" size={90} color={YELLOW} delay={36} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  CrossLegged,
  NameCard,
  Myth,
  Hose,
  KneeNerve,
  MixedSignals,
  Ants,
  WakeUp,
  Alarm,
  Tips,
  YourTurn,
};
