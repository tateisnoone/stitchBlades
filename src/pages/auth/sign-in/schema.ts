import { z } from "zod";
export const registerFormSchema = z.object({
  email: z.string().email({ message: "Enter valid e-mail" }),
  password: z.string(),
});
