import { Request, Response, NextFunction } from "express";

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  next({ status: 400, error: "Not Found", message: "Invalid route called" });
};

export default notFoundRoute;
