// src/hooks/useVendors.ts
import { useState, useMemo } from 'react';
import { useVendor } from '../contexts/VendorContext';

export function useVendors() {
    const { state, applyFilters, clearFilters } = useVendor();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVendors = useMemo(() => {
        let filtered = state.vendors;

        // Apply search term
        if (searchTerm) {
            filtered = filtered.filter(vendor =>
                vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
                vendor.location.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply filters
        if (state.filters.categories?.length) {
            filtered = filtered.filter(vendor =>
                vendor.categories.some(cat => state.filters.categories!.includes(cat))
            );
        }

        if (state.filters.locations?.length) {
            filtered = filtered.filter(vendor =>
                state.filters.locations!.includes(vendor.location.city)
            );
        }

        if (state.filters.minRating) {
            filtered = filtered.filter(vendor => vendor.rating >= state.filters.minRating!);
        }

        if (state.filters.minExperience) {
            filtered = filtered.filter(vendor => vendor.experience >= state.filters.minExperience!);
        }

        return filtered;
    }, [state.vendors, state.filters, searchTerm]);

    const vendorStats = useMemo(() => {
        const total = state.vendors.length;
        const averageRating = state.vendors.reduce((sum, vendor) => sum + vendor.rating, 0) / total;
        const topRated = state.vendors.filter(vendor => vendor.rating >= 4.5).length;
        const certified = state.vendors.filter(vendor => vendor.certifications.length > 0).length;

        return {
            total,
            averageRating: Number(averageRating.toFixed(1)),
            topRated,
            certified,
            certifiedPercentage: Math.round((certified / total) * 100)
        };
    }, [state.vendors]);

    return {
        vendors: filteredVendors,
        allVendors: state.vendors,
        filters: state.filters,
        searchTerm,
        setSearchTerm,
        applyFilters,
        clearFilters,
        vendorStats,
        isLoading: state.isLoading
    };
}