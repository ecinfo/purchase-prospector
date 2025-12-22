// src/components/layout/Header.tsx
import React, { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  Search,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { logoutUser } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

export const Header: React.FC = () => {
  const { dispatch } = React.useContext(AppContext)!;
  const reduxDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [searchFocused, setSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const token =
    useAppSelector((state) => state.auth.token) ||
    localStorage.getItem("token");
  /* --------------------------------------------------
     Derived user display values (BACKEND SAFE)
  -------------------------------------------------- */
  const firstName = user?.first_name ?? "";
  const lastName = user?.last_name ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || "User";
  const roleLabel = user?.user_role?.replace("_", " ");
  const company = user?.company_name;

  /* --------------------------------------------------
     Close dropdown on outside click
  -------------------------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".user-dropdown-trigger") &&
        !target.closest(".user-dropdown-content")
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* --------------------------------------------------
     Handlers
  -------------------------------------------------- */
  const handleLogout = () => {
    reduxDispatch(logoutUser(token as string));
    navigate("/login", { replace: true });
    setShowUserDropdown(false);
  };

  const handleProfileClick = () => {
    navigate("/settings");
    setShowUserDropdown(false);
  };

  const toggleSidebar = () => {
    dispatch({ type: "SET_SIDEBAR_OPEN", payload: true });
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 h-14 sm:h-16 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 text-gray-500 transition-colors rounded-lg hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Search */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 border ${
              searchFocused
                ? "border-blue-500 ring-2 ring-blue-200 bg-white dark:bg-gray-800 dark:ring-blue-800 dark:border-blue-400"
                : "border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500"
            }`}
          >
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
            <input
              type="text"
              className="w-48 text-sm text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none lg:w-64 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="Search projects, vendors..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs font-medium text-gray-400 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleMobileSearch}
            className="p-2 text-gray-500 transition-colors rounded-lg hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 sm:hidden"
            aria-label="Search"
          >
            {showMobileSearch ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          <button
            className="relative p-2 text-gray-500 transition-colors rounded-lg hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={toggleUserDropdown}
              className="user-dropdown-trigger flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <img
                className="object-cover w-8 h-8 rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt={fullName}
              />
              <div className="hidden text-left md:block">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {fullName}
                </div>
                <div className="text-xs text-gray-500 capitalize dark:text-gray-400">
                  {roleLabel}
                </div>
              </div>
              <ChevronDown
                className={`hidden w-4 h-4 text-gray-400 dark:text-gray-500 md:block transition-transform ${
                  showUserDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 z-40 w-56 py-2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg user-dropdown-content top-full dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                    {fullName}
                  </div>
                  <div className="text-xs text-gray-500 truncate dark:text-gray-400">
                    {user?.email}
                  </div>
                  {company && (
                    <div className="mt-1 text-xs text-gray-500 capitalize dark:text-gray-400">
                      {company} • {roleLabel}
                    </div>
                  )}
                </div>

                <div className="py-1">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <User className="w-4 h-4" />
                    Profile & Settings
                  </button>

                  <button
                    onClick={() => navigate("/settings")}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Settings className="w-4 h-4" />
                    Preferences
                  </button>
                </div>

                <div className="pt-1 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showMobileSearch && (
        <div className="px-4 pb-3 sm:hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              className="flex-1 text-sm bg-transparent border-none outline-none"
              placeholder="Search projects, vendors..."
              autoFocus
              onBlur={() => setShowMobileSearch(false)}
            />
            <button onClick={() => setShowMobileSearch(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {showUserDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowUserDropdown(false)}
        />
      )}
    </header>
  );
};
