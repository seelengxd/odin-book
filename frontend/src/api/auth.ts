import { LogInPostData, SignUpPostData } from "../types/auth";
import { User } from "../types/user";
import client from "./base";

class AuthAPI {
  public async logIn(logInData: LogInPostData): Promise<User> {
    const response = await client.post("/logIn", logInData);
    const user = response.data.user as User;
    return user;
  }

  public async signUp(signUpData: SignUpPostData) {
    return await client.post("/signUp", signUpData);
  }

  public async logOut() {
    return await client.post("/logOut");
  }

  public async getCurrentUser(): Promise<User> {
    const response = await client.get("/currentUser");
    const user = response.data.user as User;
    return user;
  }
}

export const authApi = new AuthAPI();
