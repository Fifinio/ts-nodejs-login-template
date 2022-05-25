import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;

export const db = mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
