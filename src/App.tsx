import { Box, Flex } from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import { DatePickerInput } from "./DatePicker";

export function App() {
  const [value, setValue] = useState<Date>();

  return (
    <Box p={8}>
      <Flex alignItems="center" gap={2}>
        <Box color="gray.500" fontSize="sm">
          Selected
        </Box>
        <Box color="gray.600" fontWeight="medium">
          {value ? format(value, "dd MMM yyyy") : "NA"}
        </Box>
      </Flex>

      <Box mt={6}>
        <DatePickerInput
          value={value}
          onChange={setValue}
          placeholder="Choose date"
        />
      </Box>
    </Box>
  );
}
