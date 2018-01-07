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

	getPercent(denominator: number, normal: boolean = false): number {
		let v: number = this._number;
		if (!normal && v == 0) {
			v = denominator;
		}
		return v / denominator;
	}
}
