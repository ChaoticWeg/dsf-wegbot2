import { WegbotCommand, CommandResult } from "./baseCommand";
import Discord, { Message } from "discord.js";
import { PingCommand } from "./ping";

const KnownCommands: Array<WegbotCommand> = [
    new PingCommand()
];

export class CommandRegistry {
    static _prefix: string = "?";
    public static get prefix() { return CommandRegistry._prefix; }

    _internal: Array<WegbotCommand> = new Array<WegbotCommand>();
    public get internal(): ReadonlyArray<WegbotCommand> { return this._internal.splice(0); }

    public init(): void {
        let self: CommandRegistry = this;
        KnownCommands.forEach(c => { self.register(c); });
    }

    public register(cmd: WegbotCommand): void {
        this._internal.push(cmd);
    }

    private static onCommandSuccess(result: CommandResult): void {
        console.log(`SUCCESS: ${result.context.author.username}#${result.context.author.discriminator} issued command: ${result.context.content}`);
    }

    private static onCommandFailure(result: CommandResult): void {
        console.log(`FAILURE: ${result.context.author.username}#${result.context.author.discriminator} issued command: ${result.context.content}`);
        console.log(result.error);
    }

    public handleMessage(msg: Message): void {
        // ignore bots (including ourself)
        if (msg.author.bot) {
            return;
        }

        let cmdStr: string = msg.content.split(" ")[0];
        if (!cmdStr.startsWith(CommandRegistry.prefix)) {
            return;
        }

        cmdStr = cmdStr.substring(1).toUpperCase();

        let self: CommandRegistry = this;
        this._internal.forEach(c => {
            if (cmdStr === c.cmdStr.toUpperCase()) {
                c.onTriggered(msg)
                    .then(CommandRegistry.onCommandSuccess.bind(self))
                    .catch(CommandRegistry.onCommandFailure.bind(self));
            }
        });
    }

    public bind(client: Discord.Client): void {
        client.on('message', this.handleMessage.bind(this));
    }
}
