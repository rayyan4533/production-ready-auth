import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";



export const userRoleEnum = pgEnum("user_role",[
    "admin",
    "viewer",
    "editor",
]);

export const userTable =pgTable("users",{
    id:uuid
})