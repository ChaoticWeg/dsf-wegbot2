import { GuildMember, Message, Role } from "discord.js";
import { CommandResult } from "../../CommandResult";
import { RoleCommand, RoleCommandProps } from "./RoleCommand";

const props: RoleCommandProps = {
    description: "Opt out of a role you previously opted into",
    name: "removerole",
    usage: "role",
    react: true
};

export class RemoveRoleCommand extends RoleCommand {
    public constructor() {
        super(props);
    }

    protected async onTriggered(context: Message, args: string[]): Promise<CommandResult> {
        // must have at least one argument
        if (args.length < 1) {
            return {
                success: false,
                reason: "tell me which role(s) you don't want anymore!",
                showUsage: true
            }
        }

        // map all args to lower case
        args = args.map(arg => arg.toLowerCase());

        // reply to be sent if roles are given successfully
        let reply: string = "";

        // filter out just the eligible roles by name
        const eligibleNames = this.getEligibleRoleNames(args);

        // filter out just ineligible roles by name
        const ineligibleNames = this.getIneligibleRoleNames(args);

        // bail out immediately if no eligible role was requested
        if (eligibleNames.length < 1) {
            return RoleCommand.crNoEligibleNames(ineligibleNames);
        }

        // map names to roles (or null if no such roles) and filter out nulls
        const rta: Role[] = RoleCommand.getRolesByName(context.guild, eligibleNames);

        // if there are no eligible roles to be given,
        if (rta.length < 1) {
            return RoleCommand.crNoSuchRoles(args);
        }

        // fetch guild member based on resolvable user
        const gm: GuildMember = await context.guild.fetchMember(context.author);

        // add roles
        const rolesAdded = await this.removeRoles(gm, rta);
        const rolesNotAdded = rta.filter(r => !rolesAdded.includes(r));

        // warn user if any of the roles were ineligible (but there were some that were ok)
        if (ineligibleNames.length > 0) {
            const plural: boolean = ineligibleNames.length > 1;
            reply += `heads up: \`${ineligibleNames.join(", ")}\` ${plural ? "are" : "is an"} ` +
                `ineligible or invalid role${plural ? "s" : ""}!\nHowever, `;
        }

        if (rolesAdded.length > 0) {
            reply += `I just opted you out of the following role${rolesAdded.length > 1 ? "s" : ""}: \`${rolesAdded.join(", ")}\``;
        } else {
            reply += `it looks like you don't already have the following role${rolesNotAdded.length > 1 ? "s" : ""}: ` +
                `\`${rolesNotAdded.map(r => r.name).join(", ")}\``;
        }

        // send reply
        await context.reply(reply);

        // return success
        return {
            success: true
        };
    }
}
