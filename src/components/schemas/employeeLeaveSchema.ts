import { leaveEnum } from "@/utils/enums";
import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  type: z.enum([leaveEnum.LEAVE, leaveEnum.WORK_FROM_HOME], {
    errorMap: () => ({ message: "Please select a valid leave type" }),
  }),
  reason: z.string().min(1, "Can you at least provide a reason"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;