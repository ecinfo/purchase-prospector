// src/utils/validation.ts
import { type ProjectRequirement, type BOMItem } from '../types';

export const validateRequirement = (requirement: Partial<ProjectRequirement>): string[] => {
    const errors: string[] = [];

    if (!requirement.description?.trim()) {
        errors.push('Project description is required');
    }

    if (!requirement.location?.trim()) {
        errors.push('Project location is required');
    }

    if (!requirement.area || requirement.area <= 0) {
        errors.push('Valid project area is required');
    }

    if (!requirement.budget || requirement.budget <= 0) {
        errors.push('Valid project budget is required');
    }

    if (!requirement.timeline || requirement.timeline <= 0) {
        errors.push('Valid project timeline is required');
    }

    return errors;
};

export const validateBOM = (bom: BOMItem[]): string[] => {
    const errors: string[] = [];

    if (bom.length === 0) {
        errors.push('Bill of Materials cannot be empty');
    }

    bom.forEach((item, index) => {
        if (!item.material.trim()) {
            errors.push(`Item ${index + 1}: Material name is required`);
        }
        if (!item.quantity || item.quantity <= 0) {
            errors.push(`Item ${index + 1}: Valid quantity is required`);
        }
        if (!item.unitPrice || item.unitPrice <= 0) {
            errors.push(`Item ${index + 1}: Valid unit price is required`);
        }
    });

    return errors;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateVendorSelection = (vendors: any[]): string[] => {
    const errors: string[] = [];

    if (vendors.length === 0) {
        errors.push('At least one vendor must be selected');
    }

    if (vendors.length < 3) {
        errors.push('Minimum 3 vendors recommended for competitive bidding');
    }

    return errors;
};