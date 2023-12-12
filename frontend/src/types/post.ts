import { User } from "./user";

export interface File {
  id: number;
  name: string;
  url: string;
  postId: number;
}

export interface Like {
  id: number;
  user: User;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
}

export interface Post {
  id: number;
  content: string;
  author: User;
  files: File[];
  createdAt: string;
  likes: Like[];
  comments: Comment[];
}
