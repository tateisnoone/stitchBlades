import { z } from "zod";
export const registerFormSchema = z.object({
  email: z.string().email({ message: "invalid-email" }),
  password: z.string(),
  confirm_password: z.string(),
});
