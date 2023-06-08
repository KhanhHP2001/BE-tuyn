"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonWebToken = exports.database = void 0;
const env = require('dotenv');
env.config();
exports.database = {
    clusterPassword: process.env.DB_CLUSTER_PASSWORD,
    accessPassword: process.env.DB_ACCESS_PASSWORD,
    authPassword: process.env.DB_AUTH_PASSWORD,
    dbAdress: process.env.DB_ADDRESS,
};
exports.jsonWebToken = {
    secretKey: process.env.JWT_SECRET_KEY,
    expiredTime: process.env.EXPIRED_TIME,
};
//# sourceMappingURL=env-variables.js.map