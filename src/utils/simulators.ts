/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/simulators.ts
// src/utils/simulators.ts
import type { BOMItem, Vendor, Bid, RFP } from '../types';

export class ProcurementSimulator {
    static simulateBOMGeneration(requirement: any): BOMItem[] {
        const area = requirement.area || 30000;
        const type = requirement.type || 'residential';
        const complexity = requirement.complexity || 'medium';

        // Base rates per sqft for different materials
        const baseRates = {
            'Cement & Concrete': {
                residential: { standard: 180, medium: 200, high: 240, luxury: 320 },
                commercial: { standard: 220, medium: 250, high: 300, luxury: 400 }
            },
            'Steel & Reinforcement': {
                residential: { standard: 320, medium: 360, high: 420, luxury: 550 },
                commercial: { standard: 380, medium: 420, high: 500, luxury: 650 }
            },
            'Bricks & Blocks': {
                residential: { standard: 80, medium: 90, high: 110, luxury: 150 },
                commercial: { standard: 100, medium: 110, high: 130, luxury: 180 }
            }
        };

        const categories = [
            {
                category: 'Cement & Concrete',
                materials: [
                    { name: 'OPC 53 Grade Cement', unit: 'bags', rate: 380 },
                    { name: 'PPC Cement', unit: 'bags', rate: 350 },
                    { name: 'Ready Mix Concrete', unit: 'cubic meters', rate: 4500 }
                ]
            },
            {
                category: 'Steel & Reinforcement',
                materials: [
                    { name: 'TOR Steel TMT Bars', unit: 'tons', rate: 58000 },
                    { name: 'Structural Steel', unit: 'tons', rate: 65000 }
                ]
            },
            {
                category: 'Bricks & Blocks',
                materials: [
                    { name: 'Fly Ash Bricks', unit: 'pieces', rate: 8 },
                    { name: 'Clay Bricks', unit: 'pieces', rate: 12 },
                    { name: 'Concrete Blocks', unit: 'pieces', rate: 45 }
                ]
            }
        ];

        const bom: BOMItem[] = [];
        let id = 1;

        categories.forEach(cat => {
            const categoryRates = baseRates[cat.category as keyof typeof baseRates];
            if (categoryRates) {
                const rate = categoryRates[type as keyof typeof categoryRates]?.[complexity as 'standard' | 'medium' | 'high' | 'luxury'] || 200;
                const totalValue = area * rate;

                cat.materials.forEach(material => {
                    const quantity = Math.floor(totalValue / material.rate / cat.materials.length * (0.8 + Math.random() * 0.4));
                    const totalPrice = quantity * material.rate;

                    bom.push({
                        id: (id++).toString(),
                        category: cat.category,
                        material: material.name,
                        specification: `Standard ${material.name} for ${type} construction`,
                        quantity,
                        unit: material.unit,
                        unitPrice: material.rate,
                        totalPrice,
                        priority: cat.category === 'Cement & Concrete' || cat.category === 'Steel & Reinforcement' ? 'high' : 'medium'
                    });
                });
            }
        });

        return bom;
    }

    static simulateVendorMatching(bom: BOMItem[]): Vendor[] {
        const vendors: Vendor[] = [
            {
                id: '1',
                name: 'Shree Cement Ltd.',
                type: 'manufacturer',
                categories: ['Cement & Concrete'],
                location: { city: 'Pune', state: 'Maharashtra', country: 'India', pincode: '411001' },
                certifications: ['ISO 9001', 'BIS Certified', 'Green Pro Certified'],
                rating: 4.8,
                totalProjects: 245,
                experience: 15,
                paymentTerms: ['30 Days Credit', '45 Days Credit'],
                minOrderValue: 500000,
                contact: {
                    primary: {
                        name: 'Rajesh Sharma',
                        email: 'rajesh@shreecement.com',
                        phone: '+91-9876543210',
                        designation: 'Sales Manager'
                    }
                },
                performance: { onTimeDelivery: 95, qualityRating: 4.7, communication: 4.6 },
                source: 'indiamart',
                createdAt: '2020-01-15',
                updatedAt: '2024-01-15'
            },
            {
                id: '2',
                name: 'TATA Steel',
                type: 'manufacturer',
                categories: ['Steel & Reinforcement'],
                location: { city: 'Mumbai', state: 'Maharashtra', country: 'India', pincode: '400001' },
                certifications: ['ISO 9001', 'ISO 14001', 'BIS Certified'],
                rating: 4.9,
                totalProjects: 512,
                experience: 25,
                paymentTerms: ['45 Days Credit', 'LC at Sight'],
                minOrderValue: 1000000,
                contact: {
                    primary: {
                        name: 'Priya Singh',
                        email: 'priya.singh@tatasteel.com',
                        phone: '+91-9876543211',
                        designation: 'Regional Manager'
                    }
                },
                performance: { onTimeDelivery: 98, qualityRating: 4.8, communication: 4.7 },
                source: 'tradeindia',
                createdAt: '2018-05-20',
                updatedAt: '2024-01-15'
            }
        ];

        // Filter vendors based on BOM categories
        const bomCategories = [...new Set(bom.map(item => item.category))];
        return vendors.filter(vendor =>
            vendor.categories.some(cat =>
                bomCategories.some(bomCat => bomCat.includes(cat.split(' ')[0]))
            )
        );
    }

    static simulateBidding(rfps: RFP[], vendors: Vendor[]): Bid[] {
        const bids: Bid[] = [];

        rfps.forEach(rfp => {
            vendors.forEach(vendor => {
                if (Math.random() > 0.3) { // 70% chance of bidding
                    const totalAmount = rfp.bomItems.reduce((sum, item) => {
                        const discount = 0.85 + (Math.random() * 0.15); // 15-30% discount
                        return sum + (item.totalPrice * discount);
                    }, 0);

                    bids.push({
                        id: `bid-${vendor.id}-${rfp.id}`,
                        vendorId: vendor.id,
                        rfpId: rfp.id,
                        totalAmount,
                        breakdown: rfp.bomItems.map(item => ({
                            itemId: item.id,
                            unitPrice: item.unitPrice * (0.85 + (Math.random() * 0.15)),
                            totalPrice: item.totalPrice * (0.85 + (Math.random() * 0.15))
                        })),
                        deliveryTime: 20 + Math.floor(Math.random() * 20),
                        qualityScore: 4 + (Math.random() * 1),
                        paymentTerms: '30% Advance, 70% on Delivery',
                        status: 'submitted'
                    });
                }
            });
        });

        return bids;
    }
}