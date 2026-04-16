import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';
export declare const userPayloadSchema: z.ZodObject<{
    id: z.ZodString;
    role: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
}, z.core.$strip>;
type UserPayload = z.infer<typeof userPayloadSchema>;
export interface AuthRequest extends Request {
    user?: UserPayload;
}
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const authorize: (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map