import { Gender, Role } from "@prisma/client";

export class SignupModel{
  name: string = "";
  email:  string = "";
  phone: string = "";
  image: string = "";
  gender: Gender = Gender.Male;
  role?: Role;
  confirmPassword: string = "";
  password: string = "";
  address: string = "";
}