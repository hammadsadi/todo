import { z } from "zod";

export const RegisterValidationSchema = z.object({
  email: z
    .string({ required_error: "User Email Required!" })
    .email("Invalid email format"),
  password: z
    .string({ required_error: "User Password is Required!" })
    .min(5, "Password Must be 5 Characters"),
  name: z.string({ required_error: "Name is Required!" }),
  phoneNumber: z.string({ required_error: "Phone Number is Required!" }),
});
