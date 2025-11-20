// src/services/vendorService.ts
import { type Vendor, type VendorFilter } from '../types';
import { apiService } from './api';

export class VendorService {
    static async getAllVendors(): Promise<Vendor[]> {
        return apiService.getVendors();
    }

    static async searchVendors(filters: VendorFilter): Promise<Vendor[]> {
        return apiService.searchVendors(filters);
    }

    static async getVendorById(id: string): Promise<Vendor> {
        // This would be a specific endpoint in production
        const vendors = await apiService.getVendors();
        const vendor = vendors.find(v => v.id === id);
        if (!vendor) {
            throw new Error(`Vendor with id ${id} not found`);
        }
        return vendor;
    }

    static async getVendorsByCategory(category: string): Promise<Vendor[]> {
        const vendors = await apiService.getVendors();
        return vendors.filter(vendor =>
            vendor.categories.some(cat =>
                cat.toLowerCase().includes(category.toLowerCase())
            )
        );
    }

    static async getTopRatedVendors(limit: number = 10): Promise<Vendor[]> {
        const vendors = await apiService.getVendors();
        return vendors
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    static async getVendorsByLocation(location: string): Promise<Vendor[]> {
        const vendors = await apiService.getVendors();
        return vendors.filter(vendor =>
            vendor.location.city.toLowerCase().includes(location.toLowerCase()) ||
            vendor.location.state.toLowerCase().includes(location.toLowerCase())
        );
    }
}