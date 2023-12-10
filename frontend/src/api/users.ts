import { UserWithFriendStatus } from "../types/user";
import client from "./base";

class UserAPI {
  protected getUserUrl() {
    return "/api/users/";
  }
  public async getUsers(): Promise<UserWithFriendStatus[]> {
    const response = await client.get(this.getUserUrl());
    return response.data.users;
  }
  public async sendFriendRequest(otherUserId: number) {
    const response = await client.post(
      this.getUserUrl() + "friend-requests/" + otherUserId
    );
    return response;
  }
  public async handleFriendRequest(otherUserId: number, accept: boolean) {
    const response = await client.put(
      this.getUserUrl() + "friend-requests/" + otherUserId,
      {
        value: accept ? "accept" : "reject",
      }
    );
    return response;
  }
}

export const userApi = new UserAPI();
