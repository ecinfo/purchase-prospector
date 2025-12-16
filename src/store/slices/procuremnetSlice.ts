import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import ApiHost from "../../utils/http";

// ----------------------
// Types
// ----------------------
export interface Project {
    id: number;
    name: string;
    description: string;
}

interface CreateProjectPayload {
    name: string;
    description: string;
    token: string;
}

interface ProjectState {
    project: Project | null;
    isLoading: boolean;
    error: string | null;
}

// ----------------------
// Initial State
// ----------------------
const initialState: ProjectState = {
    project: null,
    isLoading: false,
    error: null,
};

// ----------------------
// Async Thunk
// ----------------------
export const createProject = createAsyncThunk<
    Project,
    CreateProjectPayload,
    { rejectValue: string }
>(
    "project/createProject",
    async ({ name, description, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${ApiHost}/api/procurement/project/create/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({ name, description }),
                }
            );

            const result = await response.json();
            console.log("Create Project Response:", result);
            if (!response.ok) {
                return rejectWithValue(result.message || "Project creation failed");
            }

            return result.data ?? result;
        } catch (error: any) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);

// ----------------------
// Slice
// ----------------------
const procurementSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        clearProject(state) {
            state.project = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                createProject.fulfilled,
                (state, action: PayloadAction<Project>) => {
                    state.isLoading = false;
                    state.project = action.payload;
                }
            )
            .addCase(
                createProject.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload || "Something went wrong";
                }
            );
    },
});

export const { clearProject } = procurementSlice.actions;
export default procurementSlice.reducer;
