import { Button, Card, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { UserWithFriendStatus } from "../../types/user";
import { Add } from "@mui/icons-material";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface Props {
  users: UserWithFriendStatus[];
  sendFriendRequest: (otherUserId: number) => {};
  handleFriendRequest: (otherUserId: number, accept: boolean) => {};
}

function UserList({ users, sendFriendRequest, handleFriendRequest }: Props) {
  return (
    <VStack align={"stretch"}>
      {users.map((user, index) => (
        <Card key={user.id} p={2} pl={4}>
          <HStack justify={"space-between"}>
            <Text>
              {index + 1}. {user.username}
            </Text>
            {user.friendStatus === "none" && (
              <Button onClick={() => sendFriendRequest(user.id)}>
                <Icon as={Add} boxSize={6} />
                Add Friend
              </Button>
            )}
            {user.friendStatus === "pending" && (
              <Text color="grey" p={2}>
                Pending Friend Request
              </Text>
            )}
            {user.friendStatus === "incoming" && (
              <HStack>
                <Button onClick={() => handleFriendRequest(user.id, true)}>
                  <CheckIcon boxSize={4} mr={2} />
                  Accept Request
                </Button>
                <Button onClick={() => handleFriendRequest(user.id, false)}>
                  <CloseIcon boxSize={4} mr={2} />
                  Reject Request
                </Button>
              </HStack>
            )}
            {user.friendStatus === "friend" && (
              <Text color="grey" p={2}>
                Friend
              </Text>
            )}
          </HStack>
        </Card>
      ))}
    </VStack>
  );
}

export default UserList;
