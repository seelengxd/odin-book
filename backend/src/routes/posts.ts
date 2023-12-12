import { Router } from "express";
import { create, index } from "../controllers/postController";
import likesRouter from "./likes";
import commentsRouter from "./comments";

const postRouter = Router({ mergeParams: true });

postRouter.use((req, res, next) => {
  console.log(req.params);
  next();
});
postRouter.use("/:postId/likes", likesRouter);
postRouter.use("/:postId/comments", commentsRouter);
postRouter.get("/", index);
postRouter.post("/", create);

export default postRouter;
