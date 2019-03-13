import Discord from "discord.js";

class Wegbot {
    private _instance : Discord.Client;

    constructor() {
        this._instance = new Discord.Client();

        
    }

    get instance() : Discord.Client {
        return this._instance;
    }
}

export default (() => {
    return new Wegbot();
})();
