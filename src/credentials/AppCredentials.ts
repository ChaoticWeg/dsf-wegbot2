import { EnvironmentValue } from "./Decorators";
import { DiscordCredentials } from "./DiscordCredentials";
import { RedditCredentials } from "./RedditCredentials";

const DEFAULT_PIN_THRESHOLD: number = 5;

export class AppCredentials {
    public discord: DiscordCredentials = new DiscordCredentials();
    public reddit: RedditCredentials = new RedditCredentials();

    @EnvironmentValue("NODE_ENV")
    public environment?: string;

    @EnvironmentValue("COMMAND_PREFIX")
    public commandPrefix?: string;

    @EnvironmentValue("PIN_THRESHOLD")
    private _pinThresholdStr?: string;

    public get pinThreshold(): number {
        return Number(this._pinThresholdStr) || DEFAULT_PIN_THRESHOLD;
    }
}
