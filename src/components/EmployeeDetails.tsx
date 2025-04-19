import {
  User,
  Fingerprint,
  AtSign,
  Clock,
  CalendarCheck,
  Pencil,
  Trash2,
  Ban,
  UserCog,
} from "lucide-react";
import { LanyardGenerator } from "./LanyardGenerator";
import { Employee } from "@/utils/types";

export const EmployeeDetails = ({ employee }: { employee: Employee }) => {
  if (!employee) return null;
  return (
    <div className="w-full h-full rounded-3xl  border border-stone-700/30 text-stone-200 py-4">
      {/* Header */}
      <div className="px-6 font-semibold">Employee details</div>
      <div className="flex flex-row gap-6 p-6">
        <LanyardGenerator selectedEmployee={employee} />

        <div className="flex flex-col gap-0 w-full lg:w-120 p-6 rounded-3xl border border-stone-700/30 bg-stone-800/50 shadow-inner ">
          <StatCard
            icon={<User size={20} />}
            label="Employee Name"
            value={employee.name}
          />
          <StatCard
            icon={<Fingerprint size={20} />}
            label="Employee ID"
            value={"hdsf-1234"}
          />
          <StatCard
            icon={<AtSign size={20} />}
            label="Email"
            value={employee.email}
          />
          <StatCard
            icon={<Clock size={20} />}
            label="Total Leaves"
            value={employee.leaves.total}
          />
          <StatCard
            icon={<CalendarCheck size={20} />}
            label="Used Leaves"
            value={employee.leaves.used}
          />
          <StatCard
            icon={<Clock size={20} />}
            label="Remaining"
            value={employee.leaves.remaining}
          />
          <button className="flex items-center gap-2 px-3 py-2 mt-2 bg-stone-700/60 hover:bg-stone-600/70 text-sm text-stone-300 rounded-xl transition-all">
            <Pencil size={16} className="text-stone-400" />
            Edit Employee
          </button>
        </div>
      </div>

      {/* Leave Summary */}

      <div className="flex flex-col gap-3 px-6">
        {employee.leaveDetails.map((leave) => {
          const start = new Date(leave.start_date);
          const end = new Date(leave.end_date);
          const totalDays =
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

          return (
            <div
              key={leave.id}
              className="w-full bg-stone-800/60 border border-stone-700/40 rounded-2xl p-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2 font-medium text-sm text-stone-300">
                  <span className="px-3 py-1 bg-stone-700/50 rounded-full border border-stone-600">
                    {start.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-stone-500">to</span>
                  <span className="px-3 py-1 bg-stone-700/50 rounded-full border border-stone-600">
                    {end.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <span className="text-stone-400 font-semibold px-1">
                  ({totalDays} day{totalDays > 1 ? "s" : ""})
                </span>
              </div>

              <div className="flex flex-col md:items-end gap-2 text-sm">
                <span className="italic text-stone-400">"{leave.reason}"</span>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium tracking-wide border ${
                    leave.is_approved
                      ? "bg-green-900/30 text-green-300 border-green-500/30"
                      : "bg-yellow-900/30 text-yellow-300 border-yellow-500/30"
                  }`}
                >
                  {leave.is_approved ? "Approved" : "Pending"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 px-6 pt-4 ">
        <button className="flex items-center gap-2 px-4 py-2 bg-stone-800/70 hover:bg-stone-700/70 rounded-lg text-sm text-stone-200 transition-all">
          <Trash2 size={16} className="text-stone-400" />
          Delete Record
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-stone-800/70 hover:bg-stone-700/70 rounded-lg text-sm text-stone-200 transition-all">
          <Ban size={16} className="text-stone-400" />
          Disable Account
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-stone-800/70 hover:bg-stone-700/70 rounded-lg text-sm text-stone-200 transition-all">
          <UserCog size={16} className="text-stone-400" />
          Change Role
        </button>
      </div>
    </div>
  );
};

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-4 px-2 py-2 text-stone-300">
      <div className="text-stone-400">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs tracking-wide text-stone-500">{label}</span>
        <span className="text-lg font-semibold text-stone-100 leading-tight">
          {value}
        </span>
      </div>
    </div>
  );
}
