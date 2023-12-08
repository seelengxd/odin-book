import { RequestHandler } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator";
import prisma from "../lib/db";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "@prisma/client";

interface LogInData {
  username: string;
  password: string;
}

interface SignUpData extends LogInData {
  email: string;
  confirmPassword: string;
}

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || user.password != password) {
      return cb(null, false, { message: "Incorrect username or password." });
    }
    return cb(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (userId: number, cb) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  cb(null, user);
});

export const logIn: RequestHandler<LogInData>[] = [
  body("username").trim().notEmpty(),
  body("password").trim().notEmpty().isLength({ min: 8 }),
  validate,
  (req, res, next) => {
    passport.authenticate("local", function (err: Error, user: User) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid username or password." }] });
      }
      req.logIn(user, next);
      res.json({ user });
      return;
    })(req, res, next);
  },
];

export const signUp: RequestHandler<SignUpData>[] = [
  body("username").trim().notEmpty(),
  body("password").trim().notEmpty().isLength({ min: 8 }),
  body("confirmPassword").custom((value, { req }) => {
    return value === req.body.password;
  }),
  body("email").notEmpty().isEmail(),
  validate,
  async (req, res) => {
    const { username, password, email } = req.body;
    if (await prisma.user.findFirst({ where: { username } })) {
      res.status(409).json({ errors: [{ msg: "Username is already taken." }] });
      return;
    }
    if (await prisma.user.findFirst({ where: { email } })) {
      res.status(409).json({ errors: [{ msg: "Email is already taken." }] });
      return;
    }
    const newUser = await prisma.user.create({
      data: { username, password, email },
    });
    res.json({ username, email });
  },
];
