import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import ApiHost, { getApiHeaders } from "../../utils/http";

/* ======================================================
   Types
====================================================== */

export interface Project {
    id: number;
    name: string;
    description: string;
    progress_status?: string;
    start_date?: string;
    updated_at?: string;
    user?: number;
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

interface CreateProjectPayload {
    name: string;
    description: string;
    token: string;
}

interface FetchProjectsPayload {
    token: string;
    page?: number;
}

interface ProjectState {
    project: Project | null;
    projects: Project[];
    totalCount: number;
    next: string | null;
    previous: string | null;
    page: number;
    isLoading: boolean;
    error: string | null;
}

/* ======================================================
   Initial State
====================================================== */

const initialState: ProjectState = {
    project: null,
    projects: [],
    totalCount: 0,
    next: null,
    previous: null,
    page: 1,
    isLoading: false,
    error: null,
};

/* ======================================================
   Create Project
====================================================== */

export const createProject = createAsyncThunk<
    Project,
    CreateProjectPayload,
    { rejectValue: string }
>("project/createProject", async ({ name, description, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${ApiHost}/api/procurement/project/create/`,
            { name, description },
            {
                headers: getApiHeaders(token),
            }
        );

        return response.data.data ?? response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Project creation failed"
            );
        }
        return rejectWithValue("Network error");
    }
});

/* ======================================================
   Fetch Projects (Paginated)
====================================================== */

export const fetchProjects = createAsyncThunk<
    PaginatedResponse<Project>,
    FetchProjectsPayload,
    { rejectValue: string }
>("project/fetchProjects", async ({ token, page = 1 }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${ApiHost}/api/procurement/projects/list/?page=${page}`,
            {
                headers: getApiHeaders(token),
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch projects"
            );
        }
        return rejectWithValue("Network error");
    }
});

/* ======================================================
   Slice
====================================================== */

const procurementSlice = createSlice({
    name: "procurement",
    initialState,
    reducers: {
        clearProject(state) {
            state.project = null;
            state.error = null;
        },
        resetProjects(state) {
            state.projects = [];
            state.page = 1;
            state.next = null;
            state.previous = null;
            state.totalCount = 0;
            state.error = null;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            /* --------------------
               Create Project
            -------------------- */
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.project = action.payload;
                state.projects.unshift(action.payload);
                state.totalCount += 1;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            })

            /* --------------------
               Fetch Projects
            -------------------- */
            .addCase(fetchProjects.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.isLoading = false;

                const { results, count, next, previous } = action.payload;

                // Page 1 = replace, Page > 1 = append
                if (state.page === 1) {
                    state.projects = results;
                } else {
                    state.projects.push(...results);
                }

                state.totalCount = count;
                state.next = next;
                state.previous = previous;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Unable to load projects";
            });
    },
});

/* ======================================================
   Exports
====================================================== */

export const { clearProject, resetProjects, setPage } =
    procurementSlice.actions;

export default procurementSlice.reducer;
