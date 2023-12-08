import { Route, Routes } from "react-router-dom";
import LogIn from "../auth/LogIn";
import SignUp from "../auth/SignUp";

export function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
