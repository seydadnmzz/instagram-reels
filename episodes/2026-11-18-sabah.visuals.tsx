// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Burun döngüsü / bir burun deliğinin sırayla tıkanması (2026-11-18-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  Brain,
  Chip,
  NamePlate,
  place,
  QuestionMark,
  RED,
  Sparkles,
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
const SKIN_DARK = "#d9a877";
const TEAL = "#17c3a5";
const BLUE = "#0f8fb3";
const PINK = "#ff6b8b";
const PURPLE = "#8a6cf0";
const ORANGE = "#ff9a3d";
const TISSUE = "#f47c95";
const TISSUE_DARK = "#d9536f";
const CAVITY = "#fff6f7";
const AIR = "#4cc3ff";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;
type Mood = "calm" | "squint" | "sneeze" | "closed" | "happy" | "wow" | "dizzy";

// Belden yukarı karakter; (0,0) gövdenin alt ortası, kafa merkezi (0,-200), yarıçap 70.
const Bust: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  mood?: Mood;
  beard?: boolean;
  eeg?: boolean;
  delay?: number;
}> = ({ x, y, scale = 1, shirt = TEAL, hair = "#4a2f1d", mood = "calm", beard = false, eeg = false, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const tilt = mood === "squint" ? -6 : mood === "sneeze" ? 8 + Math.sin(frame * 1.5) * 2 : Math.sin(frame / 18) * 2;
  const blink = frame % 90 > 85 ? 0.15 : 1;
  return (
    <g transform={place(x, y, scale * a)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <g transform={`rotate(${tilt} 0 -140)`}>
        <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
        <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        {beard ? (
          <path d="M -66 -196 Q -70 -120 0 -112 Q 70 -120 66 -196 Q 50 -150 0 -150 Q -50 -150 -66 -196 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        ) : null}
        {/* Gözler */}
        {mood === "calm" || mood === "happy" ? (
          <g transform={`translate(0 ${-206 * (1 - blink)}) scale(1 ${blink})`}>
            <circle cx={-26} cy={-206} r={8} fill={OUTLINE} />
            <circle cx={26} cy={-206} r={8} fill={OUTLINE} />
          </g>
        ) : null}
        {mood === "wow" ? (
          <g>
            <circle cx={-26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={26} cy={-206} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
            <circle cx={-26} cy={-204} r={6} fill={OUTLINE} />
            <circle cx={26} cy={-204} r={6} fill={OUTLINE} />
          </g>
        ) : null}
        {mood === "squint" || mood === "sneeze" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M -40 -214 L -18 -205 L -40 -196" />
            <path d="M 40 -214 L 18 -205 L 40 -196" />
          </g>
        ) : null}
        {mood === "closed" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round">
            <path d="M -38 -206 Q -26 -196 -14 -206" />
            <path d="M 14 -206 Q 26 -196 38 -206" />
          </g>
        ) : null}
        {mood === "dizzy" ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round">
            {[-26, 26].map((cx) => (
              <path key={cx} transform={`rotate(${frame * 12} ${cx} -206)`} d={`M ${cx} -206 m 0 -2 a 3 3 0 1 1 -3 4 a 7 7 0 1 1 9 -7 a 11 11 0 1 1 -15 10`} />
            ))}
            <path d="M -22 -160 Q -11 -170 0 -160 Q 11 -150 22 -160" strokeWidth={5} />
          </g>
        ) : null}
        {/* Burun */}
        <path d="M -8 -186 Q 0 -176 8 -186" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
        {mood === "squint" ? <circle cx={0} cy={-184} r={10} fill="#ff8a8a" opacity={0.6 + 0.3 * Math.sin(frame / 2)} /> : null}
        {/* Ağız */}
        {mood === "calm" ? <path d="M -20 -164 Q 0 -152 20 -164" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        {mood === "happy" ? <path d="M -28 -168 Q 0 -140 28 -168 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" /> : null}
        {mood === "wow" || mood === "squint" ? <ellipse cx={0} cy={-160} rx={10} ry={13} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={4} /> : null}
        {mood === "sneeze" ? <ellipse cx={0} cy={-158} rx={24} ry={20} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} /> : null}
        {mood === "closed" ? <path d="M -16 -162 L 16 -162" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" /> : null}
        <circle cx={-46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
        <circle cx={46} cy={-178} r={10} fill="#f59ab0" opacity={0.7} />
        {eeg ? (
          <g>
            <path d="M -72 -214 Q -70 -290 0 -286 Q 70 -290 72 -214" fill="none" stroke={OUTLINE} strokeWidth={5} />
            {[-60, -30, 0, 30, 60].map((dx, i) => (
              <circle key={i} cx={dx} cy={-262 + Math.abs(dx) * 0.45} r={9} fill={i % 2 ? PINK : BLUE} stroke={OUTLINE} strokeWidth={3} />
            ))}
            <path d="M 60 -235 Q 120 -260 150 -200" fill="none" stroke={OUTLINE} strokeWidth={4} />
          </g>
        ) : null}
      </g>
    </g>
  );
};


// Burnun önden kesiti: iki kanal, dış duvardan şişen süngerimsi doku, kanaldan geçen hava.
// (0,0) merkez; l/r: 0 (açık) … 1 (tam şişmiş/tıkalı). Yaklaşık 300×330 birim.
const NoseSection: React.FC<{ x: number; y: number; scale?: number; l: number; r: number; delay?: number; id: string; rotate?: number }> = ({
  x,
  y,
  scale = 1,
  l,
  r,
  delay = 0,
  id,
  rotate = 0,
}) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const side = (dir: -1 | 1, s: number) => {
    const cx = dir * 62;
    const wallX = dir * 112;
    const rx = 12 + s * 84;
    const clip = `${id}-${dir}`;
    const open = Math.max(0, 1 - s * 1.05);
    return (
      <g key={dir}>
        <clipPath id={clip}>
          <rect x={cx - 50} y={-130} width={100} height={240} rx={40} />
        </clipPath>
        <rect x={cx - 50} y={-130} width={100} height={240} rx={40} fill={CAVITY} stroke={OUTLINE} strokeWidth={5} />
        <g clipPath={`url(#${clip})`}>
          {/* Hava parçacıkları */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const t = ((frame * (1.5 + open * 2.5) + i * 40) % 240) / 240;
            const py = 110 - t * 240;
            const px = cx - dir * (6 + Math.sin(i * 2 + frame / 10) * 6);
            return <circle key={i} cx={px} cy={py} r={8} fill={AIR} stroke={OUTLINE} strokeWidth={2.5} opacity={open} />;
          })}
          {/* Süngerimsi doku (dış duvardan içe doğru şişer) */}
          {[-70, 0, 70].map((dy, i) => (
            <g key={i}>
              <ellipse cx={wallX} cy={dy} rx={rx} ry={36} fill={TISSUE} stroke={OUTLINE} strokeWidth={4} />
              {[0, 1, 2].map((k) => (
                <circle key={k} cx={wallX - dir * rx * (0.3 + k * 0.22)} cy={dy + (k - 1) * 14} r={3 + s * 3} fill={TISSUE_DARK} />
              ))}
            </g>
          ))}
        </g>
      </g>
    );
  };
  return (
    <g transform={place(x, y, scale * a, rotate)}>
      <path
        d="M 0 -190 Q -70 -150 -150 -40 Q -175 0 -170 80 Q -165 150 -100 155 L 100 155 Q 165 150 170 80 Q 175 0 150 -40 Q 70 -150 0 -190 Z"
        fill={SKIN}
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      {side(-1, l)}
      {side(1, r)}
      {/* Septum */}
      <rect x={-8} y={-140} width={16} height={260} rx={8} fill={SKIN_DARK} stroke={OUTLINE} strokeWidth={4} />
    </g>
  );
};

// Burun deliklerinin alttan görünüşü; blocked: -1 sol tıkalı, 1 sağ tıkalı, 0 ikisi de açık
const NoseFront: React.FC<{ x: number; y: number; scale?: number; blocked: -1 | 0 | 1; delay?: number }> = ({ x, y, scale = 1, blocked, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, scale * a)}>
      <path
        d="M 0 -150 Q -40 -120 -70 -10 Q -130 10 -130 60 Q -125 105 -60 100 Q -30 120 0 104 Q 30 120 60 100 Q 125 105 130 60 Q 130 10 70 -10 Q 40 -120 0 -150 Z"
        fill={SKIN}
        stroke={OUTLINE}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      {([-1, 1] as const).map((dir) => {
        const isBlocked = blocked === dir;
        return (
          <g key={dir}>
            <ellipse cx={dir * 48} cy={62} rx={28} ry={18} fill={isBlocked ? TISSUE : "#5a2a2a"} stroke={OUTLINE} strokeWidth={5} />
            {isBlocked ? (
              <g stroke={RED} strokeWidth={9} strokeLinecap="round">
                <line x1={dir * 48 - 22} y1={150} x2={dir * 48 + 22} y2={194} />
                <line x1={dir * 48 + 22} y1={150} x2={dir * 48 - 22} y2={194} />
              </g>
            ) : (
              [0, 1, 2].map((i) => {
                const t = ((frame + i * 12) % 36) / 36;
                return (
                  <path
                    key={i}
                    d={`M ${dir * 48 - 14 + i * 14} ${100 + t * 70} q 8 12 0 24`}
                    fill="none"
                    stroke={AIR}
                    strokeWidth={7}
                    strokeLinecap="round"
                    opacity={1 - t}
                  />
                );
              })
            )}
          </g>
        );
      })}
    </g>
  );
};

// Yatakta yatan kafa (yandan); (x,y) yastığın ortası
const BedHead: React.FC<{ x: number; y: number; scale?: number; sick?: boolean; blanket?: string }> = ({ x, y, scale = 1, sick = true, blanket = PURPLE }) => {
  const frame = useCurrentFrame();
  const breathe = Math.sin(frame / 20) * 4;
  return (
    <g transform={place(x, y, scale)}>
      <rect x={-120} y={20} width={560} height={110} rx={20} fill="#b8794a" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-140} y={-80} width={30} height={210} rx={10} fill="#b8794a" stroke={OUTLINE} strokeWidth={6} />
      <rect x={-100} y={-40} width={190} height={70} rx={34} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
      <path d={`M 40 ${10 - breathe} Q 60 ${-40 - breathe} 200 ${-34 - breathe} L 420 ${-30 - breathe} Q 440 -10 430 30 L 40 30 Z`} fill={blanket} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={0} cy={-48} r={58} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -58 -50 Q -60 -110 0 -108 Q 40 -108 52 -80 Q 20 -90 -10 -80 Q -40 -70 -58 -50 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      {/* Kapalı gözler, kırmızı burun */}
      <path d="M 10 -56 Q 22 -48 34 -56" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      <path d="M 48 -46 Q 70 -38 52 -26" fill={sick ? "#ff8a8a" : SKIN} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 20 -10 Q 32 -16 44 -10" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      {sick ? <circle cx={-14} cy={-30} r={9} fill="#f59ab0" opacity={0.8} /> : null}
    </g>
  );
};

const TissueBox: React.FC<{ x: number; y: number; delay?: number }> = ({ x, y, delay = 0 }) => {
  const a = useAppear(delay);
  const w = useWave(30, 5);
  return (
    <g transform={place(x, y, a)}>
      <rect x={-60} y={-50} width={120} height={70} rx={8} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
      <path d={`M -20 -50 Q ${-10 + w} -100 ${10 + w} -90 Q 30 -70 20 -50 Z`} fill="#fff" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
};

// 1) Nezle, yatak, tıkanan taraf değişiyor
const SickInBed: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const half = Math.round(durationInFrames * 0.55);
  const blocked: -1 | 1 = frame < half ? -1 : 1;
  const flip = useAppear(half);
  return (
    <g>
      <Paper />
      <BedHead x={170} y={380} scale={0.85} />
      <TissueBox x={120} y={510} delay={6} />
      <g transform={place(640, 230, 1, frame < half ? 0 : (1 - flip) * 20)}>
        <NoseFront x={0} y={0} scale={1.05} blocked={blocked} delay={4} />
      </g>
      <Chip x={blocked === -1 ? 560 : 720} y={490} text="TIKALI!" delay={frame < half ? 14 : half} />
      <QuestionMark x={830} y={110} size={70} delay={half + 6} />
    </g>
  );
};

// 2) Burun döngüsü adı
const CycleName: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.2);
  const s = (Math.sin(frame / 22) + 1) / 2;
  const spin = frame * 1.5;
  return (
    <g>
      <Paper />
      <g transform={place(300, 300, 1, spin)}>
        {[0, 180].map((rot) => (
          <g key={rot} transform={`rotate(${rot})`}>
            <path d="M 0 -235 A 235 235 0 0 1 200 -120" fill="none" stroke={TEAL} strokeWidth={14} strokeLinecap="round" />
            <path transform={place(200, -120, 1, 60)} d="M 0 0 L -26 -18 L -26 18 Z" fill={TEAL} stroke={OUTLINE} strokeWidth={3} />
          </g>
        ))}
      </g>
      <NoseSection x={300} y={300} scale={0.95} l={s} r={1 - s} id="c2" />
      <Chip x={680} y={210} text="BURUN DÖNGÜSÜ" delay={d} />
      <Chip x={680} y={320} text="HER GÜN!" dark delay={d + 14} />
      <Sparkles points={[[560, 120], [820, 140], [800, 400]]} />
    </g>
  );
};

// Burun deliği karakteri (nöbet)
const Nostril: React.FC<{ x: number; y: number; awake: boolean; delay?: number }> = ({ x, y, awake, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const bob = Math.sin(frame / (awake ? 8 : 25)) * (awake ? 6 : 3);
  return (
    <g transform={place(x, y + bob, a)}>
      <rect x={-95} y={-140} width={190} height={250} rx={80} fill={awake ? CAVITY : "#ffd6de"} stroke={OUTLINE} strokeWidth={6} />
      {awake ? (
        <g>
          <circle cx={-32} cy={-40} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={32} cy={-40} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={-32} cy={-38} r={6} fill={OUTLINE} />
          <circle cx={32} cy={-38} r={6} fill={OUTLINE} />
          <path d="M -30 10 Q 0 40 30 10 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        </g>
      ) : (
        <g>
          <path d="M -44 -40 Q -32 -30 -20 -40 M 20 -40 Q 32 -30 44 -40" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          <path d="M -16 14 L 16 14" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
          <path d="M -60 -120 Q 0 -200 70 -128 Q 0 -150 -60 -120 Z" fill={PURPLE} stroke={OUTLINE} strokeWidth={4} />
          <circle cx={78} cy={-130} r={12} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          {[0, 1, 2].map((i) => {
            const t = ((frame + i * 20) % 60) / 60;
            return (
              <text key={i} x={100 + t * 40} y={-150 - t * 70} fontFamily={uiFont} fontWeight={800} fontSize={26 + i * 6} fill={PURPLE} opacity={1 - t}>
                Z
              </text>
            );
          })}
        </g>
      )}
      <circle cx={-56} cy={-10} r={10} fill="#f59ab0" opacity={0.7} />
      <circle cx={56} cy={-10} r={10} fill="#f59ab0" opacity={0.7} />
    </g>
  );
};

// 3) Nöbetleşe çalışma
const ShiftWork: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.15);
  return (
    <g>
      <Paper />
      <Nostril x={250} y={290} awake delay={2} />
      <Nostril x={650} y={290} awake={false} delay={8} />
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 14) % 42) / 42;
        return <circle key={i} cx={110 + Math.sin(i * 3) * 14} cy={470 - t * 420} r={10} fill={AIR} stroke={OUTLINE} strokeWidth={3} opacity={t < 0.12 || t > 0.9 ? 0 : 0.9} />;
      })}
      <Chip x={250} y={490} text="AÇIK" delay={d} />
      <Chip x={650} y={490} text="DİNLENİYOR" dark delay={d + 10} />
    </g>
  );
};

// 4) Süngerimsi doku kanla doluyor
const SpongyTissue: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const fill = useProgress(durationInFrames * 0.15, durationInFrames * 0.75);
  const d = Math.round(durationInFrames * 0.2);
  return (
    <g>
      <Paper />
      <NoseSection x={330} y={300} scale={1.1} l={0.1 + fill * 0.85} r={0.15} id="c4" />
      {/* Kan damlaları dokuya akıyor */}
      {[0, 1, 2, 3].map((i) => {
        const t = ((frame + i * 12) % 48) / 48;
        return (
          <path
            key={i}
            transform={place(60 + t * 110, 160 + i * 60 + Math.sin(t * 6) * 6, 0.9)}
            d="M 0 -16 Q 12 0 8 8 Q 0 16 -8 8 Q -12 0 0 -16 Z"
            fill={RED}
            stroke={OUTLINE}
            strokeWidth={3}
            opacity={fill < 0.98 ? 1 - t * 0.4 : 0}
          />
        );
      })}
      {/* Büyüteç */}
      <g transform={place(700, 230, useAppear(d), -15)}>
        <circle cx={0} cy={0} r={110} fill="#fff" stroke={OUTLINE} strokeWidth={8} />
        <circle cx={0} cy={0} r={98} fill={TISSUE} />
        {[[-40, -40, 18], [30, -50, 14], [50, 20, 20], [-20, 30, 22], [-60, 20, 12], [10, -5, 10], [30, 70, 12], [-50, -80, 10]].map(([cx, cy, rr], i) => (
          <circle key={i} cx={cx} cy={cy} r={rr * (0.6 + fill * 0.6)} fill={TISSUE_DARK} stroke={OUTLINE} strokeWidth={2} />
        ))}
        <rect x={-14} y={110} width={28} height={110} rx={10} fill="#8a5a3a" stroke={OUTLINE} strokeWidth={6} />
      </g>
      <Chip x={700} y={500} text="SÜNGERİMSİ DOKU" delay={d + 10} />
    </g>
  );
};

// 5) Sinir sistemi şalteri
const NerveSwitch: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.15);
  const s = (Math.sin(frame / 18) + 1) / 2;
  const leverAng = -40 + s * 80;
  return (
    <g>
      <Paper />
      <Brain x={140} y={170} scale={0.9} delay={2} />
      {/* Kablo + şimşek */}
      <path d="M 200 220 Q 260 320 330 330" fill="none" stroke={YELLOW} strokeWidth={10} strokeLinecap="round" />
      <path d="M 200 220 Q 260 320 330 330" fill="none" stroke={OUTLINE} strokeWidth={3} strokeDasharray="10 14" strokeDashoffset={-frame * 3} />
      {/* Şalter */}
      <g transform={place(380, 360, useAppear(d))}>
        <rect x={-60} y={-30} width={120} height={70} rx={14} fill="#dfe6ee" stroke={OUTLINE} strokeWidth={5} />
        <g transform={`rotate(${leverAng} 0 0)`}>
          <rect x={-8} y={-100} width={16} height={100} rx={8} fill={OUTLINE} />
          <circle cx={0} cy={-100} r={18} fill={RED} stroke={OUTLINE} strokeWidth={4} />
        </g>
        <text x={-44} y={70} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={OUTLINE} textAnchor="middle">SOL</text>
        <text x={44} y={70} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={OUTLINE} textAnchor="middle">SAĞ</text>
      </g>
      <NoseSection x={680} y={280} scale={0.85} l={s} r={1 - s} id="c5" delay={6} />
      <Chip x={190} y={490} text="SİNİR SİSTEMİ" dark delay={d + 8} />
    </g>
  );
};

// 6) Weizmann ölçümü: burun kanülü ve iki çizgi grafik
const NoseLogger: Visual = ({ durationInFrames }) => {
  const draw = useProgress(durationInFrames * 0.1, durationInFrames * 0.8);
  const d = Math.round(durationInFrames * 0.15);
  const pts = (phase: number) => {
    const out: string[] = [];
    const n = Math.max(2, Math.floor(60 * draw));
    for (let i = 0; i < n; i++) {
      const x = (i / 59) * 380;
      const y = Math.sin(i / 6 + phase) * 40;
      out.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return out.join(" ");
  };
  return (
    <g>
      <Paper />
      <Bust x={180} y={560} scale={0.95} shirt={BLUE} mood="calm" />
      {/* Kanül: burun altından göğüsteki kutuya */}
      <path d="M 166 392 Q 180 398 194 392 Q 230 392 244 372 Q 250 430 205 478" fill="none" stroke="#7cc4f2" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 166 392 Q 130 392 116 372 Q 110 430 155 478" fill="none" stroke="#7cc4f2" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={140} y={470} width={80} height={56} rx={8} fill={OUTLINE} />
      <circle cx={204} cy={486} r={6} fill={TEAL} />
      {/* Grafik ekranı */}
      <g transform={place(620, 220, useAppear(4))}>
        <rect x={-230} y={-150} width={460} height={300} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={6} />
        <g transform="translate(-190 -50)">
          <path d={pts(0)} fill="none" stroke={BLUE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g transform="translate(-190 60)">
          <path d={pts(Math.PI)} fill="none" stroke={PINK} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x={-200} y={-108} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={BLUE}>SOL</text>
        <text x={-200} y={140} fontFamily={uiFont} fontWeight={800} fontSize={24} fill={PINK}>SAĞ</text>
      </g>
      <NamePlate x={620} y={420} text="33 KİŞİ · 24 SAAT" delay={d} />
      <Chip x={620} y={500} text="HEPSİNDE DÖNGÜ!" delay={Math.round(durationInFrames * 0.6)} />
    </g>
  );
};

// Saat
const Clock: React.FC<{ x: number; y: number; speed: number; delay?: number; night?: boolean }> = ({ x, y, speed, delay = 0, night = false }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x, y, a)}>
      <circle r={95} fill={night ? "#2d3266" : "#fff"} stroke={OUTLINE} strokeWidth={7} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-4} y={-88} width={8} height={16} rx={3} fill={night ? "#fff" : OUTLINE} transform={`rotate(${i * 30})`} />
      ))}
      <rect x={-5} y={-50} width={10} height={55} rx={5} fill={night ? "#fff" : OUTLINE} transform={`rotate(${frame * speed * 0.5})`} />
      <rect x={-4} y={-75} width={8} height={80} rx={4} fill={RED} transform={`rotate(${frame * speed * 6})`} />
      <circle r={9} fill={OUTLINE} />
    </g>
  );
};

// Küçük burun ikonu: hangi taraf açık
const MiniNose: React.FC<{ x: number; y: number; leftOpen: boolean }> = ({ x, y, leftOpen }) => (
  <g transform={place(x, y, 1)}>
    <ellipse cx={-30} cy={0} rx={24} ry={16} fill={leftOpen ? "#5a2a2a" : TISSUE} stroke={OUTLINE} strokeWidth={4} />
    <ellipse cx={30} cy={0} rx={24} ry={16} fill={leftOpen ? TISSUE : "#5a2a2a"} stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// 7) Uyanıkken ~2 saat, uykuda daha seyrek
const ClockSwap: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.15);
  return (
    <g>
      <Paper />
      <rect x={460} y={0} width={440} height={560} fill="#cfd6f5" />
      {/* Güneş */}
      <g transform={place(110, 90, useAppear(2), frame)}>
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={-5} y={-62} width={10} height={20} rx={5} fill={ORANGE} transform={`rotate(${i * 45})`} />
        ))}
        <circle r={36} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      </g>
      {/* Ay */}
      <g transform={place(800, 90, useAppear(8))}>
        <path d="M 20 -40 A 44 44 0 1 0 20 40 A 34 34 0 1 1 20 -40 Z" fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      </g>
      <Clock x={230} y={240} speed={4} delay={4} />
      <Clock x={680} y={240} speed={1.5} delay={10} night />
      <MiniNose x={230} y={385} leftOpen={Math.floor(frame / 30) % 2 === 0} />
      <MiniNose x={680} y={385} leftOpen={Math.floor(frame / 80) % 2 === 0} />
      <Chip x={230} y={480} text="≈ 2 SAAT" delay={d} />
      <Chip x={680} y={480} text="DAHA SEYREK" dark delay={d + 14} />
    </g>
  );
};

// 8) Toplam hava akışı sabit
const AirBalance: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.2);
  const s = (Math.sin(frame / 16) + 1) / 2;
  const grow = useProgress(0, 14);
  const bar = (x: number, h: number, color: string, label: string) => (
    <g key={label}>
      <rect x={x - 60} y={440 - h * grow} width={120} height={h * grow} rx={10} fill={color} stroke={OUTLINE} strokeWidth={5} />
      <text x={x} y={485} fontFamily={uiFont} fontWeight={800} fontSize={30} textAnchor="middle" fill={OUTLINE}>
        {label}
      </text>
    </g>
  );
  const leftH = 40 + s * 160;
  const rightH = 40 + (1 - s) * 160;
  return (
    <g>
      <Paper />
      <rect x={60} y={436} width={780} height={8} rx={4} fill={OUTLINE} />
      {bar(160, leftH, BLUE, "SOL")}
      {bar(340, rightH, PINK, "SAĞ")}
      <text x={250} y={250} fontFamily={uiFont} fontWeight={800} fontSize={60} textAnchor="middle" fill={OUTLINE}>
        +
      </text>
      <text x={500} y={320} fontFamily={uiFont} fontWeight={800} fontSize={70} textAnchor="middle" fill={OUTLINE} opacity={useAppear(d)}>
        =
      </text>
      {bar(680, 240, TEAL, "TOPLAM")}
      <Chip x={680} y={130} text="HEP AYNI!" delay={d + 10} />
      <Sparkles points={[[600, 180], [770, 220]]} />
    </g>
  );
};

// Virüs
const Virus: React.FC<{ x: number; y: number; r?: number; delay?: number }> = ({ x, y, r = 26, delay = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  return (
    <g transform={place(x + Math.sin(frame / 12 + x) * 6, y + Math.cos(frame / 14 + y) * 6, a, frame * 2)}>
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 45})`}>
          <rect x={-3} y={-r - 14} width={6} height={16} fill={OUTLINE} />
          <circle cx={0} cy={-r - 16} r={6} fill="#7ed957" stroke={OUTLINE} strokeWidth={3} />
        </g>
      ))}
      <circle r={r} fill="#7ed957" stroke={OUTLINE} strokeWidth={4} />
      <circle cx={-8} cy={-4} r={4} fill={OUTLINE} />
      <circle cx={8} cy={-4} r={4} fill={OUTLINE} />
      <path d="M -8 8 Q 0 2 8 8" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
};

// 9) Nezlede şişme büyüyor
const ColdSwell: Visual = ({ durationInFrames }) => {
  const swell = useProgress(durationInFrames * 0.15, durationInFrames * 0.6);
  const d = Math.round(durationInFrames * 0.5);
  return (
    <g>
      <Paper />
      <Bust x={170} y={560} scale={0.95} shirt={ORANGE} mood="squint" />
      {/* Termometre */}
      <g transform={place(178, 406, 1, -25)}>
        <rect x={0} y={-8} width={90} height={16} rx={8} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={90} cy={0} r={11} fill={RED} stroke={OUTLINE} strokeWidth={4} />
      </g>
      <NoseSection x={600} y={290} scale={0.95} l={0.3 + swell * 0.75} r={0.2} id="c9" delay={4} />
      <Virus x={420} y={110} delay={6} />
      <Virus x={810} y={130} r={20} delay={12} />
      <Virus x={820} y={420} r={22} delay={18} />
      <Chip x={520} y={500} text="TAM TIKALI!" delay={d} />
    </g>
  );
};

// 10) Yan yatınca alttaki taraf tıkanır
const SideLying: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.2);
  const t = useProgress(durationInFrames * 0.1, durationInFrames * 0.45);
  return (
    <g>
      <Paper />
      <BedHead x={150} y={400} scale={0.7} sick={false} blanket={TEAL} />
      {/* Yan yatmış kesit: alt kanal tıkanıyor */}
      <NoseSection x={640} y={260} scale={0.8} l={0.2 + t * 0.75} r={0.15} rotate={-90} id="c10" delay={4} />
      <Arrow from={[860, 120]} to={[860, 380]} progress={useProgress(d, d + 15)} color={OUTLINE} />
      <Chip x={290} y={110} text="ÜSTTEKİ: AÇIK" delay={d + 8} />
      <Chip x={640} y={490} text="ALTTAKİ: TIKALI" dark delay={d + 16} />
    </g>
  );
};

// 11) Sıra sende
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.15);
  const w = useWave(40, 4);
  const items = ["SOL?", "SAĞ?", "İKİSİ DE?"];
  return (
    <g>
      <Paper />
      <Bust x={190} y={540} scale={0.9} mood="happy" shirt={TEAL} />
      {items.map((c, i) => (
        <g key={i} transform={place(610, 90 + i * 115, useAppear(d + i * 8), i % 2 ? w : -w)}>
          <rect x={-200} y={-42} width={400} height={84} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={[BLUE, PINK, PURPLE][i]}>
            {c}
          </text>
        </g>
      ))}
      <QuestionMark x={340} y={220} size={80} delay={d + 26} />
      <Chip x={610} y={480} text="YORUMLARA YAZ!" dark delay={d + 32} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  SickInBed,
  CycleName,
  ShiftWork,
  SpongyTissue,
  NerveSwitch,
  NoseLogger,
  ClockSwap,
  AirBalance,
  ColdSwell,
  SideLying,
  YourTurn,
};
