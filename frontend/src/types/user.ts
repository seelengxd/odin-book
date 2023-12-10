export interface User {
  id: number;
  username: string;
  email: string;
}

export enum FriendStatus {
  friend = "friend",
  incoming = "incoming",
  pending = "pending",
  none = "none",
}
export interface UserWithFriendStatus extends User {
  friendStatus: FriendStatus;
}
