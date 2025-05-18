import { SegregateLeaves } from "../lib/utils";
import axiosInstance from "../utils/axiosInstance";
import { LeaveWfh, LeaveFilters } from "../utils/types";
import { useQuery } from "@tanstack/react-query";

async function fetchLeaves(filters: LeaveFilters): Promise<LeaveWfh[]> {
  const res = await axiosInstance.get("/leaves?isApproved=true", { params: filters });
  return res.status === 204 ? [] : res.data;
}

export function useLeavesQuery(filters: LeaveFilters) {
  const fromMonth = filters?.fromMonth != null ? filters.fromMonth - 1 : 1;
  const fromYear = filters?.fromYear ?? 2025;

  const { data: segregatedLeaves = [], isFetching } = useQuery({
    queryKey: ["leaves", filters?.fromMonth, filters?.fromYear, filters?.id],
    queryFn: () => fetchLeaves(filters),
    select: (data) => SegregateLeaves(fromMonth, fromYear, data),
    enabled: !!filters?.fromMonth && !!filters?.fromYear,
  });

  return { segregatedLeaves, isFetching };
}
