// src/types/procurement.ts

import type { BaseEntity } from "./common";
import type { Vendor } from "./vendor";

export interface ProjectRequirement {
    description: string;
    location: string;
    area: number;
    areaUnit: 'sqft' | 'sqm';
    type: 'residential' | 'commercial' | 'industrial' | 'mixed-use';
    budget: number;
    currency: 'INR' | 'USD';
    timeline: number; // in months
    complexity: 'standard' | 'medium' | 'high' | 'luxury';
}

export interface BOMItem {
    id: string;
    category: string;
    material: string;
    specification: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
    priority: 'high' | 'medium' | 'low';
    notes?: string;
}

// export interface Vendor {
//     id: string;
//     name: string;
//     category: string;
//     location: string;
//     certification: string[];
//     rating: number;
//     experience: number;
//     paymentTerms: string;
//     minOrderValue: number;
//     contact: {
//         email: string;
//         phone: string;
//         person: string;
//     };
// }

export interface RFP {
    id: string;
    bomItems: BOMItem[];
    vendors: Vendor[];
    deadline: string;
    terms: string;
    status: 'draft' | 'sent' | 'in_progress' | 'completed';
}

export interface Bid {
    id: string;
    vendorId: string;
    rfpId: string;
    totalAmount: number;
    breakdown: {
        itemId: string;
        unitPrice: number;
        totalPrice: number;
    }[];
    deliveryTime: number; // in days
    qualityScore: number;
    paymentTerms: string;
    status: 'submitted' | 'under_review' | 'accepted' | 'rejected';
}

export interface ProcurementProject extends BaseEntity {
    name: string;
    requirement: ProjectRequirement;
    currentPhase: number;
    status: 'draft' | 'in_progress' | 'completed' | 'cancelled';
    bom: BOMItem[];
    vendors: Vendor[];
    rfps: RFP[];
    bids: Bid[];
    analysis?: AnalysisReport;
    createdBy: string;
}

export interface AnalysisReport {
    optimalBid: Bid;
    costSavings: number;
    savingsPercentage: number;
    qualityScore: number;
    deliveryScore: number;
    riskAssessment: {
        level: 'low' | 'medium' | 'high';
        factors: string[];
    };
    recommendations: string[];
}