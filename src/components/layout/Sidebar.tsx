// src/components/layout/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Building,
  BarChart3,
  Users,
  Settings,
  X,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { useApp } from "../../contexts/AppContext";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Procurement", href: "/procurement", icon: Building },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Vendors", href: "/vendors", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

const secondaryNav = [
  { name: "Help & Support", href: "/support", icon: HelpCircle },
];

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useApp();

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      dispatch({ type: "SET_SIDEBAR_OPEN", payload: false });
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => dispatch({ type: "SET_SIDEBAR_OPEN", payload: false })}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out 
          lg:translate-x-0 lg:static lg:z-auto
          flex flex-col
          ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 border-b border-gray-200 h-14 sm:h-16 shrink-0">
          <div className="flex items-center min-w-0 gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg shrink-0">
              <Building className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold text-gray-900 truncate">
              AgentProcure
            </span>
          </div>
          <button
            onClick={() =>
              dispatch({ type: "SET_SIDEBAR_OPEN", payload: false })
            }
            className="p-2 -mr-2 text-gray-400 transition-colors rounded-lg lg:hidden hover:text-gray-600 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors  ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`h-5 w-5 shrink-0 ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                      {item.name}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Secondary Navigation */}
          <div className="pt-4 mt-8 border-t border-gray-200">
            <p className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Support
            </p>
            <div className="space-y-1">
              {secondaryNav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-5 w-5 shrink-0 ${
                            isActive
                              ? "text-blue-600"
                              : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        />
                        {item.name}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-gray-200 shrink-0">
          <div className="flex items-center gap-3 p-2 transition-colors rounded-lg cursor-pointer hover:bg-gray-50">
            <img
              className="object-cover rounded-full h-9 w-9 ring-2 ring-gray-100 shrink-0"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="User avatar"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Rajesh Kumar
              </p>
              <p className="text-xs text-gray-500 truncate">Purchase Manager</p>
            </div>
            <button
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
