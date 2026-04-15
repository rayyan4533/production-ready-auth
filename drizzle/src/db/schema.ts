import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";



export const userRoleEnum = pgEnum("user_role",[
    "admin",
    "viewer",
    "editor",
]);

export const userTable =pgTable("users",{
    id:uuid("id").primaryKey().defaultRandom(),
    name:varchar("name",{length:100}).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull().default("viewer"),
  isVerified: boolean("is_verified").notNull().default(false),
  verificationToken: text("verification_token"),
  refreshToken: text("refresh_token"),
  resetPasswordToken: text("reset_password_token"),
  resetPasswordExpires: timestamp("reset_password_expires", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

   
