import { WegbotEvent } from "../baseEvent";
import Discord, { DMChannel, TextChannel, GroupDMChannel } from "discord.js";

export class EchoMessageEvent extends WegbotEvent {
    public constructor() {
        super('message');
    }

    private stringFromDM(message: Discord.Message): string {
        let dmChannel: DMChannel = <DMChannel> message.channel;
        let isToOrFrom: string = (message.author.id === message.client.user.id) ? "TO" : "FROM";
        return `[DM] ${isToOrFrom} @${dmChannel.recipient.username}#${dmChannel.recipient.discriminator}`;
    }

    private stringFromGroupDM(message: Discord.Message): string {
        let dmChannel: GroupDMChannel = <GroupDMChannel> message.channel;
        let isToOrFrom: string = (message.author.id === message.client.user.id) ? "TO" : "FROM";
        return `[GDM] ${isToOrFrom} ${dmChannel.name}`;
    }

    private stringFromPublic(message: Discord.Message): string {
        let textChannel: TextChannel = <TextChannel> message.channel;
        return `[${textChannel.guild.name}] #${textChannel.name} ` + 
            `<@${message.author.username}#${message.author.discriminator}>`;
    }

    public onTriggered(message: Discord.Message): void {
        let logPrefix: string;

        if (message.channel.type === "dm") {
            logPrefix = this.stringFromDM(message);
        }

        else if (message.channel.type === "group") {
            logPrefix = this.stringFromGroupDM(message);
        }

        else if (message.channel.type === "text") {
            logPrefix = this.stringFromPublic(message);
        }

        else {
            logPrefix = "[[[from the void]]]";
        }

        console.log(`${logPrefix}: ${message.cleanContent}`);
    }
}
