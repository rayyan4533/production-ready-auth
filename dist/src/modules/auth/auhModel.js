import { z } from 'zod';
export const signupPayload = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string()
});
export const signinPayload = z.object({
    email: z.email(),
    password: z.string()
});
//# sourceMappingURL=auhModel.js.map