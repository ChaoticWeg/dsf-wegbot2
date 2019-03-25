import { Snowflake } from "discord.js";

export interface RequestableRole {
    guildId: Snowflake;
    id: Snowflake;
}
