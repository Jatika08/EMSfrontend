import { useState } from "react";
import LeavesCalender from "./LeavesCalender";
import { useLeavesQuery } from "../hooks/useLeaves"; // adjust the path as needed

export const LeavesCalenderHolder = () => {
  const [calenderMonthDate, setcalenderMonthDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const month = calenderMonthDate.getMonth();
  const year = calenderMonthDate.getFullYear();

  const { segregatedLeaves, isFetching } = useLeavesQuery({
    fromMonth: month+1,
    fromYear: year,
    toMonth: month+1,
    toYear: year,
  });

  const handleMonthChange = (val: number) => {
    const newDate = new Date(calenderMonthDate);
    newDate.setMonth(newDate.getMonth() + val);
    newDate.setDate(1);
    setcalenderMonthDate(newDate);
  };

  return (
    <LeavesCalender
      month={month}
      year={year}
      handleMonthChange={handleMonthChange}
      isFetching={isFetching}
      segregatedLeaves={segregatedLeaves}
    />
  );
};
