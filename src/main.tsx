import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";
import { About } from "./pages/About.js";
import { Admin } from "./pages/Admin.tsx";
import { LoginPage } from "./pages/Login.tsx";
import { UserContextProvider } from "./contexts/UserContextProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/queryClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="admin" element={<Admin />} />
              {/* <Route path="stats" element={<Stats />} />
          <Route path="profile" element={<Profile />} /> */}
            </Route>
            <Route path="about" element={<About />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
