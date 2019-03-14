import { WegbotEvent } from "../baseEvent";
import Discord from "discord.js";

export class EchoMessageEvent extends WegbotEvent {
    public constructor() {
        super('message');
    }

    public onTriggered(message: Discord.Message): void {
        console.log(`${message.author.username}: ${message.content}`);
    }
}
