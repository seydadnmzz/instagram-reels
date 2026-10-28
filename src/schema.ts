import { z } from "zod";

export const categorySchema = z.enum(["tarih", "psikoloji", "bilim", "gundelik", "ilginc"]);

export const sceneSchema = z.object({
  // *yıldız* içindeki kelimeler vurgu rengiyle işaretlenir
  text: z.string(),
  // public/ altındaki yol ya da tam URL; yoksa renkli arka plan kullanılır
  image: z.string().optional(),
});

export const reelSchema = z.object({
  category: categorySchema,
  hook: z.string(),
  hookImage: z.string().optional(),
  scenes: z.array(sceneSchema).min(1),
  question: z.string(),
  handle: z.string().optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type ReelProps = z.infer<typeof reelSchema>;
