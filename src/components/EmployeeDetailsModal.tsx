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
  employee: Employee;
  children: React.ReactNode;
  selectedAction: AdminActions;
}

const EmployeeDetailsModal = ({
  isOpen,
  onClose,
  employee,
  children,
  selectedAction,
}: ActionsModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className=" bg-black/40 backdrop-blur-sm flex z-50 antialiased"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" w-full max-h-[90%]  
            bg-gradient-to-br from-stone-950/80 to-stone-900/80
            border border-stone-700/30 
            rounded-3xl p-6 
            shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] 
            backdrop-blur-lg 
            text-stone-200"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-stone-400 hover:text-red-400 text-2xl transition-colors"
        >
          ×
        </button>
        {children}
        {selectedAction === AdminActions.VIEW_EMPLOYEE && (
          <EmployeeDetails employee={employee} />
        )}
        {selectedAction === AdminActions.ADD_EMPLOYEE && <AddEmployeePage />}
        <div className="h-128"></div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
