import { CommandResult } from "./CommandResult";
import { WegbotCommand, WegbotCommandProps } from "./WegbotCommand";

export type CommandMap = Map<string, WegbotCommand<WegbotCommandProps>>;

export { CommandResult, WegbotCommand };

export default {
    emptyMap: () => new Map<string, WegbotCommand<WegbotCommandProps>>(),
    prefix: "?"
};

export {
    PingCommand,
    ClapCommand,
    AddRoleCommand, RemoveRoleCommand,
    HelpCommand
} from "./impl";
