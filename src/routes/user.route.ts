import express from "express";
import { idCheckValidationMiddleware } from "../middleware/idCheckValidation.middleware";
import { UserController } from "../controllers/user.controller";
import { cookieAuthenticationMiddleware } from "../middleware/cookieAuthentication.middleware";
import { cookieAdminMiddleware } from "../middleware/cookieAdmin.middleware";
import { sameUserAndAdminMiddleware } from "../middleware/sameUserAndAdmin.middleware";

const router = express.Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(
    cookieAuthenticationMiddleware,
    cookieAdminMiddleware,
    UserController.getAllUsers
  );

router
  .route("/:id")
  .delete(
    cookieAuthenticationMiddleware,
    sameUserAndAdminMiddleware,
    UserController.deleteUserById
  )
  .get(
    cookieAuthenticationMiddleware,
    sameUserAndAdminMiddleware,
    UserController.getUserById
  );

export default router;
