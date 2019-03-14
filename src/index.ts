import Discord from "discord.js";
import { Credentials } from "./creds";
import { EventRegistry } from "./events";

class Wegbot {
    private _instance : Discord.Client;
    private _credentials : Credentials;

    constructor() {
        this._instance = new Discord.Client();
        this._credentials = new Credentials();

        EventRegistry.instance.applyAll(this._instance);
    }

    public get instance() : Discord.Client {
        return this._instance;
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
        return this._instance.login(this.token);
    }

    public logout() : Promise<any> {
        return this._instance.destroy();
    }
};

const _instance = new Wegbot();

export default (() => {
    return _instance;
})();
