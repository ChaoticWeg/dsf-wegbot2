import { Message } from "discord.js";
import { readFile } from "fs";
import { join } from "path";
import { promisify } from "util";
import { CommandResult } from "../../CommandResult";

import { WegbotCommand, WegbotCommandProps } from "../../WegbotCommand";

export interface EchoCommandProps extends WegbotCommandProps {
    filename?: string;
}

export abstract class EchoCommand extends WegbotCommand<EchoCommandProps> {
    protected static readFile = promisify(readFile);

    protected filename: string;

    protected constructor(props: EchoCommandProps) {
        super({ group: "shitposts", ...props });
        this.filename = join(__dirname, "contents", `${props.filename || props.name}.txt`);
    }

    protected async readFileContents(): Promise<string> {
        return await EchoCommand.readFile(this.filename, "utf8");
    }

    protected async onTriggered(context: Message): Promise<CommandResult> {
        const text = await this.readFileContents();
        await context.channel.send(text, { reply: undefined });

        return { success: true };
    }
}
