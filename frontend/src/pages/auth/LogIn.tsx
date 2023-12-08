import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { object, string } from "yup";
import { Link } from "react-router-dom";

const logInSchema = object({
  username: string().trim().required("Username cannot be empty."),
  password: string()
    .required("Password cannot be empty.")
    .min(8, "Password must be at least 8 characters long"),
});

function LogIn() {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: logInSchema,
    onSubmit: async (values) => {
      console.log({ values });
    },
  });
  const { touched, errors, values, handleChange, handleBlur, handleSubmit } =
    formik;
  return (
    <Center width={"60%"}>
      <Box width={"100%"}>
        <form onSubmit={handleSubmit}>
          <VStack m={2} spacing={2}>
            <Icon as={MenuBookIcon} boxSize={"2em"} />
            <Text fontSize={"2xl"}>OdinBook</Text>
            <FormControl
              isInvalid={touched.username && errors.username !== undefined}
              onBlur={handleBlur}
            >
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={touched.password && errors.password !== undefined}
              onBlur={handleBlur}
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Button type={"submit"}>Log In</Button>
            <Text>
              or{" "}
              <ChakraLink as={Link} to={"/signup"}>
                sign up
              </ChakraLink>
            </Text>
          </VStack>
        </form>
      </Box>
    </Center>
  );
}

export default LogIn;
