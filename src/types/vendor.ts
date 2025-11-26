// src/types/vendor.ts
// src/types/vendor.ts

import type { BaseEntity } from "./common";

export interface Vendor extends BaseEntity {
    name: string;
    type: 'manufacturer' | 'distributor' | 'retailer';
    categories: string[];
    location: {
        city: string;
        state: string;
        country: string;
        pincode: string;
    };
    certifications: string[];
    rating: number;
    totalProjects: number;
    experience: number; // in years
    paymentTerms: string[];
    minOrderValue: number;
    contact: {
        primary: ContactPerson;
        secondary?: ContactPerson;
    };
    performance: {
        onTimeDelivery: number;
        qualityRating: number;
        communication: number;
    };
    source: 'indiamart' | 'tradeindia' | 'udaan' | 'justdial' | 'google' | 'constructconnect';

    // 🔥 ADD THESE FIELDS FOR RFP WORKFLOW
    selectedItems?: (string | number)[];
    specializations?: {
        item: string | number;
        category: string;
    }[];

    quantities?: Record<string | number, number>;
    specifications?: Record<string | number, string>;
}


export interface ContactPerson {
    name: string;
    email: string;
    phone: string;
    designation: string;
}

export interface VendorFilter {
    categories?: string[];
    locations?: string[];
    certifications?: string[];
    minRating?: number;
    minExperience?: number;
    paymentTerms?: string[];
}