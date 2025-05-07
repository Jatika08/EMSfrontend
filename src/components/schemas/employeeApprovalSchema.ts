import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  date_of_birth: z.string().min(1, "Date of Birth is required"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
