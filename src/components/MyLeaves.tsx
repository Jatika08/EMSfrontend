import { BookCheck, BookDashed, BookX } from "lucide-react";
import { formatDate } from "./PendingApprovals";
import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LeaveWfh } from "@/utils/types";
import { useCallback, useContext, useMemo } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { date } from "zod";

export default function MyLeaves({
  isHistory = false,
}: {
  isHistory?: boolean;
}) {
  const { email } = useContext(UserContext);

  const leavesFunction = useCallback(async () => {
    const today = new Date();

    let fromMonth, fromYear, toMonth, toYear;

    if (isHistory) {
      fromMonth = 1;
      fromYear = 2000;

      toMonth = today.getMonth() + 1;
      toYear = today.getFullYear();

      if (toMonth === 0) {
        toMonth = 12;
        toYear -= 1;
      }
    } else {
      toMonth = 1;
      toYear = 2099;

      if (toMonth === 0) {
        toMonth = 12;
        toYear -= 1;
      }

      fromMonth = today.getMonth() + 1;
      fromYear = today.getFullYear();
    }

    const res = await axiosInstance.get(
      `/leaves?email=${encodeURIComponent(
        email ?? ""
      )}&fromMonth=${fromMonth}&fromYear=${fromYear}&toMonth=${toMonth}&toYear=${toYear}`
    );

    return res.data;
  }, [isHistory, email]);

  const myLeavesQuery = useQuery({
    queryKey: ["myLeaves"],
    queryFn: leavesFunction,
    enabled: true,
  });

  const sortedLeaves = useMemo(
    () =>
      myLeavesQuery?.data
        ?.filter(
          (leave) =>
            leave.end_date &&
            (isHistory
              ? new Date(leave.end_date).getTime() <= Date.now()
              : new Date(leave.end_date).getTime() >= Date.now())
        )
        .sort((a: LeaveWfh, b: LeaveWfh) => {
          const dateA = new Date(a.start_date ?? 0).getTime();
          const dateB = new Date(b.start_date ?? 0).getTime();
          return isHistory ? dateB - dateA : dateA - dateB;
        }),
    [isHistory, myLeavesQuery?.data]
  );

  console.log("Sorted Leaves: ", sortedLeaves);

  if (myLeavesQuery.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-xl bg-stone-900">
        <p className="text-xl text-stone-300">Loading your leaves...</p>
      </div>
    );
  }

  if (myLeavesQuery.isError) {
    return (
      <div className="flex justify-center items-center min-h-xl bg-stone-900">
        <p className="text-red-400 text-lg">{myLeavesQuery.isError}</p>
      </div>
    );
  }

  console.log("My Leaves Data: ", myLeavesQuery?.data);

  return (
    <div className="h-xl rounded-3xl bg-gradient-to-br from-stone-950 to-stone-900 p-6 overflow-y-scroll shadow-[inset_0_0_30px_rgba(0,0,0,0.3)]">
      {myLeavesQuery?.data?.leaves?.length === 0 ? (
        <p className="text-center text-stone-400 text-lg">
          No leaves applied yet.
        </p>
      ) : (
        <div className="flex h-150 flex-col gap-6  mx-auto p-6">
          {sortedLeaves?.map((leave: LeaveWfh) => {
            const status = leave.is_approved
              ? "Approved"
              : leave.issettled
              ? "Rejected"
              : "Pending";

            const statusIcon = leave.is_approved ? (
              <BookCheck className="text-green-400" />
            ) : leave.issettled ? (
              <BookX className="text-red-400" />
            ) : (
              <BookDashed className="text-yellow-400" />
            );

            const statusColor = leave.is_approved
              ? "text-green-400 bg-green-900/30"
              : leave.issettled
              ? "text-red-400 bg-red-900/30"
              : "text-yellow-400 bg-yellow-900/30";

            return (
              <div
                key={leave.id}
                className="flex flex-row gap-4 bg-stone-900 p-6 rounded-xl shadow-lg   hover:shadow-2xl  transition-all duration-200 ease-in-out"
              >
                <div
                  className={`flex items-center gap-3 mb-1 px-3 py-2 rounded-lg w-fit ${statusColor}`}
                >
                  {statusIcon}
                  <span className="text-lg font-semibold">{status}</span>
                </div>
                <div>
                  <div className="text-stone-300">
                    {leave.iscl ? <>Casual Leave</> : <>Planned Leave</>} from{" "}
                    <span className="font-semibold text-stone-300">
                      {formatDate(leave.start_date ?? "")}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-stone-300">
                      {formatDate(leave.end_date ?? "")}
                    </span>
                  </div>
                  <div className="text-stone-300">
                    <span className="font-semibold text-stone-400">
                      Reason:
                    </span>{" "}
                    {leave.reason}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
