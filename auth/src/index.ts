import express from "express";
import { currentUserRouter } from "./routes/current-user.js";
import { signInRouter } from "./routes/sign-in.js";
import { signUpRouter } from "./routes/sign-up.js";
import { signOutRouter } from "./routes/sign-out.js";
import { errorHandler } from "./middlewares/error-handle.js";
import { NotFoundError } from "./errors/not-found-error.js";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

//* initalize app
const app = express();

const PORT = process.env.PORT || 3000;

//* middleware
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: true,
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

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    //* connect to mongoDB *//
    await mongoose
      .connect("mongodb://auth-mongo-srv:27017/auth-service")
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });

    //* start server
    app.listen(PORT, () => {
      console.log(`Auth service running on port http://localhost${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
