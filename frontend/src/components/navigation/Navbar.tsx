import {
  Flex,
  HStack,
  Icon,
  Link as ChakraLink,
  Spacer,
  Text,
  Button,
} from "@chakra-ui/react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser, setUser } from "../../reducers/authSlice";
import { authApi } from "../../api/auth";

function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <Flex width={"100%"} p={4} backgroundColor={"orange.500"}>
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
        <HStack>
          <Button
            onClick={() => authApi.logOut().then(() => dispatch(setUser(null)))}
          >
            Log Out
          </Button>
          <Text fontSize="lg" fontWeight={"bold"}>
            {user.username}
          </Text>
        </HStack>
      )}
    </Flex>
  );
}

export default Navbar;
