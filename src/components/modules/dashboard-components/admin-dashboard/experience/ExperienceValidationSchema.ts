import { z } from "zod";

export const experienceValidationSchema = z.object({
  description: z.string({ required_error: "Description Required!" }),
  title: z.string({ required_error: "Titleis Required!" }),
});
