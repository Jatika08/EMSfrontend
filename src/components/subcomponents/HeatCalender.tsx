import {
  eachDayOfInterval,
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  getDay,
} from "date-fns";

const HeatCalender = ({ date }) => {
  function getMonthDatesWithPadding(date: string): ({ date: string } | {})[] {
    const monthStart = startOfMonth(parseISO(date));
    const monthEnd = endOfMonth(parseISO(date));

    const days = eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
    });

    let weekdayOfFirstDay = getDay(monthStart);

    // Shift Sunday (0) to 7 so week starts on Monday
    if (weekdayOfFirstDay === 0) weekdayOfFirstDay = 7;

    const padding = Array(weekdayOfFirstDay - 1).fill({});

    const dates = days.map((day) => ({
      date: format(day, "yyyy-MM-dd"),
    }));

    return [...padding, ...dates];
  }

  const calendar = getMonthDatesWithPadding(date.toISOString());

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="h-110 w-full bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-lg flex flex-col gap-4 text-stone-300">
      {/* Month Title */}
      <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300 tracking-wide">
        {format(date, "MMMM yyyy")}
      </h3>

      <div className="grid grid-cols-7 gap-1 mb-2 text-sm font-medium text-stone-500">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-xl"
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
                ? "bg-stone-700/40 text-stone-100 hover:bg-stone-600/50   backdrop-blur-md"
                : "bg-transparent"
            }`}
          >
            <span className="font-medium text-stone-400">
              {day.date ? new Date(day.date).getDate() : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HeatCalender;
