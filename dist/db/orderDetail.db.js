"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailDb = void 0;
const prisma_db_1 = __importDefault(require("./prisma.db"));
class OrderDetailDb {
    constructor() { }
    static async createOrderDetail(orderDetail) {
        const newOrderDetail = await prisma_db_1.default.orderDetail.create({ data: orderDetail });
        if (!newOrderDetail) {
            throw new Error("OrderDetail not created");
        }
        return newOrderDetail;
    }
    static async editOrderDetail(id, orderDetail) {
        await this.detailOrderDetail(id);
        const editedOrderDetail = await prisma_db_1.default.orderDetail.update({
            data: orderDetail,
            where: { id },
        });
        if (!editedOrderDetail) {
            throw new Error(`OrderDetail with id: ${id} cannot be updated`);
        }
        return editedOrderDetail;
    }
    static async deletedOrderDetail(id) {
        await this.detailOrderDetail(id);
        const deletedOrderDetail = await prisma_db_1.default.orderDetail.delete({ where: { id } });
        return deletedOrderDetail;
    }
    static async detailOrderDetail(id) {
        const orderDetail = await prisma_db_1.default.orderDetail.findUnique({ where: { id } });
        if (!orderDetail) {
            throw new Error(`OrderDetail with id: ${id} is not found`);
        }
        return orderDetail;
    }
    static async getAllOrderDetails() {
        return await prisma_db_1.default.orderDetail.findMany({});
    }
}
exports.OrderDetailDb = OrderDetailDb;
