export abstract class WegbotEvent {
    private _eventName : string;
    public get eventName() { return this._eventName; }

    constructor(name: string) {
        this._eventName = name;
    }

    public abstract onTriggered(context?: any) : void;
}
