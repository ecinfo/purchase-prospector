// src/services/procurementService.ts
// src/services/procurementService.ts
import type { ProcurementProject, ProjectRequirement, BOMItem, Vendor, Bid } from '../types';
import { apiService } from './api';
import { SimulationService } from './simulationService';

export class ProcurementService {
    static async createProject(name: string, requirement: ProjectRequirement): Promise<ProcurementProject> {
        return apiService.createProject({
            name,
            requirement,
            status: 'draft',
            currentPhase: 1
        });
    }

    static async updateProjectPhase(projectId: string, phase: number): Promise<ProcurementProject> {
        return apiService.updateProject(projectId, { currentPhase: phase });
    }

    static async generateBOM(requirement: ProjectRequirement): Promise<BOMItem[]> {
        // This would call the AI service in production
        return SimulationService.generateBOM(requirement);
    }

    static async findVendors(bom: BOMItem[]): Promise<Vendor[]> {
        // This would call the vendor matching service in production
        return SimulationService.findVendors(bom);
    }

    static async submitBid(bid: Bid): Promise<Bid> {
        // In production, this would submit to the backend
        return Promise.resolve(bid);
    }
}