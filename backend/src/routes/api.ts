import { Router } from "express";
import userRouter from "./users";

const apiRouter = Router();
apiRouter.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.sendStatus(401);
  }
});
apiRouter.use("/users", userRouter);

export default apiRouter;
