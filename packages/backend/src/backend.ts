import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createUser, findUserByName, generateJWT, isPasswordValid, verifyJWT } from "./services/user";

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
    const username = req.body?.username;
    const password = req.body?.password;

    const errors: string[] = [];
    if (typeof password !== "string") {
        errors.push("Password must be a string");
    }
    if (typeof username !== "string") {
        errors.push("Username must be a string");
    }

    if (errors.length > 0) {
        res.status(400).send(errors.join(", "));
        return;
    }

    if (await findUserByName(username)) {
        res.status(400).send("User already exists");
        return;
    }

    const user = await createUser(username, password);
    const token = generateJWT(user);

    res.status(201).json({ token, user });
});

app.post("/auth/login", async (req, res) => {
    const username = req.body?.username;
    const password = req.body?.password;

    const errors: string[] = [];
    if (typeof username !== "string") {
        errors.push("Username must be a string");
    }
    if (typeof password !== "string") {
        errors.push("Password must be a string");
    }

    if (errors.length > 0) {
        res.status(400).send(errors.join(", "));
        return;
    }

    const user = await findUserByName(username);
    if (!user) {
        res.status(400).send("User not found");
        return;
    }

    if (!(await isPasswordValid(user, password))) {
        res.status(400).send("Invalid credentials");
        return;
    }

    const token = generateJWT(user);
    res.status(200).json({ token, user });
});

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }

    const userData = verifyJWT(token);
    if (!userData) {
        res.status(401).send("Unauthorized");
        return;
    }

    req._id = userData._id;

    next();
};

app.get("/testNeedsAuth", authMiddleware, async (req, res) => {
  res.send(`You are authenticated as ${req._id}`);
});

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
});