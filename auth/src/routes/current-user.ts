import express from "express";

const router = express.Router();

//* current user route *//
router.get("/api/users/currentuser", (req, res) => {
    res.send('Hi there from current user route');
});

export { router as currentUserRouter };
