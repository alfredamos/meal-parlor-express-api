"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPayload = void 0;
const signup_model_1 = require("../auth/signup.model");
class UserPayload extends signup_model_1.SignupModel {
    constructor() {
        super(...arguments);
        this.id = "";
    }
}
exports.UserPayload = UserPayload;
