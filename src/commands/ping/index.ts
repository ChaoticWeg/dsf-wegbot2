import { Message } from "discord.js";
import { WegbotCommand } from "../WegbotCommand";
import { WegbotCommandResult } from "../WegbotCommandResult";

export class PingCommand extends WegbotCommand {
    public constructor() {
        super("ping");
    }

    protected async execute(context: Message): Promise<WegbotCommandResult> {
        return new Promise<WegbotCommandResult>(
            async (resolve: (r: WegbotCommandResult) => void, reject: (r: WegbotCommandResult) => void) => {
                const command: WegbotCommand = this;
                const trigger: Message = context;

                let success: boolean = true;
                let error: Error | undefined = void 0;
                let reason: string | undefined = void 0;

                await context.reply("pong").catch((e) => {
                    error = e;
                    success = false;
                    reason = "unable to send";
                    return e;
                });

                const fn: (r: WegbotCommandResult) => void = success ? resolve : reject;
                return fn({ command, error, reason, success, trigger });
            }
        );
    }
}
