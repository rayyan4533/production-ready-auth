import crypto from "crypto";
import jwt, { type SignOptions } from "jsonwebtoken";

// Define exactly what data is stored inside your token
export interface TokenPayload {
  userId: string | number;
  // You can add 'role' or 'email' here later if you need to!
}

const generateAccessToken = (payload: TokenPayload) => {
  const options = {
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || "15m") as SignOptions["expiresIn"],
  } as SignOptions;
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, options);
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as TokenPayload;
};

const generateRefreshToken = (payload: TokenPayload) => {
  const options = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
  } as  SignOptions;
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, options);
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as TokenPayload;
};

const generateResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return { rawToken, hashedToken };
};

export {
  generateResetToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
};