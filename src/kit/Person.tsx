import { useCurrentFrame } from "remotion";
import { place, useAppear } from "./anim";

const OUTLINE = "#2b2b2b";

type Props = {
  // Ayakların ortası (SVG koordinatı); figür ~210 birim boyunda
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  pants?: string;
  skin?: string;
  hair?: string;
  hat?: "none" | "top" | "bowler" | "cap";
  mustache?: boolean;
  glasses?: boolean;
  facing?: "left" | "right";
  walking?: boolean;
  // Yürürken saniyede kat edilen yatay yol (SVG birimi / kare)
  walkSpeed?: number;
  // Elinde tuttuğu nesne; (0,0) sağ elin konumudur
  holding?: React.ReactNode;
  // Kolunu kaldırıp bir şey gösterme / sunma pozu
  presenting?: boolean;
  delay?: number;
};

export const Person: React.FC<Props> = ({
  x,
  y,
  scale = 1,
  shirt = "#3fb4a0",
  pants = "#2f3f63",
  skin = "#f2c79a",
  hair = "#4a2f1d",
  hat = "none",
  mustache = false,
  glasses = false,
  facing = "right",
  walking = false,
  walkSpeed = 0,
  holding,
  presenting = false,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const appear = useAppear(delay);
  const t = Math.max(0, frame - delay);
  const swing = walking ? Math.sin(t / 4.5) * 24 : 0;
  const bob = walking ? Math.abs(Math.sin(t / 4.5)) * -4 : 0;
  const dx = walking ? t * walkSpeed * (facing === "right" ? 1 : -1) : 0;
  const flip = facing === "left" ? -1 : 1;

  return (
    <g transform={place(x + dx, y + bob, scale * appear)} opacity={Math.min(1, appear * 1.5)}>
      <g transform={`scale(${flip} 1)`}>
        {/* Gölge */}
        <ellipse cx={0} cy={2} rx={34} ry={7} fill="rgba(0,0,0,0.18)" />
        {/* Bacaklar */}
        <g transform={`rotate(${swing} 0 -78)`}>
          <rect x={-16} y={-80} width={15} height={78} rx={6} fill={pants} stroke={OUTLINE} strokeWidth={4} />
          <rect x={-22} y={-8} width={24} height={10} rx={5} fill={OUTLINE} />
        </g>
        <g transform={`rotate(${-swing} 0 -78)`}>
          <rect x={1} y={-80} width={15} height={78} rx={6} fill={pants} stroke={OUTLINE} strokeWidth={4} />
          <rect x={-1} y={-8} width={24} height={10} rx={5} fill={OUTLINE} />
        </g>
        {/* Arka kol */}
        <g transform={`rotate(${-swing * 0.8} -4 -142)`}>
          <rect x={-12} y={-146} width={14} height={62} rx={7} fill={shirt} stroke={OUTLINE} strokeWidth={4} />
        </g>
        {/* Gövde */}
        <rect x={-28} y={-152} width={56} height={80} rx={16} fill={shirt} stroke={OUTLINE} strokeWidth={4} />
        {/* Ön kol + eldeki nesne */}
        <g transform={`rotate(${presenting ? -70 : swing * 0.8} 6 -142)`}>
          <rect x={-1} y={-146} width={14} height={62} rx={7} fill={shirt} stroke={OUTLINE} strokeWidth={4} />
          <circle cx={6} cy={-84} r={8} fill={skin} stroke={OUTLINE} strokeWidth={4} />
          {holding ? (
            <g transform={`translate(6 -84) rotate(${presenting ? 70 : -swing * 0.8})`}>{holding}</g>
          ) : null}
        </g>
        {/* Boyun + kafa */}
        <rect x={-7} y={-162} width={14} height={14} fill={skin} />
        <circle cx={0} cy={-190} r={32} fill={skin} stroke={OUTLINE} strokeWidth={4} />
        {hat === "none" || hat === "cap" ? (
          <path d="M -32 -194 Q -30 -228 0 -226 Q 30 -228 32 -196 Q 14 -210 -6 -206 Q -22 -204 -32 -194 Z" fill={hair} stroke={OUTLINE} strokeWidth={4} />
        ) : null}
        {/* Yüz (sağa bakar) */}
        <circle cx={12} cy={-192} r={4} fill={OUTLINE} />
        <circle cx={-4} cy={-192} r={4} fill={OUTLINE} />
        {glasses ? (
          <g fill="none" stroke={OUTLINE} strokeWidth={3}>
            <circle cx={12} cy={-192} r={9} />
            <circle cx={-6} cy={-192} r={9} />
            <path d="M 3 -192 L -1 -192" />
          </g>
        ) : null}
        {mustache ? (
          <path d="M -6 -174 Q 6 -184 18 -174 Q 6 -178 -6 -174 Z" fill={hair} stroke={OUTLINE} strokeWidth={3} />
        ) : (
          <path d="M 0 -174 Q 8 -168 16 -174" fill="none" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
        )}
        {hat === "top" ? (
          <g fill="#1f1f24" stroke={OUTLINE} strokeWidth={4}>
            <rect x={-40} y={-222} width={80} height={10} rx={4} />
            <rect x={-26} y={-280} width={52} height={60} rx={4} />
            <rect x={-26} y={-236} width={52} height={10} fill="#7a1f24" />
          </g>
        ) : null}
        {hat === "bowler" ? (
          <g fill="#4a3426" stroke={OUTLINE} strokeWidth={4}>
            <rect x={-42} y={-220} width={84} height={10} rx={5} />
            <path d="M -28 -214 Q -28 -256 0 -256 Q 28 -256 28 -214 Z" />
          </g>
        ) : null}
        {hat === "cap" ? (
          <g fill={shirt} stroke={OUTLINE} strokeWidth={4}>
            <path d="M -32 -204 Q -30 -236 0 -236 Q 30 -236 32 -204 Z" />
            <rect x={14} y={-210} width={34} height={9} rx={4} />
          </g>
        ) : null}
      </g>
    </g>
  );
};
