import { StatusCodes } from "http-status-codes";
import prisma from "./prisma.db";
import { OrderDetail, Order } from "@prisma/client";
import catchError from "http-errors";
import { OrderPayload } from "../models/orders/orderPayload.model";
import { OrderModel } from "../models/orders/orderModel.model";

export class OrderDb {
  constructor() {}

  async createOrder(orderPayLoad: OrderPayload) {
    const { orderDetails, ...rest } = orderPayLoad;
    //----> Get the total quantity and total price into order.
    console.log("Before modifier");
    const modifiedOrder = this.adjustTotalPriceAndTotalQuantity(
      rest,
      orderDetails
    );
    console.log("After modifier");
    console.log({ modifiedOrder, orderDetails });
    //----> Store the new order info in the database.
    const createdOrder = await prisma.order.create({
      data: {
        ...modifiedOrder,
        orderDate: new Date(),
        orderDetails: {
          create: orderDetails?.map((cart) => ({
            ...cart,
            pizza: {
              create: {
                id: cart.menuItemId,
              },
            },
          })),
        },
      },
      include: {
        orderDetails: true,
      },
    });

    return createdOrder;
  }

  async orderCreate(orderPayload: OrderPayload) {
    console.log({ orderPayload });

    const { orderDetails, ...rest } = orderPayload;

    const createdOrder = await prisma.order.create({
      data: {
        ...rest,
      },
    });

    const createdOrderDetails = await this.createOrderDetails(
      orderDetails,
      createdOrder?.id
    );

    const payloadOfOrder: OrderPayload = {
      ...createdOrder,
      orderDetails: createdOrderDetails,
    };

    return payloadOfOrder;
  }

  async deleteAllOrders() {
    //----> Delete all order-details.
    await prisma.orderDetail.deleteMany({});

    //----> Delete all orders.
    await prisma.order.deleteMany({});

    //----> Send back the response.
    return {
      status: "success",
      message: "All orders are deleted successfully!",
    };
  }

  async deleteOrderById(id: string) {
    //----> Check for the existence of order in the database.
    await this.getOrderById(id);
    //----> Delete all associated cart-items.
    await prisma.order.update({
      where: { id },
      data: {
        orderDetails: {
          deleteMany: {},
        },
      },
      include: {
        orderDetails: true,
      },
    });
    //----> Delete the order info from the database.
    const deletedOrder = await prisma.order.delete({ where: { id } });

    return deletedOrder;
  }

  async deleteOrdersByUserId(userId: string) {
    //----> Get the customer with the user-id.
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }

    //----> Get all the orders by customerId.
    const orders = await prisma.order.findMany({
      where: { userId: user?.id },
    });
    //----> Delete all these others in the database.
    this.allOrdersDeletedByUserId(orders, user?.id);
  }

  async editOrder(id: string, orderToEdit: Order) {
    //----> Check for the existence of order in the db.
    await this.getOrderById(id);
    //----> Store the edited order info in the database.
    const editedOrder = await prisma.order.update({
      where: { id },
      data: { ...orderToEdit },
    });

    return editedOrder;
  }

  async getAllOrders() {
    //----> Get all the orders from the database.
    const allOrders = await prisma.order.findMany({
      include: { orderDetails: true, user: true },
    });

    return allOrders;
  }

  async getAllOrdersByUserId(userId: string) {
    //----> Get all the orders from the database.
    const allOrders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderDetails: true,
        user: true,
      },
    });

    return allOrders;
  }

  async getOneOrder(id: string) {
    //----> Check for the existence of order in the db.
    const order = await this.getOrderById(id, true);

    return order;
  }

  private async getOrderById(id: string, include: boolean = false) {
    //----> Retrieve the order info with this id from database.
    const order = await prisma.order.findUniqueOrThrow({
      where: { id },
      include: {
        orderDetails: include,
      },
    });
    //----> Send back a valid order.
    return order;
  }

  private adjustTotalPriceAndTotalQuantity(
    order: OrderModel,
    orderDetails: OrderDetail[] = []
  ): OrderModel {
    console.log({ order, orderDetails });
    //----> Calculate both the total cost and total quantity.
    const totalQuantity = orderDetails?.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    const totalPrice = orderDetails?.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0
    );
    //----> Adjust the total cost and total quantity on the order.
    order.totalPrice = totalPrice;
    order.totalQuantity = totalQuantity;
    //----> Return the modified order.
    return order;
  }

  private allOrdersDeletedByUserId(orders: Order[], userId: string) {
    //----> Delete all orders by customerId
    const userOrders = orders?.filter((order) => order.userId === userId);
    userOrders?.forEach(async (order) => {
      //----> Delete all associated cart-items.
      await prisma.order.update({
        where: { id: order.id },
        data: {
          orderDetails: {
            deleteMany: {},
          },
        },
        include: {
          orderDetails: true,
        },
      });
      //----> Delete the order info from the database.
      await prisma.order.delete({ where: { id: order.id } });
    });
  }

  private createOrderDetails(orderDetails: OrderDetail[], orderId: string) {
    //----> Edit all cart-items at once.
    const createdCarItems = orderDetails.map(async (cart) => {
      return await prisma.orderDetail.create({
        data: { ...cart, orderId },
      });
    });

    //----> Collect all edited cart-items in Promise.all().
    const updatedOrderorderDetails = Promise.all(createdCarItems);

    //----> Return the updated cart-items.

    return updatedOrderorderDetails;
  }
}

export const orderDb = new OrderDb();
