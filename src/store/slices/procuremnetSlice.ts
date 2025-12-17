/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface UpdateProjectPayload {
    id: number;
    data: Partial<Project>;
    token: string;
}

interface DeleteProjectPayload {
    id: number;
    token: string;
}

interface DeleteAllProjectsPayload {
    token: string;
    ids?: number[]; // optional: delete selected
}

interface SubmitQualificationPayload {
    projectId: number;
    token: string;
    answers: any;
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

    qualificationSubmitting: boolean;
    qualificationSuccess: boolean;
    qualificationError: string | null;
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

    qualificationSubmitting: false,
    qualificationSuccess: false,
    qualificationError: null,
};

/* ======================================================
   Thunks
====================================================== */

/* -------- Create Project -------- */
export const createProject = createAsyncThunk<
    Project,
    CreateProjectPayload,
    { rejectValue: string }
>("project/createProject", async ({ name, description, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${ApiHost}/api/procurement/project/create/`,
            { name, description },
            { headers: getApiHeaders(token) }
        );
        console.log("Create Project Response:", response.data);
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

/* -------- Fetch Projects -------- */
export const fetchProjects = createAsyncThunk<
    PaginatedResponse<Project>,
    FetchProjectsPayload,
    { rejectValue: string }
>("project/fetchProjects", async ({ token, page = 1 }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${ApiHost}/api/procurement/projects/list/?page=${page}`,
            { headers: getApiHeaders(token) }
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

/* -------- Get Project -------- */
export const getProjectById = createAsyncThunk<
    Project,
    { id: number; token: string },
    { rejectValue: string }
>("project/getProjectById", async ({ id, token }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${ApiHost}/api/procurement/project/${id}/`,
            { headers: getApiHeaders(token) }
        );
        return response.data.data ?? response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to retrieve project"
            );
        }
        return rejectWithValue("Network error");
    }
});

/* -------- Update Project -------- */
export const updateProject = createAsyncThunk<
    Project,
    UpdateProjectPayload,
    { rejectValue: string }
>("project/updateProject", async ({ id, data, token }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(
            `${ApiHost}/api/procurement/project/${id}/`,
            data,
            { headers: getApiHeaders(token) }
        );
        return response.data.data ?? response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Project update failed"
            );
        }
        return rejectWithValue("Network error");
    }
});

/* -------- Delete Project -------- */
export const deleteProject = createAsyncThunk<
    number,
    DeleteProjectPayload,
    { rejectValue: string }
>("project/deleteProject", async ({ id, token }, { rejectWithValue }) => {
    try {
        await axios.delete(
            `${ApiHost}/api/procurement/project/${id}/`,
            { headers: getApiHeaders(token) }
        );
        return id;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Project deletion failed"
            );
        }
        return rejectWithValue("Network error");
    }
});

/* -------- Delete All / Selected Projects -------- */
export const deleteAllProjects = createAsyncThunk<
    number[] | void,
    DeleteAllProjectsPayload,
    { rejectValue: string }
>("project/deleteAllProjects", async ({ token, ids }, { rejectWithValue }) => {
    try {
        await axios.delete(
            `${ApiHost}/api/procurement/projects/list/`,
            {
                headers: getApiHeaders(token),
                data: ids ? { ids } : undefined,
            }
        );
        return ids;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete projects"
            );
        }
        return rejectWithValue("Network error");
    }
});

/* -------- Submit Qualification -------- */
export const submitProjectQualification = createAsyncThunk<
    any,
    SubmitQualificationPayload,
    { rejectValue: string }
>("project/submitProjectQualification", async ({ projectId, token, answers }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${ApiHost}/api/procurement/project/${projectId}/user-message-input/create/`,
            { answers },
            { headers: getApiHeaders(token) }
        );
        return response.data;
    } catch (error) {
        console.log("Error in submitProjectQualification:", error);
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Qualification submission failed"
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
        clearQualificationStatus(state) {
            state.qualificationSubmitting = false;
            state.qualificationSuccess = false;
            state.qualificationError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* Fetch */
            .addCase(fetchProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                const { results, count, next, previous } = action.payload;

                state.projects =
                    state.page === 1 ? results : [...state.projects, ...results];

                state.totalCount = count;
                state.next = next;
                state.previous = previous;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Fetch failed";
            })

            /* Qualification */
            .addCase(submitProjectQualification.pending, (state) => {
                state.qualificationSubmitting = true;
                state.qualificationSuccess = false;
                state.qualificationError = null;
            })
            .addCase(submitProjectQualification.fulfilled, (state) => {
                state.qualificationSubmitting = false;
                state.qualificationSuccess = true;
            })
            .addCase(submitProjectQualification.rejected, (state, action) => {
                state.qualificationSubmitting = false;
                state.qualificationError =
                    action.payload || "Qualification submission failed";
            });
    },
});

/* ======================================================
   Exports
====================================================== */

export const {
    clearProject,
    resetProjects,
    setPage,
    clearQualificationStatus,
} = procurementSlice.actions;

export default procurementSlice.reducer;
