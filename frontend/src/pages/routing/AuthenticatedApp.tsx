import { Route, Routes } from "react-router-dom";
import LogIn from "../auth/LogIn";
import SignUp from "../auth/SignUp";

export function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
    </Routes>
  );
}
