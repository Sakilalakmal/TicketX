import express, { type Response, type Request } from "express";
import { Ticket } from "../models/Ticket.js";

const router = express.Router();

router.get("api/tickets", async (req: Request, res: Response) => {
  const ticket = await Ticket.find({});

  res.status(200).send(ticket);
});

export { router as indexTicketRouter };
