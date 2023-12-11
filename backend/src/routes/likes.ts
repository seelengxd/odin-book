import { Router } from "express";
import { create, destroy } from "../controllers/likeController";

const likesRouter = Router();

likesRouter.post("/", create);
likesRouter.delete("/", destroy);

export default likesRouter;
