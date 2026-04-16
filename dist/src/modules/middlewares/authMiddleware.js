import { z } from 'zod';
import { ApiError } from "../../common/utils/apiError.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
// import { users,db } from "../../../drizzle/src/db/schema.js";
import { eq } from "drizzle-orm";
import { db } from '../../../drizzle/src/index.js';
import { userTable } from '../../../drizzle/src/db/schema.js';
export const userPayloadSchema = z.object({
    id: z.string(), // Change to z.string() if your DB uses UUIDs instead of numbers
    role: z.string(),
    name: z.string(),
    email: z.string()
});
export const authenticate = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            throw ApiError.unauthorized("invalid token");
        }
        const decodedId = verifyAccessToken(token);
        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, decodedId));
        if (!user) {
            throw new ApiError(401, "The user belonging to this token no longer exists.");
        }
        // 4. Attach the user data to our custom AuthRequest object
        req.user = {
            id: user.id,
            role: user.role, // Make sure 'role' exists on your Drizzle schema!
            name: user.name,
            email: user.email,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
export const authorize = (...roles) => {
    // 2. This is the actual middleware function that Express will run
    return (req, res, next) => {
        // 3. Double-check that we actually have a user attached to the request
        if (!req.user || !req.user.role) {
            return next(new ApiError(403, "You do not have permission to perform this action"));
        }
        // 4. Check if the user's role is in the list of allowed roles
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, "You do not have permission to perform this action"));
        }
        // 5. If everything looks good, move to the route handler!
        next();
    };
};
//# sourceMappingURL=authMiddleware.js.map