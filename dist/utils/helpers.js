"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashingPassWord = void 0;
const bcrypt = require("bcrypt");
async function hashingPassWord(password) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
exports.hashingPassWord = hashingPassWord;
async function comparePassword(params, hash) {
    const result = await bcrypt.compareSync(params, hash);
    return result;
}
exports.comparePassword = comparePassword;
;
//# sourceMappingURL=helpers.js.map