import { Router } from "express";
import {
  getUser,
  logIn,
  logInGoogle,
  logOut,
  signUp,
} from "../controllers/authController";
import passport from "passport";

const authRouter = Router();

authRouter.get("/log-in/google", passport.authenticate("google"));
authRouter.get("/oauth2/redirect", logInGoogle);
authRouter.post("/log-in", logIn);
authRouter.post("/sign-up", signUp);
authRouter.get("/current-user", getUser);
authRouter.post("/log-out", logOut);

export default authRouter;
