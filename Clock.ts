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
				   milliseconds: (e: ClockEvent) => void,
				   seconds: (e: ClockEvent) => void,
				   minutes: (e: ClockEvent) => void,
				   hours: (e: ClockEvent) => void,
				   date: (e: ClockEvent) => void,
				   month: (e: ClockEvent) => void,
				   fullYear: (e: ClockEvent) => void): Clock {

		this.listener(ClockEvent.MILL, milliseconds);
		this.listener(ClockEvent.SEC, seconds);
		this.listener(ClockEvent.MIN, minutes);
		this.listener(ClockEvent.HOUR, hours);
		this.listener(ClockEvent.DATE, date);
		this.listener(ClockEvent.MON, month);
		this.listener(ClockEvent.YEAR, fullYear);

		if (initialRun) {
			milliseconds(this.millEvent);
			seconds(this.secEvent);
			minutes(this.minEvent);
			hours(this.hourEvent);
			date(this.dateEvent);
			month(this.monEvent);
			fullYear(this.yearEvent);
		}

		return this;
	}
}
