import { Guild, Role } from "discord.js";
import { eligibleRoles } from "./eligible.json";

export function getRoleByName(guild: Guild, name: string): Role {
    return guild.roles.find(r => r.name.toLowerCase() === name.toLowerCase());
}

export function isRoleEligible(name: string): boolean {
    return eligibleRoles.includes(name.toLowerCase());
}
