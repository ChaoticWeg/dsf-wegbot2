import { Snowflake } from "discord.js";

export interface CommandUser {
    // default values
    userId: Snowflake;
    isOwner: boolean;
    isAdmin: boolean;
}
