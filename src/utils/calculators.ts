// src/utils/calculators.ts

import type { Bid, BOMItem } from "../types";

export const calculateBOMTotal = (bom: BOMItem[]): number => {
    return bom.reduce((total, item) => total + item.totalPrice, 0);
};

export const calculateSavings = (original: number, optimized: number): { amount: number; percentage: number } => {
    const amount = original - optimized;
    const percentage = (amount / original) * 100;
    return { amount, percentage };
};

export const calculateQualityScore = (bids: Bid[]): number => {
    if (bids.length === 0) return 0;
    const total = bids.reduce((sum, bid) => sum + bid.qualityScore, 0);
    return total / bids.length;
};

export const estimateProjectCost = (area: number, type: string, complexity: string): number => {
    const baseRates: { [key: string]: number } = {
        residential: 1800,
        commercial: 2200,
        industrial: 1600,
        'mixed-use': 2000
    };

    const complexityMultiplier: { [key: string]: number } = {
        standard: 1.0,
        medium: 1.2,
        high: 1.5,
        luxury: 2.0
    };

    const baseRate = baseRates[type] || 2000;
    const multiplier = complexityMultiplier[complexity] || 1.0;

    return area * baseRate * multiplier;
};