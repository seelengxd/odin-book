import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import postsApi from "../../api/posts";
import { Post } from "../../types/post";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = () => {
    postsApi.getAllPosts().then((posts) => setPosts(posts));
  };

  const handleCreatePost = (content: string, files: File[]) => {
    postsApi
      .createPost(content, files)
      .then(() => loadPosts())
      .catch((err) => console.log({ err }));
  };

  useEffect(loadPosts, []);

  return (
    <Box width={"80%"}>
      <CreatePost handleCreatePost={handleCreatePost} />
      <VStack align={"stretch"} mt={2}>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </VStack>
    </Box>
  );
}

export default Feed;
