import { Route, Routes } from "react-router-dom";
import { Users } from "../users/Users";

export function AuthenticatedApp() {
  return (
  <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}
