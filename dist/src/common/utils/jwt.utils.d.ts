export interface TokenPayload {
    userId: string | number;
}
declare const generateAccessToken: (payload: TokenPayload) => string;
declare const verifyAccessToken: (token: string) => TokenPayload;
declare const generateRefreshToken: (payload: TokenPayload) => string;
declare const verifyRefreshToken: (token: string) => TokenPayload;
declare const generateResetToken: () => {
    rawToken: string;
    hashedToken: string;
};
export { generateResetToken, verifyAccessToken, verifyRefreshToken, generateAccessToken, generateRefreshToken, };
//# sourceMappingURL=jwt.utils.d.ts.map