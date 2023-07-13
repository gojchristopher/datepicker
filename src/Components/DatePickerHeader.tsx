import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import { chakra, Icon } from "@chakra-ui/react";
import { format } from "date-fns";

interface DatePickerHeaderProps {
  value: Date;
  onNext?(): void;
  onPrev?(): void;
  __nextButtonTestId?: string;
  __prevButtonTestId?: string;
  __selectedMonthTestId?: string;
}

export function DatePickerHeader({
  value,
  onNext,
  onPrev,
  __nextButtonTestId = "hds.datepicker.shared.control.next-month",
  __prevButtonTestId = "hds.datepicker.shared.control.prev-month",
  __selectedMonthTestId = "hds.datepicker.shared.selected-month",
}: DatePickerHeaderProps) {
  return (
    <chakra.div display="flex" alignItems="center">
      <Control onClick={onPrev} data-testid={__prevButtonTestId}>
        <Icon as={ChevronLeftIcon} w={5} h={5} />
      </Control>

      <chakra.p
        sx={{
          flexGrow: 1,
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "24px",
          color: "Gray.700",
        }}
        data-testid={__selectedMonthTestId}
      >
        {format(value, "MMMM")}
      </chakra.p>

      <Control onClick={onNext} data-testid={__nextButtonTestId}>
        <Icon as={ChevronRightIcon} w={5} h={5} />
      </Control>
    </chakra.div>
  );
}

const Control = chakra("button", {
  baseStyle: {
    width: "36px",
    height: "36px",
    color: "Gray.500",
    rounded: "full",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "colors 300ms ease-in-out",
    _hover: {
      color: "Gray.600",
      bgColor: "Gray.50",
    },
  },
});
