import { loadFont } from "@remotion/google-fonts/Montserrat";
import { staticFile } from "remotion";
import type { Category } from "./schema";

export const { fontFamily } = loadFont("normal", {
  weights: ["600", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const CATEGORY_THEME: Record<
  Category,
  { label: string; accent: string; bgFrom: string; bgTo: string }
> = {
  tarih: { label: "TARİH", accent: "#F5B841", bgFrom: "#3a240c", bgTo: "#0b0704" },
  psikoloji: { label: "PSİKOLOJİ", accent: "#B79CFF", bgFrom: "#24164a", bgTo: "#07050f" },
  bilim: { label: "BİLİM & DOĞA", accent: "#4FD8E8", bgFrom: "#0a3a42", bgTo: "#030b0d" },
  gundelik: { label: "GÜNDELİK HAYAT", accent: "#FF8A5C", bgFrom: "#3d1a0c", bgTo: "#0d0604" },
};

export const resolveSrc = (src: string) =>
  /^https?:\/\//.test(src) ? src : staticFile(src);
