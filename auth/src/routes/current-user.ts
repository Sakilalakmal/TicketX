import express from "express";
import { currentUser, requireAuth } from "@sakilalakmal/common";

const router = express.Router();

//* current user route *//
router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
