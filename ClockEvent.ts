import {AsEvent} from "../AsEvent/AsEvent";
import {ClockValue} from "./ClockValue";
import {Clock} from "./Clock";

export class ClockEvent extends AsEvent {
	static MILL: string = "mill";
	static SEC: string = "sec";
	static MIN: string = "min";
	static HOUR: string = "hour";
	static DATE: string = "date";
	static MON: string = "mon";
	static YEAR: string = "year";

	current: Clock;
	value: ClockValue = new ClockValue();
}
