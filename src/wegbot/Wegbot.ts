import Discord, { Emoji, GroupDMChannel, Guild, Message, Snowflake, TextChannel } from "discord.js";

import Commands, { CommandMap } from "../commands";
import { GenericWegbotCommand } from "../commands/WegbotCommand";

import { Credentials } from "./Credentials";
import { WegbotOptions } from "./WegbotOptions";

function formatMessage(message: Message): string {
    let prefix: string = "";

    if (message.guild) {
        if (message.channel.type === "text") {
            let textChannel: TextChannel = message.channel as TextChannel;
            prefix = `${message.guild.name} #${textChannel.name}${textChannel.nsfw ? " (nsfw)" : ""} `
                + `${message.author.username}#${message.author.discriminator}`
        }
    } else {
        if (message.channel.type === "dm") {
            prefix = `[DM] <${message.author.username}#${message.author.discriminator}>`;
        } else if (message.channel.type === "group") {
            let groupDm: GroupDMChannel = message.channel as GroupDMChannel;
            prefix = `[DM: ${groupDm.name}] <${message.author.username}#${message.author.discriminator}>`;
        }
    }

    return `${prefix || `[${message.channel.type}]`} - ${message.cleanContent}`;
}

export class Wegbot {

    public static get token(): string | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_TOKEN") || undefined;
    }

    public static get testChannelId(): Snowflake | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_TEST_CHANNEL_ID") || undefined;
    }

    public static get ownerId(): Snowflake | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_OWNER_ID") || undefined;
    }

    public get commands(): GenericWegbotCommand[] {
        return Array.from(this._commands.values());
    }

    public readonly dev: boolean;
    public discord: Discord.Client = new Discord.Client();

    private static _credentials: Credentials = new Credentials();
    private _commands: CommandMap = Commands.emptyMap();

    public constructor(options: WegbotOptions = {} as WegbotOptions) {
        this.dev = options.dev || false;
    }

    public start(): Promise<string> {
        this.init();
        return this.login(Wegbot.token);
    }

    public addCommand(command: GenericWegbotCommand): void {
        this._commands.set(command.name, command);
    }

    private init(): void {
        this.discord.on("message", this.onMessage.bind(this));
    }

    private login(token?: string): Promise<string> {
        return this.discord.login(token);
    }

    private async onMessage(message: Message): Promise<void> {
        // skip any messages from the bot
        if (message.author === this.discord.user) {
            return;
        }

        // react to pings
        if (message.mentions.users.has(this.discord.user.id)) {
            await Wegbot.reactPingSock(message);
        }

        // log message
        const loggedText: string = formatMessage(message);
        if (loggedText) {
            console.log(loggedText);
        }

        // bail out if this is not a command
        if (!message.cleanContent.startsWith(Commands.prefix)) {
            return;
        }

        // get the first word with the command prefix stripped
        const firstWord: string = message.cleanContent.split(" ")[0].substring(Commands.prefix.length);
        const args: string[] = message.cleanContent.split(" ").slice(1);
        const command: GenericWegbotCommand | undefined = this._commands.get(firstWord);

        if (!command) {
            let supereyes: Emoji | null = Wegbot.getEmojiByName(message.guild, "supereyes");
            let supereyesText: string = supereyes ? ` ${supereyes}` : "";

            const prefix: string = Commands.prefix;

            message.react("❓").then(async () => {
                await message.reply(`that's not a command. Use \`${prefix}help\` if you need it. ${supereyesText}`);
            }).catch(console.error);
            return;
        }

        command.execute(message, args).then(console.log).catch(console.error);
    }

    public static getEmojiByName(guild: Guild, name: string): Emoji | null {
        name = name.toLowerCase();
        const emoji: Emoji[] = Array.from(guild.emojis.values()).filter(e => e.name.toLowerCase() === name);
        return emoji.length > 0 ? emoji[0] : null;
    }

    private static async reactPingSock(message: Message): Promise<void> {
        const pingsock = Wegbot.getEmojiByName(message.guild, "pingsock");
        if (!pingsock) {
            return;
        }

        await message.react(pingsock);
    }
}
