import { Snowflake } from "discord.js";

export interface CommandUser {
    userId: Snowflake;
    // default values should always be false/falsy
    isOwner?: boolean;
    isAdmin?: boolean;
}
