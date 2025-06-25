"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_db_1 = require("../db/auth.db");
const http_status_codes_1 = require("http-status-codes");
const initialUserCredentials_1 = require("../db/initialUserCredentials");
class AuthController {
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.changePassword = async (req, res) => {
    //----> Get the payload.
    const changePasswordPayload = req.body;
    //----> Change the password and store the updated user credentials in the database.
    const userDetail = await auth_db_1.authDb.changePassword(changePasswordPayload);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(userDetail);
};
AuthController.editProfile = async (req, res) => {
    //----> Get the edit user payload.
    const editProfilePayload = req.body;
    //----> edit user profile and store it in the database.
    const editedUserDetail = await auth_db_1.authDb.editProfile(editProfilePayload);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(editedUserDetail);
};
AuthController.login = async (req, res) => {
    //----> Get the user credentials from the request.
    const loginCredentials = req.body;
    //----> Login the user and get json web token.
    const userCredentials = await auth_db_1.authDb.login(loginCredentials);
    //----> Get the authRes from userCredentials..
    const authRes = userCredentials.authResponse;
    //----> Stringified the authRes.
    const authResStringified = JSON.stringify(authRes);
    //----> Set the auth cookie.
    res.cookie('auth', authResStringified, {
        httpOnly: true
    });
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(userCredentials);
};
AuthController.logout = async (req, res) => {
    //-----> Clear the cookie.
    res.clearCookie("auth", {
        httpOnly: true
    });
    console.log("I have logout!!!");
    //----> Return the default value of user-credentials.
    res.status(http_status_codes_1.StatusCodes.OK).json(initialUserCredentials_1.initialUserCredential);
};
AuthController.signup = async (req, res) => {
    //----> Get the user credentials from the request.
    const newUserCredentials = req.body;
    //----> Store the new user credentials in the database.
    const userCredentials = await auth_db_1.authDb.signup(newUserCredentials);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(userCredentials);
};
