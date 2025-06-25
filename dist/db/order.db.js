"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDb = exports.OrderDb = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_db_1 = __importDefault(require("./prisma.db"));
const http_errors_1 = __importDefault(require("http-errors"));
class OrderDb {
    constructor() { }
    async createOrder(orderPayLoad) {
        const { orderDetails, ...rest } = orderPayLoad;
        //----> Get the total quantity and total price into order.
        console.log("Before modifier");
        const modifiedOrder = this.adjustTotalPriceAndTotalQuantity(rest, orderDetails);
        console.log("After modifier");
        console.log({ modifiedOrder, orderDetails });
        //----> Store the new order info in the database.
        const createdOrder = await prisma_db_1.default.order.create({
            data: {
                ...modifiedOrder,
                orderDate: new Date(),
                orderDetails: {
                    create: orderDetails?.map((cart) => ({
                        ...cart,
                        pizza: {
                            create: {
                                id: cart.menuItemId,
                            },
                        },
                    })),
                },
            },
            include: {
                orderDetails: true,
            },
        });
        return createdOrder;
    }
    async orderCreate(orderPayload) {
        console.log({ orderPayload });
        const { orderDetails, ...rest } = orderPayload;
        const createdOrder = await prisma_db_1.default.order.create({
            data: {
                ...rest,
            },
        });
        const createdOrderDetails = await this.createOrderDetails(orderDetails, createdOrder?.id);
        const payloadOfOrder = {
            ...createdOrder,
            orderDetails: createdOrderDetails,
        };
        return payloadOfOrder;
    }
    async deleteAllOrders() {
        //----> Delete all order-details.
        await prisma_db_1.default.orderDetail.deleteMany({});
        //----> Delete all orders.
        await prisma_db_1.default.order.deleteMany({});
        //----> Send back the response.
        return {
            status: "success",
            message: "All orders are deleted successfully!",
        };
    }
    async deleteOrderById(id) {
        //----> Check for the existence of order in the database.
        await this.getOrderById(id);
        //----> Delete all associated cart-items.
        await prisma_db_1.default.order.update({
            where: { id },
            data: {
                orderDetails: {
                    deleteMany: {},
                },
            },
            include: {
                orderDetails: true,
            },
        });
        //----> Delete the order info from the database.
        const deletedOrder = await prisma_db_1.default.order.delete({ where: { id } });
        return deletedOrder;
    }
    async deleteOrdersByUserId(userId) {
        //----> Get the customer with the user-id.
        const user = await prisma_db_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials!");
        }
        //----> Get all the orders by customerId.
        const orders = await prisma_db_1.default.order.findMany({
            where: { userId: user?.id },
        });
        //----> Delete all these others in the database.
        this.allOrdersDeletedByUserId(orders, user?.id);
    }
    async editOrder(id, orderToEdit) {
        //----> Check for the existence of order in the db.
        await this.getOrderById(id);
        //----> Store the edited order info in the database.
        const editedOrder = await prisma_db_1.default.order.update({
            where: { id },
            data: { ...orderToEdit },
        });
        return editedOrder;
    }
    async getAllOrders() {
        //----> Get all the orders from the database.
        const allOrders = await prisma_db_1.default.order.findMany({
            include: { orderDetails: true, user: true },
        });
        return allOrders;
    }
    async getAllOrdersByUserId(userId) {
        //----> Get all the orders from the database.
        const allOrders = await prisma_db_1.default.order.findMany({
            where: { userId },
            include: {
                orderDetails: true,
                user: true,
            },
        });
        return allOrders;
    }
    async getOneOrder(id) {
        //----> Check for the existence of order in the db.
        const order = await this.getOrderById(id, true);
        return order;
    }
    async getOrderById(id, include = false) {
        //----> Retrieve the order info with this id from database.
        const order = await prisma_db_1.default.order.findUniqueOrThrow({
            where: { id },
            include: {
                orderDetails: include,
            },
        });
        //----> Send back a valid order.
        return order;
    }
    adjustTotalPriceAndTotalQuantity(order, orderDetails = []) {
        console.log({ order, orderDetails });
        //----> Calculate both the total cost and total quantity.
        const totalQuantity = orderDetails?.reduce((acc, current) => acc + current.quantity, 0);
        const totalPrice = orderDetails?.reduce((acc, current) => acc + current.price * current.quantity, 0);
        //----> Adjust the total cost and total quantity on the order.
        order.totalPrice = totalPrice;
        order.totalQuantity = totalQuantity;
        //----> Return the modified order.
        return order;
    }
    allOrdersDeletedByUserId(orders, userId) {
        //----> Delete all orders by customerId
        const userOrders = orders?.filter((order) => order.userId === userId);
        userOrders?.forEach(async (order) => {
            //----> Delete all associated cart-items.
            await prisma_db_1.default.order.update({
                where: { id: order.id },
                data: {
                    orderDetails: {
                        deleteMany: {},
                    },
                },
                include: {
                    orderDetails: true,
                },
            });
            //----> Delete the order info from the database.
            await prisma_db_1.default.order.delete({ where: { id: order.id } });
        });
    }
    createOrderDetails(orderDetails, orderId) {
        //----> Edit all cart-items at once.
        const createdCarItems = orderDetails.map(async (cart) => {
            return await prisma_db_1.default.orderDetail.create({
                data: { ...cart, orderId },
            });
        });
        //----> Collect all edited cart-items in Promise.all().
        const updatedOrderorderDetails = Promise.all(createdCarItems);
        //----> Return the updated cart-items.
        return updatedOrderorderDetails;
    }
}
exports.OrderDb = OrderDb;
exports.orderDb = new OrderDb();
