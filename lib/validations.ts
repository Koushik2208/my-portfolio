import { z } from "zod";

export const AddProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  url: z.union([z.string().url("Invalid URL"), z.literal("")]).optional(),
  github: z.union([z.string().url("Invalid URL"), z.literal("")]).optional(),
  techStack: z.array(z.string()).optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
});

export const UpdateProjectSchema = AddProjectSchema.partial().extend({
  name: z.string().min(1, "Project name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
});

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(6, "Password too short"),
});

export const SignUpSchema = z
  .object({
    name: z.string().min(2, "Name too short"),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z.string().min(8, "Password must be 8+ chars"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be 8+ chars"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const AddBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
});

export const UpdateBlogSchema = AddBlogSchema.partial().extend({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
});
