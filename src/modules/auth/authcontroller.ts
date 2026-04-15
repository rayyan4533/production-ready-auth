import type {Response,Request} from 'express'
import AuthService from './authService.js'
import { ApiResponse } from '../../common/utils/apiResponse.js'


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
    // To be implemented
  },
  forgotPassword: async (req: Request, res: Response) => {
    // To be implemented
  },
  resetPassword: async (req: Request, res: Response) => {
    // To be implemented
  }
};