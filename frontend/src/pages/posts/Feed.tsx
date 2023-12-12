import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import postsApi from "../../api/posts";
import { Post } from "../../types/post";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import likeApi from "../../api/likes";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";

function Feed() {
  const currentUser = useSelector(selectUser)!;
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

  const handleLike = (post: Post) => async () => {
    const isLiked = post.likes
      .map((likes) => likes.user)
      .some((user) => user.id === currentUser!.id);
    if (isLiked) {
      await likeApi.deleteLike(post.id);
    } else {
      await likeApi.createLike(post.id);
    }
    loadPosts();
  };

  useEffect(loadPosts, []);

  return (
    <Box width={"80%"}>
      <CreatePost handleCreatePost={handleCreatePost} />
      <VStack align={"stretch"} mt={2}>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} handleLike={handleLike(post)} />
        ))}
      </VStack>
    </Box>
  );
}

export default Feed;
