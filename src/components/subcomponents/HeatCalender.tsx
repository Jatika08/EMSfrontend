import { useMemo, useState } from "react";
import { useLeavesQuery } from "../../hooks/useLeaves";
import {
  eachDayOfInterval,
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  getDay,
} from "date-fns";
import { useSearchParams } from "react-router-dom";

const HeatCalender = ({ date }) => {
  const [searchParams] = useSearchParams();

  const selectedEmployee = searchParams.get("employeeId") || "";

  const [hoveredDay, setHoveredDay] = useState({
    date: null,
    leavesCount: 0,
    leaves: {},
  });

  const { segregatedLeaves, isFetching } = useLeavesQuery({
    id: selectedEmployee,
    fromMonth: new Date(date).getMonth() + 1,
    fromYear: new Date(date).getFullYear(),
    toMonth: new Date(date).getMonth() + 1,
    toYear: new Date(date).getFullYear(),
  });

  const segregatedLeavesFiltered = useMemo(() => {
    return segregatedLeaves.map((day) => day.filter((leave) => leave.leave_id));
  }, [segregatedLeaves]);

  const handleMouseEnter = (day) => {
    setHoveredDay({
      date: day.date,
      leavesCount: segregatedLeaves[new Date(day.date).getDate()]?.length,
      leaves:
        (segregatedLeaves[new Date(day.date).getDate()] || []).filter(
          (leave) => leave.leave_id
        ) || {},
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay({ date: null, leavesCount: 0, leaves: {} });
  };

  function getMonthDatesWithPadding(date: string): ({ date: string } | {})[] {
    const monthStart = startOfMonth(parseISO(date));
    const monthEnd = endOfMonth(parseISO(date));

    const days = eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
    });

    let weekdayOfFirstDay = getDay(monthStart);

    if (weekdayOfFirstDay === 0) weekdayOfFirstDay = 7;

    const padding = Array(weekdayOfFirstDay - 1).fill({});
    const endPadding = Array(42 - (days.length + padding.length)).fill({});

    const dates = days.map((day) => ({
      date: format(day, "yyyy-MM-dd"),
    }));

    return [...padding, ...dates, ...endPadding];
  }

  const calendar = getMonthDatesWithPadding(date.toISOString());

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  console.log("Leaves Data:", segregatedLeaves);

  return (
    <div className="relative h-110 w-full">
      <div className="absolute inset-0 z-0 blur-xl pointer-events-none">
        <div className="h-full w-full bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col text-stone-300">
          <h3 className="text-xl h-10 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300 tracking-wide"></h3>

          <div className="grid grid-cols-7 gap-[1px] mb-[1px] text-sm font-medium text-stone-500">
            {days.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-stone-700/10 h-12 text-stone-400"
              ></div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-[1px]">
            {calendar.map((day, index) => (
              <div
                key={index}
                className={`flex items-center justify-center text-sm h-12 transition-all duration-200 ${
                  day.date ? "text-stone-100 hover:brightness-110" : ""
                }`}
                style={
                  day.date
                    ? {
                        backgroundColor: `hsl(0, 0%, ${
                          8 +
                          segregatedLeavesFiltered?.[
                            new Date(day.date).getDate()
                          ]?.length *
                            0.7 *
                            30
                        }%)`,
                      }
                    : {}
                }
              >
                <span className="font-medium text-stone-400">
                  {/* {day.date ? new Date(day.date).getDate() : ""} {day.leaves} */}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top calendar */}
      <div className="relative z-10 h-full w-full bg-gradient-to-br from-stone-800/10 to-stone-900/20 rounded-3xl border border-stone-700/30 p-6  backdrop-blur-xl flex flex-col text-stone-300">
        <h2 className="text-xl h-10 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-stone-300 to-stone-600 tracking-wide">
          {format(date, "MMMM yyyy")}
        </h2>

        <div className="grid grid-cols-7 gap-[1px] mb-[1px] text-sm font-medium text-stone-500">
          {days.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-stone-800/10 h-12 text-stone-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-[1px]">
          {calendar.map((day, index) => (
            <div
              key={index}
              className={`flex items-center justify-center text-sm h-12 transition-all duration-200 ${
                day.date
                  ? "text-stone-100 hover:brightness-140 bg-stone-800/10 rounded-md"
                  : ""
              }`}
              onMouseEnter={() => day.date && handleMouseEnter(day)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex  flex-col gap-1 items-center font-medium text-stone-400">
                {day.date ? new Date(day.date).getDate() : ""}
                <div
                  className={`rounded-full w-[5px] h-[5px] ${
                    day.date && day.isHoliday < 3 ? "bg-stone-100" : ""
                  }`}
                ></div>
              </div>
              {hoveredDay.date === day.date && (
                <div className="fixed flex flex-col gap-2 z-[1000] bottom-[-32px] left-0 bg-stone-900 text-white text-xs p-2 rounded-xl shadow-lg whitespace-nowrap">
                  <div>{format(new Date(day.date), "do MMMM, yyyy")}</div>
                  <div>Total leaves: {hoveredDay.leavesCount}</div>
                  {hoveredDay.leavesCount > 0 && (
                    <div className="flex flex-col gap-1">
                      {hoveredDay.leaves.map((leave) => (
                        <div
                          key={leave.leave_id}
                          className="flex items-center gap-2"
                        >
                          <div className="flex flex-row  items-center justify-center gap-2 p-1 px-2 bg-stone-800 rounded-xl">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                leave.isWfh
                                  ? "bg-blue-500"
                                  : leave.isCl
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                            <div className="text-center">{leave.email}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HeatCalender;
