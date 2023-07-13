import { chakra } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { format, isSameDay } from "date-fns";
import { v4 as uuid } from "uuid";
import { useDatePickerContext } from "./DatePickerContext";
import { DAYS } from "./constants";

export function DatePicker() {
  const datepicker = useDatePickerContext();

  return (
    <chakra.div
      w="fit-content"
      rounded="lg"
      border="1px"
      borderColor="gray.200"
    >
      <chakra.div p={4} display="flex" gap={2}>
        <chakra.div
          h={10}
          px={4}
          display="flex"
          alignItems="center"
          flexGrow={1}
          border="1px"
          borderColor="gray.200"
          rounded="md"
        >
          {datepicker.selected
            ? format(datepicker.selected, "dd MMM yyyy")
            : ""}
        </chakra.div>
        <chakra.button
          type="button"
          h={10}
          px={4}
          border="1px"
          borderColor="gray.200"
          rounded="md"
          onClick={datepicker.today}
        >
          Today
        </chakra.button>
      </chakra.div>

      <chakra.div
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={4}
      >
        <chakra.button
          type="button"
          p={2}
          bg="gray.100"
          rounded="full"
          onClick={datepicker.prev}
        >
          <chakra.svg as={ChevronLeftIcon} w={5} h={5} />
        </chakra.button>
        <chakra.div>{format(datepicker.baseDate, "MMM yyyy")}</chakra.div>
        <chakra.button
          type="button"
          p={2}
          bg="gray.100"
          rounded="full"
          onClick={datepicker.next}
        >
          <chakra.svg as={ChevronRightIcon} w={5} h={5} />
        </chakra.button>
      </chakra.div>

      <chakra.div px={4}>
        <chakra.table>
          <chakra.thead>
            <chakra.tr>
              {DAYS.map((day) => (
                <chakra.td key={day}>
                  <chakra.div
                    w={10}
                    h={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    {day.substring(0, 2)}
                  </chakra.div>
                </chakra.td>
              ))}
            </chakra.tr>
          </chakra.thead>

          <chakra.tbody>
            {datepicker.calendar.map((array) => (
              <chakra.tr key={uuid()}>
                {array.map((obj) => {
                  const isSelected =
                    datepicker.selected &&
                    isSameDay(obj.value, datepicker.selected);

                  return (
                    <chakra.td key={uuid()}>
                      <chakra.button
                        type="button"
                        onClick={() => {
                          datepicker.setSelected(obj.value);
                        }}
                        data-selected={truthyOrUndef(isSelected)}
                        data-placeholder={truthyOrUndef(obj.isPlaceholder)}
                        data-today={truthyOrUndef(obj.isToday)}
                        sx={{
                          h: 10,
                          w: 10,
                          rounded: "full",
                          fontSize: "sm",
                          _selected: {
                            "&:not([data-placeholder])": {
                              bg: "blue.300",
                              color: "white",
                              fontWeight: "bold",
                            },
                          },
                          "&[data-placeholder]": {
                            color: "gray.500",
                            _selected: {
                              textDecoration: "line-through",
                            },
                          },
                          "&[data-today]": {
                            bg: "gray.100",
                          },
                        }}
                      >
                        {obj.value.getDate()}
                      </chakra.button>
                    </chakra.td>
                  );
                })}
              </chakra.tr>
            ))}
          </chakra.tbody>
        </chakra.table>
      </chakra.div>

      <chakra.div p={4} display="flex" gap={2} justifyContent="flex-end">
        <chakra.button
          type="button"
          w="full"
          p={2}
          border="1px"
          borderColor="gray.200"
          rounded="md"
          onClick={datepicker.cancel}
        >
          Cancel
        </chakra.button>
        <chakra.button
          type="button"
          w="full"
          p={2}
          border="1px"
          borderColor="gray.200"
          rounded="md"
          onClick={datepicker.apply}
        >
          Apply
        </chakra.button>
      </chakra.div>
    </chakra.div>
  );
}

export function truthyOrUndef<T>(value: T) {
  return !value ? undefined : value;
}
