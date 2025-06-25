"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthState = void 0;
const userResponse_model_1 = require("../users/userResponse.model");
class AuthState {
    constructor() {
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.user = new userResponse_model_1.UserResponseModel();
        this.token = null;
    }
}
exports.AuthState = AuthState;
