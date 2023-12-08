import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api";
import passport from "passport";
import session from "express-session";
import logger from "morgan";
import authRouter from "./routes/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(logger("dev"));

// Auth related middleware
app.use(session({ secret: "secret" }));
app.use(passport.initialize());
app.use(passport.authenticate("session"));
app.use(authRouter);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
