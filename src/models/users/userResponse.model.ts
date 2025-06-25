//import { Role } from '../role.model';

import { Role } from "@prisma/client";

export class UserResponseModel {
  id: string = "";
  name: string = "";
  email: string = "";
  gender: string = "";
  phone: string = "";
  role: Role = Role.User;
  image: string = "";
  address: string = "";
}
