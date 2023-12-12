import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Post } from "../../types/post";
import Gallery from "../../components/posts/Gallery";
import { CommentSharp, ThumbUpSharp } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";

interface Props {
  post: Post;
  handleLike: () => Promise<void>;
}
function PostCard({ post, handleLike }: Props) {
  const currentUser = useSelector(selectUser);
  const isLiked = post.likes
    .map((likes) => likes.user)
    .some((user) => user.id === currentUser!.id);

  const likeCount = post.likes.length;
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

        <Text fontSize={"sm"}>
          Liked by{" "}
          <Tooltip
            label={post.likes.map((likes) => likes.user.username).join(", ")}
            hasArrow
            isDisabled={likeCount === 0}
          >
            <span>
              {likeCount} {likeCount === 1 ? "person" : "people"}
            </span>
          </Tooltip>
          . {post.comments.length} comments.
        </Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack>
          {isLiked ? (
            <Button
              aria-label="like"
              leftIcon={<Icon as={ThumbUpSharp} color="blue.200" />}
              onClick={handleLike}
            >
              Liked
            </Button>
          ) : (
            <Button
              aria-label="like"
              leftIcon={<ThumbUpSharp />}
              onClick={handleLike}
            >
              Like
            </Button>
          )}

          <Button aria-label="comment" leftIcon={<CommentSharp />}>
            Comment
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
