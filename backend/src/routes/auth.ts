import { Router } from "express";
import { getUser, logIn, logOut, signUp } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/logIn", logIn);
authRouter.post("/signUp", signUp);
authRouter.get("/currentUser", getUser);
authRouter.post("/logOut", logOut);

export default authRouter;
