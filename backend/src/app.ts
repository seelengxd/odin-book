import express, { Express } from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api";
import passport from "passport";
import session from "express-session";
import logger from "morgan";
import authRouter from "./routes/auth";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(logger("dev"));
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// Auth related middleware
app.use(session({ secret: "secret" }));
app.use(passport.initialize());
app.use(passport.authenticate("session"));
app.use(authRouter);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
