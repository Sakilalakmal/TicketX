import express, { type Request, type Response } from "express";
import { body, validationResult } from "express-validator";

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;

    res.send({ message: "User signed up successfully", data: {} });
  }
);

export { router as signUpRouter };
