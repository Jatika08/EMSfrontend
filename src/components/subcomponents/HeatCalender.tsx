import {
  eachDayOfInterval,
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  getDay,
} from "date-fns";

const heatmapColors = [
  "#0000FF", // Blue
  "#3399FF", // Light Blue
  "#66CCFF", // Sky Blue
  "#66FFCC", // Aqua Green
  "#66FF66", // Light Green
  "#CCFF66", // Yellow-Green
  "#FFFF66", // Light Yellow
  "#FFCC33", // Orange
  "#FF9933", // Orange-Red
  "#FF0000", // Red
];

const HeatCalender = ({ date }) => {
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
      leaves: Math.floor(Math.random() * 20),
      isHoliday: Math.floor(Math.random() * 20),
    }));

    return [...padding, ...dates, ...endPadding];
  }

  const calendar = getMonthDatesWithPadding(date.toISOString());

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
                        // backgroundColor: `hsl(${
                        //   400-(day.leaves / 20) * 360
                        // }, 0, 40%)`,
                        backgroundColor: `hsl(0, 0%, ${
                          5+ (day.leaves / 15) * 30
                        }%)`,

                        // backgroundColor: heatmapColors[Math.floor(day.leaves/2)],
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
                  ? "text-stone-100 hover:brightness-140 backdrop-blur-sm rounded-md"
                  : new Date(day.date).toDateString() ===
                    new Date().toDateString()
                  ? "text-white border hover:brightness-140 backdrop-blur-sm rounded-md"
                  : ""
              }`}
            >
              <div className=" flex flex-col gap-1 items-center font-medium text-stone-400">
                {day.date ? new Date(day.date).getDate() : ""}
                {day.isHoliday < 3 ? (
                  <div className="rounded rounded-full w-[5px] h-[5px] bg-stone-100"></div>
                ) : (
                  <div className="rounded rounded-full w-[5px] h-[5px]"></div>
                )}
                {/* {day.leaves} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HeatCalender;
