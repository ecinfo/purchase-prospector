// src/utils/formatters.ts
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
    if (currency === 'INR') {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(2)} Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(2)} L`;
        } else {
            return `₹${amount.toLocaleString()}`;
        }
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency
    }).format(amount);
};

export const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(new Date(date));
};

export const formatArea = (area: number, unit: string): string => {
    return `${area.toLocaleString()} ${unit}`;
};

export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};