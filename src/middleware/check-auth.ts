import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const checkAuth = (req: Request, res: Response, next: () => void) => {
  // routes that don't require authentication
  const unprotectedRoutes = ["/auth"];

  if (unprotectedRoutes.includes(req.path)) {
    return next();
  }
  if (!req.headers.authorization) {
    res.status(401).send("error: no authorization header");
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, JWT_SECRET);
      next();
    }
  } catch (e) {
    return res.status(401).send("Unauthorized");
  }
};

export default checkAuth;
