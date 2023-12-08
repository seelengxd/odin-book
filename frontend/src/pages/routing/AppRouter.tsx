import { BrowserRouter } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import Navbar from "../../components/navigation/Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import { UnauthenticatedApp } from "./UnauthenticatedApp";
import { AuthenticatedApp } from "./AuthenticatedApp";

function AppRouter() {
  const user = useSelector(selectUser);
  const isLoggedIn = user !== null;
  return (
    <BrowserRouter>
      <VStack width={"100%"}>
        <Navbar />
        {isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </VStack>
    </BrowserRouter>
  );
}

export default AppRouter;
