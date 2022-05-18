import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { authFactory } from "./services/auth";

const { APP_PORT, JWT_SECRET } = process.env;
const app = express();
const auth = authFactory(JWT_SECRET);

if (!APP_PORT || !JWT_SECRET) {
  throw new Error("Missing environment variables");
}
// routes that don't require authentication
const unprotectedRoutes = ["/auth"];

// AUTH middleware

const checkAuth = (req: Request, res: Response, next) => {
  if (unprotectedRoutes.includes(req.path)) {
    next();
  }
  if (!req.headers.authorization) {
    return res.status(401).send("error: no authorization header");
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).send("Unauthorized");
  }
};

app.use(bodyParser.json());
app.use(checkAuth);

app.get("/auth", (req, res) => {
  const token = auth(req.body.username, req.body.password);
  res.send(token);
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
