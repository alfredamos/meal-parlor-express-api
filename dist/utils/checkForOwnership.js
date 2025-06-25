"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForOwnership = checkForOwnership;
const order_db_1 = require("../db/order.db");
const uuid_tool_1 = require("uuid-tool");
const checkForSameUserOrAdmin_1 = require("./checkForSameUserOrAdmin");
async function checkForOwnership(req, res, orderId) {
    //----> Get the order.
    const order = await order_db_1.orderDb.getOneOrder(orderId);
    //----> Get the user-id on the order.
    const idOfUser = order?.userId;
    //----> Get the current user info.
    const { userId, isAdmin } = (0, checkForSameUserOrAdmin_1.getCurrentUserInfo)(req, res);
    //----> Compare the two user-ids.
    const isOwner = uuid_tool_1.UuidTool.compare(idOfUser, userId);
    return { isOwner, isAdmin };
}
