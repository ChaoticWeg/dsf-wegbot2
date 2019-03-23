import { Message } from "discord.js";
import { CommandCreds, Creds } from "./creds";
import * as _ from "lodash";

export interface CommandOptions {
    // all boolean options are labeled in such a way that the default values are falsy
    adminOnly?: boolean;
    allowedInDm?: boolean;
}

export interface CommandResult {
    context: Message;
    success: boolean;
    error?: any;
}

export abstract class WegbotCommand {
    readonly _cmd: string;
    readonly _opts: CommandOptions;
    readonly _creds: CommandCreds;

    protected constructor(cmd: string, opts?: CommandOptions) {
        this._cmd = cmd;
        this._opts = !_.isUndefined(opts) ? opts : {};
        this._creds = Creds;
    }

    public get cmdStr(): string { return this._cmd; }
    public get options(): CommandOptions { return this._opts; }
    
    protected static onSuccess(context: Message): CommandResult {
        context.react("👍")
            .then(() => { console.log("reacted +1"); })
            .catch((e) => { console.log("error reacting: " + e); });

        return {
            context: context,
            success: true
        };
    }

    protected static onFailure(context: Message, reason?: any): CommandResult {
        context.react("👍")
            .then(() => { console.log("reacted -1"); })
            .catch((e) => { console.log("error reacting: " + e); });
        
        return {
            context: context,
            success: false,
            error: reason
        };
    }

    public abstract onTriggered(context: Message): Promise<CommandResult>;
}
