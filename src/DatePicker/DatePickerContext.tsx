import { createContext } from "./createContext";
import { UseDatePickerReturn } from "./useDatePicker";

export const [DatePickerProvider, useDatePickerContext] =
  createContext<UseDatePickerReturn>({
    name: "DatePickerContext",
    hookName: "useDatePickerContext",
    providerName: "DatePickerProvider",
    strict: true,
  });
