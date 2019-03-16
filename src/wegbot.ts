import Discord from "discord.js";
import { Credentials } from "./creds";
import { registerEvents, EventRegistry } from "./events";

export class Wegbot {
    private _discord : Discord.Client;
    private _credentials : Credentials;
    private _events : EventRegistry;

    public constructor() {
        this._discord = new Discord.Client();
        this._credentials = new Credentials();
        this._events = new EventRegistry();
    }

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

    public registerEvents() : void {
        registerEvents(this._events);
        this._events.applyAll(this._discord);
    }
};
