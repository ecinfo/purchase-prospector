/* eslint-disable react-refresh/only-export-components */
// src/contexts/VendorContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { Vendor, VendorFilter } from "../types";

interface VendorState {
  vendors: Vendor[];
  filters: VendorFilter;
  selectedVendor: Vendor | null;
  isLoading: boolean;
}

type VendorAction =
  | { type: "SET_VENDORS"; payload: Vendor[] }
  | { type: "SET_FILTERS"; payload: VendorFilter }
  | { type: "SET_SELECTED_VENDOR"; payload: Vendor | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "ADD_VENDOR"; payload: Vendor }
  | { type: "UPDATE_VENDOR"; payload: Vendor }
  | { type: "DELETE_VENDOR"; payload: string };

interface VendorContextType {
  state: VendorState;
  dispatch: React.Dispatch<VendorAction>;
  applyFilters: (filters: VendorFilter) => void;
  clearFilters: () => void;
}

const VendorContext = createContext<VendorContextType | undefined>(undefined);

const initialState: VendorState = {
  vendors: [],
  filters: {},
  selectedVendor: null,
  isLoading: false,
};

function vendorReducer(state: VendorState, action: VendorAction): VendorState {
  switch (action.type) {
    case "SET_VENDORS":
      return { ...state, vendors: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "SET_SELECTED_VENDOR":
      return { ...state, selectedVendor: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "ADD_VENDOR":
      return { ...state, vendors: [...state.vendors, action.payload] };
    case "UPDATE_VENDOR":
      return {
        ...state,
        vendors: state.vendors.map((v) =>
          v.id === action.payload.id ? action.payload : v
        ),
      };
    case "DELETE_VENDOR":
      return {
        ...state,
        vendors: state.vendors.filter((v) => v.id !== action.payload),
      };
    default:
      return state;
  }
}

export function VendorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(vendorReducer, initialState);

  const applyFilters = (filters: VendorFilter) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: "SET_FILTERS", payload: {} });
  };

  const value: VendorContextType = {
    state,
    dispatch,
    applyFilters,
    clearFilters,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
}

export function useVendor() {
  const context = useContext(VendorContext);
  if (context === undefined) {
    throw new Error("useVendor must be used within a VendorProvider");
  }
  return context;
}
