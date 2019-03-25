import { Message, Role } from "discord.js";
import { RequestableRole, WegbotConfig } from "../../../models";
import { Wegbot } from "../../../wegbot";
import { WegbotCommand } from "../../WegbotCommand";
import { WegbotCommandResult } from "../../WegbotCommandResult";
import { AdminRoleCommand } from "./AdminRoleCommand";

export class AdminAddRoleCommand extends AdminRoleCommand {
    public constructor() {
        super("add");
    }

    protected async execute(context: Message, bot: Wegbot): Promise<WegbotCommandResult> {
        return new Promise<WegbotCommandResult>(
            async (resolve: (r: WegbotCommandResult) => void, reject: (r: WegbotCommandResult) => void) => {
                const command: WegbotCommand = this;
                const trigger: Message = context;

                // build new config from existing; get known roles for this guild
                const config: WegbotConfig = Object.assign({} as WegbotConfig, bot.config);

                // verify args are given
                const args: string[] = context.cleanContent.replace(this.commandStr, "").trimLeft().split(" ");
                if (args.length < 1) {
                    return reject({
                        command,
                        reason: "please specify a role to add",
                        success: false,
                        trigger
                    });
                }

                // search for role, given name
                const roleName: string = args[0];
                const foundRoles: Role[] = context.guild.roles
                    .filterArray((role: Role) => role.name.toUpperCase() === roleName.toUpperCase());

                // verify role exists
                if (foundRoles.length < 1) {
                    return reject({
                        command,
                        reason: `couldn't find a role with that name: ${roleName}`,
                        success: false,
                        trigger
                    });
                }

                // verify there is only one role with that name
                if (foundRoles.length > 1) {
                    return reject({
                        command,
                        reason: `ambiguous role name \`${roleName}\`: ` +
                            `found ${foundRoles.length} roles with similar names\n\`${foundRoles.join("\`, \`")}\``,
                        success: false,
                        trigger
                    });
                }

                // we have our role to add. check that it's not already known
                const roleToAdd: Role = foundRoles[0];
                const alreadyKnown: RequestableRole[] =
                    config.roles.filter((r: RequestableRole) => r.id === roleToAdd.id);

                // verify this role isn't already known
                if (alreadyKnown.length > 0) {
                    return reject({
                        command,
                        reason: `role(s) \`${alreadyKnown.join("\`, \`")}\` already requestable`,
                        success: false,
                        trigger
                    });
                }

                // role exists, is the only one by name, and is not already known. add it.
                bot.addRole({ guildId: context.guild.id, id: roleToAdd.id } as RequestableRole);

                // save config and return result
                bot.saveConfig()
                    .then(() => {
                        resolve({
                            command,
                            success: true,
                            trigger
                        });
                    })
                    .catch((error: NodeJS.ErrnoException) => {
                        reject({
                            command,
                            error,
                            reason: "unable to save config",
                            success: false,
                            trigger
                        });
                    });
            }
        );
    }
}
