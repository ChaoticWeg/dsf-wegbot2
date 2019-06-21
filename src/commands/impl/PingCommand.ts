import { Message } from "discord.js";

import { CommandResult } from "../CommandResult";
import { WegbotCommand, WegbotCommandProps } from "../WegbotCommand";

const props: WegbotCommandProps = {
    name: "ping",
    description: "Test command",
    hide: true,
    ownerOnly: true
};

export class PingCommand extends WegbotCommand {
    public constructor() {
        super(props);
    }

    protected async onTriggered(context: Message): Promise<CommandResult> {
        await context.react("♿");
        return { success: true };
    }
}
