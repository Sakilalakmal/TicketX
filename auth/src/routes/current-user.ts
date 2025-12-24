import express from "express";
import { currentUser } from "../middlewares/current-user.js";
import { requireAuth } from "../middlewares/required-auth.js";
const router = express.Router();

//* current user route *//
router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
