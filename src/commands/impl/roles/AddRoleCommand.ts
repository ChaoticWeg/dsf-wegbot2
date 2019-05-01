import { GuildMember, Message, Role } from "discord.js";
import { CommandResult } from "../../CommandResult";
import { WegbotCommandProps } from "../../WegbotCommand";
import { RoleCommand } from "./RoleCommand";

const props: WegbotCommandProps = {
    description: "Request one or more opt-in roles",
    name: "addrole",
    usage: "role [role2 ... roleN]",
    react: true
};

export class AddRoleCommand extends RoleCommand {
    public constructor() {
        super(props);
    }

    protected async onTriggered(context: Message, args: string[]): Promise<CommandResult> {
        // must have at least one argument
        if (args.length < 1) {
            return {
                success: false,
                reason: "tell me which role(s) you want!",
                showUsage: true
            };
        }

        // map all args to lower case
        args = args.map((arg) => arg.toLowerCase());

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
        const rolesAdded: Role[] = await this.addRoles(gm, rta);
        const roleNamesAdded: string[] = rolesAdded.map((r) => r.name);

        const rolesNotAdded: Role[] = rta.filter((r) => !rolesAdded.includes(r));
        const roleNamesNotAdded: string[] = rolesNotAdded.map((r) => r.name);

        // warn user if any of the roles were ineligible (but there were some that were ok)
        if (ineligibleNames.length > 0) {
            const plural: boolean = ineligibleNames.length > 1;
            reply += `heads up: \`${ineligibleNames.join(", ")}\` ${plural ? "are" : "is an"} ` +
                `ineligible or invalid role${plural ? "s" : ""}!\nHowever, `;
        }

        if (rolesAdded.length > 0) {
            reply += `I just gave you the following role${rolesAdded.length > 1 ? `s (${rolesAdded.length})` : ""}` +
                `: \`${roleNamesAdded.join(", ")}\`.`;
        } else {
            reply += `it looks like you already have the following role${rolesNotAdded.length > 1 ? "s" : ""}: ` +
                `\`${roleNamesNotAdded.join(", ")}\`.`;
        }

        // send reply
        await context.reply(reply);

        // return success
        return {
            success: true
        };
    }
}
