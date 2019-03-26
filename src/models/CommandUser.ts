import { Snowflake } from "discord.js";

export interface CommandUser {
    id: Snowflake;
    // default values should always be false/falsy
    isOwner?: boolean;
    isAdmin?: boolean;
}
