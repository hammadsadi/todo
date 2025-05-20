import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string({ required_error: "User Email Required!" })
    .email("Invalid email format"),
  password: z
    .string({ required_error: "User Password is Required!" })
    .min(5, "Password Must be 5 Characters"),
});
