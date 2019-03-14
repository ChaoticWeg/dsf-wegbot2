import { EventRegistry } from "./registry";

export abstract class WegbotEvent {
    private _eventName : string;
    public get eventName() { return this._eventName; }

    constructor(name: string) {
        this._eventName = name;
        EventRegistry.instance.register(this._eventName, this.onTriggered);
    }

    public abstract onTriggered(context?: any) : void;
}
