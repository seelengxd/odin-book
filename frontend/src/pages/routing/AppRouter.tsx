import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "../auth/LogIn";
import SignUp from "../auth/SignUp";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
