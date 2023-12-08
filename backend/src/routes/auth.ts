import { Router } from "express";
import { logIn, signUp } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/logIn", logIn);
authRouter.post("/signUp", signUp);

export default authRouter;
