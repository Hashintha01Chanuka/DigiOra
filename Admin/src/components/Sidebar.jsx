import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Settings,
  FileText,
  MessageSquare,
  Navigation,
  BarChart3,
  Palette,
  ImageIcon,
  Info,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: BarChart3 },
    { name: "Add Image", href: "/add-image", icon: Home },
    { name: "Add Youtube Video", href: "/add-video", icon: User },
    { name: "Add Services", href: "/add-service", icon: Settings },
    { name: "About Page Gallery", href: "/about-page", icon: ImageIcon },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-full py-3 bg-white shadow-lg border-r border-gray-200 z-40">
      <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-2xl font-bold tracking-tight cursor-pointer text-gray-900">
            DigiOra<span className="text-red-500">Media</span>
          </span>
        </div>
      </div>

      <nav className="mt-6 px-3 h-full overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white border-r-2 border-black"
                    : "text-gray-700 hover:bg-gray-200 hover:text-black"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-black group-hover:text-black"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

                  

export default Sidebar;
