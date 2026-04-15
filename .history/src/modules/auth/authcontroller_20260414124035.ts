import type {Response,Request} from 'express'
import AuthService from './authService.js'
import { ApiResponse } from '../../common/utils/apiResponse.js'


export const controller :any =()=>{

const register = async(req:Request,res:Response) =>{
   const createdUser= await AuthService.register(req.body)
   ApiResponse.created(res,"User created successfully",createdUser)
}

const login = async(req:Request,res:Response)=>{
    
    const {user,accessToken,refreshToken} = await AuthService.login(req.body);

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    })
    
    ApiResponse.ok(res,"User logged in successfully",{user,accessToken})
    
}



}