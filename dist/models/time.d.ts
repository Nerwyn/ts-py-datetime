export declare const TimeIntervals: readonly ["hour", "minute", "second", "millisecond"];
export type TimeInterval = (typeof TimeIntervals)[number];
export type TimeParams = Partial<Record<TimeInterval, number>>;
