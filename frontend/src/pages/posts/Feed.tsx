import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Edit, Photo, PhotoAlbum } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import Gallery from "../../components/posts/Gallery";
import { useFormik } from "formik";
import { object, string } from "yup";
import postsApi from "../../api/posts";
import { Post } from "../../types/post";
import CreatePost from "./CreatePost";

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
          <Card>
            <CardHeader>
              <Box>
                <Heading size="sm">{post.author.username}</Heading>
                <Text>{new Date(post.createdAt).toDateString()}</Text>
              </Box>
            </CardHeader>
            <CardBody>
              <Text>{post.content}</Text>
              <Gallery files={post.files} hideIfEmpty={true} />
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
}

export default Feed;
