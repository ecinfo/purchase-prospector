// src/utils/constants.ts
export const PROCUREMENT_PHASES = [
    { number: 1, title: 'Input', description: 'Project Requirement' },
    { number: 2, title: 'Qualification', description: 'AI Questions' },
    { number: 3, title: 'Quantification', description: 'Specifications' },
    { number: 4, title: 'Bill of Materials', description: 'Procurement List' },
    { number: 5, title: 'Vendor Search', description: 'Supplier Discovery' },
    { number: 6, title: 'RFP Generation', description: 'Request for Proposal' },
    { number: 7, title: 'Vendor Outreach', description: 'Interest Collection' },
    { number: 8, title: 'RFP Distribution', description: 'Send to Vendors' },
    { number: 9, title: 'Bid Collection', description: 'Response Tracking' },
    { number: 10, title: 'Analysis', description: 'AI Optimization' }
];

export const CONSTRUCTION_CATEGORIES = [
    'Cement & Concrete',
    'Steel & Reinforcement',
    'Bricks & Blocks',
    'Sand & Aggregate',
    'Tiles & Sanitaryware',
    'Electrical & Lighting',
    'Plumbing & Pipes',
    'Paints & Coatings',
    'Doors & Windows',
    'Hardware & Fittings'
];

export const VENDOR_CERTIFICATIONS = [
    'ISO 9001',
    'ISO 14001',
    'BIS Certified',
    'Green Pro Certified',
    'MSME Registered',
    'Startup India',
    'GST Registered'
];

export const PAYMENT_TERMS = [
    'Advance + Balance on Delivery',
    '30 Days Credit',
    '45 Days Credit',
    '60 Days Credit',
    'LC at Sight',
    'Bank Guarantee'
];