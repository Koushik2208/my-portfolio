import { z } from "zod";

export const AddProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  url: z.string().optional(),
  github: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
});
