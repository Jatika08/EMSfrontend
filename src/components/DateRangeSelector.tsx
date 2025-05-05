import { useState } from "react";
import { DateSelector } from "./subcomponents/DateSelector";
import { CalendarRange, ClipboardEdit, Briefcase } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../contexts/CustomToast";

export const DateRangeSelector = ({ onClose }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [type, setType] = useState<"leave" | "wfh">("leave");
  const showToast = useToast();

  const submitLeaveRequest = async (data: {
    startDate: Date;
    endDate: Date;
    reason: string;
    type: "leave" | "wfh";
  }) => {
    const response = await axiosInstance.post("/leaves", {
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
      type: data.type,
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitLeaveRequest,
    onSuccess: (data) => {
      console.log("Success:", data);
      showToast(
        `Leave request submitted successfully! from ${data.startDate} to ${data.endDate}`
      );
    },
    onError: (error) => {
      console.error("Error:", error);
      showToast(`Leave request failed.`);
    },
    onSettled: () => {
      setStartDate(new Date());
      setEndDate(new Date());
      setReason("");
      setType("leave");
      onClose();
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      startDate,
      endDate,
      reason,
      type,
    });
  };

  return (
    <div className="flex flex-col gap-8 h-150  w-full px-6 py-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-700/30 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] mt-2 overflow-y-scroll">
      {/* Date Selection */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <CalendarRange className="text-stone-400" size={20} />
          <h2 className="text-lg font-semibold text-stone-300">
            Select Date Range
          </h2>
        </div>
        <DateSelector
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>

      {/* Type Selection */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-1">
          <Briefcase className="text-stone-400" size={20} />
          <h2 className="text-lg font-semibold text-stone-300">Select Type</h2>
        </div>
        <div className="flex gap-4">
          {["leave", "wfh"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 px-5 py-3 rounded-3xl cursor-pointer border transition-all
                ${
                  type === option
                    ? "bg-gradient-to-br from-stone-700 to-stone-900 text-white border-stone-600"
                    : "bg-gradient-to-br from-stone-800/80 to-stone-900/80 text-stone-400 border-stone-700/30"
                }`}
            >
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={() => setType(option as "leave" | "wfh")}
                className="hidden"
              />
              <span className="capitalize">
                {option === "leave" ? "Leave" : "Work From Home"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reason Input */}
      <div className="flex flex-col gap-2 w-220">
        <div className="flex items-center gap-3 mb-1">
          <ClipboardEdit className="text-stone-400" size={20} />
          <h2 className="text-lg font-semibold text-stone-300">Reason</h2>
        </div>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason..."
          className="w-full bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          disabled={mutation.isPending}
          onClick={handleSubmit}
          className={`w-fit px-6 py-3 rounded-3xl font-semibold shadow-md transition-all
    ${
      mutation.isPending
        ? "bg-gray-500 text-white cursor-not-allowed opacity-70"
        : "bg-gradient-to-br from-stone-700 to-stone-900 text-white hover:brightness-110"
    }`}
        >
          {mutation.isPending ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
};
