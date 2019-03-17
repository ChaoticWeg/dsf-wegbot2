import { WegbotCommand } from "../baseCommand";
import { Message } from "discord.js";

export class PingCommand extends WegbotCommand {
    public constructor() {
        super('ping');
    }

    public onTriggered(context: Message): Promise<void> {
        return new Promise<void>((resolve: VoidFunction, reject: VoidFunction) => {
            context.reply("pong!").then(resolve).catch(reject);
        });
    }
}
