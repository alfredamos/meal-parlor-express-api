import express from "express";
import { idCheckValidationMiddleware } from "../middleware/idCheckValidation.middleware";
import { OrderDetailController } from "../controllers/orderDetail.controller";
import { cookieAuthenticationMiddleware } from "../middleware/cookieAuthentication.middleware";
import { cookieAdminMiddleware } from "../middleware/cookieAdmin.middleware";
import { orderDetailValidationMiddleware } from "../middleware/orderDetailValidation.middleware";

const router = express.Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(cookieAuthenticationMiddleware, cookieAdminMiddleware, OrderDetailController.getAllOrderDetails)
  .post(cookieAuthenticationMiddleware, cookieAdminMiddleware, orderDetailValidationMiddleware, OrderDetailController.createOrderDetail);

router
  .route("/:id")
  .delete(cookieAuthenticationMiddleware, OrderDetailController.deleteOrderDetailById)
  .get(cookieAuthenticationMiddleware, OrderDetailController.getOrderDetailById)
  .patch(
    cookieAuthenticationMiddleware,
    cookieAdminMiddleware,
    orderDetailValidationMiddleware,
    cookieAuthenticationMiddleware,
    OrderDetailController.editOrderDetailById
  );

export default router;
