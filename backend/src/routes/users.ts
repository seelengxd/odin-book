import { Router } from "express";
import {
  createFriendRequest,
  deleteFriend,
  handleFriendRequest,
  index,
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", index);
userRouter.post("/friend-requests/:otherUserId", createFriendRequest);
userRouter.put("/friend-requests/:otherUserId", handleFriendRequest);
userRouter.delete("/friends/:otherUserId", deleteFriend);

export default userRouter;
