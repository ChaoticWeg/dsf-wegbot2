import { Emoji, GroupDMChannel, Guild, Message, MessageReaction, TextChannel } from "discord.js";

export namespace EmojiUtils {
    export function getEmojiByName(guild: Guild, name: string): Emoji | null {
        name = name.toLowerCase();
        const emoji: Emoji[] = Array.from(guild.emojis.values()).filter((e) => e.name.toLowerCase() === name);
        return emoji.length > 0 ? emoji[0] : null;
    }

    export function formatReaction(reaction: MessageReaction): string {
        let prefix: string = "";
        const message: Message = reaction.message;

        if (message.guild) {
            if (message.channel.type === "text") {
                const textChannel: TextChannel = message.channel as TextChannel;
                prefix = `${message.guild.name} #${textChannel.name}${textChannel.nsfw ? " (nsfw)" : ""}`;
            }
        } else {
            if (message.channel.type === "dm") {
                prefix = `DM`;
            } else if (message.channel.type === "group") {
                const groupDm: GroupDMChannel = message.channel as GroupDMChannel;
                prefix = `DM: ${groupDm.name}`;
            } else {
                prefix = `${message.channel.type}`;
            }
        }

        const plural: string = reaction.count > 1 ? "users have" : "user has";
        const author: string = `${message.author.username}#${message.author.discriminator}`;
        return `${prefix} - ${reaction.count} ${plural} reacted to ${author}'s message with ${reaction.emoji.name}`;
    }

    export function logReaction(reaction: MessageReaction): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                console.log(formatReaction(reaction));
                resolve();
                return;
            } catch (err) {
                reject(err);
            }
        });
    }
}
