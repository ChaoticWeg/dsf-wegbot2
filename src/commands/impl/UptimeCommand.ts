import { Message } from "discord.js";

import { CommandResult } from "../CommandResult";
import { WegbotCommand, WegbotCommandProps } from "../WegbotCommand";

import { Uptime } from "../../utils";

const props: WegbotCommandProps = {
    name: "uptime",
    description: "Show bot uptime"
};

export class UptimeCommand extends WegbotCommand<WegbotCommandProps> {
    public constructor() {
        super(props);
    }

    protected async onTriggered(context: Message): Promise<CommandResult> {
        const reply: string = `I've been up for ${Uptime.pretty()}`;
        await context.reply(reply);
        return { success: true };
    }
}
