import { Message, TextChannel } from "discord.js";
import { WegbotEventHandler } from "../EventHandler";

export class MessageEventHandler extends WegbotEventHandler<Message> {

    private static publicMsg(context: Message): string {
        const channel = context.channel as TextChannel;
        return `[${context.guild}] #${channel.name} <${context.author.username}#${context.author.discriminator}> ` +
            context.cleanContent;
    }

    private static privateMsg(context: Message): string {
        return `[DM] <${context.author.username}#${context.author.discriminator}> ${context.cleanContent}`;
    }

    public constructor() {
        super("message");
    }

    public onTriggered(context: Message): Promise<Message> {
        return new Promise<Message>((resolve: (m: Message) => void, reject: (e: Error) => void) => {
            switch (context.channel.type) {
                case "dm":
                case "group":
                    console.log(MessageEventHandler.privateMsg(context));
                    return resolve(context);
                case "text":
                    console.log(MessageEventHandler.publicMsg(context));
                    return resolve(context);
            }

            return reject(new Error("unknown message type"));
        });
    }
}
