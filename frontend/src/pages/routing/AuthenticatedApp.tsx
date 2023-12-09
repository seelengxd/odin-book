import { Route, Routes } from "react-router-dom";

export function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
    </Routes>
  );
}
