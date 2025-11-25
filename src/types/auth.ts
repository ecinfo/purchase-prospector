// src/types/auth.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'purchase_manager' | 'project_manager' | 'admin' | 'vendor';
    company?: string;
    avatar?: string;
    createdAt: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    company: string;
    role: 'purchase_manager' | 'project_manager' | 'admin' | 'vendor';
    agreeToTerms: boolean;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}