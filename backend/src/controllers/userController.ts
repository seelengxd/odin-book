import { RequestHandler } from "express";
import prisma from "../lib/db";
import {
  attachFriendStatus,
  getFriendsAndRequestsIds,
  removePassword,
} from "../utils/user";
import { body } from "express-validator";
import { checkUserExists, validate } from "../middleware/validator";
import { FriendRequestStatus } from "@prisma/client";

export const index: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany({
    where: { id: { not: req.user!.id } },
  });

  const usersWithFriendStatus = await attachFriendStatus(req.user!.id, users);
  res.json({ users: usersWithFriendStatus.map(removePassword) });
};

// POST friend-requests/:id
export const createFriendRequest: RequestHandler[] = checkUserExists.concat([
  async (req, res) => {
    const user = req.user!;
    const otherUserId = parseInt(req.params.otherUserId);
    // Check for pending friend requests from either side or already friends. If yes, 409
    const friendStatusIds = Object.values(
      await getFriendsAndRequestsIds(user.id)
    );
    if (friendStatusIds.some((ids) => ids.includes(otherUserId))) {
      res.sendStatus(409);
      return;
    }
    await prisma.friendRequest.create({
      data: {
        requestedById: user.id,
        requestingId: otherUserId,
      },
    });
    res.sendStatus(200);
  },
]);

// PUT friend-requests/:id
export const handleFriendRequest: RequestHandler[] = checkUserExists.concat([
  body("value").isIn(["accept", "reject"]),
  validate,
  async (req, res) => {
    const user = req.user!;
    const otherUserId = parseInt(req.params.otherUserId);

    // Find pending friend request
    const friendRequest = await prisma.friendRequest.findFirst({
      where: {
        requestedById: otherUserId,
        requestingId: user.id,
        status: FriendRequestStatus.PENDING,
      },
    });

    if (!friendRequest) {
      res.sendStatus(404);
      return;
    }

    const value: "accept" | "reject" = req.body.value;

    await prisma.friendRequest.update({
      where: {
        id: friendRequest.id,
      },
      data: {
        status:
          value === "accept"
            ? FriendRequestStatus.ACCEPTED
            : FriendRequestStatus.REJECTED,
      },
    });

    if (value === "accept") {
      await prisma.user.update({
        where: { id: user.id },
        data: { friends: { connect: { id: otherUserId } } },
      });
      await prisma.user.update({
        where: { id: otherUserId },
        data: { friends: { connect: { id: user.id } } },
      });
    }

    res.sendStatus(200);
  },
]);

// DELETE friend/:id
export const deleteFriend: RequestHandler = async (req, res) => {};
