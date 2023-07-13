export type Nullable<T> = null | T;

export enum LastUpdated {
  START,
  UNTIL,
}

export interface CalendarObject {
  value: Date;
  isToday?: boolean;
  isPlaceholder?: boolean;
  isNextMonthDate?: boolean;
  isPreviousMonthDate?: boolean;
}

export interface RangeCalendarObject extends CalendarObject {
  isWithinRange?: boolean;
  isRangeStartDate?: boolean;
  isRangeUntilDate?: boolean;
}

export interface DateRange {
  start: Date;
  until: Date;
}

export enum TimeAdverbial {
  Today = "Today",
  Yesterday = "Yesterday",
  ThisWeek = "This week",
  LastWeek = "Last week",
  ThisMonth = "This month",
  LastMonth = "Last month",
  ThisYear = "This year",
  LastYear = "Last year",
  AllTime = "All time",
}

type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type Assign<T, U> = Pretty<DistributiveOmit<T, keyof U> & U>;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
