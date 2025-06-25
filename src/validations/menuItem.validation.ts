import {z} from 'zod';

export const menuItemSchema = z.object({
  id: z.string().optional(),
  itemName: z.string(),
  category: z.string(),
  price: z.number(),
  specialTag: z.string().optional(),
  image: z.string(),
  description: z.string(),  
  userId: z.string(),
})