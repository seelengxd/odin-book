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

const signUpSchema = object({
  username: string().trim().required("Username cannot be empty."),
  email: string().email("Email is invalid.").required("Email cannot be empty."),
  password: string()
    .required("Password cannot be empty.")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: string().test({
    name: "samePassword",
    message: "Password does not match.",
    test: function (value) {
      return value === this.parent.password;
    },
  }),
});

function SignUp() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: signUpSchema,
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
              isInvalid={touched.email && errors.email !== undefined}
              onBlur={handleBlur}
            >
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
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
            <FormControl
              isInvalid={
                touched.confirmPassword && errors.confirmPassword !== undefined
              }
              onBlur={handleBlur}
            >
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>

            <Button type="submit">Sign Up</Button>
            <Text>
              or{" "}
              <ChakraLink as={Link} to={"/"}>
                log in
              </ChakraLink>
            </Text>
          </VStack>
        </form>
      </Box>
    </Center>
  );
}

export default SignUp;
