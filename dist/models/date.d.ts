export declare const DateIntervals: readonly ["year", "month", "day"];
export type DateInterval = (typeof DateIntervals)[number];
export type DateParams = Partial<Record<DateInterval, number>>;
