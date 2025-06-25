"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleChangeModel = void 0;
const prisma_client_1 = require("prisma/prisma-client");
class UserRoleChangeModel {
    constructor() {
        this.email = "";
        this.role = prisma_client_1.Role.User;
    }
}
exports.UserRoleChangeModel = UserRoleChangeModel;
