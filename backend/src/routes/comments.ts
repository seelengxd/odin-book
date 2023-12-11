import { Router } from "express";
import { create } from "../controllers/commentController";

const commentsRouter = Router();

commentsRouter.post("/", create);

export default commentsRouter;
