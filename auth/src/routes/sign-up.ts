import express, { type Request, type Response } from "express";
import "express-async-errors";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-errors.js";

const router = express.Router();

//* current user route *//
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    res.send({ message: "User signed up successfully", data: {} });
  }
);

export { router as signUpRouter };
