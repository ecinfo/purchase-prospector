// src/components/layout/Header.tsx
import React, { useState } from "react";
import { Menu, Bell, Search, X, ChevronDown } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

export const Header: React.FC = () => {
  const { dispatch } = useApp();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 h-14 sm:h-16 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              dispatch({ type: "SET_SIDEBAR_OPEN", payload: true })
            }
            className="p-2 -ml-2 text-gray-500 transition-colors rounded-lg hover:text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Search */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-2 border rounded-lg transition-all ${
              searchFocused
                ? "border-blue-500 ring-2 ring-blue-100 bg-white"
                : "border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400"
            }`}
          >
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              className="w-48 text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none lg:w-64"
              placeholder="Search projects, vendors..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs text-gray-400 bg-gray-100 rounded border border-gray-200">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 text-gray-500 transition-colors rounded-lg hover:text-gray-700 hover:bg-gray-100 sm:hidden"
            aria-label="Search"
          >
            {showMobileSearch ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 text-gray-500 transition-colors rounded-lg hover:text-gray-700 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <img
              className="object-cover w-8 h-8 rounded-full ring-2 ring-gray-100"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="User avatar"
            />
            <div className="hidden text-left md:block">
              <div className="text-sm font-medium text-gray-900">Rajesh K.</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
            <ChevronDown className="hidden w-4 h-4 text-gray-400 md:block" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="px-4 pb-3 sm:hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              className="flex-1 text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
              placeholder="Search projects, vendors..."
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};
