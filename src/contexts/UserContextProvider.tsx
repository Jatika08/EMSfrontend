import React, { createContext, useState, useEffect, JSX } from "react";
import { UserContextType } from "@/utils/types";
import axiosInstance from "../utils/axiosInstance";

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  token: null,
  userId: null,
  isSuperUser: false,
  currentUser: null,
  login: () => {},
  logout: () => {},
  getUserData: () => {},
  getLocalItem: () => null,
  setLocalItem: () => {},
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [isSuperUser, setIsSuperUser] = useState<boolean>(
    localStorage.getItem("isSuperUser") === "true"
  );
  const [currentUser, setCurrentUser] = useState<any>(null);

  const isLoggedIn = !!token;

  const setLocalItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getLocalItem = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  const login = (token: string, userId: string, isSuperUser: boolean) => {
    setToken(token);
    setUserId(userId);
    setIsSuperUser(isSuperUser);
    setLocalItem("token", token);
    setLocalItem("userId", userId);
    setLocalItem("isSuperUser", isSuperUser.toString());
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsSuperUser(false);
    setCurrentUser(null);
    localStorage.clear();
  };

  const getUserData = async () => {
    try {
      const res = await axiosInstance.get("/users/me");
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        token,
        userId,
        isSuperUser,
        currentUser,
        login,
        logout,
        getUserData,
        getLocalItem,
        setLocalItem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
