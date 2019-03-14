import { CommandRegistry } from "./registry";

export abstract class WegbotCommand {
    constructor(trigger: string) {
        this._trigger = trigger;
        CommandRegistry.instance.register(trigger, this);
    }

    private _trigger : string;
    public get trigger() { return this._trigger; }

    abstract onTriggered() : Promise<any>;
}
