import { Message } from "discord.js";

export abstract class WegbotCommand {
    _cmd: string;

    constructor(cmd: string) {
        this._cmd = cmd;
    }

    public get cmdStr(): string { return this._cmd; }
    
    public abstract onTriggered(context: Message): Promise<any>;
}
