import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./pages/routing/AppRouter";
import { Provider } from "react-redux";
import { store } from "./reducers/store";

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
