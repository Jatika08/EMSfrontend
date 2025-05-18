import axiosInstance from "../utils/axiosInstance";
import { LeaveFilters, LeaveWfh } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

function getDateRange(month, year) {
  if (!year) {
    throw new Error("Year is required");
  }

  if (month !== null && month !== undefined) {
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    return {
      firstDate,
      lastDate,
    };
  } else {
    const firstDate = new Date(year, 0, 1);
    const lastDate = new Date(year, 11, 31);
    return {
      firstDate,
      lastDate,
    };
  }
}

function interSectingDays(
  firstDate: Date,
  lastDate: Date,
  leaveStartDate: Date,
  leaveEndDate: Date
) {
  console.log("firstDate", firstDate);
  console.log("lastDate", lastDate);
  console.log("leaveStartDate", leaveStartDate);
  console.log("leaveEndDate", leaveEndDate);
  const start = Math.max(firstDate.getTime(), leaveStartDate.getTime());
  const end = Math.min(lastDate.getTime(), leaveEndDate.getTime());
  return Math.max(0, (end - start) / (1000 * 60 * 60 * 24) + 1);
}

async function fetchLeaves(filters: LeaveFilters): Promise<LeaveWfh[]> {
  const res = await axiosInstance.get("/leaves", {
    params: { ...filters, isApproved: true },
  });
  return res.data;
}

export const useLeaveBalance = ({
  month,
  year,
}: {
  month: number | null;
  year: number;
}) => {
  const { firstDate, lastDate } = getDateRange(month, year);

  const filtersData = useMemo(() => {
    if (month === null || month === undefined) {
      return {
        fromMonth: 0,
        fromYear: year,
        toMonth: 11,
        toYear: year,
      };
    } else
      return {
        fromMonth: month + 1,
        fromYear: year,
        toMonth: month + 1,
        toYear: year,
      };
  }, [month, year]);

  const leavesQuery = useQuery({
    queryKey: ["leavesbal", filtersData],
    queryFn: () => fetchLeaves(filtersData),
  });

  const leaveBalance = useMemo(() => {
    if (!leavesQuery.data) return { cl: 0, pl: 0 };

    return leavesQuery.data.reduce(
      (acc, leave) => {
        const leaveStartDate = new Date(leave.start_date);
        const leaveEndDate = new Date(leave.end_date);
        const leaveDays = interSectingDays(
          firstDate,
          lastDate,
          leaveStartDate,
          leaveEndDate
        );

        if (leave.iscl) {
          acc.cl += leaveDays;
        } else {
          acc.pl += leaveDays;
        }

        return acc;
      },
      { cl: 0, pl: 0,clAllocated: 12, plAllocated: 12 }
    );
  }, [leavesQuery.data, firstDate, lastDate]);

return {
  balance: {
    ...leaveBalance,
    ...(month ? { clAllocated: 2, plAllocated: 2 } : { clAllocated: 12, plAllocated: 12 })
  },
  isLoading: leavesQuery.isLoading,
  isError: leavesQuery.isError,
};

};
