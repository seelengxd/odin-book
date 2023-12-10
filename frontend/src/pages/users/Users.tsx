import {
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { userApi } from "../../api/users";
import { UserWithFriendStatus } from "../../types/user";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Add } from "@mui/icons-material";
import UserList from "./UserList";

export function Users() {
  const [users, setUsers] = useState<UserWithFriendStatus[]>([]);
  const loadUsers = () => {
    userApi.getUsers().then((users) => setUsers(users));
  };
  const sendFriendRequest = async (otherUserId: number) => {
    await userApi.sendFriendRequest(otherUserId);
    await loadUsers();
  };
  const handleFriendRequest = async (otherUserId: number, accept: boolean) => {
    await userApi.handleFriendRequest(otherUserId, accept);
    await loadUsers();
  };
  console.log({ users });
  useEffect(loadUsers, []);
  return (
    <Box width={"80%"}>
      <Heading mb={2}>
        <Icon as={MenuBookIcon} boxSize={"1.2em"} mr={2} />
        Users
      </Heading>
      <Tabs>
        <TabList>
          <Tab>All Users</Tab>
          <Tab>Friends</Tab>
          <Tab>Pending Friend Requests</Tab>
          <Tab>Incoming Friend Requests</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserList
              users={users}
              sendFriendRequest={sendFriendRequest}
              handleFriendRequest={handleFriendRequest}
            />
          </TabPanel>
          <TabPanel>
            <UserList
              users={users.filter((user) => user.friendStatus === "friend")}
              sendFriendRequest={sendFriendRequest}
              handleFriendRequest={handleFriendRequest}
            />
          </TabPanel>
          <TabPanel>
            <UserList
              users={users.filter((user) => user.friendStatus === "pending")}
              sendFriendRequest={sendFriendRequest}
              handleFriendRequest={handleFriendRequest}
            />
          </TabPanel>
          <TabPanel>
            <UserList
              users={users.filter((user) => user.friendStatus === "incoming")}
              sendFriendRequest={sendFriendRequest}
              handleFriendRequest={handleFriendRequest}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
