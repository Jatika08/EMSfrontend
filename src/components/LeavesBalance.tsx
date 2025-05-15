import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLeaveBalance } from "../hooks/UseLeaveBalance";

const getMonthName = (month: number) =>
  new Date(0, month).toLocaleString("default", { month: "long" });

export default function LeavesBalance() {
  const [viewType, setViewType] = useState<"month" | "year">("month");

  const [date, setDate] = useState(() => {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
  });

  // Dynamically determine month input
  const monthForQuery = viewType === "month" ? date.month : null;
  const { balance, isLoading, isError } = useLeaveBalance({
    month: monthForQuery,
    year: date.year,
  });

  const handleNext = () => {
    setDate((prev) => {
      if (viewType === "month") {
        const nextMonth = (prev.month + 1) % 12;
        const nextYear = prev.month === 11 ? prev.year + 1 : prev.year;
        return { month: nextMonth, year: nextYear };
      } else {
        return { ...prev, year: prev.year + 1 };
      }
    });
  };

  const handlePrev = () => {
    setDate((prev) => {
      if (viewType === "month") {
        const prevMonth = (prev.month - 1 + 12) % 12;
        const prevYear = prev.month === 0 ? prev.year - 1 : prev.year;
        return { month: prevMonth, year: prevYear };
      } else {
        return { ...prev, year: prev.year - 1 };
      }
    });
  };

  const isLoadingUI = (
    <div className="text-center text-stone-400">Loading leave balance...</div>
  );

  const isErrorUI = (
    <div className="text-center text-red-500">Error fetching data</div>
  );

  const displayUI = (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-stone-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-stone-400 mb-2">Casual Leave (CL)</h3>
        <p>Allocated: {balance?.clAllocated ?? 0}</p>
        <p>Taken: {balance?.cl ?? 0}</p>
        <p className="font-semibold text-green-400">
          Remaining: {(balance?.clAllocated ?? 0) - (balance?.cl ?? 0)}
        </p>
      </div>

      <div className="bg-stone-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-stone-400 mb-2">Planned Leave (PL)</h3>
        <p>Allocated: {balance?.plAllocated ?? 0}</p>
        <p>Taken: {balance?.pl ?? 0}</p>
        <p className="font-semibold text-green-400">
          Remaining: {(balance?.plAllocated ?? 0) - (balance?.pl ?? 0)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-xl rounded-3xl bg-gradient-to-br from-stone-950 to-stone-900 p-6 overflow-y-scroll shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] text-stone-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setViewType("month")}
            className={`px-4 py-1 rounded-lg ${
              viewType === "month"
                ? "bg-stone-700 text-white"
                : "bg-stone-800 text-stone-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setViewType("year")}
            className={`px-4 py-1 rounded-lg ${
              viewType === "year"
                ? "bg-stone-700 text-white"
                : "bg-stone-800 text-stone-400"
            }`}
          >
            Yearly
          </button>
        </div>

        <div className="flex items-center gap-4">
          <ChevronLeft onClick={handlePrev} className="cursor-pointer" />
          <span className="text-lg font-semibold">
            {viewType === "month"
              ? `${getMonthName(date.month)} ${date.year}`
              : date.year}
          </span>
          <ChevronRight onClick={handleNext} className="cursor-pointer" />
        </div>
      </div>

      {isLoading ? isLoadingUI : isError ? isErrorUI : displayUI}
    </div>
  );
}
