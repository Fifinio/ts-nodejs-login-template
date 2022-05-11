import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const { APP_PORT } = process.env;
const app = express();

app.use(bodyParser.json());

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
