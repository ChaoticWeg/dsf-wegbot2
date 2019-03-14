import Discord from "discord.js";

class Wegbot {
    private _instance : Discord.Client;
    private _token : string;

    constructor() {
        this._instance = new Discord.Client();
        this._token = this.readToken();
    }

    private readToken() : string {
        return process.env['DISCORD_TOKEN'] || require('../creds.json').discordToken;
    }

    public get instance() : Discord.Client {
        return this._instance;
    }

    public get token() : string {
        return this._token;
    }

    public start() : Promise<string> {
        return this._instance.login(this._token);
    }

    public logout() : Promise<any> {
        return this._instance.destroy();
    }
};

const _instance = new Wegbot();

export default (() => {
    return _instance;
})();
