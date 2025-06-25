import express from "express";
import { idCheckValidationMiddleware } from "../middleware/idCheckValidation.middleware";
import { MenuItemController } from "../controllers/menuItem.controller";
import { menuItemValidationMiddleware } from "../middleware/menuItemValidation.middleware";
import { cookieAuthenticationMiddleware } from "../middleware/cookieAuthentication.middleware";
import { cookieAdminMiddleware } from "../middleware/cookieAdmin.middleware";

const router = express.Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(MenuItemController.getAllMenuItems)
  .post(menuItemValidationMiddleware, cookieAuthenticationMiddleware, cookieAdminMiddleware, MenuItemController.createMenuItem);

router
  .route("/:id")
  .delete(cookieAuthenticationMiddleware, cookieAdminMiddleware, MenuItemController.deleteMenuItemById)
  .get(MenuItemController.getMenuItemById)
  .patch(menuItemValidationMiddleware, cookieAuthenticationMiddleware, cookieAdminMiddleware, MenuItemController.editMenuItemById);

export default router;
