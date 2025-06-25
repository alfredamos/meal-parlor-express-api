import { MenuItem } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MenuItemDb } from "../db/menuItem.db";


export class MenuItemController {
  static createMenuItem = async (req: Request, res: Response) => {
    //----> Get the cart item from the request.
    const newMenuItem = req.body as MenuItem;
    //----> Store the new cart item in the database.
    const createdMenuItem = await MenuItemDb.createMenuItem(newMenuItem);
    //----> Send back the response.
    res.status(StatusCodes.CREATED).json(createdMenuItem);
  };

  static deleteMenuItemById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Delete the cart item from the database.
    const deletedMenuItem = await MenuItemDb.deletedMenuItem(id);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(deletedMenuItem);
  };

  static editMenuItemById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Get the cart item to update from request.
    const menuItemToUpdate = req.body;
    //----> Delete the cart item from the database.
    const editedMenuItem = await MenuItemDb.editMenuItem(id, menuItemToUpdate);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(editedMenuItem);
  };

  static getAllMenuItems = async (req: Request, res: Response) => {
    //----> Get all cart items from the database.
    const menuItems = await MenuItemDb.getAllMenuItems();

    //----> Send back the response.
    res.status(StatusCodes.OK).json(menuItems);
  };

  static getMenuItemById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Retrieve cart item from database.
    const menuItem = await MenuItemDb.detailMenuItem(id);
    //----> Send back the response back.
    res.status(StatusCodes.OK).json(menuItem);
  };
}
