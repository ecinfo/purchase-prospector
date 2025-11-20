// src/components/layout/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Building, BarChart3, Users, Settings, X } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Procurement", href: "/procurement", icon: Building },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Vendors", href: "/vendors", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useApp();

  return (
    <>
      {/* Mobile overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => dispatch({ type: "SET_SIDEBAR_OPEN", payload: false })}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Agentic Enterprise Procurement
            </span>
          </div>
          <button
            onClick={() =>
              dispatch({ type: "SET_SIDEBAR_OPEN", payload: false })
            }
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                  onClick={() =>
                    window.innerWidth < 1024 &&
                    dispatch({ type: "SET_SIDEBAR_OPEN", payload: false })
                  }
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="User"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Rajesh Kumar</p>
              <p className="text-xs text-gray-500">Purchase Manager</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
