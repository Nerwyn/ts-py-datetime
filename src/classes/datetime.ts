import { PyTime, PyDate } from '.';
import { DatetimeInterval, DatetimeIntervals } from '../models';
import * as d3TimeFormat from 'd3-time-format';

export class PyDatetime {
	year?: number;
	month?: number;
	day?: number;
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
	utc?: boolean;

	constructor(
		year?: number | PyDate | PyDatetime | Date,
		month?: number,
		day?: number,
		hour?: number,
		minute?: number,
		second?: number,
		millisecond?: number,
		utc?: boolean
	) {
		let args: Record<
			string,
			number | PyDatetime | PyDate | Date | boolean | undefined
		> = {};
		this.utc = utc;

		if (typeof year == 'number' && !month && !day) {
			// while a dt.datetime(2020) is perfectly valid, it's quite unlikely.
			// much more unlikely than having gotten an epoch passed in. convert that to date
			year = new Date(year);
		}

		if (
			year instanceof PyDatetime &&
			year?.year &&
			year?.month &&
			year?.day
		) {
			const ts = year;
			DatetimeIntervals.forEach((field) => {
				args[field] = ts[field as keyof PyDatetime] as number;
			});
			args.utc = ts.utc;
		} else if (year instanceof Date) {
			const ts = year;
			args = {
				year: ts.getFullYear(),
				month: ts.getMonth() + 1,
				day: ts.getDate(),
				hour: ts.getHours(),
				minute: ts.getMinutes(),
				second: ts.getSeconds(),
				millisecond: ts.getMilliseconds(),
			};
		} else {
			args = { year, month, day, hour, minute, second, millisecond };
		}
		Object.assign(this, args);
	}

	replace(
		year?: number,
		month?: number,
		day?: number,
		hour?: number,
		minute?: number,
		second?: number,
		millisecond?: number
	) {
		// returns new date with updated values
		let args: Record<string, number | undefined> = {};
		if (year && typeof year != 'number') {
			args = year;
		} else {
			args = { year, month, day, hour, minute, second, millisecond };
		}

		const newTs = new PyDatetime(this);
		Object.entries(args).forEach(([key, val]) => {
			if (val != null) {
				newTs[key as DatetimeInterval] = val as number;
			}
		});
		return newTs;
	}

	get jsDate(): Date {
		if (this.utc) {
			return new Date(this.valueOf());
		} else {
			return new Date(
				this.year!,
				this.month! - 1,
				this.day || 1,
				this.hour || 0,
				this.minute || 0,
				this.second || 0,
				this.millisecond || 0
			);
		}
	}

	str() {
		return this.strftime('%Y-%m-%d %H:%M:%S.%f');
	}

	valueOf() {
		if (this.utc) {
			return Date.UTC(
				this.year!,
				this.month! - 1,
				this.day || 1,
				this.hour || 0,
				this.minute || 0,
				this.second || 0,
				this.millisecond || 0
			);
		} else {
			return this.jsDate.getTime();
		}
	}

	toString() {
		return this.str();
	}

	toJSON() {
		return this.str();
	}

	strftime(format: string) {
		if (this.utc) {
			return d3TimeFormat.utcFormat(format)(this.jsDate);
		} else {
			return d3TimeFormat.timeFormat(format)(this.jsDate);
		}
	}

	time() {
		return new PyTime(
			this.hour,
			this.minute,
			this.second,
			this.millisecond
		);
	}

	date() {
		return new PyDate(this.year, this.month, this.day);
	}

	weekday() {
		// javascript week starts on sunday, while python one starts on monday
		return this.date().weekday();
	}

	isoweekday() {
		return this.weekday() + 1;
	}
}
