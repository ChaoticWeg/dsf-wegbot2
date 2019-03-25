export class Credentials {
    private _map: Map<string, any>;

    constructor() {
        this._map = new Map<string, any>(Object.entries(Object.assign({}, process.env)));
    }

    public getString(key: string): string | null {
        return this._map.has(key) ? this._map.get(key) : null;
    }

    public getNumber(key: string): number | null {
        let existing: number = NaN;

        // already got in map
        if (this._map.has(key)) {
            existing = Number(this._map.get(key));
        }

        return Number.isNaN(existing) ? null : existing;
    }
}
