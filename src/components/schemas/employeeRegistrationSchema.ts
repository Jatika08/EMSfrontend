import { z } from "zod";

export const employeeRegistrationSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    otp: z
      .string()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d+$/, "OTP must contain only numbers"),
    dateOfBirth: z.string(),
    fullName: z.string().min(1, "Enter your name"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type EmployeeRegistrationFormData = z.infer<typeof employeeRegistrationSchema>;