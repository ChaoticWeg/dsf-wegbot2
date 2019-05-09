import { SnoowrapOptions } from "snoowrap";
import { EnvironmentValue } from "./Decorators";

export class RedditCredentials implements SnoowrapOptions {
    public userAgent: string =
        "dsf-wegbot2 (DSF Discord bot) by ChaoticWeg -- https://github.com/chaoticweg/dsf-wegbot2";

    @EnvironmentValue("REDDIT_CLIENT_ID")
    public clientId?: string;

    @EnvironmentValue("REDDIT_CLIENT_SECRET")
    public clientSecret?: string;

    @EnvironmentValue("REDDIT_USERNAME")
    public username?: string;

    @EnvironmentValue("REDDIT_PASSWORD")
    public password?: string;
}
