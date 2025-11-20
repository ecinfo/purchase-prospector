// src/utils/helpers.ts
export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

export const classNames = (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(' ');
};