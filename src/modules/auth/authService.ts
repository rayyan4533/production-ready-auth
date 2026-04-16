import  crypto from 'crypto'
import bcrypt from 'bcrypt'

import {
    generateAccessToken,
    generateRefreshToken,
    generateResetToken,
    verifyAccessToken,
    verifyRefreshToken
    
 } from '../../common/utils/jwt.utils.js';
// import { signinPayload, signupPayload } from './auhModel.js';
import { ApiError } from '../../common/utils/apiError.js';
import { email } from 'zod';
import { db } from '../../../drizzle/src/index.js';
import { userTable } from '../../../drizzle/src/db/schema.js';
import { eq } from 'drizzle-orm';
import { sendResetPasswordEmail, sendVerificationEmail } from '../../common/config/email.js';
import { signupPayload } from '../../modules/auth/auhModel.js';
import { signinPayload } from '../../modules/auth/auhModel.js';



class AuthService{

   async register(payload: typeof signupPayload) {
    // 1. Validate the incoming data with Zod
    const validatedData = await signupPayload.safeParseAsync(payload);
    if (!validatedData.success) {
      throw ApiError.badRequest("Invalid registration details");
    }
    const { name, email, password } = validatedData.data;
    // 2. Check if email is already registered
    const [existingUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);
    if (existingUser) {
      throw ApiError.conflict("User with this email already exists");
    }
    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // 4. Generate verification token — RAW goes in email, HASH goes in DB
    const rawVerificationToken = crypto.randomBytes(32).toString("hex");
    const hashedVerificationToken = crypto
      .createHash("sha256")
      .update(rawVerificationToken)
      .digest("hex");
    // 5. Insert new user into DB, storing the HASHED token
    const [user] = await db
      .insert(userTable)
      .values({
        name,
        email,
        password: hashedPassword,
        verificationToken: hashedVerificationToken,
      })
      .returning({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
        role: userTable.role,
        isVerified: userTable.isVerified,
        createdAt: userTable.createdAt,
      });
    // 6. Send the RAW token to the user's inbox
    // If email fails, we log it but don't crash — user is already created!
    try {
      await sendVerificationEmail(email, rawVerificationToken);
    } catch (err) {
      console.error("Failed to send verification email:", err);
    }
    return user;
  }

 async verifyEmail(token: string) {
    // 1. Guard against empty token
    if (!token) {
      throw ApiError.badRequest("Verification token is required");
    }
    // 2. Hash the raw token from the URL to match what is in the DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    // 3. Find the user who owns this hashed token
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.verificationToken, hashedToken))
      .limit(1);
    if (!user) {
      throw ApiError.badRequest("Invalid or expired verification token");
    }
    // 4. Mark as verified and wipe the token so it can never be reused
    await db
      .update(userTable)
      .set({
        isVerified: true,
        verificationToken: null,
      })
      .where(eq(userTable.id, user.id));
  }



    async login(payload:typeof signinPayload){
        const validatedData = await signinPayload.safeParseAsync(payload)
        if (!validatedData.success) throw ApiError.badRequest("Invalid payload",validatedData.error)
        const { email, password } = validatedData.data;

        const [user]= await db
        .select()
        .from(userTable)
        .where(eq(userTable.email,email))
        .limit(1);

        if(!user){
            throw ApiError.unauthorized("Invalid credentials")
        }

        const isMatch =await bcrypt.compare(password,user.password)
        
        if(!isMatch){
            throw ApiError.unauthorized("Invalid credentials")
        }

        if(!user.isVerified){
            throw ApiError.unauthorized("User not verified")
        }

        const accessToken = generateAccessToken({userId:user.id})
        const refreshToken = generateRefreshToken({userId:user.id})

      
const hashedRefreshoken = crypto.createHash("sha256").update(refreshToken).digest("hex");


        await db
        .update(userTable)
        .set({
            refreshToken:hashedRefreshoken,
        })
        .where(eq(userTable.id,user.id))

         // 8. We strip out the sensitive data using JavaScript destructuring 
    // This extracts the password and refreshToken, leaving everything else safely inside `userObj`
    const { password: _, refreshToken: __, ...userObj } = user;

    return {
        user:userObj,
        accessToken,
        refreshToken,
    }   

       
        }

    // async refreshMytoken 
    async refresh(token:string) {
        const decoded=verifyRefreshToken(token)

        const userId =String(decoded.userId) 

        const [user]= await db
        .select()
        .from(userTable)
        .where(eq(userTable.id,userId))
        .limit(1)

        if(!user){
            throw ApiError.unauthorized("Invalid refresh token")
        }

        const hashedRefreshoken = crypto
                                        .createHash("sha256")
                                        .update(token)
                                        .digest("hex");

        if(user.refreshToken !== hashedRefreshoken){
            throw ApiError.unauthorized("Invalid refresh token")
        }

        const accessToken = generateAccessToken({userId:user.id})
        const refreshToken = generateRefreshToken({userId:user.id})

        await db
        .update(userTable)
        .set({
            refreshToken:hashedRefreshoken,
        })
        .where(eq(userTable.id,user.id))

        const { password: _, refreshToken: __, ...userObj } = user;

        return {
            user:userObj,
            accessToken,
            refreshToken,
        }   

    } 

      async logout(userId: string) {
    // Simply wipe the stored refresh token from the DB
    // Now even if someone has the old cookie, it won't match anything!
    await db
      .update(userTable)
      .set({ refreshToken: null })
      .where(eq(userTable.id, userId));
  }

    async forgotPassword(email: string) {
    if (!email) {
      throw ApiError.badRequest("Email is required");
    }

    // 1. Check if a user with this email actually exists
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);

    // Security trick: even if the user doesn't exist, we say "email sent"
    // This is called "email enumeration protection" — we don't let hackers
    // figure out which emails are registered in our system!
    if (!user) return;

    // 2. Generate the raw and hashed tokens — same pattern as verifyEmail
    const rawResetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(rawResetToken)
      .digest("hex");

    // 3. Store the hashed token + set expiry 15 minutes from now
    await db
      .update(userTable)
      .set({
        resetPasswordToken: hashedResetToken,
        resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
      })
      .where(eq(userTable.id, user.id));

    // 4. Email the RAW token to the user
    try {
      await sendResetPasswordEmail(email, rawResetToken);
    } catch (err) {
      console.error("Failed to send reset email:", err);
    }
  }

    async resetPassword(token: string, newPassword: string) {  
    if (!token || !newPassword) {
      throw ApiError.badRequest("Token and new password are required");
    }

    // 1. Hash the incoming token to compare against DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // 2. Find a user where:
    //    - the hashed token matches
    //    - the token has NOT expired yet
    // The `gt` function means "greater than" — so expiry must be greater than right now
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.resetPasswordToken, hashedToken))
      .limit(1);

    // Check both: user exists AND token hasn't expired
    if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw ApiError.badRequest("Invalid or expired reset token");
    }

    // 3. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Save the new password and clear the reset token
    await db
      .update(userTable)
      .set({
        password: hashedPassword,
        resetPasswordToken: null,  // wipe it so it can't be reused!
        resetPasswordExpires: null,
      })
      .where(eq(userTable.id, user.id));
  }




    }







export default new AuthService()