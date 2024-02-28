import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGOOSE_STRING;

const db = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected Successfully");
  } catch (error) {
    console.log("Error connecting to mongodb", error);
    process.exit(0);
  }
};

export default db;
