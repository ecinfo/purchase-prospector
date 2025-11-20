/* eslint-disable react-hooks/purity */
// src/hooks/useAnalytics.ts
import { useMemo } from 'react';
import { useProcurement } from '../contexts/ProcurementContext';

export function useAnalytics() {
    const { state } = useProcurement();

    const analytics = useMemo(() => {
        const projects = state.projects;
        const completedProjects = projects.filter(p => p.status === 'completed');
        const inProgressProjects = projects.filter(p => p.status === 'in_progress');

        // Cost savings calculation
        const totalSavings = completedProjects.reduce((sum, project) => {
            if (project.analysis) {
                return sum + project.analysis.costSavings;
            }
            return sum;
        }, 0);

        const totalProjectValue = completedProjects.reduce((sum, project) => {
            return sum + project.requirement.budget;
        }, 0);

        const averageSavingsPercentage = totalProjectValue > 0
            ? (totalSavings / totalProjectValue) * 100
            : 0;

        // Time efficiency
        const averageProcurementTime = completedProjects.length > 0
            ? completedProjects.reduce((sum) => {
                // This would be calculated based on actual timestamps in a real app
                return sum + 5; // Assuming 5 days average for demo
            }, 0) / completedProjects.length
            : 0;

        // Vendor performance
        const totalVendors = new Set(
            completedProjects.flatMap(p => p.vendors.map(v => v.id))
        ).size;

        const vendorResponseRate = completedProjects.length > 0
            ? completedProjects.reduce((sum, project) => {
                const respondedVendors = project.bids.length;
                const totalContactedVendors = project.vendors.length;
                return sum + (respondedVendors / totalContactedVendors) * 100;
            }, 0) / completedProjects.length
            : 0;

        return {
            totalProjects: projects.length,
            completedProjects: completedProjects.length,
            inProgressProjects: inProgressProjects.length,
            totalSavings,
            averageSavingsPercentage: Number(averageSavingsPercentage.toFixed(1)),
            averageProcurementTime: Number(averageProcurementTime.toFixed(1)),
            totalVendors,
            vendorResponseRate: Number(vendorResponseRate.toFixed(1)),
            automationRate: 85, // This would be calculated based on process analysis
            roi: 3.5 // This would be calculated based on savings vs cost
        };
    }, [state.projects]);

    const monthlyData = useMemo(() => {
        // Generate mock monthly data for charts
        return Array.from({ length: 6 }, (_, i) => {
            const month = new Date();
            month.setMonth(month.getMonth() - (5 - i));

            return {
                month: month.toLocaleDateString('en-US', { month: 'short' }),
                savings: Math.floor(Math.random() * 2000000) + 1000000,
                projects: Math.floor(Math.random() * 8) + 4,
                efficiency: Math.floor(Math.random() * 20) + 80
            };
        });
    }, []);

    return {
        analytics,
        monthlyData,
        isLoading: false
    };
}