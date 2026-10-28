import { useProgress } from "./anim";

const OUTLINE = "#2b2b2b";

type Props = {
  // Odanın sol üst köşesi ve boyutu (SVG birimi)
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  wall?: string;
  stripe?: string;
  floor?: string;
  window?: "night" | "day" | false;
  windowX?: number;
  picture?: boolean;
  pictureX?: number;
  children?: React.ReactNode;
};

// Çizgili duvar kâğıdı, zemin, isteğe bağlı pencere ve tablo
export const Room: React.FC<Props> = ({
  x = 0,
  y = 0,
  width = 900,
  height = 560,
  wall = "#f4ecd9",
  stripe = "#ebe0c7",
  floor = "#c98f55",
  window = "night",
  windowX = 0.68,
  picture = true,
  pictureX = 0.18,
  children,
}) => {
  const floorY = y + height - 40;
  const stripes = Math.ceil(width / 46);
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={wall} />
      {Array.from({ length: stripes }).map((_, i) => (
        <rect key={i} x={x + i * 46 + 18} y={y} width={14} height={height - 40} fill={stripe} />
      ))}
      <rect x={x} y={floorY} width={width} height={40} fill={floor} stroke={OUTLINE} strokeWidth={4} />
      <rect x={x} y={floorY - 10} width={width} height={10} fill="#e2d3b3" />
      {picture ? <Picture x={x + width * pictureX} y={y + 120} /> : null}
      {window ? <Window x={x + width * windowX} y={y + 90} kind={window} /> : null}
      {children}
    </g>
  );
};

export const Picture: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={130} height={96} fill="#fff" stroke="#8a5a32" strokeWidth={8} />
    <path d="M 12 84 L 52 38 L 78 66 L 92 52 L 120 84 Z" fill="#7fb3d5" />
    <circle cx={100} cy={26} r={10} fill="#f6c343" />
  </g>
);

export const Window: React.FC<{ x: number; y: number; kind: "night" | "day" }> = ({ x, y, kind }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={170} height={130} fill={kind === "night" ? "#1d2c4f" : "#9fd3f2"} stroke="#8a5a32" strokeWidth={8} />
    <path d="M 85 0 L 85 130 M 0 65 L 170 65" stroke="#8a5a32" strokeWidth={6} />
    {kind === "night" ? (
      <g fill="#f6e7a1">
        <path d="M 130 22 A 18 18 0 1 0 146 50 A 14 14 0 1 1 130 22 Z" />
        <circle cx={30} cy={30} r={2.5} />
        <circle cx={60} cy={95} r={2.5} />
        <circle cx={115} cy={100} r={2.5} />
      </g>
    ) : (
      <circle cx={130} cy={36} r={16} fill="#f6c343" />
    )}
    <rect x={-10} y={130} width={190} height={10} fill="#8a5a32" />
  </g>
);

// open: 0 kapalı → 1 tamamen açık; openFrom/openTo verilirse kendi kendine açılır
export const Door: React.FC<{
  x: number;
  floorY: number;
  open?: number;
  openFrom?: number;
  openTo?: number;
}> = ({ x, floorY, open, openFrom = 0, openTo = 0 }) => {
  const anim = useProgress(openFrom, openTo);
  const o = open ?? (openTo > openFrom ? anim : 0);
  const w = 120;
  const h = 210;
  return (
    <g transform={`translate(${x} ${floorY - h})`}>
      <rect x={-8} y={-8} width={w + 16} height={h + 8} fill="#d8c6a2" stroke={OUTLINE} strokeWidth={4} />
      <rect x={0} y={0} width={w} height={h} fill="#3d4352" />
      <g transform={`scale(${1 - o * 0.78} 1)`}>
        <rect x={0} y={0} width={w} height={h} fill="#c27a3f" stroke={OUTLINE} strokeWidth={4} />
        <circle cx={w - 16} cy={h / 2} r={6} fill="#f6c343" stroke={OUTLINE} strokeWidth={3} />
      </g>
    </g>
  );
};

export const Table: React.FC<{ x: number; floorY: number; width?: number; children?: React.ReactNode }> = ({
  x,
  floorY,
  width = 140,
  children,
}) => (
  <g transform={`translate(${x} ${floorY})`}>
    <rect x={-width / 2} y={-78} width={width} height={14} rx={4} fill="#9a6a3c" stroke={OUTLINE} strokeWidth={4} />
    <rect x={-width / 2 + 10} y={-66} width={10} height={66} fill="#7d5430" stroke={OUTLINE} strokeWidth={3} />
    <rect x={width / 2 - 20} y={-66} width={10} height={66} fill="#7d5430" stroke={OUTLINE} strokeWidth={3} />
    <g transform="translate(0 -78)">{children}</g>
  </g>
);
