"use strict";
//import { Gender } from "../gender.model";
//import { Role } from "../role.model";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailModel = void 0;
const client_1 = require("@prisma/client");
class UserDetailModel {
    constructor() {
        this.id = "";
        this.name = "";
        this.email = "";
        this.phone = "";
        this.password = "";
        this.gender = client_1.Gender.Male;
        this.role = client_1.Role.User;
    }
}
exports.UserDetailModel = UserDetailModel;
