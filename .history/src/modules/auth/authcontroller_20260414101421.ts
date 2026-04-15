import type {res,req} from 'express'
import { signinPayload,signupPayload } from "./auhModel.js";
import { ApiError } from '../../common/utils/apiError.js';
import { db } from '../../../drizzle/src/index.js';
import { userTable } from '../../../drizzle/src/db/schema.js';
import {generateAccessToken,generateRefreshToken,generateResetToken } from '../../common/utils/jwt.utils.js';
import { eq } from 'drizzle-orm';
import { createHmac, randomBytes } from 'node:crypto';
import { hex } from 'zod';

export const controller :any =()=>{

const register = async(req,res) =>{
    const Validated_user=await signupPayload.safeParseAsync(req.body)
    if (Validated_user.error) return ApiError.badRequest("details toh dhang se likh le")
    const {firstname,lastname,email,password}=Validated_user.data  

    const emailResult=db.select().from(userTable).where(eq(userTable.email,email))

    if((await emailResult).length>0) return res.status(400).json({}))
    

        const salt =randomBytes(32).toString('hex')
        const hash =createHmac('sha256',salt).update
}



}