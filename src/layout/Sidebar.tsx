import React from "react";
import { NavLink } from "react-router-dom";
import { Trophy, Home, Users, Gamepad2, Flag, User } from "lucide-react";

type Props = {
  bgColor: string;
};

const Sidebar: React.FC<Props> = ({ bgColor }) => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: <Home size={18} className="text-white/70" /> },
    { name: "Participants", path: "/participants", icon: <Users size={18} className="text-white/70" /> },
    { name: "Games", path: "/games", icon: <Gamepad2 size={18} className="text-white/70" /> },
    { name: "Leagues", path: "/leagues", icon: <Flag size={18} className="text-white/70" /> },
    { name: "Profile", path: "/profile", icon: <User size={18} className="text-white/70" /> },
  ];

  return (
    <div
      className="w-56 flex-shrink-0 flex flex-col rounded-r-2xl overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <aside className="flex flex-col h-full w-full px-4 py-6 text-white shadow-md backdrop-blur-md items-center">
        {/* HEADER */}
        <div className="text-white mb-8 text-xl font-bold flex items-center gap-2">
          <Trophy size={20} />
          <span className="font-cupTitle">De CUP</span>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-3 w-full">
          {navItems.map((item) => (
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
      </aside>
    </div>
  );
};

export default Sidebar;
