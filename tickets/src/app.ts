import express from "express";
import { errorHandler, NotFoundError, currentUser } from "@sakilalakmal/common";
import cookieSession from "cookie-session";
import { newTicketRouter } from "./routes/new.js";
import { showTicketRouter } from "./routes/shows.js";
import { indexTicketRouter } from "./routes/index.js";
import { updateTicketRouter } from "./routes/update.js";

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
app.use(currentUser);
app.use(newTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all("/{*splat}", async (req, res, next) => {
  next(new NotFoundError());
});

//* error handler middleware
app.use(errorHandler);

export { app };
