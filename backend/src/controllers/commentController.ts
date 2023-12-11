import { RequestHandler } from "express";
import { checkPostExists, validate } from "../middleware/validator";
import { body } from "express-validator";
import prisma from "../lib/db";

// POST /posts/:postId/comments
export const create: RequestHandler[] = checkPostExists.concat([
  body("content").notEmpty(),
  validate,
  async (req, res) => {
    const content: string = req.body.content;
    const postId = parseInt(req.params.postId);
    const userId = req.user!.id;
    await prisma.comment.create({
      data: {
        content,
        userId,
        postId,
      },
    });
    res.sendStatus(200);
  },
]);
