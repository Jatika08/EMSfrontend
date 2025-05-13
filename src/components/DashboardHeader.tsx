import { useContext } from "react";
import { UserActions } from "../utils/enums";
import {
  CalendarCheck,
  PlusCircle,
  Clock,
  History,
  LogOut,
  UserCog,
  Users,
  ShieldCheck,
  FileBarChart2,
} from "lucide-react";
import { UserContext } from "../contexts/UserContextProvider";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

function DashboardHeader({
  userName,
  setModalOpen,
  setModalType,
}: {
  userName?: string;
  isAdmin?: boolean;
  setModalOpen: (open: boolean) => void;
  setModalType: React.Dispatch<React.SetStateAction<UserActions>>;
}) {
  const greeting = getGreeting();
  const { name, isSuperUser } = useContext(UserContext);

  return (
    <div className="w-full bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] backdrop-blur-lg text-stone-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400">
            {greeting}, {name || userName} 👋
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Here&apos;s what’s happening with your leaves today.
          </p>
        </div>
      </div>

      {/* Main user quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
        <QuickAction
          icon={<PlusCircle size={18} />}
          label="Apply Leave"
          onClick={() => {
            setModalOpen(true);
            setModalType(UserActions.APPLY_LEAVE);
          }}
        />

        <QuickAction
          icon={<CalendarCheck size={18} />}
          label="My Upcoming Leaves"
          onClick={() => {
            setModalOpen(true);
            setModalType(UserActions.MY_LEAVES);
          }}
        />

        <QuickAction
          icon={<Clock size={18} />}
          label="Leave Balance"
          onClick={() => {
            setModalOpen(true);
            setModalType(UserActions.LEAVE_BALANCE);
          }}
        />

        <QuickAction
          icon={<History size={18} />}
          label="History"
          onClick={() => {
            setModalOpen(true);
            setModalType(UserActions.VIEW_EMPLOYEE);
          }}
        />

        <QuickAction
          icon={<LogOut size={18} />}
          label="Logout"
          onClick={() => {
            setModalOpen(true);
            setModalType(UserActions.LOGOUT);
          }}
        />
      </div>

      {/* Admin-only actions */}
      {isSuperUser && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-stone-700/40">
          <QuickAction
            icon={<Users size={18} />}
            label="Manage Employees"
            onClick={() => {
              setModalOpen(true);
              setModalType(UserActions.VIEW_EMPLOYEE);
            }}
          />
          <QuickAction
            icon={<UserCog size={18} />}
            label="Leave Approvals"
            onClick={() => {
              setModalOpen(true);
              setModalType(UserActions.VIEW_EMPLOYEE);
            }}
          />
          <QuickAction
            icon={<ShieldCheck size={18} />}
            label="Admin Settings"
            onClick={() => {
              setModalOpen(true);
              setModalType(UserActions.VIEW_EMPLOYEE);
            }}
          />
          <QuickAction
            icon={<FileBarChart2 size={18} />}
            label="Reports"
            onClick={() => {
              setModalOpen(true);
              setModalType(UserActions.VIEW_EMPLOYEE);
            }}
          />
        </div>
      )}
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-stone-800/70 hover:bg-stone-700/70 text-stone-300 transition-all shadow hover:shadow-md"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}

export default DashboardHeader;
