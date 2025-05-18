export type LeaveDetail = {
  id: string;
  user_email: string;
  start_date: string;
  end_date: string;
  leave_apply_date: string;
  is_approved: boolean;
  reason: string;
  approverId: string;
};

export type LeaveSummary = {
  total: number;
  used: number;
  remaining: number;
};

export type Employee = {
  id: string;
  name: string;
  roleHierarchy: number;
  department: string;
  designation: string;
  email: string;
  status: string;
  joinedDate: string;
  leaves: LeaveSummary;
  leaveDetails: LeaveDetail[];
};

export type UserContextType = {
  isLoggedIn: boolean;
  token: string | null;
  email: string | null;
  name: string | null;

  userId: string | null;
  isSuperUser: boolean;
  currentUser: Employee | null;
  login: (
    token: string,
    userId: string,
    email: string,
    name: string,
    isSuperUser: boolean
  ) => void;
  logout: () => void;
  getUserData: () => void;
  getLocalItem: (key: string) => string | null;
  setLocalItem: (key: string, value: string) => void;
};

export type LeaveWfh = {
  id: string;
  isApproved: boolean;
  isSettled: boolean;
  user_email: string;
  start_date: string;
  end_date: string;
  leave_apply_date: string;
  is_approved: boolean;
  reason: string;
  isCl?: boolean;
  iscl?: boolean;
  fromDate?: string;
  toDate?: string;
  isWfh?: boolean;
  source: string;
};

export type LeaveFilters = {
  id?: string;
  fromMonth: number;
  fromYear: number;
  toMonth: number;
  toYear: number;
};
