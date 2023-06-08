"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const utils_1 = require("../utils");
let AuthService = class AuthService {
    constructor(userModel, userService, jwtService) {
        this.userModel = userModel;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signUp(createUser) {
        try {
            return this.userService.create(createUser);
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async login(loginData) {
        try {
            const { email, password } = loginData;
            const userData = await this.userModel.findOne({ email });
            const isUser = await (0, utils_1.comparePassword)(password, userData.password);
            if (!isUser)
                throw new common_1.HttpException('Incorrect password !!!', 400);
            const token = await this.convertToJwtString(userData.id, userData.name, userData.email);
            return { accessToken: token, user: userData };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async verifyJwt(token) {
        try {
            const result = await this.jwtService.verify(token, {
                secret: utils_1.jsonWebToken.secretKey,
            });
            const userInf = await this.userModel.findOne({ email: result === null || result === void 0 ? void 0 : result.email });
            if (!userInf)
                throw new common_1.UnauthorizedException();
            return result;
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
    }
    async convertToJwtString(userId, userName, email) {
        const payload = { sub: userId, username: userName, email };
        return this.jwtService.signAsync(payload, {
            expiresIn: utils_1.jsonWebToken.expiredTime,
            secret: utils_1.jsonWebToken.secretKey,
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map