import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useTransitionStyles,
} from "@floating-ui/react";
import {
  chakra,
  CloseButton,
  forwardRef,
  HTMLChakraProps,
  Icon,
  omitThemingProps,
  ThemingProps,
  useControllableState,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { format } from "date-fns";
import * as React from "react";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { Assign } from "../types";
import { DatePicker } from "./DatePicker";
import { Nullable } from "../types";
import { truthyOrUndef } from "./utils";

interface BaseProps {
  value?: Nullable<Date>;
  onChange?(newValue: Nullable<Date>): void;
  placeholder?: string;
  dateFormat?: ((value: Date) => string) | string;
  __fieldTestId?: string;
}

export interface DatePickerInputProps
  extends Assign<
    ThemingProps<"Input"> & HTMLChakraProps<"button">,
    BaseProps
  > {}

export const DatePickerInput = forwardRef<DatePickerInputProps, "button">(
  function DatePickerInput(
    {
      size,
      value,
      onChange,
      dateFormat,
      placeholder,
      __fieldTestId = "hds.datepicker-input",
      ...others
    },
    ref
  ) {
    const css = useMultiStyleConfig("Input", others);

    const [controlledValue, controlledOnChange] = useControllableState({
      value,
      onChange,
    });

    const {
      x,
      y,
      refs,
      strategy,
      elements,
      styles,
      isMounted,
      getFloatingProps,
      getReferenceProps,
      isOpen,
      setOpen,
    } = usePopper();

    const fieldRef = useMergeRefs([ref, refs.setReference]);

    const dateToString = React.useCallback(
      (d: Date) => {
        if (!dateFormat) {
          return format(d, "MMM dd, yyyy");
        } else if (typeof dateFormat === "string") {
          return format(d, dateFormat);
        } else {
          return dateFormat(d);
        }
      },
      [dateFormat]
    );

    return (
      <>
        <chakra.button
          ref={fieldRef}
          type="button"
          __css={{
            ...css.field,
            display: "flex",
            textAlign: "left",
            gap: 2,
          }}
          data-focus={truthyOrUndef(isOpen)}
          data-testid={__fieldTestId}
          {...omitThemingProps(others)}
          {...getReferenceProps()}
        >
          <Icon as={CalendarIcon} boxSize={5} color="gray.500" />

          {!controlledValue && (
            <chakra.span flexGrow={1} __css={(css.field as any)?._placeholder}>
              {placeholder}
            </chakra.span>
          )}

          {controlledValue && (
            <chakra.span flexGrow={1}>
              {dateToString(controlledValue)}
            </chakra.span>
          )}

          {controlledValue && (
            <CloseButton
              as="div"
              size="sm"
              bg="blackAlpha.50"
              color="neutrals.500"
              _hover={{
                bg: "blackAlpha.100",
                color: "neutrals.600",
              }}
              tabIndex={-1}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                controlledOnChange(null);

                const domRef =
                  elements.domReference as HTMLButtonElement | null;

                domRef?.focus();
              }}
            />
          )}
        </chakra.button>

        <FloatingPortal>
          {isMounted && (
            <chakra.div
              ref={refs.setFloating}
              __css={{
                pos: strategy,
                top: `${y}px`,
                left: `${x}px`,
                zIndex: "modal",
                ...styles,
              }}
              data-testid="hds.range-datepicker-input.calendar-container"
              {...getFloatingProps()}
            >
              <DatePicker
                value={controlledValue}
                colorScheme={others.colorScheme}
                onChange={(newValue) => {
                  controlledOnChange(newValue);
                  setOpen(false);

                  const domRef =
                    elements.domReference as HTMLButtonElement | null;

                  domRef?.focus();
                }}
              />
            </chakra.div>
          )}
        </FloatingPortal>
      </>
    );
  }
);

function usePopper() {
  const [isOpen, setOpen] = React.useState(false);

  const floating = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    strategy: "fixed",
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({
        padding: 6,
      }),
    ],
  });

  const transitions = useTransitionStyles(floating.context, {
    duration: {
      open: 50,
      close: 25,
    },
  });

  const click = useClick(floating.context);
  const dismiss = useDismiss(floating.context);

  const interactions = useInteractions([click, dismiss]);

  return {
    isOpen,
    setOpen,

    ...floating,
    ...transitions,
    ...interactions,
  };
}
