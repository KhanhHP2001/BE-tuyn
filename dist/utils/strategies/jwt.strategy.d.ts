import { Strategy } from 'passport-jwt';
declare const JWTStrategy_base: new (...args: any[]) => Strategy;
export declare class JWTStrategy extends JWTStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        username: any;
        email: any;
    }>;
}
export {};
