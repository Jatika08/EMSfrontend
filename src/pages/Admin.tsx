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
import { AdminActions } from "../utils/enums";
import { LeaveHeatMap } from "../components/LeaveHeatmap";

const employeeList = [
  { name: "Grant Douglas Ward", id: "hdsf-1234", department: "Field Agents" },
  { name: "Manav Das", id: "hdsf-1256", department: "Field Agents" },
  { name: "Jatika Ahuja", id: "hdsf-1259", department: "Field Agents" },
];

const employee = [
  {
    id: "hdsf-1234",
    name: "Grant Douglas Ward",
    role: "Field Agent",
    email: "grant.ward@shield.gov",
    status: "Compromized",
    joinedDate: "May 4, 2010",
    leaves: {
      total: 30,
      used: 25,
      remaining: 5,
    },
    leaveDetails: [
      {
        id: "a64c2d33-d8f7-4c5f-b2f3-60fca325ad23",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-04-17",
        end_date: "2025-04-19",
        leave_apply_date: "2025-04-06",
        is_approved: true,
        reason: "Internet issues",
        source: "wfh",
      },
      {
        id: "f45d3a12-ecc3-4b7a-8721-d1c4e3a1981c",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-03-10",
        end_date: "2025-03-12",
        leave_apply_date: "2025-03-01",
        is_approved: false,
        reason: "Personal matters",
        source: "on-site",
      },
      {
        id: "c31a90b4-8e4b-4fae-9d5f-3fbf7f07c2a5",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-02-01",
        end_date: "2025-02-03",
        leave_apply_date: "2025-01-25",
        is_approved: true,
        reason: "Recon mission debrief",
        source: "classified",
      },
      {
        id: "d8ff6b72-1a3b-4e1e-b7d2-8e93e8910176",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-01-05",
        end_date: "2025-01-06",
        leave_apply_date: "2025-01-02",
        is_approved: true,
        reason: "Medical leave",
        source: "clinic",
      },
      {
        id: "f45d3a12-ecc3-4b7a-8721-d1c4e3a1981c",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-03-10",
        end_date: "2025-03-12",
        leave_apply_date: "2025-03-01",
        is_approved: false,
        reason: "Personal matters",
        source: "on-site",
      },
      {
        id: "c31a90b4-8e4b-4fae-9d5f-3fbf7f07c2a5",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-02-01",
        end_date: "2025-02-03",
        leave_apply_date: "2025-01-25",
        is_approved: true,
        reason: "Recon mission debrief",
        source: "classified",
      },
      {
        id: "d8ff6b72-1a3b-4e1e-b7d2-8e93e8910176",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-01-05",
        end_date: "2025-01-06",
        leave_apply_date: "2025-01-02",
        is_approved: true,
        reason: "Medical leave",
        source: "clinic",
      },
      {
        id: "f45d3a12-ecc3-4b7a-8721-d1c4e3a1981c",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-03-10",
        end_date: "2025-03-12",
        leave_apply_date: "2025-03-01",
        is_approved: false,
        reason: "Personal matters",
        source: "on-site",
      },
      {
        id: "c31a90b4-8e4b-4fae-9d5f-3fbf7f07c2a5",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-02-01",
        end_date: "2025-02-03",
        leave_apply_date: "2025-01-25",
        is_approved: true,
        reason: "Recon mission debrief",
        source: "classified",
      },
      {
        id: "d8ff6b72-1a3b-4e1e-b7d2-8e93e8910176",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-01-05",
        end_date: "2025-01-06",
        leave_apply_date: "2025-01-02",
        is_approved: true,
        reason: "Medical leave",
        source: "clinic",
      },
    ],
  },
  {
    id: "hdsf-1256",
    name: "Manav Das",
    role: "Tester",
    email: "dascorp009@gmail.com",
    status: "active",
    joinedDate: "May 4, 2010",
    leaves: {
      total: 30,
      used: 25,
      remaining: 5,
    },
    leaveDetails: [
      {
        id: "a64c2d33-d8f7-4c5f-b2f3-60fca325ad23",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-04-17",
        end_date: "2025-04-19",
        leave_apply_date: "2025-04-06",
        is_approved: true,
        reason: "Internet issues",
        source: "wfh",
      },
      {
        id: "f45d3a12-ecc3-4b7a-8721-d1c4e3a1981c",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-03-10",
        end_date: "2025-03-12",
        leave_apply_date: "2025-03-01",
        is_approved: false,
        reason: "Personal matters",
        source: "on-site",
      },
      {
        id: "c31a90b4-8e4b-4fae-9d5f-3fbf7f07c2a5",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-02-01",
        end_date: "2025-02-03",
        leave_apply_date: "2025-01-25",
        is_approved: true,
        reason: "Recon mission debrief",
        source: "classified",
      },
      {
        id: "d8ff6b72-1a3b-4e1e-b7d2-8e93e8910176",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-01-05",
        end_date: "2025-01-06",
        leave_apply_date: "2025-01-02",
        is_approved: true,
        reason: "Medical leave",
        source: "clinic",
      },
      {
        id: "f45d3a12-ecc3-4b7a-8721-d1c4e3a1981c",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-03-10",
        end_date: "2025-03-12",
        leave_apply_date: "2025-03-01",
        is_approved: false,
        reason: "Personal matters",
        source: "on-site",
      },
      {
        id: "c31a90b4-8e4b-4fae-9d5f-3fbf7f07c2a5",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-02-01",
        end_date: "2025-02-03",
        leave_apply_date: "2025-01-25",
        is_approved: true,
        reason: "Recon mission debrief",
        source: "classified",
      },
      {
        id: "d8ff6b72-1a3b-4e1e-b7d2-8e93e8910176",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-01-05",
        end_date: "2025-01-06",
        leave_apply_date: "2025-01-02",
        is_approved: true,
        reason: "Medical leave",
        source: "clinic",
      },
      {
        id: "f45d3a12-ecc3-4b7a-8721-d1c4e3a1981c",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-03-10",
        end_date: "2025-03-12",
        leave_apply_date: "2025-03-01",
        is_approved: false,
        reason: "Personal matters",
        source: "on-site",
      },
      {
        id: "c31a90b4-8e4b-4fae-9d5f-3fbf7f07c2a5",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-02-01",
        end_date: "2025-02-03",
        leave_apply_date: "2025-01-25",
        is_approved: true,
        reason: "Recon mission debrief",
        source: "classified",
      },
      {
        id: "d8ff6b72-1a3b-4e1e-b7d2-8e93e8910176",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-01-05",
        end_date: "2025-01-06",
        leave_apply_date: "2025-01-02",
        is_approved: true,
        reason: "Medical leave",
        source: "clinic",
      },
    ],
  },
  {
    id: "hdsf-1259",
    name: "Jatika Ahuja",
    role: "Sde",
    email: "ja@gmail.com",
    status: "active",
    joinedDate: "May 4, 2010",
    leaves: {
      total: 30,
      used: 25,
      remaining: 5,
    },
    leaveDetails: [
      {
        id: "a64c2d33-d8f7-4c5f-b2f3-60fca325ad23",
        user_email: "grant.ward@hydra.net",
        start_date: "2025-04-17",
        end_date: "2025-04-19",
        leave_apply_date: "2025-04-06",
        is_approved: true,
        reason: "Internet issues",
        source: "wfh",
      },
    ],
  },
];

export const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    (typeof employee)[0] | null
  >(employee[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedActionType, setSelectedActionType] = useState(
    AdminActions.VIEW_EMPLOYEE
  );

  const filteredEmployees = employee.filter((e) =>
    e.id.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex h-full w-full gap-4 px-6 py-4 pl-20">
      {/* Sidebar */}
      <div className="relative w-100 flex-shrink-0 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-4 border border-stone-700/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] backdrop-blur-lg text-stone-200 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400">
            Admin Dashboard
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            className="absolute left-3 top-2.5 text-stone-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onClick={() => setIsSearchOpen(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-800/70 text-sm text-stone-200 placeholder-stone-400 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-600"
          />
        </div>
        {isSearchOpen && (
          <div className="absolute inset-0 z-20 bg-stone-950/90 backdrop-blur-lg rounded-3xl p-6 border border-stone-700/30 shadow-xl flex flex-col">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-2.5 text-stone-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Type to search employees..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-stone-800/80 text-sm text-stone-200 placeholder-stone-400 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-600"
              />
              <X
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchValue("");
                }}
                className="absolute right-3 top-2.5 text-stone-400 cursor-pointer"
                size={18}
              />
            </div>

            {/* Filters */}
            <div className="mb-2 text-sm text-stone-400 font-medium flex items-center gap-2">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </div>
            <div className="flex gap-2 mb-6">
              {["All", "On Leave", "Pending", "New"].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 rounded-lg bg-stone-800/60 hover:bg-stone-700/70 text-sm text-stone-300 transition-all"
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search Results */}
            <div className="flex flex-col gap-2 overflow-y-auto">
              {filteredEmployees.map(({ name, id }) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedEmployee(
                      employee.find((e) => e.id === id) || null
                    );
                    setSelectedActionType(AdminActions.VIEW_EMPLOYEE);
                    setIsOpen(true);
                    setIsSearchOpen(false);
                    setSearchValue("");
                  }}
                  className="px-4 py-2 rounded-lg bg-stone-800/70 hover:bg-stone-700/70 text-left text-sm text-stone-300 transition-all"
                >
                  {name}
                </button>
              ))}
              {filteredEmployees.length === 0 && (
                <div className="text-stone-500 text-sm mt-4">
                  No results found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filters Overlay */}

        {/* Employee List */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-stone-300">All Employees</span>
          <button
            className="p-1 rounded hover:text-white text-stone-400 transition-colors"
            onClick={() => {
              setSelectedActionType(AdminActions.ADD_EMPLOYEE);
              setIsOpen(true);
            }}
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {employeeList.map(({ name, id }) => (
            <button
              key={id}
              onClick={() => {
                setSelectedEmployee(employee.find((e) => e.id === id) || null);
                setSelectedActionType(AdminActions.VIEW_EMPLOYEE);

                setIsOpen(true);
              }}
              className="px-4 py-2 rounded-lg bg-stone-800/70 hover:bg-stone-700/70 text-left text-sm text-stone-300 transition-all"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* <div className="flex-1 bg-gradient-to-br from-stone-950/80 to-stone-900/80 rounded-3xl border border-stone-700/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] backdrop-blur-lg text-stone-200 overflow-y-scroll"> */}
      <div className="flex w-full flex-col gap-4 ">
        <EmployeeDetailsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          selectedAction={selectedActionType}
          employee={selectedEmployee!}
        >
          <i className="text-xl font-bold w-full mb-4">
            {selectedActionType === AdminActions.VIEW_EMPLOYEE
              ? "Employee Details"
              : "Employee management"}
          </i>
        </EmployeeDetailsModal>
        <LeaveHeatMap />
        <div className="p-6 flex flex-col gap-5 bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-lg text-stone-300">
          {/* Title */}
          <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300 tracking-wide">
            Employee Management
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800/70 hover:bg-stone-700/70 transition-colors text-sm font-medium text-stone-300 shadow-inner backdrop-blur-sm">
              <UserPlus size={16} className="text-stone-400" />
              Add Employee
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800/70 hover:bg-stone-700/70 transition-colors text-sm font-medium text-stone-300 shadow-inner backdrop-blur-sm">
              <FileText size={16} className="text-stone-400" />
              View All Records
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800/70 hover:bg-stone-700/70 transition-colors text-sm font-medium text-stone-300 shadow-inner backdrop-blur-sm">
              <ShieldCheck size={16} className="text-stone-400" />
              Assign Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
