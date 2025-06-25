"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailController = void 0;
const http_status_codes_1 = require("http-status-codes");
const orderDetail_db_1 = require("../db/orderDetail.db");
class OrderDetailController {
}
exports.OrderDetailController = OrderDetailController;
_a = OrderDetailController;
OrderDetailController.createOrderDetail = async (req, res) => {
    //----> Get the cart item from the request.
    const newOrderDetail = req.body;
    //----> Store the new cart item in the database.
    const createdOrderDetail = await orderDetail_db_1.OrderDetailDb.createOrderDetail(newOrderDetail);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdOrderDetail);
};
OrderDetailController.deleteOrderDetailById = async (req, res) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Delete the cart item from the database.
    const deletedOrderDetail = await orderDetail_db_1.OrderDetailDb.deletedOrderDetail(id);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedOrderDetail);
};
OrderDetailController.editOrderDetailById = async (req, res) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Get the cart item to update from request.
    const orderDetailToUpdate = req.body;
    //----> Delete the cart item from the database.
    const editedOrderDetail = await orderDetail_db_1.OrderDetailDb.editOrderDetail(id, orderDetailToUpdate);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(editedOrderDetail);
};
OrderDetailController.getAllOrderDetails = async (req, res) => {
    //----> Get all cart items from the database.
    const orderDetails = await orderDetail_db_1.OrderDetailDb.getAllOrderDetails();
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(orderDetails);
};
OrderDetailController.getOrderDetailById = async (req, res) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Retrieve cart item from database.
    const orderDetail = await orderDetail_db_1.OrderDetailDb.detailOrderDetail(id);
    //----> Send back the response back.
    res.status(http_status_codes_1.StatusCodes.OK).json(orderDetail);
};
