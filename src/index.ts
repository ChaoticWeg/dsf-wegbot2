/* istanbul ignore file */

import { AddRoleCommand, ClapCommand, HelpCommand, PingCommand, RemoveRoleCommand } from "./commands";
import { Wegbot } from "./wegbot";

// create and initialize bot
const bot = new Wegbot();

// register commands
bot.addCommand(new PingCommand());
bot.addCommand(new ClapCommand());
bot.addCommand(new AddRoleCommand());
bot.addCommand(new RemoveRoleCommand());
bot.addCommand(new HelpCommand());

// start bot
bot.start().then(() => {
    console.log("bot running");
}).catch(console.error);
