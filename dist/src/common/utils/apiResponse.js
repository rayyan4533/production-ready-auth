export class ApiResponse {
    static ok(res, message, data = null) {
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    }
    static created(res, message, data = null) {
        return res.status(201).json({
            success: true,
            message,
            data,
        });
    }
    static noContent(res) {
        return res.status(204).send();
    }
} //basically we can send an array or obj or whatever we want by giving <T>
//# sourceMappingURL=apiResponse.js.map