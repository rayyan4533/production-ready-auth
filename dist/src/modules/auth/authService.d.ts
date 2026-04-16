import { signupPayload } from '../../modules/auth/auhModel.js';
import { signinPayload } from '../../modules/auth/auhModel.js';
declare class AuthService {
    register(payload: typeof signupPayload): Promise<{
        id: string;
        name: string;
        email: string;
        role: "admin" | "viewer" | "editor";
        isVerified: boolean;
        createdAt: Date;
    } | undefined>;
    verifyEmail(token: string): Promise<void>;
    login(payload: typeof signinPayload): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "viewer" | "editor";
            isVerified: boolean;
            verificationToken: string | null;
            resetPasswordToken: string | null;
            resetPasswordExpires: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(token: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "viewer" | "editor";
            isVerified: boolean;
            verificationToken: string | null;
            resetPasswordToken: string | null;
            resetPasswordExpires: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=authService.d.ts.map