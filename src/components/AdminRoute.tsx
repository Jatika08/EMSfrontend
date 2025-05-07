import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isSuperUser } = useContext(UserContext);

  if (!isSuperUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
