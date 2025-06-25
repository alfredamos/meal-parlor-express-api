"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupModel = void 0;
const client_1 = require("@prisma/client");
class SignupModel {
    constructor() {
        this.name = "";
        this.email = "";
        this.phone = "";
        this.image = "";
        this.gender = client_1.Gender.Male;
        this.confirmPassword = "";
        this.password = "";
        this.address = "";
    }
}
exports.SignupModel = SignupModel;
