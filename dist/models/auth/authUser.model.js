"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserModel = void 0;
const client_1 = require("@prisma/client");
class AuthUserModel {
    constructor() {
        this.id = "";
        this.name = "";
        this.role = client_1.Role.User;
        this.token = "";
    }
}
exports.AuthUserModel = AuthUserModel;
