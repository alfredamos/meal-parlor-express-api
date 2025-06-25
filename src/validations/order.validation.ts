import {z} from 'zod';

export const orderSchema = z.object({
   id: z.string().optional(),
  totalQuantity: z.number().optional(),
  totalPrice: z.number().optional(), 
  userId: z.string(),
  status: z.enum([ 'Cancelled',
    'Completed',
    'Confirmed',
    'Pickup'])
})