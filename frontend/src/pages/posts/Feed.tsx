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

function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    } else {
      setFiles([]);
    }
  };

  const loadPosts = () => {
    postsApi.getAllPosts().then((posts) => setPosts(posts));
  };

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: object({
      content: string().trim().required("Post content cannot be empty."),
    }),
    onSubmit: async (values) => {
      const content = values.content;
      postsApi
        .createPost(content, files)
        .then(() => loadPosts())
        .catch((err) => console.log({ err }));
    },
  });

  const { touched, errors, values, handleChange, handleBlur, handleSubmit } =
    formik;

  useEffect(loadPosts, []);

  return (
    <Box width={"80%"}>
      <Card p={2}>
        <form onSubmit={handleSubmit}>
          <Tabs>
            <TabList>
              <Tab>
                <Icon as={Edit} mr={2} />
                Create a Post
              </Tab>
              <Tab>
                <Icon as={PhotoAlbum} mr={2} /> Photo/Video Album
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl
                  isInvalid={touched.content && errors.content !== undefined}
                  onBlur={handleBlur}
                >
                  <Textarea
                    placeholder="What's on your mind?"
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.content}</FormErrorMessage>
                </FormControl>

                <Divider mt={2} mb={2} />
                <Button
                  leftIcon={<Icon as={Photo} color="green.200" />}
                  onClick={() => inputRef.current!.click()}
                >
                  Photo / Video{" "}
                  {files.length ? ` (${files.length} uploaded)` : ""}
                </Button>
                <input
                  id="fileid"
                  type="file"
                  hidden
                  ref={inputRef}
                  accept="video/*,image/*"
                  multiple
                  onChange={handleFileChange}
                />
                <Divider mt={2} mb={2} />
              </TabPanel>
              <TabPanel>{<Gallery files={files} />}</TabPanel>
            </TabPanels>
            <HStack justifyContent={"flex-end"}>
              <Button pl={8} pr={8} colorScheme="blue" type="submit">
                Post
              </Button>
            </HStack>
          </Tabs>
        </form>
      </Card>
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
              <Gallery files={post.files} />
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
}

export default Feed;
