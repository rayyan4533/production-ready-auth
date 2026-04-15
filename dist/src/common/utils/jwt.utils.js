import crypto from "crypto";
import jwt, {} from "jsonwebtoken";
const generateAccessToken = (payload) => {
    const options = {
        expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || "15m"),
    };
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, options);
};
const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};
const generateRefreshToken = (payload) => {
    const options = {
        expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d"),
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, options);
};
const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");
    return { rawToken, hashedToken };
};
export { generateResetToken, verifyAccessToken, verifyRefreshToken, generateAccessToken, generateRefreshToken, };
//# sourceMappingURL=jwt.utils.js.map