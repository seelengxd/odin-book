import { Flex, Spacer, Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex width={"100%"} p={4} backgroundColor={"gray.700"}>
      <Text fontSize="lg" fontWeight={"bold"}>
        OdinBook
      </Text>
      <Spacer />
    </Flex>
  );
}

export default Navbar;
