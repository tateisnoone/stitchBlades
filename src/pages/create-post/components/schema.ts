import { z } from "zod";

export const createFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long." })
    .max(500, { message: "Description cannot exceed 500 characters." }),
  category: z
    .string()
    .min(1, { message: "Category is required. Please select a category." }),
  image_url: z
    .instanceof(File, { message: "A valid image file is required." })
    .refine((file) => file.size > 0, {
      message: "Image file cannot be empty.",
    }),
});
