// src/types/analytics.ts
export interface ROIMetrics {
    costSavings: number;
    timeSavings: number;
    processEfficiency: number;
    vendorResponseRate: number;
    automationRate: number;
}

export interface CostAnalysis {
    projectValue: number;
    estimatedSavings: number;
    actualSavings: number;
    savingsByCategory: {
        category: string;
        estimated: number;
        actual: number;
    }[];
}

export interface PerformanceMetrics {
    avgProcurementTime: number;
    vendorResponseRate: number;
    bidSuccessRate: number;
    qualityScore: number;
    onTimeDelivery: number;
}