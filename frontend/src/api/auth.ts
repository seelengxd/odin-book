import { LogInPostData, SignUpPostData } from "../types/auth";
import { User } from "../types/user";
import client from "./base";

class AuthAPI {
  public async logIn(logInData: LogInPostData): Promise<User> {
    const response = await client.post("/log-in", logInData);
    const user = response.data.user as User;
    return user;
  }

  public async signUp(signUpData: SignUpPostData) {
    return await client.post("/sign-up", signUpData);
  }

  public async logOut() {
    return await client.post("/log-out");
  }

  public async getCurrentUser(): Promise<User> {
    const response = await client.get("/current-user");
    const user = response.data.user as User;
    return user;
  }
}

export const authApi = new AuthAPI();
