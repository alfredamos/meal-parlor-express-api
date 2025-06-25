"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
class OrderModel {
    constructor() {
        this.id = "";
        this.paymentId = "";
        this.userId = "";
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.orderDate = new Date();
    }
}
exports.OrderModel = OrderModel;
