import { CommandResult } from "./CommandResult";
import { WegbotCommand, WegbotCommandProps } from "./WegbotCommand";

export type CommandMap = Map<string, WegbotCommand<WegbotCommandProps>>;

export { CommandResult, WegbotCommand };

export default {
    emptyMap: () => new Map<string, WegbotCommand<WegbotCommandProps>>(),
    prefix: process.env.COMMAND_PREFIX || "?"
};

export {
    PingCommand,
    ClapCommand, PredsCommand, VGKCommand, VGKAltCommand,
    AddRoleCommand, RemoveRoleCommand,
    HelpCommand, UptimeCommand,
    CanesCommand
} from "./impl";
