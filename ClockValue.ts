export class ClockValue {
	_number: number = NaN;

	constructor() {
	}

	getString(zeroPadding: number = 0): string {
		let result: string = String(this._number);
		while (result.length < zeroPadding) {
			result = "0" + result;
		}
		return result;
	}
}
