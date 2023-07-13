import "./App.css";
import { Flex } from "@chakra-ui/react";
import { DatePickerInput } from "./Components/DatePickerInput";
import React from "react";
import { Nullable } from "./types";

function App() {
  const [date, setDate] = React.useState<Nullable<Date>>();

  function onChange(value: Nullable<Date>) {
    setDate(value);
  }

  return (
    <Flex w="full" h="100vh" justify="center">
      <DatePickerInput
        placeholder="Select Date"
        value={date}
        label="Date"
        onChange={onChange}
      />
    </Flex>
  );
}

export default App;
