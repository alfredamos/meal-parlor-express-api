import prisma from "./prisma.db";
import { MenuItem } from "@prisma/client";

export class MenuItemDb {
  constructor() {}

  static async createMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    const newMenuItem = await prisma.menuItem.create({ data: menuItem });

    if (!newMenuItem) {
      throw new Error("MenuItem not created");
    }

    return newMenuItem;
  }

  static async editMenuItem(id: string, menuItem: MenuItem): Promise<MenuItem> {
    await this.detailMenuItem(id);

    const editedMenuItem = await prisma.menuItem.update({
      data: menuItem,
      where: { id },
    });

    if (!editedMenuItem) {
      throw new Error(`MenuItem with id: ${id} cannot be updated`);
    }

    return editedMenuItem;
  }

  static async deletedMenuItem(id: string): Promise<MenuItem> {
    await this.detailMenuItem(id);

    const deletedMenuItem = await prisma.menuItem.delete({ where: { id } });

    return deletedMenuItem;
  }

  static async detailMenuItem(id: string): Promise<MenuItem> {
    const menuItem = await prisma.menuItem.findUnique({ where: { id } });

    if (!menuItem) {
      throw new Error(`MenuItem with id: ${id} is not found`);
    }

    return menuItem;
  }

  static async getAllMenuItems(): Promise<MenuItem[]> {
    return await prisma.menuItem.findMany({});
  }
}
