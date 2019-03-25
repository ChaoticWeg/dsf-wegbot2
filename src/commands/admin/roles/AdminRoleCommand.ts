import { WegbotAdminCommand } from "../WegbotAdminCommand";

export abstract class AdminRoleCommand extends WegbotAdminCommand {
    protected constructor(roleActionCmd: string) {
        super(`roles ${roleActionCmd}`);
    }
}
