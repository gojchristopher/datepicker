export interface CalendarObject {
  value: Date;
  isToday?: boolean;
  isPlaceholder?: boolean;
  isNextMonthDate?: boolean;
  isPreviousMonthDate?: boolean;
}

export enum TimeAdverb {
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

export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

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
