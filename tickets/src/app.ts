import express from "express";
import { errorHandler, NotFoundError } from "@sakilalakmal/common";

import cookieSession from "cookie-session";

//* initalize app
const app = express();

//* middleware
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("/{*splat}", async (req, res, next) => {
  next(new NotFoundError());
});

//* error handler middleware
app.use(errorHandler);

export { app };
