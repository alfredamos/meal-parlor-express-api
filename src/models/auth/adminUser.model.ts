import { Role } from "@prisma/client";

export class AdminUserModel {
  id: string = "";
  name: string = "";
  email: string = "";
  gender: string = "";
  phone: string = "";
  role: Role = Role.User;
  token?: string;
  image?: string;
  address: string = "";
}
