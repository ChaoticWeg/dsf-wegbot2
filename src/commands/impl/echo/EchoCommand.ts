import { Message } from "discord.js";
import { CommandResult } from "../../CommandResult";
import { WegbotCommand } from "../../WegbotCommand";

export interface EchoCommandFootprint {
    name: string;
    contents: string;
}

export class EchoCommand extends WegbotCommand {
    private readonly content: string;

    public constructor(fp: EchoCommandFootprint) {
        super({
            group: "echo",
            name: fp.name
        });

        this.content = fp.contents;
    }

    protected async onTriggered(context: Message): Promise<CommandResult> {
        return context.channel.send(this.content).then(this.onSuccess.bind(this)).catch(this.onFailure.bind(this));
    }

    // tslint:disable:semicolon

    private onSuccess = (): CommandResult => ({
        success: true
    });

    private onFailure = (err: any): CommandResult => ({
        success: false,
        reason: err.toString()
    });

    // tslint:enable:semicolon
}
