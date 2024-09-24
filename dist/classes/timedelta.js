import * as d3TimeFormat from 'd3-time-format';
import { isParams } from '../functions';
import { TimedeltaIntervals, toSeconds, } from '../models';
export class timedelta {
    constructor(days, seconds, milliseconds, minutes, hours, weeks) {
        this.days = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        let args = {
            days: days,
            seconds,
            milliseconds,
            minutes,
            hours,
            weeks,
        };
        if (isParams(days)) {
            args = days;
        }
        else if (Math.abs(days) > 900) {
            // we have seconds, let's deconstruct into weeks, days, hours, minutes, seconds, milliseconds
            let totalSeconds = days ?? 0;
            args = {};
            TimedeltaIntervals.forEach((key) => {
                const multiplier = toSeconds[key];
                const value = Math.floor(totalSeconds / multiplier);
                args[key] = value;
                totalSeconds -= value * multiplier;
            });
        }
        // Get total seconds from args and then deconstruct into days, seconds, milliseconds
        // Python does days, seconds, microseconds but JS does not support microsecond precision for Date
        let totalSeconds = 0;
        TimedeltaIntervals.forEach((key) => {
            totalSeconds += (args[key] ?? 0) * toSeconds[key];
        });
        if (totalSeconds.toString().includes('.')) {
            // To avoid floating point imprecision errors
            this.milliseconds =
                parseFloat(`0.${totalSeconds.toString().split('.')[1]}`) /
                    toSeconds.milliseconds;
            totalSeconds = Math.floor(totalSeconds);
        }
        this.days = Math.floor(totalSeconds / toSeconds.days);
        this.seconds = totalSeconds - this.days * toSeconds.days;
    }
    str() {
        const dayString = this.days > 0
            ? `${this.days} day${this.days > 1 ? 's,' : ','}`
            : '';
        const timeString = d3TimeFormat.utcFormat(`%-H:%M:%S${this.milliseconds ? '.%f' : ''}`)(new Date(this.valueOf() * 1000));
        return `${dayString} ${timeString}`.trim();
    }
    valueOf() {
        return (this.days * toSeconds.days +
            this.seconds +
            this.milliseconds * toSeconds.milliseconds);
    }
    totalSeconds() {
        return this.valueOf();
    }
    toString() {
        return this.str();
    }
    toJSON() {
        return this.str();
    }
}
