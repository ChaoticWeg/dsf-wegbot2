import { Snowflake } from "discord.js";

import { EnvironmentValue } from "./Decorators";

export class DiscordCredentials {
    @EnvironmentValue("DISCORD_TOKEN")
    public token?: string;

    @EnvironmentValue("DISCORD_OWNER_ID")
    public ownerId?: Snowflake;

    @EnvironmentValue("DISCORD_TEST_CHANNEL_ID")
    public testChannelId?: Snowflake;
}
