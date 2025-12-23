import express from "express";

const router = express.Router();

//* current user route *//
router.post("/api/users/signin", (req, res) => {
    res.send('Hi there from current user route');
});

export { router as signInRouter };
