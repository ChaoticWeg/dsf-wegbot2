import { Message } from "discord.js";
import { CommandResult } from "../CommandResult";
import { WegbotCommand } from "../WegbotCommand";

export class PingCommand extends WegbotCommand {
    public constructor() {
        super("ping");
    }

    protected async onTriggered(context: Message): Promise<CommandResult> {
        await context.react("♿");
        return { success: true };
    }
}
