"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDb = void 0;
const prisma_db_1 = __importDefault(require("./prisma.db"));
class UserDb {
    constructor() { }
    static async deletedUser(id) {
        await this.detailUser(id);
        const deletedUser = await prisma_db_1.default.user.delete({ where: { id } });
        return deletedUser;
    }
    static async detailUser(id) {
        const user = await prisma_db_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error(`User with id: ${id} is not found`);
        }
        return user;
    }
    static async getAllUsers() {
        return await prisma_db_1.default.user.findMany({});
    }
}
exports.UserDb = UserDb;
