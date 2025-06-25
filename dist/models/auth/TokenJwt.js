"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenJwt = void 0;
const client_1 = require("@prisma/client");
class TokenJwt {
    constructor() {
        this.id = "";
        this.name = "";
        this.role = client_1.Role.User;
    }
}
exports.TokenJwt = TokenJwt;
