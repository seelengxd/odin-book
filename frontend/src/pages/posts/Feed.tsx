import {
  Box,
  Button,
  Card,
  Divider,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@chakra-ui/react";
import { Edit, Photo, PhotoAlbum } from "@mui/icons-material";
import { useRef, useState } from "react";
import Gallery from "../../components/posts/Gallery";

function Feed() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    } else {
      setFiles([]);
    }
  };

  console.log(files);
  return (
    <Box width={"80%"}>
      <Card p={2}>
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
              <form>
                <Textarea placeholder="What's on your mind?" />
                <Divider mt={2} mb={2} />
                <Button
                  leftIcon={<Icon as={Photo} color="green.200" />}
                  onClick={() => inputRef.current!.click()}
                >
                  Photo / Video {files.length && ` (${files.length} uploaded)`}
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
              </form>
            </TabPanel>
            <TabPanel>{<Gallery files={files} />}</TabPanel>
          </TabPanels>
          <HStack justifyContent={"flex-end"}>
            <Button pl={8} pr={8} colorScheme="blue">
              Post
            </Button>
          </HStack>
        </Tabs>
      </Card>
    </Box>
  );
}

export default Feed;
