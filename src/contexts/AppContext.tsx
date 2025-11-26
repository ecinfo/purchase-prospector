// src/contexts/AppContext.tsx
import React, {
  createContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../types";

interface AppState {
  user: User | null;
  isLoading: boolean;
  theme: "light" | "dark";
  sidebarOpen: boolean;
  isMobile: boolean;
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "SET_SIDEBAR_OPEN"; payload: boolean }
  | { type: "SET_IS_MOBILE"; payload: boolean };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  user: {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@construction.com",
    role: "purchase_manager",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  isLoading: false,
  theme: "light",
  sidebarOpen: false, // Changed to false by default
  isMobile: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_SIDEBAR_OPEN":
      return { ...state, sidebarOpen: action.payload };
    case "SET_IS_MOBILE":
      return { ...state, isMobile: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Detect mobile view and handle sidebar state
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      dispatch({ type: "SET_IS_MOBILE", payload: isMobile });

      // Auto-close sidebar on mobile
      if (isMobile) {
        dispatch({ type: "SET_SIDEBAR_OPEN", payload: false });
      }
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const value: AppContextType = {
    state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext };
