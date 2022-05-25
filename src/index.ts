import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { authFactory } from "./services/auth";
import checkAuth from "./middleware/check-auth";
const APP_PORT = process.env.APP_PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const app = express();

if (!APP_PORT || !JWT_SECRET) {
  throw new Error("Missing environment variables");
}

const auth = authFactory(JWT_SECRET);
app.use(bodyParser.json());
app.use(checkAuth);

app.post("/auth", (req, res) => {
  const token = auth(req.body.username, req.body.password);
  if (token) {
    res.send(token);
  } else {
    res.status(401).send("Something went wrong authorizing the user");
  }
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
