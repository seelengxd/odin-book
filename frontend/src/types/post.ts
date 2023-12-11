import { User } from "./user";

export interface File {
  id: number;
  name: string;
  url: string;
  postId: number;
}

export interface Post {
  id: number;
  content: string;
  author: User;
  files: File[];
  createdAt: string;
}
