import {Request, Response} from "express";
import { orderDb } from "../db/order.db";
import { UuidTool } from "uuid-tool";
import { getCurrentUserInfo } from "./checkForSameUserOrAdmin";

export async function checkForOwnership(req: Request, res: Response, orderId: string){
  //----> Get the order.
  const order = await orderDb.getOneOrder(orderId);

  //----> Get the user-id on the order.
  const idOfUser = order?.userId;

  //----> Get the current user info.
  const {userId, isAdmin} = getCurrentUserInfo(req, res);

  //----> Compare the two user-ids.
  const isOwner = UuidTool.compare(idOfUser, userId);

  return {isOwner, isAdmin}
}