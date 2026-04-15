import crypto from 'crypto'
import jwt from 'jsonwebtoken'
// import 'dotenv/config';




const generateAccessToken =(payload:any)=>{
    return jwt.sign(payload,process.env.jwt)
}
