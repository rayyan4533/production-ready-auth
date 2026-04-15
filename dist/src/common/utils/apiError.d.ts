export declare class ApiError extends Error {
    readonly statusCode: number;
    readonly details?: unknown;
    constructor(statusCode: number, message: string, details?: unknown);
    static badRequest(message?: string, details?: unknown): ApiError;
    static unauthorized(message?: string, details?: unknown): ApiError;
    static forbidden(message?: string, details?: unknown): ApiError;
    static notFound(message?: string, details?: unknown): ApiError;
    static conflict(message?: string, details?: unknown): ApiError;
}
//# sourceMappingURL=apiError.d.ts.map