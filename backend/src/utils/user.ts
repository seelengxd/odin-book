import { FriendRequestStatus, User } from "@prisma/client";
import prisma from "../lib/db";

export function removePassword(user: User) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
export async function getFriendsAndRequestsIds(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      friends: {},
    },
  });

  return {
    friends: user!.friends.map((friend) => friend.id),
    requestedBy: (
      await prisma.friendRequest.findMany({
        where: {
          requestingId: userId,
          status: FriendRequestStatus.PENDING,
        },
      })
    ).map((friendRequest) => friendRequest.requestedById),
    requesting: (
      await prisma.friendRequest.findMany({
        where: {
          requestedById: userId,
          status: FriendRequestStatus.PENDING,
        },
      })
    ).map((requesting) => requesting.requestingId),
  };
}

export async function attachFriendStatus(userId: number, otherUsers: User[]) {
  const friendStatusIds = await getFriendsAndRequestsIds(userId);
  return otherUsers.map((otherUser) => {
    const otherUserId = otherUser.id;
    let status;
    if (friendStatusIds.friends?.includes(otherUserId)) {
      status = "friend";
    } else if (friendStatusIds.requestedBy.includes(otherUserId)) {
      status = "incoming";
    } else if (friendStatusIds.requesting?.includes(otherUserId)) {
      status = "pending";
    } else {
      status = "none";
    }
    const otherUserWithFriendStatus = { ...otherUser, friendStatus: status };
    return otherUserWithFriendStatus;
  });
}
