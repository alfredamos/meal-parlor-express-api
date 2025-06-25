"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileModel = void 0;
const client_1 = require("@prisma/client");
class EditProfileModel {
    constructor() {
        this.name = "";
        this.email = "";
        this.phone = "";
        this.image = "";
        this.gender = client_1.Gender.Male;
        this.password = "";
        this.address = "";
    }
}
exports.EditProfileModel = EditProfileModel;
