import express from "express";
import { currentUserRouter } from "./routes/current-user.js";
import { signInRouter } from "./routes/sign-in.js";
import { signUpRouter } from "./routes/sign-up.js";
import { signOutRouter } from "./routes/sign-out.js";
import { errorHandler } from "./middlewares/error-handle.js";

//* initalize app
const app = express();

const PORT = process.env.PORT || 3000;

//* middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

//* error handler middleware
app.use(errorHandler);

//* start server
app.listen(PORT, () => {
  console.log(`Auth service running on port http://localhost${PORT}`);
});
