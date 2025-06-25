import { z } from "zod";

export const orderDetailSchema = z.object({
  id: z.string().optional(),
  itemName: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string().optional(),
  menuItemId: z.string(),
  orderId: z.string().optional(),
});
