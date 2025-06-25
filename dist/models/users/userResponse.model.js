"use strict";
//import { Role } from '../role.model';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseModel = void 0;
const client_1 = require("@prisma/client");
class UserResponseModel {
    constructor() {
        this.id = "";
        this.name = "";
        this.email = "";
        this.gender = "";
        this.phone = "";
        this.role = client_1.Role.User;
        this.image = "";
        this.address = "";
    }
}
exports.UserResponseModel = UserResponseModel;
