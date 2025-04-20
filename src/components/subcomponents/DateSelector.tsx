import { ChevronLeft, ChevronRight } from "lucide-react";
import { days } from "../../utils/enums";
import { useMemo, useState } from "react";
import {
  addMonths,
  differenceInCalendarDays,
  format,
  isBefore,
  isSameMonth,
  startOfMonth,
} from "date-fns";

export const DateSelector = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const [errors, setErrors] = useState<string>("");
  function handleDateChange(selectedDate: Date, isChangingStartDate: boolean) {
    const normalize = (d: Date) => new Date(d.setHours(0, 0, 0, 0));

    if (normalize(selectedDate) < normalize(new Date())) {
      setErrors("Selected date cannot be in the past.");
      return;
    }
    if (isChangingStartDate) {
      if (selectedDate > endDate) {
        setStartDate(selectedDate);
        setEndDate(selectedDate);
      } else {
        setStartDate(selectedDate);
      }
    } else {
      if (selectedDate < startDate) {
        setStartDate(selectedDate);
        setEndDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
    }
    setErrors("");
  }

  const getMonthRange = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed

    const firstDayOfMonth = new Date(year, month, 1);

    const startWeekday = (firstDayOfMonth.getDay() + 6) % 7; // Make Monday = 0
    // const daysInMonth = lastDayOfMonth.getDate();

    const totalDays = 42;
    const days = [];

    // Calculate the start date for padding (from previous month)
    const prevMonthDate = new Date(year, month, 1 - startWeekday);

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(prevMonthDate);
      currentDate.setDate(prevMonthDate.getDate() + i);

      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
      });
    }

    return days;
  };
  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);

  const selectedDayCount = useMemo(() => {
    return differenceInCalendarDays(endDate, startDate) + 1;
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col gap-2 w-220 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
      <div className=" flex flex-row gap-10 ">
        <CalendarBlock
          label="Start Date"
          subtext="Select start date"
          isStart={true}
          startDate={startDate}
          endDate={endDate}
          handleDateChange={handleDateChange}
        />
        <CalendarBlock
          label="End Date"
          subtext="Select end date"
          isStart={false}
          startDate={startDate}
          endDate={endDate}
          handleDateChange={handleDateChange}
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300 tracking-wide">
          {selectedDayCount} days selected
        </h3>
        <p className="text-sm text-stone-400 italic mb-2">{errors}</p>
      </div>
    </div>
  );
};

type CalendarBlockProps = {
  label: string;
  subtext: string;
  startDate: Date;
  endDate: Date;
  isStart: boolean;
  handleDateChange: (selectedDate: Date, isStart: boolean) => void;
};

const CalendarBlock = ({
  label,
  subtext,
  startDate,
  endDate,
  isStart,
  handleDateChange,
}: CalendarBlockProps) => {
  const today = new Date();
  const initialMonth = startOfMonth(isStart ? startDate : endDate);
  const [monthDate, setMonthDate] = useState(initialMonth);

  const range = useMemo(() => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startWeekday = (firstDayOfMonth.getDay() + 6) % 7;
    const totalDays = 42;
    const days = [];

    const prevMonthDate = new Date(year, month, 1 - startWeekday);

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(prevMonthDate);
      currentDate.setDate(prevMonthDate.getDate() + i);
      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
      });
    }

    return days;
  }, [monthDate]);

  const handlePrevMonth = () => {
    const prev = addMonths(monthDate, -1);
    if (!isBefore(prev, startOfMonth(today))) {
      setMonthDate(prev);
    }
  };

  const handleNextMonth = () => {
    setMonthDate(addMonths(monthDate, 1));
  };

  const disablePrev =
    isSameMonth(monthDate, today) || isBefore(monthDate, today);

  return (
    <div className="w-100">
      <div className="flex flex-row justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300 tracking-wide">
            {label}
          </h3>
          <p className="text-sm text-stone-400 italic mb-2">{subtext}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            disabled={disablePrev}
            className={`rounded-md w-8 h-8 flex items-center justify-center cursor-pointer transition-colors ${
              disablePrev
                ? "bg-stone-900 text-stone-600 cursor-not-allowed"
                : "bg-stone-800 hover:bg-stone-600"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-sm font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300 min-w-[100px] text-center">
            {format(monthDate, "MMMM yyyy")}
          </span>

          <button
            onClick={handleNextMonth}
            className="bg-stone-800 hover:bg-stone-600 rounded-md w-8 h-8 flex items-center justify-center cursor-pointer transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-[1px] text-sm font-medium text-stone-500">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-stone-800/10 h-12 text-stone-500"
          >
            {day}
          </div>
        ))}

        {range.map((day, index) => {
          const isToday = day.date.toDateString() === today.toDateString();
          const normalize = (d: Date) => new Date(d).setHours(0, 0, 0, 0);
          const isInRange =
            normalize(day.date) >= normalize(startDate) &&
            normalize(day.date) <= normalize(endDate);

          return (
            <div
              key={index}
              className={`flex items-center justify-center text-sm h-12 transition-all duration-200 rounded-md ${
                isToday
                  ? "text-stone-300 border-2 border-stone-600"
                  : day.isCurrentMonth
                  ? "text-stone-300 hover:brightness-110"
                  : "text-stone-500 opacity-40"
              } ${isInRange && "bg-stone-700"}`}
              onClick={() => handleDateChange(day.date, isStart)}
            >
              <div className="flex flex-col gap-1 items-center font-medium">
                {day.date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
