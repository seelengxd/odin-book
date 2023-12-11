import express, { Express } from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api";
import passport from "passport";
import session from "express-session";
import logger from "morgan";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(logger("dev"));
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
// Auth related middleware
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
// app.use((req, res) => console.log(req.cookies));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
