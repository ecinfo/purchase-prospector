/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/layout/Sidebar.tsx
import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Building,
  BarChart3,
  Users,
  Settings,
  X,
  LogOut,
  HelpCircle,
  FileText,
  Search,
  Mail,
  Award,
  TrendingUp,
  CheckCircle,
  ListChecks,
} from "lucide-react";
import { useProcurement } from "../../contexts/ProcurementContext";
import { logoutUser } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { AppContext } from "../../contexts/AppContext";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Procurement", href: "/procurement", icon: Building },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Vendors", href: "/vendors", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "History", href: "/history", icon: FileText },
];

const procurementSteps = [
  {
    number: 1,
    name: "Project Input",
    icon: FileText,
    description: "Define requirements",
  },
  {
    number: 2,
    name: "AI Qualification",
    icon: ListChecks,
    description: "Answer questions",
  },
  {
    number: 3,
    name: "Quantification",
    icon: TrendingUp,
    description: "Specifications",
  },
  {
    number: 4,
    name: "Bill of Materials",
    icon: FileText,
    description: "Procurement list",
  },
  {
    number: 5,
    name: "Vendor Search",
    icon: Search,
    description: "Find suppliers",
  },
  {
    number: 6,
    name: "RFP Generation",
    icon: Mail,
    description: "Create proposals",
  },
  {
    number: 7,
    name: "Vendor Outreach",
    icon: Users,
    description: "Collect interest",
  },
  {
    number: 8,
    name: "Bid Collection",
    icon: Award,
    description: "Track responses",
  },
  {
    number: 9,
    name: "Analysis",
    icon: TrendingUp,
    description: "AI optimization",
  },
  {
    number: 10,
    name: "Completion",
    icon: CheckCircle,
    description: "Award & close",
  },
];

const secondaryNav = [
  { name: "Help & Support", href: "/support", icon: HelpCircle },
];

export const Sidebar: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext)!;
  const { state: procurementState } = useProcurement();
  const reduxDispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-close sidebar when route changes on mobile
  useEffect(() => {
    if (state.isMobile) {
      dispatch({ type: "SET_SIDEBAR_OPEN", payload: false });
    }
  }, [location.pathname, state.isMobile, dispatch]);

  const closeSidebar = () => {
    if (state.isMobile) {
      dispatch({ type: "SET_SIDEBAR_OPEN", payload: false });
    }
  };

  const handleLogout = async () => {
    if (token) {
      await reduxDispatch(logoutUser(token));
    }

    navigate("/login", { replace: true });
  };

  const toggleSidebar = () => {
    dispatch({ type: "SET_SIDEBAR_OPEN", payload: !state.sidebarOpen });
  };

  const getStepStatus = (stepNumber: number) => {
    if (!procurementState.currentProject) return "upcoming";
    if (stepNumber < procurementState.currentPhase) return "completed";
    if (stepNumber === procurementState.currentPhase) return "current";
    return "upcoming";
  };

  const getStepIcon = (stepNumber: number, Icon: any) => {
    const status = getStepStatus(stepNumber);
    switch (status) {
      case "completed":
        return (
          <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0" />
        );
      case "current":
        return (
          <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        );
      default:
        return (
          <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
        );
    }
  };

  const getStepColor = (stepNumber: number) => {
    const status = getStepStatus(stepNumber);
    switch (status) {
      case "completed":
        return "text-green-700 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300";
      case "current":
        return "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-800/30 dark:border-gray-700 dark:text-gray-300";
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {state.sidebarOpen && state.isMobile && (
        <div
          className="fixed inset-0 z-40 transition-opacity bg-gray-900/50 backdrop-blur-sm dark:bg-black/60 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-80 border-r
          bg-white dark:bg-gray-900 dark:border-gray-700
          border-gray-200 transform transition-transform duration-300 ease-in-out 
          lg:translate-x-0 lg:static lg:z-auto
          flex flex-col
          ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 h-14 sm:h-16 shrink-0">
          <div className="flex items-center min-w-0 gap-2">
            <div className="p-1.5 bg-blue-600 dark:bg-blue-500 rounded-lg shrink-0">
              <Building className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold text-gray-900 truncate dark:text-gray-100">
              AgentProcure
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 -mr-2 text-gray-400 transition-colors rounded-lg lg:hidden hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {/* Main Menu */}
          <div>
            <p className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
              Main Menu
            </p>
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-5 w-5 shrink-0 ${
                            isActive
                              ? "text-blue-600 dark:text-blue-300"
                              : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
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

          {/* Procurement Steps */}
          {procurementState.currentProject && (
            <div>
              <p className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                Procurement Steps
              </p>
              <div className="space-y-1">
                {procurementSteps.map((step) => {
                  const Icon = step.icon;
                  const status = getStepStatus(step.number);
                  const isCurrent = status === "current";
                  const isCompleted = status === "completed";

                  return (
                    <div
                      key={step.number}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg border transition-colors cursor-default
                        ${getStepColor(step.number)}
                        ${
                          isCurrent
                            ? "ring-2 ring-blue-200 dark:ring-blue-800/50"
                            : ""
                        }
                      `}
                    >
                      <div className="flex items-center justify-center w-6 h-6">
                        {getStepIcon(step.number, Icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{step.name}</span>

                          {isCurrent && (
                            <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              Current
                            </span>
                          )}

                          {isCompleted && (
                            <CheckCircle className="w-3 h-3 text-green-500 dark:text-green-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs truncate opacity-75">
                          {step.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-5 h-5 text-xs font-medium bg-white border rounded-full dark:bg-gray-800 dark:border-gray-700">
                        {step.number}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Project Info */}
              <div className="p-3 mt-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800/40 dark:border-gray-700">
                <p className="mb-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                  Current Project
                </p>
                <p className="text-sm font-semibold text-gray-900 truncate dark:text-gray-100">
                  {procurementState.currentProject.name}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Step {procurementState.currentPhase} of 10
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      procurementState.currentProject.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : procurementState.currentProject.status ===
                          "in_progress"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
                    }`}
                  >
                    {procurementState.currentProject.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Support Section */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
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
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-5 w-5 shrink-0 ${
                            isActive
                              ? "text-blue-600 dark:text-blue-300"
                              : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
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
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-3 p-2 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <img
              className="object-cover rounded-full h-9 w-9 ring-2 ring-gray-100 dark:ring-gray-700 shrink-0"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="User avatar"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                {user ? user.username : "Guest User"}
              </p>
              {/* <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                Purchase Manager
              </p> */}
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors shrink-0"
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
