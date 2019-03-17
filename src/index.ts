import { config as dotenv_config } from "dotenv";
dotenv_config();

import { Wegbot } from "./wegbot";

const bot = new Wegbot();

bot.init();
bot.start();
