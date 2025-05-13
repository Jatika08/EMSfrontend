import { SegregateLeaves } from "../lib/utils";
import axiosInstance from "../utils/axiosInstance";
import { LeaveWfh, LeaveFilters } from "../utils/types";
import { useQuery } from "@tanstack/react-query";

async function fetchLeaves(filters: LeaveFilters): Promise<LeaveWfh[]> {
  const res = await axiosInstance.get("/leaves?isApproved=true", { params: filters });
  return res.data;
}

export function useLeavesQuery(filters: LeaveFilters) {
  const { data: leavesData = [], isFetching } = useQuery({
    queryKey: ["leaves", filters?.fromMonth, filters?.fromYear],
    queryFn: () => {
      if (filters) {
        return fetchLeaves(filters);
      }
      return [];
    },
    enabled: !!filters?.fromMonth && !!filters?.fromYear,
  });

  const fromMonth = filters?.fromMonth != null ? filters.fromMonth - 1 : 1;
  const fromYear = filters?.fromYear ?? 2025;
  const segregatedLeaves = SegregateLeaves(fromMonth, fromYear, leavesData);

  return { segregatedLeaves, isFetching };
}
