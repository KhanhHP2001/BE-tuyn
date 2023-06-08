const env = require('dotenv');

env.config();

export const database = {
    clusterPassword: process.env.DB_CLUSTER_PASSWORD,
    accessPassword: process.env.DB_ACCESS_PASSWORD,
    authPassword: process.env.DB_AUTH_PASSWORD,
    dbAdress: process.env.DB_ADDRESS,
}

export const jsonWebToken = {
    secretKey: process.env.JWT_SECRET_KEY,
    expiredTime: process.env.EXPIRED_TIME,
}