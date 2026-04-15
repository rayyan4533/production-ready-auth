export class ApiError extends Error {
    statusCode;
    details;
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message = "Bad request", details) {
        return new ApiError(400, message, details);
    }
    static unauthorized(message = "Unauthorized", details) {
        return new ApiError(401, message, details);
    }
    static forbidden(message = "Forbidden", details) {
        return new ApiError(403, message, details);
    }
    static notFound(message = "Not found", details) {
        return new ApiError(404, message, details);
    }
    static conflict(message = "Conflict", details) {
        return new ApiError(409, message, details);
    }
}
//# sourceMappingURL=apiError.js.map