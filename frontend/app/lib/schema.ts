import { z } from "zod";

export const signInSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6, { message: "Password is required" }),
});

export const signUpSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, { message: "Password is required" }),
    confirmPassword: z.string().min(6, { message: "Confirm Password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
})

export const forgotPasswordSchema = z.object({
    email: z.string().email("invalid email address"),
});

export const workspaceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  color: z.string().min(3, "Color must be at least 3 characters"),
  description: z.string().optional(),
});

export type WorkspaceForm = z.infer<typeof workspaceSchema>;