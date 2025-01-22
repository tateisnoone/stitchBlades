import { z } from "zod";

export const createFormSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().min(3).max(500),
  category: z.string().min(1, "Category is required."),
  image_url: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image file is required." }),
});
