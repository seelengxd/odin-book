import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "../auth/LogIn";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
