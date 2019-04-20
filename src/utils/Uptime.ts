import * as Moment from "moment";

let _up: Date | null = null;

export function ready(): void {
    _up = new Date();
}

export function up(): Date | null {
    return _up;
}

export function millis(): number {
    return _up ? (new Date()).getTime() - _up.getTime() : 0;
}

export function pretty(): string {
    return Moment.duration(millis()).humanize();
}
