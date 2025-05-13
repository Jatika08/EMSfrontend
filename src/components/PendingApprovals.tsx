import queryClient from "../utils/queryClient";
import axiosInstance from "../utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { useToast } from "../contexts/CustomToast";

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

const calculateDayDifference = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};

function PendingApprovals() {
  const showToast = useToast();

  const fetchLeaveApprovals = async () => {
    const response = await axiosInstance.get(
      "/leaves?isApproved=false&isSettled=false"
    );
    return response.data;
  };

  const { data: approvalss } = useQuery({
    queryKey: ["leaveApprovals"],
    queryFn: fetchLeaveApprovals,
  });

  const LeaveAction = (leaveId: string, action: boolean) => {
    return axiosInstance.patch(
      `/leaves/approve-disapprove/${leaveId}?isApproved=${action}`
    );
  };

  const leaveActionMutation = useMutation({
    mutationFn: ({ leaveId, action }: { leaveId: string; action: boolean }) =>
      LeaveAction(leaveId, action),

    onSuccess: (_data, variables) => {
      if (variables.action) {
        showToast("Leave Approved successfully.");
      } else {
        showToast("Leave Rejected successfully.");
      }
      queryClient.invalidateQueries({ queryKey: ["leaveApprovals"] });
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },

    onError: () => {
      showToast("Failed to update leave status. Try again.");
    },
  });

  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] backdrop-blur-lg text-stone-200 max-h-full overflow-y-auto w-full">
      <h2 className="text-2xl mb-5 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400 tracking-wide">
        Pending Approvals
      </h2>

      {!approvalss?.length ? (
        <p className="text-stone-400 text-sm">No pending requests 🎉</p>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="max-h-100 flex flex-col gap-2 overflow-y-scroll">
            {approvalss?.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-4 rounded-xl bg-stone-800/60 hover:bg-stone-700/60 transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-base font-medium text-stone-100">
                    {item?.email} <i>(userrole)</i>{" "}
                    <i className="text-xs text-stone-400">
                      ({calculateDayDifference(item.start_date, item.end_date)} days)
                    </i>
                  </span>
                  <span className="text-base font-medium text-stone-100">
                    Reason: {item.reason}
                  </span>
                  <span className="text-stone-400 text-sm mt-1">
                    {item.iscl ? <>Casual Leave</> : <>Planned Leave</>} from {formatDate(item.start_date)} to {formatDate(item.end_date)}
                  </span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    className="bg-stone-600 hover:bg-stone-500 text-white p-2 rounded-md"
                    onClick={() => {
                      leaveActionMutation.mutate({
                        leaveId: item.leave_id,
                        action: true,
                      });
                    }}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    className="bg-stone-800 hover:bg-stone-900 text-white p-2 rounded-md"
                    onClick={() => {
                      leaveActionMutation.mutate({
                        leaveId: item.leave_id,
                        action: false,
                      });
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingApprovals;
