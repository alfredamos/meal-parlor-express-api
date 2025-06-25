export class OrderModel{
  id: string = "";
    paymentId: string = "";
    userId: string = "";
    totalPrice: number = 0;
    totalQuantity: number = 0;
    orderDate: Date = new Date();
}