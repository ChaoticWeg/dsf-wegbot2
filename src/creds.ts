export class Credentials {
    private _map : Map<string, any>;

    constructor(filepath : string) {
        let raw;
        try {
            raw = require(filepath);
        } catch (_) {
            raw = {};
        }
        this._map = new Map<string, any>(Object.entries(raw));
    }

    public getString(key: string) : string | null {
        if (this._map.has(key)) {
            return String(this._map.get(key));
        }

        if (process.env.hasOwnProperty(key)) {
            return String(process.env[key]);
        }

        return null;
    }

    public getNumber(key: string) : number | null {
        let existing : number = NaN;

        // already got in map
        if (this._map.has(key)) {
            existing = Number(this._map.get(key));
        }

        else if (process.env.hasOwnProperty(key)) {
            existing = Number(process.env[key]);
        }

        return Number.isNaN(existing) ? null : existing;
    }
}
