// src/components/layout/Header.tsx
import React from "react";
import { Menu, Bell, Search } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

export const Header: React.FC = () => {
  const { dispatch } = useApp();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={() =>
              dispatch({ type: "SET_SIDEBAR_OPEN", payload: true })
            }
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="relative ml-4 lg:ml-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search projects, vendors..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="User"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
