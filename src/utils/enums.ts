export enum AdminActions {
  VIEW_EMPLOYEE = "view_employee",
  ADD_EMPLOYEE = "add_employee",
}
export enum UserActions {
  APPLY_LEAVE = "apply_leave",
  VIEW_LEABES = "view_leaves",
  LEAVE_BALANCE = "leave_balance",
  VIEW_EMPLOYEE = "view_employee",
  ADD_EMPLOYEE = "add_employee",
  POST_NOTICE ="post_notice",
  LOGOUT = "logout",
  MY_LEAVES = "my_leaves",
  MY_LEAVES_HISTORY = "my_leaves_history",
  LEAVES_BALANCE = "leaves_balance",
}
export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export enum leaveEnum {
  LEAVE="leave",
  WORK_FROM_HOME="wfh"
}