import { useState } from "react";
import LeavesCalender from "./LeavesCalender";

export const LeavesCalenderHolder = () => {
  const [calenderMonthDate, setcalenderMonthDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const handleMonthChange = (val: number) => {
    const newDate = new Date(calenderMonthDate);
    newDate.setMonth(newDate.getMonth() + val);
    newDate.setDate(1);
    setcalenderMonthDate(newDate);
  };

  return (
    <LeavesCalender
      month={calenderMonthDate.getMonth()}
      year={calenderMonthDate.getFullYear()}
      handleMonthChange={handleMonthChange}
    />
  );
};
