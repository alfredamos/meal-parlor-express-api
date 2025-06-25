"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserModel = void 0;
const client_1 = require("@prisma/client");
class AdminUserModel {
    constructor() {
        this.id = "";
        this.name = "";
        this.email = "";
        this.gender = "";
        this.phone = "";
        this.role = client_1.Role.User;
        this.address = "";
    }
}
exports.AdminUserModel = AdminUserModel;
