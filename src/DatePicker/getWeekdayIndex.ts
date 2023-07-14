import { DAYS } from "./constants";
import { Weekday } from "./types";

export function getWeekdayIndex(weekday: Weekday) {
  const index = DAYS.findIndex((d) => d === weekday) ?? 0;

  return index as 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
