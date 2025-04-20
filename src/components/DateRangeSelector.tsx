import { useState } from "react";
import { DateSelector } from "./subcomponents/DateSelector";

export const DateRangeSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [type, setType] = useState<"leave" | "wfh">("leave");

  const handleSubmit = () => {
    console.log("Submitting:", { startDate, endDate, reason, type });
    // handle form submit logic
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl w-full px-4 py-6">
      <DateSelector startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>

      {/* Radio Buttons */}
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
            <span className="capitalize">{option === "leave" ? "Leave" : "Work From Home"}</span>
          </label>
        ))}
      </div>

      {/* Reason Input */}
      <input
        type="text"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Enter reason..."
        className="w-220 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-30 px-6 py-3 rounded-3xl bg-gradient-to-br from-stone-700 to-stone-900 text-white font-semibold shadow-md hover:brightness-110 transition-all"
      >
        Submit
      </button>
    </div>
  );
};
