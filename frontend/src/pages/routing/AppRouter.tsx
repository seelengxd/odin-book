import { BrowserRouter } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import Navbar from "../../components/navigation/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../reducers/authSlice";
import { UnauthenticatedApp } from "./UnauthenticatedApp";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { useEffect } from "react";
import { authApi } from "../../api/auth";

function AppRouter() {
  const user = useSelector(selectUser);
  const isLoggedIn = user !== null;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn) {
      authApi
        .getCurrentUser()
        .then((user) => dispatch(setUser(user)))
        .catch((err) => {});
    }
  }, [dispatch, isLoggedIn]);
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
