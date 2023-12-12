import { Badge } from "@chakra-ui/react";

interface Props {
  count: number;
}

function NotificationCount({ count }: Props) {
  return (
    <Badge
      colorScheme="red"
      pos="absolute"
      variant="solid"
      bgColor="red.500"
      right={-1}
      top={-1}
      width={6}
      height={6}
      borderRadius={"full"}
      borderColor={"white"}
      borderWidth={"1px"}
      p={"4px"}
      fontSize={"0.8rem"}
    >
      {count}
    </Badge>
  );
}

export default NotificationCount;
