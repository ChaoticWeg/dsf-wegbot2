import { WegbotCommand } from "../WegbotCommand";

export abstract class WegbotAdminCommand extends WegbotCommand {
    protected constructor(subcommand: string) {
        super(`wegbot ${subcommand}`);
    }
}
