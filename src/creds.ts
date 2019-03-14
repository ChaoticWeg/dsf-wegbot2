export interface CredentialsMap {
    [key : string] : string | number;
}

export class Credentials {
    private _map : CredentialsMap;

    constructor(filepath : string) {
        this._map = require(filepath);
    }

    public getString(key: string) : string | null {
        if (this._map.hasOwnProperty(key)) {
            return String(this._map[key]);
        }

        if (process.env.hasOwnProperty(key)) {
            return String(process.env[key]);
        }

        return null;
    }

    public getNumber(key: string) : number | null {
        let existing : number = NaN;

        // already got in map
        if (this._map.hasOwnProperty(key)) {
            existing = Number(this._map[key]);
        }

        else if (process.env.hasOwnProperty(key)) {
            existing = Number(process.env[key]);
        }

        return Number.isNaN(existing) ? null : existing;
    }
}
