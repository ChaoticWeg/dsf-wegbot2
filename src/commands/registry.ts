import { WegbotCommand } from "./baseCommand";
import * as util from "util";

export class CommandRegistry {
    private _registry : Map<string, WegbotCommand> = new Map<string, WegbotCommand>();

    // disallow constructor
    private constructor() {}

    public register(trigger: string, event: WegbotCommand) : void {
        let triggerWithPrefix : string = CommandRegistry.triggerPrefix + trigger;
        this._registry.set(triggerWithPrefix, event);
    }

    public async handle(trigger: string) {
        if (!trigger.startsWith(CommandRegistry.triggerPrefix)) {
            return;
        }

        let relevantEvent = this._registry.get(trigger);
        if (!util.isUndefined(relevantEvent)) {
            await relevantEvent.onTriggered();
        }
    }
    
    private static _instance : CommandRegistry | null = null;
    public static get instance() {
        if (util.isNull(CommandRegistry._instance)) {
            CommandRegistry._instance = new CommandRegistry();
        }
        return CommandRegistry._instance;
    }

    private static _triggerPrefix : string = "?";
    public static get triggerPrefix() { return CommandRegistry._triggerPrefix; }
};
