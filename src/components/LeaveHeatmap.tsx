import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useState } from "react";
import { addMonths, startOfMonth } from "date-fns";
import HeatCalender from "./subcomponents/HeatCalender";
// import { useLeavesQuery } from "../hooks/useLeaves";

export const LeaveHeatMap = () => {
  const [offset, setOffset] = useState(2);

  const getVisibleMonths = () => {
    const months: Date[] = [];
    const now = new Date();
    for (let i = -2; i <= 0; i++) {
      const date = addMonths(startOfMonth(now), offset + i);
      months.push(date);
    }
    return months;
  };

  const months = getVisibleMonths();
  console.log("Visible Months:", months);

  // const ThreeMonthQueryResults = months.map((date) => {
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   return useLeavesQuery({
  //     fromMonth: month + 1,
  //     fromYear: year,
  //     toMonth: month + 1,
  //     toYear: year,
  //   });
  // });

  return (
    <div className="flex flex-col gap-4 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-lg w-full text-stone-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300">
          Leaves Heatmap
        </h2>
        <div className="flex gap-2">
          <div
            onClick={() => setOffset((prev) => prev - 1)}
            className="bg-stone-800 hover:bg-stone-600 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer transition-colors"
          >
            <ChevronLeft size={16} />
          </div>

          <div
            onClick={() => setOffset(2)}
            className="bg-stone-800 hover:bg-stone-600 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer transition-colors"
          >
            <Home size={16} />
          </div>
          <div
            onClick={() => setOffset((prev) => prev + 1)}
            className="bg-stone-800 hover:bg-stone-600 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer transition-colors"
          >
            <ChevronRight size={16} />
          </div>
        </div>
      </div>

      {/* Heatmap Content */}
      <div className="flex flex-row gap-3 pb-1 h-full">
        {months.map((date) => (
          <HeatCalender key={date.toISOString()} date={date} />
        ))}
      </div>
    </div>
  );
};
