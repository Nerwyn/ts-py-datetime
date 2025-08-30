export declare const DatetimeIntervals: ("year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond")[];
export type DatetimeInterval = (typeof DatetimeIntervals)[number];
export type DatetimeParams = Partial<Record<DatetimeInterval, number> & {
    utc: boolean;
}>;
export type TimeSpec = 'auto' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';
export type ISOFormatParams = {
    sep?: string;
    timespec?: TimeSpec;
};
