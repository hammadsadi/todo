import { z } from "zod";

export const contactValidationSchema = z.object({
  email: z
    .string({ required_error: "User Email Required!" })
    .email("Invalid email format"),
  description: z
    .string({ required_error: "Details is Required!" })
    .min(20, "Details Must be 20 Characters"),
  subject: z
    .string({ required_error: "Subject is Required!" })
    .min(10, "Details Must be 10 Characters"),
});
