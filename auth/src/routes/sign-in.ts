import express, { type Request, type Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "@sakilalakmal/common";
import { User } from "../models/User.js";
import { BadRequestError } from "@sakilalakmal/common";
import { Password } from "../services/password.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//* current user route *//
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("provide password to sign in"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    //* generate jsonweb token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    //* store token in session object

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
