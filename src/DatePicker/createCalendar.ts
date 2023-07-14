import {
  addDays,
  endOfMonth,
  getDaysInMonth,
  isToday,
  startOfMonth,
  subDays,
} from "date-fns";
import { arrayChunk } from "./arrayChunk";
import { CalendarObject, Weekday } from "./types";

interface CreateCalendarOptions {
  weekStartsOn?: Weekday;
}

export function createCalendar(date: Date, _?: CreateCalendarOptions) {
  const lastDayOfMonth = endOfMonth(date);
  const firstDayOfMonth = startOfMonth(date);
  const totalDaysInMonth = getDaysInMonth(date);

  const calendar: CalendarObject[] = [];

  for (let i = 0; i < totalDaysInMonth; i++) {
    const d = addDays(firstDayOfMonth, i);

    calendar.push({
      value: d,
      isToday: isToday(d),
    });
  }

  const daysToPreviousSundayFromFirstDay = firstDayOfMonth.getDay() - 0;
  const daysToNextSaturdayFromLastDay = 6 - lastDayOfMonth.getDay();

  if (daysToPreviousSundayFromFirstDay > 0) {
    for (let i = 0; i < daysToPreviousSundayFromFirstDay; i++) {
      calendar.unshift({
        value: subDays(firstDayOfMonth, i + 1),
        isPlaceholder: true,
        isPreviousMonthDate: true,
      });
    }
  }

  if (daysToNextSaturdayFromLastDay > 0) {
    for (let i = 0; i < daysToNextSaturdayFromLastDay; i++) {
      calendar.push({
        value: addDays(lastDayOfMonth, i + 1),
        isPlaceholder: true,
        isNextMonthDate: true,
      });
    }
  }

  /*
   * 6 week calendar
   */
  if (calendar.length / 7 < 6) {
    const lastCalendarDate = calendar[calendar.length - 1].value;

    for (let i = 0; i < 7; i++) {
      calendar.push({
        value: addDays(lastCalendarDate, i + 1),
        isPlaceholder: true,
        isNextMonthDate: true,
      });
    }
  }

  return arrayChunk(calendar, 7);
}
