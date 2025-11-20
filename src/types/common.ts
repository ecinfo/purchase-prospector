// src/types/common.ts
export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'purchase_manager' | 'project_manager' | 'admin';
    avatar?: string;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface PaginationParams {
    page: number;
    limit: number;
    total: number;
}

export interface SelectOption {
    value: string;
    label: string;
}