import { useCurrentFrame } from "remotion";
import { INK, RED, slabFont, uiFont, YELLOW } from "../explainer/theme";
import { place, useAppear, useWave } from "./anim";

const OUTLINE = "#2b2b2b";

// Göz kırpan, hafifçe süzülen beyin maskotu
export const Brain: React.FC<{ x: number; y: number; scale?: number; delay?: number; mood?: "happy" | "confused" }> = ({
  x,
  y,
  scale = 1,
  delay = 0,
  mood = "happy",
}) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const float = useWave(70, 8);
  const blink = frame % 90 > 84 ? 0.15 : 1;
  return (
    <g transform={place(x, y + float, scale * appear)}>
      <path
        d="M -110 10 C -130 -60 -70 -110 -20 -95 C 10 -125 80 -110 95 -65 C 140 -50 135 20 100 40 C 95 85 30 100 0 80 C -40 105 -110 85 -110 10 Z"
        fill="#f59ac0"
        stroke={OUTLINE}
        strokeWidth={6}
      />
      <path d="M -60 -60 Q -40 -40 -55 -15 M 30 -80 Q 10 -55 35 -35 M 70 -10 Q 45 0 60 30 M -80 30 Q -50 30 -45 55" fill="none" stroke="#d96b98" strokeWidth={6} strokeLinecap="round" />
      <g transform={`translate(0 0) scale(1 ${blink})`}>
        <circle cx={-30} cy={0} r={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={30} cy={0} r={20} fill="#fff" stroke={OUTLINE} strokeWidth={5} />
        <circle cx={-24} cy={2} r={8} fill={OUTLINE} />
        <circle cx={36} cy={2} r={8} fill={OUTLINE} />
      </g>
      {mood === "happy" ? (
        <path d="M -18 38 Q 0 54 18 38" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      ) : (
        <path d="M -18 44 Q -6 36 4 44 Q 12 50 20 42" fill="none" stroke={OUTLINE} strokeWidth={5} strokeLinecap="round" />
      )}
    </g>
  );
};

// Düşünce balonu; içerik (0,0) merkezde çizilir
export const ThoughtBubble: React.FC<{ x: number; y: number; r?: number; delay?: number; children?: React.ReactNode }> = ({
  x,
  y,
  r = 50,
  delay = 0,
  children,
}) => {
  const appear = useAppear(delay);
  const float = useWave(50, 4);
  return (
    <g transform={place(x, y + float, appear)}>
      <circle cx={-r * 0.5} cy={r * 1.35} r={r * 0.14} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={-r * 0.25} cy={r * 1.05} r={r * 0.22} fill={YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <circle cx={0} cy={0} r={r} fill={YELLOW} stroke={OUTLINE} strokeWidth={5} />
      {children}
    </g>
  );
};

export const QuestionMark: React.FC<{ x: number; y: number; size?: number; delay?: number; color?: string }> = ({
  x,
  y,
  size = 90,
  delay = 0,
  color = YELLOW,
}) => {
  const appear = useAppear(delay);
  const tilt = useWave(40, 8);
  return (
    <text
      x={0}
      y={0}
      transform={place(x, y, appear, tilt)}
      fontFamily={uiFont}
      fontWeight={800}
      fontSize={size}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={color}
      stroke={OUTLINE}
      strokeWidth={size * 0.05}
      paintOrder="stroke"
    >
      ?
    </text>
  );
};

export const Sparkles: React.FC<{ points: [number, number][]; color?: string }> = ({ points, color = YELLOW }) => {
  const frame = useCurrentFrame();
  return (
    <g fill={color}>
      {points.map(([x, y], i) => {
        const s = 0.6 + 0.4 * Math.abs(Math.sin((frame + i * 13) / 12));
        return <path key={i} transform={place(x, y, s)} d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z" />;
      })}
    </g>
  );
};

// Atan kalp; beat=false ise durgun (ör. "kalp durdu" anı)
export const Heart: React.FC<{ x: number; y: number; size?: number; color?: string; beat?: boolean; delay?: number }> = ({
  x,
  y,
  size = 1,
  color = RED,
  beat = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const pulse = beat ? 1 + 0.12 * Math.max(0, Math.sin(frame / 4)) ** 8 : 1;
  return (
    <g transform={place(x, y, size * appear * pulse)}>
      <path d="M 0 30 C -60 -10 -40 -60 0 -30 C 40 -60 60 -10 0 30 Z" fill={color} stroke={OUTLINE} strokeWidth={5} />
      <path d="M -24 -24 Q -32 -14 -26 -4" stroke="rgba(255,255,255,0.7)" strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
};

export const Bottle: React.FC<{ x: number; y: number; color?: string; label?: string; scale?: number; delay?: number }> = ({
  x,
  y,
  color = "#8bb8d8",
  label,
  scale = 1,
  delay = 0,
}) => {
  const appear = useAppear(delay);
  return (
    <g transform={place(x, y, scale * appear)}>
      <rect x={-8} y={-92} width={16} height={18} fill="#7d5430" stroke={OUTLINE} strokeWidth={3} />
      <path d="M -10 -76 L 10 -76 L 22 -54 L 22 0 L -22 0 L -22 -54 Z" fill={color} stroke={OUTLINE} strokeWidth={4} />
      <rect x={-17} y={-44} width={34} height={28} fill="#fdf6e3" stroke={OUTLINE} strokeWidth={2} />
      {label ? (
        <text x={0} y={-26} fontFamily={uiFont} fontWeight={800} fontSize={10} textAnchor="middle" fill={INK}>
          {label}
        </text>
      ) : null}
    </g>
  );
};

export const Shelf: React.FC<{ x: number; y: number; width: number }> = ({ x, y, width }) => (
  <rect x={x} y={y} width={width} height={14} fill="#8a5a32" stroke={OUTLINE} strokeWidth={4} />
);

// Kâğıt ilan / gazete kupürü / tabela
export const Note: React.FC<{
  x: number;
  y: number;
  width?: number;
  title: string;
  text?: string;
  rotate?: number;
  delay?: number;
}> = ({ x, y, width = 420, title, text, rotate = -3, delay = 0 }) => {
  const appear = useAppear(delay);
  const h = text ? 230 : 120;
  return (
    <g transform={place(x, y, appear, rotate)}>
      <rect x={-width / 2 + 8} y={-h / 2 + 10} width={width} height={h} fill="rgba(0,0,0,0.2)" />
      <rect x={-width / 2} y={-h / 2} width={width} height={h} fill="#fbf6ea" stroke={OUTLINE} strokeWidth={4} />
      <text x={0} y={-h / 2 + 52} fontFamily={slabFont} fontWeight={800} fontSize={34} textAnchor="middle" fill={INK}>
        {title}
      </text>
      <rect x={-width / 2 + 26} y={-h / 2 + 70} width={width - 52} height={4} fill={INK} />
      {text ? (
        <text x={0} y={-h / 2 + 120} fontFamily={slabFont} fontWeight={700} fontSize={28} textAnchor="middle" fill="#a3262b">
          {text}
        </text>
      ) : null}
      {text
        ? [0, 1, 2].map((i) => (
            <rect key={i} x={-width / 2 + 40} y={-h / 2 + 150 + i * 22} width={width - 80 - i * 60} height={4} fill="#9a9a9a" />
          ))
        : null}
    </g>
  );
};

// Çizim içindeki koyu isim etiketi (ör. "Dr. John Cook Bennett")
export const NamePlate: React.FC<{ x: number; y: number; text: string; delay?: number }> = ({ x, y, text, delay = 0 }) => {
  const appear = useAppear(delay);
  const w = text.length * 13 + 40;
  return (
    <g transform={place(x, y, appear)}>
      <rect x={-w / 2} y={-22} width={w} height={44} rx={22} fill={INK} />
      <text x={0} y={8} fontFamily={uiFont} fontWeight={700} fontSize={22} textAnchor="middle" fill="#fff">
        {text}
      </text>
    </g>
  );
};

// Sarı zeminli küçük etiket (ör. "TEK ODA", "= AYNI MESAFE")
export const Chip: React.FC<{ x: number; y: number; text: string; dark?: boolean; delay?: number }> = ({
  x,
  y,
  text,
  dark = false,
  delay = 0,
}) => {
  const appear = useAppear(delay);
  const w = text.length * 22 + 48;
  return (
    <g transform={place(x, y, appear)}>
      <rect x={-w / 2} y={-28} width={w} height={56} rx={12} fill={dark ? INK : YELLOW} stroke={OUTLINE} strokeWidth={4} />
      <text x={0} y={11} fontFamily={uiFont} fontWeight={800} fontSize={31} textAnchor="middle" fill={dark ? "#fff" : INK}>
        {text}
      </text>
    </g>
  );
};

// Bir noktadan diğerine kendini çizen ok
export const Arrow: React.FC<{ from: [number, number]; to: [number, number]; progress: number; color?: string }> = ({
  from,
  to,
  progress,
  color = INK,
}) => {
  const [x1, y1] = from;
  const x2 = x1 + (to[0] - x1) * progress;
  const y2 = y1 + (to[1] - y1) * progress;
  const angle = (Math.atan2(to[1] - y1, to[0] - x1) * 180) / Math.PI;
  return (
    <g opacity={progress > 0 ? 1 : 0}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={8} strokeLinecap="round" />
      <path transform={place(x2, y2, 1, angle)} d="M 0 0 L -22 -14 L -22 14 Z" fill={color} />
    </g>
  );
};

// Büyük sayı / sembol (ör. "3", "×", "=")
export const BigText: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; delay?: number }> = ({
  x,
  y,
  text,
  size = 120,
  color = YELLOW,
  delay = 0,
}) => {
  const appear = useAppear(delay);
  return (
    <text
      transform={place(x, y, appear)}
      fontFamily={uiFont}
      fontWeight={800}
      fontSize={size}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={color}
      stroke={OUTLINE}
      strokeWidth={size * 0.06}
      paintOrder="stroke"
    >
      {text}
    </text>
  );
};
