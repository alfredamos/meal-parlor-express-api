"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoModel = void 0;
const client_1 = require("@prisma/client");
class UserInfoModel {
    constructor() {
        this.id = "";
        this.name = "";
        this.role = client_1.Role.User;
        this.isLoggedIn = false;
        this.token = "";
        this.message = "";
    }
}
exports.UserInfoModel = UserInfoModel;
