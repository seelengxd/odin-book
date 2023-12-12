import {
  Box,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { userApi } from "../../api/users";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, setUsers } from "../../reducers/userSlice";

export function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loadUsers = () => {
    userApi.getUsers().then((users) => dispatch(setUsers(users)));
  };
  const sendFriendRequest = async (otherUserId: number) => {
    await userApi.sendFriendRequest(otherUserId);
    await loadUsers();
  };
  const handleFriendRequest = async (otherUserId: number, accept: boolean) => {
    await userApi.handleFriendRequest(otherUserId, accept);
    await loadUsers();
  };
  useEffect(loadUsers, [dispatch]);
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
