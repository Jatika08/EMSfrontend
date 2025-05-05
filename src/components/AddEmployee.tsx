import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Calendar } from "lucide-react";
import {
  EmployeeFormData,
  employeeSchema,
} from "./schemas/employeeApprovalSchema";

export const AddEmployeePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = (data: EmployeeFormData) => {
    console.log("Adding Employee:", data);
    // Add employee logic
  };

  return (
    <div className="w-full bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
      <div className="w-full rounded-3xl p-10 flex flex-col gap-8 text-stone-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          {/* Name Field */}
          <div className="relative">
            <User
              className="absolute left-4 top-3.5 text-stone-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-800/60 border border-stone-700 text-base text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-3.5 text-stone-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-800/60 border border-stone-700 text-base text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* DOB Field */}
          <div className="relative">
            <Calendar
              className="absolute left-4 top-3.5 text-stone-500"
              size={20}
            />
            <input
              type="date"
              {...register("dob")}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-800/60 border border-stone-700 text-base text-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-600"
            />
            {errors.dob && (
              <p className="text-red-400 text-sm mt-1 ml-1">
                {errors.dob.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-stone-700 to-stone-600 text-white font-semibold text-base hover:brightness-110 transition-all"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
