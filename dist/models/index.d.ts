export declare const TimeIntervals: readonly ["hour", "minute", "second", "millisecond"];
export type TimeInterval = (typeof TimeIntervals)[number];
export type TimeParams = Partial<Record<TimeInterval, number>>;
export declare const DateIntervals: readonly ["year", "month", "day"];
export type DateInterval = (typeof DateIntervals)[number];
export type DateParams = Partial<Record<DateInterval, number>>;
export declare const DatetimeIntervals: ("year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond")[];
export type DatetimeInterval = (typeof DatetimeIntervals)[number];
export type DatetimeParams = Partial<Record<DatetimeInterval, number> & {
    utc: boolean;
}>;
export declare const TimedeltaIntervals: readonly ["weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
export type TimedeltaInterval = (typeof TimedeltaIntervals)[number];
export type TimedeltaParams = Partial<Record<TimedeltaInterval, number>>;
export declare const toSeconds: Record<TimedeltaInterval, number>;
