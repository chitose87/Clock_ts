/**
 *
 */
import {AsEventDispatcher} from "../AsEvent/AsEventDispatcher";
import {ClockValue} from "./ClockValue";
import {ClockEvent} from "./ClockEvent";

export class Clock extends AsEventDispatcher {
	private millEvent: ClockEvent = new ClockEvent(ClockEvent.MILL);
	private secEvent: ClockEvent = new ClockEvent(ClockEvent.SEC);
	private minEvent: ClockEvent = new ClockEvent(ClockEvent.MIN);
	private hourEvent: ClockEvent = new ClockEvent(ClockEvent.HOUR);
	private dateEvent: ClockEvent = new ClockEvent(ClockEvent.DATE);
	private monEvent: ClockEvent = new ClockEvent(ClockEvent.MON);
	private yearEvent: ClockEvent = new ClockEvent(ClockEvent.YEAR);

	get milliseconds(): ClockValue {
		return this.millEvent.value;
	}

	get seconds(): ClockValue {
		return this.secEvent.value;
	}

	get minutes(): ClockValue {
		return this.minEvent.value;
	}

	get hours(): ClockValue {
		return this.hourEvent.value;
	}

	get date(): ClockValue {
		return this.dateEvent.value;
	}

	get month(): ClockValue {
		return this.monEvent.value;
	}

	get fullYear(): ClockValue {
		return this.yearEvent.value;
	}

	/**
	 *
	 */
	constructor() {
		super();
		this.run();
	}

	private run() {
		requestAnimationFrame(() => this.run());

		let after: Date = new Date();
		let v;

		this.millEvent.value._number = after.getMilliseconds();
		this.dispatchEvent(this.millEvent);

		v = after.getSeconds();
		if (this.secEvent.value._number != v) {
			this.secEvent.value._number = v;
			this.dispatchEvent(this.secEvent);

			v = after.getMinutes();
			if (this.minEvent.value._number != v) {
				this.minEvent.value._number = v;
				this.dispatchEvent(this.minEvent);

				v = after.getHours();
				if (this.hourEvent.value._number != v) {
					this.hourEvent.value._number = v;
					this.dispatchEvent(this.hourEvent);

					v = after.getDate();
					if (this.dateEvent.value._number != v) {
						this.dateEvent.value._number = v;
						this.dispatchEvent(this.dateEvent);

						v = after.getMonth() + 1;
						if (this.monEvent.value._number != v) {
							this.monEvent.value._number = v;
							this.dispatchEvent(this.monEvent);

							v = after.getFullYear();
							if (this.yearEvent.value._number != v) {
								this.yearEvent.value._number = v;
								this.dispatchEvent(this.yearEvent);

							}
						}
					}
				}
			}
		}
	}

	allListenerSet(initialRun: boolean,
				   milliseconds: (e: ClockEvent) => void = null,
				   seconds: (e: ClockEvent) => void = null,
				   minutes: (e: ClockEvent) => void = null,
				   hours: (e: ClockEvent) => void = null,
				   date: (e: ClockEvent) => void = null,
				   month: (e: ClockEvent) => void = null,
				   fullYear: (e: ClockEvent) => void = null): Clock {

		if (milliseconds) {
			this.listener(ClockEvent.MILL, milliseconds);
			if (initialRun) milliseconds(this.millEvent);
		}
		if (seconds) {
			this.listener(ClockEvent.SEC, seconds);
			if (initialRun) seconds(this.secEvent);
		}
		if (minutes) {
			this.listener(ClockEvent.MIN, minutes);
			if (initialRun) minutes(this.minEvent);
		}
		if (hours) {
			this.listener(ClockEvent.HOUR, hours);
			if (initialRun) hours(this.hourEvent);
		}
		if (date) {
			this.listener(ClockEvent.DATE, date);
			if (initialRun) date(this.dateEvent);
		}
		if (month) {
			this.listener(ClockEvent.MON, month);
			if (initialRun) month(this.monEvent);
		}
		if (fullYear) {
			this.listener(ClockEvent.YEAR, fullYear);
			if (initialRun) fullYear(this.yearEvent);
		}

		return this;
	}
}
