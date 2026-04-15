import type { Request, Response } from "express";
import { authService } from "./authService.js";
import { ApiResponse } from "../../common/utils/apiResponse.js";

const register = async (req: Request, res: Response) => {
  // The controller ONLY handles extracting data/body and resolving it via the Response object.
  // req.body is passed unaltered to the service, where it will be securely validated.
  const user = await authService.register(req.body);

  // We use your ApiResponse utility to predictably format the JSON!
  ApiResponse.created(
    res,
    "Registration successful. Please verify your email.",
    user
  );
};

const login = async (req: Request, res: Response) => {
  // TODO: We will build authService.login next!
  res.status(501).send("Not implemented yet");
};

const refreshToken = async (req: Request, res: Response) => {
  res.status(501).send("Not implemented yet");
};

const logout = async (req: Request, res: Response) => {
  res.status(501).send("Not implemented yet");
};

const verifyEmail = async (req: Request, res: Response) => {
  res.status(501).send("Not implemented yet");
};

const forgotPassword = async (req: Request, res: Response) => {
  res.status(501).send("Not implemented yet");
};

const resetPassword = async (req: Request, res: Response) => {
   res.status(501).send("Not implemented yet");
};

const getMe = async (req: Request, res: Response) => {
   res.status(501).send("Not implemented yet");
};

export {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
};