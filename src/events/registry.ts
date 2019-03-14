import Discord from "discord.js";
import * as util from "util";

export class EventRegistry {
    private _registry : Map<string, Array<Function>> = new Map<string, Array<Function>>();

    public applyAll(client: Discord.Client) : void {
        this._registry.forEach((fns: Array<Function>, eventName: string) => {
            fns.forEach((fn: Function) => {
                client.on(eventName, fn);
            });
        });
    }

    public register(name: string, fn: Function) {
        let existing : Array<Function> = this.forName(name);
        existing.push(fn);
        this._registry.set(name, existing);
    }

    public forName(name: string) : Array<Function> {
        let result : Array<Function> | undefined = this._registry.get(name);
        return util.isUndefined(result) ? new Array<Function>() : result;
    }

    // disallow constructor
    private constructor() {}

    private static _instance : EventRegistry | null = null;
    public static get instance() {
        if (util.isNull(EventRegistry._instance)) {
            EventRegistry._instance = new EventRegistry();
        }
        return EventRegistry._instance;
    }
}
