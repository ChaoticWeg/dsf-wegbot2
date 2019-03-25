import { Message } from "discord.js";
import { WegbotCommand } from "./WegbotCommand";

export interface WegbotCommandResult {
    command: WegbotCommand;
    trigger: Message;

    success: boolean;

    error?: Error;
    reason?: string;
}
