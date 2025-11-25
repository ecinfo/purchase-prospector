// // src/store/slices/authSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// export interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: 'purchase_manager' | 'project_manager' | 'admin';
//     company?: string;
//     avatar?: string;
// }

// export interface AuthState {
//     user: User | null;
//     token: string | null;
//     isLoading: boolean;
//     error: string | null;
// }

// export interface LoginCredentials {
//     email: string;
//     password: string;
// }

// export interface RegisterData {
//     name: string;
//     email: string;
//     password: string;
//     company: string;
//     role: 'purchase_manager' | 'project_manager';
// }

// const initialState: AuthState = {
//     user: null,
//     token: localStorage.getItem('token'),
//     isLoading: false,
//     error: null,
// };

// // Async thunks
// export const loginUser = createAsyncThunk(
//     'auth/login',
//     async (credentials: LoginCredentials, { rejectWithValue }) => {
//         try {
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 1500));

//             // Mock authentication - in real app, this would be an API call
//             if (credentials.email === 'demo@company.com' && credentials.password === 'password') {
//                 const user: User = {
//                     id: '1',
//                     name: 'Rajesh Kumar',
//                     email: credentials.email,
//                     role: 'purchase_manager',
//                     company: 'ABC Construction Ltd.',
//                     avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
//                 };
//                 const token = 'mock-jwt-token';

//                 localStorage.setItem('token', token);
//                 localStorage.setItem('user', JSON.stringify(user));

//                 return { user, token };
//             } else {
//                 throw new Error('Invalid email or password');
//             }
//         } catch (error: any) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const registerUser = createAsyncThunk(
//     'auth/register',
//     async (userData: RegisterData, { rejectWithValue }) => {
//         try {
//             // Simulate API call
//             await new Promise(resolve => setTimeout(resolve, 1500));

//             const user: User = {
//                 id: Date.now().toString(),
//                 name: userData.name,
//                 email: userData.email,
//                 role: userData.role,
//                 company: userData.company,
//                 avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=3B82F6&color=fff`
//             };
//             const token = 'mock-jwt-token';

//             localStorage.setItem('token', token);
//             localStorage.setItem('user', JSON.stringify(user));

//             return { user, token };
//         } catch (error: any) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// export const logoutUser = createAsyncThunk(
//     'auth/logout',
//     async () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//     }
// );

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         clearError: (state) => {
//             state.error = null;
//         },
//         setUser: (state, action: PayloadAction<User>) => {
//             state.user = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Login
//             .addCase(loginUser.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.user = action.payload.user;
//                 state.token = action.payload.token;
//                 state.error = null;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })
//             // Register
//             .addCase(registerUser.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.user = action.payload.user;
//                 state.token = action.payload.token;
//                 state.error = null;
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             })
//             // Logout
//             .addCase(logoutUser.fulfilled, (state) => {
//                 state.user = null;
//                 state.token = null;
//                 state.error = null;
//             });
//     },
// });

// export const { clearError, setUser } = authSlice.actions;
// export default authSlice.reducer;