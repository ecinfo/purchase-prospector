// src/config/apiConfig.ts

// Change this value based on environment
// Options: "local", "ngrok", "production"
const ENV: "local" | "ngrok" | "production" = "ngrok";

const HOSTS = {
    local: "http://localhost:3000",
    ngrok: "https://c8d926952891.ngrok-free.app",
    production: "https://api.example.com",
};

export const ApiHost = HOSTS[ENV];
export default ApiHost;
