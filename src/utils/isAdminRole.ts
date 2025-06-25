import { Role } from "@prisma/client";

export const isAdminRole = (role: Role) => role === Role.Admin;