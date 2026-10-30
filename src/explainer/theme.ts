import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadSlab } from "@remotion/google-fonts/RobotoSlab";
import type { Theme } from "./schema";

export const { fontFamily: uiFont } = loadPoppins("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

// Gazete, tabela, eski ilan gibi çizim içi yazılar için
export const { fontFamily: slabFont } = loadSlab("normal", {
  weights: ["700", "800"],
  subsets: ["latin", "latin-ext"],
});

export const YELLOW = "#FFD43B";
export const RED = "#E03A3E";
export const INK = "#22252b";

// Klasik görünüm: koyu zemin + çerçeveli kart (kapı eşiği / ketçap videoları)
export const THEMES: Record<
  "lab" | "parchment",
  { bg: string; panelFill: string; panelBorder: string; panelInner: string }
> = {
  lab: { bg: "#0e1626", panelFill: "#f3ead8", panelBorder: "#22385a", panelInner: "#1a2c48" },
  parchment: { bg: "#1f1611", panelFill: "#efe2c4", panelBorder: "#c9b083", panelInner: "#8a6f45" },
};

// Renkli görünüm: degrade zemin, yüzen şekiller, beyaz kart, başlık etiketi, ilerleme çubuğu
export const POP_THEMES: Record<"mor" | "turkuaz" | "turuncu" | "pembe" | "gece" | "gri", { top: string; bottom: string; accent: string; ink: string }> = {
  mor: { top: "#5b3df5", bottom: "#c03bd6", accent: "#5cf2c2", ink: "#4a2ad1" },
  turkuaz: { top: "#0f8fb3", bottom: "#17c3a5", accent: "#ffd43b", ink: "#0b6f8c" },
  turuncu: { top: "#ff6a3d", bottom: "#ffaa33", accent: "#2ee6d6", ink: "#d9451c" },
  pembe: { top: "#ff4f8b", bottom: "#ff8a5c", accent: "#fff15c", ink: "#d92e6b" },
  // Koyu zemin; vurgular pembe temayla aynı
  gece: { top: "#2a1238", bottom: "#0e0a18", accent: "#fff15c", ink: "#d92e6b" },
  // Gri degrade zemin; vurgular mor temayla aynı
  gri: { top: "#4b4f58", bottom: "#80858f", accent: "#5cf2c2", ink: "#4a2ad1" },
};

export const isPop = (theme: Theme): theme is keyof typeof POP_THEMES => theme in POP_THEMES;
