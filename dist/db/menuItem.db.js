"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemDb = void 0;
const prisma_db_1 = __importDefault(require("./prisma.db"));
class MenuItemDb {
    constructor() { }
    static async createMenuItem(menuItem) {
        const newMenuItem = await prisma_db_1.default.menuItem.create({ data: menuItem });
        if (!newMenuItem) {
            throw new Error("MenuItem not created");
        }
        return newMenuItem;
    }
    static async editMenuItem(id, menuItem) {
        await this.detailMenuItem(id);
        const editedMenuItem = await prisma_db_1.default.menuItem.update({
            data: menuItem,
            where: { id },
        });
        if (!editedMenuItem) {
            throw new Error(`MenuItem with id: ${id} cannot be updated`);
        }
        return editedMenuItem;
    }
    static async deletedMenuItem(id) {
        await this.detailMenuItem(id);
        const deletedMenuItem = await prisma_db_1.default.menuItem.delete({ where: { id } });
        return deletedMenuItem;
    }
    static async detailMenuItem(id) {
        const menuItem = await prisma_db_1.default.menuItem.findUnique({ where: { id } });
        if (!menuItem) {
            throw new Error(`MenuItem with id: ${id} is not found`);
        }
        return menuItem;
    }
    static async getAllMenuItems() {
        return await prisma_db_1.default.menuItem.findMany({});
    }
}
exports.MenuItemDb = MenuItemDb;
