import React from "react";
import AppRouter from "./pages/routing/AppRouter";
import { Provider } from "react-redux";
import { store } from "./reducers/store";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
