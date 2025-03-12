"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    // Default to 500 server error if not specified
    const statusCode = err.statusCode || 500;
    // Send error response
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
}
exports.errorHandler = errorHandler;
