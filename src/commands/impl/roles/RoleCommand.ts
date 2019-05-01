import { Guild, GuildMember, Role } from "discord.js";
import { CommandResult } from "../../CommandResult";
import { WegbotCommand, WegbotCommandProps } from "../../WegbotCommand";
import * as util from "./util";

export abstract class RoleCommand extends WegbotCommand {

    protected static crNoEligibleNames(ineligible: string[]): CommandResult {
        const plural: boolean = ineligible.length > 1;
        const reason: string = `ineligible or invalid role${plural ? "s" : ""}: ${ineligible.join(", ")}`;
        return {
            reason,
            success: false
        };
    }

    protected static crNoSuchRoles(roles: string[]): CommandResult {
        const plural: boolean = roles.length > 1;
        const reason: string = `no such role${plural ? "s" : ""}: ${roles.join(", ")}`;
        return {
            reason,
            success: false
        };
    }

    protected static getRolesByName(guild: Guild, names: string[]): Role[] {
        return names.map((rn) => util.getRoleByName(guild, rn))
            .filter((rn) => rn !== null);
    }

    protected constructor(props: WegbotCommandProps) {
        super({
            group: "role",
            ...props
        });
    }

    protected getEligibleRoleNames(args: string[]): string[] {
        return args.map((a) => a.toLowerCase()).filter((a) => util.isRoleEligible(a));
    }

    protected getIneligibleRoleNames(args: string[]): string[] {
        return args.map((a) => a.toLowerCase()).filter((a) => !util.isRoleEligible(a));
    }

    protected async addRoles(gm: GuildMember, roles: Role[]): Promise<Role[]> {
        const okRoles: Role[] = roles.filter((r) => !gm.roles.has(r.id));
        const reason: string = this.getReason(gm);
        await gm.addRoles(okRoles, reason);
        return okRoles;
    }

    protected async removeRoles(gm: GuildMember, roles: Role[]): Promise<Role[]> {
        const okRoles: Role[] = roles.filter((r) => gm.roles.has(r.id));
        const reason: string = this.getReason(gm);
        await gm.removeRoles(okRoles, reason);
        return okRoles;
    }

    private getReason(gm: GuildMember): string {
        return `Requested via ?${this.name} by ${gm.user.username}#${gm.user.discriminator}`;
    }
}
