import Discord from "discord.js";
import { Credentials } from "./creds";
import { EventRegistry } from "./events";
import { CommandRegistry } from "./commands";

export class Wegbot {
    private _discord: Discord.Client = new Discord.Client();
    private _credentials: Credentials = new Credentials();
    private _events: EventRegistry = new EventRegistry();
    private _commands: CommandRegistry = new CommandRegistry();

    public get discord() : Discord.Client {
        return this._discord;
    }

    public get token() : string | undefined {
        /* istanbul ignore next */
        return this._credentials.getString('DISCORD_TOKEN') || undefined;
    }

    public get testChannelId() : number | undefined {
        /* istanbul ignore next */
        return this._credentials.getNumber('DISCORD_TEST_CHANNEL_ID') || undefined;
    }

    public start() : Promise<string> {
        return this._discord.login(this.token);
    }

    public logout() : Promise<any> {
        return this._discord.destroy();
    }

    public init(): void {
        this._events.init();
        this._events.applyAll(this._discord);
        
        this._commands.init();
        this._commands.bind(this._discord);
    }
};
