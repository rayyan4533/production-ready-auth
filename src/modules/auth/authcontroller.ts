import type {Response,Request} from 'express'
import AuthService from './authService.js'
import { ApiResponse } from '../../common/utils/apiResponse.js'
import { ApiError } from '../../common/utils/apiError.js';

export const controller = {

  register: async (req: Request, res: Response) => {
   const createdUser= await AuthService.register(req.body)
   ApiResponse.created(res,"User created successfully",createdUser)
  },

  login: async (req: Request, res: Response) => {

    const {user,accessToken,refreshToken} = await AuthService.login(req.body);

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    })
    
    ApiResponse.ok(res,"User logged in successfully",{user,accessToken})
    
  },

  refresh: async (req: Request, res: Response) => {
    
    const token =req.cookies?.refreshToken;

    const {accessToken} = await AuthService.refresh(token);

    ApiResponse.ok(res,"Token refreshed successfully",{accessToken})

  },

  logout: async (req: Request, res: Response) => {

    await AuthService.logout(req.body.userId);
      res.clearCookie("refreshToken");
    ApiResponse.ok(res,"User logged out successfully")
    
  },
  
  verifyEmail: async (req: Request, res: Response) => {
      await AuthService.verifyEmail(req.params.token as string);
      ApiResponse.ok(res,"Email verified successfully")
  },
  forgotPassword: async (req: Request, res: Response) => {
    await AuthService.forgotPassword(req.body.email);
    ApiResponse.ok(res,"Password reset email sent successfully")
  },
  resetPassword: async (req: Request, res: Response) => {
    await AuthService.resetPassword(req.body.token,req.body.newPassword);
    ApiResponse.ok(res,"Password reset successfully")
  },

  uploadAvatar : async(req:Request,res:Response)=>{
    try {
      const file =req.file
      if(!file){
        return ApiError.badRequest("No file uploaded")
      }
      const result = await AuthService.uploadAvatar(file,req.body.userId);
      return ApiResponse.ok(res,"Avatar uploaded successfully",result)
    } catch (error) {
      console.log(error)
      return ApiError.notFound("Failed to upload avatar")
      
    }
  }

};