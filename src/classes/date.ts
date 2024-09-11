import * as d3TimeFormat from 'd3-time-format';

export class PyDate {
	year?: number;
	month?: number;
	day?: number;

	constructor(year?: number, month?: number, day?: number) {
		Object.assign(this, { year, month, day });
	}

	get jsDate(): Date {
		return new Date(this.year!, this.month! - 1, this.day);
	}

	str() {
		return d3TimeFormat.timeFormat('%Y-%m-%d')(this.jsDate);
	}

	weekday() {
		// javascript week starts on sunday, while python one starts on monday
		return (this.jsDate.getDay() + 6) % 7;
	}

	isoweekday() {
		return this.weekday() + 1;
	}

	get __totalMillis() {
		return this.jsDate.getTime();
	}

	valueOf() {
		return this.__totalMillis;
	}

	toString() {
		return this.str();
	}

	toJSON() {
		return this.str();
	}
}
