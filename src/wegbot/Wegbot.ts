import Discord, { Message, MessageReaction, Snowflake } from "discord.js";

import Commands, { CommandMap, WegbotCommand } from "../commands";
import { EventHandler, EventName, EventsMap, MessageEvents, MessageReactionAddEvents } from "../events";
import { MessageUtils, Uptime } from "../utils";

import { Credentials } from "./Credentials";
import { WegbotOptions } from "./WegbotOptions";

export class Wegbot {

    public static get token(): string | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_TOKEN") || undefined;
    }
    public static get ownerId(): Snowflake | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_OWNER_ID") || undefined;
    }

    public get commands(): WegbotCommand[] {
        return Array.from(this._commands.values());
    }

    private static _credentials: Credentials = new Credentials();

    public readonly dev: boolean;
    public discord: Discord.Client = new Discord.Client();
    private _commands: CommandMap = Commands.emptyMap();
    private _events: EventsMap = new EventsMap();

    public constructor(options: WegbotOptions = {} as WegbotOptions) {
        this.dev = options.dev || false;
    }

    public start(): Promise<string> {
        this.init();
        return this.login(Wegbot.token);
    }

    public addCommand(command: WegbotCommand): void {
        this._commands.set(command.name, command);
    }

    public addEvent<T>(name: EventName, handler: EventHandler<T>): void {
        this._events.add(name, handler);
    }

    private init(): void {
        this.discord.on("ready", Uptime.ready);
        this.discord.on("message", this.onMessage.bind(this));
        this.discord.on("messageReactionAdd", this.onMessageReactionAdd.bind(this));

        MessageEvents.asList().forEach((h) => this.addEvent("message", h));
        MessageReactionAddEvents.asList().forEach((h) => this.addEvent("messageReactionAdd", h));
    }

    private login(token?: string): Promise<string> {
        process.on("exit", this.logout.bind(this));
        return this.discord.login(token);
    }

    private async logout(code: number): Promise<void> {
        console.log(`logging out and exiting with code ${code}`);
        return this.discord.destroy().catch(console.log);
    }

    private async processCommands(message: Message): Promise<void> {
        // bail out if this is not a command
        if (!MessageUtils.isCommand(message.cleanContent)) {
            return;
        }

        // get the first word with the command prefix stripped
        const words: string[] = message.cleanContent.split(" ");
        const firstWord: string = words[0].substring(Commands.prefix.length);
        const args: string[] = words.slice(1);
        const command: WegbotCommand | undefined = this._commands.get(firstWord);

        // execute if found, else handle command not found
        return command
            ? command.execute(message, args).then(console.log).catch(console.error)
            : MessageUtils.onCommandNotFound(message);
    }

    private async onMessage(message: Message): Promise<void> {
        // skip any messages from the bot
        if (message.author === this.discord.user) {
            return;
        }

        // react to pings
        if (message.mentions.users.has(this.discord.user.id)) {
            await MessageUtils.react(message, "ping");
        }

        // makeshift logout command
        if (message.cleanContent.split(" ")[0] === "!!wbkill" && message.author.id === Wegbot.ownerId) {
            await message.reply("shutting down!").catch(console.log);
            this.logout(0).then(process.exit(0));
            return;
        }

        (this._events.get("message") || []).forEach((h) => {
            h(message).catch(console.log);
        });

        return this.processCommands(message);
    }

    private onMessageReactionAdd(reaction: MessageReaction): void {
        (this._events.get("messageReactionAdd") || []).forEach((h) => {
            h(reaction).catch(console.log);
        });
    }
}
