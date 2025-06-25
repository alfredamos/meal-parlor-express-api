import { OrderDetail } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { OrderDetailDb } from "../db/orderDetail.db";


export class OrderDetailController {
  static createOrderDetail = async (req: Request, res: Response) => {
    //----> Get the cart item from the request.
    const newOrderDetail = req.body as OrderDetail;
    //----> Store the new cart item in the database.
    const createdOrderDetail = await OrderDetailDb.createOrderDetail(newOrderDetail);
    //----> Send back the response.
    res.status(StatusCodes.CREATED).json(createdOrderDetail);
  };

  static deleteOrderDetailById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Delete the cart item from the database.
    const deletedOrderDetail = await OrderDetailDb.deletedOrderDetail(id);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(deletedOrderDetail);
  };

  static editOrderDetailById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Get the cart item to update from request.
    const orderDetailToUpdate = req.body;
    //----> Delete the cart item from the database.
    const editedOrderDetail = await OrderDetailDb.editOrderDetail(id, orderDetailToUpdate);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(editedOrderDetail);
  };

  static getAllOrderDetails = async (req: Request, res: Response) => {
    //----> Get all cart items from the database.
    const orderDetails = await OrderDetailDb.getAllOrderDetails();
    //----> Send back the response.
    res.status(StatusCodes.OK).json(orderDetails);
  };

  static getOrderDetailById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Retrieve cart item from database.
    const orderDetail = await OrderDetailDb.detailOrderDetail(id);
    //----> Send back the response back.
    res.status(StatusCodes.OK).json(orderDetail);
  };
}
