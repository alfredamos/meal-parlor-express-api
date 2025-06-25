import { cookieAdminMiddleware } from '../middleware/cookieAdmin.middleware';
import { cookieAuthenticationMiddleware } from '../middleware/cookieAuthentication.middleware';
import { idCheckValidationMiddleware } from '../middleware/idCheckValidation.middleware';
import { orderValidationMiddleware } from '../middleware/orderValidation.middleware';
import { ownerAndAdminMiddleware } from '../middleware/ownerAndAdmin.middleware';
import { sameUserAndAdminMiddleware } from '../middleware/sameUserAndAdmin.middleware';
import { OrderController } from './../controllers/order.controller';
import { Router } from "express";


const router = Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(
    cookieAuthenticationMiddleware,
    cookieAdminMiddleware,
   OrderController.getAllOrders
  )
  .post(
    cookieAuthenticationMiddleware,
    orderValidationMiddleware,
   OrderController.createOrder
  );

router
  .route("/:id")
  .delete(cookieAuthenticationMiddleware, ownerAndAdminMiddleware,OrderController.deleteOrderById)
  .get(cookieAuthenticationMiddleware, ownerAndAdminMiddleware, OrderController.getOrderById)
  .patch(
    cookieAuthenticationMiddleware,
    ownerAndAdminMiddleware,
    orderValidationMiddleware,
   OrderController.editOrderById
  );

router
  .route("/orders-by-user-id/:userId")
  .get(cookieAuthenticationMiddleware, sameUserAndAdminMiddleware,OrderController.getAllOrdersByUserId);

router
  .route("/delete-all-orders-by-user-id/:userId")
  .delete(cookieAuthenticationMiddleware, sameUserAndAdminMiddleware,OrderController.deleteOrdersByUserId);

router
  .route("/delete-all-orders")
  .delete(cookieAuthenticationMiddleware, cookieAdminMiddleware,OrderController.deleteOrdersByUserId);

export default router;
