import { WegbotCommand, CommandOptions, CommandResult } from "../baseCommand";
import { Message } from "discord.js";

export const _pingOptions: CommandOptions = { "allowedInDm": true };

export class PingCommand extends WegbotCommand {
    public constructor() {
        super("ping", _pingOptions);
    }

    public onTriggered(context: Message): Promise<CommandResult> {
        return new Promise<CommandResult>((resolve: (result: CommandResult) => void, reject: (result: CommandResult) => void) => {
            context.reply("pong!")
                .then(() => { resolve(PingCommand.onSuccess(context)); })
                .catch((r) => { reject(WegbotCommand.onFailure(context, r)); });
        });
    }
}
