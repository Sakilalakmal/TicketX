import express from "express";
import { currentUserRouter } from "./routes/current-user.js";
import { signInRouter } from "./routes/sign-in.js";
import { signUpRouter } from "./routes/sign-up.js";
import { signOutRouter } from "./routes/sign-out.js";
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

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all("/{*splat}", async (req, res, next) => {
  next(new NotFoundError());
});

//* error handler middleware
app.use(errorHandler);

export { app };
