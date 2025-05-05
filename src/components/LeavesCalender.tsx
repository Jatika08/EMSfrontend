import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { segregatedLeaveData } from "../hooks/useLeaves";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function LeavesCalender({
  month,
  year,
  handleMonthChange,
}: {
  month: number;
  year: number;
  handleMonthChange: (val: number) => void;
}) {
  const firstDay = new Date(year, month, 1);
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const adjustedDaysInMonth = [...daysInMonth];
  if (isLeap) adjustedDaysInMonth[1] = 29;

  const day = firstDay.toLocaleString("en-US", { weekday: "short" });
  const firstDayNumber = dayNames.indexOf(day);

  console.log(dayNames.indexOf(day));

  let calendarBegin = 1;
  let previousMonthEnded = false;
  let daysInPreviousMonth = 0;

  if (firstDay.getDay() !== 1) {
    daysInPreviousMonth = adjustedDaysInMonth[(month - 1 + 12) % 12];
    calendarBegin = daysInPreviousMonth - ((firstDay.getDay() + 6) % 7) + 1;
  } else {
    previousMonthEnded = true;
  }

  let newMonthBegins = false;
  const calendarDays = [];

  for (let i = 0; i < 35; i++) {
    calendarDays.push({
      label: calendarBegin,
      isCurrentMonth: previousMonthEnded && !newMonthBegins,
    });

    if (!previousMonthEnded) {
      if (calendarBegin < daysInPreviousMonth) {
        calendarBegin++;
      } else {
        previousMonthEnded = true;
        calendarBegin = 1;
      }
    } else {
      if (calendarBegin < adjustedDaysInMonth[month]) {
        calendarBegin++;
      } else {
        calendarBegin = 1;
        newMonthBegins = true;
      }
    }
  }

  const monthLabel = firstDay.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-lg w-full text-stone-300 h-200">
      {" "}
      <div className="text-center mb-6">
        <div className="flex flex-row gap-1 font-semibold">
          <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300">
            {monthLabel}
          </h2>
          <div
            className="ml-auto bg-stone-800 rounded-md hover:bg-stone-600 w-8 h-8 flex items-center justify-center"
            onClick={() => handleMonthChange(-1)}
          >
            <ChevronLeft size={16} />
          </div>
          <div
            className="bg-stone-800 rounded-md  hover:bg-stone-600 w-8 h-8 flex items-center justify-center"
            onClick={() => handleMonthChange(1)}
          >
            <ChevronRight size={16} />
          </div>
          <div className="bg-stone-800 rounded-md  hover:bg-stone-600 w-8 h-8 flex items-center justify-center">
            <Maximize2 size={16} />
          </div>
        </div>
        <div className="grid grid-cols-7 mt-4 text-stone-500 text-sm">
          {dayNames.map((day, idx) => (
            <div key={idx} className="text-center">
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-[1px]">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col  text-sm transition-all p- h-32 overflow-hidden ${
              day.isCurrentMonth
                ? "bg-stone-700/40 text-stone-100 hover:bg-stone-600/50"
                : "text-stone-500"
            }`}
          >
            {day.label}
            <div className="">
              {day.isCurrentMonth && (
                <div className=" w-full h-full mt-1 flex flex-col gap-1 overflow-y-hidden text-xs text-stone-300 ">
                  {segregatedLeaveData[day.label - 1].map((leaves) => (
                    <div
                      className={`
                      h-5   px-1 items-center 
                      ${
                        leaves?.isStart
                          ? "rounded-l-md border-l-[2px] border-stone-300/20"
                          : ""
                      }
                                            ${
                                              leaves?.user_email
                                                ? "border-t-[2px] border-b-[2px] border-stone-300/20"
                                                : ""
                                            }

                      ${
                        leaves?.isEnd
                          ? "rounded-r-md border-r-[2px] border-stone-300/20"
                          : ""
                      }
                    `}
                      style={{
                        backgroundColor: leaves?.color,
                        visibility: leaves ? "visible" : "hidden",
                      }}
                    >
                      {/* {leaves?.user_email?.split("@")[0].replace(/\./g, " ")} */}
                      {(leaves?.isStart ||
                        (day.label + firstDayNumber - 1) % 7 === 0) &&
                        leaves.user_email?.split("@")[0].replace(/\./g, " ")}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeavesCalender;
