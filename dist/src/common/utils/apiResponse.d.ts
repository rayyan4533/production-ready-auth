import type { Response } from "express";
export declare class ApiResponse {
    static ok<T>(res: Response, message: string, data?: T | null): Response<any, Record<string, any>>;
    static created<T>(res: Response, message: string, data?: T | null): Response<any, Record<string, any>>;
    static noContent(res: Response): Response<any, Record<string, any>>;
}
//# sourceMappingURL=apiResponse.d.ts.map