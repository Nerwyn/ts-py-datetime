export declare const TimedeltaIntervals: readonly ["weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
export type TimedeltaInterval = (typeof TimedeltaIntervals)[number];
export type TimedeltaParams = Partial<Record<TimedeltaInterval, number>>;
export declare const toSeconds: Record<TimedeltaInterval, number>;
