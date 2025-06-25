import express from "express";
import { changePasswordValidationMiddleware } from "../middleware/changePasswordValidation.middleware";
import { AuthController } from "../controllers/auth.controller";
import { editProfileValidationMiddleware } from "../middleware/editProfileValidation.middleware";
import { loginValidationMiddleware } from "../middleware/loginValidation.middleware";
import { signupValidationMiddleware } from "../middleware/signupValidation.middleware";
import { cookieAuthenticationMiddleware } from "../middleware/cookieAuthentication.middleware";

const router = express.Router();

router
  .route("/change-password")
  .patch(
    changePasswordValidationMiddleware,
    cookieAuthenticationMiddleware,
    AuthController.changePassword
  );

router
  .route("/edit-profile")
  .patch(
    editProfileValidationMiddleware,
    cookieAuthenticationMiddleware,
    AuthController.editProfile
  );

/* router
  .route("/current-user")
  .get(cookieAuthenticationMiddleware, AuthController.currentUser);
 */
router.route("/login").post(loginValidationMiddleware, AuthController.login);

router.route("/logout").post(AuthController.logout)

router
  .route("/signup")
  .post(signupValidationMiddleware, AuthController.signup);

 
export default router;
