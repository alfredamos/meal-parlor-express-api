"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = void 0;
const userResponse_model_1 = require("../users/userResponse.model");
const CookieResponse_model_1 = require("./CookieResponse.model");
class LoginResponse {
    constructor() {
        this.authResponse = new CookieResponse_model_1.ResponseAuth();
        this.currentUser = new userResponse_model_1.UserResponseModel();
    }
}
exports.LoginResponse = LoginResponse;
