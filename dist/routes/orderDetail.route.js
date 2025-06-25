"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const idCheckValidation_middleware_1 = require("../middleware/idCheckValidation.middleware");
const orderDetail_controller_1 = require("../controllers/orderDetail.controller");
const cookieAuthentication_middleware_1 = require("../middleware/cookieAuthentication.middleware");
const cookieAdmin_middleware_1 = require("../middleware/cookieAdmin.middleware");
const orderDetailValidation_middleware_1 = require("../middleware/orderDetailValidation.middleware");
const router = express_1.default.Router();
router.param("id", idCheckValidation_middleware_1.idCheckValidationMiddleware);
router
    .route("/")
    .get(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, orderDetail_controller_1.OrderDetailController.getAllOrderDetails)
    .post(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, orderDetailValidation_middleware_1.orderDetailValidationMiddleware, orderDetail_controller_1.OrderDetailController.createOrderDetail);
router
    .route("/:id")
    .delete(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, orderDetail_controller_1.OrderDetailController.deleteOrderDetailById)
    .get(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, orderDetail_controller_1.OrderDetailController.getOrderDetailById)
    .patch(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, orderDetailValidation_middleware_1.orderDetailValidationMiddleware, cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, orderDetail_controller_1.OrderDetailController.editOrderDetailById);
exports.default = router;
