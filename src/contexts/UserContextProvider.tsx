import React, { createContext, useState, JSX } from "react";
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
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );
  const [name, setName] = useState<string | null>(
    localStorage.getItem("email")
  );
  const [currentUser, setCurrentUser] = useState<any>(null);

  const isLoggedIn = !!token;

  const setLocalItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getLocalItem = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  const login = (
    token: string,
    userId: string,
    email: string,
    name: string,
    isSuperUser: boolean
  ) => {
    console.log(
      "Login function called with:",
      "token:",
      token,
      "userId:",
      userId,
      "email:",
      email,
      "name:",
      name,
      "isSuperUser:",
      isSuperUser
    );
    setToken(token);
    setUserId(userId);
    setIsSuperUser(isSuperUser);
    setEmail(email);
    setName(name);
    setLocalItem("name", name);
    setLocalItem("email", email);
    setLocalItem("token", token);
    setLocalItem("userId", userId);
    setLocalItem("isSuperUser", isSuperUser.toString());
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setEmail(null);
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

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        token,
        userId,
        isSuperUser,
        currentUser,
        email,
        login,
        name,
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
