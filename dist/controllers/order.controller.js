"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const order_db_1 = require("../db/order.db");
class OrderController {
}
exports.OrderController = OrderController;
_a = OrderController;
OrderController.createOrder = async (req, res) => {
    //----> Get the order info from the request body.
    const orderPayload = req.body;
    //----> Store the new order info in the database.
    const createdOrder = await order_db_1.orderDb.createOrder(orderPayload);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdOrder);
};
OrderController.orderCreate = async (req, res) => {
    //----> Get the order info from the request body.
    const orderPayload = req.body;
    //----> Store the new order info in the database.
    const payloadOfOrder = await order_db_1.orderDb.orderCreate(orderPayload);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.CREATED).json(payloadOfOrder);
};
OrderController.deleteOrderById = async (req, res) => {
    //----> Get the order id from params.
    const { id } = req.params;
    //----> Delete all associated cart-items.
    const deletedOrder = await order_db_1.orderDb.deleteOrderById(id);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedOrder);
};
OrderController.deleteOrdersByUserId = async (req, res) => {
    const { userId } = req.params; //----> Get the customer-id;
    console.log("I'm in delete all orders by customerId", { userId });
    //----> Delete orders user id.
    await order_db_1.orderDb.deleteOrdersByUserId(userId);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "All Orders associated with this customer have been deleted successfully!",
    });
};
OrderController.editOrderById = async (req, res) => {
    const { id } = req.params;
    //----> Get the order payload to edit from request.
    const orderToEdit = req.body;
    //----> Store the edited order info in the database.
    const editedOrder = await order_db_1.orderDb.editOrder(id, orderToEdit);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(editedOrder);
};
OrderController.getAllOrders = async (req, res) => {
    //----> Get all the orders from the database.
    const allOrders = await order_db_1.orderDb.getAllOrders();
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(allOrders);
};
OrderController.getAllOrdersByUserId = async (req, res) => {
    //----> Get query params.
    const { userId } = req.params;
    //----> Get all orders from the database.
    const allOrders = await order_db_1.orderDb.getAllOrdersByUserId(userId);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(allOrders);
};
OrderController.getOrderById = async (req, res) => {
    const { id } = req.params;
    //----> Check for the existence of order in the db.
    const order = await order_db_1.orderDb.getOneOrder(id);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(order);
};
