import { Message } from "discord.js";

import * as Database from "../../../database";

import { CommandResult } from "../../CommandResult";
import { WegbotCommand, WegbotCommandProps } from "../../WegbotCommand";

const props: WegbotCommandProps = {
    name: "lookup",
    description: "Look up user or role",
    hide: true,
    ownerOnly: true,
    usage: "lookup [user|role] [id]"
};

export class LookupCommand extends WegbotCommand {

    public constructor() {
        super(props);
    }

    protected async onTriggered(context: Message, args?: string[]): Promise<CommandResult> {
        if (!args || args.length < 2) {
            return { success: false, showUsage: true };
        }

        let target: any;

        switch (args[0].toLowerCase()) {
            case "user":
                target = await Database.findUserById(args[1]);
                break;
            default:
                return { success: false, showUsage: true };
        }

        context.author.send(`\`\`\`\n${target}\n\`\`\``);
        return { success: true };
    }

}
