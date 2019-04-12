/* istanbul ignore file */

import { config as dotenv_config } from "dotenv";
import { PingCommand } from "./commands";
import { Wegbot } from "./wegbot";

// read environment variables
dotenv_config();

// create and initialize bot
const bot = new Wegbot();

// register commands
bot.addCommand(new PingCommand());

// start bot
bot.start().then(() => {
    console.log("bot running");
}).catch(console.error);
