import { Flex, Spacer, Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex width={"100%"} p={4} backgroundColor={"orange.200"}>
      <Text fontSize="lg" fontWeight={"bold"}>
        OdinBook
      </Text>
      <Spacer />
    </Flex>
  );
}

export default Navbar;
