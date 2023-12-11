import { Route, Routes } from "react-router-dom";
import { Users } from "../users/Users";
import Feed from "../posts/Feed";

export function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}
