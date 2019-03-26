import Discord, { Message } from "discord.js";
import { WegbotCommand, WegbotCommandResult } from "../commands";
import { ConfigManager } from "../config";
import { WegbotEventHandler } from "../events";
import { CommandUser, RequestableRole, WegbotConfig } from "../models";
import { Credentials } from "./Credentials";
import { WegbotOptions } from "./WegbotOptions";

export class Wegbot {

    public get users(): CommandUser[] {
        return this._config.users;
    }

    public get roles(): RequestableRole[] {
        return this._config.roles;
    }

    public get token(): string | undefined {
        /* istanbul ignore next */
        return this._credentials.getString("DISCORD_TOKEN") || undefined;
    }

    public get testChannelId(): number | undefined {
        /* istanbul ignore next */
        return this._credentials.getNumber("DISCORD_TEST_CHANNEL_ID") || undefined;
    }

    private static defaultConfig(): WegbotConfig {
        return { users: [], roles: [] };
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

    public registerEventHandler<T>(handler: WegbotEventHandler<T>): void {
        this.discord.on(handler.eventName, (t: T) => {
            handler.onTriggered(t).catch((e) => { this.logError(e); });
        });
    }

    public registerCommand(command: WegbotCommand): void {
        this._commands.push(command);
    }

    public addRole(role: RequestableRole): void {
        this._config.roles.push(role);
    }

    public saveConfig(): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (e: NodeJS.ErrnoException) => void) => {
            ConfigManager.save(this._config).then(resolve).catch(reject);
        });
    }

    public logLine(msg: any): void {
        if (!this.dev) {
            console.log(msg);
        }
    }

    public logError(msg: any, e?: Error): void {
        if (!this.dev) {
            console.error(msg);
            if (e) {
                console.error(e);
            }
        }
    }

    private onCommandSuccess(result: WegbotCommandResult): void {
        this.logLine(`SUCCESS: ${result.command.asContentStart}`);
    }

    private onCommandFailure(result: WegbotCommandResult): void {
        this.logError(`FAILURE: ${result.command.asContentStart} - ${result.reason}`, result.error);
    }

    private checkMessageForCommand(message: Message): void {
        if (!message.cleanContent.startsWith(WegbotCommand.prefix)) {
            return;
        }
        this._commands.forEach((c: WegbotCommand) => {
            if (message.cleanContent.toUpperCase().startsWith(c.asContentStart.toUpperCase())) {
                c.trigger(message, this).then(this.onCommandSuccess).catch(this.onCommandFailure);
            }
        });
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
                this.logLine(`loaded config: ${this._config.users.length} users, ${this._config.roles.length} roles`);
            })
            .catch((e: NodeJS.ErrnoException) => {
                if (e.code === "ENOENT") {
                    return this.onConfigNotFound();
                }
                throw e;
            });
    }
}
