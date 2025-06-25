"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieAdmin_middleware_1 = require("../middleware/cookieAdmin.middleware");
const cookieAuthentication_middleware_1 = require("../middleware/cookieAuthentication.middleware");
const idCheckValidation_middleware_1 = require("../middleware/idCheckValidation.middleware");
const orderValidation_middleware_1 = require("../middleware/orderValidation.middleware");
const ownerAndAdmin_middleware_1 = require("../middleware/ownerAndAdmin.middleware");
const sameUserAndAdmin_middleware_1 = require("../middleware/sameUserAndAdmin.middleware");
const order_controller_1 = require("./../controllers/order.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.param("id", idCheckValidation_middleware_1.idCheckValidationMiddleware);
router
    .route("/")
    .get(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, order_controller_1.OrderController.getAllOrders)
    .post(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, orderValidation_middleware_1.orderValidationMiddleware, order_controller_1.OrderController.createOrder);
router
    .route("/:id")
    .delete(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, ownerAndAdmin_middleware_1.ownerAndAdminMiddleware, order_controller_1.OrderController.deleteOrderById)
    .get(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, ownerAndAdmin_middleware_1.ownerAndAdminMiddleware, order_controller_1.OrderController.getOrderById)
    .patch(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, ownerAndAdmin_middleware_1.ownerAndAdminMiddleware, orderValidation_middleware_1.orderValidationMiddleware, order_controller_1.OrderController.editOrderById);
router
    .route("/orders-by-user-id/:userId")
    .get(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, sameUserAndAdmin_middleware_1.sameUserAndAdminMiddleware, order_controller_1.OrderController.getAllOrdersByUserId);
router
    .route("/delete-all-orders-by-user-id/:userId")
    .delete(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, sameUserAndAdmin_middleware_1.sameUserAndAdminMiddleware, order_controller_1.OrderController.deleteOrdersByUserId);
router
    .route("/delete-all-orders")
    .delete(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, order_controller_1.OrderController.deleteOrdersByUserId);
exports.default = router;
