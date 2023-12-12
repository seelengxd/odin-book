import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Post } from "../../types/post";
import Gallery from "../../components/posts/Gallery";

interface Props {
  post: Post;
}
function PostCard({ post }: Props) {
  return (
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
  );
}

export default PostCard;
