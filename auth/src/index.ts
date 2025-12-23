import express from "express";

//* initalize app
const app = express();

const PORT = process.env.PORT || 3000;

//* middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* start server
app.listen(PORT, () => {
  console.log(`Auth service running on port http://localhost${PORT}`);
});

