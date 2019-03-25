import { ClapCommand } from "./clap";
import { PingCommand } from "./ping";
import { WegbotCommand } from "./WegbotCommand";
import { WegbotCommandResult } from "./WegbotCommandResult";

export const commands: WegbotCommand[] = [
    new PingCommand(),
    new ClapCommand()
];

export { WegbotCommand, WegbotCommandResult };
