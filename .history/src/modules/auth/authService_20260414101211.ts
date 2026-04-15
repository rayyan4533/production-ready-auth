import crypto from "crypto";
import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/src/index.js";
import { userTable } from "../../../drizzle/src/db/schema.js";
import { ApiError } from "../../common/utils/apiError.js";
import { signupPayload } from "./auhModel.js";

const register = async (payload: unknown) => {
  // 1. Validate the incoming data strictly using our Zod schema
  const validatedData = await signupPayload.safeParseAsync(payload);
  
  if (!validatedData.success) {
    // If validation fails, we throw an ApiError which our controller/router will handle
    throw ApiError.badRequest("Invalid registration details", validatedData.error.flatten());
  }

  const { name, email, password } = validatedData.data;

  // 2. Check if the user already exists in the Postgres DB using Drizzle
  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw ApiError.conflict("User with this email already exists");
  }

  // 3. Hash the password securely (since you were using Node's native crypto, let's stick to that)
  // Generating a random salt
  const salt = crypto.randomBytes(32).toString('hex');
  // Hashing the password with the salt using SHA-256
  const hash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  // We'll store it as 'salt:hash' in the DB
  const hashedPassword = `${salt}:${hash}`;

  // 4. Insert the new user into the database
  const [newUser] = await db
    .insert(userTable)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
      role: userTable.role,
      isVerified: userTable.isVerified,
      createdAt: userTable.createdAt,
    }); // We avoid returning the password!

  return newUser;
};

// We will add login, logout, etc here next, but let's export registering for now!
export const authService = {
  register,
};