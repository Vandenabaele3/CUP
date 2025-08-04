import React from "react";
import { NavLink } from "react-router-dom";
import {
  Trophy,
  Home,
  Wrench,
  Gamepad2,
  Flag,
  User,
  ShieldCheck,
} from "lucide-react";

type Props = {
  bgColor: string;
};

const Sidebar: React.FC<Props> = ({ bgColor }) => {
  const userNavItems = [
    { name: "Dashboard", path: "/", icon: <Home size={18} className="text-white/70" /> },
    { name: "My Games", path: "/my-games", icon: <Gamepad2 size={18} className="text-white/70" /> },
    { name: "My Leagues", path: "/my-leagues", icon: <Flag size={18} className="text-white/70" /> },
    { name: "Profile", path: "/profile", icon: <User size={18} className="text-white/70" /> },
  ];

  const adminNavItems = [
    { name: "Game Admin", path: "/games", icon: <Wrench size={18} className="text-white/70" /> },
    { name: "League Admin", path: "/leagues", icon: <ShieldCheck size={18} className="text-white/70" /> },
  ];

  return (
    <div
      className="w-56 flex-shrink-0 flex flex-col rounded-r-2xl overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <aside className="flex flex-col h-full w-full px-4 py-6 text-white shadow-md backdrop-blur-md items-center">
        <div className="text-white mb-8 text-xl font-bold flex items-center gap-2">
          <Trophy size={20} />
          <span className="font-cupTitle">De CUP</span>
        </div>

        {/* User navigatie */}
        <nav className="flex flex-col gap-3 w-full">
          {userNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Admin navigatie met scheiding */}
        <div className="mt-4 pt-4 w-full border-t border-white/20">
          <nav className="flex flex-col gap-3 w-full mt-2">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
