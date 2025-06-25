import prisma from "./prisma.db";
import { User } from "@prisma/client";

export class UserDb {
  constructor() {}

  static async deletedUser(id: string): Promise<User> {
    await this.detailUser(id);

    const deletedUser = await prisma.user.delete({ where: { id } });

    return deletedUser;
  }

  static async detailUser(id: string) {
    //----> Get the user with given id from database.
    const user = await prisma.user.findUnique({ where: { id } });

    //----> Check for null user.
    if (!user) {
      throw new Error(`User with id: ${id} is not found`);
    }

    //----> Destructure the user.
    const {password, ...rest} = user;

    //----> Send back the result.
    return rest;
  }

  static async getAllUsers(): Promise<User[]> {
    //----> Map passwords of users to null.
    const results = (await prisma.user.findMany({})).map(user => ({...user, password: ""}));
  
    //----> Send back the results.
    return results
  }
}
