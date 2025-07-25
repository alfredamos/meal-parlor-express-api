"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const idCheckValidation_middleware_1 = require("../middleware/idCheckValidation.middleware");
const user_controller_1 = require("../controllers/user.controller");
const cookieAuthentication_middleware_1 = require("../middleware/cookieAuthentication.middleware");
const cookieAdmin_middleware_1 = require("../middleware/cookieAdmin.middleware");
const router = express_1.default.Router();
router.param("id", idCheckValidation_middleware_1.idCheckValidationMiddleware);
router
    .route("/")
    .get(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, user_controller_1.UserController.getAllUsers);
router
    .route("/:id")
    .delete(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, user_controller_1.UserController.deleteUserById)
    .get(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, cookieAdmin_middleware_1.cookieAdminMiddleware, user_controller_1.UserController.getUserById);
exports.default = router;
