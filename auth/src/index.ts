import mongoose from "mongoose";
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    //* connect to mongoDB *//
    await mongoose
      .connect("mongodb://auth-mongo-srv:27017/auth-service")
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });

    //* start server
    app.listen(PORT, () => {
      console.log(`Auth service running on port http://localhost${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
