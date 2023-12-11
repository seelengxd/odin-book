import { RequestHandler } from "express";
import { checkPostExists } from "../middleware/validator";
import prisma from "../lib/db";

// POST /posts/:postId/likes
export const create: RequestHandler[] = checkPostExists.concat([
  async (req, res) => {
    const userId = req.user!.id;
    const postId = parseInt(req.params.postId);
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (existingLike) {
      res.sendStatus(409);
      return;
    }
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
    res.sendStatus(200);
  },
]);

// DELETE /posts/:postId/likes
export const destroy: RequestHandler[] = checkPostExists.concat([
  async (req, res) => {
    const userId = req.user!.id;
    const postId = parseInt(req.params.postId);
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (!existingLike) {
      res.sendStatus(404);
      return;
    }
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    res.sendStatus(200);
  },
]);
