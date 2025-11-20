// src/services/api.ts
// src/services/api.ts
import type { ProcurementProject, Vendor, AnalysisReport } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return response.json();
    }

    // Procurement endpoints
    async getProjects(): Promise<ProcurementProject[]> {
        return this.request('/procurement/projects');
    }

    async createProject(project: Partial<ProcurementProject>): Promise<ProcurementProject> {
        return this.request('/procurement/projects', {
            method: 'POST',
            body: JSON.stringify(project),
        });
    }

    async updateProject(id: string, updates: Partial<ProcurementProject>): Promise<ProcurementProject> {
        return this.request(`/procurement/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }

    // Vendor endpoints
    async getVendors(): Promise<Vendor[]> {
        return this.request('/vendors');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async searchVendors(filters: any): Promise<Vendor[]> {
        return this.request('/vendors/search', {
            method: 'POST',
            body: JSON.stringify(filters),
        });
    }

    // Analytics endpoints
    async getAnalytics(): Promise<AnalysisReport> {
        return this.request('/analytics');
    }
}

export const apiService = new ApiService();