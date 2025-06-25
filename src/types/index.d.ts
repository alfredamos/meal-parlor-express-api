// src/types/express.d.ts
import {Role} from "@prisma/client";
import { Request } from "express"; // Import Request from express

//export {};

declare global {
  namespace Express {
    interface Request {
      // Add your custom property here
      myCustomValue?: string; // Example: a string property named myCustomValue
      user?: {id: string; name: string; role: Role}; // Another example: a number property for a user ID
    }
  }
}
