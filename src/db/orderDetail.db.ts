import prisma from "./prisma.db";
import { OrderDetail } from "@prisma/client";

export class OrderDetailDb {
  constructor() {}

  static async createOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
    const newOrderDetail = await prisma.orderDetail.create({ data: orderDetail });

    if (!newOrderDetail) {
      throw new Error("OrderDetail not created");
    }

    return newOrderDetail;
  }

  static async editOrderDetail(id: string, orderDetail: OrderDetail): Promise<OrderDetail> {
    await this.detailOrderDetail(id);

    const editedOrderDetail = await prisma.orderDetail.update({
      data: orderDetail,
      where: { id },
    });

    if (!editedOrderDetail) {
      throw new Error(`OrderDetail with id: ${id} cannot be updated`);
    }

    return editedOrderDetail;
  }

  static async deletedOrderDetail(id: string): Promise<OrderDetail> {
    await this.detailOrderDetail(id);

    const deletedOrderDetail = await prisma.orderDetail.delete({ where: { id } });

    return deletedOrderDetail;
  }

  static async detailOrderDetail(id: string): Promise<OrderDetail> {
    const orderDetail = await prisma.orderDetail.findUnique({ where: { id } });

    if (!orderDetail) {
      throw new Error(`OrderDetail with id: ${id} is not found`);
    }

    return orderDetail;
  }

  static async getAllOrderDetails(): Promise<OrderDetail[]> {
    return await prisma.orderDetail.findMany({});
  }
}
