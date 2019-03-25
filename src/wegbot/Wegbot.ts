import Discord, { Message } from "discord.js";
import { WegbotCommand, WegbotCommandResult } from "../commands";
import { ConfigManager } from "../config";
import { WegbotEventHandler } from "../events";
import { WegbotConfig } from "../models";
import { Credentials } from "./Credentials";
import { WegbotOptions } from "./WegbotOptions";

export class Wegbot {

    public get token(): string | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_TOKEN") || undefined;
    }

    public get testChannelId(): number | undefined {
        /* istanbul ignore next */
        return this._credentials.getNumber("DISCORD_TEST_CHANNEL_ID") || undefined;
    }

    private static defaultConfig(): WegbotConfig {
        return { guilds: [], users: [], roles: [] };
    }

    public readonly dev: boolean;
    public readonly discord: Discord.Client;

    private _credentials: Credentials = new Credentials();
    private _commands: WegbotCommand[] = [];
    private _config: WegbotConfig = Wegbot.defaultConfig();

    public constructor(options: WegbotOptions = {} as WegbotOptions) {
        this.dev = !!options.dev;

        this.discord = new Discord.Client();
        this.discord.on("message", this.checkMessageForCommand.bind(this));

        this.loadConfig();
    }

    public start(): Promise<string> {
        return this.discord.login(this.token);
    }

    public logout(): Promise<any> {
        return this.discord.destroy();
    }

    public registerEventHandler(handler: WegbotEventHandler<any>): void {
        this.discord.on(handler.eventName, handler.onTriggered);
    }

    public registerCommand(command: WegbotCommand): void {
        this._commands.push(command);
    }

    private onCommandSuccess(result: WegbotCommandResult): void {
        if (!this.dev) {
            console.log(`SUCCESS: ${result.command.asFirstWord}`);
        }
    }

    private onCommandFailure(result: WegbotCommandResult): void {
        if (!this.dev) {
            console.error(`FAILURE: ${result.command.asFirstWord} - ${result.reason}`);
            if (result.error) {
                console.error(result.error);
            }
        }
    }

    private checkMessageForCommand(message: Message): void {
        if (!message.content.startsWith(WegbotCommand.prefix)) {
            return;
        }
        this._commands.forEach((c: WegbotCommand) => {
            if (message.content.split(" ")[0].toUpperCase() === c.asFirstWord.toUpperCase()) {
                c.trigger(message).then(this.onCommandSuccess).catch(this.onCommandFailure);
            }
        });
    }

    private logLine(msg: any): void {
        if (!this.dev) {
            console.log(msg);
        }
    }

    private logError(msg: any, e?: Error): void {
        if (!this.dev) {
            console.error(msg);
            if (e) {
                console.error(e);
            }
        }
    }

    private onConfigNotFound(): void {
        this.logLine("WARN no config found, using default");

        ConfigManager.save(this._config)
            .catch((e: Error) => {
                this.logError("also unable to save default config!", e);
            });
    }

    private loadConfig(): void {
        ConfigManager.load()
            .then((c: WegbotConfig) => {
                this._config = c;
                this.logLine(`loaded config: ${this._config.guilds.length} guilds, ${this._config.users.length} users`);
            })
            .catch((e: NodeJS.ErrnoException) => {
                if (e.code === "ENOENT") {
                    return this.onConfigNotFound();
                }
                throw e;
            });
    }
}
