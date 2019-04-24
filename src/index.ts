/* istanbul ignore file */

import {
    AddRoleCommand,
    ClapCommand,
    HelpCommand,
    PingCommand,
    PredsCommand,
    RemoveRoleCommand,
    UptimeCommand,
    VGKAltCommand,
    VGKCommand
} from "./commands";

import { Wegbot } from "./wegbot";

// create and initialize bot
const bot = new Wegbot();

// register commands
bot.addCommand(new PingCommand());

bot.addCommand(new ClapCommand());
bot.addCommand(new PredsCommand());
bot.addCommand(new VGKCommand());
bot.addCommand(new VGKAltCommand());

bot.addCommand(new AddRoleCommand());
bot.addCommand(new RemoveRoleCommand());
bot.addCommand(new HelpCommand());
bot.addCommand(new UptimeCommand());

// start bot
bot.start().then(() => {
    console.log("bot running");
}).catch(console.error);
