import {
  Button,
  Card,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { Edit, Photo, PhotoAlbum } from "@mui/icons-material";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { object, string } from "yup";
import Gallery from "../../components/posts/Gallery";

interface Props {
  handleCreatePost: (content: string, files: File[]) => void;
}

function CreatePost({ handleCreatePost }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    } else {
      setFiles([]);
    }
  };

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: object({
      content: string().trim().required("Post content cannot be empty."),
    }),
    onSubmit: async (values) => {
      const content = values.content;
      handleCreatePost(content, files);
    },
  });

  const { touched, errors, values, handleChange, handleBlur, handleSubmit } =
    formik;

  const iconColor = useColorModeValue("green.600", "green.200");

  return (
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
                leftIcon={<Icon as={Photo} color={iconColor} />}
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
  );
}

export default CreatePost;
