import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { findAllUsers } from "./services/user";

mongoose.set("debug", true);
mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}/MainDatabase`).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});

const app = express();
const port = 8000;

// todo: restrict to whatever frontend domain we use
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/register", async (req, res) => {
    const { email, password } = req.body;
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
});

app.listen(port, async () => {
    console.log(await findAllUsers());

    console.log(
    `Example app listening at http://localhost:${port}`
  );
});