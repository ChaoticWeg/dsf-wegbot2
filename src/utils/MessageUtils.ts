import { Emoji, GroupDMChannel, Message, TextChannel } from "discord.js";
import Commands from "../commands";
import { EmojiUtils } from "./EmojiUtils";

export namespace MessageUtils {

    export function formatMessage(message: Message): string {
        let prefix: string = "";

        if (message.guild) {
            if (message.channel.type === "text") {
                const textChannel: TextChannel = message.channel as TextChannel;
                prefix = `${message.guild.name} #${textChannel.name}${textChannel.nsfw ? " (nsfw)" : ""} `
                    + `${message.author.username}#${message.author.discriminator}`;
            }
        } else {
            if (message.channel.type === "dm") {
                prefix = `[DM] <${message.author.username}#${message.author.discriminator}>`;
            } else if (message.channel.type === "group") {
                const groupDm: GroupDMChannel = message.channel as GroupDMChannel;
                prefix = `[DM: ${groupDm.name}] <${message.author.username}#${message.author.discriminator}>`;
            }
        }

        return `${prefix || `[${message.channel.type}]`} - ${message.cleanContent}`;
    }

    /**
     * It's a command if it starts with the prefix and does not contain it anywhere else
     * @param content Message content
     */
    export function isCommand(content: string): boolean {
        return content.startsWith(Commands.prefix)
            && content.length > Commands.prefix.length
            && content.substring(Commands.prefix.length).indexOf(Commands.prefix) < 0;
    }

    export function logMessage(message: Message): void {
        // TODO properly log message
        const loggedText: string = MessageUtils.formatMessage(message);
        if (loggedText) {
            console.log(loggedText);
        }
    }

    export function logMessageAsync(message: Message): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                logMessage(message);
                resolve();
                return;
            } catch (err) {
                return reject(err);
            }
        });
    }

    export async function onCommandNotFound(message: Message): Promise<void> {
        // toss a BM :supereyes: in there if the server has it
        const supereyes: Emoji | null = EmojiUtils.getEmojiByName(message.guild, "supereyes");
        const supereyesText: string = supereyes ? ` ${supereyes}` : "";

        const prefix: string = Commands.prefix;

        message.react("❓").then(async () => {
            await message.reply(`that's not a command. Use \`${prefix}help\` if you need it. ${supereyesText}`);
        }).catch(console.error);
        return;
    }

    const BRO_TIMEOUT_MS = 15000;
    let LAST_BRO = 0;
    export async function bro(message: Message): Promise<void> {
        if (message.cleanContent === "BRO") {
            if (Date.now() - LAST_BRO >= BRO_TIMEOUT_MS) {
                LAST_BRO = Date.now();
                await message.channel.send("BRO");
            } else {
                await react(message, "ping");
            }
        }
    }

    export async function react(message: Message, emojiName: string): Promise<void> {
        const pingsock = EmojiUtils.getEmojiByName(message.guild, emojiName);
        if (!pingsock) {
            return;
        }

        await message.react(pingsock);
    }
}
