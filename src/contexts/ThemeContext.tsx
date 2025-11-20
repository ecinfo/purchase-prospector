/* eslint-disable react-refresh/only-export-components */
// src/contexts/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

type ThemeAction =
  | { type: "TOGGLE_THEME" }
  | { type: "SET_THEME"; payload: Theme };

interface ThemeContextType {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const initialState: ThemeState = {
  theme: "light",
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { theme: state.theme === "light" ? "dark" : "light" };
    case "SET_THEME":
      return { theme: action.payload };
    default:
      return state;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const value: ThemeContextType = {
    state,
    dispatch,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
