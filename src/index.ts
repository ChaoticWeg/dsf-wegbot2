import { config as dotenv_config } from "dotenv";
import { commands, WegbotCommand } from "./commands";
import { events, WegbotEventHandler } from "./events";
import { Wegbot } from "./wegbot";

// read environment variables
dotenv_config();

// create bot
const bot = new Wegbot();

// register all events
events.forEach((e: WegbotEventHandler<any>) => bot.registerEventHandler(e));

// register all commands
commands.forEach((e: WegbotCommand) => bot.registerCommand(e));

// start bot
bot.start().then(() => { console.log("logged in"); }).catch(console.error);
