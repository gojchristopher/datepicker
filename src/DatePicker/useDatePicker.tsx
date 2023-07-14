import { addMonths, subMonths } from "date-fns";
import { useState } from "react";
import { createCalendar } from "./createCalendar";
import { usePopper } from "./usePopper";

export interface UseDatePickerProps {
  value?: Date;
  onChange?(newValue?: Date): void;
  defaultValue?: Date;
}

export function useDatePicker(props: UseDatePickerProps = {}) {
  const [selected, setSelected] = useState(props.value);
  const [baseDate, setBaseDate] = useState(props.value ?? new Date());

  const popper = usePopper();

  const calendar = createCalendar(baseDate);

  const next = () => setBaseDate((d) => addMonths(d, 1));
  const prev = () => setBaseDate((d) => subMonths(d, 1));
  const today = () => {
    setSelected(new Date());
    setBaseDate(new Date());
  };

  const apply = () => {
    props.onChange?.(selected);
    popper.setOpen(false);
  };

  const cancel = () => {
    popper.setOpen(false);
    setSelected(props.value);
    setBaseDate(props.value ?? new Date());
  };

  return {
    calendar,
    baseDate,
    setBaseDate,
    selected,
    setSelected,

    next,
    prev,
    today,

    apply,
    cancel,

    ...popper,
  };
}

export type UseDatePickerReturn = ReturnType<typeof useDatePicker>;
