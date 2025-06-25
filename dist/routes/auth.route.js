"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const changePasswordValidation_middleware_1 = require("../middleware/changePasswordValidation.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const editProfileValidation_middleware_1 = require("../middleware/editProfileValidation.middleware");
const loginValidation_middleware_1 = require("../middleware/loginValidation.middleware");
const signupValidation_middleware_1 = require("../middleware/signupValidation.middleware");
const cookieAuthentication_middleware_1 = require("../middleware/cookieAuthentication.middleware");
const router = express_1.default.Router();
router
    .route("/change-password")
    .patch(changePasswordValidation_middleware_1.changePasswordValidationMiddleware, cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, auth_controller_1.AuthController.changePassword);
router
    .route("/edit-profile")
    .patch(editProfileValidation_middleware_1.editProfileValidationMiddleware, cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, auth_controller_1.AuthController.editProfile);
/* router
  .route("/current-user")
  .get(cookieAuthenticationMiddleware, AuthController.currentUser);
 */
router.route("/login").post(loginValidation_middleware_1.loginValidationMiddleware, auth_controller_1.AuthController.login);
router.route("/logout").post(auth_controller_1.AuthController.logout);
router
    .route("/signup")
    .post(signupValidation_middleware_1.signupValidationMiddleware, auth_controller_1.AuthController.signup);
exports.default = router;
