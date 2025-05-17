import { AdminActions } from "../utils/enums";
import { AddEmployeePage } from "./AddEmployee";
import { EmployeeDetails } from "./EmployeeDetails";

type LeaveDetail = {
  id: string;
  user_email: string;
  start_date: string;
  end_date: string;
  leave_apply_date: string;
  is_approved: boolean;
  reason: string;
  source: string;
};

type LeaveSummary = {
  total: number;
  used: number;
  remaining: number;
};

type Employee = {
  name: string;
  role: string;
  email: string;
  status: string;
  joinedDate: string;
  leaves: LeaveSummary;
  leaveDetails: LeaveDetail[];
};

interface ActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
  children: React.ReactNode;
  selectedAction: AdminActions;
}

const EmployeeDetailsModal = ({
  isOpen,
  onClose,
  employee,
  selectedAction,
}: ActionsModalProps) => {
  if (!isOpen) return null;

  console.log("employee id", employee);

  return (
    <div onClick={onClose} className="w-full backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className=" w-full h-full bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"
      >
        <button
          onClick={onClose}
          className="absolute z-1000 top-3 right-4 text-stone-400 hover:text-red-400 text-2xl transition-colors"
        >
          ×
        </button>
        {selectedAction === AdminActions.VIEW_EMPLOYEE && (
          <EmployeeDetails employee={employee} />
        )}
        {selectedAction === AdminActions.ADD_EMPLOYEE && <AddEmployeePage onClose={onClose} />}
        {/* <div className="h-128"></div> */}
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
