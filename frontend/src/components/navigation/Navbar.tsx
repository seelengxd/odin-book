import {
  Flex,
  HStack,
  Icon,
  Link as ChakraLink,
  Spacer,
  Text,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser, setUser } from "../../reducers/authSlice";
import { authApi } from "../../api/auth";
import { useEffect } from "react";
import { userApi } from "../../api/users";
import NotificationCount from "../notification/NotificationCount";
import { selectIncomingRequestCount, setUsers } from "../../reducers/userSlice";
import { DarkMode, LightMode } from "@mui/icons-material";

function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const incoming = useSelector(selectIncomingRequestCount);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (user) {
      userApi.getUsers().then((users) => dispatch(setUsers(users)));
    }
  }, [user, dispatch]);

  const navBarColor = useColorModeValue("blue.300", "blue.600");
  return (
    <Flex width={"100%"} p={4} backgroundColor={navBarColor}>
      <HStack>
        <Icon as={MenuBookIcon} boxSize={"1em"} />
        <ChakraLink as={Link} to="/">
          <Text fontSize="lg" fontWeight={"bold"}>
            OdinBook
          </Text>
        </ChakraLink>
      </HStack>
      <Spacer />
      {user && (
        <>
          <HStack spacing={8}>
            <ChakraLink as={Link} to="/">
              <Button variant={"ghost"}>
                <Text fontSize="lg" fontWeight={"bold"}>
                  Home
                </Text>
              </Button>
            </ChakraLink>
            <ChakraLink as={Link} to="/users">
              <Button variant={"ghost"}>
                <Text fontSize="lg" fontWeight={"bold"}>
                  Users
                </Text>
                {incoming > 0 && <NotificationCount count={incoming} />}
              </Button>
            </ChakraLink>
          </HStack>
          <Spacer />
          <HStack>
            <Text fontSize="lg" fontWeight={"bold"}>
              {user.username}
            </Text>
            <IconButton
              icon={colorMode === "light" ? <LightMode /> : <DarkMode />}
              onClick={toggleColorMode}
              aria-label="change theme"
            ></IconButton>
            <Button
              onClick={() =>
                authApi
                  .logOut()
                  .then(() => dispatch(setUser(null)))
                  .then(() => navigate("/"))
              }
            >
              Log Out
            </Button>
          </HStack>
        </>
      )}
    </Flex>
  );
}

export default Navbar;
