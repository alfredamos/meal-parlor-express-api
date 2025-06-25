"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_db_1 = require("../db/user.db");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.deleteUserById = async (req, res) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Delete the cart item from the database.
    const userDeleted = await user_db_1.UserDb.deletedUser(id);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(userDeleted);
};
UserController.getAllUsers = async (req, res) => {
    //----> Get all cart items from the database.
    const users = await user_db_1.UserDb.getAllUsers();
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(users);
};
UserController.getUserById = async (req, res) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Retrieve cart item from database.
    const user = await user_db_1.UserDb.detailUser(id);
    //----> Send back the response back.
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
};
