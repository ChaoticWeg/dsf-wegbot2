import Discord, { Message, Snowflake } from "discord.js";
import Commands, { CommandMap, WegbotCommand } from "../commands";
import { Credentials } from "./Credentials";
import { WegbotOptions } from "./WegbotOptions";

export class Wegbot {

    public get token(): string | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_TOKEN") || undefined;
    }

    public get testChannelId(): Snowflake | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_TEST_CHANNEL_ID") || undefined;
    }

    public get ownerId(): Snowflake | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_OWNER_ID") || undefined;
    }

    public readonly dev: boolean;
    public discord: Discord.Client = new Discord.Client();

    private _credentials: Credentials = new Credentials();
    private _commands: CommandMap = Commands.emptyMap();

    public constructor(options: WegbotOptions = {} as WegbotOptions) {
        this.dev = options.dev || false;
    }

    public start(): Promise<string> {
        this.init();
        return this.login(this.token);
    }

    public addCommand(command: WegbotCommand): void {
        this._commands.set(command.name, command);
    }

    private init(): void {
        this.discord.on("message", this.onMessage.bind(this));
    }

    private login(token?: string): Promise<string> {
        return this.discord.login(token);
    }

    private onMessage(message: Message): void {
        if (!message.cleanContent.startsWith(Commands.prefix)) {
            console.log();
            return;
        }

        const firstWord: string = message.cleanContent.split(" ")[0].substring(1);
        const command: WegbotCommand | undefined = this._commands.get(firstWord);

        if (!command) {
            message.react("❓").then(() => "that's not a command").then(message.reply).catch(console.error);
            return;
        }

        command.execute(message).then(console.log).catch(console.error);
    }
}
