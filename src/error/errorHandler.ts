import { ErrorRequestHandler } from "express";
import { ApiError, ErrorType, InternalError } from "../core/ApiError";
import Logger from "../core/Logger";
import { environment } from "../config";

const errorHandler:ErrorRequestHandler =(err, req, res, next) => {
    if (err instanceof ApiError) {
      ApiError.handle(err, res);
      if (err.type === ErrorType.INTERNAL)
        Logger.error(
          `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
        );
    } else {
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
      Logger.error(err);
      if (environment === 'development') {
        return res.status(500).send(err);
      }
      ApiError.handle(new InternalError(), res);
    }
  }
  export default errorHandler;