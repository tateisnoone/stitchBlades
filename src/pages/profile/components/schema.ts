import { z } from "zod";

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long." })
    .max(30, { message: "Full name cannot exceed 30 characters." }),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(15, { message: "Username cannot exceed 15 characters." }),

  gender: z.string().nullable(),
  avatar_url: z.string().optional(),
  birthday: z.date().nullable(),
});
