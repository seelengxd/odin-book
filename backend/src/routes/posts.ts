import { Router } from "express";
import { create, index } from "../controllers/postController";
import likesRouter from "./likes";
import commentsRouter from "./comments";

const postRouter = Router();

postRouter.get("/", index);
postRouter.post("/", create);
postRouter.use("/:postId/likes", likesRouter);
postRouter.use("/:postId/comments", commentsRouter);

export default postRouter;
