import { RequestHandler } from "express";
import { body } from "express-validator";
import multer from "multer";
import prisma from "../lib/db";
import { validate } from "../middleware/validator";
import { getFriendsAndRequestsIds } from "../utils/user";

const upload = multer({ dest: "uploads/" });

export const create: RequestHandler[] = [
  upload.array("files"),
  body("content").notEmpty(),
  validate,
  async (req, res, next) => {
    const content = req.body.content;
    if (!req.files) {
      req.files = [];
    }
    const files = Array.from(req.files as unknown as Express.Multer.File[]);
    await prisma.post.create({
      data: {
        content,
        authorId: req.user!.id,
        files: {
          createMany: {
            data: files.map((file) => {
              return {
                name: file.originalname,
                url: file.path,
              };
            }),
          },
        },
      },
    });
    res.sendStatus(200);
  },
];

export const index: RequestHandler = async (req, res) => {
  const user = req.user!;
  const relevantUserIds = (await getFriendsAndRequestsIds(user!.id)).friends;
  relevantUserIds.push(user.id!);
  const posts = await prisma.post.findMany({
    where: { authorId: { in: relevantUserIds } },
    select: {
      id: true,
      content: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      createdAt: true,
      files: true,
      likes: {
        select: {
          id: true,
          user: true,
        },
      },
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.json({ posts });
};
