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

export const THEMES: Record<
  Theme,
  { bg: string; panelFill: string; panelBorder: string; panelInner: string }
> = {
  lab: { bg: "#0e1626", panelFill: "#f3ead8", panelBorder: "#22385a", panelInner: "#1a2c48" },
  parchment: { bg: "#1f1611", panelFill: "#efe2c4", panelBorder: "#c9b083", panelInner: "#8a6f45" },
};
