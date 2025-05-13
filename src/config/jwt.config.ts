export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'your-secret-key', // In production, always use environment variable
    expiresIn: '24h',
};