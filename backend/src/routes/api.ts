import { Router } from "express";
import userRouter from "./users";
import postRouter from "./posts";

const apiRouter = Router();
apiRouter.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.sendStatus(401);
  }
});
apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);

export default apiRouter;
