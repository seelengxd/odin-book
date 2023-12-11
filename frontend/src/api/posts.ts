import { Post } from "../types/post";
import client from "./base";

class PostsAPI {
  protected getPostUrl() {
    return "/api/posts";
  }

  public async createPost(content: string, files: File[]) {
    const formData = new FormData();
    formData.append("content", content);
    files.forEach((file) => formData.append("files", file));
    const response = await client.post(this.getPostUrl(), formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    return response;
  }

  public async getAllPosts(): Promise<Post[]> {
    const response = await client.get(this.getPostUrl());
    return response.data.posts;
  }
}

const postsApi = new PostsAPI();

export default postsApi;
