import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Calendar } from "lucide-react";
import {
  EmployeeFormData,
  employeeSchema,
} from "./schemas/employeeApprovalSchema";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useToast } from "../contexts/CustomToast";
import { useState } from "react";
import queryClient from "../utils/queryClient";

export const AddEmployeePage = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const showToast = useToast();

  const addEmployee = async (data: EmployeeFormData) => {
    const response = await axiosInstance.post("/action", data);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: (data) => {
      showToast("Employee added successfully!");
      console.log("Response:", data);
      setShowOtpBox(true);
      setShowOtp(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      showToast("Failed to add employee");
      console.error("Error adding employee:", error);
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    console.log("Adding Employee:", data);
    mutation.mutate(data);
  };

  return (
    <div className="w-full bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
      <div className="w-full rounded-3xl p-10 flex flex-col gap-8 text-stone-200">
        {!showOtpBox ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
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

            <div className="relative">
              <Calendar
                className="absolute left-4 top-3.5 text-stone-500"
                size={20}
              />
              <input
                type="date"
                {...register("date_of_birth")}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-800/60 border border-stone-700 text-base text-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-600"
              />
              {errors.date_of_birth && (
                <p className="text-red-400 text-sm mt-1 ml-1">
                  {errors.date_of_birth.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-stone-700 to-stone-600 text-white font-semibold text-base hover:brightness-110 transition-all"
              >
                Add Employee
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4 text-center">
            <p className="text-lg font-medium text-stone-300">
              Email:{" "}
              <span className="font-mono tracking-widest">
                {mutation?.data?.email}
              </span>
            </p>
            <p className="text-lg font-medium text-stone-300">
              OTP:{" "}
              <span className="font-mono tracking-widest">
                {showOtp ? mutation?.data?.temporary_token : "******"}
              </span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowOtp(!showOtp)}
                className="rounded-xl p-2 bg-stone-800/60 border border-stone-700 text-base text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
              >
                {showOtp ? "Hide" : "Show"}
              </button>
              <button
                onClick={() => {
                  setShowOtpBox(false);
                  onClose()
                  reset();
                }}
                className="rounded-xl p-2 bg-stone-800/60 border border-stone-700 text-base text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
