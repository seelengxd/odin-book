import { Router } from "express";
import { create, index } from "../controllers/postController";

const postRouter = Router();

postRouter.get("/", index);
postRouter.post("/", create);

export default postRouter;
