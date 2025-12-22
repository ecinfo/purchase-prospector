
import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from '@reduxjs/toolkit';
import ApiHost from '../../utils/http';


export interface User {
    id: string;
    username: string;
    email: string | null;
    phone?: string | null;

    first_name?: string;
    last_name?: string;
    user_role?: string;
    company_name?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    phone: string;
}

// ----------------------
// Initial state
// ----------------------
const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

// ----------------------
// LOGIN (backend returns ONLY token)
// ----------------------
export const loginUser = createAsyncThunk(
    'auth/login',
    async (
        credentials: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(`${ApiHost}/api/users/signin/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            console.log("Backend login data:", data);

            if (!response.ok) {
                return rejectWithValue(data.message || "Login failed");
            }

            // Backend only returns { token }, so we build a user manually
            const user: User = {
                id: crypto.randomUUID(), // temporary unique ID
                username: credentials.username,
                email: null,
                phone: null,
            };

            return { user, token: data.token };
        } catch (error: any) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);

// ----------------------
// REGISTER (backend returns { user, token })
// ----------------------
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: RegisterData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${ApiHost}/api/users/signup/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log("Registration response:", data);

            if (!response.ok) {
                return rejectWithValue(data.message || "Registration failed");
            }

            // Backend returns user; ensure shape is correct
            const user: User = {
                id: data.user.id ?? crypto.randomUUID(),
                username: data.user.username,
                email: data.user.email ?? null,
                phone: data.user.phone ?? null,
            };

            return { user, token: data.token };
        } catch (error: any) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);

export const changePasswordUser = createAsyncThunk(
    "auth/changePassword",
    async (
        data: {
            username: string;
            oldPassword: string;
            newPassword: string;
            token: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(
                `${ApiHost}/api/users/change-password/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${data.token}`,
                    },
                    body: JSON.stringify({
                        username: data.username,
                        old_password: data.oldPassword,
                        new_password: data.newPassword,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                return rejectWithValue(
                    result.message || "Password update failed"
                );
            }

            return result;
        } catch (err: any) {
            return rejectWithValue(err.message || "Network error");
        }
    }
);


export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (
        token: string,
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(
                `${ApiHost}/api/users/logout/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                }
            );

            const result = await response.json();
            console.log("Logout response:", result);
            if (!response.ok) {
                return rejectWithValue(
                    result.message || 'Logout failed'
                );
            }

            return true;
        } catch (error: any) {
            return rejectWithValue(
                error.message || 'Network error'
            );
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.error = null;
            })
            .addCase(changePasswordUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changePasswordUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changePasswordUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

    },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
