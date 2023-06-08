"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const user_entity_1 = require("../../users/entities/user.entity");
class AuthLoginDto extends (0, mapped_types_1.PickType)(user_entity_1.User, ['email', 'password']) {
}
exports.AuthLoginDto = AuthLoginDto;
//# sourceMappingURL=Auth.dto.js.map