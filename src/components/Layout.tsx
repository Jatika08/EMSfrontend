import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, User, Shield } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Home", icon: <Home size={18} />, path: "/" },
  // { label: "Leave Stats", icon: <BarChart2 size={18} />, path: "/stats" },
  { label: "Admin Panel", icon: <Shield size={18} />, path: "/admin" },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const [isHovered, setIsHovered] = useState(false);
  const sidebarWidth = isHovered ? "w-60" : "w-20";
  const [scale, setScale] = useState(0.8);

  return (
    <div className="flex h-screen bg-stone-950 text-stone-200 overflow-hidden relative antialiased">
      <div
        className="absolute w-16 h-16 bg-[#222222] rounded-full -top-10 -right-10 flex items-center z-999 filter invert transition-transform duration-200 justify-center pointer-events-none mix-blend-difference"
        style={{
          width: 70,
          height: 70,
          transform: `scale(${scale})`,
        }}
      >
        <div
          className="pointer-events-auto w-12 h-12 bg-white rounded-full z-100 relative cursor-pointer hover:animate-pulse"
          style={{
            width: 48,
            height: 48,
            transform: `scale(${1 / scale})`,
          }}
          onClick={() => setScale((prev) => (prev === 0.8 ? 100 : 0.8))}
        ></div>
      </div>

      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 fixed top-0 left-0 z-50 ${sidebarWidth} bg-gradient-to-b from-stone-900/90 to-stone-950/80 border-r border-stone-800/40 p-6 flex flex-col justify-between shadow-[inset_-2px_0_8px_rgba(0,0,0,0.3)] backdrop-blur-sm h-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Nav */}
        <div className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <div
                className={`flex items-center gap-3 w-8 px-2 py-2 rounded-md transition-all hover:bg-stone-800/70 ${
                  pathname === item.path ? "bg-stone-800/80" : ""
                }`}
              >
                <div className="flex items-center justify-center">
                  {item.icon}
                </div>
                <span
                  className={`text-sm whitespace-nowrap ${
                    !isHovered ? "hidden" : ""
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Nav */}
        <div className="mt-6 pt-6 border-t border-stone-800/40">
          <Link to="/me">
            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-stone-800/70 ${
                pathname === "/profile" ? "bg-stone-800/80" : ""
              }`}
            >
              <div className="flex items-center justify-center">
                <User size={18} />
              </div>
              <span className={`text-sm ${!isHovered ? "hidden" : ""}`}>
                My Profile
              </span>
            </div>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 transition-all">
        {children}
      </main>
    </div>
  );
};

export default Layout;
