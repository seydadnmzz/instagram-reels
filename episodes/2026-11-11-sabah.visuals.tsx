// Günün bölümüne özel çizimler. Rutin bu dosyayı her bölüm için yeniden yazar.
// Her çizim 900×560 birimlik SVG sahnesine çizilir; sahne süresi prop olarak gelir.
// Bölüm: Müzik dinlerken tüylerin diken diken olması / frisson (2026-11-11-sabah)
import { useCurrentFrame } from "remotion";
import {
  Arrow,
  BigText,
  Brain,
  Chip,
  INK,
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
const PAPER = "#fff0f4";
const WALL = "#ffe1ea";
const FLOOR = "#f6c7a8";
const SKIN = "#f2c79a";
const PINK = "#ff4f8b";
const TEAL = "#3fb4a0";
const BLUE = "#5b8def";
const PURPLE = "#8a6cf0";
const DOPA = "#ffb02e";

const Paper: React.FC<{ fill?: string }> = ({ fill = PAPER }) => <rect width={900} height={560} fill={fill} />;

// Müzik notası
const Note8: React.FC<{ x: number; y: number; scale?: number; color?: string; rotate?: number }> = ({ x, y, scale = 1, color = PINK, rotate = 0 }) => (
  <g transform={place(x, y, scale, rotate)}>
    <ellipse cx={-14} cy={22} rx={16} ry={12} fill={color} stroke={OUTLINE} strokeWidth={4} transform="rotate(-20 -14 22)" />
    <rect x={-2} y={-36} width={7} height={58} fill={OUTLINE} />
    <path d="M 2 -36 Q 30 -26 26 -2 Q 20 -18 2 -20 Z" fill={OUTLINE} />
  </g>
);

// Kafadan çıkıp süzülen notalar
const FloatingNotes: React.FC<{ x: number; y: number; count?: number; spread?: number }> = ({ x, y, count = 4, spread = 160 }) => {
  const frame = useCurrentFrame();
  const colors = [PINK, BLUE, PURPLE, TEAL];
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const t = ((frame + i * 17) % 60) / 60;
        const dx = (i - (count - 1) / 2) * (spread / count) + Math.sin((frame + i * 20) / 10) * 12;
        return (
          <g key={i} opacity={1 - t * t}>
            <Note8 x={x + dx} y={y - t * 120} scale={0.8 + t * 0.4} color={colors[i % 4]} rotate={Math.sin(frame / 8 + i) * 12} />
          </g>
        );
      })}
    </g>
  );
};

// Belden yukarı karakter, kulaklıklı; (0,0) gövdenin alt ortası. Kafa merkezi y=-200.
const Listener: React.FC<{
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  hair?: string;
  mood?: "wow" | "calm" | "happy";
  headphones?: boolean;
  delay?: number;
  shiver?: number; // 0..1 titreme
}> = ({ x, y, scale = 1, shirt = TEAL, hair = "#4a2f1d", mood = "calm", headphones = true, delay = 0, shiver = 0 }) => {
  const frame = useCurrentFrame();
  const a = useAppear(delay);
  const jitter = Math.sin(frame * 2.1) * 3 * shiver;
  const blink = frame % 80 > 75 ? 0.15 : 1;
  const sway = mood === "calm" ? Math.sin(frame / 14) * 3 : 0;
  return (
    <g transform={place(x + jitter, y, scale * a, sway)}>
      <path d="M -95 0 L -85 -80 Q -80 -118 -40 -122 L 40 -122 Q 80 -118 85 -80 L 95 0 Z" fill={shirt} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-14} y={-140} width={28} height={22} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
      <circle cx={0} cy={-200} r={70} fill={SKIN} stroke={OUTLINE} strokeWidth={6} />
      <path d="M -70 -206 Q -68 -282 0 -278 Q 68 -282 70 -208 Q 40 -240 0 -236 Q -40 -238 -70 -206 Z" fill={hair} stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
      {/* Yüz */}
      {mood === "wow" ? (
        <g>
          <circle cx={-26} cy={-200} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={26} cy={-200} r={13} fill="#fff" stroke={OUTLINE} strokeWidth={4} />
          <circle cx={-26} cy={-198} r={6} fill={OUTLINE} />
          <circle cx={26} cy={-198} r={6} fill={OUTLINE} />
          <ellipse cx={0} cy={-160} rx={14} ry={18} fill="#7a2b2b" stroke={OUTLINE} strokeWidth={5} />
        </g>
      ) : (
        <g>
          {mood === "calm" ? (
            <g>
              <path d="M -38 -198 Q -26 -188 -14 -198" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
              <path d="M 14 -198 Q 26 -188 38 -198" fill="none" stroke={OUTLINE} strokeWidth={6} strokeLinecap="round" />
            </g>
          ) : (
            <g transform={`translate(0 ${-198 * (1 - blink)}) scale(1 ${blink})`}>
              <circle cx={-26} cy={-198} r={8} fill={OUTLINE} />
              <circle cx={26} cy={-198} r={8} fill={OUTLINE} />
            </g>
          )}
          <path d="M -28 -166 Q 0 -140 28 -166 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
        </g>
      )}
      <circle cx={-46} cy={-174} r={10} fill="#f59ab0" opacity={0.7} />
      <circle cx={46} cy={-174} r={10} fill="#f59ab0" opacity={0.7} />
      {headphones ? (
        <g>
          <path d="M -78 -200 Q -80 -300 0 -296 Q 80 -300 78 -200" fill="none" stroke={OUTLINE} strokeWidth={12} strokeLinecap="round" />
          <path d="M -78 -200 Q -80 -300 0 -296 Q 80 -300 78 -200" fill="none" stroke={PINK} strokeWidth={6} strokeLinecap="round" />
          <rect x={-96} y={-228} width={30} height={58} rx={12} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
          <rect x={66} y={-228} width={30} height={58} rx={12} fill={PINK} stroke={OUTLINE} strokeWidth={5} />
        </g>
      ) : null}
    </g>
  );
};

// Tüyleri diken diken olmuş kol (yakın plan daire içinde)
const ArmZoom: React.FC<{ x: number; y: number; r?: number; bumps: number; delay?: number }> = ({ x, y, r = 110, bumps, delay = 0 }) => {
  const a = useAppear(delay);
  const pts: [number, number][] = [];
  for (let i = 0; i < 18; i++) pts.push([-80 + (i % 6) * 32 + (Math.floor(i / 6) % 2) * 14, -30 + Math.floor(i / 6) * 28]);
  return (
    <g transform={place(x, y, a)}>
      <defs>
        <clipPath id="armclip">
          <circle r={r} />
        </clipPath>
      </defs>
      <circle r={r} fill="#ffffff" />
      <g clipPath="url(#armclip)">
        <rect x={-r} y={-60} width={r * 2} height={120} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        {pts.map(([px, py], i) => {
          const s = Math.min(1, Math.max(0, bumps * 18 - i)) ;
          return (
            <g key={i} transform={place(px, py, 1)}>
              <circle r={6 * s} fill="#e7a978" stroke={OUTLINE} strokeWidth={2} />
              <line x1={0} y1={0} x2={0} y2={-6 - 16 * s} stroke="#6b4a2b" strokeWidth={3} strokeLinecap="round" transform={`rotate(${(1 - s) * 70})`} />
            </g>
          );
        })}
      </g>
      <circle r={r} fill="none" stroke={OUTLINE} strokeWidth={6} />
    </g>
  );
};

// 1) Şarkının o kısmı geldi, tüyler diken diken
const ChillsSong: Visual = ({ durationInFrames }) => {
  const peak = Math.round(durationInFrames * 0.4);
  const bumps = useProgress(peak, peak + 30);
  const on = bumps > 0.05;
  return (
    <g>
      <rect width={900} height={560} fill={WALL} />
      <rect y={460} width={900} height={100} fill={FLOOR} stroke={OUTLINE} strokeWidth={5} />
      <Listener x={300} y={500} scale={1.1} mood={on ? "wow" : "calm"} shiver={on ? 1 : 0} />
      <FloatingNotes x={300} y={140} count={4} spread={260} />
      <g transform={place(330, 0)}>
        <Arrow from={[150, 330]} to={[210, 300]} progress={bumps} color={INK} />
      </g>
      <ArmZoom x={680} y={250} r={130} bumps={bumps} delay={peak - 8} />
      {on ? <Sparkles points={[[560, 120], [800, 130], [820, 380], [560, 390]]} /> : null}
      <Chip x={680} y={450} text="ÜRPERTİ!" delay={peak + 12} />
    </g>
  );
};

// 2) Frisson: sırttan aşağı inen dalga
const FrissonWord: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const wave = (frame % 45) / 45;
  return (
    <g>
      <Paper />
      {/* Sırt silüeti */}
      <g transform={place(260, 300)}>
        <path d="M -120 240 Q -130 60 -90 0 Q -60 -40 -30 -60 L -30 -110 Q -60 -120 -60 -170 Q -60 -230 0 -232 Q 60 -230 60 -170 Q 60 -120 30 -110 L 30 -60 Q 60 -40 90 0 Q 130 60 120 240 Z" fill={BLUE} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -60 -170 Q -60 -230 0 -232 Q 60 -230 60 -170 Q 40 -200 0 -200 Q -40 -200 -60 -170 Z" fill="#4a2f1d" stroke={OUTLINE} strokeWidth={4} />
        {/* Omurga çizgisi */}
        <line x1={0} y1={-50} x2={0} y2={230} stroke="#3c6fd0" strokeWidth={6} strokeDasharray="14 10" />
        {/* Aşağı inen dalga */}
        {[0, 0.33, 0.66].map((o, i) => {
          const t = (wave + o) % 1;
          return (
            <path key={i} d="M -70 0 Q -35 -18 0 0 Q 35 18 70 0" transform={`translate(0 ${-40 + t * 260})`} fill="none" stroke={YELLOW} strokeWidth={9} strokeLinecap="round" opacity={1 - t} />
          );
        })}
      </g>
      <BigText x={630} y={210} text="FRISSON" size={96} color={PINK} delay={6} />
      <Chip x={630} y={330} text="MÜZİK ÜRPERTİSİ" delay={Math.round(durationInFrames * 0.35)} />
      <g transform={place(630, 440)}>
        <FloatingNotes x={0} y={30} count={3} spread={180} />
      </g>
    </g>
  );
};

// Küçük insan simgesi
const Pawn: React.FC<{ x: number; y: number; color: string; s?: number }> = ({ x, y, color, s = 1 }) => (
  <g transform={place(x, y, s)}>
    <circle cx={0} cy={-58} r={20} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
    <path d="M -28 0 Q -30 -36 0 -36 Q 30 -36 28 0 Z" fill={color} stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// 3) Yarısından fazlası
const HowMany: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const fill = useProgress(10, Math.max(30, durationInFrames * 0.6));
  const lit = Math.round(fill * 6);
  return (
    <g>
      <Paper />
      {Array.from({ length: 10 }).map((_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 170 + col * 140;
        const y = 220 + row * 150;
        const on = i < lit;
        const jump = on ? Math.abs(Math.sin((frame + i * 6) / 6)) * -10 : 0;
        return (
          <g key={i}>
            <Pawn x={x} y={y + jump} color={on ? PINK : "#d6d0d8"} s={1.3} />
            {on ? <Sparkles points={[[x - 34, y - 100], [x + 34, y - 92]]} /> : null}
          </g>
        );
      })}
      <Chip x={450} y={480} text="YARISINDAN FAZLASI" delay={Math.round(durationInFrames * 0.55)} />
    </g>
  );
};

// 4) Beyin taraması (PET tarayıcı)
const BrainScan: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const slide = useProgress(0, 30);
  const pulse = 0.5 + 0.5 * Math.sin(frame / 6);
  return (
    <g>
      <Paper />
      <rect y={440} width={900} height={120} fill="#f9d6e1" />
      {/* Tarayıcı halkası */}
      <g transform={place(300, 300)}>
        <rect x={-120} y={-170} width={240} height={300} rx={40} fill="#eef1f7" stroke={OUTLINE} strokeWidth={6} />
        <circle r={95} fill="#3a3f55" stroke={OUTLINE} strokeWidth={6} />
        <circle r={95} fill="none" stroke={BLUE} strokeWidth={8} strokeDasharray="20 16" transform={`rotate(${frame * 4})`} />
      </g>
      {/* Yatak ve kişi */}
      <g transform={place(-120 + slide * 120, 0)}>
        <rect x={250} y={330} width={420} height={30} rx={10} fill="#c9ced6" stroke={OUTLINE} strokeWidth={5} />
        <rect x={380} y={300} width={260} height={36} rx={16} fill={TEAL} stroke={OUTLINE} strokeWidth={5} />
        <circle cx={330} cy={300} r={36} fill={SKIN} stroke={OUTLINE} strokeWidth={5} />
        <path d="M 300 290 Q 330 250 362 290" fill="none" stroke={PINK} strokeWidth={8} strokeLinecap="round" />
      </g>
      <rect x={410} y={360} width={20} height={80} fill="#9aa1ad" stroke={OUTLINE} strokeWidth={4} />
      {/* Ekran */}
      <g transform={place(710, 190, useAppear(14))}>
        <rect x={-130} y={-100} width={260} height={190} rx={14} fill="#2f3446" stroke={OUTLINE} strokeWidth={6} />
        <g transform={place(0, -5, 0.62)}>
          <path d="M -110 10 C -130 -60 -70 -110 -20 -95 C 10 -125 80 -110 95 -65 C 140 -50 135 20 100 40 C 95 85 30 100 0 80 C -40 105 -110 85 -110 10 Z" fill="#f59ac0" stroke="#fff" strokeWidth={5} />
          <circle cx={-10} cy={20} r={26} fill={DOPA} opacity={pulse} />
        </g>
        <rect x={-40} y={90} width={80} height={40} fill="#2f3446" stroke={OUTLINE} strokeWidth={5} />
      </g>
      <FloatingNotes x={330} y={230} count={3} spread={120} />
      <NamePlate x={710} y={390} text="MCGILL ÜNİV." delay={Math.round(durationInFrames * 0.3)} />
    </g>
  );
};

// Dopamin damlası
const Drop: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = DOPA }) => (
  <g transform={place(x, y, s)}>
    <path d="M 0 -26 Q 20 0 18 10 Q 14 26 0 26 Q -14 26 -18 10 Q -20 0 0 -26 Z" fill={color} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={-6} cy={8} r={4} fill="#fff" opacity={0.8} />
  </g>
);

// Kek dilimi
const Cake: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={place(x, y, s)}>
    <path d="M -60 30 L 60 30 L 60 -10 L -60 -30 Z" fill="#f7d39b" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -60 -30 L 60 -10 L 60 -2 L -60 -20 Z" fill={PINK} stroke={OUTLINE} strokeWidth={4} />
    <circle cx={30} cy={-34} r={12} fill={RED} stroke={OUTLINE} strokeWidth={4} />
  </g>
);

// 5) Ödül sistemi: yemek de müzik de aynı devre
const RewardSystem: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const arrow1 = useProgress(10, 30);
  const arrow2 = useProgress(d, d + 20);
  return (
    <g>
      <Paper />
      <g transform={place(160, 170, useAppear(4))}>
        <circle r={80} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <Cake x={0} y={4} s={0.9} />
      </g>
      <g transform={place(160, 400, useAppear(d - 6))}>
        <circle r={80} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <Note8 x={-14} y={-4} scale={1.6} color={PINK} />
        <Note8 x={30} y={10} scale={1.1} color={BLUE} />
      </g>
      <Arrow from={[250, 190]} to={[400, 260]} progress={arrow1} color={INK} />
      <Arrow from={[250, 380]} to={[400, 310]} progress={arrow2} color={INK} />
      <Brain x={560} y={290} scale={1.25} delay={2} />
      <Chip x={560} y={110} text="ÖDÜL SİSTEMİ" delay={8} />
      {/* Fışkıran dopamin damlaları */}
      {arrow2 > 0.9
        ? [0, 1, 2, 3, 4].map((i) => {
            const t = ((frame + i * 9) % 40) / 40;
            const ang = -60 + i * 30;
            const r = 140 + t * 120;
            return (
              <g key={i} opacity={1 - t}>
                <Drop x={560 + Math.cos(((ang - 90) * Math.PI) / 180) * r * 0.9 + 150 * Math.sign(ang) * 0} y={290 + Math.sin(((ang - 90) * Math.PI) / 180) * r * 0.7 + 60} s={0.9} />
              </g>
            );
          })
        : null}
      <Chip x={790} y={470} text="DOPAMİN" dark delay={d + 22} />
    </g>
  );
};

// 6) Zirveden önce: şarkı zaman çizelgesi + dopamin çubuğu
const Anticipation: Visual = ({ durationInFrames }) => {
  const head = useProgress(6, durationInFrames - 15);
  const peakAt = 0.72;
  const x0 = 90;
  const x1 = 810;
  const hx = x0 + (x1 - x0) * head;
  const peakX = x0 + (x1 - x0) * peakAt;
  // Dopamin zirveden önce yükselir
  const dop = Math.min(1, Math.max(0, (head - 0.3) / (peakAt - 0.3)));
  const bars = Array.from({ length: 36 }).map((_, i) => {
    const p = i / 35;
    const h = 20 + 120 * Math.exp(-((p - peakAt) ** 2) / 0.01) + 22 * Math.abs(Math.sin(i * 1.7));
    return { x: x0 + (x1 - x0) * p, h };
  });
  return (
    <g>
      <Paper />
      <rect x={60} y={300} width={780} height={6} fill={INK} />
      {bars.map((b, i) => (
        <rect key={i} x={b.x - 7} y={300 - b.h} width={14} height={b.h} rx={6} fill={b.x <= hx ? PINK : "#e6d6dc"} stroke={OUTLINE} strokeWidth={2} />
      ))}
      <g transform={place(peakX, 105, useAppear(10))}>
        <Chip x={0} y={0} text="ZİRVE" />
      </g>
      {/* Oynatma çubuğu */}
      <line x1={hx} y1={140} x2={hx} y2={320} stroke={RED} strokeWidth={6} />
      <circle cx={hx} cy={320} r={12} fill={RED} stroke={OUTLINE} strokeWidth={4} />
      {/* Dopamin göstergesi */}
      <g transform={place(0, 0)}>
        <text x={90} y={395} fontFamily={uiFont} fontWeight={800} fontSize={30} fill={INK}>
          DOPAMİN
        </text>
        <rect x={250} y={368} width={560} height={40} rx={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={254} y={372} width={552 * dop} height={32} rx={16} fill={DOPA} />
      </g>
      {dop > 0.5 && head < peakAt ? <Chip x={450} y={480} text="ÖNCEDEN YÜKSELİYOR!" dark /> : null}
      {head >= peakAt ? <Chip x={450} y={480} text="ÖNCEDEN YÜKSELDİ!" dark /> : null}
    </g>
  );
};

// Hap
const Pill: React.FC<{ x: number; y: number; s?: number; rotate?: number }> = ({ x, y, s = 1, rotate = 0 }) => (
  <g transform={place(x, y, s, rotate)}>
    <rect x={-60} y={-24} width={120} height={48} rx={24} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
    <path d="M 0 -24 L 36 -24 A 24 24 0 0 1 36 24 L 0 24 Z" fill={BLUE} stroke={OUTLINE} strokeWidth={5} />
  </g>
);

// 7) Dopamini engelleyen ilaç → ürperti zorlaşıyor
const PillBlock: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.4);
  const block = useAppear(d);
  const wob = useWave(30, 6);
  return (
    <g>
      <Paper />
      <Pill x={150} y={150} s={1.2} rotate={wob - 20} />
      <Brain x={450} y={300} scale={1.1} mood={block > 0.5 ? "confused" : "happy"} delay={2} />
      {/* Damlalar düşmeye çalışıyor */}
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 12) % 36) / 36;
        const y = 180 + t * 80;
        return block > 0.5 ? null : <Drop key={i} x={420 + i * 30} y={y} s={0.8} />;
      })}
      {/* Engel çarpısı */}
      <g transform={place(450, 300, block)} opacity={block > 0.05 ? 1 : 0}>
        <circle r={150} fill="none" stroke={RED} strokeWidth={14} />
        <line x1={-106} y1={106} x2={106} y2={-106} stroke={RED} strokeWidth={14} strokeLinecap="round" />
      </g>
      {/* Ürperti ölçeği */}
      <g transform={place(760, 290)}>
        <rect x={-30} y={-170} width={60} height={300} rx={30} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <rect x={-22} y={-162 + 284 * (0.15 + 0.6 * block)} width={44} height={284 * (0.85 - 0.6 * block)} rx={22} fill={PINK} />
        <text x={0} y={175} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
          ÜRPERTİ
        </text>
      </g>
      <Chip x={450} y={500} text="ÜRPERMEK ZORLAŞTI" dark delay={d + 14} />
    </g>
  );
};

// 8) Tetikleyiciler: beklenmedik nota, ses yükselmesi, solist
const Triggers: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const step = durationInFrames / 4;
  const vol = useProgress(step, step * 2);
  return (
    <g>
      <Paper />
      {/* Kart 1: beklenmedik nota */}
      <g transform={place(160, 250, useAppear(4))}>
        <rect x={-120} y={-150} width={240} height={300} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={-100} y1={-60 + i * 22} x2={100} y2={-60 + i * 22} stroke="#999" strokeWidth={3} />
        ))}
        <Note8 x={-60} y={-14} scale={0.9} color={INK} />
        <Note8 x={-10} y={-36} scale={0.9} color={INK} />
        <g transform={place(50, -70 + Math.sin(frame / 5) * 6)}>
          <Note8 x={0} y={0} scale={1.1} color={PINK} rotate={-15} />
        </g>
        <text x={0} y={110} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
          SÜRPRİZ NOTA
        </text>
      </g>
      {/* Kart 2: ses yükseliyor */}
      <g transform={place(450, 250, useAppear(Math.round(step)))}>
        <rect x={-120} y={-150} width={240} height={300} rx={18} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const h = (20 + i * 18) * Math.min(1, vol * 6 - i * 0.8 + 0.8);
          return <rect key={i} x={-90 + i * 32} y={60 - Math.max(0, h)} width={22} height={Math.max(0, h)} fill={i > 3 ? RED : TEAL} stroke={OUTLINE} strokeWidth={3} />;
        })}
        <text x={0} y={110} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={26} fill={INK}>
          SES YÜKSELİR
        </text>
      </g>
      {/* Kart 3: solist girişi */}
      <g transform={place(740, 250, useAppear(Math.round(step * 2)))}>
        <rect x={-120} y={-150} width={240} height={300} rx={18} fill="#3a2f4a" stroke={OUTLINE} strokeWidth={5} />
        <path d="M -70 -150 L 70 -150 L 100 80 L -100 80 Z" fill={YELLOW} opacity={0.35} />
        <g transform={place(0, 70, 0.55)}>
          <Listener x={0} y={0} headphones={false} mood="happy" shirt={PURPLE} />
        </g>
        <rect x={34} y={-40} width={12} height={60} fill={INK} transform="rotate(20 40 -10)" />
        <circle cx={30} cy={-46} r={12} fill="#888" stroke={OUTLINE} strokeWidth={3} />
        <text x={0} y={110} textAnchor="middle" fontFamily={uiFont} fontWeight={800} fontSize={26} fill="#fff">
          SOLİST GİRER
        </text>
      </g>
      <Chip x={450} y={480} text="BEKLENMEDİK AN" dark delay={Math.round(step * 3)} />
    </g>
  );
};

// Tüylü kedi benzeri hayvan
const FurryCat: React.FC<{ x: number; y: number; fluff: number }> = ({ x, y, fluff }) => {
  const spikes = Array.from({ length: 22 }).map((_, i) => {
    const a = (i / 22) * Math.PI * 2;
    const r1 = 78;
    const r2 = 78 + 8 + fluff * 26;
    return `${Math.cos(a) * r1},${Math.sin(a) * r1 * 0.8} ${Math.cos(a + 0.14) * r2},${Math.sin(a + 0.14) * r2 * 0.8} ${Math.cos(a + 0.28) * r1},${Math.sin(a + 0.28) * r1 * 0.8}`;
  });
  return (
    <g transform={place(x, y)}>
      {spikes.map((p, i) => (
        <polygon key={i} points={p} fill="#d98b4a" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
      ))}
      <ellipse rx={80} ry={64} fill="#e9a35f" stroke={OUTLINE} strokeWidth={5} />
      <circle cx={90} cy={-60} r={44} fill="#e9a35f" stroke={OUTLINE} strokeWidth={5} />
      <path d="M 60 -92 L 66 -130 L 88 -100 Z M 104 -100 L 124 -128 L 126 -88 Z" fill="#e9a35f" stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      <circle cx={80} cy={-64} r={6} fill={OUTLINE} />
      <circle cx={106} cy={-64} r={6} fill={OUTLINE} />
      <path d="M 86 -46 Q 93 -40 100 -46" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      <path d="M -78 0 Q -140 -20 -130 -80" fill="none" stroke={OUTLINE} strokeWidth={22} strokeLinecap="round" />
      <path d="M -78 0 Q -140 -20 -130 -80" fill="none" stroke="#e9a35f" strokeWidth={14} strokeLinecap="round" />
    </g>
  );
};

const Snowflake: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={place(x, y, s)} stroke="#9fd3ff" strokeWidth={5} strokeLinecap="round">
    {[0, 60, 120].map((r) => (
      <line key={r} x1={-16} y1={0} x2={16} y2={0} transform={`rotate(${r})`} />
    ))}
  </g>
);

// 9) Tüylü atalardan kalan refleks
const FurAncestor: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const fluff = 0.5 + 0.5 * Math.sin(frame / 10);
  const d = Math.round(durationInFrames * 0.45);
  return (
    <g>
      <rect width={900} height={560} fill="#e9f3ff" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const t = ((frame + i * 23) % 90) / 90;
        return <Snowflake key={i} x={40 + i * 70 + Math.sin(frame / 15 + i) * 10} y={-20 + t * 520} s={0.8} />;
      })}
      <FurryCat x={220} y={300} fluff={fluff} />
      <Chip x={220} y={470} text="TÜYLER KABARIR" delay={6} />
      <Arrow from={[420, 290]} to={[530, 290]} progress={useProgress(d - 12, d)} color={INK} />
      <ArmZoom x={690} y={280} r={120} bumps={useProgress(d, d + 25)} delay={d} />
      <Chip x={690} y={470} text="BİZDE: ÜRPERTİ" dark delay={d + 16} />
      <QuestionMark x={830} y={120} size={80} delay={d + 26} />
    </g>
  );
};

// 10) Yeniliğe açık kişiler
const Openness: Visual = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const d = Math.round(durationInFrames * 0.35);
  const open = useProgress(6, 30);
  return (
    <g>
      <Paper />
      <rect y={460} width={900} height={100} fill={FLOOR} stroke={OUTLINE} strokeWidth={5} />
      {/* Açılan kapı ve içinden ışık */}
      <g transform={place(640, 250)}>
        <rect x={-110} y={-200} width={220} height={410} fill={YELLOW} stroke={OUTLINE} strokeWidth={6} />
        <Sparkles points={[[-50, -120], [40, -60], [-20, 40], [60, 120]]} color="#fff" />
        <path d={`M -110 -200 L ${-110 + 220 * (1 - open * 0.75)} ${-200 + 20 * open} L ${-110 + 220 * (1 - open * 0.75)} ${210 - 20 * open} L -110 210 Z`} fill={PURPLE} stroke={OUTLINE} strokeWidth={6} strokeLinejoin="round" />
      </g>
      {/* Notalar kapıdan çıkıyor */}
      <FloatingNotes x={640} y={200} count={3} spread={150} />
      <Listener x={290} y={500} scale={1} mood="happy" shirt={PINK} delay={4} shiver={0.3} />
      <g transform={place(290, 150, useAppear(d), Math.sin(frame / 8) * 5)}>
        <circle r={38} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
        <rect x={-14} y={34} width={28} height={20} fill="#c9ced6" stroke={OUTLINE} strokeWidth={4} />
      </g>
      <Chip x={290} y={60} text="YENİLİĞE AÇIK" dark delay={d + 10} />
    </g>
  );
};

// 11) Senin şarkın hangisi?
const YourTurn: Visual = ({ durationInFrames }) => {
  const d = Math.round(durationInFrames * 0.3);
  const w = useWave(40, 4);
  return (
    <g>
      <Paper />
      <Listener x={260} y={520} scale={1.05} mood="wow" shiver={0.6} />
      <FloatingNotes x={260} y={170} count={4} spread={240} />
      {/* Yorum balonları */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={place(650, 120 + i * 130, useAppear(d + i * 10), i % 2 ? w : -w)}>
          <rect x={-170} y={-45} width={340} height={90} rx={22} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
          <path d="M -150 40 L -170 70 L -120 44 Z" fill="#fff" stroke={OUTLINE} strokeWidth={5} strokeLinejoin="round" />
          <Note8 x={-120} y={-2} scale={0.8} color={[PINK, BLUE, PURPLE][i]} />
          {[0, 1].map((k) => (
            <rect key={k} x={-80} y={-18 + k * 26} width={k ? 160 : 220} height={12} rx={6} fill="#d8d0d6" />
          ))}
        </g>
      ))}
      <QuestionMark x={480} y={110} size={100} delay={d + 30} />
      <Chip x={650} y={510} text="YORUMLARA YAZ!" dark delay={d + 36} />
    </g>
  );
};

export const visuals: Record<string, Visual> = {
  ChillsSong,
  FrissonWord,
  HowMany,
  BrainScan,
  RewardSystem,
  Anticipation,
  PillBlock,
  Triggers,
  FurAncestor,
  Openness,
  YourTurn,
};
