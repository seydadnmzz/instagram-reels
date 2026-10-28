import { z } from "zod";

// lab/parchment: klasik koyu zemin + çerçeveli kart; diğerleri: renkli degrade görünüm
export const themeSchema = z.enum(["lab", "parchment", "mor", "turkuaz", "turuncu", "pembe"]);

export const explainerSceneSchema = z.object({
  // Üst başlık; *yıldız* içindeki kısım sarı kutuyla vurgulanır
  headline: z.string(),
  // Başlığın altındaki kırmızı etiket (ör. "NOTRE DAME ÜNİV. · 2011")
  tag: z.string().optional(),
  // src/episodes/current.tsx içindeki çizim bileşeninin adı
  visual: z.string(),
  // false ise çizim çerçevesiz, serbest durur
  panel: z.boolean().optional(),
  startFrame: z.number(),
  durationInFrames: z.number(),
});

export const captionWordSchema = z.object({
  text: z.string(),
  highlight: z.boolean(),
  start: z.number(),
  end: z.number(),
});

export const explainerSchema = z.object({
  theme: themeSchema,
  scenes: z.array(explainerSceneSchema).min(1),
  words: z.array(captionWordSchema),
  narration: z.string().optional(),
  durationInFrames: z.number(),
});

export type Theme = z.infer<typeof themeSchema>;
export type ExplainerScene = z.infer<typeof explainerSceneSchema>;
export type CaptionWord = z.infer<typeof captionWordSchema>;
export type ExplainerProps = z.infer<typeof explainerSchema>;
