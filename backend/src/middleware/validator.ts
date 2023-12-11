import { NextFunction, Request, RequestHandler, Response } from "express";
import { matchedData, param, validationResult } from "express-validator";
import prisma from "../lib/db";

export const validate = <T extends Record<string, any>>(
  req: Request<T>,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  next();
};

export const checkUserExists: RequestHandler[] = [
  param("otherUserId").isInt(),
  validate,
  async (req, res, next) => {
    const otherUserId = req.params.otherUserId;
    const otherUser = await prisma.user.findUnique({
      where: { id: parseInt(otherUserId) },
    });
    if (!otherUser) {
      res.status(400).json({
        errors: [{ msg: `User with id ${otherUserId} does not exist.` }],
      });
      return;
    }
    next();
  },
];

export const checkPostExists: RequestHandler[] = [
  param("postId").isInt().toInt(),
  validate,
  async (req, res, next) => {
    const postId: number = matchedData(req).postId;
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      res
        .status(404)
        .json({ errors: [{ msg: `Post with id ${postId} does not exist.` }] });
      return;
    }
    next();
  },
];
