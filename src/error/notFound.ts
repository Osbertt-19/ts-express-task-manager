import { RequestHandler } from "express";
import { NotFoundError } from "../core/ApiError";

const notFound:RequestHandler=(req, res, next) => next(new NotFoundError())
export default notFound;