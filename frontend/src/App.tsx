import React from "react";
import "./App.css";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import Navbar from "./components/navigation/Navbar";
import AppRouter from "./pages/routing/AppRouter";

function App() {
  return (
    <ChakraProvider>
      <VStack width={"100%"}>
        <Navbar />
        <AppRouter />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
