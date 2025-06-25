"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseModel = void 0;
const userResponse_model_1 = require("../users/userResponse.model");
class AuthResponseModel {
    constructor() {
        this.user = new userResponse_model_1.UserResponseModel();
        this.isLoggedIn = false;
        this.token = "";
    }
}
exports.AuthResponseModel = AuthResponseModel;
