import { z } from "zod";

export const createProjectValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  image: z.any().optional(),
  clientRepository: z.string().url("Must be a valid URL"),
  serverRepository: z.string().url("Must be a valid URL"),
  liveLink: z.string().url("Must be a valid URL"),
  installation: z.string().min(1, "Installation steps required"),
});
