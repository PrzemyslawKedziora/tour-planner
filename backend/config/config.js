import dotenv from 'dotenv';

dotenv.config();

export const development = {
        jwt_code: process.env.JWT_PRIVATE_KEY,
        port: process.env.SERVER_PORT
};