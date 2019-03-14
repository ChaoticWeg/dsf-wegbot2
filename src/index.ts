import Discord from "discord.js";
import { Credentials } from "./creds";

class Wegbot {
    private _instance : Discord.Client;
    private _credentials : Credentials;

    constructor() {
        this._instance = new Discord.Client();
        this._credentials = new Credentials('../creds.json');
    }

    public get instance() : Discord.Client {
        return this._instance;
    }

    public get token() : string | undefined {
        /* istanbul ignore next */
        return this._credentials.getString('discordToken') || undefined;
    }

    public get testChannelId() : number | undefined {
        /* istanbul ignore next */
        return this._credentials.getNumber('discordTestChannelId') || undefined;
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
