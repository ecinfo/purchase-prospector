/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiHost, { getApiHeaders } from '../../utils/http';

// ----------------------
// Types
// ----------------------
export interface UserProfile {
    id: number;
    username: string;
    email: string | null;
    user_role: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    company_name: string | null;
    designation: string | null;
    email_notification: boolean;
    bid_alerts: boolean;
    project_updates: boolean;
}

interface ProfileState {
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
}

// ----------------------
// Initial State
// ----------------------
const initialState: ProfileState = {
    profile: null,
    isLoading: false,
    error: null,
};

// ----------------------
// Fetch Profile
// ----------------------
export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${ApiHost}/api/users/profile/`, {
                method: 'GET',
                headers: getApiHeaders(token),
            });

            const result = await response.json();
            if (!response.ok) {
                return rejectWithValue(result?.message || 'Failed to fetch profile');
            }

            return result.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// ----------------------
// UPDATE PROFILE (PATCH)
// ----------------------
export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async (
        { token, data }: { token: string; data: Partial<UserProfile> },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(`${ApiHost}/api/users/profile/`, {
                method: 'PATCH',
                headers: getApiHeaders(token),
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) {
                return rejectWithValue(result?.message || 'Profile update failed');
            }

            return result.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// ----------------------
// Slice
// ----------------------
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfile(state) {
            state.profile = null;
            state.error = null;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Update
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload; // server returns updated profile
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
