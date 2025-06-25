"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const idCheckValidation_middleware_1 = require("../middleware/idCheckValidation.middleware");
const menuItem_controller_1 = require("../controllers/menuItem.controller");
const menuItemValidation_middleware_1 = require("../middleware/menuItemValidation.middleware");
const cookieAuthentication_middleware_1 = require("../middleware/cookieAuthentication.middleware");
const cookieAdmin_middleware_1 = require("../middleware/cookieAdmin.middleware");
const router = express_1.default.Router();
router.param("id", idCheckValidation_middleware_1.idCheckValidationMiddleware);
router
    .route("/")
    .get(menuItem_controller_1.MenuItemController.getAllMenuItems)
    .post(menuItemValidation_middleware_1.menuItemValidationMiddleware, cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, menuItem_controller_1.MenuItemController.createMenuItem);
router
    .route("/:id")
    .delete(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, menuItem_controller_1.MenuItemController.deleteMenuItemById)
    .get(menuItem_controller_1.MenuItemController.getMenuItemById)
    .patch(menuItemValidation_middleware_1.menuItemValidationMiddleware, cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, menuItem_controller_1.MenuItemController.editMenuItemById);
exports.default = router;
