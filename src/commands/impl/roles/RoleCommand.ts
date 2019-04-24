import { Guild, GuildMember, Role } from "discord.js";
import { CommandResult } from "../../CommandResult";
import { WegbotCommand, WegbotCommandProps } from "../../WegbotCommand";
import * as util from "./util";

export interface RoleCommandProps extends WegbotCommandProps {
}

export abstract class RoleCommand extends WegbotCommand<RoleCommandProps> {
    private static getReason(gm: GuildMember): string {
        return `Requested via ?${this.name} by ${gm.user.username}#${gm.user.discriminator}`;
    }

    protected constructor(props: RoleCommandProps) {
        super({
            group: "role",
            ...props
        });
    }

    protected getEligibleRoleNames(args: string[]): string[] {
        return args.map(a => a.toLowerCase()).filter(a => util.isRoleEligible(a));
    }

    protected getIneligibleRoleNames(args: string[]): string[] {
        return args.map(a => a.toLowerCase()).filter(a => !util.isRoleEligible(a));
    }

    protected static crNoEligibleNames(ineligible: string[]): CommandResult {
        const plural: boolean = ineligible.length > 1;
        const reason: string = `ineligible or invalid role${plural ? "s" : ""}: ${ineligible.join(", ")}`;
        return {
            reason,
            success: false
        }
    }

    protected static crNoSuchRoles(roles: string[]): CommandResult {
        const plural: boolean = roles.length > 1;
        const reason: string = `no such role${plural ? "s" : ""}: ${roles.join(", ")}`;
        return {
            reason,
            success: false
        }
    }

    protected static getRolesByName(guild: Guild, names: string[]): Role[] {
        return names.map(rn => util.getRoleByName(guild, rn))
            .filter(rn => rn !== null);
    }

    protected async addRoles(gm: GuildMember, roles: Role[]): Promise<Role[]> {
        const okRoles: Role[] = roles.filter(r => !gm.roles.has(r.id));
        const reason: string = RoleCommand.getReason(gm);
        await gm.addRoles(okRoles, reason);
        return okRoles;
    }

    protected async removeRoles(gm: GuildMember, roles: Role[]): Promise<Role[]> {
        const okRoles: Role[] = roles.filter(r => gm.roles.has(r.id));
        const reason: string = RoleCommand.getReason(gm);
        await gm.removeRoles(okRoles, reason);
        return okRoles;
    }
}
