"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDb = exports.AuthDb = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const prisma_db_1 = __importDefault(require("./prisma.db"));
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
class AuthDb {
    constructor() { }
    async changePassword(changePasswordModel) {
        //----> Destructure the payload.
        const { email, oldPassword, newPassword, confirmPassword } = changePasswordModel;
        //----> Check for password match
        if (!this.matchPassword(newPassword, confirmPassword)) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password must match!");
        }
        //----> Get user from database.
        const user = await this.getUserByEmail(email);
        //----> Check that the old password is correct.
        const isMatch = await this.comparePassword(oldPassword, user);
        if (!isMatch) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials ");
        }
        //----> Hash the new password.
        const hashNewPassword = await this.passwordHarsher(newPassword);
        //----> Store the updated user in the database.
        const updatedUser = await prisma_db_1.default.user.update({
            data: { ...user, password: hashNewPassword },
            where: { email },
        });
        const { role, password, ...rest } = updatedUser;
        return rest;
    }
    async currentUser(id) {
        //----> Retrieve the current user from the database.
        const currentUser = await this.getUserById(id);
        //----> Remove role and password from the user object.
        const { password, ...rest } = currentUser;
        return rest;
    }
    async editProfile(editProfileModel) {
        //----> Destructure the payload.
        const { email, password, ...rest } = editProfileModel;
        //----> Get the user from database.
        const user = await this.getUserByEmail(email);
        //----> Compare the new password with old password.
        const isMatch = await this.comparePassword(password, user);
        //----> Store the updated user in the database.
        const updatedUser = await prisma_db_1.default.user.update({
            data: { ...rest, password: user.password },
            where: { email },
        });
        const { role, password: userPassword, ...restOfData } = updatedUser;
        return restOfData;
    }
    async login(loginModel) {
        //----> Destructure the payload.
        const { email, password } = loginModel;
        //----> Get the user from database.
        const user = await this.getUserByEmail(email);
        //----> Compare the new password with old password.
        const isMatch = await this.comparePassword(password, user);
        //----> Get json web token.
        const token = this.getJsonToken(user.id, user.name, user.role);
        const { password: userPassword, ...restOfData } = user;
        const authRes = {
            id: user?.id,
            name: user?.name,
            image: user?.image,
            token,
            role: user?.role,
            isLoggedIn: true,
            isAdmin: user?.role === client_1.Role.Admin,
        };
        const loginRes = {
            authResponse: authRes,
            currentUser: user,
        };
        return loginRes;
    }
    async signup(signupModel) {
        //----> Destructure the payload.
        const { email, password, confirmPassword, ...rest } = signupModel;
        //----> Check for password match, check for existence of user.
        await this.signupUtil(confirmPassword, email, password);
        //----> Hash the new password.
        const hashNewPassword = await this.passwordHarsher(password);
        //----> Store the new user in the database.
        const newUser = await prisma_db_1.default.user.create({
            data: { ...rest, password: hashNewPassword, email },
        });
        const { password: userPassword, ...restOfData } = newUser;
        return restOfData;
    }
    matchPassword(newPassword, oldPassword) {
        const isMatch = newPassword.normalize() === oldPassword.normalize();
        return isMatch;
    }
    async getUserById(id) {
        //----> Get the user.
        const user = await prisma_db_1.default.user.findUnique({
            where: { id },
        });
        //----> Check for existence of user.
        if (!user) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid credentials!");
        }
        return user;
    }
    async getUserByEmail(email) {
        //----> Get user from database.
        const user = await prisma_db_1.default.user.findUnique({ where: { email } });
        //----> Check for existence of user.
        if (!user) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid credentials!");
        }
        return user;
    }
    async comparePassword(oldPassword, user) {
        //----> Compare the new password with old password.
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        //----> Check if the two passwords match.
        if (!isMatch) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials!");
        }
        return isMatch;
    }
    async passwordHarsher(newPassword) {
        //----> Hash the new password.
        return await bcrypt.hash(newPassword, 12);
    }
    async signupUtil(confirmPassword, email, password) {
        //----> Check for password match
        if (!this.matchPassword(password, confirmPassword)) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password must match!");
        }
        //----> Get user from database.
        const user = await prisma_db_1.default.user.findUnique({ where: { email } });
        //----> Check for existence of user.
        if (user) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "User already exists!");
        }
    }
    getJsonToken(id, name, role) {
        const token = jwt.sign({
            id,
            name,
            role,
        }, process.env.JWT_TOKEN_CODE, { expiresIn: "24hr" });
        return token;
    }
}
exports.AuthDb = AuthDb;
exports.authDb = new AuthDb();
