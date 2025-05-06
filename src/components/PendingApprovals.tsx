import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
interface LeaveRequest {
  name: string;
  designation: string;
  type: "WFH" | "Leave";
  from: string;
  to: string;
}

const approvals = [
  {
    name: "Aditi Sharma",
    designation: "UI Designer",
    applyDate: "2025-04-14",
    type: "WFH",
    from: "2025-04-12",
    to: "2025-04-14",
  },
  {
    name: "Rohan Verma",
    designation: "Backend Developer",
    type: "Leave",
    applyDate: "2025-04-14",
    from: "2025-04-15",
    to: "2025-04-17",
  },
  {
    name: "Rohan Verma",
    designation: "Backend Developer",
    applyDate: "2025-04-14",
    type: "Leave",
    from: "2025-04-15",
    to: "2025-04-17",
  },
];

function PendingApprovals() {
  const fetchLeaveApprovals = async () => {
    const response = await axiosInstance.get("/api/leave-approvals");
    return response.data;
  };

  const { data: approvalss } = useQuery({
    queryKey: ["leaveApprovals"],
    queryFn: fetchLeaveApprovals,
  });

  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] backdrop-blur-lg text-stone-200 max-h-full overflow-y-auto w-full">
      <h2 className="text-2xl mb-5 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400 tracking-wide">
        Pending Approvals
      </h2>

      {approvals.length === 0 ? (
        <p className="text-stone-400 text-sm">No pending requests 🎉</p>
      ) : (
        <div className="flex flex-col gap-4">
          {approvals.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-4 rounded-xl bg-stone-800/60 hover:bg-stone-700/60 transition-all"
            >
              <div className="flex flex-col">
                <span className="text-base font-medium text-stone-100">
                  {item.name} ({item.designation})
                </span>
                <span className="text-stone-400 text-sm mt-1">
                  {item.type} from {item.from} to {item.to}
                </span>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button className="bg-stone-600 hover:bg-stone-500 text-white p-2 rounded-md">
                  <Check size={16} />
                </button>
                <button className="bg-stone-800 hover:bg-stone-900 text-white p-2 rounded-md">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingApprovals;
