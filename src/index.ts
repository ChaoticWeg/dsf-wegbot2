/* istanbul ignore file */

import {
    AddRoleCommand,
    EchoCommands,
    HelpCommand,
    LookupCommand,
    PingCommand,
    RemoveRoleCommand,
    UptimeCommand
} from "./commands";
import { Wegbot } from "./wegbot";

// create and initialize bot
const bot = new Wegbot();

// register commands
bot.addCommand(new PingCommand());
bot.addCommand(new AddRoleCommand());
bot.addCommand(new RemoveRoleCommand());
bot.addCommand(new HelpCommand());
bot.addCommand(new UptimeCommand());
bot.addCommand(new LookupCommand());

EchoCommands.forEach(bot.addCommand.bind(bot));

// start bot
bot.start().then(() => {
    console.log("bot running");
}).catch(console.error);
