import "./App.css";
import { Flex } from "@chakra-ui/react";
import { DatePickerInput } from "./Components/DatePickerInput";

function App() {
  return (
    <Flex w="full" h="100vh" justify="center">
      <DatePickerInput />
    </Flex>
  );
}

export default App;
