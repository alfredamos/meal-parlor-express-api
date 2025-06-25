"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemController = void 0;
const http_status_codes_1 = require("http-status-codes");
const menuItem_db_1 = require("../db/menuItem.db");
class MenuItemController {
}
exports.MenuItemController = MenuItemController;
_a = MenuItemController;
MenuItemController.createMenuItem = async (req, res) => {
    //----> Get the cart item from the request.
    const newMenuItem = req.body;
    //----> Store the new cart item in the database.
    const createdMenuItem = await menuItem_db_1.MenuItemDb.createMenuItem(newMenuItem);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdMenuItem);
};
MenuItemController.deleteMenuItemById = async (req, res) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Delete the cart item from the database.
    const deletedMenuItem = await menuItem_db_1.MenuItemDb.deletedMenuItem(id);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedMenuItem);
};
MenuItemController.editMenuItemById = async (req, res) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Get the cart item to update from request.
    const menuItemToUpdate = req.body;
    //----> Delete the cart item from the database.
    const editedMenuItem = await menuItem_db_1.MenuItemDb.editMenuItem(id, menuItemToUpdate);
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(editedMenuItem);
};
MenuItemController.getAllMenuItems = async (req, res) => {
    //----> Get all cart items from the database.
    const menuItems = await menuItem_db_1.MenuItemDb.getAllMenuItems();
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json(menuItems);
};
MenuItemController.getMenuItemById = async (req, res) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Retrieve cart item from database.
    const menuItem = await menuItem_db_1.MenuItemDb.detailMenuItem(id);
    //----> Send back the response back.
    res.status(http_status_codes_1.StatusCodes.OK).json(menuItem);
};
