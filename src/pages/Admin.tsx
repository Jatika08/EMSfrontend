import {
  Plus,
  Search,
  SlidersHorizontal,
  FileText,
  ShieldCheck,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import EmployeeDetailsModal from "../components/EmployeeDetailsModal";
import { AdminActions, UserActions } from "../utils/enums";
import { LeaveHeatMap } from "../components/LeaveHeatmap";
import { LeavesChart } from "../components/LeavesChart";
import ActionsModal from "../components/ActionsModal";
import { useEmployeesQuery } from "../hooks/useEmployees";

export const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedActionType, setSelectedActionType] = useState<AdminActions>(AdminActions.VIEW_EMPLOYEE);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<UserActions | null>(null);

  const { EmployeesData } = useEmployeesQuery(selectedEmployee ?? "");

  const filteredEmployees = EmployeesData?.users?.filter((e: { name: string }) =>
    e?.name?.toLowerCase()?.includes(searchValue.toLowerCase())
  ) || [];

  return (
    <div className="flex h-full w-full gap-4 px-6 py-4 pl-20">
      {/* Sidebar */}
      <div className="relative w-100 flex-shrink-0 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-4 border border-stone-700/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] backdrop-blur-lg text-stone-200 flex flex-col gap-4">
        {/* Sidebar contents */}
        {/* (same content here) */}
      </div>

      <div className="flex w-full flex-col gap-4">
        <EmployeeDetailsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          selectedAction={selectedActionType}
          employee={EmployeesData?.users?.find((e) => e.id === selectedEmployee) || null}
        >
          <i className="text-xl font-bold w-full mb-4">Employee Details</i>
        </EmployeeDetailsModal>

        <LeaveHeatMap />
        <LeavesChart />

        <div className="p-6 flex flex-col gap-5 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-lg text-stone-300">
          <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300 tracking-wide">
            Employee Management
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800/70 hover:bg-stone-700/70 text-sm font-medium text-stone-300">
              <UserPlus size={16} className="text-stone-400" />
              Add Employee
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800/70 hover:bg-stone-700/70 text-sm font-medium text-stone-300">
              <FileText size={16} className="text-stone-400" />
              View All Records
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800/70 hover:bg-stone-700/70 text-sm font-medium text-stone-300">
              <ShieldCheck size={16} className="text-stone-400" />
              Assign Roles
            </button>
          </div>
        </div>
      </div>

      <ActionsModal
        isOpen={isModalOpen}
        modalType={modalType!}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
