import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { FloatingPortal } from "@floating-ui/react";
import { format } from "date-fns";
import { DatePicker } from "./DatePicker";
import { DatePickerProvider } from "./DatePickerContext";
import { mergeRefs } from "./mergeRefs";
import { Assign } from "./types";
import { UseDatePickerProps, useDatePicker } from "./useDatePicker";

export interface DatePickerInputProps
  extends Assign<HTMLChakraProps<"button">, UseDatePickerProps> {}

export const DatePickerInput = forwardRef<DatePickerInputProps, "button">(
  ({ value, onChange, defaultValue, placeholder, ...props }, ref) => {
    const datepicker = useDatePicker({
      value,
      onChange,
      defaultValue,
    });

    const buttonRef = ref
      ? mergeRefs([datepicker.refs.setReference, ref])
      : datepicker.refs.setReference;

    return (
      <DatePickerProvider value={datepicker}>
        <chakra.button
          type="button"
          ref={buttonRef}
          px={4}
          py={2}
          rounded="lg"
          border="1px"
          borderColor="gray.200"
          {...props}
          {...datepicker.getReferenceProps({
            onKeyDown(e) {
              /* Reset value on backspace */
              if (e.key === "Backspace" && !datepicker.isOpen) {
                onChange?.(undefined);
              }
            },
          })}
        >
          {value ? format(value, "dd MMM yyyy") : placeholder}
        </chakra.button>

        <FloatingPortal>
          {datepicker.isMounted && (
            <chakra.div
              ref={datepicker.refs.setFloating}
              pos={datepicker.strategy}
              top={`${datepicker.y}px`}
              left={`${datepicker.x}px`}
              zIndex="modal"
              {...datepicker.getFloatingProps()}
            >
              <DatePicker />
            </chakra.div>
          )}
        </FloatingPortal>
      </DatePickerProvider>
    );
  }
);
