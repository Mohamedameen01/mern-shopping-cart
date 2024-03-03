import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./confiq/db.js";
import userRoutes from "./routes/user.js";
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PATCH,DELETE",
    credentials: true,
  })
);

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

db().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
})

