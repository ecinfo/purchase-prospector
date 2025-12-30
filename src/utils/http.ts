// src/config/apiConfig.ts

export type ApiEnv = 'local' | 'ngrok' | 'production';

// Change environment here
const ENV: ApiEnv = 'ngrok';

const HOSTS: Record<ApiEnv, string> = {
    local: 'http://localhost:3000',
    ngrok: 'https://f21c5352e77e.ngrok-free.app',
    production: 'https://api.example.com',
};

export const ApiHost = HOSTS[ENV];

// Common headers per environment
export const getApiHeaders = (token?: string) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `Token ${token}`;
    }

    // 🔑 Required only for ngrok
    if (ENV === 'ngrok') {
        headers['ngrok-skip-browser-warning'] = 'true';
    }

    return headers;
};

export default ApiHost;
