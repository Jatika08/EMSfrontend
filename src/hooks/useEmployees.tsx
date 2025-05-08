import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

async function fetchUsers(): Promise<any> {
  const res = await axiosInstance.get("/users/users");
  return res.data;
}

async function fetchUsersLeaves(email: string): Promise<any> {
  const res = await axiosInstance.get(
    `/leaves?email=${email??""}&page=1&limit=1000`
  );
  return res.data;
}

export function useEmployeesQuery(selectedEmployee: string) {
  const { data: EmployeesData, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return fetchUsers();
    },
  });

  const { data: EmployeeLeavesData, isFetchingLeaves } = useQuery({
    queryKey: ["usersLeaves"],
    queryFn: () => {
      return fetchUsersLeaves(selectedEmployee);
    },
  });

  return { EmployeesData, EmployeeLeavesData, isFetching };
}
