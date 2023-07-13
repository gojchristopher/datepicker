import { Button, chakra, Spacer } from "@chakra-ui/react";

interface RangeDatePickerFooterProps {
  onApply?(): void;
  onCancel?(): void;
  hasTimeDetails?: boolean;
  hasSelectedDetails?: boolean;
}

export function DatePickerFooter({
  onApply,
  onCancel,
}: RangeDatePickerFooterProps) {
  return (
    <chakra.div display="flex" p="16px" alignItems="center">
      <Spacer />

      <chakra.div display="flex" gap="12px">
        <Button
          w="90px"
          variant="outline"
          colorScheme="gray"
          onClick={onCancel}
          data-testid="hds.range-datepicker.controls.cancel"
        >
          Cancel
        </Button>
        <Button
          w="90px"
          onClick={onApply}
          data-testid="hds.range-datepicker.controls.apply"
        >
          Apply
        </Button>
      </chakra.div>
    </chakra.div>
  );
}
