// src/contexts/ProcurementContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type {
  ProcurementProject,
  ProjectRequirement,
  BOMItem,
  Vendor,
  RFP,
  Bid,
  AnalysisReport,
} from "../types";

interface ProcurementState {
  currentProject: ProcurementProject | null;
  currentPhase: number;
  projects: ProcurementProject[];
  isLoading: boolean;
}

type ProcurementAction =
  | { type: "SET_CURRENT_PROJECT"; payload: ProcurementProject | null }
  | { type: "SET_CURRENT_PHASE"; payload: number }
  | { type: "SET_PROJECTS"; payload: ProcurementProject[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "UPDATE_REQUIREMENT"; payload: ProjectRequirement }
  | { type: "SET_BOM"; payload: BOMItem[] }
  | { type: "SET_VENDORS"; payload: Vendor[] }
  | { type: "SET_RFPS"; payload: RFP[] }
  | { type: "SET_BIDS"; payload: Bid[] }
  | { type: "SET_ANALYSIS"; payload: AnalysisReport }
  | { type: "COMPLETE_PROJECT" }
  | { type: "CREATE_PROJECT"; payload: { name: string; description: string } }
  | { type: "RESET_CURRENT_PROJECT" };

interface ProcurementContextType {
  state: ProcurementState;
  dispatch: React.Dispatch<ProcurementAction>;
  createNewProject: (name: string, description: string) => void;
  moveToNextPhase: () => void;
  moveToPreviousPhase: () => void;
  completeProject: (analysis: AnalysisReport) => void;
  resetCurrentProject: () => void;
}

const ProcurementContext = createContext<ProcurementContextType | undefined>(
  undefined
);

const initialState: ProcurementState = {
  currentProject: null,
  currentPhase: 1,
  projects: [],
  isLoading: false,
};

function procurementReducer(
  state: ProcurementState,
  action: ProcurementAction
): ProcurementState {
  switch (action.type) {
    case "CREATE_PROJECT": {
      const newProject: ProcurementProject = {
        id: Date.now().toString(),
        name: action.payload.name,
        requirement: {
          description: action.payload.description,
          location: "",
          area: 0,
          areaUnit: "sqft",
          type: "residential",
          budget: 0,
          currency: "INR",
          timeline: 6,
          complexity: "medium",
        },
        currentPhase: 1,
        status: "draft",
        bom: [],
        vendors: [],
        rfps: [],
        bids: [],
        analysis: undefined,
        createdBy: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        currentProject: newProject,
        currentPhase: 1,
        projects: [...state.projects, newProject],
      };
    }

    case "SET_CURRENT_PROJECT":
      return { ...state, currentProject: action.payload };

    case "SET_CURRENT_PHASE":
      return {
        ...state,
        currentPhase: action.payload,
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              currentPhase: action.payload,
            }
          : null,
      };

    case "SET_PROJECTS":
      return { ...state, projects: action.payload };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "UPDATE_REQUIREMENT":
      return {
        ...state,
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              requirement: action.payload,
            }
          : null,
      };

    case "SET_BOM":
      return {
        ...state,
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              bom: action.payload,
            }
          : null,
      };

    case "SET_VENDORS":
      return {
        ...state,
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              vendors: action.payload,
            }
          : null,
      };

    case "SET_RFPS":
      return {
        ...state,
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              rfps: action.payload,
            }
          : null,
      };

    case "SET_BIDS":
      return {
        ...state,
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              bids: action.payload,
            }
          : null,
      };

    case "SET_ANALYSIS":
      return {
        ...state,
        currentProject: state.currentProject
          ? {
              ...state.currentProject,
              analysis: action.payload,
            }
          : null,
      };

    case "COMPLETE_PROJECT": {
      if (!state.currentProject) return state;

      const completedProject: ProcurementProject = {
        ...state.currentProject,
        status: "completed",
        updatedAt: new Date().toISOString(),
      };

      return {
        ...state,
        currentProject: completedProject,
        projects: state.projects.map((project) =>
          project.id === state.currentProject?.id ? completedProject : project
        ),
      };
    }

    case "RESET_CURRENT_PROJECT":
      return {
        ...state,
        currentProject: null,
        currentPhase: 1,
      };

    default:
      return state;
  }
}

export function ProcurementProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(procurementReducer, initialState);

  const createNewProject = (name: string, description: string) => {
    dispatch({
      type: "CREATE_PROJECT",
      payload: { name, description },
    });
  };

  const moveToNextPhase = () => {
    if (state.currentPhase < 10) {
      dispatch({ type: "SET_CURRENT_PHASE", payload: state.currentPhase + 1 });
    }
  };

  const moveToPreviousPhase = () => {
    if (state.currentPhase > 1) {
      dispatch({ type: "SET_CURRENT_PHASE", payload: state.currentPhase - 1 });
    }
  };

  const completeProject = (analysis: AnalysisReport) => {
    // First set the analysis
    dispatch({ type: "SET_ANALYSIS", payload: analysis });
    // Then mark the project as completed
    dispatch({ type: "COMPLETE_PROJECT" });
  };

  const resetCurrentProject = () => {
    dispatch({ type: "SET_CURRENT_PROJECT", payload: null });
    dispatch({ type: "SET_CURRENT_PHASE", payload: 1 });
  };

  const value: ProcurementContextType = {
    state,
    dispatch,
    createNewProject,
    moveToNextPhase,
    moveToPreviousPhase,
    completeProject,
    resetCurrentProject,
  };

  return (
    <ProcurementContext.Provider value={value}>
      {children}
    </ProcurementContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProcurement() {
  const context = useContext(ProcurementContext);
  if (context === undefined) {
    throw new Error("useProcurement must be used within a ProcurementProvider");
  }
  return context;
}
