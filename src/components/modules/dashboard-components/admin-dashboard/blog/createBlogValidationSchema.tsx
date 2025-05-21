import { z } from "zod";

export const createBlogValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  image: z.any(),
});
