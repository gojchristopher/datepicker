import {
  chakra,
  omitThemingProps,
  ThemingProps,
  useControllableState,
} from "@chakra-ui/react";
import { addMonths, format, isEqual, subMonths } from "date-fns";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { CalendarContainer, CalendarItem, Container } from "./components";
import { DAYS } from "../constants";
import { DatePickerHeader } from "./DatePickerHeader";
import { Nullable } from "../types";
import { getCalendar, truthyOrUndef } from "./utils";

export interface DatePickerProps extends ThemingProps<"DatePicker"> {
  value?: Nullable<Date>;
  onChange?(selected: Nullable<Date>): void;
}

export function DatePicker(props: DatePickerProps) {
  const [value, onChange] = useControllableState(omitThemingProps(props));

  const [baseDate, setBaseDate] = React.useState(value ?? new Date());

  const calendar = React.useMemo(() => getCalendar(baseDate), [baseDate]);

  return (
    <Container>
      <CalendarContainer>
        <DatePickerHeader
          value={baseDate}
          onNext={() => setBaseDate((d) => addMonths(d, 1))}
          onPrev={() => setBaseDate((d) => subMonths(d, 1))}
          __nextButtonTestId="hds.datepicker.controls.next-month"
          __prevButtonTestId="hds.datepicker.controls.prev-month"
          __selectedMonthTestId="hds.datepicker.selected-month"
        />

        <chakra.table>
          <chakra.thead>
            <chakra.tr>
              {DAYS.map((d) => (
                <chakra.th
                  key={uuid()}
                  data-testid="hds.datepicker.calendar.weekday"
                >
                  {d}
                </chakra.th>
              ))}
            </chakra.tr>
          </chakra.thead>

          <chakra.tbody>
            {calendar.map((arr) => (
              <chakra.tr key={uuid()}>
                {arr.map(({ isToday, isPlaceholder, ...obj }) => {
                  const formatted = format(obj.value, "yyyy-MM-dd");
                  const isSelected = !!value && isEqual(obj.value, value);

                  return (
                    <chakra.td key={uuid()}>
                      <CalendarItem
                        onClick={() => {
                          onChange(obj.value);
                          setBaseDate(obj.value);
                        }}
                        data-today={truthyOrUndef(isToday)}
                        data-selected={truthyOrUndef(isSelected)}
                        data-placeholder={truthyOrUndef(isPlaceholder)}
                        data-testid={`hds.datepicker.calendar.date.${formatted}`}
                      >
                        {obj.value.getDate()}
                      </CalendarItem>
                    </chakra.td>
                  );
                })}
              </chakra.tr>
            ))}
          </chakra.tbody>
        </chakra.table>
      </CalendarContainer>
    </Container>
  );
}
