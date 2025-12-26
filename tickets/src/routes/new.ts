import { requireAuth, validateRequest } from "@sakilalakmal/common";
import { body } from "express-validator";
import express, { type Request, type Response } from "express";
import { Ticket } from "../models/Ticket.js";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      price,
      title,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    res.status(201).send({
      ticket,
    });
  }
);

export { router as newTicketRouter };
