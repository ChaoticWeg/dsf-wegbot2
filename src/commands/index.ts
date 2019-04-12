import { CommandResult } from "./CommandResult";
import { WegbotCommand } from "./WegbotCommand";

export type CommandMap = Map<string, WegbotCommand>;

export { CommandResult, WegbotCommand };

export default {
    emptyMap: () => new Map<string, WegbotCommand>(),
    prefix: "?"
};

export { PingCommand } from "./impl/PingCommand";
